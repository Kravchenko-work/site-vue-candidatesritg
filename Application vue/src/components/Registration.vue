<template>
  <div class="registration__inner">
    <div class="registration">
      <h1 class="registration__title">RITG V</h1>
      <div class="registration__item">
        <label for="registration__name" class="registration__label">ФИО:</label>
        <input type="text" id="registration__name" class="registration__input" v-model="name">
      </div>
      <div class="registration__item">
        <label for="registration__login" class="registration__label">Логин:</label>
        <input type="text" id="registration__login" class="registration__input" v-model="login">
      </div>
      <div class="registration__item">
        <label for="registration__mail" class="registration__label">Почта:</label>
        <input type="mail" id="registration__mail" class="registration__input" v-model="mail">
      </div>
      <div class="registration__item">
        <label for="registration__password" class="registration__label">Пароль:</label>
        <input type="password" id="registration__password" class="registration__input" v-model="password">
      </div>
      <div class="registration__item">
        <label for="registration__passwordCheck" class="registration__label">Подтверждение пароля:</label>
        <input
            type="password"
            id="registration__passwordCheck"
            class="registration__input"
            v-model="passwordConfirm">
      </div>
      <button @click="registration" class="registration__button">Зарегестрироваться</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: "UpdateCandidate",
  data(){
    return {
      name: '',
      login: '',
      mail: '',
      password: '',
      passwordConfirm: '',
    }
  },
  methods: {
    registration(){
      if (this.name === '' || this.login === '' || this.password === '' || this.passwordConfirm === '' || this.mail === ''){
        alert("Какое-то из полей пустое");
        return;
      } else if (this.password !== this.passwordConfirm) {
        alert("Пароли не совпадают");
        return;
      }
      axios.post('http://localhost/Registration/index', {
        registration: {
          full_name: this.name,
          login: this.login,
          password: this.password,
          email:this.mail,
          passwordConfirm: this.passwordConfirm
        }
      }, {withCredentials: true})
      .then(response => {
        console.log(response.data)
        if (response.data) {
          this.$router.push('/')
        } else {
          alert('Такое имя уже занято');
        }
      })
      .catch(() => console.log("Ошибка после получения данных"))

      // fetch('http://server/Registration/index', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     registration: {
      //       full_name: this.name,
      //       login: this.login,
      //       password: this.password,
      //       email:this.mail,
      //       passwordConfirm: this.passwordConfirm
      //     }
      //   })})
      //     .then(response => {
      //       console.log(`response.status = ${response.status}`)
      //       return response.json()
      //     })
      //     .catch(() => console.log('Ошибка после получения заголовков, но перед получением данных'))
      //
      //     .then(result => {
      //       console.log(result)
      //       if (result) {
      //         this.$router.push('/Authorization')
      //       } else {
      //         alert('Такое имя уже занято');
      //       }
      //     })
      //     .catch(() => console.log("Ошибка после получения данных"))
    }
  }

}
</script>

<style scoped lang="scss">
.registration{
  min-width: 300px;
  background-color: #fff;
  opacity: 1;

  padding: 10px;
&__inner{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: opacity 200ms ease-in; /* анимация перехода */

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 100000000000000;
}
&__title{
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 30px;
}
&__item{
  margin-bottom: 20px;
}
&__label{
  display: block;
  margin-bottom: 5px;
}
&__input{
  padding: 5px 10px;
  border: 1px solid #000;
  border-radius: 5px;
}
&__button{

  background-color: rgba(22, 155, 213, 1);
  color: #fff;
  text-transform: uppercase;
  border-radius: 5px;
  padding: 10px 15px;
  letter-spacing: 1px;
  border:1px solid #fff;

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
