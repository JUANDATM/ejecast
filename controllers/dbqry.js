const conexion = require('../database/db');



exports.save = (req,res)=>{
    const titulo = req.body.TituloNota;
    const desc = req.body.DescripcionNota;
    const tipo = req.body.TipoUsuario;
    const fecha =  new Date().toISOString().slice(0, 19).replace('T', ' ');

    conexion.query('INSERT INTO nota SET ?',{TituloNota:titulo,Descripcion:desc,FechaPublicacion:fecha,idPersonal:tipo}, (error, results) =>{
     if (error) {
        console.log(error);
     }   else{
        res.redirect('/');
     }
    });
};
exports.save_comentario = (req,res)=>{
   const idnota = req.body.idNota;
   const comentario = req.body.comentario;
   const tipo = req.body.TipoUsuario;
   const fecha =  new Date().toISOString().slice(0, 19).replace('T', ' ');

   conexion.query('INSERT INTO comentario SET ?',{idNota:idnota,Descripcion:comentario,idPersonal:tipo,FechaComentario:fecha}, (error, results) =>{
    if (error) {
       console.log(error);
    }   else{
       res.redirect('/');
    }
   });
};
exports.save_respuesta = (req,res)=>{
   const idcomentario = req.body.idComentario;
   const desc = req.body.desc;
   const tipo = req.body.TipoUsuario;
   const fecha =  new Date().toISOString().slice(0, 19).replace('T', ' ');

   conexion.query('INSERT INTO respuesta SET ?',{idComentario:idcomentario,Descripcion:desc,idPersonal:tipo,FechaRespuesta:fecha}, (error, results) =>{
    if (error) {
       console.log(error);
    }   else{
       res.redirect('/');
    }
   });
};