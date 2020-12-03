const quests = require("./assets/inqHandlers/inqQuestions")
const inq = require("inquirer");
const inqHandlers = require("./assets/inqHandlers/inqHandlers");
const db = require("./assets/db_company/db_company");

let sort;

const start = () =>{
    inq.prompt(quests.mainMenuQuests).then((answer) =>{

        switch(answer.topicSelection1){
            case "Add a department, role, or employee":
                inq.prompt(quests.addQuests).then((answers)=>{
                    let text;
                    switch(answers.table){
                        case "departments":
                            text = `"${answers.name}"`;
                            break;
                        case "roles":
                            text = `"${answers.name}", ${answers.salary}, ${answers.departmentId}`;
                            break;
                        case "employees":
                            text = `"${answers.fName}", "${answers.lName}", ${answers.roleId}`;
                            if(answers.needManger){
                                text += `, ${answers.managerId}`;
                            }else{
                                text += ', NULL'
                            }
                            break;
                    }

                    sort = {
                        queryText: "INSERT INTO ",
                        extraQueryText: ` VALUES (NULL, ${text})`,
                        queryResultsHandler: function (results){
                            console.log(`${answers.name} was added to ${answers.table}`);
                            start();
                        }
                    };
                    const obj = new inqHandlers(answers, sort)
                    db.dbCall(obj);
                })
                break;
            case "View a department, role, or employee":
                inq.prompt(quests.viewQuests).then((answers)=>{
                    sort = {
                    queryResultsHandler: function (results){
                        console.table(results);
                        start();
                    },
                    queryText: "SELECT * FROM "
                    };
                    const obj = new inqHandlers(answers, sort)
                    db.dbCall(obj);
                })
                break;
            case "Update an employee's role or manager":
                inq.prompt(quests.updateQuests).then((answers)=>{
                    let col = "role_id";
                    if(answers.roleOrManager === "manager"){
                        col = "manager_id";
                        };

                    sort = {
                        queryResultsHandler: function (results){

                            console.log(`Employee with id ${answers.specificId} had their ${answers.roleOrManager} changed`);
                            start();
                        },
                        queryText: `UPDATE employees SET ${col}=${answers.changeToThisId}`
                    };

                    const obj = new inqHandlers(answers, sort)
                    db.dbCall(obj);
                });
                break;
            case "Remove a department, role, or employee":
                inq.prompt(quests.deleteQuests).then((answers)=>{

                    sort = {
                        queryResultsHandler: function(result){
                            console.log(`item with ${answers.specificId} was deleted form ${answers.table}`);
                            start();
                        },
                        queryText: `DELETE FROM `
                    }

                    const obj = new inqHandlers(answers, sort)
                    db.dbCall(obj);
                });
                break;
            case "Exit program":
                process.exit()
        }
    });
};

start();