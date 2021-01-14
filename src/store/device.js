import api from '@/plugins/api'

const device = {
    namespaced: true,

	state: {
	},

	mutations: {
	},

	actions: {
	  operationalIndex({},payload){
	    return new Promise((resolve, reject) => {
	      api.get('v1/device/operational'+payload).then(response => {
	          resolve(response.data);
	      });
	    });
	  },
	},

	getters: {
	}
}

export default device;