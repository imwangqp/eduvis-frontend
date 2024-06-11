import {createStore} from "vuex";
import _ from 'lodash'

const store = createStore({
    //数据，相当于data
    state: {
        id: []
    },
    getters: {
        getId(state){
            return state.id
        }
    },
    mutations: {
        addId(state, id){
            if (_.isEqual(_.indexOf(state.id, id), -1)){
                state.id.push(id)
            }
        },
        removeId(state, id){
            _.remove(state.id, i => {
                _.isEqual(i, id)
            })
        }
    },
    actions: {

    },
    modules: {

    },
})

export default store