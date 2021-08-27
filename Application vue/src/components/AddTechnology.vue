<template>
  <div style="height: 100vh">
    <h2 class="content__title">Добавление технологии
      <span class="content__subtitle">RITG V</span>
    </h2>
    <div class="addTechnology__wrapper">

      <form @submit.prevent="sendTechnologyHandler" class="addTechnology">
        <label for="addTechnology__value" class="addTechnology__label">Название</label>
        <input type="text" class="addTechnology__input" id="addTechnology__value" v-model="nameTechnology">
        <button class="addTechnology__button">ДОБАВИТЬ</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "AddTechnology",
  data(){
    return {
      nameTechnology: '',
    }
  },
  methods: {
    sendTechnologyHandler(){
      if (this.nameTechnology == ''){
        alert("Поле должно быть заполненным!")
        return;
      }
      // fetch('http://server/AddTechnology/index', {
      // method: 'POST',
      // body: JSON.stringify({
      //   name: this.nameTechnology
      // })
      // })
      // .then(response => response.json())
      // .catch(() => console.log("Ошибка после получения заголвков ответа"))
      // .then(result => {
      //   (!result) || console.log("Данные успешно были отправлены")
      // })

      axios.post('http://localhost/AddTechnology/index', {
        name: this.nameTechnology
      }, {withCredentials: true})
      .then(response => {
        if (response.data){
          alert('Данные добавлены')
        } else {
          alert('Данные не добавлены!')
        }
      })
      .catch(() => console.log("Ошибка после получения данных"))
      this.name="";
    }
  }
}
</script>

<style scoped lang="scss">
.addTechnology{
  width: 800px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  &__wrapper{
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100%;
  }

  &__label{
    flex: 0 0 35%;
    margin-right: 20px;

    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  &__input{
    flex: 0 0 50%;
    border: 1px solid #000;
    padding: 5px;
  }
  &__button{
    margin-top: 20px;
    background-color: rgba(22, 155, 213, 1);
    color: #fff;
    text-transform: uppercase;
    border-radius: 5px;
    padding: 10px 15px;
    letter-spacing: 1px;
    border:1px solid #fff;

    transition: box-shadow .2s;

    width: 200px;
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
