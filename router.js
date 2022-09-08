const express = require ("express");

const router = express.Router();

const conexion = require('./database/db');

router.get('/' , (req, res) =>{
    conexion.query('SELECT idNota,TituloNota,Descripcion, FechaPublicacion FROM nota', (error, results) => {
        if (error) {
            throw error;
        }else{
            console.log(results);
            res.render('index',{results:results});
        }
    });
});

router.get('/crear-nota' , (req, res) =>{
    conexion.query('SELECT idPersonal,Nombre,ApePaterno,ApeMaterno FROM personal WHERE idTipoUsuario = 1', (error, results) => {
        if (error) {
            throw error;
        }else{
            res.render('nota/crear_nota',{results:results});
        }
    });
   
});

router.get('/add-respuesta/:id' , (req, res) =>{
    const id = req.params.id;
    const aux = id.split(":" );
    const idfinal = aux[1];
    conexion.query('SELECT idPersonal,Nombre,ApePaterno,ApeMaterno FROM personal', (error, results) => {
        if (error) {
            throw error;
        }else{
            res.render('nota/add_respuesta',{results:results,id:idfinal});
        }
    });
});

router.get('/ver-nota/:id' , (req, res) =>{
    const id = req.params.id;
    const aux = id.split(":" );
    const idfinal = aux[1];
    conexion.query('SELECT * FROM nota n INNER JOIN personal p ON p.idPersonal'+
    ' = n.idPersonal WHERE n.idNota ='+idfinal, (error, results) => {
        if (error) {
            throw error;
        }else{
            conexion.query('SELECT c.idComentario ,p.Nombre, p.ApePaterno, p.ApeMaterno,c.Descripcion, c.FechaComentario  FROM comentario c INNER JOIN personal p ON p.idPersonal = c.idPersonal INNER JOIN TipoUsuario tp ON tp.idTipoUsuario = p.idTipoUsuario WHERE idNota ='+idfinal, (errores, resultado) => {
                if (errores) {
                    throw errores;
                }else{
            res.render('nota/ver_nota',{nota:results[0], comentario:resultado});
                }
            });
        }
    });
   
});

    router.get('/crear-comentario/:id' , (req, res) =>{
        const id = req.params.id;
    const aux = id.split(":" );
    const idfinal = aux[1];

        conexion.query('SELECT idPersonal,Nombre,ApePaterno,ApeMaterno FROM personal', (error, results) => {
            if (error) {
                throw error;
            }else{
                res.render('nota/crear_comentario',{results:results, id:idfinal});
            }
        });
       
    });

    router.get('/ver-respuesta/:id' , (req, res) =>{
        const id = req.params.id;
    const aux = id.split(":" );
    const idfinal = aux[1];
    conexion.query('SELECT * FROM respuesta r INNER JOIN personal p ON p.idPersonal'+
    ' = r.idPersonal WHERE r.idComentario ='+idfinal, (error, results) => {
        if (error) {
            throw error;
        }else{
            res.render('nota/respuesta', {results:results, id:idfinal});
        }

    });
       
    });
   

const qry = require('./controllers/dbqry');
router.post('/save',qry.save );
router.post('/save-comentario',qry.save_comentario );
router.post('/save-respuesta',qry.save_respuesta );

module.exports= router;