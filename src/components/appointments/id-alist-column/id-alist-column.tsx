import { Component, h, Prop, State } from '@stencil/core';

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

  @State()
  added: boolean
 
  onAdd = () => {
    this.added = true
    this.appointmentsList = [
      {     pacient: "Adam M.", date: new Date(), duration: 45, dayShortcut: "Po"},
      ...this.appointmentsList
    ];
  
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
            this.appointmentsList.map((app, index) =>(
              this.added && index === 0 ? (
                <id-appointment-box update={true} appointment={app}></id-appointment-box>
              ) : (
                <id-appointment-box update={false} appointment={app}></id-appointment-box>
              )
              
            ))
          }
          </div>

      </div>
    );
  }

}
