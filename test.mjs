import fs from 'node:fs/promises'
import test from 'ava'
import puppeteer from 'puppeteer'
import createTestServer from 'create-test-server'

async function withPage(t, run) {
  const server = await startServer()
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  page.on('console', (message) => {
    for (let index = 0; index < message.args().length; index += 1) {
      console.log(`${index}: ${message.args()[index]}`)
    }
  })
  try {
    await run(t, page, server)
  } finally {
    await page.close()
    await browser.close()
    await server.close()
  }
}

async function startServer() {
  const html = await fs.readFile(new URL('./src/index.html', import.meta.url))
  const script = await fs.readFile(new URL('./src/index.mjs', import.meta.url))

  const server = await createTestServer()
  server.get('/', (request, response) => {
    response.type('text/html')
    response.end(html)
  })
  server.get('/index.mjs', (request, response) => {
    response.type('text/javascript')
    response.end(script)
  })

  return server
}

const BLANK_PAGE = 'about:blank'

function getPageInfo(page) {
  return page.evaluate(() => ({
    url: window.location.href,
    isPreventState: window.history.state?.isPreventState,
    dialogWidth: document.getElementById('js-dialog')?.getBoundingClientRect()
      .width,
  }))
}

test('Main', withPage, async (t, page, server) => {
  const SERVER_URL = `${server.url}/`
  let pageInfo

  await page.goto(BLANK_PAGE)
  pageInfo = await getPageInfo(page)
  t.is(pageInfo.url, BLANK_PAGE)

  await page.goto(SERVER_URL)
  pageInfo = await getPageInfo(page)
  t.is(pageInfo.url, SERVER_URL)
  t.is(pageInfo.isPreventState, undefined)
  t.is(pageInfo.dialogWidth, 0)

  await page.mouse.click(1, 1)
  await page.waitForTimeout(100)
  pageInfo = await getPageInfo(page)
  t.is(pageInfo.url, SERVER_URL)
  t.is(pageInfo.isPreventState, true)
  t.is(pageInfo.dialogWidth, 0)

  await page.goBack()
  pageInfo = await getPageInfo(page)
  t.is(pageInfo.url, SERVER_URL)
  t.is(pageInfo.isPreventState, undefined)
  t.not(pageInfo.dialogWidth, 0)

  await page.click('#js-dialog button[value="stay"]')
  await page.waitForTimeout(100)
  pageInfo = await getPageInfo(page)
  t.is(pageInfo.url, SERVER_URL)
  t.is(pageInfo.isPreventState, true)

  await page.goBack()
  await page.click('#js-dialog button[value="leave"]')
  await page.waitForTimeout(100)
  pageInfo = await getPageInfo(page)
  t.is(pageInfo.url, BLANK_PAGE)
})
