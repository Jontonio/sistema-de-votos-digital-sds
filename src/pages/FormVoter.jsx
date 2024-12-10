import { SpeedDial } from "primereact/speeddial"
import { MainVoter } from "./MainVoter"
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { addUser } from "../db/indexedDBUser";
import { showError } from "../shared/message";
import { Toast } from "primereact/toast";
import { Dialog } from "../libs/prime-react";
import { InfoDevelopment } from "../shared/components/InfoDevelopment";

export const FormVoter = () => {

  const toast = useRef(null);
  const navigate = useNavigate(); 
  
  const [visibleInfo, setVisibleInfo] = useState(false);

  const items = [
    {
        label: 'Delete',
        icon: 'pi pi-question-circle',
        command:() => setVisibleInfo(true)
    },
    {
        label: 'Home',
        icon: 'pi pi-home',
        command:() => {
          navigate('/main',{ replace:true })
        }
    },
    {
        label: 'Iniciar sesión',
        icon: 'pi pi-lock',
        command:() => {
          navigate('/login',{ replace:true })
        }
    }
  ];
  
  useEffect(() => {
    
    const data = { 
      nombres:"admin", 
      email:"admin@gmail.com", 
      password:"admin.sds",
      createdBy:"José Antonio Rojas Cusi",
      emailOwner:"jose.rojascusi@gmail.com"
    };

    addUser(data).then(() => {
        console.log("congiguración exitosa del sistema")
    }).catch( e => {
      console.error(e)
      showError(toast, "ERROR", "Error al configurar usuario")
    })

  },[])


  return (
    <div>
      <Toast ref={toast}/>
      <MainVoter/> 
      <SpeedDial  model={items} direction="left" style={{ top: 'calc(97% - 4rem)', right: 0, paddingRight:'15px'}} />
      <Dialog header="Acerca del Desarrollador" visible={visibleInfo} style={{ width: '50vw' }} onHide={() => {if (!visibleInfo) return; setVisibleInfo(false); }}>
        <InfoDevelopment/>
      </Dialog>
    </div>
  )
}
