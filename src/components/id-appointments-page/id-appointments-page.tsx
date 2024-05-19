import { Component, h, State } from '@stencil/core';
import state from '../../global/store';

@Component({
  tag: 'id-appointments-page',
  styleUrl: 'id-appointments-page.css',
  shadow: true,
})
export class IdAppointmentsPage {
  @State()
  dayYear: String | null;

  formatDate() {
    if(!state.targetDateStr){
      const currentDate = new Date();
     
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      this.dayYear = `${year}-${month}-${day}`;
    }
    else this.dayYear =  state.targetDateStr

  }

  render() {
    let date
    this.formatDate();

    if (this.dayYear) {
      date = this.dayYear.split('-');
      date = new Date(date[0], date[1] - 1, date[2]);
    }

    return (
      <div class="container">
        <id-calendar-search></id-calendar-search>
        <id-appointments-list selectedDay={date}></id-appointments-list>
      </div>
    );
  }
}
