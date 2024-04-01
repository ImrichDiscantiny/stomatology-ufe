import { Component, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'id-calendar-search',
  styleUrl: 'id-calendar-search.css',
  shadow: true,
})

export class IdCalendarSearch {

  weekInput!: HTMLInputElement


  @Event() submitWeek: EventEmitter<String>


  private handleSubmit = (event: Event) =>{
    event.preventDefault()
    this.submitWeek.emit(this.weekInput.value)

  }


  render() {
    return (
      <div>
        <h2>Kalendár termínov</h2>
        <form  action="get">
          <input type='date' ref={el => this.weekInput = el as HTMLInputElement}/>
          <button onClick={this.handleSubmit}> Vyber týždeň</button>
        </form>
        
      </div>
    );
  }

}
