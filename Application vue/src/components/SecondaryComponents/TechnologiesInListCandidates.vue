<template>
  <div class="technology__wrapper">
    <div class="technology" v-for="(technologyItem) in choseTechnologies(technologies)" :key="technologyItem.id" >
      <div class="technology__name">{{ technologyItem.name }}</div>
      <div class="technology__chart">
        <div class="technology__item" :class="(technologyItem.value == 1 || technologyItem.value == 2 || technologyItem.value == 3) ? 'language-chart__item-green' : ''"></div>
        <div class="technology__item" :class="(technologyItem.value == 2 || technologyItem.value == 3) ? 'language-chart__item-green' : ''"></div>
        <div class="technology__item" :class="(technologyItem.value == 3) ? 'language-chart__item-green' : ''"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TechnologiesInListCandidates",
  props: ['technologies'],
  methods: {
    choseTechnologies(technology){


      // TODO переделать!
      // TODO переделать!
      // TODO переделать!
      // let obj = {};
      // for (let key in this.candidates[index].technologies){
      //   if (this.candidates[index].technologies[key].value > 0){
      //     // TODO переделать!
      //     obj[key] = {};
      //     obj[key].name = this.candidates[index].technologies[key].name;
      //     obj[key].value = this.candidates[index].technologies[key].value;
      //   }
      // }]
      let obj = Object.assign({}, technology);
      for (let item in obj){
        // TODO переделать!
        if (+technology[item].value === 0 )  delete obj[item];
      }
      return obj;
    },
  }
}
</script>

<style scoped lang="scss">
.technology{
  display: flex;
  width: 100%;
  &__wrapper{
    width: 100%;
    flex-direction: column;
  }
  &__name{
    flex: 1 0 0;
    padding: 5px;
    line-height: 1.3;
  }
  &__chart{
    flex: 1 0 0;
    padding: 5px 10px;
  }
  &__item{
    width: 30px;
    height: 30px;
    border: 1px solid grey;
  }
}
.language-chart__item-green{
  background-color: green !important;
}

</style>