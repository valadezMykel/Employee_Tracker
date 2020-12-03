const questions = { 

    mainMenuQuests: [
        {
            type: "list",
            name: "topicSelection1",
            message: "What would you like to do?",
            choices: [
                "Add a department, role, or employee",
                "View a department, role, or employee",
                "Update an employee's role or manager",
                "Remove a department, role, or employee",
                "Exit program"
            ]
        }
    ],

    viewQuests: [
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
    ],

    addQuests: [
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
    ],

    updateQuests: [
        {
            type: "input",
            name: "specificId",
            message: "Enter the id of the employee you wish to update"
        },
        {
            type: "list",
            name: "roleOrManager",
            message: "Would you like to update the employee's role or manager?",
            choices:[
                "role",
                "manager"
            ]
        },
        {
            type: "input",
            name: "changeToThisId",
            message: "Enter the new id you wish to assign"
        }
    ],

    deleteQuests: [
        {
            type: "list",
            name: "table",
            message: "What category would you like to delete from?",
            choices: [
                "departments",
                "roles",
                "employees"
            ]
        },
        {
            when: (ans) => ans.table === "departments",
            type: "confirm",
            name: "allClear",
            message: "Before you delete a department make sure that no roles or employees are assigned to it.  Do You wish to continue?" 
        },
        {
            when: (ans) => {return (ans.table === "departments" && ans.allClear === true)},
            type: "input",
            name: "specificId",
            message: "Enter the id of the department you want to delete"
        },
        {
            when: (ans) => ans.table === "roles",
            type: "confirm",
            name: "allClear",
            message: "Before you delete a role make sure that no employees are assigned to it. Do you wish to continue?" 
        },
        {
            when: (ans) => {return (ans.table === "roles" && ans.allClear === true)},
            type: "input",
            name: "specificId",
            message: "Enter the id of the role you want to delete"
        },
        {
            when: (ans) => ans.table === "employees",
            type: "confirm",
            name: "allClear",
            message: "If the employee you wish to delete is a manager make sure that no other employees are currently assigned to them before deleting them.  Do you wish to continue?" 
        },
        {
            when: (ans) => {return (ans.table === "employees" && ans.allClear === true)},
            type: "input",
            name: "specificId",
            message: "Enter the id of the employee you want to delete"
        },
    ]
};

module.exports = questions;