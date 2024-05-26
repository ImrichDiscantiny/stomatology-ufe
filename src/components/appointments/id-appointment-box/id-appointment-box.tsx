import { Component, h, Prop, Event, State, EventEmitter } from '@stencil/core';
import { AppointmentListEntry } from '../../../api/stomatology-al';
import state from '../../../global/store';
import { onAddList, onUpdateList, onDeleteList, checkDate } from '../../../global/store';

@Component({
  tag: 'id-appointment-box',
  styleUrl: 'id-appointment-box.css',
  shadow: true,
  assetsDirs: ['assets'],
})
export class IdAppointmentBox {
  @State()
  dropdown: boolean = false;

  @Prop()
  appointment: AppointmentListEntry;

  @Prop()
  updating: boolean;

  @Event() cancelEvent: EventEmitter<String>;

  onCancel = (event: Event) => {
    event.preventDefault();
    this.updating = false;
    state.updating = false;

    if (this.appointment.id === '@new') {
      this.cancelEvent.emit(this.appointment.id);
    }
  };

  onUpdate = () => {
    this.updating = true;
    state.updating = true;
  };

  onDelete = async (event: Event) => {
    event.preventDefault();
    this.cancelEvent.emit(this.appointment.id);
    await onDeleteList(this.appointment.date, this.appointment.id, state.apiBase);
  };

  onSubmit = (event: Event) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const dayShortcut = this.getSlovakDay(formData.get('date') as string);

    if (dayShortcut === '') {
      console.log(dayShortcut);
      alert('Cannot add appointments for saturday or sunday');
      return;
    }

    const appointmentEntry: AppointmentListEntry = {
      id: this.appointment.id,
      date: formData.get('date') as string,
      duration: formData.get('duration') as string,
      patient: this.shortenPatientName(formData.get('fullname') as string),
      fullname: formData.get('fullname') as string,
      dayShortcut: dayShortcut,
      description: {
        reasonForAppointment: formData.get('reason') as string,
        teeths: (formData.get('teeths') as string).split(/[,\s]+/),
      },
    };

    this.cancelEvent.emit(this.appointment.id);

    let method = form.method.toUpperCase();

    if (method === 'POST') onAddList(appointmentEntry, state.apiBase);
    else {
      onUpdateList(appointmentEntry, state.apiBase);
    }

    this.updating = false;
    state.updating = false;
  };

  onClickDrop = () => {
    this.dropdown = !this.dropdown;
    console.log(this.dropdown);
  };

  getSlovakDay(selectedDay): string {
    const date = new Date(selectedDay);

    const nameDay = date.toLocaleDateString('sk-SK', { weekday: 'long', timeZone: 'Europe/Bratislava' });
    const namedDays = ['Po', 'Ut', 'St', 'Št', 'Pia'];

    let shift_down;

    if (nameDay === 'pondelok') shift_down = 0;
    else if (nameDay === 'utorok') shift_down = 1;
    else if (nameDay === 'streda') shift_down = 2;
    else if (nameDay === 'štvrtok') shift_down = 3;
    else if (nameDay === 'piatok') shift_down = 4;
    else return '';

    return namedDays[shift_down];
  }

  shortenPatientName(input: string): string {
    const words = input.split(' ');
    if (words.length <= 1) return input;

    const firstWord = words.shift(); // Remove the first word and store it
    const abbreviation = words.map(word => word.charAt(0) + '.').join(' '); // Abbreviate the rest of the words

    return firstWord + ' ' + abbreviation;
  }

  generateTimeOptions(selected: string) {
    const options = [];
    for (let hour = 7; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const time = `${hour}:${this.roundZerous(minute.toString())}`;
        if (time === selected) {
          options.push(
            <option selected={true} value={time}>
              {time}
            </option>,
          );
        } else {
          options.push(<option value={time}>{time}</option>);
        }
      }
    }
    return options;
  }

  roundZerous(min: string): string {
    return min == '0' ? min + '0' : min;
  }

  render() {
    let buttonDown;
    let isValid = checkDate(this.appointment.date);
    let disabled = false;
    let boxClass = 'grid-container-box';

    if (!isValid) {
      disabled = true;
      boxClass = 'grid-container-box  grid-is-old';
    }

    if (this.dropdown === false) buttonDown = 'Rozšíriť';
    else buttonDown = 'Zatvoriť';

    if (this.updating == false) {
      return (
        <div class={boxClass}>
          <span class="item1 text">{'Čas: ' + this.appointment.duration}</span>
          <span class="item2 text">{this.appointment.patient} </span>
          <div class="box-down">
            <button onClick={this.onClickDrop} class="button-down">
              {buttonDown}
            </button>
            <id-information-box
              dropdown={this.dropdown}
              information={this.appointment.description.reasonForAppointment}
              teeths={this.appointment.description.teeths}
            ></id-information-box>
          </div>

          <button disabled={disabled} onClick={this.onUpdate} class="item4 button-update">
            Upraviť
          </button>

          <button disabled={disabled} onClick={this.onDelete} class=" button-del">
            X
          </button>
        </div>
      );
    } else {
      let method;
      if (this.appointment.id === '@new') method = 'POST';
      else method = 'PUT';

      return (
        <form onSubmit={this.onSubmit} class="grid-container-box" method={method}>
          <label class="item1-u text">Dátum</label>
          <input required name="date" class="item2-u" type="date" value={this.appointment.date} />
          <label class="item3-u text">Čas</label>
          <select required name="duration" class="item4-u">
            {this.generateTimeOptions(this.appointment.duration)}
          </select>
          <label class="item5-u text">Meno pacienta</label>
          <input required name="fullname" class="item6-u" type="text" value={this.appointment.fullname} />
          <label class="item7-u text">Popis</label>
          <textarea required placeholder={'Krátky popis'} name="reason" class="item8-u" value={this.appointment.description.reasonForAppointment}>
            {' '}
          </textarea>
          <label class="item9-u text">Postihnuté zuby</label>
          <input placeholder={' 33, 34... '} name="teeths" class="item10-u" type="text" value={this.appointment.description.teeths.join(', ')} />

          <button class="item0-u button-update">Potvrdiť</button>
          <button onClick={this.onCancel} class=" button-del">
            X
          </button>
        </form>
      );
    }
  }
}
