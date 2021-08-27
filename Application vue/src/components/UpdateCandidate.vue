<template>
  <div class="updateCandidate__inner" :class="{showCss: show}">

    <div class="updateCandidate">
      <div class="updateCandidate__item">
        <label for="updateCandidate__name" class="updateCandidate__label">ФИО:</label>
        <input type="text" id="updateCandidate__name" class="updateCandidate__input" v-model="updateData.name">
      </div>
      <div class="updateCandidate__item">
        <label for="updateCandidate__login" class="updateCandidate__label" >Дата рождения:</label>
        <input type="date" id="updateCandidate__login" class="updateCandidate__input" v-model="updateData.date">
      </div>
      <div class="updateCandidate__item">
        <div class="updateCandidate__technologies">
          <p class="technologies__title">Технологии:</p>

          <div class="technologies" v-for="(technology, key, index) in updateData.technologies" :key="index">
              <div class="technology">
                <h2 class="technology__name">{{technology.name}}</h2>
                <div class="language-chart">
                  <div class="language-chart__item" @click="technology.value=1" :class="(technology.value == 1 || technology.value == 2 || technology.value == 3) ? 'language-chart__item-green' : ''"></div>
                  <div class="language-chart__item" @click="technology.value=2" :class="(technology.value == 2 || technology.value == 3) ? 'language-chart__item-green' : ''"></div>
                  <div class="language-chart__item" @click="technology.value=3" :class="(technology.value == 3) ? 'language-chart__item-green' : ''"></div>
                </div>
              </div>

          </div>
        </div>
      </div>
      <div class="updateCandidate__item">
        <label for="updateCandidate__description" class="updateCandidate__label">Описание:</label>
        <textarea class="updateCandidate__input" id="updateCandidate__description" cols="30" rows="10" v-model="updateData.description"></textarea>
      </div>
      <button @click="updateCandidate" class="updateCandidate__button">Изменить данные</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "UpdateCandidate",
  props: ['show', 'updateData'],
  methods: {
    updateCandidate() {
      axios.post('http://localhost/Candidate/index', {
        updateCandidate: this.updateData
      }, {withCredentials: true})
      .then(response => {
        console.log(response.data);
        if (response.data) {
          alert('Данные успешно изменены');
        } else {
          alert('Произошла ошибка');
        }
      })
      .catch(() => console.log("Ошибка после получения данных"))

      // fetch('http://server/Candidate/index', {
      //  method: 'POST',
      //  body: JSON.stringify({
      //    updateCandidate: this.updateData
      //  })
      // })
      //  .then(response => {
      //     return response.json()
      //   })
      //   .catch(() => console.log('Ошибка после получения заголовков, но перед получением данных'))
      //   .then(result => {
      //
      //     if (!result) {
      //       alert('Данные успешно изменены');
      //     } else {
      //       alert('Произошла ошибка');
      //     }
      //   })
      //   .catch(()=> console.log("Ошибка после получения данных"))

      this.$emit('hiddenModal');
    }
    }
}
</script>

<style scoped lang="scss">
.showCss {
  opacity: 1 !important;
  display: flex !important;
}
.updateCandidate{
  min-width: 450px;
  background-color: #fff;
  opacity: 1;

  padding: 10px;
  margin-bottom: 15px;
  font-size: 24px;
  &__inner{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #6e6d6d;
    overflow-y: auto;
    opacity: 0;
    z-index: 99;

    display: none;
    align-items: flex-start;
    justify-content: center;

    transition: opacity 200ms ease-in; /* анимация перехода */
  }



  &__item{
    margin-bottom: 20px;
  }
  &__label{
    display: block;
    margin-bottom: 10px;
  }
  &__input{
    padding: 5px 10px;
    border: 1px solid #000;
    border-radius: 5px;
  }

  &__technologies{
    display: flex;
    flex-wrap: wrap;
  }
}
#updateCandidate__name,
#updateCandidate__description{
   width: 80%;
 }
/* Отдел с технологиями */

.technologies{
  flex: 0 0 calc(25% - 20px);
  margin-right: 15px;

  &:nth-child(3n){
    margin-right: 0;
  }
  &__title {
    margin-bottom: 15px;
    flex: 1 0 100%;

  }
  .technology__name{
    margin-bottom: 5px;
    font-size: 17px;
  }
  .language-chart{


    display: flex;
  }
  .language-chart__item{
    width: 25px;
    height: 25px;
    border: 1px solid grey;

    transition: background-color .2s;
  }
  .language-chart__item:hover{
    cursor: pointer;
  }
  .language-chart__item-green{
    background-color: green !important;
  }
}

/* Отдел с технологиями */

.updateCandidate__button{
  &{

    background-color: rgba(22, 155, 213, 1);
    color: #fff;
    text-transform: uppercase;
    border-radius: 5px;
    padding: 10px 15px;
    letter-spacing: 1px;
    border:1px solid #fff;

    transition: box-shadow .2s;
  }
  &:hover{
    box-shadow: 0 0 5px 5px #0f5c7d;
  }
  &:active{
    background-color: #169bd5;
    border: 1px solid #000;
    color: #000;
  }
}
</style>
