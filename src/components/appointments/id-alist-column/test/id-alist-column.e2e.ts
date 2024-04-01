import { newE2EPage } from '@stencil/core/testing';

describe('id-alist-column', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<id-alist-column></id-alist-column>');

    const element = await page.find('id-alist-column');
    expect(element).toHaveClass('hydrated');
  });
});
