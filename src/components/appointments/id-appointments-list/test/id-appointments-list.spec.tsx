import { newSpecPage } from '@stencil/core/testing';
import { IdAppointmentsList } from '../id-appointments-list';

describe('id-appointments-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IdAppointmentsList],
      html: `<id-appointments-list></id-appointments-list>`,
    });
    expect(page.root).toEqualHtml(`
      <id-appointments-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </id-appointments-list>
    `);
  });
});
