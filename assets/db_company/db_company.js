require("dotenv").config();
const mysql = require("mysql");

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

exports.dbCall = (obj) => {
    connection.query(obj.instruction, obj.func)
};