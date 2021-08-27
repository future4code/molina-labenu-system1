import express, {Express} from 'express'
import cors from 'cors'
import { AddressInfo } from "net";
import { addStudentInClass} from './endpoint/addStudentInClass';
import { getStudentAge } from './endpoint/getStudentAge';
import { deleteTeacherClass } from './endpoint/deleteTeacherClass';
import { changeModule } from './endpoint/changeModule';
import { addStudent } from './endpoint/addStudent';
import { teacherClass } from './endpoint/teacherClass';
import { studentHobbie } from './endpoint/studentHobbie';

const app: Express = express();

app.use(express.json());
app.use(cors());
app.get("/studentHobbie/:hobby",studentHobbie)
app.post("/create/:id",addStudentInClass)
app.get("/getAge/:id",getStudentAge)
app.post("/delete/:id",deleteTeacherClass)
app.post("/changeModule/:id",changeModule)
app.get("/docentesTurma/:id",teacherClass)
app.post("/adicionar",addStudent)


const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});