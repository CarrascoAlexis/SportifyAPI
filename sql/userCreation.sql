CREATE USER 'sportifyUser'@'localhost' IDENTIFIED BY 'password';

GRANT INSERT, SELECT, DELETE, UPDATE ON sportify.* TO 'sportifyUser'@'localhost';