-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 16 2024 г., 11:40
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `buildwatch`
--

-- --------------------------------------------------------

--
-- Структура таблицы `building_technical`
--

CREATE TABLE `building_technical` (
  `id` int(11) NOT NULL,
  `building_id` int(11) NOT NULL,
  `last_inspection_date` date DEFAULT NULL,
  `next_inspection_date` date DEFAULT NULL,
  `condition_` varchar(50) DEFAULT NULL,
  `technical_issues` text DEFAULT NULL,
  `maintenance_records` text DEFAULT NULL,
  `repair_history` text DEFAULT NULL,
  `critical_issues` text DEFAULT NULL,
  `last_renovation_date` date DEFAULT NULL,
  `next_renovation_planned` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `building_technical`
--

INSERT INTO `building_technical` (`id`, `building_id`, `last_inspection_date`, `next_inspection_date`, `condition_`, `technical_issues`, `maintenance_records`, `repair_history`, `critical_issues`, `last_renovation_date`, `next_renovation_planned`) VALUES
(2, 1, '2023-05-15', '2024-05-15', 'Good', 'Roof leak, Facade damage', 'Roof repair in 2022, facade restoration in 2023', '2021-Window replacement, 2022-Facade repair', 'No', '2021-11-01', '2025-11-01');

-- --------------------------------------------------------

--
-- Структура таблицы `objects`
--

CREATE TABLE `objects` (
  `id` int(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `point` varchar(255) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `messages` varchar(255) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `objects`
--

INSERT INTO `objects` (`id`, `name`, `point`, `start_date`, `end_date`, `description`, `messages`) VALUES
(2, 'Bauman Street', '55.78844, 49.11977', '2024-01-01', '2024-12-31', 'Bauman Street is the main pedestrian street in Kazan, lined with shops, cafes, and historical buildings.', 'Crowded on weekends'),
(3, 'Kul Sharif Mosque', '55.79851, 49.10524', '2024-01-01', '2024-12-31', 'The Kul Sharif Mosque is one of the largest mosques in Russia, located inside the Kazan Kremlin.', 'Visitors can participate in guided tours'),
(1, 'Kazan Kremlin', '55.7996, 49.1063', '2024-01-01', '2024-12-31', 'The Kazan Kremlin is a historic citadel located in the center of Kazan, the capital of Tatarstan. It is a UNESCO World Heritage site.', 'No messages'),
(5, 'Kazan Family Center', '55.8127, 49.1086', '2024-01-01', '2024-12-31', 'The Kazan Family Center is a modern architectural landmark designed in the shape of a wedding ring, symbolizing family unity.', 'A popular spot for weddings and family photos');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `registration_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` enum('user','admin') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `registration_date`, `role`) VALUES
(1, 'yue', 'yue@gmail.com', '$2y$10$HBdPHuevkzqAkd7tQaYnZ.Vq.KXFGuXtDZz/7t6UpgHoFEFyujFHO', '2024-12-09 02:55:56', 'user');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `building_technical`
--
ALTER TABLE `building_technical`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_building_id` (`building_id`);

--
-- Индексы таблицы `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `building_technical`
--
ALTER TABLE `building_technical`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `objects`
--
ALTER TABLE `objects`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `building_technical`
--
ALTER TABLE `building_technical`
  ADD CONSTRAINT `fk_building_id` FOREIGN KEY (`building_id`) REFERENCES `objects` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
