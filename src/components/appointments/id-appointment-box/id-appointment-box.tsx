import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
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
  @Prop()
  appointment: AppointmentListEntry;

  @Prop()
  updating: boolean;

  @Event() cancelEvent: EventEmitter<String>;

  onCancel = (event: Event) => {
    event.preventDefault();
    this.updating = false;
    state.updating = false;

    this.cancelEvent.emit(this.appointment.id);
  };

  onUpdate = () => {
    this.updating = true;
    state.updating = true;
  };

  onDelete = async (event: Event) => {
    event.preventDefault();
    console.log('aa');
    await onDeleteList(this.appointment.date, this.appointment.id);
  };

  onSubmit = (event: Event) => {
    event.preventDefault();
    const form = event.target;

    let action = form['form'].action.split('/');
    action = action[action.length - 1];

    // console.log(action);
    // console.log(form['form']['0']['value']);
    // console.log(form['form']['1']['value']);
    // console.log(form['form']['2']['value']);
    // console.log(form['form']['3']['value']);
    // console.log(form['form']['4']['value']);

    const appointmentEntry: AppointmentListEntry = {
      id: this.appointment.id,
      date: form['form']['0']['value'],
      duration: form['form']['1']['value'],
      patient: this.shortenPatientName(form['form']['1']['value']),
      fullname: form['form']['2']['value'],
      dayShortcut: this.getSlovakDay(form['form']['0']['value']),
      description: {
        reasonForAppointment: form['form']['3']['value'],
        teeths: form['form']['4']['value'].split(/[,\s]+/),
      },
    };

    if (action === 'POST') onAddList(appointmentEntry);
    else onUpdateList(appointmentEntry);
  };

  getSlovakDay(selectedDay) {
    const date = new Date(selectedDay);

    const nameDay = date.toLocaleDateString('sk-SK', { weekday: 'long', timeZone: 'Europe/Bratislava' });
    const namedDays = ['Po', 'Ut', 'St', 'Št', 'Pia'];

    let shift_down;

    if (nameDay === 'pondelok') shift_down = 0;
    else if (nameDay === 'utorok') shift_down = 1;
    else if (nameDay === 'streda') shift_down = 2;
    else if (nameDay === 'štvrtok') shift_down = 3;
    else if (nameDay === 'piatok') shift_down = 4;
    else if (nameDay === 'sobota') shift_down = 5;
    else if (nameDay === 'nedeľa') shift_down = 6;

    return namedDays[shift_down];
  }

  shortenPatientName(input: string): string {
    const words = input.split(' ');
    if (words.length <= 1) return input;

    const firstWord = words.shift(); // Remove the first word and store it
    const abbreviation = words.map(word => word.charAt(0) + '.').join(' '); // Abbreviate the rest of the words

    return firstWord + ' ' + abbreviation;
  }

  generateTimeOptions() {
    const options = [];
    for (let hour = 7; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const time = `${hour}:${this.roundZerous(minute.toString())}`;
        options.push(<option value={time}>{time}</option>);
      }
    }
    return options;
  }

  roundZerous(min: string): string {
    return min == '0' ? min + '0' : min;
  }

  render() {
    if (this.updating == false) {
      return (
        <div class="grid-container-box">
          <a href="https://www.w3schools.com" class="item1 text">
            {'Čas: ' + this.appointment.duration}
          </a>
          <span class="item2 text">{this.appointment.patient} </span>

          <button onClick={this.onUpdate} class="item3 button-update">
            Upraviť
          </button>
          <button onClick={this.onDelete} class=" button-del">
            X
          </button>
        </div>
      );
    } else {
      let action;
      if (this.appointment.id === 'new') action = 'POST';
      else action = 'PUT';

      return (
        <form class="grid-container-box" action={action}>
          <label class="item1-u text">Dátum</label>
          <input class="item2-u" type="date" value={this.appointment.date} />
          <label class="item3-u text">Čas</label>
          <select class="item4-u">{this.generateTimeOptions()}</select>
          <label class="item5-u text">Meno pacienta</label>
          <input class="item6-u" type="text" value={this.appointment.patient} />
          <label class="item7-u text">Popis</label>
          <textarea class="item8-u" value={this.appointment.description.reasonForAppointment}>
            {' '}
          </textarea>
          <label class="item9-u text">Zuby</label>
          <input class="item10-u" type="text" value={this.appointment.description.teeths.join(', ')} />

          <button onClick={this.onSubmit} class="item0-u button-update">
            Potvrdiť
          </button>
          <button onClick={this.onCancel} class=" button-del">
            X
          </button>
        </form>
      );
    }
  }
}
