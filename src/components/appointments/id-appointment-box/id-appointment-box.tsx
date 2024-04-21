import { Component, h, Prop} from '@stencil/core';
import {Appointments} from '../../../global/app'
import state from '../../../global/store';

@Component({
  tag: 'id-appointment-box',
  styleUrl: 'id-appointment-box.css',
  shadow: true,
  assetsDirs: ['assets']
})

export class IdAppointmentBox {

  @Prop()
  appointment: Appointments;

  @Prop()
  updating: boolean

  onUpdate = () =>{
    this.updating = true
    state.updating = true
  }

  onCancel = (event: Event) =>{
    event.preventDefault()
    this.updating = false
    state.updating = false
    
  }

  onDelete = (event: Event) =>{
    event.preventDefault()
    alert(this.appointment.id)
    
  }

  onSubmit = (event: Event) =>{
    event.preventDefault()
    const form = event.target; // Get the form element
    console.log(form["form"]["0"]["value"])
    console.log(form["form"]["1"]["value"])
    console.log(form["form"]["2"]["value"])
    
  }



  generateTimeOptions() {
    const options = [];
    for (let hour = 7; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 60) { // Changed to 60-minute intervals
        const time = `${hour}:${this.roundZerous(minute.toString())}`;
        options.push(<option value={time}>{time}</option>);
      }
    }
    return options;
  }

  roundZerous(min: string): string{
    return min == "0" ? min + "0" : min;
  }

  getCurrentDate(): string{
    const currentDate = new Date();
    const currentDateString = currentDate.toISOString().substr(0, 10);
    return currentDateString
  }

  render() {
    const hours = this.appointment.date.getHours();
    const minutes = this.appointment.date.getMinutes();

    const endTime = new Date(this.appointment.date.getTime() + this.appointment.duration * 60000);
    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes().toString();

    // const imageSrc1 = getAssetPath(`/assets/${this.image1}`)
    // const imageSrc2 = getAssetPath(`/assets/${this.image2}`)

    if( this.updating == false){
      return (
        <div class="grid-container-box">
        
          <a href="https://www.w3schools.com" class="item1 text">{hours + ":" + this.roundZerous( minutes.toString() ) + " - " + endHours + ":" + this.roundZerous(endMinutes)}</a>
          <span class="item2 text">{this.appointment.pacient} </span>
          
          <button onClick={this.onUpdate} class="item3 button-update"> Upraviť  </button>
          <button onClick={this.onDelete} class=" button-del"> X </button>

        </div>
        );
      
    }
    else{
      return (
      
        <form class="grid-container-box" action="update">
          <label class="item1-u text">Dátum</label>
          <input class="item2-u"  type="date" value={this.getCurrentDate()}/>
          <label class="item3-u text">Čas</label>
          <select class="item4-u">
            {this.generateTimeOptions()}
          </select>
          <label class="item5-u text">Meno pacienta</label>
          <input class="item6-u" type="text" value={this.appointment.pacient}/>
          
          <button onClick={this.onSubmit} class="item7-u button-update"> Potvrdiť  </button>
          <button onClick={this.onCancel} class=" button-del"> X </button>
        </form>
     
        );
    }
    
  }

}
