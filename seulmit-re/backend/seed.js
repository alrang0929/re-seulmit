const connectDB = require('./db'); // MongoDB 연결 파일
const Product = require('./models/Product');

const seedData = async () => {
    await connectDB(); // MongoDB 연결
    await Product.deleteMany(); // 기존 데이터 삭제
    await Product.insertMany([
        { name: 'Product A', price: 1000, stock: 20 },
        { name: 'Product B', price: 2000, stock: 15 },
    ]);
    console.log('테스트 데이터 추가 완료');
    mongoose.connection.close(); // 연결 종료
};

seedData();
//node seed.js