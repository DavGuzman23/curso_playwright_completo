const {test, expect} = require ('@playwright/test')

test.only('Popup validations', async({page}) => {
    
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/')
    // await page.goto('https://google.com')
    //!Para volver a la pagina que tenemos atras
    // await page.goBack()
    //!Para ir hacia la pagina que teniamos antes clickando en la flecha ->
    // await page.goForward()

    const hideText = page.locator('#hide-textbox')

    //!Comprobar si esta visible este elemento
    await expect(page.locator('#displayed-text')).toBeVisible()
    await hideText.click()
    //!Comprpobar que ese elemento no esta visible
    await expect(page.locator('#displayed-text')).toBeHidden()

    //!El page.on ayudara a manejar los eventos como pop-ups... Dentro tendremos dos argumentos, el primero es el evento y el segundo es la accion que quieres hacer sobre ese evento
    //! dialog => dialog.accept() = En este caso estariamos aceptando el popup
    //! dialog => dialog.dismiss() = En este caso estariamos rechazando el popup
    page.on('dialog', dialog => dialog.accept())
    await page.locator('#confirmbtn').click()

    //! Hacer hover
    await page.locator('#mousehover').hover()

    //!FRAMES
    const framePage = page.frameLocator('#courses-iframe') //Primero definimos el frame con el id o locator
    //! En el caso siguiente tendremos un selector que se repite 2 veces pero una de ellas esta invisible, vamos a hacer que playwright coja la que se ve
    await framePage.locator('li a[href*="lifetime-access"]:visible').click()

    //!Vamos a extraer el texto de la pagina a la que nos dirige y comprobar que es lo esperado
    const textCheck = await framePage.locator('.text h2').textContent()
    //!Vamos a dividir la cadena para sacar solo el numero
    console.log(textCheck.split(' ')[1])

});