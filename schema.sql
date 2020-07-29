DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

-- Created the table "schools"
CREATE TABLE department (
  id int AUTO_INCREMENT NOT NULL,
  name varchar(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role(
  id int AUTO_INCREMENT NOT NULL,
  title varchar(30) NOT NULL,
  salary INT NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE employee (
  id int AUTO_INCREMENT NOT NULL,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY(id)
);
