CREATE TABLE `logs` (
	`id` serial NOT NULL,
	`namespace` char(128) NOT NULL DEFAULT 'default',
	`topic` char(128) NOT NULL DEFAULT 'default',
	`level` enum('DEBUG','INFO','WARNING','ERROR','CRITICAL') NOT NULL DEFAULT 'INFO',
	`data` text,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `logs_id` PRIMARY KEY(`id`)
);
