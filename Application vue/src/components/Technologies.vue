<template>
  <div class="technologies">
    <h2 class="content__title">Список технологий
      <span class="content__subtitle">RITG V</span>
    </h2>
    <div class="technologies__search">
      <label class="technologies__label" for="technologies__input-search">Поиск</label>
      <input type="text" class="technologies__input" id="technologies__input-search" @input="searchTechnologiesHandler">
    </div>
    <div class="technologiesTable">
      <div class="technologiesTable__header">
        <div class="technologiesTable__number">
        № п/п
        </div>
        <div class="technologiesTable__name">
          НАЗВАНИЕ
        </div>
      </div>
      <div class="technologiesTable__content" v-for="(technology, key, index) in this.searchTechnologies" :key="key">
        <div class="technologiesTable__number">
          {{index + 1}}
        </div>
        <input class="technologiesTable__name" :id="key" :value="technology.name" @change="updateTechnology"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "Technologies",
  data(){
    return {
      technologies: {},
      searchTechnologies: {}
    }
  },
  mounted(){
    axios.get('http://localhost/Technology/index', {withCredentials: true})
    .then(response => {
      this.technologies = response.data;
      this.searchTechnologies = response.data;
    })
    .catch(() => console.log("Ошибка после получения данных"))

    // fetch('http://server/Technology/index')
    //     .then(response => response.json())
    //     .catch(() => console.log('ERROR!!!!!!! после получения заголовков ответа'))
    //     .then(result => {
    //       this.technologies = result;
    //       this.searchTechnologies = result;
    //       console.log(result)
    //     })
    //     .catch(() => console.log("Ошибка после получения данных"))
  },
  methods:{
    searchTechnologiesHandler(event){
      let newTechnologies = {};

      for (let key in this.technologies){
        // TODO переделать!
        let regExp = new RegExp(`${event.target.value.toString()}`, "i")

        if (regExp.test(this.technologies[key].name)){
          newTechnologies[key] = this.technologies[key];
        }
      }
      this.searchTechnologies = newTechnologies;
    },
    updateTechnology(event){
      let technology = this.technologies[event.target.id].name;
      if (event.target.value === ''){

        event.target.value = this.technologies[event.target.id].name;
        alert('Строка пуста');
        event.target.focus();
        return;
      }
      console.log(event.target.id);
      axios.post('http://localhost/Technology/index', {
        updateTechnology: {
          id: event.target.id,
          newName: event.target.value
        }
      }, {withCredentials: true})
      .then(response => {
        if (response.data){
          alert('Данные изменены')
        } else {
          alert('Данные не изменены!')
          console.log(technology);
          event.target.value = technology;
        }
      })

      // fetch('http://server/Technology/index', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     updateTechnology: {
      //       id: event.target.id,
      //       newName: event.target.value
      //     }
      //   })
      // })
      //   .then(response => response.json())
      //   .catch(() =>
      //   console.log('Ошибка после получения заголовков ответа'))
      //   .then(result => {
      //     (!result) || console.log("Данные усапешно изменены на сервере")
      //   })
    }
  }
}
</script>

<style scoped lang="scss">
.technologies{
  display: block;
  &__search{
    padding: 10px;
    display: flex;
    justify-content: center;
  }

  &__label{
    color: grey;
    margin-right: 15px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__input{
    border: 1px solid #000;
    border-radius: 5px;
    padding: 5px 10px;
    margin-right: 70px;
  }
}
  /* Таблица */
.technologiesTable{
  margin-bottom: 30px;
  &__header,
  &__content{
    display: flex;
  }
  &__header{
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
  }
  &__content{
    border-bottom: 1px solid grey;
  }

  &__number{
    flex: 0 0 120px;
    padding: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid grey;
  }
  &__name{
    flex: 1 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  &__content &__name{
    user-select: none;
    background-color: #c7c5c5;

    transition: background-color .2s;
  }
  &__content &__name:hover{
    cursor: pointer;
    background-color: rgba(22, 155, 213, 1);
  }
  &__content &__name:focus{
    background-color: #fff;

  }
}

  /* Таблица */

</style>
