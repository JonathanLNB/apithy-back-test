const mysql = require('mysql');
const config = require('../config');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});

class UsuarioS {
    constructor() {
        connection.connect();
    }

    async agregarMultiplesUsuarios({usuarios}, res) {
        let success = [];
        let errores = [];
        let resultado;
        for (const usuario of usuarios) {
            resultado = await this.agregarUsuario(usuario);
            if (resultado.success)
                success.push(usuario);
            else
                errores.push(resultado.causa);
        }
        res.status(200);
        return {success: true, hint: "success", message: "success", data: {success, validation: errores}};

    }

    agregarUsuario({name, email, code}) {
        let insercion, validacion;
        return new Promise((resolve, reject) => {
            try {
                validacion = `SELECT ? NOT LIKE '%@%.%' as correoInvalido, ? IN (SELECT email from usuario where email like ?) as correoDuplicado, length(?) > 50 as longitudInvalida, IFNULL((SELECT idRol from roles WHERE codigo like ?),0) as idRol`;
                insercion = `INSERT INTO usuario SET ?`;
                connection.beginTransaction(function (err) {
                    if (err) {
                        throw err;
                    }
                    connection.query(validacion, [email, email, email, name, code], function (e, results, fields) {
                        if (e) {
                            return connection.rollback(function () {
                                console.error(e);
                                resolve({success: false, causa: e});
                            });
                        }

                        let {correoInvalido, correoDuplicado, longitudInvalida, idRol} = results[0];

                        if (correoInvalido === 0 && correoDuplicado === 0 && longitudInvalida === 0 && idRol != 0) {
                            connection.query(insercion, {
                                nombre: name,
                                email,
                                idRol
                            }, function (error, results, fields) {
                                if (error) {
                                    return connection.rollback(function () {
                                        console.error(error);
                                        resolve({success: false, causa: error});
                                    });
                                }
                                connection.commit(function (er) {
                                    if (er) {
                                        return connection.rollback(function () {
                                            resolve({success: false, causa: er});
                                            console.error(er);
                                        });
                                    }
                                    resolve({success: true});
                                });
                            });
                        } else {
                            let validation = {};
                            if (correoInvalido === 1)
                                validation.email = {value: email, validation: "Correo invalido"};

                            if (correoDuplicado === 1)
                                validation.email = {value: email, validation: "Correo duplicado"};

                            if (longitudInvalida === 1)
                                validation.name = {value: name, validation: "Nombre muy largo"}

                            if (idRol === 0)
                                validation.code = {value: code, validation: "Código invalido"};

                            resolve({success: false, causa: validation});
                        }
                    });
                });
            } catch (e) {
                console.error(e);
                resolve({success: false})
            }
        });
    }

    buscarUsuarioByID({idUsuario}, res) {
        return new Promise((resolve, reject) => {
            let query;
            try {
                query = `SELECT IFNULL((SELECT JSON_OBJECT('success', true, 'usuarios', IFNULL(JSON_OBJECT('id', idUsuario, 'name', nombre, 'email', email, 'role', IFNULL((SELECT JSON_OBJECT('id', idRol, 'name', descripcion, 'code', codigo) FROM roles where roles.idRol = usuario.idRol), (SELECT JSON_OBJECT()))), JSON_OBJECT())) as result FROM usuario where idUsuario = ?), ((SELECT JSON_OBJECT('success', true, 'usuarios', JSON_OBJECT())))) as result;`;
                connection.query(query, [idUsuario], function (error, results, fields) {
                    if (error) {
                        console.error(error);
                        res.status(409);
                        resolve({success: false});
                    }
                    res.status(200);
                    resolve(results[0].result);
                });
            } catch (e) {
                console.error(e);
                res.status(409);
                resolve({success: 0, error: e})
            }
        });
    }

    allUsuarios(res) {
        return new Promise((resolve, reject) => {
            let query;
            try {
                query = `SELECT JSON_OBJECT('success', true, 'usuarios', IFNULL(JSON_ARRAYAGG(JSON_OBJECT('id', idUsuario, 'name', nombre, 'email', email, 'role', IFNULL((SELECT JSON_OBJECT('id', idRol, 'name', descripcion, 'code', codigo)FROM roles where roles.idRol = usuario.idRol), (SELECT JSON_ARRAY())))), JSON_ARRAY())) as result FROM usuario`;
                connection.query(query, function (error, results, fields) {
                    if (error) {
                        console.error(error);
                        res.status(409);
                        resolve({success: false});
                    }
                    res.status(200);
                    resolve(results[0].result);
                });
            } catch (e) {
                console.error(e);
                res.status(409);
                resolve({success: 0, error: e})
            }
        });
    }
}

module.exports = UsuarioS;