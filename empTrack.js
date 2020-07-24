// var mysql = require("mysql");
// var inquirer = require("inquirer");

// // create the connection information for the sql database
// var connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "A2022950p@",
//   database: "employee_tracker_db"
// });

// connection.connect(function(err) {
//     if (err) throw err;
//     // run the start function after the connection is made to prompt the user
//     start();
//   });

//   function start() {
//     inquirer
//       .prompt({
//         name: "Options",
//         type: "list",
//         message: "What would you like to do?",
//         choices: ["Add new employee.","Add new role.","Add new department.",
//          "View employees.","View roles.","view departments.", "Update employee role.",
//           "EXIT"]
//       })
//       .then(function(answer) {
//         // based on their answer, either call the bid or the post functions
//         if (answer.postOrBid === "POST") {
//           postAuction();
//         }
//         else if(answer.postOrBid === "BID") {
//           bidAuction();
//         } else{
//           connection.end();
//         }
//       });
//   }