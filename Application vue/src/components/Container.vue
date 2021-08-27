<template>
 <div class="container">
     <div class="content">
       <div class="content__left" :class="{'content__left-show':contentLeftShow}">
         <Navigation />
       </div>
       <div class="content__main">
         <button @click="contentLeftShow = !contentLeftShow; contentButtonMove = !contentButtonMove" class="content__button" :class="{'content__button-move': contentButtonMove, 'content__button-active': contentButtonMove}"></button>

         <router-view></router-view>
       </div>
     </div>

   <footer class="footer">&#169; RITG Текущий год</footer>
 </div>
</template>

<script>
import Navigation from './Navigation'

export default {
  name: 'Container',
  data() {
    return {
      contentLeftShow: false,
      contentButtonMove: false,
    }
  },
  components: {
    Navigation
  },

}
</script>
<style lang="scss">

.content{
  display: flex;
  position: relative;

  &__left{
    flex: 0 0 300px;
  }
  &__main{
    flex: 1 0 0;

    border-left: 1px solid #000;

    min-height: calc(100vh - 80px);

    position: relative;
  }

  &__title {
    height: 80px;
    line-height: 80px;
    font-size: 22px;
    text-transform: uppercase;
    text-align: center;
    border-bottom: 1px solid #000;

    position: relative;
  }
  &__subtitle{
    position: absolute;
    right: 20px;
    top: 0;
    font-weight: 700;
    font-size: 36px;
  }
}
.footer{
  height: 80px;
  line-height: 80px;
  font-size: 22px;
  text-transform: uppercase;
  text-align: center;
  border: 1px solid #000;

  position: relative;
}
@media (max-width: 780px){
  .content{
    &__left{
      position: absolute;
      z-index:2;
      left: -200px;

      transition: left .5s;
      border: 5px solid #000;
    }

    &__button{
      display: block;
      width: 35px;
      height: 35px;
      border: 5px solid #000;
      background-color: #fff;

      position: absolute;
      z-index: 1000;
      left: 15px;
      top: 15px;

      transition: left .5s, background-color .2s;
    }
    &__button:hover{
      background-color: grey;
      cursor: pointer
    }
    &__button-active{
      background-color: #000;
      border-color: grey;
    }
    &__button-move{
      left: 150px;
    }
    &__left-show{
      left: 0;
    }
  }
}
@media (max-width: 520px) {
  .content{
    &__title{
      text-align: left;
      padding-left: 70px;

    }
    &__subtitle{
      font-size: 28px;
    }
  }
}
</style>
