const mysql = require("mysql");

const conexion = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "password",
    port: 3306,
    database: "castoresejercicio"
}); 


conexion.connect((error) =>{
    if (error) {
        console.error('Error al intentar conectarse a la base de datos'+ error);
        return
    }
    console.log("Conectado!");

});

module.exports = conexion;