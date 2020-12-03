let instruction;
let func;
let searchById;

function instructionBuilder(inqAnswersObj, sort) {

    instruction = sort.queryText;
    
    if(inqAnswersObj.table){
        instruction += inqAnswersObj.table;
    };

    if(sort.extraQueryText){
        instruction += sort.extraQueryText;
    };

    if(inqAnswersObj.specificId){

        switch(inqAnswersObj.idType){

            case "By role":
                searchById = "role_id";
                break;
            case "By manager":
                searchById = "manager_id";
                break;
            case "By department":
                searchById = "department_id";
                break;
            default:
                searchById = "id";
                break;
        };
        instruction += ` WHERE ${searchById} = ${inqAnswersObj.specificId}`
    };
};

function funcBuilder(sort){
    func = (err, results) =>{
        if(err) throw err;
        sort.queryResultsHandler(results);
    };
};

class QueryObj {
    constructor(inqAnswersObj, sort){

        instructionBuilder(inqAnswersObj, sort);
        funcBuilder(sort);

        this.instruction = instruction;
        this.func = func;
    }
}

module.exports = QueryObj;