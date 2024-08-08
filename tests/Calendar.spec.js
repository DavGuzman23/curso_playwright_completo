const {test, expect} = require ('@playwright/test')

test('Calendar validations', async ({page}) => {
    
    const monthNumer = "6"
    const date = '15'
    const year = '2027'
    const expectedList = [monthNumer,date,year]

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers')

    //Abrimos el calendario
    await page.locator('.react-date-picker__inputGroup').click()
    //Hacemos click en mes/año para que se abra el menu de los meses del año
    await page.locator('.react-calendar__navigation__label').click()
    //Otro click para que nos abra el menu de los años
    await page.locator('.react-calendar__navigation__label').click()
    //Click en el año que queremos
    await page.getByText(year).click()
    //Click en el mes que queremos
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumer)-1).click()
    //Click en el dia que queremos
    await page.locator(`//abbr[text()=${date}]`).click()

    //Vamos a comprobar que realmente la fecha que introdujo es igual que la que queriamos
    //!Cogemos un locator comun para todos los inputs
    const inputs = page.locator('react-date-picker__inputGroup input')

    //Iteramos sobre los inputs
    for(let index=0; index < inputs.lenght; index++) {

        const value = inputs[index].getAttribute('value')
        await expect(value).toEqual(expectedList[index])
        break

    }

    await page.pause()

});