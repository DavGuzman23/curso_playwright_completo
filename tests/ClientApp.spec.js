const {test, expect} = require ('@playwright/test')

test('Browser context validation Error loging', async({page}) => {
    
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

test.only('E2E test for e-commerce', async({page}) => {

    await page.goto('https://rahulshettyacademy.com/client')

    const userMail = 'gummer2310@gmail.com'
    const userPassword = 'Gummer-231094'

    const productName = 'ADIDAS ORIGINAL'
    const products = page.locator('.card-body')
    const userName = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const loginBtn = page.locator('[value="Login"]')
    const cartBtn = page.locator('[routerlink*="cart"]')
    const nameInCart = page.locator('h3:has-text("ADIDAS ORIGINAL")')
    const cartSection = page.locator('div li')
    const checkoutBtn = page.locator('text=Checkout')
    const userMailInCheckOut = page.locator('.user__name > label')
    const placeOrderBtn = page.locator('.action__submit')
    const messageThankForBuy = page.locator('.hero-primary')
    const idPedido = page.locator('.em-spacer-1 > .ng-star-inserted')
    const ordersBtn = page.locator('[routerlink*="myorders"]').first()
    const table = page.locator('.table-responsive')
    const idElementsTable = page.locator('.ng-star-inserted > th')

    await userName.fill(userMail)
    await password.fill(userPassword)
    await loginBtn.click()

    //! Esperar a que los productos estén visibles
    await products.first().waitFor();

    const count = await products.count()

    //lista de elementos
    //!Con esto hacemos que busque el elemento products y que itere dentro de ese elemento en todos los elementos "b"
    for(let i=0; i<count; i++){

        //! Extraemos el texto y lo imrpimimos por pantalla
        const productTitle = await products.nth(i).locator('b').textContent()
        console.log(`Comprobando productos ${productTitle}`)
        if (productTitle === productName){

            //!Logica para añadir el producto al carrito y que pulse el addtocart del producto que queremos y no de todos
            //! Esperamos a que el boton este visible y habilitado
            const addToCartBtn = products.nth(i).locator('text= Add To Cart')
            await addToCartBtn.waitFor({state: 'visible'})
            await addToCartBtn.click()
            //! para que no siga con el loop una vez haya encontrado el producto
            break
        }
    }
    await cartBtn.click()

    await page.waitForTimeout(2000)

    const productTitleInCart = await nameInCart.first().textContent()
    console.log(`Comprobando productos en cesta: ${productTitleInCart}`)
    const bool = await nameInCart.isVisible()
    expect(bool).toBeTruthy()
    await checkoutBtn.click()

    //! Vamos a coger un dropdown que cuando introduces alguna letra te salen sugerencias.
    const countryDropdown = page.locator('.form-group > input')
    //! Al mandar este metodo no escribe letra por letra sino que pega el texto por lo tanto no saldra el menu de sugerencias que necesitamos para seleccionar
    // await countryDropdown.fill('ind')
    //! Con este metodo si que funciona ya que introduce letra por letra
    await countryDropdown.pressSequentially('ind')
    //! Con esto estamos esperando que aparezcan los 3 botones pero que solo se fije en esos 3 de dentro del desplegable y no de los botones de fuera
    const dropdown = page.locator('.ta-results')
    await dropdown.waitFor()
    const optionsCount = await dropdown.locator('button').count()

    for(let i =0; i<optionsCount; i++){

        const options = dropdown.locator('button').nth(i)
        const text = await options.textContent()
        if (text.trim() === "India"){//|| text.includes('India'))
            await options.click()
            break
        }
    }

    await expect(userMailInCheckOut).toHaveText(userMail)
    await placeOrderBtn.click()

    console.log(await messageThankForBuy.textContent())
    await expect(messageThankForBuy).toHaveText(' Thankyou for the order. ')
    
    let idProcesada = await idPedido.textContent()
    idProcesada = idProcesada.replace(/[|]/g, '').trim();
    console.log(`ID procesada: ${idProcesada}`);
    await ordersBtn.click()

    await table.waitFor()

    const rowsSelector = '.table-responsive tr'; 
    await page.waitForSelector(rowsSelector, { state: 'visible' });

    const rows = table.locator(rowsSelector);
    const rowCount = await rows.count();
    console.log(`Número de filas en la tabla: ${rowCount}`);
    
    for(let a = 0; a < rowCount; a++) {

        const idElementsTableProcessed = await rows.nth(a).locator('.ng-star-inserted > th').textContent();
        console.log(`ID en la tabla: ${idElementsTableProcessed}`);

        if(idElementsTableProcessed.trim() === idProcesada) {

            console.log(`Las id's encontradas son ${idElementsTableProcessed} ya ${idProcesada}`)
            const viewBtn = rows.nth(a).locator('button:text("View")')
            await viewBtn.click()
            console.log(`Clicked view button for ID: ${idProcesada}`);
            break
        }

    }

    await page.pause()

});