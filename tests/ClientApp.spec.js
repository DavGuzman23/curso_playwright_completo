const {test, expect} = require ('@playwright/test')

test.only('Browser context validation Error loging', async({page}) => {
    
    await page.goto('https://rahulshettyacademy.com/client')

    await page.setViewportSize({ width: 1920, height: 1080 });

    const userName = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const loginBtn = page.locator('[value="Login"]')
    const tittleCards = page.locator('.card-body b')


    await userName.fill('anshika@gmail.com')
    await password.fill('Iamking@000')
    await loginBtn.click()
    //!Para hacer que la pagina haga el wait hasta que se muestren los productos haremos:
    //!Asi cargara hasta que el network tenga los elementos ya cargados. Hasta que el network deje de trabajar.
    await page.waitForLoadState('networkidle')
    //!Otra alternativ a para esperar a que cargue la pagina para las acciones que no tengan autowaiting
    // await tittleCards.first().waitfor() --> Esto hara que espere hasta que el elemento este cargado. Sirve para devolver un elemento solo

    console.log(await tittleCards.allTextContents())


});