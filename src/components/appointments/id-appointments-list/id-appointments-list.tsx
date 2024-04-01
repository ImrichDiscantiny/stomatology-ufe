import { Component, h, Prop, State } from '@stencil/core';
import '@material/web/list/list'
import '@material/web/list/list-item'


interface Appointments{
  date: Date
  pacient: String
  duration: number
  dayShortcut: string
 
}

interface DayColumn{
  date: Date
  name: String
  isNotBetween: boolean
  appointmentsList: Appointments[]
}

@Component({
  tag: 'id-appointments-list',
  styleUrl: 'id-appointments-list.css',
  shadow: true,
})
export class IdAppointmentsList {

  @Prop({ mutable: true }) selectedDay: Date | null;

  @State()
  appointmentsList: Appointments[]

   getAppointments(): Appointments[] {
    const today = new Date();
    const appointments = [
        {pacient: "Matej D.", date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0), duration: 45, dayShortcut: "Po"},
        {pacient: "Adam R.", date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 15), duration: 45, dayShortcut: "Po"},
        {pacient: "Rudolf S.", date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30), duration: 60, dayShortcut: "St"},
        {pacient: "Ján N.", date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 45), duration: 30, dayShortcut: "Po"},
        {pacient: "Branislav P.", date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12, 0), duration: 30, dayShortcut: "Pia"}
];
    return appointments
  }

  initAppointments(){
    this.appointmentsList = this.getAppointments();
  }

  getWholeWeek(): DayColumn[] {

    if(this.selectedDay === null) return []
    
    let start = this.selectedDay
    let shift_down: number
    const listDays = []
    const nameDay = this.selectedDay.toLocaleString('sk-SK', {weekday:'long'})
    const namedDays = ["Po", "Ut", "St", "Št", "Pia"]
    console.log(this.selectedDay)
    
    if(nameDay === "pondelok" )
      shift_down = 0
     
    else if(nameDay === "utorok" )
      shift_down = 1
         
    else if(nameDay === "streda" )
      shift_down = 2
        
    else if(nameDay === "štvrtok" )
      shift_down = 3
          
    else if(nameDay === "piatok" )
      shift_down = 4
         
    else if(nameDay === "sobota" )
      shift_down = 5
      
    else if(nameDay === "nedeľa" )
      shift_down = 6
      
    start.setDate(this.selectedDay.getDate() - shift_down);

    console.log(start)
    
    listDays.push(
      {
        date: start, 
        name: namedDays[0],
        isNotBetween: true, 
        appointmentsList: this.appointmentsList.filter(appointment => {
      return appointment.dayShortcut === namedDays[0];
    })} )
    
    for(let i = 1; i<5; i++){
      const isNotBetween = i<4? true: false
      
      const filteredApointments  = this.appointmentsList.filter(appointment => {
        return appointment.dayShortcut === namedDays[i];
      });
      
      const newDate = new Date(start);
      
      newDate.setDate(start.getDate() + i)
      
      listDays.push({date: newDate, name: namedDays[i], isNotBetween: isNotBetween, appointmentsList: filteredApointments} )
    }
   

   
    return listDays
  }

  render() {

    this.initAppointments()
    const daysList = this.getWholeWeek()
    
    return (
      <div class="div-flex-container">
        {
        daysList.map(day => (
          <div class= {day.isNotBetween == true? " div-between": "div-column"}>
            <id-alist-column name={day.name} weekDay={day.date} appointmentsList={day.appointmentsList} ></id-alist-column>
          </div>
        ))
      }
      </div>
    );
  }

}
