<template>
  <div>
    <header>
      <h1 class="title">Anotações</h1>
    </header>

    <div class="anotacao-form">
      <!-- Formulário para criar anotação -->
      <form @submit.prevent="salvarAnotacao">
        <textarea id="conteudo" v-model="conteudo" placeholder="Exemplo: Reunião de equipe" required></textarea>

        <label for="potencialNegocio">Potencial de Negócio:</label>
        <div class="input-wrapper">
          <input type="text" id="potencialNegocio" v-model="potencialNegocio" placeholder="R$00,00" @input="formatarMoeda" />
        </div>

        <label for="categorizacao">Categorização:</label>
        <select id="categorizacao" v-model="categorizacao" required>
          <option value="importante">Importante</option>
          <option value="nao-importante">Não Importante</option>
        </select>

        <label for="lembrete">Lembrete:</label>
        <input type="date" id="lembrete" v-model="lembrete" placeholder="Selecione uma data">

        <div class="botoes">
          <button type="button" @click="exibirModalExclusao"><i class="fas fa-trash-alt icon"></i></button>
          <button type="submit">Salvar</button>
        </div>
      </form>

      <div class="modal-overlay" v-if="mostrarModalExclusao">
        <div class="modal">
          <div class="modal-content">
            <h3>Deseja excluir esta anotação?</h3>
            <p>Você está prestes a deletar uma anotação e esta ação não poderá ser desfeita. Tem certeza que deseja excluí-la?</p>
            <div class="modal-buttons">
              <button @click="cancelarExclusao" class="cancelar">Cancelar</button>
              <button @click="confirmarExclusao" class="excluir">Excluir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateAnotacao',
  data() {
    return {
      conteudo: '',
      potencialNegocio: null,
      categorizacao: 'importante',
      lembrete: '',
      mostrarModalExclusao: false
    };
  },
  methods: {
    salvarAnotacao() {
      
      this.$store.commit('addAnotacao', {
        conteudo: this.conteudo,
        potencialNegocio: this.potencialNegocio,
        categorizacao: this.categorizacao,
        lembrete: this.lembrete
      });
      this.conteudo = '';
      this.potencialNegocio = '';
      this.categorizacao = '';
      this.lembrete = '';

      this.$router.push('/lista-anotacoes')
      
    },
    exibirModalExclusao() {
      this.mostrarModalExclusao = true;
    },
    cancelarExclusao() {
      this.mostrarModalExclusao = false;
    },
    confirmarExclusao() {
      console.log('Anotação excluída');
      this.mostrarModalExclusao = false;
      
      // Redirecionar para a página inicial (rota '/')
      this.$router.push('/');
    },
    formatarMoeda() {
      let valorNumerico = this.potencialNegocio ? parseFloat(this.potencialNegocio.toString().replace(/\D/g, '')) / 100 : null;
      
      if (valorNumerico !== null) {
        this.potencialNegocio = valorNumerico.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }
    }
  }
};
</script>

<style scoped>
/* Adicione estilos conforme necessário */

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

.anotacao-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 10px;
}

form {
  display: flex;
  flex-direction: column;
}


label {
  font-size: 18px;
  color: #a9aeb1;
  margin-bottom: 10px;
  align-self: flex-start;
}

#conteudo {
  background-color: #f1f1f1;
  width: 100%;
  height: 190px;
  /* Altura fixa */
  padding: 10px 15px;
  margin-bottom: 35px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: none;
  /* Impede redimensionamento */
}

.input-wrapper {
  display: flex;
  align-items: center;
}

input,
select {
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 50px;
  width: 100%;
  font-size: 18px;
  padding: 20px 15px;
  margin-bottom: 30px;
  box-sizing: border-box;
}

.botoes {
  display: flex;
  justify-content: space-between;
  margin-top: 45px;
}

/* Estilo para aumentar a largura do botão "Salvar" */
.botoes button:last-child {
  width: 80%;
  background-color: #1791FF;
  font-size: 20px;
  color: white;
  padding: 15px 15px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

/* Estilo para o botão "Excluir" arredondado */
.botoes button:first-child {
  width: 50px;
  /* Largura reduzida para tornar o primeiro botão (Excluir) mais arredondado */
  height: 50px;
  background: #ff5252;
  /* Cor de destaque para o botão "Excluir" */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

/* Estilo para o modal de exclusão */
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
