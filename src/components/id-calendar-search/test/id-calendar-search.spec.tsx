import { newSpecPage } from '@stencil/core/testing';
import { IdCalendarSearch } from '../id-calendar-search';

describe('id-calendar-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IdCalendarSearch],
      html: `<id-calendar-search></id-calendar-search>`,
    });
    expect(page.root).toEqualHtml(`
      <id-calendar-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </id-calendar-search>
    `);
  });
});
