-- MySQL dump 10.13  Distrib 9.4.0, for Win64 (x86_64)
--
-- Host: localhost    Database: veg_pos
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `veg_pos`
--



--
-- Table structure for table `audit_log`
--

DROP TABLE IF EXISTS `audit_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `audit_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `action` varchar(30) NOT NULL,
  `entity_type` varchar(30) NOT NULL,
  `entity_id` int DEFAULT NULL,
  `details` longtext,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_audit_entity` (`entity_type`,`entity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_log`
--

LOCK TABLES `audit_log` WRITE;
/*!40000 ALTER TABLE `audit_log` DISABLE KEYS */;
INSERT INTO `audit_log` VALUES (1,1,'admin','create','bill',1,'{\"bill_no\":\"L-0001\"}','2026-10-09 21:36:49'),(2,1,'admin','create','bill',2,'{\"bill_no\":\"LC-0001\"}','2026-10-09 21:37:10'),(3,1,'admin','create','payment',2,'{\"receipt_no\":\"PAY00001\",\"amount\":1000}','2026-10-09 21:37:58'),(4,1,'admin','create','bill',3,'{\"bill_no\":\"L-0002\"}','2026-10-09 21:54:03'),(5,1,'admin','create','bill',4,'{\"bill_no\":\"LC-0002\"}','2026-10-09 21:55:12'),(6,1,'admin','create','bill',5,'{\"bill_no\":\"QS-0001\"}','2026-10-09 21:56:22'),(7,1,'admin','create','bill',6,'{\"bill_no\":\"L-0003\"}','2026-10-10 10:26:05'),(8,1,'admin','create','bill',7,'{\"bill_no\":\"QS-0002\"}','2026-10-10 10:30:37'),(9,1,'admin','create','bill',8,'{\"bill_no\":\"LC-0003\"}','2026-10-10 13:36:59'),(10,1,'admin','create','bill',9,'{\"bill_no\":\"L-0004\"}','2026-10-10 14:19:07'),(11,1,'admin','create','bill',10,'{\"bill_no\":\"LC-0004\"}','2026-10-11 08:20:34'),(12,1,'admin','create','bill',11,'{\"bill_no\":\"LC-0005\"}','2026-10-11 08:20:52'),(13,1,'admin','create','bill',12,'{\"bill_no\":\"LC-0006\"}','2026-10-11 08:20:52'),(14,1,'admin','create','bill',15,'{\"bill_no\":\"L-0005\"}','2026-10-11 08:21:16'),(15,1,'admin','update','bill',10,'{\"bill_no\":\"LC-0004\"}','2026-10-11 08:22:02'),(16,1,'admin','create','bill',16,'{\"bill_no\":\"LC-0007\"}','2026-10-11 08:29:32'),(17,1,'admin','update','bill',16,'{\"bill_no\":\"LC-0007\"}','2026-10-11 08:31:52'),(18,1,'admin','create','bill',17,'{\"bill_no\":\"L-0006\"}','2026-10-11 08:44:16'),(19,1,'admin','create','bill',18,'{\"bill_no\":\"L-0007\"}','2026-10-11 08:45:10'),(20,1,'admin','create','bill',19,'{\"bill_no\":\"L-0008\"}','2026-10-11 13:45:27'),(21,1,'admin','create','bill',20,'{\"bill_no\":\"LC-0008\"}','2026-10-11 13:50:46'),(22,1,'admin','create','bill',21,'{\"bill_no\":\"LC-0009\"}','2026-10-12 09:58:05'),(23,1,'admin','create','payment',3,'{\"receipt_no\":\"REC00002\",\"amount\":100}','2026-10-12 10:01:34'),(24,1,'admin','create','payment',4,'{\"receipt_no\":\"PAY00003\",\"amount\":100}','2026-10-12 10:02:02'),(25,1,'admin','create','bill',22,'{\"bill_no\":\"L-0009\"}','2026-10-12 10:04:05'),(26,1,'admin','create','bill',23,'{\"bill_no\":\"QS-0003\"}','2026-10-12 10:37:14'),(27,1,'admin','create','purchase',1,'{\"purchase_no\":\"PUR-00001\"}','2026-10-12 11:22:06'),(28,1,'admin','create','purchase',2,'{\"purchase_no\":\"PUR-00002\"}','2026-10-12 12:01:41'),(29,1,'admin','create','bill',24,'{\"bill_no\":\"L-0010\"}','2026-10-12 12:29:26'),(30,1,'admin','create','bill',25,'{\"bill_no\":\"LC-0010\"}','2026-10-12 12:30:48'),(31,1,'admin','create','bill',26,'{\"bill_no\":\"QS-0004\"}','2026-10-12 13:09:21'),(32,1,'admin','create','bill',27,'{\"bill_no\":\"L-0011\"}','2026-10-12 14:29:05'),(33,1,'admin','create','bill',28,'{\"bill_no\":\"L-0012\"}','2026-10-12 14:31:03'),(34,1,'admin','create','bill',29,'{\"bill_no\":\"LC-0011\"}','2026-10-12 14:31:41'),(35,1,'admin','create','bill',30,'{\"bill_no\":\"LC-0012\"}','2026-10-12 14:54:21'),(36,1,'admin','create','bill',31,'{\"bill_no\":\"LC-0013\"}','2026-10-12 14:55:08'),(37,1,'admin','create','bill',32,'{\"bill_no\":\"L-0013\"}','2026-10-12 14:59:20'),(38,1,'admin','create','bill',33,'{\"bill_no\":\"L-0014\"}','2026-10-12 15:40:00'),(39,1,'admin','create','bill',34,'{\"bill_no\":\"L-0015\"}','2026-10-12 15:44:19'),(40,1,'admin','create','bill',35,'{\"bill_no\":\"L-0016\"}','2026-10-12 17:24:03'),(41,1,'admin','create','bill',36,'{\"bill_no\":\"LC-0014\"}','2026-10-12 17:24:29'),(42,1,'admin','create','bill',37,'{\"bill_no\":\"LC-0015\"}','2026-10-12 17:24:49'),(43,1,'admin','create','bill',38,'{\"bill_no\":\"L-0017\"}','2026-10-12 19:05:02'),(44,1,'admin','create','bill',39,'{\"bill_no\":\"L-0018\"}','2026-10-12 19:53:08'),(45,1,'admin','create','bill',40,'{\"bill_no\":\"L-0019\"}','2026-10-13 09:27:45'),(46,1,'admin','create','bill',41,'{\"bill_no\":\"L-0020\"}','2026-10-13 09:28:24'),(47,1,'admin','create','bill',42,'{\"bill_no\":\"LC-0016\"}','2026-10-13 09:29:39'),(48,1,'admin','create','bill',43,'{\"bill_no\":\"L-0021\"}','2026-10-13 12:40:33'),(49,1,'admin','create','bill',44,'{\"bill_no\":\"LC-0017\"}','2026-10-13 12:42:14'),(50,1,'admin','create','bill',45,'{\"bill_no\":\"L-0022\"}','2026-10-13 12:44:53'),(51,1,'admin','create','bill',46,'{\"bill_no\":\"L-0023\"}','2026-10-13 12:56:00'),(52,1,'admin','create','bill',47,'{\"bill_no\":\"L-0024\"}','2026-10-13 13:01:17'),(53,1,'admin','create','bill',48,'{\"bill_no\":\"L-0025\"}','2026-10-13 13:01:56'),(54,1,'admin','create','bill',49,'{\"bill_no\":\"L-0026\"}','2026-10-13 13:02:40'),(55,1,'admin','create','bill',50,'{\"bill_no\":\"LC-0018\"}','2026-10-13 13:04:47'),(56,1,'admin','create','bill',51,'{\"bill_no\":\"L-0027\"}','2026-10-13 13:08:07'),(57,1,'admin','create','payment',5,'{\"receipt_no\":\"REC00004\",\"amount\":100}','2026-10-13 13:09:01'),(58,1,'admin','create','bill',52,'{\"bill_no\":\"LC-0019\"}','2026-10-13 13:16:07'),(59,1,'admin','create','bill',53,'{\"bill_no\":\"QS-0005\"}','2026-10-13 13:25:21'),(60,1,'admin','create','payment',6,'{\"receipt_no\":\"REC00005\",\"amount\":100}','2026-10-13 13:27:09'),(61,1,'admin','create','bill',54,'{\"bill_no\":\"QS-0006\"}','2026-10-14 12:28:02'),(62,1,'admin','create','bill',55,'{\"bill_no\":\"L-0028\"}','2026-10-14 12:52:04'),(63,1,'admin','create','bill',56,'{\"bill_no\":\"L-0029\"}','2026-10-14 13:16:40'),(64,1,'admin','create','bill',57,'{\"bill_no\":\"L-0030\"}','2026-10-14 13:19:38'),(65,1,'admin','create','bill',58,'{\"bill_no\":\"L-0031\"}','2026-10-14 13:24:05'),(66,1,'admin','create','bill',59,'{\"bill_no\":\"LC-0020\"}','2026-10-14 13:32:35'),(67,1,'admin','create','bill',60,'{\"bill_no\":\"L-0032\"}','2026-10-14 13:58:47'),(68,1,'admin','create','bill',61,'{\"bill_no\":\"L-0033\"}','2026-10-14 14:22:21'),(69,1,'admin','create','bill',62,'{\"bill_no\":\"L-0034\"}','2026-10-14 14:22:45'),(70,1,'admin','create','bill',63,'{\"bill_no\":\"LC-0021\"}','2026-10-14 14:23:05'),(71,1,'admin','create','bill',64,'{\"bill_no\":\"L-0035\"}','2026-10-14 14:31:02'),(72,1,'admin','create','bill',65,'{\"bill_no\":\"L-0036\"}','2026-10-14 14:37:15'),(73,1,'admin','create','bill',66,'{\"bill_no\":\"LC-0022\"}','2026-10-14 14:37:40'),(74,1,'admin','create','payment',7,'{\"receipt_no\":\"REC00006\",\"amount\":10000}','2026-10-14 14:42:45');
/*!40000 ALTER TABLE `audit_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_lines`
--

DROP TABLE IF EXISTS `bill_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_lines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bill_id` int NOT NULL,
  `item_id` int DEFAULT NULL,
  `item_name_ta` varchar(100) NOT NULL,
  `item_name_en` varchar(100) NOT NULL,
  `unit` varchar(20) NOT NULL DEFAULT 'kg',
  `is_charge_item` tinyint(1) NOT NULL DEFAULT '0',
  `rate` decimal(10,2) NOT NULL DEFAULT '0.00',
  `nos` decimal(10,2) NOT NULL DEFAULT '0.00',
  `weight` decimal(10,2) NOT NULL DEFAULT '0.00',
  `amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `line_order` int NOT NULL DEFAULT '0',
  `bag_count` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `bill_id` (`bill_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `bill_lines_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bill_lines_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_lines`
--

LOCK TABLES `bill_lines` WRITE;
/*!40000 ALTER TABLE `bill_lines` DISABLE KEYS */;
INSERT INTO `bill_lines` VALUES (1,1,1,'???????','Tomato','kg',0,20.00,4.00,40.00,800.00,0,NULL),(2,1,2,'????????????','Ladies Finger','kg',0,30.00,1.00,10.00,300.00,1,NULL),(3,2,1,'???????','Tomato','kg',0,40.00,0.00,35.00,1400.00,0,NULL),(4,3,1,'α«ñα«òα»ìα«òα«╛α«│α«┐','Tomato','kg',0,20.00,0.00,40.00,800.00,0,NULL),(5,3,2,'α«╡α»åα«úα»ìα«ƒα»êα«òα»ìα«òα«╛α«»α»ì','Ladies Finger','kg',0,30.00,0.00,10.00,300.00,1,NULL),(6,4,1,'α«ñα«òα»ìα«òα«╛α«│α«┐','Tomato','kg',0,40.00,0.00,35.00,1400.00,0,NULL),(7,5,3,'α««α«┐α«│α«òα«╛α«»α»ì','Chilli','kg',0,40.00,0.00,2.00,80.00,0,NULL),(8,6,22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd','kg',0,18.00,20.00,2.00,36.00,0,NULL),(9,7,22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd','kg',0,18.00,0.00,2.00,36.00,0,NULL),(10,8,22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd','kg',0,18.00,0.00,2.00,36.00,0,NULL),(11,9,22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd','kg',0,18.00,0.00,2.00,36.00,0,NULL),(13,11,1,'??????','Nelli','kg',0,360.00,0.00,1.00,360.00,0,NULL),(14,12,1,'??????','Nelli','kg',0,360.00,0.00,1.00,360.00,0,NULL),(15,12,2,'?????? ??','Product B','kg',0,100.00,0.00,2.00,200.00,1,NULL),(18,15,1,'???????','Tomato','kg',0,20.00,0.00,30.00,600.00,0,NULL),(19,10,1,'??????','Nelli','kg',0,360.00,0.00,1.00,360.00,0,NULL),(21,16,1,'α«ñα«òα»ìα«òα«╛α«│α«┐','Tomato','kg',0,360.00,0.00,1.00,360.00,0,NULL),(22,17,22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd','kg',0,18.00,0.00,2.00,36.00,0,NULL),(23,18,22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd','kg',0,18.00,0.00,2.00,36.00,0,NULL),(24,19,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,0.00,0.00,0,NULL),(25,19,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,0.00,0.00,1,NULL),(26,19,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,0.00,0.00,2,NULL),(27,20,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,0.00,0.00,0,NULL),(28,21,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,8.00,280.00,0,NULL),(29,22,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(30,23,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,2.00,70.00,0,NULL),(31,24,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(32,25,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(33,26,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,9.00,315.00,0,NULL),(34,27,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(35,27,16,'α«àα«╡α«░α»êα«òα»ìα«òα«╛α«»α»ì','Avarai Beans','kg',0,32.00,0.00,1.00,32.00,1,NULL),(36,27,15,'α««α»üα«░α»üα«Öα»ìα«òα»ê α«çα«▓α»ê','Drumstick Leaves','kg',0,20.00,0.00,1.00,20.00,2,NULL),(37,27,18,'α«¬α»üα«ƒα«▓α«Öα»ìα«òα«╛α«»α»ì','Ridge Gourd','kg',0,25.00,0.00,1.00,25.00,3,NULL),(38,28,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(39,28,9,'α«╡α»åα«Öα»ìα«òα«╛α«»α««α»ì','Onion','kg',0,28.00,0.00,1.00,28.00,1,NULL),(40,28,6,'α««α«╛α«Öα»ìα«òα«╛α«»α»ì','Raw Mango','kg',0,25.00,0.00,1.00,25.00,2,NULL),(41,28,20,'α«Üα»üα«░α»êα«òα»ìα«òα«╛α«»α»ì','Bottle Gourd','kg',0,20.00,0.00,3.00,60.00,3,NULL),(42,28,25,'α«òα»èα«ñα»ìα«ñα«╡α«░α«Öα»ìα«òα«╛α«»α»ì','Cluster Beans','kg',0,35.00,0.00,2.00,70.00,4,NULL),(43,28,24,'α«òα»ïα«╡α»êα«òα»ìα«òα«╛α«»α»ì','Ivy Gourd','kg',0,30.00,0.00,1.00,30.00,5,NULL),(44,28,2,'α«╡α»åα«úα»ìα«ƒα»êα«òα»ìα«òα«╛α«»α»ì','Ladies Finger','kg',0,30.00,0.00,1.00,30.00,6,NULL),(45,29,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(46,29,16,'α«àα«╡α«░α»êα«òα»ìα«òα«╛α«»α»ì','Avarai Beans','kg',0,32.00,0.00,1.00,32.00,1,NULL),(47,29,15,'α««α»üα«░α»üα«Öα»ìα«òα»ê α«çα«▓α»ê','Drumstick Leaves','kg',0,20.00,0.00,1.00,20.00,2,NULL),(48,29,9,'α«╡α»åα«Öα»ìα«òα«╛α«»α««α»ì','Onion','kg',0,28.00,0.00,1.00,28.00,3,NULL),(49,29,21,'α«¬α»éα«Üα«úα«┐α«òα»ìα«òα«╛α«»α»ì','Pumpkin','kg',0,18.00,0.00,1.00,18.00,4,NULL),(50,29,4,'α«¬α«Üα»ìα«Üα»ê α««α«┐α«│α«òα«╛α«»α»ì','Green Chilli','kg',0,35.00,0.00,1.00,35.00,5,NULL),(51,30,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(52,30,17,'α«¬α«╛α«òα«▒α»ìα«òα«╛α«»α»ì','Bitter Gourd','kg',0,30.00,0.00,1.00,30.00,1,NULL),(53,30,4,'α«¬α«Üα»ìα«Üα»ê α««α«┐α«│α«òα«╛α«»α»ì','Green Chilli','kg',0,35.00,0.00,1.00,35.00,2,NULL),(54,30,19,'α«¬α»Çα«░α»ìα«òα»ìα«òα«Öα»ìα«òα«╛α«»α»ì','Snake Gourd','kg',0,25.00,0.00,1.00,25.00,3,NULL),(55,31,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(56,31,9,'α«╡α»åα«Öα»ìα«òα«╛α«»α««α»ì','Onion','kg',0,28.00,0.00,1.00,28.00,1,NULL),(57,32,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(58,32,9,'α«╡α»åα«Öα»ìα«òα«╛α«»α««α»ì','Onion','kg',0,28.00,0.00,1.00,28.00,1,NULL),(59,32,7,'α«╡α«░α«┐ α«òα«ñα»ìα«ñα«░α«┐','Striped Brinjal','kg',0,25.00,0.00,1.00,25.00,2,NULL),(60,33,11,'α«ëα«░α»üα«│α»êα«òα»ìα«òα«┐α«┤α«Öα»ìα«òα»ü','Potato','kg',0,22.00,0.00,1.00,22.00,0,NULL),(61,33,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,1,NULL),(62,33,10,'α«òα»èα«ñα»ìα«ñα»ü α«╡α»åα«Öα»ìα«òα«╛α«»α««α»ì','Spring Onion','kg',0,30.00,0.00,1.00,30.00,2,NULL),(63,33,21,'α«¬α»éα«Üα«úα«┐α«òα»ìα«òα«╛α«»α»ì','Pumpkin','kg',0,18.00,0.00,1.00,18.00,3,NULL),(64,34,15,'α««α»üα«░α»üα«Öα»ìα«òα»ê α«çα«▓α»ê','Drumstick Leaves','kg',0,20.00,0.00,1.00,20.00,0,NULL),(65,35,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,3.00,1.00,35.00,0,NULL),(66,36,11,'α«ëα«░α»üα«│α»êα«òα»ìα«òα«┐α«┤α«Öα»ìα«òα»ü','Potato','kg',0,22.00,0.00,1.00,22.00,0,NULL),(67,37,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,3.00,1.00,35.00,0,NULL),(68,38,11,'α«ëα«░α»üα«│α»êα«òα»ìα«òα«┐α«┤α«Öα»ìα«òα»ü','Potato','kg',0,22.00,0.00,1.00,22.00,0,NULL),(69,39,15,'α««α»üα«░α»üα«Öα»ìα«òα»ê α«çα«▓α»ê','Drumstick Leaves','kg',0,20.00,0.00,1.00,20.00,0,NULL),(70,40,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(71,40,5,'α«òα«░α»üα«╡α»çα«¬α»ìα«¬α«┐α«▓α»ê','Curry Leaves','kg',0,60.00,0.00,1.00,60.00,1,NULL),(72,40,9,'α«╡α»åα«Öα»ìα«òα«╛α«»α««α»ì','Onion','kg',0,28.00,0.00,1.00,28.00,2,NULL),(73,40,1,'α«ñα«òα»ìα«òα«╛α«│α«┐','Tomato','kg',0,20.00,0.00,1.00,20.00,3,NULL),(74,40,3,'α««α«┐α«│α«òα«╛α«»α»ì','Chilli','kg',0,40.00,0.00,1.00,40.00,4,NULL),(75,40,4,'α«¬α«Üα»ìα«Üα»ê α««α«┐α«│α«òα«╛α«»α»ì','Green Chilli','kg',0,35.00,0.00,1.00,35.00,5,NULL),(76,41,5,'α«òα«░α»üα«╡α»çα«¬α»ìα«¬α«┐α«▓α»ê','Curry Leaves','kg',0,60.00,0.00,2.00,120.00,0,NULL),(77,41,4,'α«¬α«Üα»ìα«Üα»ê α««α«┐α«│α«òα«╛α«»α»ì','Green Chilli','kg',0,35.00,0.00,1.00,35.00,1,NULL),(78,41,7,'α«╡α«░α«┐ α«òα«ñα»ìα«ñα«░α«┐','Striped Brinjal','kg',0,25.00,0.00,2.00,50.00,2,NULL),(79,41,3,'α««α«┐α«│α«òα«╛α«»α»ì','Chilli','kg',0,40.00,0.00,1.00,40.00,3,NULL),(80,42,4,'α«¬α«Üα»ìα«Üα»ê α««α«┐α«│α«òα«╛α«»α»ì','Green Chilli','kg',0,35.00,0.00,1.00,35.00,0,NULL),(81,42,7,'α«╡α«░α«┐ α«òα«ñα»ìα«ñα«░α«┐','Striped Brinjal','kg',0,25.00,0.00,2.00,50.00,1,NULL),(82,42,3,'α««α«┐α«│α«òα«╛α«»α»ì','Chilli','kg',0,40.00,0.00,1.00,40.00,2,NULL),(83,42,5,'α«òα«░α»üα«╡α»çα«¬α»ìα«¬α«┐α«▓α»ê','Curry Leaves','kg',0,60.00,0.00,1.00,60.00,3,NULL),(84,42,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,4,NULL),(85,42,22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd','kg',0,18.00,0.00,1.00,18.00,5,NULL),(86,43,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,2.50,87.50,0,NULL),(87,43,25,'α«òα»èα«ñα»ìα«ñα«╡α«░α«Öα»ìα«òα«╛α«»α»ì','Cluster Beans','kg',0,35.00,0.00,1.00,35.00,1,NULL),(88,43,6,'α««α«╛α«Öα»ìα«òα«╛α«»α»ì','Raw Mango','kg',0,25.00,0.00,1.00,25.00,2,NULL),(89,44,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(90,44,6,'α««α«╛α«Öα»ìα«òα«╛α«»α»ì','Raw Mango','kg',0,25.00,0.00,1.00,25.00,1,NULL),(91,44,22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd','kg',0,18.00,0.00,1.00,18.00,2,NULL),(92,45,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(93,46,22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd','kg',0,41.00,0.00,1.00,41.00,0,NULL),(94,46,6,'α««α«╛α«Öα»ìα«òα«╛α«»α»ì','Raw Mango','kg',0,25.00,0.00,1.00,25.00,1,NULL),(95,47,7,'α«╡α«░α«┐ α«òα«ñα»ìα«ñα«░α«┐','Striped Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(96,47,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,1,NULL),(97,48,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(98,49,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(99,50,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,10.00,250.00,0,NULL),(100,51,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(101,52,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(102,53,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,1.00,35.00,0,NULL),(103,54,12,'α«òα»çα«░α«ƒα»ì','Carrot','kg',0,35.00,0.00,4.00,140.00,0,NULL),(104,55,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,2.00,50.00,0,NULL),(105,55,21,'α«¬α»éα«Üα«úα«┐α«òα»ìα«òα«╛α«»α»ì','Pumpkin','kg',0,18.00,0.00,2.00,36.00,1,NULL),(106,55,25,'α«òα»èα«ñα»ìα«ñα«╡α«░α«Öα»ìα«òα«╛α«»α»ì','Cluster Beans','kg',0,35.00,0.00,1.00,35.00,2,NULL),(107,55,20,'α«Üα»üα«░α»êα«òα»ìα«òα«╛α«»α»ì','Bottle Gourd','kg',0,20.00,0.00,1.00,20.00,3,NULL),(108,56,7,'α«╡α«░α«┐ α«òα«ñα»ìα«ñα«░α«┐','Striped Brinjal','kg',0,25.00,0.00,2.00,50.00,0,NULL),(109,56,25,'α«òα»èα«ñα»ìα«ñα«╡α«░α«Öα»ìα«òα«╛α«»α»ì','Cluster Beans','kg',0,35.00,0.00,2.00,70.00,1,NULL),(110,56,9,'α«╡α»åα«Öα»ìα«òα«╛α«»α««α»ì','Onion','kg',0,28.00,0.00,1.00,28.00,2,NULL),(111,57,7,'α«╡α«░α«┐ α«òα«ñα»ìα«ñα«░α«┐','Striped Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(112,58,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(113,59,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(114,60,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(115,61,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(116,62,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(117,63,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(118,64,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(119,65,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL),(120,66,8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','kg',0,25.00,0.00,1.00,25.00,0,NULL);
/*!40000 ALTER TABLE `bill_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bill_sequences`
--

DROP TABLE IF EXISTS `bill_sequences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bill_sequences` (
  `id` int NOT NULL AUTO_INCREMENT,
  `series_key` varchar(30) NOT NULL,
  `prefix` varchar(10) NOT NULL,
  `next_number` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `series_key` (`series_key`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bill_sequences`
--

LOCK TABLES `bill_sequences` WRITE;
/*!40000 ALTER TABLE `bill_sequences` DISABLE KEYS */;
INSERT INTO `bill_sequences` VALUES (1,'LOCAL-NORMAL','L-',37),(2,'DISTANT-NORMAL','D-',1),(3,'LOCAL-COMMISSION','LC-',23),(4,'DISTANT-COMMISSION','DC-',1),(5,'QUICK','QS-',7);
/*!40000 ALTER TABLE `bill_sequences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bills`
--

DROP TABLE IF EXISTS `bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bill_no` varchar(20) NOT NULL,
  `series_key` varchar(30) NOT NULL,
  `location_type` enum('local','distant') NOT NULL DEFAULT 'local',
  `bill_type` enum('normal','commission','quick') NOT NULL DEFAULT 'normal',
  `party_id` int DEFAULT NULL,
  `walkin_name` varchar(150) DEFAULT NULL,
  `bill_date` date NOT NULL,
  `items_total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `discount_percent` decimal(5,2) DEFAULT NULL,
  `discount_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `previous_balance` decimal(12,2) NOT NULL DEFAULT '0.00',
  `commission_percent` decimal(5,2) DEFAULT NULL,
  `commission_mode` enum('percentage','fixed') NOT NULL DEFAULT 'percentage',
  `commission_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `patthu_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `cooli_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `vadagai_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `other_deduction_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total_deductions` decimal(12,2) NOT NULL DEFAULT '0.00',
  `grand_total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `paid_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `payment_method_id` int DEFAULT NULL,
  `balance_due` decimal(12,2) NOT NULL DEFAULT '0.00',
  `status` enum('active','cancelled') NOT NULL DEFAULT 'active',
  `notes` varchar(255) DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_bill_series_no` (`series_key`,`bill_no`),
  KEY `payment_method_id` (`payment_method_id`),
  KEY `idx_bills_date` (`bill_date`),
  KEY `idx_bills_party` (`party_id`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`),
  CONSTRAINT `bills_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bills`
--

LOCK TABLES `bills` WRITE;
/*!40000 ALTER TABLE `bills` DISABLE KEYS */;
INSERT INTO `bills` VALUES (1,'L-0001','LOCAL-NORMAL','local','normal',1,NULL,'2026-10-09',1100.00,NULL,0.00,500.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,1600.00,900.00,2,700.00,'active',NULL,1,1,'2026-10-09 21:36:49','2026-10-13 13:27:09'),(2,'LC-0001','LOCAL-COMMISSION','local','commission',2,NULL,'2026-10-09',1400.00,NULL,0.00,0.00,10.00,'percentage',140.00,0.00,0.00,0.00,0.00,140.00,1260.00,1100.00,1,160.00,'active',NULL,1,1,'2026-10-09 21:37:10','2026-10-12 10:02:02'),(3,'L-0002','LOCAL-NORMAL','local','normal',1,NULL,'2026-10-09',1100.00,NULL,0.00,1000.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,2100.00,600.00,2,1500.00,'active',NULL,1,1,'2026-10-09 21:54:03','2026-10-09 21:54:03'),(4,'LC-0002','LOCAL-COMMISSION','local','commission',2,NULL,'2026-10-09',1400.00,NULL,0.00,-260.00,10.00,'percentage',140.00,0.00,0.00,0.00,0.00,140.00,1260.00,0.00,1,1260.00,'active',NULL,1,1,'2026-10-09 21:55:12','2026-10-09 21:55:12'),(5,'QS-0001','QUICK','local','quick',NULL,NULL,'2026-10-09',80.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,80.00,80.00,2,0.00,'active',NULL,1,1,'2026-10-09 21:56:22','2026-10-09 21:56:22'),(6,'L-0003','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-10',36.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,36.00,0.00,1,36.00,'active',NULL,1,1,'2026-10-10 10:26:05','2026-10-10 10:26:05'),(7,'QS-0002','QUICK','local','quick',NULL,NULL,'2026-10-10',36.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,36.00,36.00,2,0.00,'active',NULL,1,1,'2026-10-10 10:30:37','2026-10-10 10:30:37'),(8,'LC-0003','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-10',36.00,NULL,0.00,0.00,10.00,'percentage',3.60,0.00,0.00,0.00,0.00,3.60,32.40,0.00,1,32.40,'active',NULL,1,1,'2026-10-10 13:36:59','2026-10-10 13:36:59'),(9,'L-0004','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-10',36.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,36.00,0.00,1,36.00,'active',NULL,1,1,'2026-10-10 14:19:07','2026-10-10 14:19:07'),(10,'LC-0004','LOCAL-COMMISSION','local','commission',3,NULL,'2026-10-11',360.00,NULL,0.00,-788.00,NULL,'fixed',50.00,20.00,5.00,5.00,2.00,82.00,278.00,0.00,1,278.00,'active',NULL,1,1,'2026-10-11 08:20:34','2026-10-11 08:22:02'),(11,'LC-0005','LOCAL-COMMISSION','local','commission',3,NULL,'2026-10-11',360.00,NULL,0.00,-304.00,NULL,'fixed',36.00,10.00,5.00,5.00,0.00,56.00,304.00,0.00,1,304.00,'active',NULL,1,1,'2026-10-11 08:20:52','2026-10-11 08:20:52'),(12,'LC-0006','LOCAL-COMMISSION','local','commission',3,NULL,'2026-10-11',560.00,NULL,0.00,-608.00,10.00,'percentage',56.00,10.00,5.00,5.00,0.00,76.00,484.00,0.00,1,484.00,'active',NULL,1,1,'2026-10-11 08:20:52','2026-10-11 08:20:52'),(15,'L-0005','LOCAL-NORMAL','local','normal',1,NULL,'2026-10-11',600.00,NULL,0.00,1500.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,2100.00,100.00,2,2000.00,'active',NULL,1,1,'2026-10-11 08:21:16','2026-10-11 08:21:16'),(16,'LC-0007','LOCAL-COMMISSION','local','commission',3,NULL,'2026-10-11',360.00,NULL,0.00,-1066.00,15.00,'percentage',54.00,10.00,5.00,5.00,8.00,82.00,278.00,0.00,1,278.00,'active',NULL,1,1,'2026-10-11 08:29:32','2026-10-11 08:31:52'),(17,'L-0006','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-11',36.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,36.00,36.00,2,0.00,'active',NULL,1,1,'2026-10-11 08:44:16','2026-10-11 08:44:16'),(18,'L-0007','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-11',36.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,36.00,0.00,1,36.00,'active',NULL,1,1,'2026-10-11 08:45:10','2026-10-11 08:45:10'),(19,'L-0008','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-11',0.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1,0.00,'active',NULL,1,1,'2026-10-11 13:45:27','2026-10-11 13:45:27'),(20,'LC-0008','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-11',0.00,NULL,0.00,0.00,10.00,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,1,0.00,'active',NULL,1,1,'2026-10-11 13:50:46','2026-10-11 13:50:46'),(21,'LC-0009','LOCAL-COMMISSION','local','commission',1,NULL,'2026-10-12',280.00,NULL,0.00,2000.00,10.00,'percentage',28.00,20.00,20.00,20.00,2.00,90.00,190.00,190.00,2,0.00,'active',NULL,1,1,'2026-10-12 09:58:04','2026-10-12 09:58:04'),(22,'L-0009','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-12',35.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,35.00,0.00,2,35.00,'active',NULL,1,1,'2026-10-12 10:04:05','2026-10-12 10:04:05'),(23,'QS-0003','QUICK','local','quick',NULL,NULL,'2026-10-12',70.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,70.00,70.00,2,0.00,'active',NULL,1,1,'2026-10-12 10:37:14','2026-10-12 10:37:14'),(24,'L-0010','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-12',35.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,35.00,0.00,2,35.00,'active',NULL,1,1,'2026-10-12 12:29:26','2026-10-12 12:29:26'),(25,'LC-0010','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-12',35.00,NULL,0.00,0.00,10.00,'percentage',3.50,2.00,2.00,2.00,2.00,11.50,23.50,23.50,2,0.00,'active',NULL,1,1,'2026-10-12 12:30:48','2026-10-12 12:30:48'),(26,'QS-0004','QUICK','local','quick',NULL,NULL,'2026-10-12',315.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,315.00,315.00,2,0.00,'active',NULL,1,1,'2026-10-12 13:09:21','2026-10-12 13:09:21'),(27,'L-0011','LOCAL-NORMAL','local','normal',2,NULL,'2026-10-12',112.00,NULL,0.00,-1320.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,112.00,112.00,2,0.00,'active',NULL,1,1,'2026-10-12 14:29:04','2026-10-12 14:29:04'),(28,'L-0012','LOCAL-NORMAL','local','normal',1,NULL,'2026-10-12',278.00,NULL,0.00,1900.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,2178.00,278.00,2,0.00,'active',NULL,1,1,'2026-10-12 14:31:03','2026-10-12 14:31:03'),(29,'LC-0011','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-12',168.00,NULL,0.00,0.00,10.00,'percentage',16.80,0.00,0.00,0.00,0.00,16.80,151.20,151.20,2,0.00,'active',NULL,1,1,'2026-10-12 14:31:41','2026-10-12 14:31:41'),(30,'LC-0012','LOCAL-COMMISSION','local','commission',3,NULL,'2026-10-12',125.00,NULL,0.00,-1344.00,10.00,'percentage',12.50,10.00,10.00,10.00,10.00,52.50,72.50,72.50,2,0.00,'active',NULL,1,1,'2026-10-12 14:54:21','2026-10-12 14:54:21'),(31,'LC-0013','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-12',63.00,NULL,0.00,0.00,10.00,'percentage',6.30,0.00,0.00,0.00,0.00,6.30,56.70,56.70,2,0.00,'active',NULL,1,1,'2026-10-12 14:55:08','2026-10-12 14:55:08'),(32,'L-0013','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-12',88.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,88.00,88.00,2,0.00,'active',NULL,1,1,'2026-10-12 14:59:20','2026-10-12 14:59:20'),(33,'L-0014','LOCAL-NORMAL','local','normal',1,NULL,'2026-10-12',105.00,NULL,0.00,1900.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,2005.00,105.00,2,0.00,'active',NULL,1,1,'2026-10-12 15:40:00','2026-10-12 15:40:00'),(34,'L-0015','LOCAL-NORMAL','local','normal',1,NULL,'2026-10-12',20.00,NULL,0.00,1900.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,1920.00,100.00,2,0.00,'active',NULL,1,1,'2026-10-12 15:44:19','2026-10-12 15:44:19'),(35,'L-0016','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-12',35.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,35.00,35.00,2,0.00,'active',NULL,1,1,'2026-10-12 17:24:02','2026-10-12 17:24:02'),(36,'LC-0014','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-12',22.00,NULL,0.00,0.00,10.00,'percentage',2.20,0.00,0.00,0.00,0.00,2.20,19.80,19.80,2,0.00,'active',NULL,1,1,'2026-10-12 17:24:29','2026-10-12 17:24:29'),(37,'LC-0015','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-12',35.00,NULL,0.00,0.00,10.00,'percentage',3.50,0.00,0.00,0.00,0.00,3.50,31.50,31.50,2,0.00,'active',NULL,1,1,'2026-10-12 17:24:49','2026-10-12 17:24:49'),(38,'L-0017','LOCAL-NORMAL','local','normal',1,NULL,'2026-10-12',22.00,NULL,0.00,1820.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,1842.00,122.00,2,0.00,'active',NULL,1,1,'2026-10-12 19:05:02','2026-10-12 19:05:02'),(39,'L-0018','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-12',20.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,20.00,20.00,2,0.00,'active',NULL,1,1,'2026-10-12 19:53:07','2026-10-12 19:53:08'),(40,'L-0019','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-13',218.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,218.00,218.00,2,0.00,'active',NULL,1,1,'2026-10-13 09:27:44','2026-10-13 09:27:45'),(41,'L-0020','LOCAL-NORMAL','local','normal',1,NULL,'2026-10-13',245.00,NULL,0.00,1720.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,1965.00,245.00,2,0.00,'active',NULL,1,1,'2026-10-13 09:28:24','2026-10-13 09:28:24'),(42,'LC-0016','LOCAL-COMMISSION','local','commission',2,NULL,'2026-10-13',228.00,NULL,0.00,-1320.00,10.00,'percentage',22.80,100.00,10.00,10.00,0.00,142.80,85.20,85.20,2,0.00,'active',NULL,1,1,'2026-10-13 09:29:39','2026-10-13 09:29:39'),(43,'L-0021','LOCAL-NORMAL','local','normal',1,NULL,'2026-10-13',147.50,NULL,0.00,1720.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,1867.50,247.50,2,0.00,'active',NULL,1,1,'2026-10-13 12:40:33','2026-10-13 12:40:33'),(44,'LC-0017','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-13',68.00,NULL,0.00,0.00,10.00,'percentage',6.80,0.00,0.00,0.00,0.00,6.80,61.20,61.20,2,0.00,'active',NULL,1,1,'2026-10-13 12:42:14','2026-10-13 12:42:14'),(45,'L-0022','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-13',35.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,35.00,0.00,1,35.00,'active',NULL,1,1,'2026-10-13 12:44:53','2026-10-13 12:44:53'),(46,'L-0023','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-13',66.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,66.00,0.00,1,66.00,'active',NULL,1,1,'2026-10-13 12:56:00','2026-10-13 12:56:00'),(47,'L-0024','LOCAL-NORMAL','local','normal',1,NULL,'2026-10-13',50.00,NULL,0.00,1620.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,1670.00,150.00,2,0.00,'active',NULL,1,1,'2026-10-13 13:01:17','2026-10-13 13:01:17'),(48,'L-0025','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-13',25.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,25.00,0.00,1,25.00,'active',NULL,1,1,'2026-10-13 13:01:56','2026-10-13 13:01:56'),(49,'L-0026','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-13',25.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,25.00,0.00,1,25.00,'active',NULL,1,1,'2026-10-13 13:02:40','2026-10-13 13:02:40'),(50,'LC-0018','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-13',250.00,NULL,0.00,0.00,10.00,'percentage',25.00,0.00,0.00,0.00,0.00,25.00,225.00,225.00,2,0.00,'active',NULL,1,1,'2026-10-13 13:04:47','2026-10-13 13:04:47'),(51,'L-0027','LOCAL-NORMAL','local','normal',2,NULL,'2026-10-13',25.00,NULL,0.00,-1320.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,25.00,0.00,1,25.00,'active',NULL,1,1,'2026-10-13 13:08:07','2026-10-13 13:08:07'),(52,'LC-0019','LOCAL-COMMISSION','local','commission',NULL,'acd','2026-10-13',25.00,NULL,0.00,0.00,10.00,'percentage',2.50,0.00,0.00,0.00,0.00,2.50,22.50,0.00,1,22.50,'active',NULL,1,1,'2026-10-13 13:16:07','2026-10-13 13:16:07'),(53,'QS-0005','QUICK','local','quick',NULL,NULL,'2026-10-13',35.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,35.00,35.00,2,0.00,'active',NULL,1,1,'2026-10-13 13:25:21','2026-10-13 13:25:21'),(54,'QS-0006','QUICK','local','quick',NULL,NULL,'2026-10-14',140.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,140.00,140.00,2,0.00,'active',NULL,1,1,'2026-10-14 12:28:01','2026-10-14 12:28:01'),(55,'L-0028','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-14',141.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,141.00,0.00,1,141.00,'active',NULL,1,1,'2026-10-14 12:52:04','2026-10-14 12:52:04'),(56,'L-0029','LOCAL-NORMAL','local','normal',4,NULL,'2026-10-14',148.00,NULL,0.00,100000.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,100148.00,0.00,1,148.00,'active',NULL,1,1,'2026-10-14 13:16:39','2026-10-14 13:16:40'),(57,'L-0030','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-14',25.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,25.00,0.00,1,25.00,'active',NULL,1,1,'2026-10-14 13:19:38','2026-10-14 13:19:38'),(58,'L-0031','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-14',25.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,25.00,0.00,1,25.00,'active',NULL,1,1,'2026-10-14 13:24:05','2026-10-14 13:24:05'),(59,'LC-0020','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-14',25.00,NULL,0.00,0.00,10.00,'percentage',2.50,0.00,0.00,0.00,0.00,2.50,22.50,22.50,2,0.00,'active',NULL,1,1,'2026-10-14 13:32:35','2026-10-14 13:32:35'),(60,'L-0032','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-14',25.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,25.00,0.00,1,25.00,'active',NULL,1,1,'2026-10-14 13:58:47','2026-10-14 13:58:47'),(61,'L-0033','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-14',25.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,25.00,0.00,1,25.00,'active',NULL,1,1,'2026-10-14 14:22:21','2026-10-14 14:22:21'),(62,'L-0034','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-14',25.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,25.00,0.00,1,25.00,'active',NULL,1,1,'2026-10-14 14:22:45','2026-10-14 14:22:45'),(63,'LC-0021','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-14',25.00,NULL,0.00,0.00,10.00,'percentage',2.50,0.00,0.00,0.00,0.00,2.50,22.50,22.50,2,0.00,'active',NULL,1,1,'2026-10-14 14:23:05','2026-10-14 14:23:05'),(64,'L-0035','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-14',25.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,25.00,0.00,1,25.00,'active',NULL,1,1,'2026-10-14 14:31:02','2026-10-14 14:31:02'),(65,'L-0036','LOCAL-NORMAL','local','normal',NULL,NULL,'2026-10-14',25.00,NULL,0.00,0.00,NULL,'percentage',0.00,0.00,0.00,0.00,0.00,0.00,25.00,0.00,1,25.00,'active',NULL,1,1,'2026-10-14 14:37:15','2026-10-14 14:37:15'),(66,'LC-0022','LOCAL-COMMISSION','local','commission',NULL,NULL,'2026-10-14',25.00,NULL,0.00,0.00,10.00,'percentage',2.50,0.00,0.00,0.00,0.00,2.50,22.50,22.50,2,0.00,'active',NULL,1,1,'2026-10-14 14:37:39','2026-10-14 14:37:40');
/*!40000 ALTER TABLE `bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `held_bills`
--

DROP TABLE IF EXISTS `held_bills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `held_bills` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(100) DEFAULT NULL,
  `cart_json` longtext NOT NULL,
  `location_type` enum('local','distant') NOT NULL DEFAULT 'local',
  `bill_type` enum('normal','commission','quick') NOT NULL DEFAULT 'normal',
  `party_id` int DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `held_bills`
--

LOCK TABLES `held_bills` WRITE;
/*!40000 ALTER TABLE `held_bills` DISABLE KEYS */;
/*!40000 ALTER TABLE `held_bills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_ta` varchar(100) NOT NULL,
  `name_en` varchar(100) NOT NULL,
  `code` varchar(20) NOT NULL,
  `unit` varchar(20) NOT NULL DEFAULT 'kg',
  `default_rate` decimal(10,2) DEFAULT NULL,
  `is_charge_item` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (1,'α«ñα«òα»ìα«òα«╛α«│α«┐','Tomato','A','kg',20.00,0,1,'2026-10-09 21:29:11'),(2,'α«╡α»åα«úα»ìα«ƒα»êα«òα»ìα«òα«╛α«»α»ì','Ladies Finger','B','kg',30.00,0,1,'2026-10-09 21:29:11'),(3,'α««α«┐α«│α«òα«╛α«»α»ì','Chilli','C','kg',40.00,0,1,'2026-10-09 21:29:11'),(4,'α«¬α«Üα»ìα«Üα»ê α««α«┐α«│α«òα«╛α«»α»ì','Green Chilli','D','kg',35.00,0,1,'2026-10-09 21:29:11'),(5,'α«òα«░α»üα«╡α»çα«¬α»ìα«¬α«┐α«▓α»ê','Curry Leaves','E','kg',60.00,0,1,'2026-10-09 21:29:11'),(6,'α««α«╛α«Öα»ìα«òα«╛α«»α»ì','Raw Mango','F','kg',25.00,0,1,'2026-10-09 21:29:11'),(7,'α«╡α«░α«┐ α«òα«ñα»ìα«ñα«░α«┐','Striped Brinjal','G','kg',25.00,0,1,'2026-10-09 21:29:11'),(8,'α«òα«ñα»ìα«ñα«░α«┐α«òα»ìα«òα«╛α«»α»ì','Brinjal','H','kg',25.00,0,1,'2026-10-09 21:29:11'),(9,'α«╡α»åα«Öα»ìα«òα«╛α«»α««α»ì','Onion','I','kg',28.00,0,1,'2026-10-09 21:29:11'),(10,'α«òα»èα«ñα»ìα«ñα»ü α«╡α»åα«Öα»ìα«òα«╛α«»α««α»ì','Spring Onion','J','kg',30.00,0,1,'2026-10-09 21:29:11'),(11,'α«ëα«░α»üα«│α»êα«òα»ìα«òα«┐α«┤α«Öα»ìα«òα»ü','Potato','K','kg',22.00,0,1,'2026-10-09 21:29:11'),(12,'α«òα»çα«░α«ƒα»ì','Carrot','L','kg',35.00,0,1,'2026-10-09 21:29:11'),(13,'α«¬α»Çα«⌐α»ìα«╕α»ì','Beans','M','kg',40.00,0,1,'2026-10-09 21:29:11'),(14,'α««α»üα«░α»üα«Öα»ìα«òα»êα«òα»ìα«òα«╛α«»α»ì','Drumstick','N','kg',45.00,0,1,'2026-10-09 21:29:11'),(15,'α««α»üα«░α»üα«Öα»ìα«òα»ê α«çα«▓α»ê','Drumstick Leaves','O','kg',20.00,0,1,'2026-10-09 21:29:11'),(16,'α«àα«╡α«░α»êα«òα»ìα«òα«╛α«»α»ì','Avarai Beans','P','kg',32.00,0,1,'2026-10-09 21:29:11'),(17,'α«¬α«╛α«òα«▒α»ìα«òα«╛α«»α»ì','Bitter Gourd','Q','kg',30.00,0,1,'2026-10-09 21:29:11'),(18,'α«¬α»üα«ƒα«▓α«Öα»ìα«òα«╛α«»α»ì','Ridge Gourd','R','kg',25.00,0,1,'2026-10-09 21:29:11'),(19,'α«¬α»Çα«░α»ìα«òα»ìα«òα«Öα»ìα«òα«╛α«»α»ì','Snake Gourd','S','kg',25.00,0,1,'2026-10-09 21:29:11'),(20,'α«Üα»üα«░α»êα«òα»ìα«òα«╛α«»α»ì','Bottle Gourd','T','kg',20.00,0,1,'2026-10-09 21:29:11'),(21,'α«¬α»éα«Üα«úα«┐α«òα»ìα«òα«╛α«»α»ì','Pumpkin','U','kg',18.00,0,1,'2026-10-09 21:29:11'),(22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd','V','kg',NULL,0,1,'2026-10-09 21:29:11'),(23,'α«╡α»åα«│α»ìα«│α«░α«┐α«òα»ìα«òα«╛α«»α»ì','Cucumber','W','kg',20.00,0,1,'2026-10-09 21:29:11'),(24,'α«òα»ïα«╡α»êα«òα»ìα«òα«╛α«»α»ì','Ivy Gourd','X','kg',30.00,0,1,'2026-10-09 21:29:11'),(25,'α«òα»èα«ñα»ìα«ñα«╡α«░α«Öα»ìα«òα«╛α«»α»ì','Cluster Beans','Y','kg',35.00,0,1,'2026-10-09 21:29:11'),(26,'α««α»üα«│α»ìα«│α«Öα»ìα«òα«┐','Radish','Z','kg',20.00,0,1,'2026-10-09 21:29:11'),(27,'α«¬α»Çα«ƒα»ìα«░α»éα«ƒα»ì','Beetroot','AA','kg',30.00,0,1,'2026-10-09 21:29:11'),(28,'α«òα«╛α«▓α«┐α«âα«¬α«┐α«│α«╡α«░α»ì','Cauliflower','AB','kg',35.00,0,1,'2026-10-09 21:29:11'),(29,'α««α»üα«ƒα»ìα«ƒα»êα«òα»ìα«òα»ïα«╕α»ì','Cabbage','AC','kg',20.00,0,1,'2026-10-09 21:29:11'),(30,'α«òα»èα«ñα»ìα«ñα««α«▓α»ìα«▓α«┐','Coriander Leaves','AD','kg',50.00,0,1,'2026-10-09 21:29:11'),(31,'α«¬α»üα«ñα«┐α«⌐α«╛','Mint Leaves','AE','kg',40.00,0,1,'2026-10-09 21:29:11'),(32,'α«òα»Çα«░α»ê','Greens','AF','kg',20.00,0,1,'2026-10-09 21:29:11'),(33,'α«çα«₧α»ìα«Üα«┐','Ginger','AG','kg',80.00,0,1,'2026-10-09 21:29:11'),(34,'α«¬α»éα«úα»ìα«ƒα»ü','Garlic','AH','kg',90.00,0,1,'2026-10-09 21:29:11'),(35,'α«╡α«╛α«┤α»êα«òα»ìα«òα«╛α«»α»ì','Raw Banana','AI','kg',25.00,0,1,'2026-10-09 21:29:11'),(36,'α«╡α«╛α«┤α»êα«¬α»ìα«¬α»é','Banana Flower','AJ','kg',30.00,0,1,'2026-10-09 21:29:11'),(37,'α«Üα»çα«¬α»ìα«¬α«Öα»ìα«òα«┐α«┤α«Öα»ìα«òα»ü','Colocasia','AK','kg',35.00,0,1,'2026-10-09 21:29:11'),(38,'α««α«░α«╡α«│α»ìα«│α«┐α«òα»ìα«òα«┐α«┤α«Öα»ìα«òα»ü','Tapioca','AL','kg',20.00,0,1,'2026-10-09 21:29:11'),(39,'α«òα«░α»üα«úα»êα«òα»ìα«òα«┐α«┤α«Öα»ìα«òα»ü','Elephant Yam','AM','kg',40.00,0,1,'2026-10-09 21:29:11'),(40,'α««α«₧α»ìα«Üα«│α»ì α«òα«┐α«┤α«Öα»ìα«òα»ü','Raw Turmeric','AN','kg',60.00,0,1,'2026-10-09 21:29:11'),(41,'α«Üα»ïα«│α««α»ì','Sweet Corn','AO','kg',25.00,0,1,'2026-10-09 21:29:11'),(42,'α«¬α«ƒα»ìα«ƒα«╛α«úα«┐','Green Peas','AP','kg',60.00,0,1,'2026-10-09 21:29:11'),(43,'α«▓α«╛α«░α«┐ α«╡α«╛α«ƒα«òα»ê','Lorry Freight','AQ','trip',NULL,1,1,'2026-10-09 21:29:11'),(44,'α«òα»éα«▓α«┐','Cooli','AR','nos',NULL,1,1,'2026-10-09 21:29:11');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ledger_entries`
--

DROP TABLE IF EXISTS `ledger_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ledger_entries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `party_id` int NOT NULL,
  `entry_date` date NOT NULL,
  `ref_type` enum('bill','purchase','payment','opening','adjustment') NOT NULL,
  `ref_id` int DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_ledger_party_date` (`party_id`,`entry_date`),
  CONSTRAINT `ledger_entries_ibfk_1` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ledger_entries`
--

LOCK TABLES `ledger_entries` WRITE;
/*!40000 ALTER TABLE `ledger_entries` DISABLE KEYS */;
INSERT INTO `ledger_entries` VALUES (1,1,'2026-10-09','opening',1,500.00,'Opening balance','2026-10-09 21:36:01'),(2,1,'2026-10-09','bill',1,500.00,'Bill L-0001','2026-10-09 21:36:49'),(3,2,'2026-10-09','bill',2,-1260.00,'Commission bill LC-0001','2026-10-09 21:37:10'),(4,2,'2026-10-09','payment',2,1000.00,'Receipt PAY00001','2026-10-09 21:37:58'),(5,1,'2026-10-09','bill',3,500.00,'Bill L-0002','2026-10-09 21:54:03'),(6,2,'2026-10-09','bill',4,-1260.00,'Commission bill LC-0002','2026-10-09 21:55:12'),(8,3,'2026-10-11','bill',11,-304.00,'Commission bill LC-0005','2026-10-11 08:20:52'),(9,3,'2026-10-11','bill',12,-484.00,'Commission bill LC-0006','2026-10-11 08:20:52'),(10,1,'2026-10-11','bill',15,500.00,'Bill L-0005','2026-10-11 08:21:16'),(11,3,'2026-10-11','bill',10,-278.00,'Commission bill LC-0004','2026-10-11 08:22:02'),(13,3,'2026-10-11','bill',16,-278.00,'Commission bill LC-0007','2026-10-11 08:31:52'),(14,1,'2026-10-12','payment',3,-100.00,'Receipt REC00002','2026-10-12 10:01:34'),(15,2,'2026-10-12','payment',4,100.00,'Receipt PAY00003','2026-10-12 10:02:02'),(16,2,'2026-10-12','purchase',1,100.00,'Purchase PUR-00001','2026-10-12 11:22:06'),(17,1,'2026-10-12','bill',34,-80.00,'Bill L-0015','2026-10-12 15:44:19'),(18,1,'2026-10-12','bill',38,-100.00,'Bill L-0017','2026-10-12 19:05:02'),(19,1,'2026-10-13','bill',43,-100.00,'Bill L-0021','2026-10-13 12:40:33'),(20,1,'2026-10-13','bill',47,-100.00,'Bill L-0024','2026-10-13 13:01:17'),(21,2,'2026-10-13','bill',51,25.00,'Bill L-0027','2026-10-13 13:08:07'),(22,1,'2026-10-13','payment',5,-100.00,'Receipt REC00004','2026-10-13 13:09:01'),(23,4,'2026-10-13','opening',4,100000.00,'Opening balance','2026-10-13 13:13:06'),(24,1,'2026-10-13','payment',6,-100.00,'Receipt REC00005','2026-10-13 13:27:09'),(25,4,'2026-10-14','bill',56,148.00,'Bill L-0029','2026-10-14 13:16:40'),(26,5,'2026-10-14','opening',5,41000.00,'Opening balance','2026-10-14 14:41:05'),(27,5,'2026-10-14','payment',7,-10000.00,'Receipt REC00006','2026-10-14 14:42:45');
/*!40000 ALTER TABLE `ledger_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parties`
--

DROP TABLE IF EXISTS `parties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `place` varchar(150) DEFAULT NULL,
  `type` enum('customer','supplier','both') NOT NULL DEFAULT 'customer',
  `opening_balance` decimal(12,2) NOT NULL DEFAULT '0.00',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parties`
--

LOCK TABLES `parties` WRITE;
/*!40000 ALTER TABLE `parties` DISABLE KEYS */;
INSERT INTO `parties` VALUES (1,'Ravi Kumar','9876543210','Madurai','customer',500.00,1,'2026-10-09 21:36:01'),(2,'Farmer Muthu','9123456780','Theni','supplier',0.00,1,'2026-10-09 21:37:09'),(3,'Test Farmer A','9000000001','Theni','supplier',0.00,1,'2026-10-11 08:20:33'),(4,'ab','','kl','customer',100000.00,1,'2026-10-13 13:13:06'),(5,'AA','','SUR','customer',41000.00,1,'2026-10-14 14:41:05');
/*!40000 ALTER TABLE `parties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_allocations`
--

DROP TABLE IF EXISTS `payment_allocations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_allocations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `payment_id` int NOT NULL,
  `bill_id` int DEFAULT NULL,
  `purchase_id` int DEFAULT NULL,
  `amount` decimal(12,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `payment_id` (`payment_id`),
  KEY `bill_id` (`bill_id`),
  KEY `purchase_id` (`purchase_id`),
  CONSTRAINT `payment_allocations_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE CASCADE,
  CONSTRAINT `payment_allocations_ibfk_2` FOREIGN KEY (`bill_id`) REFERENCES `bills` (`id`),
  CONSTRAINT `payment_allocations_ibfk_3` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_allocations`
--

LOCK TABLES `payment_allocations` WRITE;
/*!40000 ALTER TABLE `payment_allocations` DISABLE KEYS */;
INSERT INTO `payment_allocations` VALUES (2,2,2,NULL,1000.00),(3,3,1,NULL,100.00),(4,4,2,NULL,100.00),(5,5,1,NULL,100.00),(6,6,1,NULL,100.00);
/*!40000 ALTER TABLE `payment_allocations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name_ta` varchar(50) NOT NULL,
  `name_en` varchar(50) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'α«òα«ƒα«⌐α»ì','Credit',1,1,1),(2,'α«¬α«úα««α»ì','Cash',0,1,2),(3,'UPI','UPI',0,1,3),(4,'α«¿α»åα«ƒα»ì α«¬α»çα«Öα»ìα«òα«┐α«Öα»ì','Net Banking',0,1,4);
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receipt_no` varchar(20) NOT NULL,
  `direction` enum('in','out') NOT NULL DEFAULT 'in',
  `party_id` int NOT NULL,
  `payment_date` date NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `payment_method_id` int DEFAULT NULL,
  `allocation_mode` enum('auto','manual','on_account') NOT NULL DEFAULT 'on_account',
  `notes` varchar(255) DEFAULT NULL,
  `status` enum('active','cancelled') NOT NULL DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipt_no` (`receipt_no`),
  KEY `party_id` (`party_id`),
  KEY `payment_method_id` (`payment_method_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (2,'PAY00001','out',2,'2026-10-09',1000.00,2,'auto',NULL,'active',1,'2026-10-09 21:37:58'),(3,'REC00002','in',1,'2026-10-12',100.00,2,'auto','','active',1,'2026-10-12 10:01:33'),(4,'PAY00003','out',2,'2026-10-12',100.00,2,'auto','','active',1,'2026-10-12 10:02:02'),(5,'REC00004','in',1,'2026-10-13',100.00,2,'auto','','active',1,'2026-10-13 13:09:00'),(6,'REC00005','in',1,'2026-10-13',100.00,2,'auto','','active',1,'2026-10-13 13:27:09'),(7,'REC00006','in',5,'2026-10-14',10000.00,2,'auto','','active',1,'2026-10-14 14:42:45');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_lines`
--

DROP TABLE IF EXISTS `purchase_lines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_lines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_id` int NOT NULL,
  `item_id` int DEFAULT NULL,
  `item_name_ta` varchar(100) NOT NULL,
  `item_name_en` varchar(100) NOT NULL,
  `nos` decimal(10,2) NOT NULL DEFAULT '0.00',
  `weight` decimal(10,2) NOT NULL DEFAULT '0.00',
  `rate` decimal(10,2) NOT NULL DEFAULT '0.00',
  `amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `line_order` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `purchase_id` (`purchase_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `purchase_lines_ibfk_1` FOREIGN KEY (`purchase_id`) REFERENCES `purchases` (`id`) ON DELETE CASCADE,
  CONSTRAINT `purchase_lines_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_lines`
--

LOCK TABLES `purchase_lines` WRITE;
/*!40000 ALTER TABLE `purchase_lines` DISABLE KEYS */;
INSERT INTO `purchase_lines` VALUES (1,1,1,'α«ñα«òα»ìα«òα«╛α«│α«┐','Tomato',0.00,0.00,35.00,0.00,0),(2,2,22,'α«╡α»åα«│α»ìα«│α»êα«¬α»ìα«¬α»éα«Üα«úα«┐','Ash Gourd',1.00,1.00,18.00,18.00,0);
/*!40000 ALTER TABLE `purchase_lines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_no` varchar(20) NOT NULL,
  `party_id` int NOT NULL,
  `purchase_date` date NOT NULL,
  `items_total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `discount_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `paid_amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `payment_method_id` int DEFAULT NULL,
  `balance_due` decimal(12,2) NOT NULL DEFAULT '0.00',
  `status` enum('active','cancelled') NOT NULL DEFAULT 'active',
  `created_by` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `purchase_no` (`purchase_no`),
  KEY `party_id` (`party_id`),
  KEY `payment_method_id` (`payment_method_id`),
  CONSTRAINT `purchases_ibfk_1` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`),
  CONSTRAINT `purchases_ibfk_2` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,'PUR-00001',2,'2026-10-12',0.00,0.00,0.00,100.00,1,-100.00,'active',1,'2026-10-12 11:22:05'),(2,'PUR-00002',2,'2026-10-12',18.00,0.00,18.00,18.00,2,0.00,'active',1,'2026-10-12 12:01:41');
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `key` varchar(100) NOT NULL,
  `value` longtext,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('address_line1','α«ñα«┐α«⌐α«Üα«░α«┐ α««α«╛α«░α»ìα«òα»ìα«òα»åα«ƒα»ì'),('address_line2','α«Üα»üα«░α«úα»ìα«ƒα»ê.'),('company_name_en','Sri Bhavani Vegetables & Fruits Commission Agent'),('company_name_ta','α«╕α»ìα«░α»Ç α«¬α«╡α«╛α«⌐α«┐ α«òα«╛α«»α»ìα«òα«⌐α«┐ α«òα««α«┐α«╖α«⌐α»ì α«╡α«┐α«»α«╛α«¬α«╛α«░α««α»ì'),('company_tagline','α«òα«╛α«»α»ìα«òα«⌐α«┐ α«òα««α«┐α«╖α«⌐α»ì α«╡α«┐α«»α«╛α«¬α«╛α«░α««α»ì'),('default_commission_percent','10'),('default_distant_cooli','0'),('default_distant_vadagai','0'),('default_payment_method_id','1'),('default_print_format','a5'),('default_unit','kg'),('email',''),('footer_note','α«¿α«⌐α»ìα«▒α«┐! α««α»Çα«úα»ìα«ƒα»üα««α»ì α«╡α«░α»üα«ò! ΓÇó Thank You! Visit Again!'),('god_name_1','α«╕α»ìα«░α»Ç α«¬α«╡α«╛α«⌐α«┐ α«àα««α»ìα««α«⌐α»ì α«ñα»üα«úα»ê'),('god_name_2','α«╕α»ìα«░α»Ç α«¬α»èα«ƒα»ìα«ƒα«▓α»ì α««α«╛α«ƒα«Üα«╛α««α«┐'),('gstin',''),('gstin_visible','false'),('invoice_language','ta'),('logo_brand','VTC'),('logo_url',''),('phone_numbers','[\"9659580845\", \"9488103983\", \"9789767576\"]'),('proprietor_name','α«¬α«╡α«╛α«⌐α«┐ α«Üα«Öα»ìα«òα«░α»ì'),('rounding_rule','none'),('shop_number','14'),('shop_number_2','15'),('show_logo','true'),('show_previous_balance','true'),('ui_language','ta');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `pin_hash` varchar(255) DEFAULT NULL,
  `role` enum('admin','manager','staff') NOT NULL DEFAULT 'staff',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Admin','admin','$2y$10$6x4ggV7/XCtwaax5qeD0je7A1S.TLoSNmGzFQFbGujdJwCPMzt1U6',NULL,'admin',1,'2026-10-09 21:29:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'veg_pos'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-10-14 22:17:52
