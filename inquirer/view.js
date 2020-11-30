const mysql = require("mysql");
const inq = require("inquirer");
// const executer = require("../app.js")



const view = ()=> {
    console.log("view started")
    let queryObj = {};
    
    inq.prompt([
        {
            type: "list",
            name: "question1",
            message: "Which would you like to view?",
            choices: [
                "departments",
                "roles",
                "employees"
            ]
        }
    ]).then((answer) => {
        switch(answer.question1){
            case "departments":
                queryObj.instruction = "SELECT * FROM departments";
                queryObj.variables = null;
                queryObj.func =  (err, results) => {
                    if(err) throw err;
                    console.table(results);
                };
            
                return queryObj;
                break;
                
            case "roles":
                queryObj.instruction = "SELECT * FROM roles";
                queryObj.variables = null;
                queryObj.func =  (err, results) => {
                    if(err) throw err;
                    console.table(results);
                };

                return queryObj;
                break;
            
            case "employees":
                inq.prompt([
                    {
                        type: "list",
                        name: "employeeSearchType",
                        message: "How would would you like to find and employee?",
                        choices: [
                            "By id",
                            "By role",
                            "By manager",
                            "All employees"
                        ]
                    },
                    {
                        type: "input",
                        name: "specific",
                        message: "Enter the parameter you wish to search by",
                        when: (answer) => {
                            return (answer.employeeSearchType !== "All employees")
                        }
                    }
                ]).then((answer) => {
                    switch(answer.employeeSearchType){
                        case "By id":
                            queryObj.instruction = "SELECT * FROM employees WHERE id=?";
                            queryObj.variables = [answer.specific];
                            queryObj.func =  (err, results) => {
                                if(err) throw err;
                                console.table(results);
                            };
                            return queryObj;
                            break;
                        case "By role":
                            queryObj.instruction = "SELECT * FROM employees WHERE role_id=?";
                            queryObj.variables = [answer.specific];
                            queryObj.func =  (err, results) => {
                                if(err) throw err;
                                console.table(results);
                            };
                            return queryObj;
                            break;
                        case "By manager":
                            queryObj.instruction = "SELECT * FROM employees WHERE manager_id=?";
                            queryObj.variables = [answer.specific];
                            queryObj.func =  (err, results) => {
                                if(err) throw err;
                                console.table(results);
                            };
                            return queryObj;
                            break;
                        case "All employees":
                            queryObj.instruction = "SELECT * FROM employees";
                            queryObj.variables = null;
                            queryObj.func =  (err, results) => {
                                if(err) throw err;
                                console.table(results);
                            };
                            return queryObj;
                            break;
                            
                    }
                })
        }
    })
};


module.exports = view;


let queryObj = {};
                inq.prompt([
                    {
                        type: "list",
                        name: "question1",
                        message: "Which would you like to view?",
                        choices: [
                            "departments",
                            "roles",
                            "employees"
                        ]
                    }
                ]).then((answer) => {
                    switch(answer.question1){
                        case "departments":
                            queryObj.instruction = "SELECT * FROM departments";
                            queryObj.variables = null;
                            queryObj.func =  (err, results) => {
                                if(err) throw err;
                                console.table(results);
                            };
                        
                            executer(queryObj);
                            break;
                            
                        case "roles":
                            queryObj.instruction = "SELECT * FROM roles";
                            queryObj.variables = null;
                            queryObj.func =  (err, results) => {
                                if(err) throw err;
                                console.table(results);
                            };
            
                            executer(queryObj);
                            break;
                        
                        case "employees":
                            inq.prompt([
                                {
                                    type: "list",
                                    name: "employeeSearchType",
                                    message: "How would would you like to find and employee?",
                                    choices: [
                                        "By id",
                                        "By role",
                                        "By manager",
                                        "All employees"
                                    ]
                                },
                                {
                                    type: "input",
                                    name: "specific",
                                    message: "Enter the id parameter you wish to search by",
                                    when: (answer) => {
                                        return (answer.employeeSearchType !== "All employees")
                                    }
                                }
                            ]).then((answer) => {
                                switch(answer.employeeSearchType){
                                    case "By id":
                                        queryObj.instruction = "SELECT * FROM employees WHERE id=?";
                                        queryObj.variables = [answer.specific];
                                        queryObj.func =  (err, results) => {
                                            if(err) throw err;
                                            console.table(results);
                                        };
                                        executer(queryObj);
                                        break;
                                    case "By role":
                                        queryObj.instruction = "SELECT * FROM employees WHERE role_id=?";
                                        queryObj.variables = [answer.specific];
                                        queryObj.func =  (err, results) => {
                                            if(err) throw err;
                                            console.table(results);
                                        };
                                        executer(queryObj);
                                        break;
                                    case "By manager":
                                        queryObj.instruction = "SELECT * FROM employees WHERE manager_id=?";
                                        queryObj.variables = [answer.specific];
                                        queryObj.func =  (err, results) => {
                                            if(err) throw err;
                                            console.table(results);
                                        };
                                        executer(queryObj);
                                        break;
                                    case "All employees":
                                        queryObj.instruction = "SELECT * FROM employees";
                                        queryObj.variables = null;
                                        queryObj.func =  (err, results) => {
                                            if(err) throw err;
                                            console.table(results);
                                        };
                                        executer(queryObj);
                                        break;
                                        
                                }
                            })
                    }
                })