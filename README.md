# Apithy Backend Test

Esta aplicación consiste en una serie de microservicios para consulta e importación de usuarios.

## Documentación 

Para documentar los endpoints decidi utilizar la herramienta de Postman esta información se puede visualizar en la siguiente liga: 

[https://documenter.getpostman.com/view/10223796/TVYF7y67](https://documenter.getpostman.com/view/10223796/TVYF7y67).

## Tecnologías
Para el desarrollo del servidor utilice el lenguaje JavaScript.

### Express JS ###
Express es una infraestructura de aplicaciones web Node.js mínima y flexible que proporciona un conjunto sólido de características para las aplicaciones web y móviles. 
```npm
npm i -S express
```

### Express File Upload ### 
Middleware de express para la carga de archivos de forma sencilla.
```npm
npm i -S express-fileupload
```

### Cors ###
CORS es un paquete node.js para proporcionar un middleware Connect / Express que se puede usar para habilitar CORS con varias opciones.

```npm
npm i -S cors
```

### MySQL ###
Se utilizo como gestor de base de datos MySQL por mi experiencia en el desarrollo con esta tecnología. Además se utilizo un driver desarrollado en JavaScript para realizar la conexión con la base de datos.

```npm
npm i - Smysql
```

### XLSX ###
Analizador y escritor para varios formatos de hojas de cálculo. Implementación Pure-JS a partir de especificaciones oficiales, documentos relacionados y archivos de prueba. Énfasis en la robustez del análisis y la escritura, la compatibilidad de funciones de formato cruzado con una representación JS unificada y la compatibilidad del navegador ES3 / ES5 con IE6.

Se utilizo xlsx principalmente por la cantidad de datos que puede leer a diferencia de otros paquetes.

```npm
npm i -S xlsx
```

### Nodemon ###
Nodemon es una herramienta que ayuda a desarrollar aplicaciones basadas en node.js al reiniciar automáticamente la aplicación de nodo cuando se detectan cambios de archivo en el directorio.

Nodemon no requiere ningún cambio adicional en su código o método de desarrollo. nodemon es un contenedor de reemplazo para node. Para usar nodemon, reemplace la palabra nodo en la línea de comando cuando ejecute su script.

```npm
npm i -D nodemon
```
## Instalación
El proceso de instalación es bastante sencillo unicamente se debe clonar el proyecto.

```git
git clone https://github.com/JonathanLNB/apithy-back-test.git
```

Seguido de esto debemos ingresar a la carpeta del proyecto.

```bash
cd apithy-back-test/
```

Y por ultimo instalamos las dependencias e iniciamos el servidor con Nodemon.


```npm
npm install
npm run dev
```
