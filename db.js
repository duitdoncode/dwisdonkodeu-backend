// db.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.db');

// 테이블 생성
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
});

// 사용자 추가
function addUser(username, password) {
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, password]);
}

// 사용자 조회
function getUser(username, callback) {
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    callback(err, row);
  });
}

module.exports = { addUser, getUser };
