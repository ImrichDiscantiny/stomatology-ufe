import { newE2EPage } from '@stencil/core/testing';

describe('id-information-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<id-information-box></id-information-box>');

    const element = await page.find('id-information-box');
    expect(element).toHaveClass('hydrated');
  });
});
