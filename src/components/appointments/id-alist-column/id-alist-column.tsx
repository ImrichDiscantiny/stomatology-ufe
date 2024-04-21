import { Component, h, Prop} from '@stencil/core';
import state from '../../../global/store';

@Component({
  tag: 'id-alist-column',
  styleUrl: 'id-alist-column.css',
  shadow: true,
})
export class IdAlistColumn {

  @Prop()
  name: String
  
  @Prop()
  weekDay: Date

  @Prop({mutable: true})
  appointmentsList: any[]


  onAdd = () => {

    if(state.updating === false){
      state.updating = true
      
      this.appointmentsList = [
        { id: 'new', pacient: "", date: new Date(), duration: 0, dayShortcut: this.name},
        ...this.appointmentsList
      ];
    }
  }

  render() {
    console.log(this.appointmentsList)
    return (
      <div>    
          <div class="day-header">
            <h3 >{`${this.name} - ${this.weekDay.getDate()}.${this.weekDay.getMonth() + 1}`}</h3>
            <button onClick={this.onAdd}>+</button>
          </div>
        <div>
          {
            this.appointmentsList.map((app) =>(
              app.id === 'new' ? (
                <id-appointment-box updating={true} appointment={app}></id-appointment-box>
              ) : (
                <id-appointment-box updating={false} appointment={app}></id-appointment-box>
              )
              
            ))
          }
          </div>

      </div>
    );
  }

}
