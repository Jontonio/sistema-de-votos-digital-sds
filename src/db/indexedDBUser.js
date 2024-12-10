
import { openDB } from "./conexion";

export const addUser = async (user) => {
  try {
    
      const db = await openDB();
      const transaction = db.transaction("user", "readwrite");
      const store = transaction.objectStore("user");
      
      const existingUser = await new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error al obtener usuarios");
      });

      if (existingUser.length != 0) {
        return new Promise((resolve) => {
          resolve(null);
        });
      }

      const existsUser = await new Promise((resolve, reject) => {
        const request = store.get(user.email); 
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error al verificar usuario");
      });

      if (existsUser) {
        throw new Error(`El candidato con este email ${existingUser.email} ya existe.`);
      }

      return new Promise((resolve, reject) => {
        const request = store.add(user);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error al crear usuario");
      });

  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const getUserByEmail = async (email) => {

  try {

    const db = await openDB();
    const transaction = db.transaction("user", "readwrite");
    const store = transaction.objectStore("user");
  
    const index = store.index("email");
  
    const existingUser = await new Promise((resolve, reject) => {
      const request = index.get(email);
      request.onsuccess = () => resolve(request.result); 
      request.onerror = () => reject("Error al verificar usuario"); 
    });
  
    if (!existingUser) {
      throw new Error(`Usuario y/o contraseña incorrectas`);
    }

    return new Promise((resolve) => {
      resolve(existingUser)
    })
    
  } catch (error) {
    console.error(error);
    throw error; 
  }

};
