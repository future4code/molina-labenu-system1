CREATE TABLE student(
id INT NOT NULL PRIMARY KEY auto_increment,
name varchar(50) not null,
email varchar(50) not null unique,
birth_date date not null,
class_id INT NOT NULL,
foreign key(class_id) references class(id)
);

CREATE TABLE class(
id INT PRIMARY KEY NOT NULL auto_increment,
name VARCHAR(50) NOT NULL,
start_date DATE NOT NULL,
end_date DATE NOT NULL,
module INT NOT NULL
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

CREATE TABLE teacher(
id INT NOT NULL PRIMARY KEY auto_increment,
name varchar(50) not null,
email varchar(50) not null unique,
birth_date date not null,
class_id INT NOT NULL,
foreign key(class_id) references class(id)
);

CREATE TABLE skill(
id INT NOT NULL PRIMARY KEY auto_increment,
name VARCHAR(50) NOT NULL
);

CREATE table teacher_skill(
teacher_id INT NOT NULL PRIMARY KEY,
skill_id INT NOT NULL,
foreign key(teacher_id) references teacher(id),
foreign key(skill_id) references skill(id)
);

