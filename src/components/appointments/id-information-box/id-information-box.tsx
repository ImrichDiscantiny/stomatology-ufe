import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'id-information-box',
  styleUrl: 'id-information-box.css',
  shadow: true,
})
export class IdInformationBox {
  @Prop()
  dropdown: boolean;
  @Prop()
  information: string;
  @Prop()
  teeths: string[];

  render() {
    if (this.dropdown) {
      return (
        <div class="box-down">
          <h4>Dôvod:</h4>
          <span>{this.information}</span>
          <h4>Postihnuté zuby:</h4>
          <span>{this.teeths.join(', ')}</span>
        </div>
      );
    } else return <div></div>;
  }
}
