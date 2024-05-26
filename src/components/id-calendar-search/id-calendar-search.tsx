import { Component, h, State, Prop } from '@stencil/core';
import state from '../../global/store';
import { getAppointments } from '../../global/store';

@Component({
  tag: 'id-calendar-search',
  styleUrl: 'id-calendar-search.css',
  shadow: true,
})
export class IdCalendarSearch {
  @State()
  dateInput!: string;

  @Prop()
  apiBase: string;

  componentWillLoad() {
    const baseUri = new URL(state.basePath, document.baseURI || '/').pathname;

    const toRelative = (path: string) => {
      if (path.startsWith(baseUri)) {
        state.relativePath = path.slice(baseUri.length);
      } else {
        state.relativePath = '';
      }
    };

    window.navigation?.addEventListener('navigate', (ev: Event) => {
      if ((ev as any).canIntercept) {
        (ev as any).intercept();
      }
      let path = new URL((ev as any).destination.url).pathname;
      toRelative(path);
    });

    toRelative(location.pathname);
  }

  private handleSubmit = (event: Event) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    this.dateInput = formData.get('time') as string;

    const absolute = new URL(this.dateInput + '/entries', new URL(state.basePath, document.baseURI)).pathname;
    window.navigation.navigate(absolute);

    state.targetDateStr = this.dateInput;
    state.updating = false;

    this.getAppointmets();
  };

  private async getAppointmets() {
    state.appointments = await getAppointments(this.dateInput, state.apiBase);
  }

  getFormattedDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  render() {
    state.apiBase = this.apiBase;
    this.dateInput = this.getFormattedDate();
    this.getAppointmets();
    console.log(this.apiBase);

    return (
      <div>
        <h2>Kalendár termínov</h2>
        <form action="get" onSubmit={this.handleSubmit}>
          <input name="time" type="date" value={this.dateInput} />
          <button> Vyber týždeň</button>
        </form>
      </div>
    );
  }
}
