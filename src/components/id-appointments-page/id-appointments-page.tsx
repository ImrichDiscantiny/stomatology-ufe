import { Component, h, State, Listen } from '@stencil/core';

@Component({
  tag: 'id-appointments-page',
  styleUrl: 'id-appointments-page.css',
  shadow: true,
})
export class IdAppointmentsPage {
  @State()
  dayYear: String | null;

  @Listen('submitWeek')
  submitWeekHandler(event: CustomEvent<String>) {
    this.dayYear = event.detail;
  }

  render() {
    let date = null;

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
