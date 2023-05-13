-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 13. Mai 2023 um 22:38
-- Server-Version: 10.4.27-MariaDB
-- PHP-Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `thor`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `article`
--

CREATE TABLE `article` (
  `ArticleId` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `ArticleText` longtext DEFAULT NULL,
  `CreationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `HasCommentsEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `HasDateAuthorEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `Status` enum('draft','private','public','trash') NOT NULL DEFAULT 'draft',
  `IsBlog` tinyint(1) NOT NULL DEFAULT 0,
  `IsPage` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `articlecategory`
--

CREATE TABLE `articlecategory` (
  `ArticleId` int(11) NOT NULL,
  `CategoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `articletag`
--

CREATE TABLE `articletag` (
  `ArticleId` int(11) NOT NULL,
  `TagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `category`
--

CREATE TABLE `category` (
  `CategoryId` int(11) NOT NULL,
  `ParentId` int(11) DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `comment`
--

CREATE TABLE `comment` (
  `CommentId` int(11) NOT NULL,
  `ArticleId` int(11) NOT NULL,
  `UserId` varchar(255) NOT NULL,
  `AnswerOf` int(11) DEFAULT NULL,
  `CommentText` varchar(255) NOT NULL,
  `CreationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `Status` enum('new','released','trash','spam') NOT NULL DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `navmenu`
--

CREATE TABLE `navmenu` (
  `NavmenuId` int(11) NOT NULL,
  `ParentId` int(11) DEFAULT NULL,
  `Link` varchar(255) DEFAULT NULL,
  `NavmenuOrder` int(11) NOT NULL,
  `DisplayText` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `tag`
--

CREATE TABLE `tag` (
  `TagId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `article`
--
ALTER TABLE `article`
  ADD PRIMARY KEY (`ArticleId`),
  ADD UNIQUE KEY `title` (`Title`);

--
-- Indizes für die Tabelle `articlecategory`
--
ALTER TABLE `articlecategory`
  ADD PRIMARY KEY (`ArticleId`,`CategoryId`),
  ADD KEY `categoryId_category_const` (`CategoryId`),
  ADD KEY `articleId_category_const` (`ArticleId`);

--
-- Indizes für die Tabelle `articletag`
--
ALTER TABLE `articletag`
  ADD PRIMARY KEY (`ArticleId`,`TagId`),
  ADD KEY `tagid_tag_const` (`TagId`),
  ADD KEY `articleId_article_const` (`ArticleId`);

--
-- Indizes für die Tabelle `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CategoryId`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD KEY `parentId_const` (`ParentId`);

--
-- Indizes für die Tabelle `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`CommentId`),
  ADD KEY `articleId_comment_const` (`ArticleId`),
  ADD KEY `answerOf_comment_const` (`AnswerOf`);

--
-- Indizes für die Tabelle `navmenu`
--
ALTER TABLE `navmenu`
  ADD PRIMARY KEY (`NavmenuId`),
  ADD KEY `parentId_navmenu_const` (`ParentId`);

--
-- Indizes für die Tabelle `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`TagId`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `article`
--
ALTER TABLE `article`
  MODIFY `ArticleId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `category`
--
ALTER TABLE `category`
  MODIFY `CategoryId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `comment`
--
ALTER TABLE `comment`
  MODIFY `CommentId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `navmenu`
--
ALTER TABLE `navmenu`
  MODIFY `NavmenuId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `tag`
--
ALTER TABLE `tag`
  MODIFY `TagId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `articlecategory`
--
ALTER TABLE `articlecategory`
  ADD CONSTRAINT `articleId_category_const` FOREIGN KEY (`ArticleId`) REFERENCES `article` (`ArticleId`),
  ADD CONSTRAINT `categoryId_category_const` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`CategoryId`);

--
-- Constraints der Tabelle `articletag`
--
ALTER TABLE `articletag`
  ADD CONSTRAINT `articleId_article_const` FOREIGN KEY (`ArticleId`) REFERENCES `article` (`ArticleId`),
  ADD CONSTRAINT `tagid_tag_const` FOREIGN KEY (`TagId`) REFERENCES `tag` (`TagId`);

--
-- Constraints der Tabelle `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `parentId_const` FOREIGN KEY (`ParentId`) REFERENCES `category` (`CategoryId`);

--
-- Constraints der Tabelle `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `answerOf_comment_const` FOREIGN KEY (`AnswerOf`) REFERENCES `comment` (`CommentId`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `articleId_comment_const` FOREIGN KEY (`ArticleId`) REFERENCES `article` (`ArticleId`);

--
-- Constraints der Tabelle `navmenu`
--
ALTER TABLE `navmenu`
  ADD CONSTRAINT `parentId_navmenu_const` FOREIGN KEY (`ParentId`) REFERENCES `navmenu` (`NavmenuId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
