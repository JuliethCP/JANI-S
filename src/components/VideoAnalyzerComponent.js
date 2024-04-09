import React, { useEffect } from 'react';
const puppeteer = require('puppeteer');

const VideoAnalyzerComponent = () => {
  const handleAnalysis = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
      // Navega a la página web
      await page.goto('https://app.morphcast.com/emotion-ai-video-frames-analyzer/#');

      // Espera a que la página cargue completamente (ajusta el tiempo según sea necesario)
      await page.waitForSelector('#startAnalysis');

      // Selecciona el botón "Iniciar análisis" y haz clic en él
      await page.click('#startAnalysis');

      // Espera a que la página termine el análisis (ajusta el tiempo según sea necesario)
      await page.waitFor(5000); // Espera 5 segundos (puedes ajustar esto)

      // Captura la URL del resultado (si es una descarga)
      const resultURL = await page.evaluate(() => {
        // Cambia esto según la estructura de la página
        const downloadButton = document.querySelector('#downloadButton');
        if (downloadButton) {
          return downloadButton.getAttribute('href');
        }
        return null;
      });

      if (resultURL) {
        // Descarga el resultado
        window.location.href = resultURL;
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await browser.close();
    }
  };

  return (
    <div>
      <button onClick={handleAnalysis}>Iniciar Análisis</button>
    </div>
  );
};

export default VideoAnalyzerComponent;
