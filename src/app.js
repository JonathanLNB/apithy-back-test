const express = require('express');
const app = express();
const cors = require('cors');
const config = require('./config');
const fileUpload = require('express-fileupload');
const {notFound, errorHandler} = require('./middleware');

const corsConfig = {
    origin: '*',
    optionsSuccessStatus: 200
};

const apiUsuario = require('./routes/UsuariosR');


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(cors(corsConfig));

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(function (req, res, next) {
    console.log('Request Type:', req.method);
    console.log('Request URL:', req.originalUrl);
    next();
});

app.use("/", apiUsuario);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(config.port, function () {
    console.log(`El Servidor inicio en el puerto ${server.address().port}`);
});
module.exports = app;