<template>
<div>
<v-row>
	<v-col cols="12" md="3">
		<v-text-field
			v-model="filter.imei"
            label="Imei"
          ></v-text-field>
	</v-col>
	<v-col cols="12" md="3">
		<span class="caption">Battery</span>
		<v-slider
		  class="mt-2"
          v-model="filter.battery_max"
          :thumb-size="30"
          :min = "0"
          :max = "100"
          step = "10"
          thumb-color= "lime lighten-4"
          thumb-label="always"
        >
          <template v-slot:thumb-label="{ value }">
          	<v-icon :color="setColor(value)" size="small" v-if="value < 10">
	            mdi-battery-alert
	        </v-icon>
          	<v-icon :color="setColor(value)" size="small" v-else-if="value > 9 && value < 100">
	            mdi-battery-{{value}}
	        </v-icon>
          	<v-icon :color="setColor(value)" size="small" v-else>
	            mdi-battery
	        </v-icon>
	        <span v-if="value < 100" class="black--text">{{value}}</span>
          </template>
        </v-slider>
	</v-col>
	<v-col>
		<v-select
		  v-model="filter.device_type"
          :items="screen_types"
          item-text="text"
          item-value="value"
          label="Screen Type"
        ></v-select>
	</v-col>
	<v-col>
		<v-select
		  v-model="filter.monitor"
          :items="monitor_status"
          item-text="text"
          item-value="value"
          label="Monitor"
        ></v-select>
	</v-col>
	<v-col>
		<v-select
		  v-model="filter.online"
          :items="online_status"
          item-text="text"
          item-value="value"
          label="On Status"
        ></v-select>
	</v-col>
	<v-col>
		<v-btn
	      class="ma-2" outlined
	      fab color="indigo"
	      @click="loadData(1)"
	    >
	      <v-icon>mdi-cloud-search-outline</v-icon>
	    </v-btn>
	</v-col>
</v-row>
<v-row>
<v-col cols="6" sm="4" md="3" lg="2" xl="1" v-for="device in devices" :key="device.id" v-if="devices.length > 0">
  <v-card>
    <v-container class="pt-0">
      <v-row>
        <v-col>
	      	<v-badge
		        :color="device.online == 'on'? 'green':'pink'"
		      >
		            <v-img
			            height="70"
			            width="70"
			            :src="apiUrl + 'public/img/device_types/' + device.device_type_name + '.png'"
			          ></v-img>
		    </v-badge>
		</v-col>
		<v-col class="pl-0">
				<v-icon :color="setColor(device.battery)" size="small" v-if="device.battery < 10 && device.power == 'off'">
		            mdi-battery-alert
		        </v-icon>
				<v-icon :color="setColor(device.battery)" size="small" v-else-if="device.battery < 10 && device.power == 'on'">
		            mdi-charging-10
		        </v-icon>
	          	<v-icon :color="setColor(device.battery)" size="small" v-else-if="device.battery > 9 && device.battery < 100">
		            mdi-battery{{device.power == 'on'? '-charging':''}}-{{Math.floor(device.battery / 10) * 10}}
		        </v-icon>
	          	<v-icon :color="setColor(device.battery)" size="small" v-else>
		            mdi-battery{{device.power == 'on'? '-charging':''}}
		        </v-icon> <span class="text-caption">{{device.battery}}</span>
				<br />
			    <v-icon color="green" size="small">
			    	mdi-monitor
				</v-icon> <span class="text-caption">{{device.monitor}}</span>
				<br /><!--
			    <v-icon color="green" size="small">
			    	mdi-map-marker-distance
				</v-icon> <span class="text-caption">5 Km</span>-->
		</v-col>
      </v-row>
      <v-row>
      	<v-col>
      		<span class="body-2">{{device.imei}}</span><br />
      		<span class="caption deep-purple--text">online {{moment(device.last_online).fromNow()}}</span>
      	</v-col>
      </v-row>
    </v-container>
  </v-card>
</v-col>
</v-row>

<v-row>
	<v-col>
		<div class="text-center">
		    <v-pagination
		      :value="pagination.page"
		      :length="pagination.lastPage"
		      :total-visible="7"
		      @input="loadData"
		    ></v-pagination>
		    Found {{devices.length}} datas
		 </div>
	</v-col>
</v-row>
<div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Device Information
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</div>
</template>
<script>
	var moment = require('moment');
export default{
	data(){
		return {
			moment: moment,
			filter: {
				imei: "",
				battery_max: 100,
				device_type: "",
				monitor: "",
				online: 0
			},

			screen_types: [{text:'All',value:''},{text:'Led',value:'led'},{text:'Screen',value:'screen'}],
			monitor_status: [{text:'All',value:''},{text:'Wake',value:'wake'},{text:'Sleep',value:'sleep'}],
			online_status: [{text:'All',value:0},{text:'Online',value:1},{text:'Offline',value:2}],

			dialog: false,
			devices: [],
			pagination:{
	        	page: 1,
	        	totalData: 0,
	        	lastPage: 1
	        },
		}
	},
	mounted(){
		this.loadData();
	},
	methods: {
		loadData: async function(page=1){
			this.pagination.page = page;
			let imei = "";
			if(this.filter.imei.trim() != ""){
				imei = this.filter.imei.trim()
			}

			let qs = "?imei="+imei+"&battery_max="+this.filter.battery_max+"&device_type="+this.filter.device_type+"&monitor="+this.filter.monitor+"&online="+this.filter.online+"&page="+this.pagination.page;
			
			let res = await this.$store.dispatch('device/operationalIndex',qs);
			this.devices = res.data.data;
			this.pagination.page = res.data.current_page;
			this.pagination.totalData = res.data.total;
			this.pagination.lastPage = res.data.last_page;
		},
		setColor: function(clr){
			if(clr >= 30 && clr < 70){
				return "orange";
			}else if(clr < 30){
				return "red";
			}else{
				return "green";
			}
		}
	},
	computed: {
		apiUrl(){
			return this.$store.getters.apiUrl;
		}
	}
}
</script>