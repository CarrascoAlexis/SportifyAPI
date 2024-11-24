-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 24 nov. 2024 à 17:36
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `sportify`
--

-- --------------------------------------------------------

--
-- Structure de la table `event`
--

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

--
-- Déchargement des données de la table `event`
--

INSERT INTO `event` (`id`, `title`, `description`, `isVisible`, `submitDate`, `startDate`, `endDate`, `authorId`) VALUES
(73, 'test', 'test', 1, '2024-11-22 21:27:59', '2024-11-22 22:27:00', '2024-11-22 21:31:00', 55),
(74, 'test2', 'test2', 1, '2024-11-22 21:32:57', '2024-11-22 02:32:00', '2024-12-06 21:38:00', 55);

-- --------------------------------------------------------

--
-- Structure de la table `eventpicture`
--

CREATE TABLE `eventpicture` (
  `id` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `fileName` varchar(355) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `eventpicture`
--

INSERT INTO `eventpicture` (`id`, `eventId`, `fileName`) VALUES
(14, 73, '1732307279740-event-zlan.jpg'),
(15, 74, '1732307577624-event-zlan.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `participation`
--

CREATE TABLE `participation` (
  `id` int(11) NOT NULL,
  `accountId` int(11) NOT NULL,
  `eventId` int(11) NOT NULL,
  `score` int(11) NOT NULL DEFAULT -1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `participation`
--

INSERT INTO `participation` (`id`, `accountId`, `eventId`, `score`) VALUES
(10, 56, 73, 0);

-- --------------------------------------------------------

--
-- Structure de la table `session`
--

CREATE TABLE `session` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `token` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `session`
--

INSERT INTO `session` (`id`, `userId`, `token`) VALUES
(124, 56, '5b38be4156eb5dd82beed392173151b4903990a13d51ae7bd5f7874c258c2ed3bda41f9d436e56dd17d56208913ea036'),
(125, 55, '214f19425ab805bd181d69795f1d71b3fecf3723ec4cfbb624dc9628400f84c079cfc13b87d857365c2e400b19033c93');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nickname` varchar(32) NOT NULL,
  `isEmploye` tinyint(1) NOT NULL DEFAULT 0,
  `mail` varchar(64) NOT NULL,
  `pass` text NOT NULL,
  `profile` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `nickname`, `isEmploye`, `mail`, `pass`, `profile`) VALUES
(55, 'asas', 1, '', '*CFA9B2920D182DD9D72C260E31B16207C021FFD0', '1732305158915-event-zlan.jpg'),
(56, 'caca', 0, '', '*AC864D5A5E9DDBD8370332085E876ADC905E9919', '1732307870696-images.jpg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `eventpicture`
--
ALTER TABLE `eventpicture`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_eventpicture_event_id` (`eventId`);

--
-- Index pour la table `participation`
--
ALTER TABLE `participation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_participation_user_id` (`accountId`),
  ADD KEY `fk_participation_event_id` (`eventId`);

--
-- Index pour la table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_session_user_id` (`userId`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT pour la table `eventpicture`
--
ALTER TABLE `eventpicture`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `participation`
--
ALTER TABLE `participation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `session`
--
ALTER TABLE `session`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `eventpicture`
--
ALTER TABLE `eventpicture`
  ADD CONSTRAINT `fk_eventpicture_event_id` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`);

--
-- Contraintes pour la table `participation`
--
ALTER TABLE `participation`
  ADD CONSTRAINT `fk_participation_event_id` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`),
  ADD CONSTRAINT `fk_participation_user_id` FOREIGN KEY (`accountId`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `fk_session_user_id` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
