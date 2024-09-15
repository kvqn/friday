create database friday;

use friday;

create table namespace (
	id int unsigned auto_increment primary key ,
	name char(100) not null unique
);

create table topic (
	id int unsigned primary key auto_increment,
	name char(100) not null unique
);

create table namespace_topic (
	id int unsigned primary key auto_increment,
	namespace_id int unsigned,
	topic_id int unsigned,
	foreign key (namespace_id) references namespace(id) on update cascade on delete restrict,
	foreign key (topic_id) references topic(id) on update cascade on delete restrict,
	unique (namespace_id, topic_id)
);

create table log (
	id bigint unsigned auto_increment primary key,
	timestamp timestamp not null default current_timestamp,
	namespace_topic_id int unsigned not null,
	level enum('DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL') not null,
	data text not null,
	foreign key (namespace_topic_id) references namespace_topic(id) on update cascade on delete restrict
);
