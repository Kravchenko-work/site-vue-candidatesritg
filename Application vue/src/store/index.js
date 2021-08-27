import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: localStorage.getItem('authorization') || false,
        flagLogin: false,
    },
    // state: {
    //     login: false,
    //     flagLogin: false,
    // },
    mutations: {
        authorization: (state, payload) => {
            state.login = payload;
            if (payload) state.flag = true;
        }
    },
    actions: {
        authorization(context, next) {
            axios.get('http://localhost/CheckAuthorization/index', {withCredentials: true})
                .then(response => {
                    context.commit('authorization', response.data);

                    console.log(`response.data = ${response.data}`)
                    if (response.data){
                        next();
                    }
                    else next('/');
                })
                .catch(() => console.log("ПРОВЕРКА ПОЛЬЗОВАТЕЛЯ НЕ СМОГЛА ПРОЙТИ КОРРЕКТНО"))

            // let xhr = new XMLHttpRequest();
            // xhr.open('GET', 'url', false);

        }
    }
})