/*
Navicat MySQL Data Transfer

Source Server         : 118.25.184.224
Source Server Version : 50732
Source Host           : 118.25.184.224:3306
Source Database       : zto_personner

Target Server Type    : MYSQL
Target Server Version : 50732
File Encoding         : 65001

Date: 2020-12-19 17:25:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for sh_area
-- ----------------------------
DROP TABLE IF EXISTS `sh_area`;
CREATE TABLE `sh_area` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `pid` int(11) DEFAULT NULL COMMENT '父id',
  `shortname` varchar(100) DEFAULT NULL COMMENT '简称',
  `name` varchar(100) DEFAULT NULL COMMENT '名称',
  `merger_name` varchar(255) DEFAULT NULL COMMENT '全称',
  `level` tinyint(4) DEFAULT NULL COMMENT '层级 0 1 2 省市区县',
  `pinyin` varchar(100) DEFAULT NULL COMMENT '拼音',
  `code` varchar(100) DEFAULT NULL COMMENT '长途区号',
  `zip_code` varchar(100) DEFAULT NULL COMMENT '邮编',
  `first` varchar(50) DEFAULT NULL COMMENT '首字母',
  `lng` varchar(100) DEFAULT NULL COMMENT '经度',
  `lat` varchar(100) DEFAULT NULL COMMENT '纬度',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3750 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for tb_personnel
-- ----------------------------
DROP TABLE IF EXISTS `tb_personnel`;
CREATE TABLE `tb_personnel` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `name` varchar(20) DEFAULT NULL COMMENT '姓名',
  `code` varchar(20) DEFAULT NULL COMMENT '员工Id',
  `idcard` varchar(30) DEFAULT NULL,
  `entry_date` date DEFAULT NULL COMMENT '入职日期',
  `quit_date` date DEFAULT NULL COMMENT '离职日期',
  `job_day` int(11) DEFAULT NULL COMMENT '任职天数',
  `department` varchar(50) DEFAULT NULL COMMENT '部门',
  `post` varchar(20) DEFAULT NULL COMMENT '岗位',
  `post_rank` varchar(20) DEFAULT NULL COMMENT '岗位职级',
  `city` varchar(20) DEFAULT NULL COMMENT '城市',
  `age` int(11) DEFAULT NULL COMMENT '年龄',
  `sex` varchar(10) DEFAULT NULL COMMENT '性别',
  `education` varchar(10) DEFAULT NULL COMMENT '学历',
  `province` varchar(20) DEFAULT NULL COMMENT '省份',
  `type` varchar(20) DEFAULT NULL COMMENT '员工类型',
  `provincial_area` varchar(20) DEFAULT NULL COMMENT '省区',
  `distribution` varchar(20) DEFAULT NULL COMMENT '分拨',
  `quit` varchar(10) NOT NULL DEFAULT '0' COMMENT '是否离职  0在职 1离职',
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=324779 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_personnel_number
-- ----------------------------
DROP TABLE IF EXISTS `tb_personnel_number`;
CREATE TABLE `tb_personnel_number` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `year` int(11) DEFAULT NULL COMMENT '年份',
  `month` varchar(20) DEFAULT NULL COMMENT '月份',
  `quit_num` int(11) DEFAULT NULL COMMENT '月离职人数',
  `quit_rate` decimal(5,2) DEFAULT NULL COMMENT '月离职率%',
  `job_num` int(11) DEFAULT NULL COMMENT '月在职人数',
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=181 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_resource
-- ----------------------------
DROP TABLE IF EXISTS `tb_resource`;
CREATE TABLE `tb_resource` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `is_hide` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `sort` int(11) DEFAULT NULL,
  `source_key` varchar(255) DEFAULT NULL,
  `source_url` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKf5ra2gn0xedeida2op8097sr5` (`parent_id`),
  CONSTRAINT `FKf5ra2gn0xedeida2op8097sr5` FOREIGN KEY (`parent_id`) REFERENCES `tb_resource` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_role`;
CREATE TABLE `tb_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_time` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role_key` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_role_resource
-- ----------------------------
DROP TABLE IF EXISTS `tb_role_resource`;
CREATE TABLE `tb_role_resource` (
  `role_id` int(11) NOT NULL,
  `resource_id` int(11) NOT NULL,
  PRIMARY KEY (`role_id`,`resource_id`),
  KEY `FK868kc8iic48ilv5npa80ut6qo` (`resource_id`),
  CONSTRAINT `FK7ffc7h6obqxflhj1aq1mk20jk` FOREIGN KEY (`role_id`) REFERENCES `tb_role` (`id`),
  CONSTRAINT `FK868kc8iic48ilv5npa80ut6qo` FOREIGN KEY (`resource_id`) REFERENCES `tb_resource` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `delete_status` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `locked` int(11) DEFAULT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for tb_user_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_role`;
CREATE TABLE `tb_user_role` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKea2ootw6b6bb0xt3ptl28bymv` (`role_id`),
  CONSTRAINT `FK7vn3h53d0tqdimm8cp45gc0kl` FOREIGN KEY (`user_id`) REFERENCES `tb_user` (`id`),
  CONSTRAINT `FKea2ootw6b6bb0xt3ptl28bymv` FOREIGN KEY (`role_id`) REFERENCES `tb_role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
