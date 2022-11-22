require('chromedriver')
const webdriver = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

const show_browser = false;

let opts
if (show_browser) {
    opts = new chrome.Options()
} else {
    opts = new chrome.Options().headless()
}

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(opts)
    .build()

let checking_domain = async (domain) => {
    let inputSearchElement = webdriver.By.xpath("//input[@name='searchTerm']")
    let resultElement = webdriver.By.xpath("//div[@class='domain-name']/span")
    await driver.findElements(inputSearchElement)
    await driver.wait(webdriver.until.elementLocated(inputSearchElement))
    await driver.findElement(inputSearchElement).clear()
    await driver.findElement(inputSearchElement).sendKeys(domain)
    await driver.findElement(webdriver.By.xpath("//button[@data-eid='find.sales.search_bar.search.click']")).click()
    await driver.wait(webdriver.until.elementLocated(resultElement))
    let txtRes = await driver.findElement(webdriver.By.xpath("//div[@class='domain-name']/span")).getText()
    return await ((txt) => {
        res_check = txt.split(' ')
        result_str = res_check.slice(1).join(' ')
        return result_str
    })(txtRes)
}

let start_check = async () => {
    let availability = await checking_domain('midomain123456.com')
    console.log(availability)
}

(async () => {
    await driver.get('https://id.godaddy.com/domainsearch/find')
    await start_check()
})()