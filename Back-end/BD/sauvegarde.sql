-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 04 juin 2022 à 06:24
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomaniadb`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `isAdmin`) VALUES
(8, 'Mr.Admin', 'Groupomania', 'admin.groupomania@hotmail.com', '$2b$10$fkyn.N8bzTdDOogA0CM/M.gnS1bnfPN2SzePk6s3jwwWrct6ipClC', 1),
(12, 'Theo', 'Hanique', 'Theo.hanique@hotmail.com', '$2b$10$yqd4iA9HzxZCTu84RQrhrurSPgy.JYZ2O3U1qkBjOPFmY2Lr1fpvm', 0),
(13, 'Louis', 'Kauf', 'test123@live.fr', '$2b$10$Aw3Q5j3TJfD6m/F98Wi3yu6oSg.v7EhQSmv4VaAFBi79v0xvfZuIW', 0);

-- --------------------------------------------------------

--
-- Structure de la table `usersdisliked`
--

CREATE TABLE `usersdisliked` (
  `postId` int(11) NOT NULL,
  `usersId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `usersdisliked`
--

INSERT INTO `usersdisliked` (`postId`, `usersId`) VALUES
(31, 13);

-- --------------------------------------------------------

--
-- Structure de la table `usersliked`
--

CREATE TABLE `usersliked` (
  `postId` int(11) NOT NULL,
  `usersId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `usersliked`
--

INSERT INTO `usersliked` (`postId`, `usersId`) VALUES
(34, 12),
(31, 12),
(19, 13),
(31, 8);

-- --------------------------------------------------------

--
-- Structure de la table `userspost`
--

CREATE TABLE `userspost` (
  `id` int(11) NOT NULL,
  `userName` varchar(30) NOT NULL,
  `title` varchar(45) NOT NULL,
  `image` varchar(80) NOT NULL,
  `likes` int(11) NOT NULL,
  `dislikes` int(11) NOT NULL,
  `date` bigint(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Post des utilisateurs';

--
-- Déchargement des données de la table `userspost`
--

INSERT INTO `userspost` (`id`, `userName`, `title`, `image`, `likes`, `dislikes`, `date`, `userId`) VALUES
(31, 'Theo', 'Eheh c\'est moi !', 'http://localhost:5001/images/aAGmv4Z_460swp.webp1654308302958.webp', 2, 1, 1654305117548, 12),
(34, 'Mr.Admin', 'Ce que dit réellement le BSOD.', 'http://localhost:5001/images/aRry1N2_460swp.webp1654306547341.webp', 1, 0, 1654305132020, 8),
(37, 'Louis', 'Il fait chaud non ?', 'http://localhost:5001/images/giphy.gif1653937180341.gif', 0, 0, 1654305060646, 13);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `userspost`
--
ALTER TABLE `userspost`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `userspost`
--
ALTER TABLE `userspost`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
