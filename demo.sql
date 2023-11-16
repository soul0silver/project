-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: demo
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `id` int NOT NULL AUTO_INCREMENT,
  `province` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'Ha Noi'),(2,'Hai Phong'),(3,'Quang Ninh');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
INSERT INTO `brand` VALUES (1,'apple'),(2,'samsung'),(3,'sony');
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `cname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `category_cname_uindex` (`cname`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'smart phone');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'red'),(2,'black'),(3,'white'),(4,'gray'),(5,'gold'),(6,'blue'),(7,'pink');
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `eid` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `lastname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `birthday` date NOT NULL,
  `phone` varchar(10) NOT NULL,
  `store` int NOT NULL,
  `identification` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `avatar` longtext,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `status` int NOT NULL,
  `aid` int DEFAULT NULL,
  `salary` double DEFAULT NULL,
  PRIMARY KEY (`eid`),
  UNIQUE KEY `employee_phone_uindex` (`phone`),
  UNIQUE KEY `employee_identification_uindex` (`identification`),
  UNIQUE KEY `employee_email_uindex` (`email`),
  KEY `employee_address_fk` (`aid`),
  CONSTRAINT `employee_address_fk` FOREIGN KEY (`aid`) REFERENCES `address` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'nguyen','dat','1998-08-19','0325826525',1,'022098001206',NULL,NULL,1,1,1),(2,'d','d','0009-05-15','0311111111',2,'0311111111','https://i.imgur.com/HtVvsrF.jpg','da@gg.co',2,2,0),(4,'dd','s','0031-04-15','0311111112',2,'0311111112','https://i.imgur.com/5SnONEY.jpg','fff@gg.com',1,1,0),(6,'s','s','0031-04-13','0311111115',2,'0311111114','https://i.imgur.com/o1Fuqpu.png','f3f@gg.com',1,1,0),(7,'dd','s','0031-04-15','0311111116',2,'0311111115','https://i.imgur.com/UZBcUB0.jpg','v3f@gg.com',1,1,0),(8,'s','s','0037-04-13','0811111111',1,'0811111111','','ggg@gg.co',1,1,0),(9,'d','d','0037-04-14','0911111111',1,'0911111111','','fb@gg.co',1,1,0),(10,'d','d','0008-05-15','0823222222',1,'0823222222','','34@g.com',2,2,2),(11,'h','h','0022-04-14','0823222223',1,'0823222223','','ss@g.co',1,1,1),(12,'s','s','0007-05-15','0823222225',1,'0823222225','','fd@g.com',1,1,3),(13,'a','a','0033-04-07','0823222227',1,'0823222227','https://i.imgur.com/xTlaBJM.png','gh@g.co',1,1,0),(14,'s','s','0031-04-14','0823222228',2,'0823222228','','uh@gg.co',1,1,0),(15,'sa','sa','0018-04-15','0911111112',1,'0911111112','','dat@gg.co',1,1,3),(18,'sa','sa','0018-04-12','0911111114',1,'0911111114','https://i.imgur.com/7aY8L7A.png','dt@gg.co',1,1,3),(19,'cc','cc','2023-10-31','0999999990',1,'0999999990','','do@g.com',1,1,0),(20,'dd','ee','2023-10-20','0999999991',1,'0999999991','','cc@g.com',1,2,0),(21,'bb','bb','2023-09-26','0344444444',1,'0344444444','https://i.imgur.com/aEDqQaC.png','bb@g.comm',1,2,3),(23,'ee','ee','2023-10-11','0344444445',1,'0344444445','https://i.imgur.com/AZaNWET.png','gg@g.co',1,1,0),(24,'fa','fa','2023-11-04','0344444449',1,'0344444449','https://i.imgur.com/ybmMXRG.png','kk@c.co',1,2,0),(25,'s','s','2023-10-29','0844444444',1,'0844444444','','co@g.co',1,1,0),(26,'qq','qq','2023-10-06','0900000000',1,'0900000000','','ll@g.co',1,1,0),(28,'qq','qq','2023-10-06','0900000001',1,'0900000001','https://i.imgur.com/Wo4FxJU.png','ll@g.com',1,1,0),(29,'e','e','2023-10-02','0355555555',2,'0355555555','https://i.imgur.com/z8zhfP1.png','ppp@g.com',1,2,0),(30,'d','e','2023-10-03','0355555557',2,'0355555557','https://i.imgur.com/y3iHoUP.png','pep@g.com',1,2,0),(31,'d','e','2023-10-03','0355555558',2,'0355555558','https://i.imgur.com/y3iHoUP.png','prp@g.com',1,2,0),(32,'s','q','2023-10-12','0399999999',2,'0399999999','https://i.imgur.com/y5PNDMe.png','ca@gg.co',1,1,0);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_token`
--

DROP TABLE IF EXISTS `password_reset_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `expiration` date NOT NULL,
  `uid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `password_reset_token_user_uid_fk` (`uid`),
  CONSTRAINT `password_reset_token_user_uid_fk` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_token`
