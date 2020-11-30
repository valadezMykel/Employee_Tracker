CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments(
    id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles(
    id INT AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES departments
);

CREATE TABLE employees(
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles,
    FOREIGN KEY (manager_id) REFERENCES employees
);


SELECT * FROM table WHERE * = ?

INSERT INTO table(these values) 
VALUES (those values)

UPDATE table
SET col=newVal 
WHERE id = ?

