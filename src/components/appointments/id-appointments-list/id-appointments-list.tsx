import { Component, h, Prop, State } from '@stencil/core';
import '@material/web/list/list';
import '@material/web/list/list-item';
import { AppointmentListEntry } from '../../../api/stomatology-al';
import state from '../../../global/store';

interface DayColumn {
  date: Date;
  name: string;
  isNotBetween: boolean;
  appointmentsList: AppointmentListEntry[];
}

@Component({
  tag: 'id-appointments-list',
  styleUrl: 'id-appointments-list.css',
  shadow: true,
})
export class IdAppointmentsList {
  @Prop({ mutable: true }) selectedDay: Date | null;

  @State()
  appointmentsList: AppointmentListEntry[] | string;

  initAppointments() {
    this.appointmentsList = state.appointments;
  }

  getWholeWeek(): DayColumn[] {
    if (this.selectedDay === null) return [];

    if (typeof state.appointments === 'string') {
      alert(state.appointments);
      this.appointmentsList = [];
    }

    let start = this.selectedDay;
    let shift_down: number;
    const listDays = [];
    const nameDay = this.selectedDay.toLocaleString('sk-SK', { weekday: 'long' });
    const namedDays = ['Po', 'Ut', 'St', 'Št', 'Pia'];

    if (nameDay === 'pondelok') shift_down = 0;
    else if (nameDay === 'utorok') shift_down = 1;
    else if (nameDay === 'streda') shift_down = 2;
    else if (nameDay === 'štvrtok') shift_down = 3;
    else if (nameDay === 'piatok') shift_down = 4;
    else if (nameDay === 'sobota') shift_down = 5;
    else if (nameDay === 'nedeľa') shift_down = 6;

    start.setDate(this.selectedDay.getDate() - shift_down);

    console.log(start);

    listDays.push({
      date: start,
      name: namedDays[0],
      isNotBetween: true,
      // @ts-ignore: Unreachable code error
      appointmentsList: this.appointmentsList.filter(appointment => {
        return appointment.dayShortcut === namedDays[0];
      }),
    });

    for (let i = 1; i < 5; i++) {
      const isNotBetween = i < 4 ? true : false;
      // @ts-ignore: Unreachable code error
      const filteredApointments = this.appointmentsList.filter(appointment => {
        return appointment.dayShortcut === namedDays[i];
      });

      const newDate = new Date(start);

      newDate.setDate(start.getDate() + i);

      listDays.push({ date: newDate, name: namedDays[i], isNotBetween: isNotBetween, appointmentsList: filteredApointments });
    }

    return listDays;
  }

  render() {
    this.initAppointments();
    const daysList = this.getWholeWeek();

    return (
      <div class="div-flex-container">
        {daysList.map(day => (
          <div class={day.isNotBetween == true ? ' div-between' : 'div-column'}>
            <id-alist-column name={day.name} weekDay={day.date} appointmentsList={day.appointmentsList}></id-alist-column>
          </div>
        ))}
      </div>
    );
  }
}
