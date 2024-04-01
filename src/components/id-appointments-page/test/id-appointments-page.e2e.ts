import { newE2EPage } from '@stencil/core/testing';

describe('id-appointments-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<id-appointments-page></id-appointments-page>');

    const element = await page.find('id-appointments-page');
    expect(element).toHaveClass('hydrated');
  });
});