--

LOCK TABLES `password_reset_token` WRITE;
/*!40000 ALTER TABLE `password_reset_token` DISABLE KEYS */;
INSERT INTO `password_reset_token` VALUES (17,'731886','2023-10-04',6);
/*!40000 ALTER TABLE `password_reset_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price` (
  `id` int NOT NULL AUTO_INCREMENT,
  `color` int DEFAULT NULL,
  `pid` int DEFAULT NULL,
  `rom` int DEFAULT NULL,
  `priceim` decimal(10,0) DEFAULT NULL,
  `pricesel` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `price_color_id_fk` (`color`),
  KEY `price_rom_id_fk` (`rom`),
  KEY `price_product_details_pid_fk` (`pid`),
  CONSTRAINT `price_color_id_fk` FOREIGN KEY (`color`) REFERENCES `color` (`id`),
  CONSTRAINT `price_product_details_pid_fk` FOREIGN KEY (`pid`) REFERENCES `product` (`pid`),
  CONSTRAINT `price_rom_id_fk` FOREIGN KEY (`rom`) REFERENCES `rom` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price`
--

LOCK TABLES `price` WRITE;
/*!40000 ALTER TABLE `price` DISABLE KEYS */;
INSERT INTO `price` VALUES (2,1,1,1,1,1),(4,1,3,1,1,2),(5,3,3,1,2,2);
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `description` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `image` longtext,
  `ram` int DEFAULT NULL,
  `cpu` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `rcamera` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `battery` int DEFAULT NULL,
  `charge` double DEFAULT NULL,
  `screen` decimal(10,0) DEFAULT NULL,
  `resolution` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `screenratio` varchar(50) DEFAULT NULL,
  `scanfrequency` int DEFAULT NULL,
  `brightness` decimal(10,0) DEFAULT NULL,
  `glass` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `gpu` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `fcamera` int DEFAULT NULL,
  `os` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `card` int DEFAULT NULL,
  `brand` int DEFAULT NULL,
  `category` int DEFAULT NULL,
  `pname` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `status` int DEFAULT NULL,
  `supplier` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `product_pname_uindex` (`pname`),
  KEY `product_details_brand_id_fk` (`brand`),
  KEY `product_details_category_cid_fk` (`category`),
  KEY `product_status_sid_fk` (`status`),
  KEY `product_supplier_id_fk` (`supplier`),
  CONSTRAINT `product_details_brand_id_fk` FOREIGN KEY (`brand`) REFERENCES `brand` (`id`),
  CONSTRAINT `product_details_category_cid_fk` FOREIGN KEY (`category`) REFERENCES `category` (`cid`),
  CONSTRAINT `product_status_sid_fk` FOREIGN KEY (`status`) REFERENCES `status` (`sid`),
  CONSTRAINT `product_supplier_id_fk` FOREIGN KEY (`supplier`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'111','https://i.imgur.com/MEIIrBN.jpg',1,'1','111',1,10,1,'1111x11111','11:1',90,1,'11','1',1,'11',0,1,1,'iphone 15',2,'NCC003'),(3,'ss','https://i.imgur.com/EO2SCvZ.png',1,'11','11',1,1,1,'1111x1111','11:1',90,1,'11','1',1,'11',1,1,1,'iphone 5',1,'NCC002');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quantity`
--

DROP TABLE IF EXISTS `quantity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quantity` (
  `qid` int NOT NULL AUTO_INCREMENT,
  `price` int DEFAULT NULL,
  `store` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`qid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quantity`
--

LOCK TABLES `quantity` WRITE;
/*!40000 ALTER TABLE `quantity` DISABLE KEYS */;
INSERT INTO `quantity` VALUES (1,2,1,0),(2,2,2,0),(3,2,3,0),(5,4,1,0),(6,4,2,0),(7,4,3,0),(8,5,1,0),(9,5,2,0),(10,5,3,0);
/*!40000 ALTER TABLE `quantity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt` (
  `id` varchar(6) NOT NULL,
  `date_in` date DEFAULT NULL,
  `supplier` varchar(6) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `deliver` int DEFAULT NULL,
  `store` int DEFAULT NULL,
  `date_create` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `receipt_id_uindex` (`id`),
  KEY `receipt_supplier_id_fk` (`supplier`),
  KEY `receipt_store_id_fk` (`store`),
  CONSTRAINT `receipt_store_id_fk` FOREIGN KEY (`store`) REFERENCES `store` (`id`),
  CONSTRAINT `receipt_supplier_id_fk` FOREIGN KEY (`supplier`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES ('0','2023-11-16','NCC002',_binary '\0',1,1,'2023-11-16 00:00:00'),('IMP002','2023-11-16','NCC003',_binary '\0',1,1,'2023-11-16 00:00:00');
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receipt_details`
--

