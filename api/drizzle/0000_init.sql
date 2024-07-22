CREATE TABLE `logs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`namespace` char(128) NOT NULL DEFAULT 'default',
	`topic` char(128) NOT NULL DEFAULT 'default',
	`level` enum('DEBUG','INFO','WARNING','ERROR','CRITICAL') NOT NULL DEFAULT 'INFO',
	`data` json,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
);
