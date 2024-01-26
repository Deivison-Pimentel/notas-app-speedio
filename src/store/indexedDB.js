// indexedDB.js

import { openDB } from 'idb';

const dbName = 'myDB';
const storeName = 'annotations';

const dbPromise = openDB(dbName, 1, {
  upgrade(db) {
    db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true });
  },
});

export const saveToIndexedDB = async (annotation) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    
    await store.add(annotation);
    console.log('Anotação adicionada ao IndexedDB:', annotation);
  } catch (error) {
    console.error('Erro ao salvar no IndexedDB:', error);
    throw error;
  }
};

export const getAllFromIndexedDB = async () => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    return store.getAll();
  } catch (error) {
    console.error('Erro ao recuperar do IndexedDB:', error);
    return [];
  }
};

export const deleteFromIndexedDB = async (annotationId) => {
  try {
    const db = await dbPromise;
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    
    await store.delete(annotationId);
    console.log('Anotação excluída do IndexedDB:', annotationId);
  } catch (error) {
    console.error('Erro ao excluir do IndexedDB:', error);
    throw error;
  }
};
