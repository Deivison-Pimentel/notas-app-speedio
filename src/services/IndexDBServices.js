// src/services/IndexDbService.js

const DB_NAME = 'notasAppDB';
const STORE_NAME = 'anotacoes';

export default {
  async salvarAnotacoesNoIndexDB(anotacoes) {
    try {
      const db = await abrirBancoDeDados();
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Limpa o armazenamento antes de salvar as novas anotações
      store.clear();

      // Salva cada anotação no IndexDB
      anotacoes.forEach((anotacao) => {
        store.add(anotacao);
      });
    } catch (error) {
      console.error('Erro ao salvar anotações no IndexDB:', error);
      throw error;
    }
  },

  async obterAnotacoesDoIndexDB() {
    try {
      const db = await abrirBancoDeDados();
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);

      // Obtém todas as anotações do IndexDB
      const anotacoes = await store.getAll();

      return anotacoes;
    } catch (error) {
      console.error('Erro ao obter anotações do IndexDB:', error);
      throw error;
    }
  },
};

function abrirBancoDeDados() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    };
  });
}
