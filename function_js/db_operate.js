const { error } = require("console");

exports.db_init = function () {
  console.log("db_init");
  const sqlite3 = require("sqlite3").verbose();
  const db = new sqlite3.Database("./sqlite3_db/lottery.db", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  });
  return db;
};

exports.db_close = function (db) {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Close the database connection.");
    }
  });
};

exports.db_union_lotto_create_table = function (db) {
  const sql = `CREATE TABLE IF NOT EXISTS union_lotto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    happen_time date unique,
    red_ball_1 int,
    red_ball_2 int,
    red_ball_3 int,
    red_ball_4 int,
    red_ball_5 int,
    red_ball_6 int,
    blue_ball int
  )`;
  db.run(sql, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Table union_lotto created.");
    }
  });
};

exports.db_union_lotto_insert = function (db, data) {
  const sql = `INSERT INTO union_lotto (happen_time, red_ball_1, red_ball_2, red_ball_3, red_ball_4, red_ball_5, red_ball_6, blue_ball) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.run(
    sql,
    [
      data.happen_time,
      data.red_ball_1,
      data.red_ball_2,
      data.red_ball_3,
      data.red_ball_4,
      data.red_ball_5,
      data.red_ball_6,
      data.blue_ball,
    ],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("Insert data to union_lotto.");
      }
    }
  );
};
