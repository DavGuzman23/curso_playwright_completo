const {test} = require ('@playwright/test')

//!Lo que estamos pasando dentro de los {} es igual que llamar a una variable global
test('Browser context playwright test', async ( {browser} ) =>

{
    //!Crear nuevo contexto del test : navegador, plugins que necesitas, etc...
    //!Para abrirlo sin cookies y demas poner la siguiente linea de codigo.
    //!Dentro de los parentesis introducir las cookies en caso de necesitarlas.
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

})

//!En caso de no tener nada que incluir dentro de estos argumentos solo bastaria con añadir como argumento a la funcion el parametro page como se ve aqui.
test('Page playwright test', async ({page}) => {

    await page.goto('https://google.com')

})