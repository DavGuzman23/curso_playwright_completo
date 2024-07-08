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

    await userName.fill(userMail)
    await password.fill(userPassword)
    await loginBtn.click()

    // Esperar a que los productos estén visibles
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

    // await page.pause()

});