<template>
  <div>
    <header>
      <h1 class="title">Anotações</h1>
    </header>

    <div class="anotation">
      <h1 class="titulo">
        <i class="fas fa-paperclip icon" style="transform: rotate(180deg); font-size: 60px; color: #959EA7; margin-bottom: 15px;"></i>
        <span class="anotacoes-texto">Anotações</span>
        <span class="by-speedio smaller-text">by Speedio</span>
      </h1>
      <div class="button-container">
        <button @click="criarAnotacao">+ Criar anotação</button>
      </div>

      <!-- Novo Container -->
      <div class="recovery-container">
        <input v-model="token" placeholder="Digite o Token" class="token-input" />
        <button @click="recuperarSessao" class="recovery-button">Recuperar Sessão</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      token: '',
    };
  },
  methods: {
    criarAnotacao() {
      if (this.$store.state.anotacao.length === 0) {
        // Se não houver anotações, direcione para o formulário
        this.$router.push('/criar-anotacao');
      } else {
        // Se houver anotações, direcione para a lista
        this.$router.push('/lista-anotacoes');
      }
    },
  
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

.title {
  color: #727070;
  font-size: 30px;
  margin: 0 15px;
}

.anotation {
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 40vh;
  transform: translateY(-50%);
}

.titulo {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 0;
}

.anotacoes-texto {
  color: #1791FF;
  font-size: 1em;
  margin-bottom: 0;
}

.by-speedio {
  color: #959EA7;
  font-size: small;
  margin-top: -5px;
  font-weight: 500;
}

.smaller-text {
  font-size: medium;
}

button {
  text-align: center;
  margin-top: 2vh;
  background: #1791FF;
  padding: 15px 20px;
  font-size: 24px;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
}

.recovery-container {
  position: absolute;
  top: -300px;
  right: 15px;
  display: flex;
  align-items: center;
}

.recovery-button {
  background-color: #1791FF;
  color: white;
  border: none;
  font-size: 20px;
  border-radius: 50px;
  padding: 8px;
  cursor: pointer;
}

.token-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 50px;
  width: 200px;
  font-size: 15px;
  margin-right: 8px; 
  outline: none;
  margin-top: 20px;/* Espaçamento entre o input e o botão */
}
</style>
