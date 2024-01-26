<template>
    <div class="anotacao-formulario">
      <div v-if="anotacaoSelecionada" class="card-anotacao">
        <div class="campo">
          <label>Conteúdo:</label>
          <div :class="{'conteudo-anotacao-longo': conteudoLongo}">
            {{ anotacaoSelecionada.conteudo }}
          </div>
        </div>
        <div class="campo">
          <label>Potencial de Negócio:</label>
          <div>{{ anotacaoSelecionada.potencialNegocio }}</div>
        </div>
        <div class="campo">
          <label>Prioridade:</label>
          <div>{{ anotacaoSelecionada.categorizacao }}</div>
        </div>
        <div class="campo">
          <label>Lembrete:</label>
          <div>{{ formatarData(anotacaoSelecionada.lembrete) }}</div>
        </div>
  
        <!-- Ícone de Lixeira para Excluir Anotação -->
        <div @click="exibirModalExclusao" class="icone-lixo">
          <i class="fas fa-trash-alt"></i>
        </div>
      </div>
      <div v-else>
        <p>Selecione uma anotação para visualizar detalhes.</p>
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
    </div>
  </template>
  
  <script>
  export default {
    props: ['anotacaoSelecionada'],
    data() {
      return {
        mostrarModalExclusao: false,
      };
    },
    computed: {
      conteudoLongo() {
        return this.anotacaoSelecionada && this.anotacaoSelecionada.conteudo && this.anotacaoSelecionada.conteudo.length > 50;
      },
    },
    methods: {
      formatarData(data) {
        if (data && typeof data === 'string') {
          const partes = data.split('-');
          if (partes.length === 3) {
            return `${partes[2]}/${partes[1]}/${partes[0]}`;
          }
        }
        return data;
      },
      exibirModalExclusao() {
        this.mostrarModalExclusao = true;
      },
      cancelarExclusao() {
        this.mostrarModalExclusao = false;
      },
      confirmarExclusao() {
        console.log('Excluir anotação:', this.anotacaoSelecionada);
        this.$store.commit('excluirAnotacao', this.anotacaoSelecionada);
        this.mostrarModalExclusao = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .anotacao-formulario {
    max-width: 400px;
    margin: 0 auto;
    padding: 10px;
  }
  
  .card-anotacao {
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
    position: relative;
  }
  
  .campo {
    margin-bottom: 15px;
  }
  
  label {
    font-size: 18px;
    color: #a9aeb1;
    margin-bottom: 10px;
    align-self: flex-start;
  }
  
  .conteudo-anotacao-longo {
    word-break: break-all;
  }
  
  .icone-lixo {
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    color: #e74c3c;
    font-size: 24px;
    transition: color 0.3s;
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
  </style>
  