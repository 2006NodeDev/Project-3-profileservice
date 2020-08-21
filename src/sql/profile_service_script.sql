drop schema if exists project_3_profile_service cascade;
create schema project_3_profile_service;
set schema 'project_3_profile_service';

create table profiles (
	"auth0_user_id" text primary key,
	"email" text not null unique,
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

insert into project_3_profile_service.profiles("auth0_user_id", "email", "batch_id", "nickname", "pronouns", "hobbies", "fav_foods", "special_trait", "degree", "fav_language", "relevant_skills", "introvert", "study_group")
                              values ('auth1', 'user1@revature.net', '1', 'user1', 'she/her', 'reading, writing', 'steak, pasta', 'awesome', 'art', 'java', 'fast learner', false, true),
                              		 ('auth2', 'user2@revature.net', '2', 'user2', 'he/him', 'singing, dancing', 'fruit, veggies', 'cool', 'science', 'python', 'punctual', true, true),
                              		 ('auth3', 'user3@revature.net', '3', 'user3', 'they/them', 'running, jumping', 'seafood, pasta', 'nice', 'business', 'js', 'responsible', false, false);
                              		 
select * from profiles;                              		