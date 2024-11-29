CREATE USER 'sportifyUser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Titouan426!';

GRANT INSERT, SELECT, DELETE, UPDATE ON sportify.* TO 'sportifyUser'@'localhost';