const {test, expect} = require ('@playwright/test')

test('Playwright special locator', async({ page }) => {

    await page.goto('https://rahulshettyacademy.com/angularpractice/')


    //!Cuando hacemos click sobre un label playwright automaticamente vera si esta disponible ese click o no
    //"Checkbox"
    await page.getByLabel('Check me out if you Love IceCreams!').click()

    //!RadioButton click
    await page.getByLabel('Employed').check()

    //!Dropdown
    await page.getByLabel('Gender').selectOption('Female')

    //!Placeholder
    await page.getByPlaceholder('Password').fill('abc123')

    //!Boton (Get by role)
    await page.getByRole('button', {name: 'Submit'}).click()

    //!Mensaje de succesfull
    await expect(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible()

    await page.getByRole('link', {name: 'Shop'}).click()

    //!Filter. Filtramos entre todos los elemtos con ese tagName para que nos coja el que contenga esa condicion y dentro pulse el boton.
    await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button').click()

    // await page.pause()
});