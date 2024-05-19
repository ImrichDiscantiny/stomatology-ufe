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
    console.log(this.dateInput.value)
    state.targetDateStr = this.dateInput.value
    state.updating = false;
    state.appointments = await getAppointments(this.dateInput.value);
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
