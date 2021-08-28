import express, { Express } from 'express'
import cors from 'cors'
import { AddressInfo } from "net";
import { addStudentInClass } from './endpoint/addStudentInClass';
import { getStudentAge } from './endpoint/getStudentAge';
import { deleteTeacherClass } from './endpoint/deleteTeacherClass';
import { changeModule } from './endpoint/changeModule';
import { addStudent } from './endpoint/addStudent';
import { teacherClass } from './endpoint/teacherClass';
import { studentHobbie } from './endpoint/studentHobbie';
import { deleteStudentClass } from './endpoint/deleteStudentClass';
import { studentClass } from './endpoint/studentClass';
import { createClass } from './endpoint/createClass'
import { putTeacherClass } from './endpoint/putTeacherClass'
import { deleteStudent } from './endpoint/deleteStudent';
import { createTeachers } from './endpoint/createTeacher';

const app: Express = express();

app.use(express.json());
app.use(cors());

app.post("/student/create", addStudent) // 1 Criar Estudante | OK
app.post("/teacher/create", createTeachers) // 2 Criar Docente | OK
app.post("/class", createClass) // 3 Criar Turma | OK
app.post("/student/add/:studentId", addStudentInClass) // 4 Adicionar Estudante na Turma | OK
app.put("/teacher/:teacherId", putTeacherClass) // 5 Adicionar Docente na Turma | OK
app.get("/student/age/:studentId", getStudentAge) // 6 Pegar idade de algum estudante a partir do Id | OK
app.get("/student/show/:classId", studentClass) //7 Exibir Estudante de uma Turma | OK
app.get("/class/teacherInClass/:classId", teacherClass) // 8 Exibir Docentes de uma Turma | OK
app.get("/student/hobby/:hobbyName", studentHobbie) // 9 Exibir Estudantes que possuam o mesmo Hobby | OK
app.post("/student/deleteClass/:studentId", deleteStudentClass) // 10 Remover Estudante de uma Turma | OK
app.delete("/student/:studentId", deleteStudent) // 11 Remover Estudante | OK
app.post("/teacher/deleteClass/:teacherId", deleteTeacherClass) // 12 Remover Docente de uma turma | OK
app.post("/class/changeModule/:classId", changeModule) // 13 Mudar Turma de Módulo | OK

const server = app.listen(process.env.PORT || 3003, () => {
   if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost: ${address.port}`);
   } else {
      console.error(`Failure upon starting server.`);
   }
});