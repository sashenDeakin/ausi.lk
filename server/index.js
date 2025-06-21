import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false, // set to true if you don't want to see the browser
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", // adjust if needed
  });

  const page = await browser.newPage();

  // Set user agent to reduce bot detection
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
  );

  await page.goto(
    "https://www.chemistwarehouse.com.au/buy/105735/blackmores-vitamin-b6-100mg-40-tablets",
    { waitUntil: "networkidle2" }
  );

  // Wait for network idle and extra delay for full JS load
  await page.waitForNetworkIdle({ idleTime: 2000, timeout: 60000 });
  await new Promise((r) => setTimeout(r, 3000));

  // Save screenshot to check what is rendered
  await page.screenshot({ path: "page.png", fullPage: true });
  console.log("Screenshot saved as page.png");

  // Try to get title: direct selector, fallback to meta tag
  let title = await page
    .$eval("h1.product-title", (el) => el.textContent.trim())
    .catch(() => null);
  if (!title) {
    title = await page
      .$eval('meta[property="og:title"]', (el) => el.content)
      .catch(() => null);
  }

  if (!title) {
    console.log("Product title not found");
    await browser.close();
    return;
  }

  console.log("Product Title:", title);

  // Helper to get first matching selector text
  async function extractFirstMatchingText(pageOrFrame, selectors) {
    for (const sel of selectors) {
      try {
        const text = await pageOrFrame.$eval(sel, (el) =>
          el.textContent.trim()
        );
        if (text) return text;
      } catch {}
    }
    return null;
  }

  // Possible price selectors
  const priceSelectors = [
    ".product-price-now",
    ".product-price",
    ".price",
    ".product-pricing__price",
    ".product-info-price",
    "h2.display-l.text-colour-title-light",
  ];
  // Possible description selectors
  const descriptionSelectors = [
    "#productDescription",
    ".product-description",
    ".tab-pane.active #productDescription",
    ".tab-pane.active .product-description",
    ".description-text",
    ".product-details-description",
  ];

  const price =
    (await extractFirstMatchingText(page, priceSelectors)) || "Price not found";
  const description =
    (await extractFirstMatchingText(page, descriptionSelectors)) ||
    "Description not found";

  console.log("Price:", price);
  console.log("Description:", description);

  await browser.close();
})();
