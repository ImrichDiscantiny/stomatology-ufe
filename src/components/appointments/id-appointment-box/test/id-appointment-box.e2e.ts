import { newE2EPage } from '@stencil/core/testing';

describe('id-appointment-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<id-appointment-box></id-appointment-box>');

    const element = await page.find('id-appointment-box');
    expect(element).toHaveClass('hydrated');
  });
});
