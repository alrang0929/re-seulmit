const mongoose = require('mongoose');
require('dotenv').config(); // .env 파일 로드

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB 연결 성공');
    } catch (err) {
        console.error('MongoDB 연결 실패:', err);
        process.exit(1); // 연결 실패 시 종료
    }
};

module.exports = connectDB;
