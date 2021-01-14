//import qs from 'qs';
import api from '@/plugins/api'

const mentor= {
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
          api.get('/mentors'+payload).then(response => {
              resolve(response.data);
          });
        });
      },
      list({}, payload){
        return new Promise((resolve, reject) => {
          api.get('/mentors/list'+payload).then(response => {
              resolve(response.data);
          });
        });
      },
      store({}, payload){
        return new Promise((resolve, reject) => {
          api.post('/mentors', payload).then(response => {
            resolve(response.data);
          });
        });
      },
      update({}, payload){
        return new Promise((resolve, reject) => {
          api.put('/mentors/'+payload.id, payload).then(response => {
            resolve(response.data);
          });
        });
      },
      destroy({}, payload){
        return new Promise((resolve, reject) => {
          api.delete('/mentors/'+payload).then(response => {
            resolve(response.data);
          });
        });
      }
    },

    getters: {
    }
}

export default mentor;