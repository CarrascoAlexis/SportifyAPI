CREATE USER 'sportifyUser'@'localhost' IDENTIFIED BY 'Titouan426!';

GRANT INSERT, SELECT, DELETE, UPDATE ON sportify.* TO 'sportifyuser'@'localhost';