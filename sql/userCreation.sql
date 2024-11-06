CREATE USER 'sportifyUser'@'localhost' IDENTIFIED BY 'password';

GRANT INSERT, SELECT, DELETE ON sportify.* TO 'sportifyuser'@'localhost';