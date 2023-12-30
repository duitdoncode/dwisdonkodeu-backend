// server.js

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // 위에서 작성한 db.js 파일

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 회원가입 API
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // 사용자 추가
  db.addUser(username, password);

  res.send('회원가입 성공!');
});

// 로그인 API
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // 사용자 조회
  db.getUser(username, (err, user) => {
    if (err || !user || user.password !== password) {
      res.status(401).send('로그인 실패. 유저 정보를 확인하세요.');
    } else {
      res.send('로그인 성공!');
    }
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
