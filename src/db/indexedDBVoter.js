
import { openDB } from "./conexion";
export const registerVote = async (vote) => {
  try {
    const db = await openDB();
    const transaction = db.transaction("votes", "readwrite");
    const store = transaction.objectStore("votes");

    const index = store.index("voterDNI");
    const existingVote = await new Promise((resolve, reject) => {
      const request = index.get(vote.voterDNI);
      request.onsuccess = () => resolve(request.result); 
      request.onerror = () => reject("Error al verificar el voto del estudiante"); 
    });

    if (existingVote) {
      throw new Error(`El estudiante con el DNI ${vote.voterDNI} ya realizó su voto.`);
    }

    return new Promise((resolve, reject) => {
      const request = store.add(vote); 
      request.onsuccess = () => resolve(request.result); 
      request.onerror = (e) => reject(e.target.error.message); 
    });

  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const getVotes = async () => {
  const db = await openDB();
  const transaction = db.transaction("votes", "readonly");
  const store = transaction.objectStore("votes");

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener votos");
  });
};