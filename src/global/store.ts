import { createStore } from '@stencil/store';
import { StomatologyAppointmentListApiFactory, AppointmentListEntry } from '../api/stomatology-al';

export interface FormUpdate {
  id: number | string;
  date: Date;
  pacient: String;
  duration: number;
  dayShortcut: string;
}

const { state } = createStore({
  targetDateStr: null as string | null,
  updating: false,
  appointments: [] as string | AppointmentListEntry[],
});

export async function getAppointments(targetDateStr: string): Promise<AppointmentListEntry[] | string> {
  const apiBase = 'http://localhost:30081/api';

  try {
    const response = await StomatologyAppointmentListApiFactory(undefined, apiBase).getWaitingListEntries(targetDateStr);
    if (response.status < 299) {
      if (response.data === null) {
        return [];
      }
      return response.data;
    } else {
      return `Cannot retrieve list of appointments: ${response.statusText}`;
    }
  } catch (err: any) {
    return `Cannot retrieve list of appointments: ${err.message || 'unknown'}`;
  }
}

export async function onAddList(entry: AppointmentListEntry) {
  const apiBase = 'http://localhost:30081/api';

  if (typeof state.appointments == 'string') {
    return;
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (yesterday > new Date(entry.date)) {
    alert('Nemožné odstrániť starý záznam');
    return;
  }

  const filteredDates = state.appointments.filter(item => item.date === entry.date);
  const filteredTimes = filteredDates.filter(item => {
    return item.duration === entry.duration;
  });

  if (filteredTimes.length > 0) {
    alert('Čaš už je obsadený');
    return;
  }

  try {
    const response = await StomatologyAppointmentListApiFactory(undefined, apiBase).createAppointmentListEntry(entry.date, entry);
    if (response.status < 299) {
      alert('Zmeny boli uložené');
      state.appointments = await getAppointments(state.targetDateStr);
    } else {
      alert(`Cannot store entry: ${response.statusText}`);
    }
  } catch (err: any) {
    alert(`Cannot store entry: ${err.message || 'unknown'}`);
  }
}

export async function onUpdateList(entry: AppointmentListEntry) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (yesterday > new Date(entry.date)) {
    alert('Nemožné odstrániť starý záznam');
    return;
  }

  const apiBase = 'http://localhost:30081/api';
  try {
    const response = await StomatologyAppointmentListApiFactory(undefined, apiBase).updateAppointmentListEntry(entry.date, entry.id, entry);
    if (response.status < 299) {
      alert('Zmeny boli uložené');
      state.appointments = await getAppointments(state.targetDateStr);
    } else {
      alert(`Cannot store entry: ${response.statusText}`);
    }
  } catch (err: any) {
    alert(`Cannot store entry: ${err.message || 'unknown'}`);
  }
}

export async function onDeleteList(date: string, id: string) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (yesterday > new Date(date)) {
    alert('Nemožné odstrániť starý záznam');
    return;
  }

  const apiBase = 'http://localhost:30081/api';

  try {
    const response = await StomatologyAppointmentListApiFactory(undefined, apiBase).deleteAppointmentListEntry(date, id);
    if (response.status < 299) {
      alert('Zmeny boli uložené');
      state.appointments = await getAppointments(state.targetDateStr);
    } else {
      alert(`Cannot delete entry: ${response.statusText}`);
    }
  } catch (err: any) {
    alert(`Cannot delete entry: ${err.message || 'unknown'}`);
  }
}

export default state;

// const today = new Date();
// const appointments: AppointmentListEntry[] = [
//   {
//     id: '0',
//     date: today,
//     patient: 'Marrtin G.',
//     fullname: 'Marrtin G.',
//     duration: '7:00',
//     dayShortcut: 'Po',
//     description: {
//       reasonForAppointment: 'Pravidelná kontrola',
//       longSummary: 'Marrtin G. mal termín na pravidelnú kontrolu. Pri vyšetrení sa zistilo, že má zdravé zuby bez zistených problémov.',
//       teeths: [],
//     },
//   },
//   {
//     id: '1',
//     date: today,
//     patient: 'Adam R.',
//     fullname: 'Adam R.',
//     duration: '8:00',
//     dayShortcut: 'Po',
//     description: {
//       reasonForAppointment: 'Bolesť zubov',
//       longSummary: 'Adam R. prišiel kvôli bolesti zubov. Po vyšetrení sa zistila kazuistika a odporučil sa mu ďalší postup liečby.',
//       teeths: [],
//     },
//   },
//   {
//     id: '2',
//     date: today,
//     patient: 'Rudolf S.',
//     fullname: 'Rudolf S.',
//     duration: '12:00',
//     dayShortcut: 'St',
//     description: {
//       reasonForAppointment: 'Čistenie zubov',
//       longSummary: 'Rudolf S. prišiel na termín na čistenie zubov. Čistenie prebehlo bez problémov a Rudolf bol oboznámený s dôležitosťou ústnej hygieny.',
//       teeths: [],
//     },
//   },
//   {
//     id: '3',
//     date: today,
//     patient: 'Ján N.',
//     fullname: 'Ján N.',
//     duration: '9:00',
//     dayShortcut: 'Po',
//     description: {
//       reasonForAppointment: 'Krvácanie ďasien',
//       longSummary: 'Ján N. sa sťažoval na krvácanie ďasien. Po vyšetrení bola zistená zápal ďasien a diskutovali sa možnosti liečby.',
//       teeths: [],
//     },
//   },
//   {
//     id: '4',
//     date: today,
//     patient: 'Branislav P.',
//     fullname: 'Branislav P.',
//     duration: '14:00',
//     dayShortcut: 'Pia',
//     description: {
//       reasonForAppointment: 'Zlomený zub',
//       longSummary: 'Branislav P. mal zlomený zub. Ďalšie vyšetrenie odhalilo, že na opravu zubu je potrebné plnenie.',
//       teeths: [],
//     },
//   },
// ];

// return appointments;
