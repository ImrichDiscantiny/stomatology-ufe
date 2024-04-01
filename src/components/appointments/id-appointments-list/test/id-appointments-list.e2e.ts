import { newE2EPage } from '@stencil/core/testing';

describe('id-appointments-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<id-appointments-list></id-appointments-list>');

    const element = await page.find('id-appointments-list');
    expect(element).toHaveClass('hydrated');
  });
});
