const { isMainThread, parentPort, Worker, workerData } = require('worker_threads')
const puppeteer = require('puppeteer')

const puppeteerScrapePage = async (url) => {
   const browser = await puppeteer.launch({ headless: true })
   const page = await browser.newPage()
   if (!url.includes('http'))
      url = 'http://' + url
   await page.goto(url, {
      waitUntil: 'load',
      timeout: 0
   })
   const meta_description = await page.evaluate(() => document.querySelector('meta[name*="description"]').content)
   const title = await page.evaluate(() => document.title)

   browser.close()
   return { meta_description, title }
}

if (isMainThread) {
   module.exports = function LookUpURL(url) {
      return new Promise((resolve, reject) => {
         const worker = new Worker(__filename, { workerData: url })
         worker.on('message', (data) => resolve(data))
         worker.on('error', (err) => reject(err))
         worker.on('exit', (code) => { if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`)) })
      })
   }
}
else
   puppeteerScrapePage(workerData).then(data => parentPort.postMessage(data)).catch((err) => console.log(err))