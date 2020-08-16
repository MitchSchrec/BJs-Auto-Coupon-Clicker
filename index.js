const puppeteer = require('puppeteer');

(async () => {
	// Set up browser and page.
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	page.setViewport({ width: 1280, height: 926 });

	await page.goto('https://www.bjs.com/signIn');

	// Logs into BJs site
	await page.waitForSelector('input[type="email"]');
	await page.type('input[type="email"]', process.env.USERNAME);
	await page.type('input[type="password"]',process.env.PASSWORD);
	await page.click('.submitClass');

	await page.waitForNavigation();

	// Navigate to coupon page
	await page.goto('https://www.bjs.com/myCoupons?source=header');

	await page.waitForNavigation();

	// This section will press the 'CLIP' button one at a time for each coupon
	// The delay allows coupon to disappear before clicking the next one
	// If any issues, up the delay by another 500
	try{
		while (true) {
			await page.click('.red-btn', {delay: 500});
		}
	} catch(e) {
		console.log("Finished Clipping Coupons");
	}

	await browser.close();
})();
