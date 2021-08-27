CREATE TABLE class(
id INT PRIMARY KEY NOT NULL auto_increment,
name  varchar(255) NOT NULL,
type enum("integral","noturno") not null,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
module enum("0","1","2","3","4","5","6","7") NOT NULL default "0"
);

CREATE TABLE student(
id INT NOT NULL PRIMARY KEY auto_increment,
name varchar(50) not null,
email varchar(50) not null unique,
birth_date date not null,
class_id int NOT NULL default "0",
foreign key(class_id) references class(id)
);

CREATE TABLE teacher(
id INT NOT NULL PRIMARY KEY auto_increment,
name varchar(50) not null,
email varchar(50) not null unique,
birth_date date not null,
class_id INT NOT NULL default "0",
foreign key(class_id) references class(id)
);

CREATE TABLE skill(
id  INT NOT NULL PRIMARY KEY auto_increment,
name enum("React", 'Redux', 'CSS', 'Testes', 'Typescript', 'Programação Orientada a Objetos', 'Backend') not null
);

CREATE table teacher_skill(
teacher_id INT NOT NULL PRIMARY KEY,
skill_id INT NOT NULL,
foreign key(teacher_id) references teacher(id),
foreign key(skill_id) references skill(id)
);

CREATE TABLE hobby(
id INT NOT NULL PRIMARY KEY auto_increment,
name VARCHAR(50) NOT NULL
);

CREATE TABLE student_hobby(
student_id INT NOT NULL PRIMARY KEY,
hobby_id INT NOT NULL ,
foreign key(student_id) references student(id),
foreign key(hobby_id) references hobby(id)
);