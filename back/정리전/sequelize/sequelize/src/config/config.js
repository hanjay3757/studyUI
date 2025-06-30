require('dotenv').config();

module.exports = {
  development: {
    //개발모드
    username: 'ezen',
    password: '1234',
    database: 'edudb',
    host: 'localhost',
    dialect: 'mysql', //방언
  },
  production: {
    //운영모드
    username: 'root',
    password: 'ezen1234',
    database: 'edudb',
    host: 'localhost',
    dialect: 'mysql', //방언
  },
};
