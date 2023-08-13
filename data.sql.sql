USE theme_db;

INSERT INTO theme_db.usuarios(email,nombre,apellido,password,categoria,avatar)
VALUES('jenn@gmail.com','jennifer','lichtensztejn','123456','usuario','/jennifer.jpg');
INSERT INTO theme_db.usuarios(email,nombre,apellido,password,categoria,avatar)
VALUES('rriggs5@csmonitor.com','Letícia','Amores','$2a$10$UoO.a7.lHYedkOU9.nSjq.2b9.oBIzbI/qX9R6LsOh6X2tFFMJ2ua','admin','image 8.png');
INSERT INTO theme_db.usuarios(email,nombre,apellido,password,categoria,avatar)
VALUES('aschankelborg7@sciencedaily.com','Maria-Fernanda','Cabello','$2a$10$UoO.a7.lHYedkOU9.nSjq.2b9.oBIzbI/qX9R6LsOh6X2tFFMJ2ua','superadmin','/image 10.png');


INSERT INTO theme_db.categorias(nombre,imagen)
VALUES('pantalones','/pantalones.jpg');
INSERT INTO theme_db.productos(nombre,descripcion,id_categoria,precio,talleXS,talleS,talleM,talleL,talleXL,talleXXL,talleUnico)
VALUES('jeans','pantalon largo negro',1,400,3,4,5,6,7,3,5);
INSERT INTO theme_db.tickets(fecha,usuario_id)VALUES('2023-08-02',1);
INSERT INTO theme_db.productos_tickets(id_producto,precioFechaCompra,id_ticket,cantidad)VALUES(1,'2023-08-02',1,1);
