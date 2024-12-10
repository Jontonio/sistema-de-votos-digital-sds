import logoPeru from  '../assets/imgs/escudo-peru.png'
import logoSDS from  '../assets/imgs/insignia.png'
import { HeaderData } from './HeaderData'

export const HeaderVoter = ({hederData = true}) => {
  return (
    <>
        <div className='header-content border-round'>
            <div className='content-img'>
                <img className='img-logo-header' src={logoPeru} alt="" />
            </div>
            <div>
                <h2>ALCALDES Y REGIDORES</h2>
                <p>INSTITUCIÓN EDUCATIVA SANTO DOMINGO SAVIO</p>
            </div>
            <div className='content-img'>
                <img className='img-logo-header' src={logoSDS} alt="" />
            </div>
        </div>
        {hederData && <HeaderData/>}
    </>
  )
}
