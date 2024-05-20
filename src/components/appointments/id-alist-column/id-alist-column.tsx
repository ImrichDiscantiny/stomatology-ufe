import { Component, h, Prop, State, Listen } from '@stencil/core';
import state from '../../../global/store';
import { AppointmentListEntry } from '../../../api/stomatology-al';

@Component({
  tag: 'id-alist-column',
  styleUrl: 'id-alist-column.css',
  shadow: true,
})
export class IdAlistColumn {
  @Prop()
  name: string;

  @Prop()
  weekDay: Date;

  @Prop({ mutable: true })
  appointmentsList: AppointmentListEntry[];

  @State()
  custom: boolean = false;

  @Listen('cancelEvent')
  handlCancel(event: CustomEvent<string>) {
    if (this.custom === true) {
      this.appointmentsList = this.appointmentsList.filter(item => item.id !== event.detail);
      this.custom = false;
    }
  }

  onAdd = () => {
    if (state.updating === false) {
      state.updating = true;
      this.custom = true;

      const europeanDate = this.weekDay.toLocaleString('en-GB', { timeZone: 'Europe/Bratislava' }).split(',')[0].split('/');
      console.log(europeanDate);

      this.appointmentsList = [
        {
          id: '@new',
          patient: '',
          fullname: '',
          date: europeanDate[2] + '-' + europeanDate[1] + '-' + europeanDate[0],
          duration: '',
          dayShortcut: this.name,
          description: { reasonForAppointment: '', teeths: [] },
        },
        ...this.appointmentsList,
      ];
    }
  };

  timeToInt(timeStr: string): number {
    const [hours, minutes] = timeStr.split(':');
    return Number(hours);
  }

  render() {
    const sortedNumber = this.appointmentsList.sort((a, b) =>
      this.timeToInt(a.duration) > this.timeToInt(b.duration) ? 1 : this.timeToInt(b.duration) > this.timeToInt(a.duration) ? -1 : 0,
    );

    return (
      <div>
        <div class="day-header">
          <h3>{`${this.name} - ${this.weekDay.getDate()}.${this.weekDay.getMonth() + 1}`}</h3>
          <button onClick={this.onAdd}>+</button>
        </div>
        <div>
          {this.appointmentsList.map(app =>
            app.id === '@new' ? (
              <id-appointment-box updating={true} appointment={app}></id-appointment-box>
            ) : (
              <id-appointment-box updating={false} appointment={app}></id-appointment-box>
            ),
          )}
        </div>
      </div>
    );
  }
}
