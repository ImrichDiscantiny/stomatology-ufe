import { newE2EPage } from '@stencil/core/testing';

describe('id-calendar-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<id-calendar-search></id-calendar-search>');

    const element = await page.find('id-calendar-search');
    expect(element).toHaveClass('hydrated');
  });
});
