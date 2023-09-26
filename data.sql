USE theme_db;

INSERT INTO theme_db.Usuarios(email,nombre,apellido,password,categoria,avatar)
VALUES('tjindricha@eepurl.com','Simon','Vinas','$2a$10$UoO.a7.lHYedkOU9.nSjq.2b9.oBIzbI/qX9R6LsOh6X2tFFMJ2ua','admin','image 13.png');
INSERT INTO theme_db.Usuarios(email,nombre,apellido,password,categoria,avatar)
VALUES('rriggs5@csmonitor.com','Letícia','Amores','$2a$10$UoO.a7.lHYedkOU9.nSjq.2b9.oBIzbI/qX9R6LsOh6X2tFFMJ2ua','admin','image 8.png');
INSERT INTO theme_db.Usuarios(email,nombre,apellido,password,categoria,avatar)
VALUES('aschankelborg7@sciencedaily.com','Maria-Fernanda','Cabello','$2a$10$UoO.a7.lHYedkOU9.nSjq.2b9.oBIzbI/qX9R6LsOh6X2tFFMJ2ua','superadmin','image 10.png');


INSERT INTO theme_db.Categorias(nombre,imagen)
VALUES
('PANTALONES','pantalones.jpg'),
('REMERAS','Mockup_Camiseta_Doblada_mockupgratis.com.jpg'),
('ABRIGOS','Mockup_Hoodie_Sudadera_mockupgratis.com.jpg'),
('COMPLEMENTOS','Mockup_Bolsa_Tela_Chica_mockupgratis.com.jpg'),
('CAMISAS','Camisas.png');

INSERT INTO theme_db.Productos(nombre,descripcion,id_categoria,precio,talleXS,talleS,talleM,talleL,talleXL,talleXXL,talleUnico)
VALUES
('jeans','Pantalon largo negro',1,400,3,4,5,6,7,3,0),
('Remera','Remera manga corta',2,400,3,4,5,6,7,3,0),
('Chaleco','Un chaleco',3,400,3,4,5,6,7,3,0),
('jeans','pantalon largo negro',1,400,3,4,5,6,7,3,0),
('Perfume','Au de toilette',1,400,0,0,0,0,0,0,1),


INSERT INTO theme_db.Imagenes(id_producto,nombre)
VALUES
(1, "ropa4a.jpg"),
(1, "ropa4b.jpg"),
(1, "ropa4c.jpg"),
(1, "ropa4d.jpg"),
(2, "remera1.png"),
(3, "ropa3a.jpg"),
(3, "ropa3b.jpg"),
(3, "ropa3c.jpg"),
(6, "ropa4a.jpg"),
(6, "ropa4b.jpg"),
(6, "ropa4c.jpg"),
(6, "ropa4d.jpg"),
(7, "perfume1.jpg"),
(7, "perfume1a.jpg"),
(7, "perfume1b.jpg"),
(8, "1687920937522.jpg")


INSERT INTO theme_db.Tickets(usuario_id)VALUES(1);
INSERT INTO theme_db.Productos_tickets(id_producto,precioFechaCompra,id_ticket,cantidad)VALUES(2,'2023-08-02',2,1);


