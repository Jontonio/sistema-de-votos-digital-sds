export const openDB = () => {

  const request = indexedDB.open("crudDB", 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    
      if (!db.objectStoreNames.contains("students")) {
        db.createObjectStore("students", { keyPath: "dni" }).createIndex("keyVoter", "keyVoter", { unique: true });
      }
  
      if (!db.objectStoreNames.contains("candidates")) {
        db.createObjectStore("candidates", { keyPath: "dni" });
      }

      if (!db.objectStoreNames.contains("votes")) {
        db.createObjectStore("votes", { autoIncrement: true }).createIndex("voterDNI", "voterDNI", { unique: true });
      }

      if (!db.objectStoreNames.contains("user")) {
        db.createObjectStore("user", { autoIncrement: true }).createIndex("email", "email", { unique: true });
      }

  };

  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al abrir la base de datos");
  });
};


export const clearObjectStore = async (storeName) => {
  const db = await openDB();
  const transaction = db.transaction(storeName, "readwrite");
  const objectStore = transaction.objectStore(storeName);

  const request = objectStore.clear();

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(`Objeto estore ${storeName} eliminado correctamente`);
    };
    request.onerror = () => {
      reject(`Error clearing object store ${storeName}`);
    };
  });
};