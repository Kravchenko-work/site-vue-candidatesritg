<template>

    <div class="listCandidates"><h2 class="content__title">Список кандидатов
      <span class="content__subtitle">RITG V</span>
    </h2>

      <form action="#" class="listCandidates__form">
        <div class="form__flex">
          <p class="form__text">ФИО</p>
          <input @input="searchCandidates" class="form__input" v-model="name">
          <p class="form__text form__text-date">Поиск по дате рождения</p>
          <input @input="searchCandidates" class="form__input form__input-date" type="date" v-model="dateStart">
          <p class="form__text form__text-separator">-</p>
          <input @input="searchCandidates" class="form__input form__input-date" type="date" v-model="dateEnd">
        </div>

        <div class="form__technologies">
          <div class="form__technology-item" v-for="(technology, index) in technologies" :key="index">
            <input @change="addTechnologyForSearch" :value="technology"  class="form__technology-input" type="checkbox" :id="index" style="display: none;">
            <label :for="index" class="form__technology-label">{{technology}}</label>
          </div>
        </div>
      </form>

      <div class="listCandidates__table listCandidates__table-title">
        <div class="listCandidates__table-number">№ п/п</div>
        <div class="listCandidates__table-name">ФИО</div>
        <div class="listCandidates__table-date">Дата рождения</div>
        <div class="listCandidates__table-technology">Технологии</div>
        <div class="listCandidates__table-description">Описание</div>
        <div class="listCandidates__table-redaction"></div>
      </div>

      <div class="listCandidates__data" v-for="(candidate) in this.candidates" :key="candidate.id">
        <div class="listCandidates__data-number">{{ candidate.number }}</div>
        <div class="listCandidates__data-name">{{candidate.name}}</div>
        <div class="listCandidates__data-date">{{`${new Date(candidate.date).getDate()} / ${new Date(candidate.date).getMonth()+1} / ${new Date(candidate.date).getFullYear()}`}}</div>
        <div class="listCandidates__data-technology">

          <TechnologiesInListCandidates :technologies="candidate.technologies" />

        </div>
        <div class="listCandidates__data-description">{{candidate.description}}</div>
        <div class="listCandidates__data-redaction">
          <div class="listCandidates__circle-inner" @click="dataForUpdateData=candidate;showModal=true">
            <div class="listCandidates__circle"></div>
          </div>
        </div>

      </div>
      <UpdateCandidate @hiddenModal="hiddenModal" :show="showModal" :updateData="dataForUpdateData"/>
      <div class="page__wrapper">
        <paginate
            :page-count="pageLast"
            :click-handler="pageChangeHandler"
            :prev-text="'<<'"
            :next-text="'>>'"
            :container-class="'page'"
            :page-class="'page__item'"
            :active-class="'page__active'"
            :force-page="currentPage"
        >
        </paginate>
      </div>
    </div>
</template>

<script>
import UpdateCandidate from "./UpdateCandidate"
import TechnologiesInListCandidates from "./SecondaryComponents/TechnologiesInListCandidates"
import axios from "axios";

export default {
  components: {
    UpdateCandidate,
    TechnologiesInListCandidates
  },
  name: 'ListCandidates',
  data(){
    return {
      candidates: null,
      technologies: [],
      activeTechnologies: [],
      showModal: false,
      dataForUpdateData: {},
      pageLast: 1,
      currentPage:1,

      dateStart: '',
      dateEnd: '',
      name: '',
    }
  },

  mounted() {
    //1) Запрос на рендеринг страницы
    // fetch('http://server/Candidate/index', {
    //   credentials: 'include',
    // })
    //     .then(response => {
    //       return response.json();
    //     })
    //     .catch(() => console.log('ERROR!!!!!!! после получения заголовков ответа'))
    //     .then(result => {
    //
    //       this.technologies = result.technologies;
    //       this.candidates = result.candidates;
    //       this.pageLast = result.maxPage;
    //     })
    //     .catch(() => console.log("Ошибка после получения данных"))

    axios.get('http://localhost/Candidate/index',{withCredentials: true})
        .then(response => {
          this.technologies = response.data.technologies;
          this.candidates = response.data.candidates;
          this.pageLast = response.data.maxPage;
        })
        .catch(() => console.log("Ошибка после получения данных"))
  },

  methods: {
    pageChangeHandler(numberPage){//Изменяет таблицу при пагинации
      let selectionAction = numberPage;
      if (numberPage === this.currentPage + 1) {
        selectionAction = true;
      } else if (numberPage  === this.currentPage - 1) {
        selectionAction = false;
      }
      axios.post('http://localhost/Candidate/index', {
        send: {
          selectorAction: selectionAction,
          currentPage: this.currentPage,
          maxPage: this.pageLast
        }
      }, {withCredentials: true})
      .then(response => {
        this.candidates = response.data.candidates;
      })
      .catch(()=> console.log("Ошибка после получения данных"))
      this.currentPage = numberPage;

      // fetch('http://server/Candidate/index', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     send: {
      //       selectorAction: selectionAction,
      //       currentPage: this.currentPage,
      //       maxPage: this.pageLast
      //     }
      //   }),
      //   credentials: 'include',
      // })
      //     .then(response => {
      //       return response.json()
      //     })
      //     .catch(() => console.log('Ошибка после получения заголовков, но перед получением данных'))
      //     .then(result => {
      //       console.log('Данные, которые принимаются');
      //       this.candidates = result.candidates;
      //     })
      //     .catch(()=> console.log("Ошибка после получения данных"))

      this.currentPage = numberPage;

    },
    searchCandidates(){
      let searchCandidates = {
        name: this.name,
        dateStart: this.dateStart,
        dateEnd:this.dateEnd,
        technologies:this.activeTechnologies,
      }
        axios.post('http://localhost/Candidate/index', {
          searchCandidates: searchCandidates,
        }, {withCredentials: true})
        .then(response => {
          this.candidates = response.data.candidates;
          this.pageLast = response.data.maxPage;
          this.currentPage = 1;
        })
        .catch(()=> console.log("Ошибка после получения данных"))

      // fetch('http://localhost/Candidate/index', {
      //     method: 'POST',
      //     body: JSON.stringify({
      //       searchCandidates: searchCandidates,
      //     }),
      //     credentials: 'include',
      //   })
      //     .then(response => {
      //       return response.json();
      //     })
      //     .catch(() => console.log('Ошибка после получения заголовков, но перед получением данных'))
      //     .then(result => {
      //       this.candidates = result.candidates;
      //       this.pageLast = result.maxPage;
      //       this.currentPage = 1;
      //     })
      //     .catch(()=> console.log("Ошибка после получения данных"))


    },
    addTechnologyForSearch(event){
      let technology = event.target.value;
      let checked = event.target.checked;
      let newTechnology = [];
      if (checked) {
        this.activeTechnologies.push(technology);
      } else {
        newTechnology = this.activeTechnologies.filter(function(item){
          if (item !== technology) return true;
        })
        this.activeTechnologies = newTechnology;
      }

      this.searchCandidates();
    },
    hiddenModal(){//Скрывает модальное окно - вызывается на дочернем компоненте
      this.showModal = false;
    }
  },
}
</script>

