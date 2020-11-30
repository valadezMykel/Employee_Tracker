let instruction;
let variables;
let func;
let searchById;

function instructionBuilder(inqAnswersObj, sort) {

    instruction = sort.queryType + inqAnswersObj.table;

    if(inqAnswersObj.specificId){
        console.log("is specific")
        switch(inqAnswersObj.idType){
            case "By id":
                searchById = "id";
                break;
            case "By role":
                searchById = "role_id";
                break;
            case "By manager":
                searchById = "manager_id";
                break;
            case "By department":
                searchById = "department_id";
                break;
        }
        instruction += ` WHERE ${searchById} = ${inqAnswersObj.specificId}`
    }
}

// function variablesBuilder(inqAnswersObj){
//     return null
// }

function funcBuilder(sort){
    func = (err, results) =>{
        if(err) throw err;
        sort.queryResultsHandler(results);
    }
};

class QueryObj {
    constructor(inqAnswersObj, sort){

        instructionBuilder(inqAnswersObj, sort);
        funcBuilder(sort);

        this.instruction = instruction;
        // this.variables = variables;
        this.func = func;
    }

}

module.exports = QueryObj;
