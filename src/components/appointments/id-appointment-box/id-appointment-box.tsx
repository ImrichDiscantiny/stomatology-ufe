import { Component, h, Prop} from '@stencil/core';

@Component({
  tag: 'id-appointment-box',
  styleUrl: 'id-appointment-box.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class IdAppointmentBox {

  image1 = '240_F_173770068_LRQyNUZQn9WtQyJoJsOEwK8qwBzypBm0.jpg'
  image2 = 'box_delete.svg'

  @Prop()
  appointment: any;

  @Prop()
  update: boolean

  roundZerous(min: string): string{
    return min == "0" ? min + "0" : min;
  }

  render() {
    const hours = this.appointment.date.getHours();
    const minutes = this.appointment.date.getMinutes();

    const endTime = new Date(this.appointment.date.getTime() + this.appointment.duration * 60000);
    const endHours = endTime.getHours();
    const endMinutes = endTime.getMinutes().toString();

    // const imageSrc1 = getAssetPath(`/assets/${this.image1}`)
    // const imageSrc2 = getAssetPath(`/assets/${this.image2}`)

    if( this.update == false){
      return (
        <div class="grid-container-box">
        
        <a href="https://www.w3schools.com" class="item1 text">{hours + ":" + this.roundZerous(minutes) + " - " + endHours + ":" + this.roundZerous(endMinutes)}</a>
        <span class="item2 text">{this.appointment.pacient} </span>
        
        <button class="item3 button-update"> Upraviť  </button>
        <button class=" button-del"> X </button>

      </div>
        );
      
    }
    else{
      return (
        <div >
        <form class="grid-container-box" action="">
          <label>Čas</label>
          <input/>
          <label>Meno pacienta</label>
          <input/>
          
          <button class="item3 button-update"> Upraviť  </button>
          <button class=" button-del"> X </button>
        </form>
      </div>
        );
    }
    
  }

}
