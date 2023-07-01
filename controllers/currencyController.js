import puppeteer from 'puppeteer';

export const convertCurrency = async (from, to, amount) => {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(`https://www.google.com/finance/quote/${from}-${to}`, {
    waitUntil: 'networkidle2',
  });

  const convertResult = await page.evaluate((amount, to) => {
    const result = document.querySelector('.YMlKec.fxKbKc').innerText;
    const resultNumber = +result.replace(/,/g, '');

    const time = document.querySelector('.ygUjEc').innerText;
    const utcIndex = time.indexOf(' UTC');
    const extractedString = time.substring(0, utcIndex + 4) + ` ${new Date().getFullYear()}`;
    const dateObj = new Date(extractedString);
    const timestamp = dateObj.getTime();

    const final = (resultNumber * amount).toFixed(1);

    return {
      per_currency: resultNumber,
      result: {
        symbol: to,
        amount: +final
      },
      timestamp
    };
  }, +amount, to);

  await browser.close();

  return convertResult;
};
