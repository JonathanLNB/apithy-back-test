CREATE TABLE roles
(
    idRol      INTEGER AUTO_INCREMENT primary key,
    codigo      VARCHAR(5),
    descripcion VARCHAR(25)
);
CREATE TABLE usuario
(
    idUsuario INTEGER AUTO_INCREMENT primary key,
    nombre    VARCHAR(50),
    email     VARCHAR(255) UNIQUE,
    idRol     INTEGER REFERENCES roles (idRol) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO roles(codigo, descripcion) VALUES ('AD', 'Administrador'), ('PROF', 'Profesor'), ('STU', 'Estudiante');

