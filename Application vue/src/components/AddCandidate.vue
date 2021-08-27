<template>
      <div class="AddCandidate">
        <h2 class="content__title">Добавление кандидата
          <span class="content__subtitle">RITG V</span>
        </h2>
        <div class="AddCandidate__block">
          <p class="AddCandidate__block-name">ФИО</p>
          <input @input="error.showBackgroundRed = false; error.inputCheckName = 0" type="text" class="AddCandidate__input" :class="{errorInput__input: error.showBackgroundRed}" v-model="candidate.name">
        </div>
        <div class="errorInput__text" v-show="error.inputCheckName == 1">{{error.name}}</div>
        <div class="errorInput__text" v-if="error.inputCheckName == 2">Поле должно состоять из 3 реальных слов (от 2 до 15 букв)</div>
        <div class="rightInput__text" v-else-if="error.inputCheckName == 3">Имя успешно введенно</div>
        <div class="AddCandidate__block">
          <p class="AddCandidate__block-technology">Технологии</p>

            <TechnologiesInAddCandidate :technologies="candidate.technologies"/>

        </div>
        <div class="AddCandidate__block">
          <p class="AddCandidate__block-date">Дата рождения</p>
          <input @input="error.showDate=false" type="date" class="AddCandidate__input" :class="{errorInput__input: error.showDate}" v-model="candidate.date">
        </div>
        <div class="errorInput__text errorInput__text" v-show="error.showDate" >{{error.date}}</div>
        <div class="AddCandidate__block">
          <p class="AddCandidate__block-description">Описание</p>
          <textarea @input="error.showDescription=false" name="" cols="30" rows="10" class="AddCandidate__input AddCandidate__textarea" :class="{errorInput__input: error.showDescription}" v-model="candidate.description"></textarea>
        </div>
        <div class="errorInput__text errorInput__text" v-show="error.showDescription">{{error.description}}</div>
        <div class="AddCandidate__button-block">
          <button @click.prevent="addCandidate" class="AddCandidate__button">ДОБАВИТЬ</button>

        </div>
      </div>
</template>

<script>
import TechnologiesInAddCandidate from "./SecondaryComponents/TechnologiesInAddCandidate"
import axios from 'axios'

export default {
  name: 'AddCandidates',
  components: {
    TechnologiesInAddCandidate
  },
  data(){
    return {
      candidate: {
        name: '',
        date: '',
        technologies: {},
        description: ''
      },
      error: {
        name: "Поле с именем обязательное",
        date: "Поле с датой обязательное",
        description: "Поле с описанием обязательное",
        showBackgroundRed: false,
        showDate: false,
        showDescription: false,
        inputCheckName: 0,
      }
    }
  },
  methods: {
    addCandidate(){
      let error = false;
      if(!this.candidate.name){
        this.error.showBackgroundRed = true;
        this.error.inputCheckName = 1;
        error = true;
      }
      else {
        let matches = this.candidate.name.match(/^\s*\p{L}{2,15}\s+\p{L}{2,15}\s+\p{L}{2,15}\s*$/ug) || [];

        if (matches[0]) {
          this.error.inputCheckName = 3;
          this.error.showBackgroundRed = false;
        } else {
          this.error.inputCheckName = 2;
          this.error.showBackgroundRed = true;
          error = true;
        }
      }

      if (!this.candidate.date){
        this.error.showDate = true;
        error = true;
      }
      if (!this.candidate.description){
        this.error.showDescription = true;
        error = true;
      }
      if (error){
        return;
      }
      axios.post('http://localhost/AddCandidate/index', {
        candidateObject: this.candidate,
      }, {withCredentials: true})
      .then(response => {
        if (response){
          alert('Данные успешно добавлены')
          this.candidate = {
            name : '',
            date : '',
            description: ''
          }
          this.error.inputCheckName = 0;
          for (let candidate in this.candidate.technologies){
            this.candidate.technologies[candidate].value = 0;
          }
        }
      })

      // fetch('http://server:81/AddCandidate/index', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     candidateObject: this.candidate,
      //   }),
      // })
      // .then(response => response.json())
      // .catch(()=>console.log('Ошибка после получения заголвков'))
      // .then(result => {
      //   if (result){
      //     alert('Данные успешно добавлены')
      //     this.candidate.name = '';
      //     this.candidate.date = '';
      //     this.candidate.description = '';
      //     this.error.inputCheckName = 0;
      //
      //     for (let candidate in this.candidate.technologies){
      //       this.candidate.technologies[candidate].value = 0;
      //
      //     }
      //   }
      // })
    }
  },
  mounted() {
    axios.get('http://localhost/AddCandidate/index', {withCredentials: true})
        .then(response => {
          this.candidate.technologies = response.data;
        })
        .catch(() => console.log("Ошибка после получения данных"))

    // fetch('http://server/AddCandidate/index')
    //     .then(response => response.json())
    //     .catch(() => console.log('ERROR!!!!!!! после получения заголовков ответа'))
    //     .then(result => {
    //       this.candidate.technologies = result;
    //     })
    //     .catch(() => console.log("Ошибка после получения данных"))
  }
}
</script>

<style scoped lang="scss">
.AddCandidate{
  &__title,
  &__footer{
    height: 80px;
    line-height: 80px;
    font-size: 22px;
    text-transform: uppercase;
    text-align: center;
    border: 1px solid #000;

    position: relative;
  }
  &__subtitle {
    position: absolute;
    right: 20px;
    top: 0;
    font-weight: 700;
    font-size: 36px;
  }
  &__block{
    display: flex;
    min-height: 80px;
    padding: 15px;

  }
  &__block-name,
  &__block-technology,
  &__block-date,
  &__block-description,
  &__block-feedback
  {
    flex: 0 0 120px;
    padding: 15px 0 0 15px;
    margin-right: 15px;
  }
  &__block-date input {
    border: 1px solid #000;
    padding: 0 5px;
    height: 30px;
    border-radius: 5px;

    margin-right: 5px;
    text-align: center;
  }
  &__input[type="date"]{
    width:150px;
  }
  /* Дата */




  &__input{
    border: 1px solid #000;
    padding: 5px;
    width: 350px;
    border-radius: 10px;

    padding: 10px;
  }
  &__textarea{
    width: 100%;
    height: 80px;
    margin-right: 20px;
  }
  &__button-block{
    text-align: center;
    margin: 20px 0;
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

.technology__item-green{
  background-color: green;
}
/* Валидация полей */
.errorInput__text{
  font-size: 18px;
  color: red;
  font-weight: 600;
  margin-left: 25px;

  transition: all .25s;
}
.rightInput__text{
  font-size: 18px;
  color: #26d23b;
  font-weight: 600;
  margin-left: 25px;

  transition: all .25s;
}
.errorInput__input{
  background-color: #ff7878;
  border: 1px solid #6d0000;

  transition: background-color .2s;
}
</style>
