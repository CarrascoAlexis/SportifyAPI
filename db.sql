DROP TABLE IF EXISTS `sportify`.`event`;

CREATE TABLE `sportify`.`event` (
    `id` INT NOT NULL AUTO_INCREMENT , 
    `title` VARCHAR(64) NOT NULL , 
    `players` INT NOT NULL , 
    `isVisible` BOOLEAN NOT NULL DEFAULT false , 
    `startDate` DATE NOT NULL , 
    `endDate` DATE NOT NULL , 
    `authorId` INT NOT NULL , 
    PRIMARY KEY (`id`)) ENGINE = InnoDB;