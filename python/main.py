from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup


def scrape_chemistwarehouse():
    options = Options()
    options.headless = True  # run in headless mode
    driver = webdriver.Chrome(
        options=options
    )  # make sure chromedriver is installed and in PATH

    url = "https://www.chemistwarehouse.com.au/shop-online/513/blackmores"
    driver.get(url)

    try:
        # Wait until products load
        WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".product"))
        )

        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")

        products = soup.select(".product")
        for product in products:
            name = product.select_one(".product__name")
            price = product.select_one(".product__price")
            if name and price:
                print(name.get_text(strip=True), "-", price.get_text(strip=True))

    finally:
        driver.quit()


if __name__ == "__main__":
    scrape_chemistwarehouse()
