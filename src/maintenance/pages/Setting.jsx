import { Button, Card, ConfirmDialog, confirmDialog, Toast} from "../../libs/prime-react";
import { clearObjectStore } from "../../db/conexion";
import { useRef } from "react";
import { showError, showSuccess } from "../../shared/message";

export const Setting = () => {

    const toast = useRef(null);

    const handleDelete = () => {
        confirmDialog({
            message: '¿Estas seguro de eliminar los datos del sistema?',
            header: 'Eliminar datos de la base de datos',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            acceptLabel: 'Si, eliminar',
            rejectLabel: 'No',
            accept: async () => {
      
                try {
                    await Promise.all([
                      clearObjectStore("students"),
                      clearObjectStore("candidates"),
                      clearObjectStore("votes"),
                    ]).then(results => {
                      results.forEach(result => console.log(result));
                      showSuccess(toast, "Eliminar de base de datos","Las bases de datos han sido limpiadas.")
                    }).catch(() => {
                      showError(toast, "Eliminar de base de datos","Ocurrió un error al limpiar las bases de datos.")
                    });
                } catch (error) {
                    console.error("Error en la operación de limpieza:", error);
                }
      
            }
          });
    }

    return (
        <div>
           <ConfirmDialog/> 
           <Toast ref={toast}/>
            <Card>
                <h2>Mantenimiento del sistema</h2>
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                    Advertencia: Esta acción eliminará todos los datos de la base de datos. Esta acción no se puede deshacer.
                </p>
                <Button label="Limpiar bases de datos" onClick={handleDelete}/>
            </Card>
        </div>
    )
}
