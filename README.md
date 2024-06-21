Comando para inicializar proyecto de Playwright: npm init playwright.

npx playwright test
    Runs the end-to-end tests.

  npx playwright test --ui
    Starts the interactive UI mode.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test example
    Runs the tests in a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright codegen
    Auto generate tests with Codegen.

We suggest that you begin by typing:

    npx playwright test

And check out the following files:
  - ./tests/example.spec.js - Example end-to-end test
  - ./tests-examples/demo-todo-app.spec.js - Demo Todo App end-to-end tests
  - ./playwright.config.js - Playwright Test configuration

Esta linea tiene que ir encima de cada script para importar lo necesario para el test "const {test} = require ('@playwright/test')"

Esta es la estructura basica para crear un test:
¡IMPORTANTE! Desestructuramos el browser para que lo reconozca y podamos usarlo dentro del test
test('First playwright test', async ( {browser} ) =>

{
    

})