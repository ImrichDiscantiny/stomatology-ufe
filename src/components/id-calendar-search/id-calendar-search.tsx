import { Component, h, Event, EventEmitter } from '@stencil/core';
import state from '../../global/store';
import { getAppointments } from '../../global/store';

@Component({
  tag: 'id-calendar-search',
  styleUrl: 'id-calendar-search.css',
  shadow: true,
})
export class IdCalendarSearch {
  dateInput!: HTMLInputElement;

  @Event() submitWeek: EventEmitter<String>;

  private handleSubmit = async (event: Event) => {
    event.preventDefault();
    state.appointments = await getAppointments();
    this.submitWeek.emit(this.dateInput.value);
  };

  render() {
    return (
      <div>
        <h2>Kalendár termínov</h2>
        <form action="get">
          <input type="date" ref={el => (this.dateInput = el as HTMLInputElement)} />
          <button onClick={this.handleSubmit}> Vyber týždeň</button>
        </form>
      </div>
    );
  }
}
