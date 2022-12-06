import mysql from "mysql";

var connection = mysql.createConnection(
  "mysql://u393_OJAJ0ViVTe:h4tJ^21w=2h@8Pf0VJKbwzO^@crabwings.birdflop.com:3306/s393_SandboxTestDB"
);
const query = connection.query(`SELECT 1`, function (error, res, fields) {
  if (error) throw error;
});
console.log(query);

export {};
