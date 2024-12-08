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
        // console.error(err.message);
      } else {
        console.log("Insert data to union_lotto.");
      }
    }
  );
};

exports.update_data_db_union_lotto = function (db) {
  const file_system = require("fs");
  //[1] get json from json file.
  //[2] build one json object .
  //[3] write into db , and analysis data
  for (let i = 1; i <= 60; i++) {
    let union_lotto_json_file_path =
      "./data_original/union_lotto_json/ul_" + i + ".json";
    file_system.readFile(union_lotto_json_file_path, "utf-8", (err, data) => {
      if (err) {
        console.error(err.message);
        return;
      }
      try {
        const obj = JSON.parse(data);
        for (let i2 = 0; i2 < obj.pageSize; i2++) {
          const new_json = {
            happen_time: obj.result[i2].date.slice(0, 10),
            red_ball_1: obj.result[i2].red.split(",")[0],
            red_ball_2: obj.result[i2].red.split(",")[1],
            red_ball_3: obj.result[i2].red.split(",")[2],
            red_ball_4: obj.result[i2].red.split(",")[3],
            red_ball_5: obj.result[i2].red.split(",")[4],
            red_ball_6: obj.result[i2].red.split(",")[5],
            blue_ball: obj.result[i2].blue,
          };

          this.db_union_lotto_insert(db, new_json);
        }
      } catch (err) {
        // console.error(err.message);
      }
    });
  }
};

exports.db_append_constraint = function (db) {
  const sql = `ALTER TABLE union_lotto ADD unique unique_happen_time UNIQUE (happen_time);`;
  db.run(sql, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
};
