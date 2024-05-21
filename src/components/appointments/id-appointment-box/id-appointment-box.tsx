import { Component, h, Prop, Event, State, EventEmitter } from '@stencil/core';
import { AppointmentListEntry } from '../../../api/stomatology-al';
import state from '../../../global/store';
import { onAddList, onUpdateList, onDeleteList } from '../../../global/store';

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
    await onDeleteList(this.appointment.date, this.appointment.id);
  };

  onSubmit = (event: Event) => {
    event.preventDefault();
    const form = event.target;

    let action = form['form'].action.split('/');
    action = action[action.length - 1];

    const dayShortcut = this.getSlovakDay(form['form']['0']['value']);

    if (dayShortcut === '') {
      console.log(dayShortcut);
      alert('Cannot add appointments for saturday or sunday');
      return;
    }

    const appointmentEntry: AppointmentListEntry = {
      id: this.appointment.id,
      date: form['form']['0']['value'],
      duration: form['form']['1']['value'],
      patient: this.shortenPatientName(form['form']['2']['value']),
      fullname: form['form']['2']['value'],
      dayShortcut: dayShortcut,
      description: {
        reasonForAppointment: form['form']['3']['value'],
        teeths: form['form']['4']['value'].split(/[,\s]+/),
      },
    };
    this.cancelEvent.emit(this.appointment.id);
    if (action === 'POST') onAddList(appointmentEntry);
    else {
      onUpdateList(appointmentEntry);
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
    if (this.dropdown === false) buttonDown = 'Rozšíriť';
    else buttonDown = 'Zatvoriť';

    if (this.updating == false) {
      return (
        <div class="grid-container-box">
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

          <button onClick={this.onUpdate} class="item4 button-update">
            Upraviť
          </button>
          <button onClick={this.onDelete} class=" button-del">
            X
          </button>
        </div>
      );
    } else {
      let action;
      if (this.appointment.id === '@new') action = 'POST';
      else action = 'PUT';

      return (
        <form onSubmit={this.onSubmit} class="grid-container-box" action={action}>
          <label class="item1-u text">Dátum</label>
          <input required class="item2-u" type="date" value={this.appointment.date} />
          <label class="item3-u text">Čas</label>
          <select required class="item4-u">
            {this.generateTimeOptions(this.appointment.duration)}
          </select>
          <label class="item5-u text">Meno pacienta</label>
          <input required class="item6-u" type="text" value={this.appointment.fullname} />
          <label class="item7-u text">Popis</label>
          <textarea placeholder={'Krátky popis'} required class="item8-u" value={this.appointment.description.reasonForAppointment}>
            {' '}
          </textarea>
          <label class="item9-u text">Postihnuté zuby</label>
          <input placeholder={' 33, 34... '} class="item10-u" type="text" value={this.appointment.description.teeths.join(', ')} />

          <button class="item0-u button-update">Potvrdiť</button>
          <button onClick={this.onCancel} class=" button-del">
            X
          </button>
        </form>
      );
    }
  }
}
