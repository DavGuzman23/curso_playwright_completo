// @ts-nocheck
const { devices } = require('@playwright/test');
const { trace } = require('console');
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
    headless: false,
    //!Para sacar screenshot
    screenshot: 'on',
    //!Para registrar que paso en cada step. Si lo pones en "on" generara todos. Como esta ahora solo en caso de fallos
    trace: 'on'

  }


};

module.exports = config

