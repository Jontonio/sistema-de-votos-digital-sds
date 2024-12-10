
const generarToken = (payload) => {
    const token = {
      data: JSON.stringify(payload), 
      exp: Date.now() + 60 * 60 * 1000 
    };
    sessionStorage.setItem('token', JSON.stringify(token));
  }
  
  const eliminarToken = () => {
    sessionStorage.removeItem('token');
  }
  
  const validarToken = () => {

    const tokenString = sessionStorage.getItem('token');

    if (!tokenString) {
      return false;
    }
  
    const token = JSON.parse(tokenString);
    
    if (Date.now() > token.exp) {
      eliminarToken(); 
      return false;
    }
  
    return true;
  }
  
  const obtenerToken = () => {

    const tokenString = sessionStorage.getItem('token');

    if (!tokenString) {
      return null;
    }
  
    const token = JSON.parse(tokenString);
    if (Date.now() > token.exp) {
      eliminarToken();
      return null;
    }
  
    return token;
  }
  
export {
    generarToken,
    obtenerToken,
    validarToken,
    eliminarToken
}