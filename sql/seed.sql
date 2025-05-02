-- categorias
drop table if exists questions;
drop table if exists categories;

create table categories (
  id integer  primary key AUTOINCREMENT,
  name text not null
);

insert into categories (name) values 
	 ( "A-I" ),
	 ( "A-IIA" ),
	 ( "A-IIB" ),
	 ( "A-IIIA" ),
	 ( "A-IIIB" ),
	 ( "A-IIIC" ),
	 ( "B-IIA" ),
	 ( "B-IIB" ),
	 ( "B-IIC" );

select * from categories;
--questions

create table questions (
  id text unique primary key,
  category_id integer not null,
  image text,
  statement text not null,
  explanation text,
  alternatives text not null,
  question_type text not null,
  correct_answer text not null,
  foreign key (category_id) references categories (id)
);

insert into questions(
  id, category_id, image, statement, alternatives, question_type, correct_answer) values(
  "5a530c76f2ea9f88053d9419b90d2f4c9382653bb7ba31a15b2876c51247d58c",
  1,
  "/transito/IIIC/36-105.jpg",
  "Los rótulos que identifican al material peligroso como radioactivo son: ",
  "1. Radioactivo, 2. Radioactivo, 3. Radioactivo, 4. Radioactivo",
  "SPECIFIC",
  "A" 
  );

select * from questions;
