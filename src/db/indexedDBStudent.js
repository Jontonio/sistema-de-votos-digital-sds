
import { openDB } from "./conexion";

export const addStudent = async (student) => {
  try {
    
      const db = await openDB();
      const transaction = db.transaction("students", "readwrite");
      const store = transaction.objectStore("students");

      const existingStudent = await new Promise((resolve, reject) => {
        const request = store.get(student.dni); 
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject("Error al verificar el estudiante");
      });

      if (existingStudent) {
        throw new Error(`El estudiante con este DNI ${existingStudent.dni} ya existe.`);
      }

      return new Promise((resolve, reject) => {
        const request = store.add(student);
        request.onsuccess = () => resolve(request.result);
        request.onerror = (e) => {
          reject(e.target.error.message)
        };
      });

  } catch (error) {
    console.error(error);
    throw error; 
  }
};

export const getStudentByDni = async (dni) => {
  const db = await openDB();
  const transaction = db.transaction("students", "readonly");
  const store = transaction.objectStore("students");

  return new Promise((resolve, reject) => {
    const request = store.get(dni); 
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener el estudiante");
  });
};

export const getStudentByKeyVoter = async (keyVoter) => {
  const db = await openDB();
  const transaction = db.transaction("students", "readonly");
  const store = transaction.objectStore("students");

  const index = store.index("keyVoter");

  return new Promise((resolve, reject) => {
    const request = index.getAll(keyVoter); 
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener al estudiante por código de voto");
  });
};

export const getStudents = async () => {
  const db = await openDB();
  const transaction = db.transaction("students", "readonly");
  const store = transaction.objectStore("students");

  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al obtener estudiantes");
  });
};

export const updateStudent = async (student) => {
  const db = await openDB();
  const transaction = db.transaction("students", "readwrite");
  const store = transaction.objectStore("students");

  return new Promise((resolve, reject) => {
    const request = store.put(student); // put actualiza o agrega si no existe
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error al actualizar el estudiante");
  });
};

export const deleteStudent = async (dni) => {
  const db = await openDB();
  const transaction = db.transaction("students", "readwrite");
  const store = transaction.objectStore("students");

  return new Promise((resolve, reject) => {
    const request = store.delete(dni);
    request.onsuccess = () => resolve("Estudiante eliminado");
    request.onerror = () => reject("Error al eliminar el estudiante");
  });
};
