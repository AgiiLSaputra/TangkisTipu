import { chromium } from 'playwright-core'

const exe = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
const browser = await chromium.launch({ executablePath: exe, headless: true })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

await page.goto('http://localhost:4173/', { waitUntil: 'load', timeout: 30000 })
await page.waitForTimeout(2000)
await page.click('text=Masuk Admin')
await page.waitForTimeout(1000)
await page.fill('#email', 'admin@demo.id')
await page.fill('#password', 'rahasia123')
await page.click('[data-purpose="submit-login-button"]')
await page.waitForTimeout(3000)

const title = await page.locator('text=Dashboard Evaluasi Literasi Warga').count()
console.log('di dashboard admin:', title)

const btn = page.locator('button[aria-label="Buka menu samping"]')
console.log('jumlah tombol hamburger:', await btn.count())
if ((await btn.count()) > 0) {
  const pos = await btn.evaluate((el) => getComputedStyle(el).position)
  const r1 = await btn.boundingBox()
  await page.evaluate(() => window.scrollBy(0, 600))
  await page.waitForTimeout(500)
  const r2 = await btn.boundingBox()
  console.log(JSON.stringify({ computedPosition: pos, sebelumScroll: r1, sesudahScroll: r2 }, null, 2))
}
await page.screenshot({ path: 'C:/Users/Pongo/AppData/Local/Temp/opencode/admin-scrolled.png' })
await browser.close()
