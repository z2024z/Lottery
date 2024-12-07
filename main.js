console.log("Lottery Ticket 2024.");
// union lotto .6/33 red + 1/16 blue.
// welfare lottery 3d .
// happy 8 .
// 7 pleasure lottery.

//[1] store data [json -> sqlite3 ]
store_data();
function store_data() {
  const dbo = require("./function_js/db_operate");
  dbo.db_init();
}
//[2] analyze data [sqlite3 -> json]
