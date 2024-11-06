let sql = require("mysql");

let conexion = sql.createConnection({
    host: "localhost",
    database: "bd_organizador",
    user: "root",
    password: ""
});

conexion.connect(function(error){
        if(error){
            throw error;
        }else{
            console.log("conectado papu");
        }
});

const departamentos = "SELECT * FROM departamento";
conexion.query(departamentos, function(error,query){
    if(error){
        throw error;
    }else{
        console.log(query);
    }
});

/*const registro = "INSERT INTO departamento (ID_deb, NAME_deb) VALUES ('','rhh')";
conexion.query(registro, function(error,query){
    if(error){
        throw error;
    }else{
        console.log(query);
    }
});*/

conexion.end()