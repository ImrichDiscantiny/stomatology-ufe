import { newSpecPage } from '@stencil/core/testing';
import { IdAppointmentsPage } from '../id-appointments-page';

describe('id-appointments-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IdAppointmentsPage],
      html: `<id-appointments-page></id-appointments-page>`,
    });
    expect(page.root).toEqualHtml(`
      <id-appointments-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </id-appointments-page>
    `);
  });
});
