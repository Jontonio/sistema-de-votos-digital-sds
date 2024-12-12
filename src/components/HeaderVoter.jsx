import logoPeru from  '../assets/imgs/escudo-peru.png'
import logoSDS from  '../assets/imgs/insignia.png'
import { HeaderData } from './HeaderData'

export const HeaderVoter = ({ data, hederData = true}) => {
  return (
    <>
        <div className='header-content border-round'>
            <div className='content-img'>
                <img className='img-logo-header' src={logoPeru} alt="" />
            </div>
            <div>
                <h2 className='m-0 mt-3'>ALCALDES Y REGIDORES</h2>
                <p className='m-0 mt-2 mb-4'>INSTITUCIÓN EDUCATIVA SANTO DOMINGO SAVIO</p>
                {data && <b><p>DNI: {data.dni} - Estudiante: {data.nombres} {data.apellidos}</p></b>}
            </div>
            <div className='content-img'>
                <img className='img-logo-header' src={logoSDS} alt="" />
            </div>
        </div>
        {hederData && <HeaderData/>}
    </>
  )
}
