import {createStore} from "vuex";
import _ from 'lodash'

const store = createStore({
    //数据，相当于data
    state: {
        id: [],
        detail: {}
    },
    getters: {
        getId(state){
            return state.id
        },
        getDetail(state){
            return state.detail
        }
    },
    mutations: {
        addId(state, id){
            console.log(id)
            for (const singleId of id) {
                if (!state.id.includes(singleId)) {
                    state.id.push(singleId);
                }
            }
        },
        removeId(state, id){
            _.remove(state.id, i => {
                _.isEqual(i, id)
            })
        },
        setDetail(state, detail){
            state.detail=detail
        },
    },
    actions: {

    },
    modules: {

    },
})

export default store