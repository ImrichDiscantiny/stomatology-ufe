import '@material/web/list/list';
import '@material/web/list/list-item';
import '@material/web/icon/icon';

export default function () {}

// export interface AppointmentDescription {
//   reasonForAppointment: string;
//   longSummary: string;
//   teeths: string[];
// }

// export interface Appointments {
//   id: string;
//   date: Date;
//   patient: string;
//   fullname: string;
//   duration: string;
//   dayShortcut: string;
//   description: AppointmentDescription;
// }

export interface FormUpdate {
  id: number | string;
  date: Date;
  pacient: String;
  duration: number;
  dayShortcut: string;
}
