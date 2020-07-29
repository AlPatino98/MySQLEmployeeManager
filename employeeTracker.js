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
//--------------------------------------------------------------
//prompt user to add, view or update
  function start() {
    inquirer
      .prompt({
        name: "baseOptions",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add","View","Update Employee","EXIT"]
      })

      .then(function(answer) { 
          if (answer.baseOptions === "Add") {
        add();
      }
      else if(answer.baseOptions === "View") {
        view();
      }
      else if(answer.baseOptions === "Update Employee") {
        update();
      } else{
        connection.end();
      }});
    }
//--------------------------------------------------------------
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
};
// Pormpt for name of department  
function addDepartment(){
  inquirer 
  .prompt([
    {
      name: "dep_name",
      type: "input",
      message: "What would you like the name of the new department to be?"
    }
  ])
  .then(function(answer) {
    connection.query(
        "INSERT INTO department SET ?",
        {
        name: answer.dep_name
        },
        function(err) {
          if (err) throw err;
          console.log("Department was created successfully!");
          // re-prompt the user for other actions
          start();
        }
      );
  });
};
function addRole(){
  inquirer 
  .prompt([
    {
      name: "title",
      type: "input",
      message: "What would you like the name of the new role to be?"
    },
    {
      name: "salary",
      type: "input",
      message: "How much is the salary for this role?"
    },
    {
      name: "department_id",
      type: "input",
      message: "What what is the id for the department of this rolenode employeeTracker.js?"
    }
  ])
  .then(function(answer) {
    connection.query(
        "INSERT INTO role SET ?",
        {
        title: answer.title,
        salary: answer.salary,
        departmnet_id: answer.departmnet_id
        },
        function(err) {
          if (err) throw err;
          console.log("Role was created successfully!");
          // re-prompt the user for other actions
          start();
        }
      );
  });
};
function addEmployee(){
  inquirer 
  .prompt([
    {
      name: "first_name",
      type: "input",
      message: "What is the first name of the new Employee?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the last name of the new Employee?"
    },
    {
      name: "role_id",
      type: "input",
      message: "What is the role id?"
    },
    {
      name: "manager_id",
      type: "input",
      message: "What what is the manager id?"
    }
  ])
  .then(function(answer) {
    connection.query(
        "INSERT INTO employee SET ?",
        {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
        manager_id: answer.manager_id
        },
        function(err) {
          if (err) throw err;
          console.log("Employee was created successfully!");
          // re-prompt the user for other actions
          start();
        }
      );
  });
};
//--------------------------------------------------------------
function view() {
  inquirer
  .prompt([
    {
      name: "item",
      type: "list",
      message: "What would you like to view?",
      choices: ["Department","Role","Employee","EXIT"]
    }
  ])
  .then(function(answer){
      if (answer.item === "Department") {
          viewDepartment();
        }
        else if(answer.item === "Role") {
          viewRole();
        }
        else if(answer.item === "Employee") {
          viewEmployee();
        } else{
          connection.end();
        }
  });
};

function viewDepartment(){
  connection.query("SELECT name FROM department", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
};
function viewRole(){
  console.log("Viewing all roles...\n");
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
};
function viewEmployee(){
  console.log("Viewing all employees...\n");
  connection.query("SELECT * FROM employee", function(err, res) {
    if (err) throw err;

    // Log all results of the SELECT statement
    console.table(res);
    connection.end();
  });
}
//--------------------------------------------------------------
function update() {
  connection.query("SELECT * FROM employee", function(err, results) {
    if (err) throw err;
  inquirer
    .prompt([
      {
        name: "choice",
        type: "rawlist",
        choices: function() {
          var choiceArray = [];
          for (var i = 0; i < results.length; i++) {
            choiceArray.push(results[i].first_name)

            ;
          }
          return choiceArray;
        },
        message:"What employee would you like to update?"
      },
      {
        name:"param",
        type:"input",
        message:"What would you like to update?"
      }
    ])
    .then(function(answer) {
      // get the information of the chosen item
      var chosenItem;
      for (var i = 0; i < results.length; i++) {
        if (results[i].item_name === answer.choice) {
          chosenItem = results[i];
        }
      }

      // determine if bid was high enough
      
        // bid was high enough, so update db, let the user know, and start over
        connection.query(
          "UPDATE employee SET ? WHERE ?",
          [
            {
              first_name: answer.bid
            },
            {
              last_name: chosenItem.id
            },
            {
              role: answer.bid
            },
            {
              manager: answer.bid
            }
          ],
          function(error) {
            if (error) throw err;
            console.log("Bid placed successfully!");
            start();
          }
        );
      
      
    });
});
}

