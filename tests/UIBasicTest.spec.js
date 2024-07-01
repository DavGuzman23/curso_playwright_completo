const {test, expect} = require ('@playwright/test')

//!Lo que estamos pasando dentro de los {} es igual que llamar a una variable global
test('Browser context playwright test', async ( {browser} ) =>

{
    //!Crear nuevo contexto del test : navegador, plugins que necesitas, etc...
    //!Para abrirlo sin cookies y demas poner la siguiente linea de codigo.
    //!Dentro de los parentesis introducir las cookies en caso de necesitarlas.
    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    const userName = page.locator('#username')
    const errorMessage = page.locator('[style*="block"]')
    const password = page.locator('[type="password"]')
    const signIn= page.locator('#signInBtn')
    const cardsTittle = page.locator('.card-body a')

    // soporta css y xpath selectors
    await userName.fill("rahulshetty")
    await password.fill("learning")
    await signIn.click()
    // Espera hasta que el locator sea visible automaticamente. Esperara el tiempo que se puso en el archivo de config
    // Para extraer el texto poner textContent()
    console.log(await errorMessage.textContent())
    await expect(errorMessage).toContainText('Incorrect username/password')
    //Para borrar el contenido que has introducido usas: fill('')
    await userName.fill('')
    await userName.fill('rahulshettyacademy')
    await signIn.click()

    //Lo siguiente se hace para obtener el texto del primer elemento que encontremos aunaque haya varias coincidencias.
    //Tambien se podria asi await page.locator('.card-body a').first().textContent()
    // console.log(await cardsTittle.nth(0).textContent())

    // Para extraer todos los titulos de todas las cards a la vez: allTextContents(). Para este metodo no hace un autowait
    const allTittles = await cardsTittle.allTextContents()
    console.log(allTittles)

})

//!En caso de no tener nada que incluir dentro de estos argumentos solo bastaria con añadir como argumento "page" a la funcion el parametro page como se ve aqui.
test('Page playwright test', async ({page}) => {

    await page.goto('https://google.com')
    //!Para obtener el titulo de la pagina en un assertion
    await expect(page).toHaveTitle('Google')

})

test.only('UI control', async ({page}) => {

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')

    const userName = page.locator('#username')
    const password = page.locator('[type="password"]')
    const signIn= page.locator('#signInBtn')
    const dropdown = page.locator('select.form-control')
    const radioButton = page.locator('.radiotextsty')
    const popUpConfirmation = page.locator('#okayBtn')
    const termsAndCondRadBtn = page.locator('#terms')
    const documentLink = page.locator('[href*="documents-request"]')


    await userName.fill("rahulshetty")
    await password.fill("learning")
    //! Para manejar y clickar en una de las opciones del dropdown con tag select:
    await dropdown.selectOption('consult')
    //! Select radio buttons
    await radioButton.last().click()
    //! Para manejar el popup
    await popUpConfirmation.click()
    await termsAndCondRadBtn.click()

    //! Otro metodo que devuelve true si esta checked y false si no lo esta
    console.log(await radioButton.last().isChecked())

    //!Assertion
    await expect(radioButton.last()).toBeChecked()
    await expect(termsAndCondRadBtn).toBeChecked()

    //! Para quitar el check usar:
    await termsAndCondRadBtn.uncheck()
    //! No hay una assert para comprobar que no esta checked pero podemos usar
    //! Aqui el await se introduce dentro de parentesis porque la accion se realiza dentro
    expect(await termsAndCondRadBtn.isChecked()).toBeFalsy()
    //! En caso de querer comprobar si algo es verdadero poner toBeTruthy()
    //Ej expect(await termsAndCondRadBtn.isChecked()).toBeTruthy()

    //!Comprobacion de un atributo de cualquier elemento de la pagina, en este caso miraremos si parpadea
    await expect(documentLink).toHaveAttribute('class', 'blinkingText')

    // await signIn.click()
    //!Esto sirve para parar la ejecucion antes de cerrar el navegador y ver el resultado
    await page.pause()
 
})