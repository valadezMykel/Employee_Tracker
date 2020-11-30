
const inq = require("inquirer");
const inqHandlers = require("./assets/inqHandlers/inqHandlers");
const db = require("./assets/db_company/db_company");

db.connect();

const mainMenuQuests = [
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
];

const viewQuests = [
    {
        type: "list",
        name: "table",
        message: "Which would you like to view?",
        choices: [
            "departments",
            "roles",
            "employees"
        ]
    },
    {
        type: "list",
        name: "idType",
        message: "How would would you like to find and employee?",
        choices: [
            "By id",
            "By role",
            "By manager",
            "By department",
            "All employees"
        ],
        when: (answer) => {
            return (answer.table === "employees")
        }
    },
    {
        type: "input",
        name: "specificId",
        message: "Enter the id parameter you wish to search by",
        when: (answer) => {
            return (answer.idType !== "All employees" && answer.table === "employees")
        }
    }
];

const addQuests = [
    {
        type: "list",
        name: "table",
        message: "What would you like to add?",
        choices: [
            "departments",
            "roles",
            "employees"
        ]
    },
    {
        when: (ans) => ans.table === "departments",
        type: "input",
        name: "name",
        message: "Enter the name of the department you want to create"   
    },
    {
        when: (ans) => ans.table === "roles",
        type: "input",
        name: "name",
        message: "Enter the name of the role you want to create"   
    },
    {
        when: (ans) => ans.table === "roles",
        type: "input",
        name: "salary",
        message: "Enter the new role's salary"   
    },
    {
        when: (ans) => ans.table === "roles",
        type: "input",
        name: "departmentId",
        message: "Enter the id of the department the new role belongs to"   
    },
    {
        when: (ans) => ans.table === "employees",
        type: "input",
        name: "fName",
        message: "Enter the first name of the new employee"   
    },
    {
        when: (ans) => ans.table === "employees",
        type: "input",
        name: "lName",
        message: "Enter the last name of the new employee"    
    },
    {
        when: (ans) => ans.table === "employees",
        type: "input",
        name: "roleId",
        message: "Enter the id of the new employee's role"    
    },
    {
        when: (ans) => ans.table === "employees",
        type: "confirm",
        name: "needManager",
        message: "Does the new employee have a manager?"    
    },
    {
        when: (ans) => ans.needManger,
        type: "input",
        name: "managerID",
        message: "Enter the id of the manager"    
    }
];


const start = () =>{
    inq.prompt(mainMenuQuests).then((answer) =>{

        switch(answer.topicSelection1){
            case "Add a department, role, or employee":

                break;
            case "View a department, role, or employee":
                inq.prompt(viewQuests).then((answers)=>{
                    let sort = {
                    queryResultsHandler: function (results){
                        console.table(results);
                    },
                    queryType: "SELECT * FROM "
                    }
                    const obj = new inqHandlers(answers, sort)
                    db.dbCall(obj);
                })
                break;
            case "Update an employee's role or manager":

                break;
            case "Remove a department, role, or employee":
                
                break;
        }
    });
};


start();