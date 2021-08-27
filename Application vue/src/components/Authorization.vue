<template>
  <div class="authorization__inner">
    <div class="authorization">
      <h1 class="authorization__title">RITG</h1>
      <form action="#" class="authorization__form">
        <div class="authorization__elem">
          <label class="authorization__subtitle">Логин</label>
          <input type="text" class="authorization__input" v-model="login">
        </div>
        <div class="authorization__elem">
          <label class="authorization__subtitle">Пароль</label>
          <input type="password" class="authorization__input" v-model="password">
        </div>
        <div class="authorization__button-inner">
          <button type="button" @click.prevent="ckeckAuthorization" @mousemove.shift="checkCookie" class="authorization__button">ВХОД</button>
        </div>
        <a href="#">Забыли пароль?</a>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Authorization',
  data(){
    return{
      login: '',
      password: '',
      error: false,
    }
  },
  methods: {
    ckeckAuthorization(){
        if (!this.login || !this.password){
          alert("Поля не должны быть пустыми");
          return;
        }
        // fetch('http://localhost/Authorization/index', {
        //   method: 'POST',
        //   // withCredentials: true,
        //   credentials: 'include',
        //   body: JSON.stringify({login: this.login, password: this.password})})
        //   .then(response => {
        //     return response.json()
        //   })
        //   .catch(() => console.log('Ошибка после получения заголовков, но перед получением данных'))
        //   .then(result => {
        //     if (result) {
        //       // this.$router.push(`  /ListCandidates`)
        //     } else {
        //       alert('Не правильный логин или пароль');
        //     }
        //   })
        //   .catch(()=> console.log("Ошибка после получения данных"))

          axios.post('http://localhost/Authorization/index', {
            login: this.login,
            password: this.password
          },{ withCredentials: true })
          .then(result => {
            if (result.data) {
              this.$store.commit('authorization', result.data);
              localStorage.setItem('authorization', "true");
              this.$router.push(`/ListCandidates`);
            } else {
              alert('Не правильный логин или пароль');
              this.$store.commit('authorization', result.data);
              console.log(this.$store.state.login);
            }
          })

    },
    checkCookie(){
      // document.cookie = "user=John";
      // console.log(document.cookie);
    }
  }
}
</script>

<style scoped lang="scss">
.authorization{
  min-width: 150px;
  margin: 0 auto;
  &__inner{
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100000000000000;
    background-color: #fff;
  }
  &__title{
    font-weight: 700;
    font-size: 32px;
    text-align: center;
    font-family: Arial;

    margin-bottom: 20px;
  }
  &__subtitle{
    color: grey;
    margin: 5px 0;
    display: block;
  }
  &__input{
    border: 1px solid #000;
    padding: 5px;
  }
  &__input{
    margin-bottom: 20px;
  }
  &__button-inner{
    text-align: center;
    margin-bottom: 15px;

  }
  &__button{
    background-color: rgba(22, 155, 213, 1);
    color: #fff;
    text-transform: uppercase;
    border-radius: 5px;
    padding: 10px 15px;
    letter-spacing: 1px;
    border:1px solid #fff;
    width: 80%;

    transition: box-shadow .2s;
  }
  &__button:hover{
    box-shadow: 0 0 5px 5px #0f5c7d;
  }
  &__button:active{
    background-color: #169bd5;
    border: 1px solid #000;
    color: #000;
  }
}
</style>
