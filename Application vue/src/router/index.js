import VueRouter from 'vue-router'

import ListCandidates from '../components/ListCandidates'
import AddCandidate from '../components/AddCandidate'
import Authorization from '../components/Authorization'
import Registration from "../components/Registration";
import Technologies from "../components/Technologies";
import AddTechnology from "../components/AddTechnology";

import store from '../store/index'


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Authorization,
            meta: {
                authorization: false,
            },
        },
        {
            path: '/ListCandidates',
            component: ListCandidates,
            meta: {
                authorization: true
            }
        },
        {
            path: '/AddCandidate',
            component: AddCandidate,
            meta: {
                authorization: true
            }
        },
        {
            path: '/Registration',
            component: Registration,
            meta: {
                authorization: true
            }
        },
        {
            path: '/Technologies',
            component: Technologies,
            meta: {
                authorization: true
            }
        },
        {
            path: '/AddTechnology',
            component: AddTechnology,
            meta: {
                authorization: true
            }
        },
    ],
})

router.beforeEach((to, from, next)=> {
    //Переход по страницам
    if(!to.matched.some(record => record.meta.authorization)){//Проверка на существования meta.authorization
        next();
        return;
    }

    // if (!store.state.flagLogin){
    //     store.dispatch('authorization', next);
    // } else {
    //     next();
    // }

    store.dispatch('authorization', next);

    //Для local.storage
    // if (store.state.login){
    //     next();
    // } else {
    //     next('/');
    // }
})

export default router;