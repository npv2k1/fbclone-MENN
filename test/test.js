const { chromium } = require("playwright");

(async () => {
  // Make sure to run headed.
  const browser = await chromium.launch({ headless: false });

  // Setup context however you like.
  const context = await browser.newContext({
    /* pass any options */
  });
  await context.route("**/*", (route) => route.continue());

  // Pause the page, and start recording manually.
  const page = await context.newPage();
  await page.goto("http://localhost:3000/auth/signin");

 
  await page.pause();
})();
