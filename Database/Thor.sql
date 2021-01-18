-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 18. Jan 2021 um 13:53
-- Server-Version: 10.4.13-MariaDB
-- PHP-Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `Thor`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Article`
--

CREATE TABLE `Article` (
  `ArticleId` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `ArticleText` longtext DEFAULT NULL,
  `CreationDate` date NOT NULL,
  `ModificationDate` date NOT NULL,
  `HasCommentsEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `HasDateAuthorEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `Status` enum('draft','private','public','trash') NOT NULL DEFAULT 'draft',
  `IsBlog` tinyint(1) NOT NULL DEFAULT 0,
  `IsPage` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Category`
--

CREATE TABLE `Category` (
  `CategoryId` int(11) NOT NULL,
  `ParentId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `CategoryType` enum('category','tag') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Comment`
--

CREATE TABLE `Comment` (
  `CommentId` int(11) NOT NULL,
  `ArticleId` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `AnswerOf` int(11) DEFAULT NULL,
  `CommentText` varchar(255) NOT NULL,
  `CreationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `Status` enum('new','released','deleted','spam') NOT NULL DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Navmenu`
--

CREATE TABLE `Navmenu` (
  `NavMenuId` int(11) NOT NULL,
  `PageId` int(11) NOT NULL,
  `ParentId` int(11) DEFAULT NULL,
  `NavMenuOrder` int(11) NOT NULL,
  `DisplayText` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `Article`
--
ALTER TABLE `Article`
  ADD PRIMARY KEY (`ArticleId`),
  ADD UNIQUE KEY `title` (`Title`);

--
-- Indizes für die Tabelle `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`CategoryId`);

--
-- Indizes für die Tabelle `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`CommentId`),
  ADD KEY `article_const` (`ArticleId`),
  ADD KEY `answer_const` (`AnswerOf`);

--
-- Indizes für die Tabelle `Navmenu`
--
ALTER TABLE `Navmenu`
  ADD PRIMARY KEY (`NavMenuId`),
  ADD UNIQUE KEY `NavMenuOrder` (`NavMenuOrder`),
  ADD KEY `parent_const` (`ParentId`),
  ADD KEY `page_const` (`PageId`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `Article`
--
ALTER TABLE `Article`
  MODIFY `ArticleId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Category`
--
ALTER TABLE `Category`
  MODIFY `CategoryId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Comment`
--
ALTER TABLE `Comment`
  MODIFY `CommentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Navmenu`
--
ALTER TABLE `Navmenu`
  MODIFY `NavMenuId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `answer_const` FOREIGN KEY (`AnswerOf`) REFERENCES `Comment` (`CommentId`),
  ADD CONSTRAINT `article_const` FOREIGN KEY (`ArticleId`) REFERENCES `Article` (`ArticleId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
