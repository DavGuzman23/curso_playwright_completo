// @ts-nocheck
const { devices } = require('@playwright/test');
const { Browser } = require('selenium-webdriver');

const config = {
  testDir: './tests',
  //!Tiempo en el que ejecutar antes de lanzar el fallo de la prueba
  timeout: 30 * 1000,
  //!Tiempo esperado para que se cumplan las assertions, en caso contrario fallara
  expect: { timeout: 5000 },
  //!Como quieres obtener el reporte
  reporter: 'html',
  //!Navegadores, screenshots, etc. Todas las propiedades que queremos que lea cuando ejecute los test
  use: {

    //!Browsers : Chrome:chromium; firefox:firefox; safari:webkit
    browserName : 'chromium',
    headless: false

  }

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
};

module.exports = config

