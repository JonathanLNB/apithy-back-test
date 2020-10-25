const express = require('express');
const router = express.Router();
const usuarioService = require('../services/UsuariosS');
const excelService = require('../services/ExcelReaderS');
let usuario = new usuarioService();
let excel = new excelService();

router.post('/users-import', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    let response;
    let usuarios = await excel.leerExcel(req.files);
    if (usuarios.success)
        response = await usuario.agregarMultiplesUsuarios(usuarios, res);
    else
        response = {
            error: "failed",
            code: 409,
            hint: "error",
            message: `Error al importar datos: ${usuarios.causa}`,
        }
    res.send(response);
});

router.get('/users', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    let response = await usuario.allUsuarios(res);
    res.send(response);
});

router.get('/users/:idUsuario', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    let response = await usuario.buscarUsuarioByID(req.params, res);
    res.send(response);
});

module.exports = router;