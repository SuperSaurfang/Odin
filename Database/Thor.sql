-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 26. Jan 2022 um 16:49
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
  `CreationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `ModificationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `HasCommentsEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `HasDateAuthorEnabled` tinyint(1) NOT NULL DEFAULT 1,
  `Status` enum('draft','private','public','trash') NOT NULL DEFAULT 'draft',
  `IsBlog` tinyint(1) NOT NULL DEFAULT 0,
  `IsPage` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ArticleCategory`
--

CREATE TABLE `ArticleCategory` (
  `ArticleId` int(11) NOT NULL,
  `CategoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `ArticleTag`
--

CREATE TABLE `ArticleTag` (
  `ArticleId` int(11) NOT NULL,
  `TagId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Category`
--

CREATE TABLE `Category` (
  `CategoryId` int(11) NOT NULL,
  `ParentId` int(11) DEFAULT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
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
  `CreationDate` datetime NOT NULL DEFAULT current_timestamp(),
  `Status` enum('new','released','trash','spam') NOT NULL DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Navmenu`
--

CREATE TABLE `Navmenu` (
  `NavmenuId` int(11) NOT NULL,
  `PageId` int(11) DEFAULT NULL,
  `CategoryId` int(11) DEFAULT NULL,
  `ParentId` int(11) DEFAULT NULL,
  `NavmenuType` enum('article','category') NOT NULL DEFAULT 'article',
  `NavmenuOrder` int(11) NOT NULL,
  `DisplayText` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `Tag`
--

CREATE TABLE `Tag` (
  `TagId` int(11) NOT NULL,
  `Name` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
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
-- Indizes für die Tabelle `ArticleCategory`
--
ALTER TABLE `ArticleCategory`
  ADD PRIMARY KEY (`ArticleId`,`CategoryId`),
  ADD KEY `categoryId_category_const` (`CategoryId`),
  ADD KEY `articleId_category_const` (`ArticleId`);

--
-- Indizes für die Tabelle `ArticleTag`
--
ALTER TABLE `ArticleTag`
  ADD PRIMARY KEY (`ArticleId`,`TagId`),
  ADD KEY `tagid_tag_const` (`TagId`),
  ADD KEY `articleId_article_const` (`ArticleId`);

--
-- Indizes für die Tabelle `Category`
--
ALTER TABLE `Category`
  ADD PRIMARY KEY (`CategoryId`),
  ADD UNIQUE KEY `Name` (`Name`),
  ADD KEY `parentId_const` (`ParentId`);

--
-- Indizes für die Tabelle `Comment`
--
ALTER TABLE `Comment`
  ADD PRIMARY KEY (`CommentId`),
  ADD KEY `articleId_comment_const` (`ArticleId`),
  ADD KEY `answerOf_comment_const` (`AnswerOf`);

--
-- Indizes für die Tabelle `Navmenu`
--
ALTER TABLE `Navmenu`
  ADD PRIMARY KEY (`NavmenuId`),
  ADD UNIQUE KEY `NavMenuOrder` (`NavmenuOrder`),
  ADD KEY `articleId_navmenu_const` (`PageId`),
  ADD KEY `parentId_navmenu_const` (`ParentId`),
  ADD KEY `category_navmenu_const` (`CategoryId`);

--
-- Indizes für die Tabelle `Tag`
--
ALTER TABLE `Tag`
  ADD PRIMARY KEY (`TagId`),
  ADD UNIQUE KEY `Name` (`Name`);

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
  MODIFY `NavmenuId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `Tag`
--
ALTER TABLE `Tag`
  MODIFY `TagId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `ArticleCategory`
--
ALTER TABLE `ArticleCategory`
  ADD CONSTRAINT `articleId_category_const` FOREIGN KEY (`ArticleId`) REFERENCES `Article` (`ArticleId`),
  ADD CONSTRAINT `categoryId_category_const` FOREIGN KEY (`CategoryId`) REFERENCES `Category` (`CategoryId`);

--
-- Constraints der Tabelle `ArticleTag`
--
ALTER TABLE `ArticleTag`
  ADD CONSTRAINT `articleId_article_const` FOREIGN KEY (`ArticleId`) REFERENCES `Article` (`ArticleId`),
  ADD CONSTRAINT `tagid_tag_const` FOREIGN KEY (`TagId`) REFERENCES `Tag` (`TagId`);

--
-- Constraints der Tabelle `Category`
--
ALTER TABLE `Category`
  ADD CONSTRAINT `parentId_const` FOREIGN KEY (`ParentId`) REFERENCES `Category` (`CategoryId`);

--
-- Constraints der Tabelle `Comment`
--
ALTER TABLE `Comment`
  ADD CONSTRAINT `answerOf_comment_const` FOREIGN KEY (`AnswerOf`) REFERENCES `Comment` (`CommentId`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `articleId_comment_const` FOREIGN KEY (`ArticleId`) REFERENCES `Article` (`ArticleId`);

--
-- Constraints der Tabelle `Navmenu`
--
ALTER TABLE `Navmenu`
  ADD CONSTRAINT `articleId_navmenu_const` FOREIGN KEY (`PageId`) REFERENCES `Article` (`ArticleId`),
  ADD CONSTRAINT `category_navmenu_const` FOREIGN KEY (`CategoryId`) REFERENCES `Category` (`CategoryId`),
  ADD CONSTRAINT `parentId_navmenu_const` FOREIGN KEY (`ParentId`) REFERENCES `Navmenu` (`NavMenuId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
