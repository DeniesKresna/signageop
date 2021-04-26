import axios from 'axios';
import swal from './swal';
import store from '@/store';

import Vue from 'vue';

const api = axios.create({
 //baseURL: 'https://smartit-32ba08c9.localhost.run/pendaftaran-api/public/api',
 //baseURL: 'http://localhost:8080/signage/public/api/',
 baseURL: 'https://api.signage.co.id/api/',
});

api.defaults.timeout = 10000;
api.interceptors.request.use(
  config => {
    store.commit("setOverlay",true);
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.common["Authorization"] = token;
    }
    return config;
  },
  error => {
    store.commit("setOverlay",false);
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  response => {
    store.commit("setOverlay",false);
    if (response.status === 200 || response.status === 201) {
      let msg = response.data.message;
      if(msg !== undefined){
        Vue.swal('Success!',msg,'success');
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
error => {
    store.commit("setOverlay",false);
    if(error.response.status === 401){
        store.commit('setLoginDialog',true);
        //Vue.swal('Maaf','Kamu harus login','error');
    }
    else if(error.response.status === 450){
        let msg = error.response.data.message;
        Vue.swal('Sorry',msg,'error');
    }
    else if(error.response.status === 422){
        let renderhtml = "<ul>";
        let err = error.response.data.errors;
        for(let x in err){
            renderhtml += "<li>" + err[x][0] + "</li>";
        }
        renderhtml += "</ul>";
        Vue.swal({
            title: "Wrong Input", 
            html: renderhtml,
            icon: "warning"
        });
    }
    else if(error.response.status === 500){
        let msg = "Server has some trouble";
        Vue.swal('Sorry',msg,'error');
    }
    else if(error.response.status === 430){
        console.log(error.response.data)
    }
    return Promise.reject(error.response);
  }
);

export default api