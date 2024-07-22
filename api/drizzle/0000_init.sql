CREATE TABLE `logs` (
	`id` serial NOT NULL,
	`namespace` char(128) DEFAULT 'default',
	`topic` char(128) DEFAULT 'default',
	`level` enum('DEBUG','INFO','WARNING','ERROR','CRITICAL') DEFAULT 'INFO',
	`data` json,
	`timestamp` timestamp DEFAULT (now()),
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
);
