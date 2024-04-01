import { newSpecPage } from '@stencil/core/testing';
import { IdAppointmentBox } from '../id-appointment-box';

describe('id-appointment-box', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IdAppointmentBox],
      html: `<id-appointment-box></id-appointment-box>`,
    });
    expect(page.root).toEqualHtml(`
      <id-appointment-box>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </id-appointment-box>
    `);
  });
});
