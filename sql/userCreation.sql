CREATE USER 'sportifyUser'@'localhost' IDENTIFIED BY 'password';

GRANT INSERT, SELECT, DELETE, PUDATE, FILE ON sportify.* TO 'sportifyuser'@'localhost';