import './App.css'
import 'primeflex/primeflex.css'; 
import 'primeicons/primeicons.css'; 
import 'primereact/resources/primereact.min.css'; 
import 'primereact/resources/themes/lara-light-indigo/theme.css'; 
import { Button } from "./libs/prime-react"
import { HeaderVoter } from './components/HeaderVoter';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate('/login', { replace: true });
  }

  return (
    <>  
        <div className=''>
          <HeaderVoter hederData={false}/>
        </div>
        <div className='card-main'>
          <h2 className='title-main'>BIENVENIDO AL SISTEMA</h2>
          <Button label="Iniciar" 
                  icon="pi pi-arrow-up-right" 
                  onClick={ navigateLogin }
                  severity="success" outlined/>
        </div>
    </>
  )
}

export default App
