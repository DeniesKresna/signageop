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
	  operationalShow({},payload){
	    return new Promise((resolve, reject) => {
	      api.get('v1/device/operational/'+payload.id).then(response => {
	          resolve(response.data);
	      });
	    });
	  },
	  operationalGeoData({},payload){
	    return new Promise((resolve, reject) => {
	      api.get('v1/device/operational/geo-data/'+payload.id).then(response => {
	          resolve(response.data);
	      });
	    });
	  },
	  operationalCampaignData({},payload){
	    return new Promise((resolve, reject) => {
	      api.get('v1/device/operational/campaign-data/'+payload.id).then(response => {
	          resolve(response.data);
	      });
	    });
	  },
	  operationalSetStatus({},payload){
	    return new Promise((resolve, reject) => {
	      api.put('v1/device/operational/'+payload.id, payload).then(response => {
	          resolve(response.data);
	      });
	    });
	  },
	  operationalIncidentData({},payload){
	    return new Promise((resolve, reject) => {
	      api.get('v1/device/operational/incident-data/'+payload.id).then(response => {
	          resolve(response.data);
	      });
	    });
	  },
	},

	getters: {
	}
}

export default device;