<style lang="scss">
/* ФОРМА: */
.listCandidates__form{
  margin-bottom: 10px;
}
.form{
  &__flex{
    padding: 25px 25px 0 25px;
    display: flex;

    width: 70%;
    justify-content: space-between;
  }
  &__text{
    display: flex;
    text-align: center;
    line-height: 1.3;
    align-items: center;

    margin-right: 20px;
  }
  &__text-separator{
    flex: 0 0 50px;
    justify-content: center;
    margin: 0;
  }
  &__text-date{
    margin-left: 50px;
  }
  &__text-date{
    flex: 0 0 150px;
  }
  &__input{
    border: 1px solid #000;
    border-radius: 5px;
    height: 30px;
    padding: 5px;
  }
  &__input-date{
    width: 250px;
  }
  &__technologies{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 15px;
  }
  &__technology-item{
    flex: 0 0 100px;
    text-align: center;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 15px;
  }
  &__technology-label{
    background: url('../assets/updateCandidate.png') center center / contain no-repeat scroll;
    padding: 20px 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    user-select: none;

    transition: transform .2s, background .2s;
    word-break:break-all;
    max-width: 250px;
    min-width: 200px;

  }
  &__technology-label:hover{
    cursor: pointer;
    transform: scale(1.2);
  }
  &__technology-input:checked+ &__technology-label{
    background: url('../assets/activeCandidate.png') center center / contain no-repeat scroll;
  }
}
/* ФОРМА: */

.listCandidates{
  &__table,
  &__data{
    display: grid;
    grid-template-columns: 35px calc(20% - 35px) 10% 20%  35% calc(15% - 10px);
    grid-template-rows: auto;

    grid-gap: 2px;
    background-color: grey;
    padding: 2px;
  }
  &__data{
    padding-top: 0;

  }

  &__table div,
  &__data div{
    background-color: #fff;
    padding: 5px 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    word-break:break-all;
  }

  &__data &__data-technology{
    flex-direction: column;
    width: 100%;
  }

  &__data-redaction{
    padding: 15px 0;
    display: flex;
    align-items: center;
  }
  &__circle-inner{
    width: 66px;
    height: 37px;
    background: yellow url(../assets/updateCandidate.png) no-repeat scroll;
    transition: transform .2s;
  }
  &__circle-inner:hover{
    transform: scale(1.5);
    cursor: pointer;
  }
  &__data-redaction &__circle {
    width: 26px;
    height: 26px;
    background-color: grey;
    border-radius: 50%;
  }
}
.page{
  display: flex;
  user-select: none;
  &__wrapper{
    display: flex;
    justify-content: center;
    text-align:center;
    padding:20px;
    font-size:16px;
  }
  &__item{
    margin-right: 5px;
  }
  &__active{
    text-decoration: underline;
  }
}
@media(max-width: 1440px){
  .form__flex{
    width: 90%;
  }
}
@media(max-width: 1180px){
  .form__flex{
    display: block;
  }
  .form__flex p{
    margin: 15px 0;
  }
  .form__technology-item{
    flex: 1 0 0;
  }
  .form__text-date{
    margin-left: 0;
  }
  .form__text-separator{
    justify-content: flex-start;
  }
}


</style>
