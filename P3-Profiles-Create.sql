create schema project_3_profile_service;
set schema 'project_3_profile_service';

create table profiles (
	"user_id" int --need to check if this is really and int and how to relate it (fk, etc.)
	"batch_id" int --check
	"nickname" text 
	"pronouns" text 
	"hobbies" text
	"fav_foods" text 
	"special_trait" text unique
	"degree" text not null
	"fav_language" text
	"relevant_skills" text 
	"extrovert" boolean 
	"study_group" boolean 
);

--https://medium.com/@pandit.summit/kubernetes-helm-initdb-as-a-job-633f0d1261be