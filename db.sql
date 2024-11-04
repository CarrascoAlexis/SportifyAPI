DROP TABLE IF EXISTS `participation`;
DROP TABLE IF EXISTS `user`;
DROP TABLE IF EXISTS `event`;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `title` varchar(64) NOT NULL,
  `players` int(11) NOT NULL,
  `isVisible` tinyint(1) NOT NULL DEFAULT 0,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `authorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `participation` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `score` int(11) NOT NULL DEFAULT -1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nickname` varchar(32) NOT NULL,
  `isEmploye` tinyint(1) NOT NULL DEFAULT 0,
  `mail` varchar(64) NOT NULL,
  `pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);
 

ALTER TABLE `participation`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


ALTER TABLE `participation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

ALTER TABLE `participation`
  ADD CONSTRAINT fk_participation_user_id
  FOREIGN KEY (`account_id`)
  REFERENCES `user`(`id`);

ALTER TABLE `participation`
  ADD CONSTRAINT fk_participation_event_id
  FOREIGN KEY (`event_id`)
  REFERENCES `event`(`id`);