const axios = require('axios');
const cheerio = require('cheerio');

const scrapeProducts = async () => {
  try {
    // 요청을 보낼 URL
    const url = 'https://seulmit.com/product/list.html?cate_no=45';
    
    // HTML 가져오기
    const { data } = await axios.get(url);
    
    // HTML 파싱
    const $ = cheerio.load(data);

    // 상품 데이터 추출
    const products = [];
    $('.product-item').each((index, element) => {
      products.push({
        idx: index + 1, // ID
        category: $(element).find('.category').text().trim(),
        engtit: $(element).find('.product-eng-title').text().trim(),
        tit: $(element).find('.product-title').text().trim(),
        txt: $(element).find('.product-description').text().trim(),
        price: $(element).find('.product-price').text().trim().replace(/[^\d]/g, ''), // 숫자만 추출
        img: $(element).find('.product-image img').attr('src'), // 이미지 URL
        isSoldOut: $(element).find('.sold-out').length > 0, // 품절 여부
      });
    });

    console.log(products);
  } catch (error) {
    console.error('크롤링 실패:', error);
  }
};

scrapeProducts();
