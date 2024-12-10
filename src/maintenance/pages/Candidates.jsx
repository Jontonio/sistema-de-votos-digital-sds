import { useRef, useState } from "react";
import {  Menubar } from "../../libs/prime-react"
import { TableCandidates,  } from "../components/TableCandidates";
import { useEffect } from "react";
import { getCandidates, deleteCandidate} from "../../db/indexedDBCandidate";
import { Toast, ConfirmDialog, confirmDialog } from "../../libs/prime-react"
import { showSuccess } from "../../shared/message";

export const Candidates = () => {

  const toast = useRef(null);
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {

    getCandidates().then(list => {
      setCandidates(list);
    })

  },[]);

  const reciveDelete = (dni) => {

    confirmDialog({
      message: '¿Estas seguro de eliminar al candidato?',
      header: 'Eliminar candidato',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      acceptLabel: 'Si, eliminar',
      rejectLabel: 'No',
      accept:() => {

        deleteCandidate(dni).then( () => {
          getCandidates().then(list => {
            showSuccess(toast,"Eliminar candidato", "Candidato eliminado correctamente")
            setCandidates(list);
          })
        })

      }
    });
   
  }

  const start = <div>
    <h3>
      <i className="pi pi-book"></i> Lista de candidatos
    </h3>
  </div>

  const end = (
      <div className="flex align-items-center gap-2"></div>
  );

  return (
    <div>
      <ConfirmDialog />
      <Toast ref={toast}/>
      <Menubar start={start} end={end} className="mb-2"/>
      <TableCandidates candidates={candidates} sendDelete={reciveDelete}/>
    </div>
  )
}
