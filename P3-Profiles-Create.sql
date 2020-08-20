create schema project_3_profile_service;
set schema 'project_3_profile_service';

create table profiles (
	"auth0_user_id" text primary key,
	"caliber_user_id" text not null unique,
	"batch_id" text not null, 
	"nickname" text, 
	"pronouns" text, 
	"hobbies" text,
	"fav_foods" text, 
	"special_trait" text unique,
	"degree" text, 
	"fav_language" text,
	"relevant_skills" text, 
	"introvert" boolean, 
	"study_group" boolean
);

--https://medium.com/@pandit.summit/kubernetes-helm-initdb-as-a-job-633f0d1261be