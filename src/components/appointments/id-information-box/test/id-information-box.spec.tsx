import { newSpecPage } from '@stencil/core/testing';
import { IdInformationBox } from '../id-information-box';

describe('id-information-box', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IdInformationBox],
      html: `<id-information-box></id-information-box>`,
    });
    expect(page.root).toEqualHtml(`
      <id-information-box>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </id-information-box>
    `);
  });
});
