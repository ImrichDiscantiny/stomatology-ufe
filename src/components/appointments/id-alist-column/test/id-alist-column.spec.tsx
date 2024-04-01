import { newSpecPage } from '@stencil/core/testing';
import { IdAlistColumn } from '../id-alist-column';

describe('id-alist-column', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IdAlistColumn],
      html: `<id-alist-column></id-alist-column>`,
    });
    expect(page.root).toEqualHtml(`
      <id-alist-column>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </id-alist-column>
    `);
  });
});
