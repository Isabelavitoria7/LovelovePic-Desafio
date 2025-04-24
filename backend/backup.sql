-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: lovelovepic
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `images_user_id_foreign` (`user_id`),
  CONSTRAINT `images_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,1,'uploads/1744208647_67f68307a8a84.jpg','2025-04-09 11:24:07','2025-04-09 11:24:07'),(2,1,'uploads/1744208652_67f6830c1bb81.jpg','2025-04-09 11:24:12','2025-04-09 11:24:12'),(3,1,'uploads/1744208652_67f6830c35ad3.jpg','2025-04-09 11:24:12','2025-04-09 11:24:12'),(4,2,'uploads/1744308415_67f808bf3efc9.jpg','2025-04-10 15:06:55','2025-04-10 15:06:55'),(5,2,'uploads/1744308415_67f808bf6fa46.jpg','2025-04-10 15:06:55','2025-04-10 15:06:55'),(6,2,'uploads/1744308449_67f808e1f2b20.jpg','2025-04-10 15:07:30','2025-04-10 15:07:30'),(7,4,'uploads/1744336352_67f875e07da2f.jpg','2025-04-10 22:52:32','2025-04-10 22:52:32'),(8,4,'uploads/1744336352_67f875e09d72f.jpg','2025-04-10 22:52:32','2025-04-10 22:52:32'),(9,4,'uploads/1744336352_67f875e0a54e8.jpg','2025-04-10 22:52:32','2025-04-10 22:52:32'),(10,4,'uploads/1744336548_67f876a4695b5.jpg','2025-04-10 22:55:48','2025-04-10 22:55:48'),(11,4,'uploads/1744336551_67f876a756802.jpg','2025-04-10 22:55:51','2025-04-10 22:55:51'),(12,4,'uploads/1744336551_67f876a7e30b6.jpg','2025-04-10 22:55:51','2025-04-10 22:55:51'),(13,1,'uploads/1744373872_67f9087068114.png','2025-04-11 09:17:52','2025-04-11 09:17:52'),(14,1,'uploads/1744376614_67f91326d5ada.png','2025-04-11 10:03:34','2025-04-11 10:03:34'),(15,5,'uploads/1744378704_67f91b50534fa.jpeg','2025-04-11 10:38:24','2025-04-11 10:38:24'),(16,5,'uploads/1744378704_67f91b509903c.jpeg','2025-04-11 10:38:24','2025-04-11 10:38:24'),(17,5,'uploads/1744378704_67f91b50bc539.jpeg','2025-04-11 10:38:24','2025-04-11 10:38:24'),(18,5,'uploads/1744378761_67f91b8939346.png','2025-04-11 10:39:21','2025-04-11 10:39:21'),(19,5,'uploads/1744378761_67f91b8979a42.png','2025-04-11 10:39:21','2025-04-11 10:39:21'),(20,5,'uploads/1744378761_67f91b8981161.png','2025-04-11 10:39:21','2025-04-11 10:39:21');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2025_04_08_213755_create_users_table',1),(2,'2025_04_08_220937_create_images_table',1),(3,'2025_04_08_224204_create_sessions_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('D2BfGNRJuJyhyQOsBLczKlRI0NuQffv1Isa4PqPS',NULL,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoiUjlXblBFUUhaV2NiWDZaNE5vd0hRQUdWeGpCQVVQbVNZVnJQOVRuaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzI6Imh0dHA6Ly9sb2NhbGhvc3QvdGVzdGUtc2VuZEltYWdlIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==',1744208737),('H3IzvmZutsNMS99dpSEpthR88CGWdogUOn7kGqAn',NULL,'172.18.0.1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36','YTozOntzOjY6Il90b2tlbiI7czo0MDoieG11R3kxNDU1YWxIdFlmSm9EbW12OFhTTHIyUWVEcGpEUkt0VGROWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTY6Imh0dHA6Ly9sb2NhbGhvc3QiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19',1744163351);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameCasal` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tempo` date DEFAULT NULL,
  `text` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Isabela','isabelavitoriabarroso2004@gmail.com','$2y$12$pzjtUD8QraceSvQrhm1H9OsVvxjGQDnmrpYwGfbsDKh7b6USEs5W6','Isabela Junior','2019-04-10','Lorem Ipsum is simply dummy text of the printing and typesetting industry.','2025-04-09 11:20:47','2025-04-09 11:23:58'),(2,'Silvia','silviabarrosobranco@gmail.com','$2y$12$SLZ/ZFhpjxTqQBH0hekAjOsIkfkcpemR4fBxNw5j.Kt85ZMojb9YG','Silvia e teste','2018-04-10','oioioioioioioioioioio','2025-04-10 15:05:21','2025-04-10 15:06:50'),(3,'Grrwelrfsl','kfdskf@gmail.com','$2y$12$wXRLmdXIM6yH4Ti30RCu1Oeg/apLRS27UwggYA8nhgVBafrjvIkEe',NULL,NULL,NULL,'2025-04-10 22:43:02','2025-04-10 22:43:02'),(4,'Gean','gean.developer.07@gmail.com','$2y$12$hIRLBT/nTrTkrdabSdQWkejidU76uSWtznC2lelsPmXt9aWqTPYT2','casal feliz','2025-04-11','DDJSADJSAJDSAJDSAJDSDIJIJDASIJDIJAS','2025-04-10 22:49:39','2025-04-10 22:52:25'),(5,'Lunari','calcadoslunari@gmail.com','$2y$12$1tuENFFqiYqiVJ9akXHFleZwcNgPfLwsSgwwdnmLFRddkfwWuCKnO','Lunari teste','2019-04-11','Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the indu','2025-04-11 10:05:54','2025-04-11 10:38:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-13 23:59:48
