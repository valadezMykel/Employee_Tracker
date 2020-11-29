require("dotenv").config();
const mysql = require("mysql");
const inq = require("inquirer");
const add = require("./inquirer/add");
const view = require("./inquirer/view");
const update = require("./inquirer/update");
const remove = require("./inquirer/remove");

const dbConfig = {
    host: process.env.dbHost,
    port: 3306,
    user: process.env.dbUser,
    password: process.env.dbPass,
    database: "company_db"
};

let connection;

const handleDisconnect = ()=> {
    connection = mysql.createConnection(dbConfig);

    connection.on("error", (err) =>{
        console.log("error in db connection", err);
        if(err.code === "PROTOCOL_CONNECTION_LOST"){
            handleDisconnect()
        }else{
            throw err;
        }
    })
};

handleDisconnect();

connection.connect((err)=>{
    if(err) {
        setTimeout(handleDisconnect, 2000);
    };
});

inq.prompt([
    {
        type: "list",
        name: "topicSelection1",
        message: "What would you like to do?",
        choices: [
            "Add a department, role, or employee",
            "View a department, role, or employee",
            "Update an employee's role or manager",
            "Remove a department, role, or employee"
        ]
    }
]).then(async (answer) =>{
    console.log(answer);
    switch(answer.topicSelection1){
        case "Add a department, role, or employee":
            add();
            break;
        case "View a department, role, or employee":
            const returned = await view();
            connection.query(returned, (err, results)=>{
                if (err) throw err;
                console.table(results);
            })
            break;
        case "Update an employee's role or manager":
            update();
            break;
        case "Remove a department, role, or employee":
            remove();
            break;
    }
});