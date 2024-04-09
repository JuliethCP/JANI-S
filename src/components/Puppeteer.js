
const puppeteer = require('puppeteer');

(async () => {
  // Inicia un navegador
  const browser = await puppeteer.launch();

  // Abre una nueva página
  const page = await browser.newPage();

  // Navega a la URL del sitio web
  await page.goto('https://app.morphcast.com/emotion-ai-video-frames-analyzer/#/');

  // Espera a que la página cargue completamente (puedes ajustar este tiempo según sea necesario)
  await page.waitForTimeout(5000);

  // Interactúa con la página web (por ejemplo, haz clic en un botón)
  await page.click('#inputVideo');

  // Selecciona el archivo del video (debes reemplazar 'ruta/al/video.mp4' con la ruta de tu archivo)
  const inputElement = await page.$('input[type="file"]');
  await inputElement.uploadFile('ruta/al/video.mp4');

  // Espera a que la carga del video se complete (puedes ajustar este tiempo según sea necesario)
  await page.waitForTimeout(5000);

  // Hace clic en el botón de iniciar el análisis
  await page.click('#startAnalysis');

  // Espera a que el análisis se complete (ajusta este tiempo según sea necesario)
  await page.waitForTimeout(30000);

  // Captura el reporte o realiza otras acciones según sea necesario
  // (por ejemplo, toma una captura de pantalla con await page.screenshot({ path: 'screenshot.png' });)

  // Cierra el navegador
  await browser.close();
})();
