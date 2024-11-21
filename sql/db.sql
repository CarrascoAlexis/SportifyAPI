SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `title` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `isVisible` tinyint(1) NOT NULL DEFAULT 0,
  `submitDate` datetime NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `authorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `event` (`id`, `title`, `description`, `isVisible`, `submitDate`, `startDate`, `endDate`, `authorId`) VALUES
(52, 'ZEvent', 'Un event bien pourri ou des riches demandent de faire des dons aux pauvres', 1, '2024-11-19 20:16:41', '2024-11-21 08:00:00', '2024-11-24 23:00:00', 47),
(71, 'test', 'Un event pour faire mes tests', 1, '2024-11-20 13:52:59', '2024-11-23 15:54:00', '2024-11-21 16:55:00', 47);

CREATE TABLE `eventpicture` (
  `id` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `fileName` varchar(355) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `eventpicture` (`id`, `eventId`, `fileName`) VALUES
(8, 71, '1732107179617-event-pgw.jpg'),
(9, 71, '1732107179618-event-zevent.jpg'),
(10, 71, '1732107179620-event-zlan.jpg');

CREATE TABLE `participation` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `score` int(11) NOT NULL DEFAULT -1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `participation` (`id`, `accountId`, `eventId`, `score`) VALUES
(3, 47, 71, 0);

CREATE TABLE `profilepicture` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `fileName` varchar(355) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `token` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `session` (`id`, `userId`, `token`) VALUES
(93, 48, 'ca9b2901ebca2882134de087aa71e9dff03ce86cce0d68de38570b42cf0d3ee228554ef74fe450cb832415818f2ff0e3');

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nickname` varchar(32) NOT NULL,
  `isEmploye` tinyint(1) NOT NULL DEFAULT 0,
  `mail` varchar(64) NOT NULL,
  `pass` text NOT NULL,
  `profile` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `user` (`id`, `nickname`, `isEmploye`, `mail`, `pass`, `profile`) VALUES
(47, 'kroko_san', 0, 'takcraft202@gmail.com', '*AC864D5A5E9DDBD8370332085E876ADC905E9919', ''),
(48, 'Takcraft202', 0, 'alexis.lp.carrasco@gmail.com', '*AC864D5A5E9DDBD8370332085E876ADC905E9919', '');


ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `eventpicture`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `participation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_participation_user_id` (`accountId`),
  ADD KEY `fk_participation_event_id` (`eventId`);

ALTER TABLE `profilepicture`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `session`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

ALTER TABLE `eventpicture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `participation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `profilepicture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;


ALTER TABLE `participation`
  ADD CONSTRAINT `fk_participation_event_id` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`),
  ADD CONSTRAINT `fk_participation_user_id` FOREIGN KEY (`accountId`) REFERENCES `user` (`id`);
COMMIT;

ALTER TABLE `profilepicture`
  ADD CONSTRAINT `fk_profilepicture_user_id` FOREIGN KEY (userId) REFERENCES `user` (`id`);
COMMIT;

ALTER TABLE `eventpicture`
  ADD CONSTRAINT `fk_eventpicture_event_id` FOREIGN KEY (eventId) REFERENCES `event` (`id`);
COMMIT;

ALTER TABLE `session`
  ADD CONSTRAINT `fk_session_user_id` FOREIGN KEY (userId) REFERENCES `user` (`id`);
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
