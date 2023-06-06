-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2023 at 04:08 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edu_connect`
--

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230604164938-create-siswas.js'),
('20230604181753-create-users.js');

-- --------------------------------------------------------

--
-- Table structure for table `siswas`
--

CREATE TABLE `siswas` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `birth_place` varchar(255) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `class_category` enum('Matematika','IPA','IPS','Bahasa','Bela Diri','Tari') DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `parents_name` varchar(255) DEFAULT NULL,
  `parents_contact` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `siswas`
--

INSERT INTO `siswas` (`id`, `email`, `fullname`, `birth_place`, `birth_date`, `class_category`, `address`, `phone`, `parents_name`, `parents_contact`, `createdAt`, `updatedAt`) VALUES
(20, 'matematika@class.com', 'Matematika', 'Matematika', '2023-06-06 00:00:00', 'Matematika', 'Matematika', '081234567890', 'Matematika', '081234567890', '2023-06-06 10:35:40', '2023-06-06 10:35:40'),
(21, 'ipa@class.com', 'Ilmu Pengeetahuan Alam', 'IPA', '2023-06-06 00:00:00', 'IPA', 'IPA', '081234567890', 'Ilmu Pengeetahuan Alam', '081234567890', '2023-06-06 10:36:59', '2023-06-06 10:36:59'),
(22, 'ips@class.com', 'Ilmu Pengetahuan Sosial', 'IPS', '2023-06-06 00:00:00', 'IPS', 'IPS', '081234567890', 'Ilmu Pengetahuan Sosial', '081234567890', '2023-06-06 10:37:57', '2023-06-06 10:37:57'),
(23, 'bahasa@class.com', 'Bahasa', 'Bahasa', '2023-06-06 00:00:00', 'Bahasa', 'Bahasa', '081234567890', 'Bahasa', '081234567890', '2023-06-06 10:38:46', '2023-06-06 10:38:46'),
(24, 'beladiri@class.com', 'Bela Diri', 'Bela Diri', '2023-06-06 00:00:00', 'Bela Diri', 'Bela Diri', '081234567890', 'Bela Diri', '081234567890', '2023-06-06 10:39:35', '2023-06-06 10:39:35'),
(25, 'tari@class.com', 'Tari', 'Tari', '2023-06-06 00:00:00', 'Tari', 'Tari', '081234567890', 'Tari', '081234567890', '2023-06-06 10:40:32', '2023-06-06 10:40:32');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('user','admin') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(7, 'admin@gmail.com', '$2b$12$STGD4ghrbcUF2Oolto.CBu8tZjpdD.XlvU1JpIIbjFpGuPs/K7OSi', 'admin', '2023-06-06 04:38:52', '2023-06-06 04:38:52'),
(20, 'matematika@class.com', '$2b$12$g.n8Xy5sex3hdxdIxizbw.7mZ6Go/KYHCrEv/MqhbJZ5wC7/nqFz.', 'user', '2023-06-06 10:35:40', '2023-06-06 10:35:40'),
(21, 'ipa@class.com', '$2b$12$ypjkVU8u.3B77Pws.Nj5Z.rbGr6q0ozr7zS80G70ti36jRDO6Leay', 'user', '2023-06-06 10:36:59', '2023-06-06 10:36:59'),
(22, 'ips@class.com', '$2b$12$9NKjFF8KheXlkA99Sz4z/eAjCNlNe7I0GQUqecFsSUUMEg7fjaGvC', 'user', '2023-06-06 10:37:57', '2023-06-06 10:37:57'),
(23, 'bahasa@class.com', '$2b$12$VwzyJYZoLxrgQNrLrpigq.6Cq1qBfsdmQtWeDBb/g6DqQFb2gdcle', 'user', '2023-06-06 10:38:46', '2023-06-06 10:38:46'),
(24, 'beladiri@class.com', '$2b$12$uwro18Qxi.gtGrd.48JSo.xL670cqzi.7xuJgXusxDLdIyGJjtBe2', 'user', '2023-06-06 10:39:35', '2023-06-06 10:39:35'),
(25, 'tari@class.com', '$2b$12$S7kUPTeCeIYN.kGVttZrCeUcTw6h/LsN661JFlJ6.KxZMBm1wl6uG', 'user', '2023-06-06 10:40:32', '2023-06-06 10:40:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `siswas`
--
ALTER TABLE `siswas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `siswas`
--
ALTER TABLE `siswas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
