import { Button } from "../../libs/prime-react";
import { saveAs } from 'file-saver';

export const DownloadPlantilla = () => {

  
  const handleDownload = () => {
    const fileUrl = '/assets/docs/p-sds-votos.xlsx'; 
    saveAs(fileUrl, 'p-sds-votos.xlsx');
  };

  return (
    <Button icon="pi pi-download" rounded text severity="info" label="Plantilla"  onClick={handleDownload}/>
  )
}
