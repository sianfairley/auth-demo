DROP TABLE IF EXISTS `users`; 

CREATE TABLE `users`(
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL, 
	username VARCHAR(30) NOT NULL, 
	password VARCHAR(200) NOT NULL, 
	email VARCHAR(200) NOT NULL, 
	PRIMARY KEY (id)
);

-- user1 has password pass1 (etc)
-- INSERT INTO `users` (name, username, password, email)
-- VALUES 
--     ('anna', 'user1','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W','user1@acme.com'),
--     ('jim', 'user2','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6','user2@acme.com'),
--     ('sofia', 'user3','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy','user3@acme.com');