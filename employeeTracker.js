var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "A2022950p@",
  database: "employee_tracker_db"
});
// Connect to my sql
connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });

//prompt user to add, view or update
  function start() {
    inquirer
      .prompt({
        name: "baseOptions",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add","View","Update","EXIT"]
      })

      .then(function(answer) { 
          if (answer.baseOptions === "Add") {
        add();
      }
      else if(answer.baseOptions === "View") {
        view();
      }
      else if(answer.baseOptions === "Update") {
        update();
      } else{
        connection.end();
      }});
    }

//options for the Add choice
function add() {
    inquirer
    .prompt([
      {
        name: "item",
        type: "list",
        message: "What would you like to add?",
        choices: ["Department","Role","Employee","EXIT"]
      }
    ])
    .then(function(answer){
        if (answer.item === "Department") {
            addDepartment();
          }
          else if(answer.item === "Role") {
            addRole();
          }
          else if(answer.item === "Employee") {
            addEmployee();
          } else{
            connection.end();
          }
    });

    // .then(function(answer) {
    //     connection.query(
    //         "INSERT INTO employee SET ?",
    //         {
    //           item_name: answer.item,
    //           category: answer.category,
    //           starting_bid: answer.startingBid || 0,
    //           highest_bid: answer.startingBid || 0
    //         },
    //         function(err) {
    //           if (err) throw err;
    //           console.log("Your auction was created successfully!");
    //           // re-prompt the user for if they want to bid or post
    //           start();
    //         }
    //       );
    //   });
};  


function view() {
    inquirer
    .prompt([
      {
        name: "item",
        type: "list",
        message: "What would you like to add?",
        choices: ["Department","Role","Employee","EXIT"]
      }
    ])
};

function update() {
    inquirer
    .prompt([
      {
        name: "item",
        type: "list",
        message: "What would you like to add?",
        choices: ["Department","Role","Employee","EXIT"]
      }
    ])
};