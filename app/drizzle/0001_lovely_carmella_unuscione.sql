CREATE TABLE `app_account` (
	`user_id` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`provider_account_id` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `app_account_provider_provider_account_id_pk` PRIMARY KEY(`provider`,`provider_account_id`)
);
--> statement-breakpoint
CREATE TABLE `app_finegrained_token_namespace` (
	`token_id` bigint NOT NULL,
	`namespace_id` bigint NOT NULL,
	CONSTRAINT `app_finegrained_token_namespace_token_id_namespace_id_pk` PRIMARY KEY(`token_id`,`namespace_id`)
);
--> statement-breakpoint
CREATE TABLE `app_finegrained_token` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`token` varchar(24),
	`project_id` bigint,
	CONSTRAINT `app_finegrained_token_id` PRIMARY KEY(`id`),
	CONSTRAINT `app_finegrained_token_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `app_log` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`namespace_id` bigint NOT NULL,
	`message` text,
	`level` enum('debug','info','warning','error','critical') NOT NULL,
	`timestamp` timestamp NOT NULL,
	CONSTRAINT `app_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `app_namespace` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`project_id` bigint NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `app_namespace_id` PRIMARY KEY(`id`),
	CONSTRAINT `namespace_name_unique` UNIQUE(`project_id`,`name`)
);
--> statement-breakpoint
CREATE TABLE `app_project_token` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`token` varchar(24),
	`project_id` bigint,
	CONSTRAINT `app_project_token_id` PRIMARY KEY(`id`),
	CONSTRAINT `app_project_token_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `app_project` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`owner_id` varchar(255) NOT NULL,
	`description` text,
	CONSTRAINT `app_project_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `app_session` (
	`session_token` varchar(255) NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `app_session_session_token` PRIMARY KEY(`session_token`)
);
--> statement-breakpoint
CREATE TABLE `app_user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`email_verified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `app_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `app_verification_token` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `app_verification_token_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
ALTER TABLE `app_account` ADD CONSTRAINT `app_account_user_id_app_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `app_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `app_finegrained_token_namespace` ADD CONSTRAINT `app_finegrained_token_namespace_token_id_app_finegrained_token_id_fk` FOREIGN KEY (`token_id`) REFERENCES `app_finegrained_token`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `app_finegrained_token_namespace` ADD CONSTRAINT `app_finegrained_token_namespace_namespace_id_app_namespace_id_fk` FOREIGN KEY (`namespace_id`) REFERENCES `app_namespace`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `app_finegrained_token` ADD CONSTRAINT `app_finegrained_token_project_id_app_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `app_project`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `app_log` ADD CONSTRAINT `app_log_namespace_id_app_namespace_id_fk` FOREIGN KEY (`namespace_id`) REFERENCES `app_namespace`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `app_namespace` ADD CONSTRAINT `app_namespace_project_id_app_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `app_project`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `app_project_token` ADD CONSTRAINT `app_project_token_project_id_app_project_id_fk` FOREIGN KEY (`project_id`) REFERENCES `app_project`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `app_project` ADD CONSTRAINT `app_project_owner_id_app_user_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `app_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `app_session` ADD CONSTRAINT `app_session_user_id_app_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `app_user`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `account_user_id_idx` ON `app_account` (`user_id`);--> statement-breakpoint
CREATE INDEX `session_user_id_idx` ON `app_session` (`user_id`);