DROP TABLE IF EXISTS `receipt_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `receiptid` varchar(6) NOT NULL,
  `stock` int NOT NULL,
  `quantity` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `receipt_details_receipt_id_fk` (`receiptid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt_details`
--

LOCK TABLES `receipt_details` WRITE;
/*!40000 ALTER TABLE `receipt_details` DISABLE KEYS */;
INSERT INTO `receipt_details` VALUES (1,'0',1,5),(2,'0',5,3),(3,'0',1,6),(4,'0',5,4),(5,'IMP002',1,6),(6,'IMP002',5,4);
/*!40000 ALTER TABLE `receipt_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `rid` int NOT NULL AUTO_INCREMENT,
  `rname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`rid`),
  UNIQUE KEY `role_rname_uindex` (`rname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'admin'),(3,'manager'),(2,'user');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rom`
--

DROP TABLE IF EXISTS `rom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rom`
--

LOCK TABLES `rom` WRITE;
/*!40000 ALTER TABLE `rom` DISABLE KEYS */;
INSERT INTO `rom` VALUES (1,64),(2,128),(3,256),(4,512);
/*!40000 ALTER TABLE `rom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `sid` int NOT NULL AUTO_INCREMENT,
  `sname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`sid`),
  UNIQUE KEY `status_sname_uindex` (`sname`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'in stock'),(4,'incoming'),(2,'out stock'),(3,'stop business');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store`
--

DROP TABLE IF EXISTS `store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `store_name_uindex` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store`
--

LOCK TABLES `store` WRITE;
/*!40000 ALTER TABLE `store` DISABLE KEYS */;
INSERT INTO `store` VALUES (1,'Ha Noi'),(2,'Hai Phong'),(3,'Quang Ninh');
/*!40000 ALTER TABLE `store` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `id` varchar(6) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `supplier_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES ('NCC001','NCC1',NULL,NULL,_binary ''),('NCC002','NCC2',NULL,NULL,_binary ''),('NCC003','NCC3','0900077777','abc@gmail.com',_binary ''),('NCC004','NCC4','0311111111','CCC@gmail.com',_binary '');
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `eid` int DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  PRIMARY KEY (`uid`),
  KEY `user_employee_fk` (`eid`),
  CONSTRAINT `user_employee_fk` FOREIGN KEY (`eid`) REFERENCES `employee` (`eid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (6,'datmkqn','$2a$10$nLJcfwPGU5PofrG4AtIf9uV07A8tGVi0FH7c4MoU0qnR0nA58Sw0y',1,'aaabb');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` int NOT NULL,
  `rid` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_role_user_uid_fk` (`uid`),
  KEY `user_role_role_rid_fk` (`rid`),
  CONSTRAINT `user_role_role_rid_fk` FOREIGN KEY (`rid`) REFERENCES `role` (`rid`),
  CONSTRAINT `user_role_user_uid_fk` FOREIGN KEY (`uid`) REFERENCES `user` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,6,1),(2,6,2),(3,6,3);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-16 13:52:07
