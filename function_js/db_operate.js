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
};
