const mysql = require("mysql");
const inq = require("inquirer");

exports.view = ()=>{
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
                return "SELECT * FROM departments";
                
            case "roles":
                return "SELECT * FROM departments";
            
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
                        ]
                    }
                ])
        }
    })
};


module.exports = view;