//import qs from 'qs';
import api from '@/plugins/api'

const academy= {
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
      index({},payload){
        return new Promise((resolve, reject) => {
          api.get('/academies'+payload).then(response => {
              resolve(response.data);
          });
        });
      },
      list({},payload){
        return new Promise((resolve, reject) => {
          api.get('/academies/list'+payload).then(response => {
              resolve(response.data);
          });
        });
      },
      store({},payload){
        return new Promise((resolve, reject) => {
          api.post('/academies',payload).then(response => {
            resolve(response.data);
          });
        });
      },
      destroy({}, payload){
        return new Promise((resolve, reject) => {
          api.delete('/academies/'+payload).then(response => {
            resolve(response.data);
          });
        });
      },
      customerStore({}, payload){
        return new Promise((resolve, reject) => {
          api.post('/academies/customer',payload).then(response => {
            resolve(response.data);
          });
        });
      },
      customerShow({}, payload){
        return new Promise((resolve, reject) => {
          api.get('/academies/customer'+payload).then(response => {
            resolve(response.data);
          });
        });
      },
      customerDestroy({}, payload){
        return new Promise((resolve, reject) =>{
          api.delete('/academies/customer/'+payload).then(response => {
            resolve(response.data);
          });
        });
      },
      paymentStore({}, payload){
        return new Promise((resolve, reject)=>{
          api.post('/academies/payment',payload).then(response => {
            resolve(response.data);
          });
        });
      }
    },

    getters: {
    }
}

export default academy;