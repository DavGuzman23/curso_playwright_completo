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


};

module.exports = config

