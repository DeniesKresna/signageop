import api from '@/plugins/api'

const costumer = {
    namespaced: true,

	state: {
	},

	mutations: {
	},

	actions: {
	  byEmail({},payload){
	    return new Promise((resolve, reject) => {
	      api.get('/customers/email/'+payload).then(response => {
	          resolve(response.data);
	      });
	    });
	  },
	},

	getters: {
	}
}

export default costumer;