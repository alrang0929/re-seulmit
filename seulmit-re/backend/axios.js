const axios = require('axios');

const fetchWithUserAgent = async () => {
  const url = 'https://seulmit.com/product/list.html?cate_no=45';

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    console.log(data); // 가져온 HTML 데이터 출력
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};

const { data } = await axios.get('https://seulmit.com/product/list.html?cate_no=45', {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      Cookie: 'your_cookie_here',
    },
  });
  console.log(data);

fetchWithUserAgent();
