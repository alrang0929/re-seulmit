from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import json

# ChromeDriver 설정
driver_path = "e:/re-seulmit/chromedriver-win64/chromedriver.exe"
options = Options()
options.add_argument("--headless")  # 브라우저 창 없이 실행
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
service = Service(driver_path)
driver = webdriver.Chrome(service=service, options=options)

# 쇼핑몰 URL (크롤링 대상)
url = "https://seulmit.com/product/list.html?cate_no=45"  # 쇼핑몰 도메인 입력
driver.get(url)

# 제품 데이터 크롤링
categories = driver.find_elements(By.CSS_SELECTOR, ".xans-element-.xans-product.xans-product-listnormal")  # 카테고리 영역 선택자 수정
data = []

for category in categories:
    category_name = category.find_element(By.CSS_SELECTOR, ".title").text  # 카테고리 이름 선택자 수정
    products = category.find_elements(By.CSS_SELECTOR, ".xans-product-listitem")  # 제품 리스트 선택자 수정

    product_list = []
    for product in products:
        title = product.find_element(By.CSS_SELECTOR, ".name > a").text  # 제품 이름 선택자 수정
        price = product.find_element(By.CSS_SELECTOR, ".xans-product-price").text  # 제품 가격 선택자 수정
        images = product.find_elements(By.CSS_SELECTOR, ".thumbnail img")  # 이미지 선택자 수정
        image_urls = [img.get_attribute("src") for img in images]

        product_list.append({
            "title": title,
            "price": price,
            "images": image_urls
        })

    data.append({
        "category": category_name,
        "products": product_list
    })

# 결과 저장
with open("products.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=4)

# 드라이버 종료
driver.quit()

print("크롤링 완료. 결과는 'products.json'에 저장되었습니다.")
