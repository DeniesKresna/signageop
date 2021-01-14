//import qs from 'qs';
import api from '@/plugins/api'

const academyPeriod= {
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
      index({}, payload){
        return new Promise((resolve, reject) => {
          api.get('/academy-periods'+payload).then(response => {
              resolve(response.data);
          });
        });
      },
      show({}, payload){
        return new Promise((resolve, reject) => {
          api.get('/academy-periods/'+payload).then(response => {
            resolve(response.data);
          });
        });
      },
      store({}, payload){
        return new Promise((resolve, reject) => {
          api.post('/academy-periods', payload).then(response => {
            resolve(response.data);
          });
        });
      },
      update({}, payload){
        return new Promise((resolve, reject) => {
          api.put('/academy-periods/'+payload.id, payload).then(response => {
            resolve(response.data);
          });
        });
      },
      destroy({}, payload){
        return new Promise((resolve, reject) => {
          api.delete('/academy-periods/'+payload).then(response => {
            resolve(response.data);
          });
        });
      }
    },

    getters: {
    }
}

export default academyPeriod;