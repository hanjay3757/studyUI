const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  morgan = require('morgan');
require('dotenv').config();
const { sequelize } = require('./src/models');
//router
const productRouter = require('./src/routes/productRouter');
const port = process.env.PORT || 7777;
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(morgan('dev'));
app.use('/api/products', productRouter);
//서버가동
/**
 * Sequelize 테이블 동기화 옵션 설명
 *
 * 옵션:
 * - force: true  → 기준 테이블을 강제로 삭제 후 재생성
 * - force: false → 기준 테이블이 없을 때만 생성 (기존 테이블 유지)
 * - alter: true  → 기준 테이블에 변경 사항이 있으면 해당 부분만 수정 적용
 */
sequelize.sync({ alter: true }).then(() => {
  console.log('db');
  app.listen(port, () => {
    console.log('http:localhost:' + port);
  });
});
