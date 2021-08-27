<template>
  <div class="technology__wrapper">
    <div class="technology" v-for="(technology, key, index) in technologies" :key="index" >
      <div class="technology__name">{{ technology.name }}</div>
      <div class="technology__chart">
        <div class="technology__item" @click="technology.value=1" :class="(technology.value === 1 || technology.value === 2 || technology.value === 3) ? 'technology__item-green' : ''"></div>
        <div class="technology__item" @click="technology.value=2" :class="(technology.value === 2 || technology.value === 3) ? 'technology__item-green' : ''"></div>
        <div class="technology__item" @click="technology.value=3" :class="(technology.value === 3) ? 'technology__item-green' : ''"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TechnologiesInAddCandidate",
  props: ['technologies']
}
</script>

<style scoped lang="scss">
.technology{

}
.technology {
  display: flex;
  flex: 0 0 23%;
  user-select: none;

  margin-bottom: 15px;
  border: 1px solid #000;
  border-radius: 5px;
  transition: transform .2s;

  &__wrapper{
    flex: 1 0 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  &__name{
    flex: 1 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__chart{
    flex: 1 0 0;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__item{
    width: 25px;
    height: 25px;
    border: 1px solid grey;

    transition: background-color .2s, transform .2s;
    &:hover{
      cursor: pointer;
    }
    &-green{
      background-color: green !important;
    }
  }
}



</style>
