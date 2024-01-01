// server.js

const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const firebaseConfig = require('./firebaseConfig');

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// Firebase Authentication
const auth = firebase.auth();  // auth 모듈을 정확하게 가져왔는지 확인

// Firebase Realtime Database
const database = firebase.database();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 회원가입 API
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Firebase Authentication을 사용하여 사용자 생성
    await auth.createUserWithEmailAndPassword(email, password);

    res.send('회원가입 성공!');
  } catch (error) {
    console.error(error.message);
    res.status(500).send('회원가입 실패.');
  }
});

// 로그인 API
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Firebase Authentication을 사용하여 로그인
    await auth.signInWithEmailAndPassword(email, password);

    res.send('로그인 성공!');
  } catch (error) {
    console.error(error.message);
    res.status(401).send('로그인 실패. 이메일 또는 비밀번호를 확인하세요.');
  }
});

// Firebase Realtime Database 사용 예제
app.get('/getData', (req, res) => {
  // 데이터베이스에서 데이터를 가져옴
  const dataRef = database.ref('data');

  dataRef.once('value', (snapshot) => {
    const data = snapshot.val();
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
