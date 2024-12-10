import { useEffect, useRef, useState } from "react";
import {  Menubar, InputText, Dialog, Button, Toast, ConfirmDialog, confirmDialog } from "../../libs/prime-react"
import { TableStudents } from "../components/TableStudents";
import { getStudents, deleteStudent } from "../../db/indexedDBStudent";
import { PDFViewer } from '@react-pdf/renderer';
import { PrintStudent } from "../../shared/components/PrintStudent";
import { showSuccess } from "../../shared/message";

export const Students = () => {

  const toast = useRef(null);
  const [students, setStudents] = useState([]);
  const [value, setValue] = useState('');
  const [visiblePrint, setVisiblePrint] = useState(false);
  const [listStudentPrint, setListStudentPrint] = useState([]); 

  useEffect(() => {
      getStudents().then( res => {
          setStudents(res)
      }).catch(e => {
          console.log(e)
      })
  }, [])

  const changeStudent = (e) => {

    if(!e.target.value){
      getStudents().then( res => {
        setStudents(res)
      })
    }
    setValue(e.target.value)
  }

  const searchStudent = () => {

    if(!value){
      return;
    }

    const resultFilter = students.filter(student => student.apellidos.toLowerCase().includes(value.toLowerCase()));
    setStudents(resultFilter);
  }

  const printListStudent = () => {
    getStudents().then( res => {
      setStudents(res)
      setVisiblePrint(true);
      setListStudentPrint(res)
    }).catch(e => {
        console.log(e)
    })
  }

  const start = <div>
    <h3>
      <i className="pi pi-book"></i> Lista estudiantes
    </h3>
  </div>

  const end = (
      <div className="flex align-items-center gap-2">
        <InputText value={value} 
                    placeholder="Digite su apellido"
                   onChange={changeStudent} />
        <Button label="Buscar" size="small" onClick={searchStudent}/>

      </div>
  );

  const reciveDelete = (dni) => {

    confirmDialog({
      message: '¿Estas seguro de eliminar al estudiante?',
      header: 'Eliminar estudiante',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      acceptLabel: 'Si, eliminar',
      rejectLabel: 'No',
      accept:() => {

        deleteStudent(dni).then( () => {
          getStudents().then( res => {
            showSuccess(toast,"Eliminar estudiante", "Estudiante eliminado correctamente")
            setStudents(res)
          })
        })

      }
    });
   
  }

  return (
    <div>
      <ConfirmDialog />
      <Toast ref={toast}/>
      <Menubar start={start} end={end} className="mb-2"/>
      <Button className='mb-2' 
              icon="pi pi-print" 
              label="Lista"
              size="small"
              onClick={ printListStudent } 
                            />
      <TableStudents students={students} sendDelete={reciveDelete}/>
      <Dialog header="Visualización de padrón electoral" 
                    visible={ visiblePrint }
                    maximizable={true}
                    style={{ width: '80vw', height:'50vw' }} 
                    position="top"
                    onHide={() => setVisiblePrint(false)}>
                <PDFViewer width="100%" height="99%">
                    {  listStudentPrint.length!=0 && <PrintStudent data={ listStudentPrint }/>}
                </PDFViewer>
            </Dialog>
    </div>
  )
}
