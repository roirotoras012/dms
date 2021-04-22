-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2021 at 03:36 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dms`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit`
--

CREATE TABLE `audit` (
  `audit_id` int(11) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `dpm` int(11) NOT NULL,
  `link` varchar(50) DEFAULT NULL,
  `auditor` int(11) NOT NULL,
  `auditee` int(11) NOT NULL,
  `auditplan` int(20) NOT NULL,
  `isShared` tinyint(1) NOT NULL,
  `done` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `audit`
--

INSERT INTO `audit` (`audit_id`, `startTime`, `endTime`, `dpm`, `link`, `auditor`, `auditee`, `auditplan`, `isShared`, `done`) VALUES
(203, '2021-04-22 06:19:00', '2021-04-21 22:19:15', 16, 'asdasdasdasd', 259, 123, 53, 1, 0),
(204, '2021-04-22 06:19:00', '2021-04-21 22:19:16', 11, 'asdasdasdasd', 259, 123, 53, 1, 0),
(205, '2021-04-22 06:19:00', '2021-04-21 22:19:18', 6, 'asdasdasdasd', 259, 123, 53, 1, 0),
(206, '2021-04-22 06:21:00', '2021-04-21 22:40:27', 6, 'asdasdasd', 259, 123, 54, 1, 1),
(207, '2021-04-22 06:21:00', '2021-04-21 22:42:55', 11, 'asdasdasd', 259, 123, 54, 1, 1),
(208, '2021-04-22 06:21:00', '2021-04-21 22:41:30', 16, 'asdasdasd', 259, 123, 54, 1, 1),
(209, '2021-04-22 06:28:00', '2021-04-21 23:12:09', 36, 'asdasdasd', 266, 123, 54, 1, 1),
(210, '2021-04-22 06:28:00', '2021-04-21 23:12:10', 26, 'asdasdasd', 266, 123, 54, 1, 1),
(211, '2021-04-22 06:28:00', '2021-04-21 23:12:34', 31, 'asdasdasd', 266, 123, 54, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `audit_plan`
--

CREATE TABLE `audit_plan` (
  `audit_plan_id` int(11) NOT NULL,
  `date_generated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `done` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `audit_plan`
--

INSERT INTO `audit_plan` (`audit_plan_id`, `date_generated`, `done`) VALUES
(53, '2021-04-22 06:19:50', 1),
(54, '2021-04-22 07:12:44', 1),
(55, '2021-04-22 07:12:44', 0);

-- --------------------------------------------------------

--
-- Table structure for table `branch_document`
--

CREATE TABLE `branch_document` (
  `branch_document_id` int(11) NOT NULL,
  `branch_document_type` varchar(50) NOT NULL,
  `branch_document_filename` varchar(200) NOT NULL,
  `branch_document_filetype` varchar(50) NOT NULL,
  `branch_document_date_uploaded` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `branch_document_user` int(11) NOT NULL,
  `branch_document_main` int(11) NOT NULL,
  `branch_document_directory` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `branch_document`
--

INSERT INTO `branch_document` (`branch_document_id`, `branch_document_type`, `branch_document_filename`, `branch_document_filetype`, `branch_document_date_uploaded`, `branch_document_user`, `branch_document_main`, `branch_document_directory`) VALUES
(155, 'dpm', 'career.jpg', 'image/jpeg', '2021-04-22 08:39:04', 260, 282, 'uploads/branches/282');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `doc_id` int(11) NOT NULL,
  `doc_type` varchar(50) DEFAULT NULL,
  `filename` varchar(100) NOT NULL,
  `file_type` varchar(50) NOT NULL,
  `date_uploaded` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `user` int(11) DEFAULT NULL,
  `directory` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`doc_id`, `doc_type`, `filename`, `file_type`, `date_uploaded`, `user`, `directory`) VALUES
(282, 'dpm', 'CARDENAS-ECON-ASSIGNMENT.docx', 'application/vnd.openxmlformats-officedocument.word', '2021-04-22 08:39:04', 260, 'uploads/CITC/DPM-USTP-ACAD-01 CITC'),
(283, 'evidence', 'RIPH PROPOSAL.docx', 'application/vnd.openxmlformats-officedocument.word', '2021-04-22 06:21:31', 260, 'uploads/CITC/DPM-USTP-ACAD-01 CITC'),
(284, 'evidence', 'defense.txt', 'text/plain', '2021-04-22 06:21:35', 260, 'uploads/CITC/DPM-USTP-ACAD-01 CITC'),
(285, 'dpm', 'CARDENAS-ECON-ASSIGNMENT.docx', 'application/vnd.openxmlformats-officedocument.word', '2021-04-22 06:21:25', 259, 'uploads/auditor/clintdelio/Working DPM/DPM-USTP-ACAD-01 CITC'),
(286, 'evidence', 'RIPH PROPOSAL.docx', 'application/vnd.openxmlformats-officedocument.word', '2021-04-22 06:21:31', 259, 'uploads/auditor/clintdelio/Working DPM/DPM-USTP-ACAD-01 CITC'),
(287, 'evidence', 'defense.txt', 'text/plain', '2021-04-22 06:21:35', 259, 'uploads/auditor/clintdelio/Working DPM/DPM-USTP-ACAD-01 CITC'),
(288, NULL, 'CARDENAS-ECON-ASSIGNMENT.docx', 'application/vnd.openxmlformats-officedocument.word', '2021-04-22 08:06:04', 266, 'uploads/auditor/auditor/AUDIT CHECKLISTS');

-- --------------------------------------------------------

--
-- Table structure for table `dpm`
--

CREATE TABLE `dpm` (
  `dpm_id` int(20) NOT NULL,
  `dpm_title` varchar(50) NOT NULL,
  `usertype` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dpm`
--

INSERT INTO `dpm` (`dpm_id`, `dpm_title`, `usertype`) VALUES
(2, 'Top Management–Context of the Organization', 122),
(6, 'DPM-USTP-ACAD-01 CITC', 123),
(7, 'DPM-USTP-ACAD-01 CT', 124),
(8, 'DPM-USTP-ACAD-01 CSM', 125),
(9, 'DPM-USTP-ACAD-01 CEA', 126),
(10, 'DPM-USTP-ACAD-01 CSTE', 127),
(11, 'DPM-USTP-ACAD-02 CITC', 123),
(12, 'DPM-USTP-ACAD-02 CT', 124),
(13, 'DPM-USTP-ACAD-02 CSM', 125),
(14, 'DPM-USTP-ACAD-02 CEA', 126),
(15, 'DPM-USTP-ACAD-02 CSTE', 127),
(16, 'DPM-USTP-ACAD-03 CITC', 123),
(17, 'DPM-USTP-ACAD-03 CT', 124),
(18, 'DPM-USTP-ACAD-03 CSM', 125),
(19, 'DPM-USTP-ACAD-03 CEA', 126),
(20, 'DPM-USTP-ACAD-03 CSTE', 127),
(21, 'DPM-USTP-ACAD-4 CITC', 123),
(22, 'DPM-USTP-ACAD-4 CT', 124),
(23, 'DPM-USTP-ACAD-4 CSM', 125),
(24, 'DPM-USTP-ACAD-4 CEA', 126),
(25, 'DPM-USTP-ACAD-4 CSTE', 127),
(26, 'DPM –USTP-ACAD-05 CITC', 123),
(27, 'DPM –USTP-ACAD-05 CT', 124),
(28, 'DPM –USTP-ACAD-05 CSM', 125),
(29, 'DPM –USTP-ACAD-05 CEA', 126),
(30, 'DPM –USTP-ACAD-05 CSTE', 127),
(31, 'DPM –USTP-ACAD-06 CITC', 123),
(32, 'DPM –USTP-ACAD-06 CT', 124),
(33, 'DPM –USTP-ACAD-06 CSM', 125),
(34, 'DPM –USTP-ACAD-06 CEA', 126),
(35, 'DPM –USTP-ACAD-06 CSTE', 127),
(36, 'DPM-USTP-ACAD-07 CITC', 123),
(37, 'DPM-USTP-ACAD-07 CT', 124),
(38, 'DPM-USTP-ACAD-07 CSM', 125),
(39, 'DPM-USTP-ACAD-07 CEA', 126),
(40, 'DPM-USTP-ACAD-07 CSTE', 127),
(41, 'DPM-USTP-ACAD-08 CITC', 123),
(42, 'DPM-USTP-ACAD-08 CT', 124),
(43, 'DPM-USTP-ACAD-08 CSM', 125),
(44, 'DPM-USTP-ACAD-08 CEA', 126),
(45, 'DPM-USTP-ACAD-08 CSTE', 127),
(46, 'DPM-USTP-ACAD -09 CITC', 123),
(47, 'DPM-USTP-ACAD -09 CT', 124),
(48, 'DPM-USTP-ACAD -09 CSM', 125),
(49, 'DPM-USTP-ACAD -09 CEA', 126),
(50, 'DPM-USTP-ACAD -09 CSTE', 127),
(51, 'DPM –USTP-ACAD-10 CITC', 123),
(52, 'DPM –USTP-ACAD-10 CT', 124),
(53, 'DPM –USTP-ACAD-10 CSM', 125),
(54, 'DPM –USTP-ACAD-10 CEA', 126),
(55, 'DPM –USTP-ACAD-10 CSTE', 127),
(56, 'DPM –USTP-ACAD-11 CITC', 123),
(57, 'DPM –USTP-ACAD-11 CT', 124),
(58, 'DPM –USTP-ACAD-11 CSM', 125),
(59, 'DPM –USTP-ACAD-11 CEA', 126),
(60, 'DPM –USTP-ACAD-11 CSTE', 127),
(61, 'DPM –USTP-ACAD-12 CITC', 123),
(62, 'DPM –USTP-ACAD-12 CT', 124),
(63, 'DPM –USTP-ACAD-12 CSM', 125),
(64, 'DPM –USTP-ACAD-12 CEA', 126),
(65, 'DPM –USTP-ACAD-12 CSTE', 127),
(66, 'DPM-USTP-ASO-001', 128),
(67, 'DPM-USTP-ASO-002', 128),
(68, 'DPM-USTP-ASO-003', 128),
(69, 'DPM-USTP-ASO-004', 128),
(70, 'DPM-USTP-ASO-005', 128),
(71, 'DPM-USTP-ASO-006', 128),
(72, 'DPM-USTP-ASO-007', 128),
(73, 'DPM-USTP-ASO-008', 128),
(74, 'DPM-USTP-ASO-009', 128),
(75, 'DPM-USTP-OSA-001', 129),
(76, 'DPM-USTP-OSA -002', 129),
(77, 'DPM-USTP-OSA -003', 129),
(78, 'DPM-USTP-OSA -004', 129),
(79, 'DPM-USTP-OSA -005', 129),
(80, 'DPM-USTP-OSA -006', 129),
(81, 'DPM-USTP-OSA -007', 129),
(82, 'DPM-USTP-OSA -008', 129),
(83, 'DPM-USTP-OSA -009', 129),
(84, 'DPM-USTP-OSA -010', 129),
(85, 'DPM-USTP-OSA -011', 129),
(86, 'DPM-USTP-OSA -012', 129),
(87, 'DPM-USTP-OSA -013', 129),
(88, 'DPM-USTP-OSA -014', 129),
(89, 'DPM-USTP-OSA -015', 129),
(90, 'DPM-USTP-OSA -016', 129),
(91, 'DPM-USTP-LIB -001', 130),
(92, 'DPM-USTP-LIB -002', 130),
(93, 'DPM-USTP-LIB -003', 130),
(94, 'DPM-USTP-LIB -004', 130),
(95, 'DPM-USTP-LIB -005', 130),
(96, 'DPM-USTP-LIB -006', 130),
(97, 'DPM-USTP-LIB -007', 130),
(98, 'DPM-USTP-LIB -008', 130),
(99, 'DPM-USTP-LIB -009', 130),
(100, 'DPM-USTP-LIB -010', 130),
(101, 'DPM-USTP-RGTR-001', 131),
(102, 'DPM-USTP-RGTR-002', 131),
(103, 'DPM-USTP-RGTR-003', 131),
(104, 'DPM-USTP-RGTR-004', 131),
(105, 'DPM-USTP-RGTR-005', 131),
(106, 'DPM-USTP-RGTR-006', 131),
(107, 'DPM-USTP-RGTR-007', 131),
(108, 'DPM-USTP-RGTR-008', 131),
(109, 'DPM-USTP-RGTR-009', 131),
(110, 'DPM-USTP-RGTR-010', 131),
(111, 'DPM-USTP-RGTR-011', 131),
(112, 'DPM-USTP-RGTR-012', 131),
(113, 'DPM-USTP-RGTR-013', 131),
(114, 'DPM-USTP-RGTR-014', 131),
(115, 'DPM-USTP-RGTR-015', 131),
(116, 'DPM-USTP-RGTR-016', 131),
(117, 'DPM-USTP-RGTR-017', 131),
(118, 'DPM-USTP-RGTR-018', 131),
(119, 'DPM-USTP-IMT-001', 132),
(120, 'DPM-USTP-IMT-002', 132),
(121, 'DPM-USTP-IMT-003', 132),
(122, 'DPM-USTP-IMT-004', 132),
(123, 'DPM-USTP-IMT-005', 132),
(124, 'SCP-USTP-001 (System) Top Management', 133),
(125, 'SCP-USTP-002 (System & CDO) Top Management', 133),
(126, 'SCP-USTP-003 (System) Top Management', 133),
(127, 'SCP-USTP-004 (CDO) Top Management', 133),
(128, 'SCP-USTP-005 (System) Top Management', 133),
(129, 'SCP-USTP-006 (CDO) Top Management', 133),
(130, 'SCP-USTP-008 (System) Top Management', 133),
(131, 'SCP-USTP-009 (System) Top Management', 133),
(133, 'SCP-USTP-001 (System) QML', 134),
(134, 'SCP-USTP-002 (System & CDO) QML', 134),
(135, 'SCP-USTP-003 (System) QML', 134),
(136, 'SCP-USTP-004 (CDO) QML', 134),
(137, 'SCP-USTP-005 (System) QML', 134),
(138, 'SCP-USTP-006 (CDO) QML', 134),
(139, 'SCP-USTP-008 (System) QML', 134),
(140, 'SCP-USTP-009 (System) QML', 134),
(142, 'SCP-USTP-001 (System) Deputy QMLL', 135),
(143, 'SCP-USTP-002 (System & CDO) Deputy QMLL', 135),
(144, 'SCP-USTP-003 (System) Deputy QMLL', 135),
(145, 'SCP-USTP-004 (CDO) Deputy QMLL', 135),
(146, 'SCP-USTP-005 (System) Deputy QMLL', 135),
(147, 'SCP-USTP-006 (CDO) Deputy QMLL', 135),
(148, 'SCP-USTP-008 (System) Deputy QMLL', 135),
(149, 'SCP-USTP-009 (System) Deputy QMLL', 135),
(151, 'SCP-USTP-001 (System) ISO Core Team', 136),
(152, 'SCP-USTP-002 (System & CDO) ISO Core Team', 136),
(153, 'SCP-USTP-003 (System) ISO Core Team', 136),
(154, 'SCP-USTP-004 (CDO) ISO Core Team', 136),
(155, 'SCP-USTP-005 (System) ISO Core Team', 136),
(156, 'SCP-USTP-006 (CDO) ISO Core Team', 136),
(157, 'SCP-USTP-008 (System) ISO Core Team', 136),
(158, 'SCP-USTP-009 (System) ISO Core Team', 136),
(160, 'SCP-USTP-001 (System) CRS', 137),
(161, 'SCP-USTP-002 (System & CDO) CRS', 137),
(162, 'SCP-USTP-003 (System) CRS', 137),
(163, 'SCP-USTP-004 (CDO) CRS', 137),
(164, 'SCP-USTP-005 (System) CRS', 137),
(165, 'SCP-USTP-006 (CDO) CRS', 137),
(166, 'SCP-USTP-008 (System) CRS', 137),
(167, 'SCP-USTP-009 (System) CRS', 137),
(169, 'SCP-USTP-007 (CDO)', 138),
(170, 'DPM-USTP-HS-001 (System & CDO)', 139),
(171, 'DPM-USTP-HS-002(System & CDO)', 139),
(172, 'DPM-USTP-HS-003(System & CDO)', 139),
(173, 'DPM-USTP-HS-004 (System & CDO)', 139),
(174, 'DPM-USTP-HS-005(System & CDO)', 139),
(175, 'DPM-USTP-HS-006 (System & CDO)', 139),
(176, 'DPM-USTP-HS-007 (CDO)', 139),
(177, 'DPM-USTP-HS-008 (CDO)', 139),
(178, 'DPM-USTP-HS-009(System & CDO)', 139),
(179, 'DPM-USTP-HS-0010(System & CDO)', 139),
(180, 'DPM-USTP-HS-0011(System & CDO)', 139),
(181, 'DPM-USTP-HS-0012(System & CDO)', 139),
(182, 'DPM-USTP-HS-0013(System & CDO)', 139),
(183, 'DPM-USTP-HS-0014(System & CDO)', 139),
(184, 'DPM-USTP-HS-0015(System & CDO)', 139),
(185, 'DPM-USTP-HS-0016(System & CDO)', 139),
(186, 'DPM-USTP-HS-0017(System & CDO)', 139),
(187, 'DPM-USTP-HS-0018(System & CDO)', 139),
(188, 'DPM-USTP-HS-0019(System & CDO)', 139),
(189, 'DPM-USTP-AcS-001', 140),
(190, 'DPM-USTP-AcS-002', 140),
(191, 'DPM-USTP-AcS-003', 140),
(192, 'DPM-USTP-AcS-004', 140),
(193, 'DPM-USTP-AcS-005', 140),
(194, 'DPM-USTP-AcS-005', 140),
(195, 'DPM-USTP-AcS-007', 140),
(196, 'DPM-USTP-AcS-008', 140),
(197, 'DPM-USTP-AcS-009', 140),
(198, 'DPM-USTP-AcS-010', 140),
(199, 'DPM-USTP-AcS-011', 140),
(200, 'DPM-USTP-AcS-012', 140),
(201, 'DPM-USTP-BS-001', 140),
(202, 'DPM-USTP-PU-001', 141),
(203, 'DPM-USTP-PU-002', 141),
(204, 'DPM-USTP-PU-003', 141),
(205, 'DPM-USTP-PU-004', 141),
(206, 'DPM-USTP-PU-005', 141),
(207, 'DPM-USTP-PU-006', 141),
(208, 'DPM-USTP-PU-007', 141),
(209, 'DPM-USTP-PU-008', 141),
(210, 'DPM-USTP-PU-009', 141),
(211, 'DPM-USTP-PU-010', 141),
(212, 'DPM-USTP-PU-011', 141),
(213, 'DPM-USTP-PU-012', 141),
(214, 'DPM-USTP-PU-013', 141),
(215, 'DPM-USTP-PU-014', 141),
(216, 'DPM-USTP-PU-015', 141),
(217, 'DPM-USTP-PU-016', 141),
(218, 'DPM-USTP-HS-001', 142),
(219, 'DPM-USTP-HS-002', 142),
(220, 'DPM-USTP-HS-003', 142),
(221, 'DPM-USTP-HS-004', 142),
(222, 'DPM-USTP-HS-005', 142),
(223, 'DPM-USTP-HS-006', 142),
(224, 'DPM-USTP-HS-007', 142),
(225, 'DPM-USTP-HS-008', 142),
(226, 'DPM-USTP-HS- 001 (Dental)', 142),
(227, 'DPM-USTP-CU-001', 143),
(228, 'DPM-USTP-CU-002', 143),
(229, 'DPM-USTP-CU-003', 143),
(230, 'DPM-USTP-CU-004', 143),
(231, 'DPM-USTP-CU-005', 143),
(232, 'DPM-USTP-CU-006', 143),
(233, 'DPM-USTP-CSSU-001', 144),
(234, 'DPM-USTP-CSSU-002', 144),
(235, 'DPM-USTP-CSSU-003', 144),
(236, 'DPM-USTP-ArCU-001', 145),
(237, 'DPM-USTP-ArCU-002', 145),
(238, 'DPM-USTP-ArCU-003', 145),
(239, 'DPM-USTP-CCIR-001', 146),
(240, 'DPM-USTP-CCIR-002', 146),
(241, 'DPM-USTP-CCIR-003', 146),
(242, 'DPM-USTP-CCIR-004', 146),
(243, 'DPM-USTP-CCIR-005', 146),
(244, 'DPM-USTP-ECRD-001', 147),
(245, 'DPM-USTP-ECRD-002', 147),
(246, 'DPM-USTP-ECRD-003', 147),
(247, 'DPM-USTP-ECRD-004', 147),
(248, 'DPM-USTP-ECRD-005', 147),
(249, 'DPM-USTP-MJST-001', 148),
(250, 'DPM-USTP-MJST-002', 148),
(251, 'DPM-USTP-MJST-003', 148),
(252, 'DPM-USTP-MJST-004', 148),
(253, 'DPM-USTP-MJST-005', 148),
(254, 'DPM-USTP-MJST-006', 148),
(255, 'DPM-USTP-MJST-007', 148),
(256, 'DPM-USTP-AsS-001', 149),
(257, 'DPM-USTP-AsS-002', 149),
(258, 'DPM-USTP-AsS-003', 149),
(259, 'DPM-USTP-AsS-004', 149),
(260, 'DPM-USTP-AsS-005', 149),
(261, 'DPM-USTP-AsS-006', 149),
(262, 'DPM-USTP-AsS-007', 149),
(263, 'DPM-USTP-AsS-008', 149),
(264, 'DPM-USTP-AsS-009', 149),
(265, 'DPM-USTP-AsS-010', 149),
(266, 'DPM-USTP-AsS-011', 149),
(267, 'DPM-USTP-AsS-012', 149),
(268, 'DPM-USTP-AsS-013', 149),
(269, 'DPM-USTP-AsS-014', 149),
(270, 'DPM-USTP-AsS-015', 149),
(271, 'DPM-USTP-BC-001', 150),
(272, 'DPM-USTP-BC-002', 150),
(273, 'DPM-USTP-BC-003', 150),
(274, 'DPM-USTP-BC-004', 150),
(275, 'DPM-USTP-BGMS-001', 151),
(276, 'DPM-USTP-BGMS-002', 151),
(277, 'DPM-USTP-BGMS-003', 151),
(278, 'DPM-USTP-CRS-001', 152),
(279, 'DPM-USTP-CRS-002', 152),
(280, 'DPM-USTP-CRS-003', 152),
(281, 'DPM-USTP-CRS-004', 152),
(282, 'DPM-USTP-CRS-005', 152),
(283, 'DPM-USTP-CSWS-001', 153),
(284, 'DPM-USTP-CSWS-002', 153),
(285, 'DPM-USTP-CSWS-003', 153),
(286, 'DPM-USTP-FLRS-001', 154),
(287, 'DPM-USTP-FLRS-002', 154),
(288, 'DPM-USTP-NSTP-001', 155),
(289, 'DPM-USTP-NSTP-002', 155),
(290, 'DPM-USTP-AMS-001', 156),
(291, 'DPM-USTP-AMS-002', 156),
(292, 'DPM-USTP-AMS-003', 156),
(293, 'DPM-USTP-AMS-004', 156),
(294, 'DPM-USTP-AMS-005', 156),
(295, 'DPM-USTP-CAFE-001', 157),
(296, 'DPM-USTP-CAFE-002', 157),
(297, 'DPM-USTP-CAFE-003', 157),
(298, 'DPM-USTP-CAFE-004', 157),
(299, 'DPM-USTP-CAFE-005', 157),
(300, 'DPM-USTP-ICT-001', 158),
(301, 'DPM-USTP-ICT-002', 158),
(302, 'DPM-USTP-ICT-003', 158),
(303, 'DPM-USTP-ICT-004', 158),
(304, 'DPM-USTP-ICT-005', 158),
(305, 'DPM-USTP-ICT-006', 158),
(306, 'DPM-USTP-ICT-007', 158),
(307, 'DPM-USTP-IFDO-001(System)', 159),
(308, 'DPM-USTP-IFDO-002(System)', 159),
(309, 'DPM-USTP-IFDO-003(System)', 159),
(310, 'DPM-USTP-IFDO-004(System)', 159),
(311, 'DPM-USTP-IFDO-005(System)', 159),
(312, 'DPM-USTP-IFDO-006(System)', 159),
(313, 'DPM-USTP-IFDO-007(System)', 159),
(314, 'DPM-USTP-IFDO-008(System)', 159),
(315, 'DPM-USTP-IFDO-009(System)', 159),
(316, 'DPM-USTP-PM-001', 160),
(317, 'DPM-USTP-PM-002', 160),
(318, 'DPM-USTP-PM-003', 160),
(319, 'DPM-USTP-PM-004', 160),
(320, 'DPM-USTP-OC-001', 161),
(321, 'DPM-USTP-OC-002', 161),
(322, 'DPM-USTP-OC-003', 161),
(323, 'DPM-USTP-OVCAA-001', 162),
(324, 'DPM-USTP-OVCAA-002', 162),
(325, 'DPM-USTP-ITSO-001', 163),
(326, 'DPM-USTP-ITSO-002', 163),
(327, 'DPM-USTP-ITSO-003', 163),
(328, 'DPM-USTP-FIC-001', 164),
(329, 'DPM-USTP-FIC-002', 164),
(330, 'DPM-USTP-ReO-001', 165),
(331, 'DPM-USTP-ReO-002', 165),
(332, 'DPM-USTP-ReO-003', 165),
(333, 'DPM-USTP-ReO-004', 165),
(334, 'DPM-USTP-ReO-005', 165),
(335, 'DPM-USTP-QAA-001', 166),
(336, 'DPM-USTP-QAA-002', 166),
(337, 'DPM-USTP-MTP-001', 167),
(338, 'DPM-USTP-MTP-002', 167),
(339, 'DPM-USTP-MTP-003', 167),
(340, 'DPM-USTP-MTP-004', 167),
(341, 'DPM-USTP-MEWS-001', 168),
(342, 'DPM-USTP-MEWS-002', 168),
(343, 'DPM-USTP-MEWS-003', 168),
(344, 'DPM-USTP-MEWS-004', 168),
(345, 'DPM-USTP-OVCFA-001', 169),
(346, 'DPM-USTP-OVCFA-002', 169),
(347, 'DPM-USTP-OVCFA-003', 169),
(348, 'DPM-USTP-SPMS-001', 170),
(349, 'DPM-USTP-SPMS-002', 170),
(350, 'DPM-USTP-SPMS-003', 170),
(351, 'DPM-USTP-SPMS-004', 170),
(352, 'DPM-USTP-SPMS-005', 170),
(353, 'DPM-USTP-UBS-001', 171),
(354, 'DPM-USTP-UBS-002', 171),
(355, 'DPM-USTP-UBS-003', 171),
(356, 'DPM-USTP-UBS-004', 171),
(357, 'DPM-USTP-UBS-005', 171),
(358, 'DPM-USTP-UBS-006', 171),
(359, 'DPM-USTP-UBS-007', 171),
(360, 'DPM-USTP-UBS-008', 171),
(361, 'DPM-USTP-UBS-009', 171),
(362, 'DPM-USTP-SPORTS-001', 172),
(363, 'DPM-USTP-SPORTS-002', 172),
(364, 'DPM-USTP-SPORTS-003', 172),
(365, 'DPM-USTP-PCO-001', 173),
(366, 'DPM-USTP-PCO-002', 173),
(367, 'DPM-USTP-PCO-003', 173),
(368, 'DPM-USTP-PCO-004', 173),
(369, 'DPM-USTP-PP-001', 174),
(370, 'DPM-USTP-PP-002', 174),
(371, 'DPM-USTP-PP-003', 174),
(372, 'DPM-USTP-PP-004', 174),
(373, 'DPM-USTP-PP-005', 174),
(374, 'DPM-USTP-PP-006', 174),
(375, 'DPM-USTP-PP-007', 174),
(376, 'DPM-USTP-PP-008', 174),
(377, 'DPM-USTP-PP-009', 174),
(378, 'DPM-USTP-DTO-001', 175),
(379, 'DPM-USTP-DTO-002', 175),
(380, 'DPM-USTP-DTO-003', 175),
(381, 'DPM-USTP-DTO-004', 175),
(382, 'DPM-USTP-DTO-005', 175),
(383, 'DPM-USTP-DTO-006', 175),
(384, 'DPM-USTP-DTO-007', 175),
(385, 'DPM-USTP-DTO-008', 175),
(386, 'DPM-USTP-DTO-009', 175),
(387, 'DPM-USTP-CiTL-001', 176),
(388, 'DPM-USTP-CiTL-002', 176),
(389, 'DPM-USTP-CiTL-003', 176),
(390, 'DPM-USTP-OVPAA-001', 177),
(391, 'DPM-USTP-OVPAA-002', 177),
(392, 'DPM-USTP-OVPAA-003', 177),
(393, 'DPM-USTP-OVPAA-004', 177),
(394, 'DPM-USTP-ALA-001', 178),
(395, 'DPM-USTP-ALA-002', 178),
(396, 'DPM-USTP-ALA-003', 178),
(397, 'DPM-USTP-FPD-001', 179),
(398, 'DPM-USTP-FPD-002', 179),
(399, 'DPM-USTP-FPD-003', 179),
(400, 'DPM-USTP-FPD-004', 179),
(401, 'DPM-USTP-OP-001', 180),
(402, 'DPM-USTP-OP-002', 180),
(403, 'DPM-USTP-OP-003', 180),
(404, 'DPM-USTP-OP-004', 180),
(405, 'DPM-USTP-OP-005', 180),
(406, 'DPM-USTP-OP-006', 180),
(407, 'DPM-USTP-OP-007', 180),
(408, 'DPM-USTP-OP-008', 180),
(409, 'DPM-USTP-OP-009', 180),
(410, 'DPM-USTP-LMO-001', 181),
(411, 'DPM-USTP-LMO-002', 181);

-- --------------------------------------------------------

--
-- Table structure for table `folders`
--

CREATE TABLE `folders` (
  `folder_id` int(11) NOT NULL,
  `foldername` varchar(100) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `parent_folder` int(11) DEFAULT NULL,
  `path` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `usertype` int(20) NOT NULL,
  `user_level` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `name`, `email`, `usertype`, `user_level`) VALUES
(194, 'admin', 'c3284d0f94606de1fd2af172aba15bf3', 'Roi Rotoras', 'roirotoras012@gmail.com', 182, NULL),
(259, 'clintdelio', '08c372b86ab1df9cf9f8909fb23a736d', 'Clint Delio', 'cd@gmail.com', 183, ''),
(260, 'rotoras012', 'eab4f14f8f3714240220e560449c9f08', 'Jerel Roi C, Rotoras', 'roirotoras012@gmail.com', 123, 'head'),
(261, 'rotoras123', '0d25d6ed74136e404b45074da3440c81', 'Jerel Roi C, Rotoras2', 'roirotoras012@gmail.com2', 123, 'co'),
(263, 'citc2', '8d24e2ce7dd52ef969bc95c24e39c0f7', 'citc2', 'citc2', 131, 'head'),
(266, 'auditor', '5c83ee833225ffdf92ebd935b2ede59e', 'Jerel Roi C, Rotoras', 'roirotoras012@gmail.com', 183, ''),
(267, 'banoobska', '212604f5fad6b01c3a28496184b380d4', 'banoobska', 'banoobska', 137, 'head'),
(268, 'akonisir', 'e3830318471ce7c5d1cfa9aea5a5a2b3', 'clint delcards', 'delcards@gmail.com', 172, 'head');

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

CREATE TABLE `usertype` (
  `usertype_id` int(20) NOT NULL,
  `usertype_title` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`usertype_id`, `usertype_title`) VALUES
(122, 'System-Wide'),
(123, 'CITC'),
(124, 'CT'),
(125, 'CSM'),
(126, 'CEA'),
(127, 'CSTE'),
(128, 'Admission & Scholarship Office'),
(129, 'OSA'),
(130, 'Library'),
(131, 'Registrar'),
(132, 'IMT'),
(133, 'Top Management'),
(134, 'QML'),
(135, 'Deputy QML'),
(136, 'ISO Core Team'),
(137, 'CRS'),
(138, 'Internal Lead Auditor'),
(139, 'HRMO (System & CDO)'),
(140, 'Accounting Section or Budget Section'),
(141, 'PU'),
(142, 'Health Services'),
(143, 'Cashiering Unit'),
(144, 'Campus Safety and Security Unit (CSSU)'),
(145, 'ArCU'),
(146, 'CCIR Unit'),
(147, 'ECRD'),
(148, 'MJST'),
(149, 'Assessment'),
(150, 'Book Center'),
(151, 'Building and Ground Maintenance Section'),
(152, 'Central Records Section'),
(153, 'Civil and Sanitary Works Section'),
(154, 'FLRS'),
(155, 'NSTP'),
(156, 'AMS'),
(157, 'Cafeteria'),
(158, 'ICT'),
(159, 'IPFDO'),
(160, 'Planning and Monitoring (PM)'),
(161, 'OC'),
(162, 'OVCASA'),
(163, 'ITSO'),
(164, 'FIC'),
(165, 'Research Office'),
(166, 'Quality Assurance and Accreditation (QAA)'),
(167, 'MTP'),
(168, 'MEWS'),
(169, 'OVCFA'),
(170, 'Supply Property Management Section'),
(171, 'University Board Secretary (UBS)'),
(172, 'Sports'),
(173, 'PCO'),
(174, 'Printing Press (PP)'),
(175, 'DTO'),
(176, 'CITL'),
(177, 'OVPAA'),
(178, 'OVPALA'),
(179, 'OVPFPD'),
(180, 'OP'),
(181, 'LMO'),
(182, 'admin'),
(183, 'auditor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audit`
--
ALTER TABLE `audit`
  ADD PRIMARY KEY (`audit_id`),
  ADD KEY `audit_ibfk_3` (`dpm`),
  ADD KEY `auditee` (`auditee`),
  ADD KEY `auditor` (`auditor`),
  ADD KEY `auditplan` (`auditplan`);

--
-- Indexes for table `audit_plan`
--
ALTER TABLE `audit_plan`
  ADD PRIMARY KEY (`audit_plan_id`);

--
-- Indexes for table `branch_document`
--
ALTER TABLE `branch_document`
  ADD PRIMARY KEY (`branch_document_id`),
  ADD KEY `branch_document_main` (`branch_document_main`),
  ADD KEY `branch_document_user` (`branch_document_user`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`doc_id`),
  ADD KEY `documents_ibfk_1` (`user`);

--
-- Indexes for table `dpm`
--
ALTER TABLE `dpm`
  ADD PRIMARY KEY (`dpm_id`),
  ADD KEY `usertype` (`usertype`);

--
-- Indexes for table `folders`
--
ALTER TABLE `folders`
  ADD PRIMARY KEY (`folder_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parent_folder` (`parent_folder`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `usertype` (`usertype`);

--
-- Indexes for table `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`usertype_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audit`
--
ALTER TABLE `audit`
  MODIFY `audit_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT for table `audit_plan`
--
ALTER TABLE `audit_plan`
  MODIFY `audit_plan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `branch_document`
--
ALTER TABLE `branch_document`
  MODIFY `branch_document_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `doc_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=289;

--
-- AUTO_INCREMENT for table `dpm`
--
ALTER TABLE `dpm`
  MODIFY `dpm_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=412;

--
-- AUTO_INCREMENT for table `folders`
--
ALTER TABLE `folders`
  MODIFY `folder_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=269;

--
-- AUTO_INCREMENT for table `usertype`
--
ALTER TABLE `usertype`
  MODIFY `usertype_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=184;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `audit`
--
ALTER TABLE `audit`
  ADD CONSTRAINT `audit_ibfk_3` FOREIGN KEY (`dpm`) REFERENCES `dpm` (`dpm_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `audit_ibfk_4` FOREIGN KEY (`auditee`) REFERENCES `usertype` (`usertype_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `audit_ibfk_5` FOREIGN KEY (`auditor`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `audit_ibfk_6` FOREIGN KEY (`auditplan`) REFERENCES `audit_plan` (`audit_plan_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `branch_document`
--
ALTER TABLE `branch_document`
  ADD CONSTRAINT `branch_document_ibfk_1` FOREIGN KEY (`branch_document_main`) REFERENCES `documents` (`doc_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `branch_document_ibfk_2` FOREIGN KEY (`branch_document_user`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `dpm`
--
ALTER TABLE `dpm`
  ADD CONSTRAINT `dpm_ibfk_1` FOREIGN KEY (`usertype`) REFERENCES `usertype` (`usertype_id`);

--
-- Constraints for table `folders`
--
ALTER TABLE `folders`
  ADD CONSTRAINT `folders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `folders_ibfk_3` FOREIGN KEY (`parent_folder`) REFERENCES `folders` (`folder_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`usertype`) REFERENCES `usertype` (`usertype_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
