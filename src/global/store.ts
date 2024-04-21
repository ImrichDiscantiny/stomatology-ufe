import { createStore } from "@stencil/store";
import { Appointments } from "./app";

function getAppointments(): Appointments[] {
    const today = new Date();
    const appointments = [
        {id: "0", pacient: "Marrtin G.", date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0), duration: 45, dayShortcut: "Po"},
        {id: "1", pacient: "Adam R.", date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 15), duration: 45, dayShortcut: "Po"},
        {id: "2", pacient: "Rudolf S.", date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30), duration: 60, dayShortcut: "St"},
        {id: "3", pacient: "Ján N.", date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 45), duration: 30, dayShortcut: "Po"},
        {id: "4", pacient: "Branislav P.", date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0), duration: 30, dayShortcut: "Pia"}
    ];
    return appointments
  }

const { state, onChange } = createStore({
  updating: false,
  appointments: getAppointments()
});


onChange('updating', value => {
  state.updating = value;
});

export default state;