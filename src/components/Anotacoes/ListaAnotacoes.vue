<template>
  <div>
    <header>
      <h1 class="title">Anotações</h1>
    </header>

    <div class="lista-e-formulario">
      <!-- Lista de Anotações -->
      <div class="lista">
        <ul class="anotacoes-list">
          <li v-for="anotacao in anotacao" :key="anotacao.id" :class="{ 'anotacao-selecionada': anotacao.id === anotacaoSelecionada?.id }" @click="selecionarAnotacao(anotacao.id)">
            <!-- Container da anotação -->
            <div class="anotacao-item">
              <!-- Ícone à esquerda -->
              <div class="icon-wrapper">
                <i class="fas fa-paperclip icon"></i>
              </div>

              <!-- Conteúdo da anotação -->
              <div class="anotacao-texto">{{ anotacao.conteudo }}</div>

              <!-- Botão à direita -->
              <button type="button" @click="exibirModalExclusao(anotacao)" class="button-right">
                <i class="fas fa-trash-alt icon"></i>
              </button>
            </div>
          </li>
        </ul>
      </div>
      
      <!-- Área de Detalhes do Formulário -->
      <div class="formulario">
        <AnotacaoFormulario :anotacaoSelecionada="anotacaoSelecionada" />
      </div>
    </div>

    <!-- Modal de Exclusão -->
    <div v-if="mostrarModalExclusao" class="modal-overlay">
      <div class="modal">
        <h3>Deseja excluir esta anotação?</h3>
        <p>Você está prestes a deletar uma anotação e esta ação não poderá ser desfeita. Tem certeza que deseja excluí-la?</p>
        <div class="modal-buttons">
          <button @click="cancelarExclusao" class="cancelar">Cancelar</button>
          <button @click="confirmarExclusao" class="excluir">Excluir</button>
        </div>
      </div>
    </div>

    <!-- Botão "Salvar Sessão" -->
    <div class="save-session-button" @click="gerarToken">
      Salvar Sessão
    </div>

    <!-- Modal de Exibição do Token -->
    <div v-if="mostrarModal" class="modal-overlay">
      <div class="token-modal">
        <h3>Token de Sessão Gerado:</h3>
        <p>O token abaixo foi gerado para salvar a sessão. Anote-o e utilize-o para recuperar suas anotações posteriomente.</p>
        <div class="token-display">{{ token }}</div>
        <p>Para recuperar sua sessão em outro dispositivo. Insira o token no campo correspondente na tela inicial.</p>
        <button @click="fecharModal" class="fechar-modal">Fechar</button>
      </div>
    </div>

    <!-- Botão Criar Anotação -->
    <div class="button-container">
      <button class="button-center" @click="criarAnotacao">+ Criar anotação</button>
    </div>
  </div>
</template>

<script>
import AnotacaoFormulario from "@/components/Anotacoes/AnotacaoFormulario.vue";
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ListaAnotacoes',
  components: {
    AnotacaoFormulario,
  },
  computed: {
    ...mapState(['anotacao', 'anotacaoSelecionada']),
  },
  data() {
    return {
      mostrarModalExclusao: false,
      mostrarModal: false,
      token: '',
    };
  },
  methods: {
    ...mapActions(['loadAnnotationsFromIndexedDB']),
    criarAnotacao() {
      this.$router.push('/criar-anotacao');
    },
    selecionarAnotacao(anotacaoId) {
      this.$store.commit('selecionarAnotacao', anotacaoId);
    },
    exibirModalExclusao(anotacao) {
      this.mostrarModalExclusao = true;
      this.anotacaoParaExcluir = anotacao;
    },
    cancelarExclusao() {
      this.mostrarModalExclusao = false;
      this.anotacaoParaExcluir = null;
    },
    async confirmarExclusao() {
      if (this.anotacaoParaExcluir) {
        this.$store.commit('excluirAnotacao', this.anotacaoParaExcluir);
        this.mostrarModalExclusao = false;
        this.anotacaoParaExcluir = null;
      }
    },
    fecharModal() {
      this.mostrarModal = false;
    },
  },
  async mounted() {
    await this.loadAnnotationsFromIndexedDB();
  },
};
</script>

<style scoped>
header {
  position: absolute;
  top: 18px;
  left: 0;
  margin: 10px;
}

h1 {
  color: #727070;
  font-size: 30px;
  margin: 0 15px;
}

.lista-e-formulario {
  display: flex;
}

.lista {
  position: relative;
  flex: 1;
  margin-top: 20px;
  max-width: 400px;
  padding: 10px 15px;
  overflow-y: auto;
  height: 600px;
}

.anotacoes-list {
  list-style-type: none;
  padding: 0px;
}

.anotacao-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.icon-wrapper {
  margin-right: 8px;
}

.anotacao-texto {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0 8px;
  margin-top: -10px;
  text-decoration: underline;
}

.button-right {
  background-color: transparent;
  border: none;
  color: #ff5252;
  padding: 8px;
  cursor: pointer;
}

.button-container {
  margin-top: 20px;
  text-align: center;
}

.button-center {
  background-color: #1791FF;
  color: white;
  border: none;
  padding: 13px 50px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 50px;
}

.formulario {
  flex: 1;
  padding: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #f6f6f6;
  padding: 20px;
  border-radius: 8px;
  max-width: 580px;
  text-align: left;
}

.modal h3 {
  border-bottom: 1px solid #ccc;
  margin: 0 0 10px;
  margin-bottom: 10px;
}

.modal-content p {
  margin-top: 10px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 15px;
}

.modal-buttons button {
  padding: 12px 20px;
  cursor: pointer;
  border: 2px solid #f6f6f6;
  border-radius: 30px;
}

.modal-buttons button.cancelar {
  color: #727070;
  background-color: white;
  border: 0.5px solid #ccc;
}

.modal-buttons button.excluir {
  color: white;
  background-color: #ff5252;
}

/* Estilo do Botão "Salvar Sessão" */
.save-session-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #1791FF;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  cursor: pointer;
}

.token-modal {
  background: #f6f6f6;
  padding: 20px;
  border-radius: 8px;
  max-width: 580px;
  text-align: left;
}

.token-display {
  background-color: #f6f6f6;
  padding: 10px;
  font-weight: 10px;
  color: #1791FF;
  text-align: center;
  margin: 10px 0;
  font-size: 50px;
  font-family: monospace;
  word-break: break-all;
}

</style>
