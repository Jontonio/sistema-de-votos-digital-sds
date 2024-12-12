import { FileUpload } from "../../libs/prime-react"
import * as XLSX from 'xlsx';
import { Toast } from "../../libs/prime-react";
import { useRef } from "react";
import { showError, showSuccess, showWarn } from "../../shared/message"
import { addStudent } from "../../db/indexedDBStudent"


const convertKeysToLowerCase = (array) => {
    return array.map(item => {
      return Object.keys(item).reduce((acc, key) => {
        acc[key.toLowerCase()] = item[key];
        return acc;
      }, {});
    });
};

export const UploadPlantilla = () => {

    const toast = useRef(null);
    const fileUploadRef = useRef(null);

    const customBase64Uploader = async (event) => {

        try {
          
          const file = event.files[0];
          const reader = new FileReader();
    
          reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const students = (XLSX.utils.sheet_to_json(worksheet));
            const dataStudents = convertKeysToLowerCase(students);

            if(dataStudents.lenght == 0){
                showWarn(toast, "Error al subir archivo", "El archivo no contiene datos")
                return;
            }

            await registerAllStudents(dataStudents);
        
          };
    
          reader.readAsArrayBuffer(file);
          
        } catch (error) {
            console.log(error)
            showError(toast, "Error", "Error al procesar archivo");
        }
    };

    const keyVoterFuntion = (dni, apellidos) => {
      const lastDigits = String(dni).slice(-4)
      let lastCharts = String(apellidos).slice(-2).toUpperCase(); 
      const code_voter = `${lastDigits}${lastCharts}`
      return code_voter.toUpperCase();
    }

    const registerAllStudents = async (students) => {
      try {
          const studentsLowerCase = students.map(student => ({
              keyVoter: keyVoterFuntion(student.dni, student.apellidos),
              dni: String(student.dni),
              nombres: String(student.nombres).toUpperCase(),
              apellidos: String(student.apellidos).toUpperCase(),
              grado: student.grado,
              seccion: String(student.seccion).toUpperCase(),
              status: true
          }));
  
          const studentPromises = studentsLowerCase.map(async (student) => {
              try {
                  await addStudent(student);
              } catch (error) {
                  console.error(`Error al registrar el estudiante con DNI ${student.dni}:`, error);
                  throw new Error(`Error al registrar el estudiante con DNI ${student.dni}`); // Lanza error para que falle Promise.all
              }
          });
  
          await Promise.all(studentPromises);
  
          showSuccess(toast, "Registro de datos", "Todos los estudiantes fueron registrados con éxito");
          fileUploadRef.current.clear(); 
  
      } catch (e) {
          fileUploadRef.current.clear();
          showError(toast, "Error", String(e));
      }
  };
  

    return (
        <>
            <Toast ref={toast} />
            <FileUpload  mode="basic" 
                        ref={fileUploadRef} 
                        name="filePlantilla" 
                        chooseLabel="Cargar lista" 
                        accept=".xls, .xlsx"
                        className="text" 
                        customUpload 
                        uploadHandler={customBase64Uploader} />
        </>
    )
}
