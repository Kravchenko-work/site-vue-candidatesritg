<template>
  <div class="navigation">
    <h1 class="navigation__title">RITG V</h1>
<!--    <a class="navigation__link" href="" @click.prevent="$router.push('/ListCandidates')">КАНДИДАТЫ</a>-->
<!--    <a class="navigation__link" href="" @click.prevent="$router.push('/AddCandidate')">ДОБАВИТЬ КАНДИДАТА</a>-->
<!--    <a class="navigation__link" href="" @click.prevent="$router.push('/Technologies')">ТЕХНОЛОГИИ</a>-->
<!--    <a class="navigation__link" href="" @click.prevent="$router.push('/AddTechnology')">ДОБАВИТЬ ТЕХНОЛОГИЮ</a>-->
    <router-link class="navigation__link" to="/ListCandidates">КАНДИДАТЫ</router-link>
    <router-link class="navigation__link" to="/AddCandidate">ДОБАВИТЬ КАНДИДАТА</router-link>
    <router-link class="navigation__link" to="/Technologies">ТЕХНОЛОГИИ</router-link>
    <router-link class="navigation__link" to="/AddTechnology">ДОБАВИТЬ ТЕХНОЛОГИЮ</router-link>
  </div>
</template>

<script>
export default {
  name: "Navigation"
}
</script>

<style scoped lang="scss">
.navigation{
  &__title{
    font-size: 32px;
    font-weight: 700;
    height:80px;
    line-height: 80px;
    border-bottom: 1px solid #000;

    text-align: center;
  }
  &__link{
    display: block;
    border-bottom: 1px solid #000;
    height: 60px;
    line-height: 60px;

    text-align: center;
    font-family: 'Arial Обычный', 'Arial', sans-serif;
    color: #000;
    background-color: #fff;

    transition: background-color .2s;
  }
  &__link:hover{
    background-color: #000;
    color: #fff;
  }
  & .router-link-active{
    background-color: #000;
    color: #fff;
  }
  &__link:active{
    background-color: grey;
  }
}

</style>
