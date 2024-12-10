
import { FormStudent } from "../components/FormStudent";
import {  Menubar } from "../../libs/prime-react"
import { DownloadPlantilla } from "../components/DownloadPlantilla";
import { UploadPlantilla } from "../components/UploadPlantilla";

export const AddStudent = () => {

  const start = <div>
    <h3><i className="pi pi-plus"></i> Nuevo estudiante</h3>
  </div>

  const end = (
      <div className="flex align-items-center gap-2">
          <UploadPlantilla/>
          <DownloadPlantilla/>
      </div>
  );

  return (
    <div>
      <Menubar start={start} end={end} className="mb-2"/>
      <FormStudent/>
    </div>
  )
}
