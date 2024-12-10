
import { openDB } from "./conexion";

export const addCandidate = async (candidate) => {
  try {
    
      const db = await openDB();
      const transaction = db.transaction("candidates", "readwrite");
      const store = transaction.objectStore("candidates");

      const existingCandidate = await new Promise((resolve, reject) => {
        const request = store.get(candidate.dni); 
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error al verificar candidato");
      });

      if (existingCandidate) {
        throw new Error(`El candidato con este DNI ${existingCandidate.dni} ya existe.`);
      }

      return new Promise((resolve, reject) => {
        const request = store.add(candidate);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error al agregar el candidato");
      });

  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const getCandidateByDni = async (dni) => {
  const db = await openDB();
  const transaction = db.transaction("candidates", "readonly");
  const store = transaction.objectStore("candidates");

  return new Promise((resolve, reject) => {
    const request = store.get(dni); 
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener el candidato");
  });
};

export const getCandidates = async () => {
  const db = await openDB();
  const transaction = db.transaction("candidates", "readonly");
  const store = transaction.objectStore("candidates");

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener candidatos");
  });
};

export const updateCandidate = async (candidate) => {
  const db = await openDB();
  const transaction = db.transaction("candidates", "readwrite");
  const store = transaction.objectStore("candidates");

  return new Promise((resolve, reject) => {
    const request = store.put(candidate);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al actualizar candidato");
  });
};

export const deleteCandidate = async (dni) => {
  const db = await openDB();
  const transaction = db.transaction("candidates", "readwrite");
  const store = transaction.objectStore("candidates");

  return new Promise((resolve, reject) => {
    const request = store.delete(dni);
    request.onsuccess = () => resolve("Candidato eliminado");
    request.onerror = () => reject("Error al eliminar el candidato");
  });
};
