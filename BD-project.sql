-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bookshop-of-dreams
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bookshop-of-dreams
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bookshop-of-dreams` DEFAULT CHARACTER SET utf8mb3 ;
USE `bookshop-of-dreams` ;

-- -----------------------------------------------------
-- Table `bookshop-of-dreams`.`books`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshop-of-dreams`.`books` (
  `id_books` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(120) NULL DEFAULT NULL,
  `author` VARCHAR(80) NULL DEFAULT NULL,
  `publishing_company` VARCHAR(80) NULL DEFAULT NULL,
  `edition` VARCHAR(80) NULL DEFAULT NULL,
  `synopsis` TEXT NULL DEFAULT NULL,
  `front_cover` VARCHAR(300) NULL DEFAULT NULL,
  `genre` VARCHAR(120) NULL DEFAULT NULL,
  `kindle_price` FLOAT NULL DEFAULT NULL,
  `common_price` FLOAT NULL DEFAULT NULL,
  `special_price` FLOAT NULL DEFAULT NULL,
  `publication_date` VARCHAR(50) NULL DEFAULT NULL,
  `dimensions` VARCHAR(120) NULL DEFAULT NULL,
  `number_pages` INT NULL DEFAULT NULL,
  `inventory` INT NULL DEFAULT NULL,
  `language` VARCHAR(45) NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_books`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bookshop-of-dreams`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshop-of-dreams`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(300) NOT NULL,
  `username` VARCHAR(120) NOT NULL,
  `user_avatar` VARCHAR(120) NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 11
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bookshop-of-dreams`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshop-of-dreams`.`cart` (
  `id_cart` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `fk_id_books` INT NOT NULL,
  `fk_id_user` INT NOT NULL,
  PRIMARY KEY (`id_cart`),
  INDEX `fk_cart_books1_idx` (`fk_id_books` ASC) VISIBLE,
  INDEX `fk_cart_users1_idx` (`fk_id_user` ASC) VISIBLE,
  CONSTRAINT `fk_cart_books1`
    FOREIGN KEY (`fk_id_books`)
    REFERENCES `bookshop-of-dreams`.`books` (`id_books`),
  CONSTRAINT `fk_cart_users1`
    FOREIGN KEY (`fk_id_user`)
    REFERENCES `bookshop-of-dreams`.`users` (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bookshop-of-dreams`.`cred_card`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshop-of-dreams`.`cred_card` (
  `id_cred_card` INT NOT NULL AUTO_INCREMENT,
  `number` VARCHAR(25) NOT NULL,
  `card_name` VARCHAR(80) NOT NULL,
  `card_cv` VARCHAR(3) NOT NULL,
  `card_validity` VARCHAR(5) NOT NULL,
  `fk_id_user` INT NOT NULL,
  PRIMARY KEY (`id_cred_card`),
  INDEX `fk_cred_cart_users1_idx` (`fk_id_user` ASC) VISIBLE,
  CONSTRAINT `fk_cred_cart_users1`
    FOREIGN KEY (`fk_id_user`)
    REFERENCES `bookshop-of-dreams`.`users` (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bookshop-of-dreams`.`user_information`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshop-of-dreams`.`user_information` (
  `id_user_information` INT NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(120) NULL DEFAULT NULL,
  `email` VARCHAR(80) NULL DEFAULT NULL,
  `telephone` VARCHAR(25) NULL DEFAULT NULL,
  `birth_date` VARCHAR(10) NULL DEFAULT NULL,
  `user_cpf` VARCHAR(11) NULL DEFAULT NULL,
  `user_cpnj` VARCHAR(14) NULL DEFAULT NULL,
  `city` VARCHAR(20) NULL DEFAULT NULL,
  `state` VARCHAR(20) NULL DEFAULT NULL,
  `district` VARCHAR(30) NULL DEFAULT NULL,
  `road` VARCHAR(30) NULL DEFAULT NULL,
  `complements` VARCHAR(35) NULL DEFAULT NULL,
  `fk_id_user` INT NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_user_information`),
  INDEX `fk_user_information_users_idx` (`fk_id_user` ASC) VISIBLE,
  CONSTRAINT `fk_user_information_users`
    FOREIGN KEY (`fk_id_user`)
    REFERENCES `bookshop-of-dreams`.`users` (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bookshop-of-dreams`.`delivery`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshop-of-dreams`.`delivery` (
  `id_delivery` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(30) NULL DEFAULT NULL,
  `fk_id_user_information` INT NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id_delivery`),
  INDEX `fk_delivery_user_information1_idx` (`fk_id_user_information` ASC) VISIBLE,
  CONSTRAINT `fk_delivery_user_information1`
    FOREIGN KEY (`fk_id_user_information`)
    REFERENCES `bookshop-of-dreams`.`user_information` (`id_user_information`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bookshop-of-dreams`.`requests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshop-of-dreams`.`requests` (
  `id_requests` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NULL DEFAULT NULL,
  `fk_id_users` INT NOT NULL,
  `fk_id_books` INT NOT NULL,
  PRIMARY KEY (`id_requests`),
  INDEX `fk_demanded_users1_idx` (`fk_id_users` ASC) VISIBLE,
  INDEX `fk_id_books_idx` (`fk_id_books` ASC) VISIBLE,
  CONSTRAINT `fk_id_users`
    FOREIGN KEY (`fk_id_users`)
    REFERENCES `bookshop-of-dreams`.`users` (`id_user`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bookshop-of-dreams`.`shopping_cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshop-of-dreams`.`shopping_cart` (
  `id_shopping_cart` INT NOT NULL AUTO_INCREMENT,
  `purchase_value` DECIMAL(10,0) NOT NULL,
  `unit_price` DECIMAL(10,0) NOT NULL,
  `type_selected` VARCHAR(45) NOT NULL,
  `qtd_products` INT NOT NULL,
  `fk_id_cart` INT NOT NULL,
  `createdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  `fk_id_request` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id_shopping_cart`),
  INDEX `fk_id_demanded_idx` (`fk_id_cart` ASC) VISIBLE,
  INDEX `fk_id_request_idx` (`fk_id_request` ASC) VISIBLE,
  CONSTRAINT `fk_id_request`
    FOREIGN KEY (`fk_id_request`)
    REFERENCES `bookshop-of-dreams`.`requests` (`id_requests`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `bookshop-of-dreams`.`payment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookshop-of-dreams`.`payment` (
  `id_payment` INT NOT NULL AUTO_INCREMENT,
  `purchase_value` FLOAT NULL DEFAULT NULL,
  `payment_form` VARCHAR(45) NULL DEFAULT NULL,
  `payment_authorized` VARCHAR(45) NULL DEFAULT NULL,
  `fk_id_shopping_cart` INT NOT NULL,
  `createtdAt` TIMESTAMP NULL DEFAULT NULL,
  `updatedAt` TIMESTAMP NULL DEFAULT NULL,
  `deletedAt` TIMESTAMP NULL DEFAULT NULL,
  `fk_id_delivery` INT NULL DEFAULT NULL,
  `paymentcol` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_payment`),
  INDEX `fk_payment_shopping_cart1_idx` (`fk_id_shopping_cart` ASC) VISIBLE,
  INDEX `fk_id_delivery_idx` (`fk_id_delivery` ASC) VISIBLE,
  CONSTRAINT `fk_id_delivery`
    FOREIGN KEY (`fk_id_delivery`)
    REFERENCES `bookshop-of-dreams`.`delivery` (`id_delivery`),
  CONSTRAINT `fk_payment_shopping_cart1`
    FOREIGN KEY (`fk_id_shopping_cart`)
    REFERENCES `bookshop-of-dreams`.`shopping_cart` (`id_shopping_cart`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
