import {  Menubar } from "../../libs/prime-react"
import { FormCandidate } from "../components/FormCandidate";

export const AddCandidate = () => {

    const start = <div>
      <h3>
        <i className="pi pi-face-smile"></i> Registro de candidato
      </h3>
    </div>

    const end = (
        <div className="flex align-items-center gap-2"></div>
    );

  return (
    <div>
      {/* <Menubar start={start} end={end} className="mb-2"/> */}
      <FormCandidate/>
    </div>
  )
}
