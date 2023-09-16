DROP DATABASE IF EXISTS theme_db;
CREATE DATABASE theme_db;

USE theme_db;



CREATE TABLE `Productos_tickets`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_producto` BIGINT UNSIGNED NOT NULL,
    `precioFechaCompra` DOUBLE(8, 2) NOT NULL,
    `id_ticket` BIGINT UNSIGNED NOT NULL,
    `cantidad` TINYINT NOT NULL
    `talle` VARCHAR(255) NULL
);
CREATE TABLE `Productos`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `id_categoria` BIGINT UNSIGNED NOT NULL,
    `precio` DOUBLE (8, 2) UNSIGNED NOT NULL,
    `talleS` INT UNSIGNED NOT NULL,
    `talleM` INT UNSIGNEDNOT NULL,
    `talleL` INT UNSIGNED NOT NULL,
    `talleXL` INT UNSIGNED NOT NULL,
    `talleXXL` INT UNSIGNED NOT NULL,
    `talleUnico` INT UNSIGNED NOT NULL,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    `deletedAt` DATETIME
);
CREATE TABLE `Categorias`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `imagen` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    `deletedAt` DATETIME

);
CREATE TABLE `Tickets`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `usuario_id` BIGINT UNSIGNED NOT NULL,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    `deletedAt` DATETIME
);
CREATE TABLE `Imagenes`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nombre` VARCHAR(255) NOT NULL,
    `id_producto` BIGINT UNSIGNED NOT NULL
);
CREATE TABLE `Usuarios`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `apellido` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `categoria` VARCHAR(255) NOT NULL,
    `avatar` VARCHAR(255) NOT NULL,
    `direccion` VARCHAR(255) DEFAULT NULL,
    `telefono` INT  DEFAULT NULL,
    `createdAt` DATETIME,
    `updatedAt` DATETIME,
    `deletedAt` DATETIME
);
ALTER TABLE
    `Productos` ADD CONSTRAINT `productos_id_categoria_foreign` FOREIGN KEY(`id_categoria`) REFERENCES `Categorias`(`id`);
ALTER TABLE
    `Productos_tickets` ADD CONSTRAINT `productos_tickets_id_ticket_foreign` FOREIGN KEY(`id_ticket`) REFERENCES `Tickets`(`id`);
ALTER TABLE
    `Imagenes` ADD CONSTRAINT `imagenes_idproducto_foreign` FOREIGN KEY(`id_producto`) REFERENCES `Productos`(`id`);
ALTER TABLE
    `Productos_tickets` ADD CONSTRAINT `productos_tickets_id_producto_foreign` FOREIGN KEY(`id_producto`) REFERENCES `Productos`(`id`);
ALTER TABLE
    `Tickets` ADD CONSTRAINT `tickets_usuario_id_foreign` FOREIGN KEY(`usuario_id`) REFERENCES `Usuarios`(`id`);