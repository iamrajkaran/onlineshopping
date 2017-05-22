  CREATE TABLE `supplier` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'Supplier id',
    `supplier_email` varchar(20) UNIQUE NOT NULL COMMENT 'Supplier Email',
    `supplier_name` varchar(30) NOT NULL COMMENT 'Supplier Name',
    `password` varchar(30) NOT NULL COMMENT 'Password'
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB;

CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'Product id',
  `supplier_id` int NOT NULL COMMENT 'Product id',
  `product_name` varchar(100) NOT NULL COMMENT 'Product Name',
  `product_description` varchar(100) NOT NULL COMMENT 'Product Description',
  `status` enum('Active','Inactive') NOT NULL COMMENT 'Status: Active or Inactive',
  `created_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' COMMENT 'Created Time',
  `updated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Updated Time',
  CONSTRAINT FK_key FOREIGN KEY (supplier_id) REFERENCES supplier(id) ON DELETE CASCADE ) ENGINE=InnoDB;
 
