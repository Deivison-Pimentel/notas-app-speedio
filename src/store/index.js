// index.js (Vuex)

import { createStore } from 'vuex';
import { saveToIndexedDB, getAllFromIndexedDB, deleteFromIndexedDB, persistToDatabase } from './indexedDB';

export default createStore({
  state: {
    anotacao: [],
    anotacaoSelecionada: null,
  },
  mutations: {
    addAnotacao(state, novaAnotacao) {
      console.log('Adicionando anotação:', novaAnotacao);
      state.anotacao.push(novaAnotacao);
      saveToIndexedDB(novaAnotacao);
    },
    selecionarAnotacao(state, anotacaoId) {
      console.log('Selecionando anotação por ID:', anotacaoId);
      const anotacao = state.anotacao.find(anotacao => anotacao.id === anotacaoId);
      state.anotacaoSelecionada = anotacao;
    },
    excluirAnotacao(state, anotacao) {
      console.log('Excluindo anotação:', anotacao);
      const index = state.anotacao.indexOf(anotacao);
      if (index !== -1) {
        state.anotacao.splice(index, 1);
        deleteFromIndexedDB(anotacao.id);
      }
      state.anotacaoSelecionada = null;
    },
    SET_DATA(state, annotations) {
      state.anotacao = annotations;
    },
    // ... outras mutações
  },
  actions: {
    async loadAnnotationsFromIndexedDB({ commit }) {
      const annotations = await getAllFromIndexedDB();
      commit('SET_DATA', annotations);
    },
    async persistToDatabase({ state }) {
      // Chama a função para persistir no banco de dados (simulando API)
      await persistToDatabase(state.anotacao);
    },
    // ... outras ações
  },
});
