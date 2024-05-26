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
  apiBase: '' as string,
  basePath: '/ui/id-appointments-page/' as string,
  relativePath: '',
});

export default state;

export function checkDate(entryDate: string): boolean {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (yesterday >= new Date(entryDate)) {
    return false;
  }
  return true;
}

export async function getAppointments(targetDateStr: string, apiBase: string): Promise<AppointmentListEntry[] | string> {
  try {
    const response = await StomatologyAppointmentListApiFactory(undefined, apiBase).getWaitingListEntries(targetDateStr);
    if (response.status < 299) {
      if (response.data === null) {
        return [];
      }
      return response.data;
    } else {
      return `Načítanie dát zlyhalo: ${response.statusText}`;
    }
  } catch (err: any) {
    return `Nastala chyba: ${err.message || 'unknown'}`;
  }
}

export async function onAddList(entry: AppointmentListEntry, apiBase: string) {
  if (typeof state.appointments == 'string') {
    return;
  }

  let dateChecked = checkDate(entry.date);

  if (!dateChecked) {
    console.log(entry);
    alert('Nemožné pridať starý záznam');
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
      state.appointments = await getAppointments(state.targetDateStr, apiBase);
    } else {
      alert(`Ukladanie zlyhalo: ${response.statusText}`);
    }
  } catch (err: any) {
    alert(`Nastala chyba: ${err.message || 'unknown'}`);
  }
}

export async function onUpdateList(entry: AppointmentListEntry, apiBase: string) {
  let dateChecked = checkDate(entry.date);

  if (!dateChecked) {
    alert('Nemožné zmenit starý záznam');
    return;
  }

  try {
    const response = await StomatologyAppointmentListApiFactory(undefined, apiBase).updateAppointmentListEntry(entry.date, entry.id, entry);
    if (response.status < 299) {
      alert('Zmeny boli uložené');
      state.appointments = await getAppointments(state.targetDateStr, apiBase);
    } else {
      alert(`Ukladanie zlyhalo: ${response.statusText}`);
    }
  } catch (err: any) {
    alert(`Nastala chyba: ${err.message || 'unknown'}`);
  }
}

export async function onDeleteList(date: string, id: string, apiBase: string) {
  let dateChecked = checkDate(date);

  if (!dateChecked) {
    alert('Nemožné odstrániť starý záznam');
    return;
  }

  try {
    const response = await StomatologyAppointmentListApiFactory(undefined, apiBase).deleteAppointmentListEntry(date, id);
    if (response.status < 299) {
      alert('Zmeny boli uložené');
      state.appointments = await getAppointments(state.targetDateStr, apiBase);
    } else {
      alert(`Ukladanie zlyhalo: ${response.statusText}`);
    }
  } catch (err: any) {
    alert(`Nastala chyba: ${err.message || 'unknown'}`);
  }
}
