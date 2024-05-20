import { Component, h } from '@stencil/core';
import state from '../../global/store';
import { getAppointments } from '../../global/store';

@Component({
  tag: 'id-calendar-search',
  styleUrl: 'id-calendar-search.css',
  shadow: true,
})
export class IdCalendarSearch {
  dateInput!: HTMLInputElement;

  private handleSubmit = async (event: Event) => {
    event.preventDefault();

    state.targetDateStr = this.dateInput.value;
    state.updating = false;
    state.appointments = await getAppointments(this.dateInput.value);
  };

  getFormattedDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  render() {
    return (
      <div>
        <h2>Kalendár termínov</h2>
        <form action="get">
          <input type="date" value={this.getFormattedDate()} ref={el => (this.dateInput = el as HTMLInputElement)} />
          <button onClick={this.handleSubmit}> Vyber týždeň</button>
        </form>
      </div>
    );
  }
}
