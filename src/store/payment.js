//import qs from 'qs';
import api from '@/plugins/api'

const payment= {
    namespaced: true,
/*
    state: {
      loadedPosts: []
    },

    mutations: {
      setPosts(state, posts){
        state.loadedPosts = posts;
      }
    },
*/
    actions: {
      show({}, payload){
        return new Promise((resolve, reject) => {
          api.get('/payments/'+payload).then(response => {
            console.log(response.data)
            resolve(response.data);
          });
        });
      }
    },

    getters: {
    }
}

export default payment;