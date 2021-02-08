<template>
<div>
<v-row>
	<v-col cols="12" md="3">
		<v-text-field
			v-model="filter.imei"
            label="Imei"
			@keyup.enter="loadData(1)"
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
<v-row v-if="devices.length > 0">
<v-col cols="6" sm="4" md="3" lg="2" v-for="device in devices" :key="device.id">
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
						@click="showDialog(device)"
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
		        </v-icon> <span class="text-caption">{{device.battery}}%</span>
				<br />
			    <v-icon color="green" size="small">
			    	mdi-monitor
				</v-icon> <span class="text-caption">{{device.monitor}}</span>
				<br />
				<v-icon color="orange" size="small">
			    	mdi-chart-line
				</v-icon> <span class="text-caption">{{device.bandwidth}} {{device.bandwidth != null?"mb":""}}</span><!--
			    <v-icon color="green" size="small">
			    	mdi-map-marker-distance
				</v-icon> <span class="text-caption">5 Km</span>-->
		</v-col>
      </v-row>
      <v-row>
      	<v-col>
      		<span class="body-2" @click="showDialog(device)">{{device.imei}}</span><br />
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
	  scrollable
	  persistent
      width="700"
    >
      <v-card>
		<v-system-bar color="grey">
		<v-spacer></v-spacer>
		<!--
			<v-icon>mdi-window-minimize</v-icon>
			<v-icon>mdi-window-maximize</v-icon>
		-->
			<v-icon @click="closeDialog">mdi-close</v-icon>
		</v-system-bar>

        <v-card-title class="headline grey lighten-2">
          Device Information
        </v-card-title>

        <v-card-text>
          <v-row>
			  	<v-col cols="12">
				  	<div class="subtitle-1">
						  Name: {{device.device_name}} ({{device.imei}})<br />
					</div>
				</v-col>
			  	<v-col cols="12" v-if="device_device_type == 'led'">
				  	<div class="subtitle-2">
						  Driver: {{device.driver_name}} ({{device.driver_phone}})<br />
					</div>
					<div class="subtitle-2">
						  Detail: {{device.car_type}} ({{device.plate_number}})
					</div>
				</v-col>
			  	<v-col cols="12" v-else>
				  	<div class="subtitle-2">
						  Merchant: {{device.merchant_name}} ({{device.merchant_phone}})<br />
					</div>
				</v-col>
				<!----------------------------- Campaign Data ------------------------------------>
				<v-col cols="12">
				  	<v-btn small color="green" @click="getDeviceCampaignData()">
						Last Reported Campaign
					</v-btn>
				</v-col>
				<v-col cols="12" v-if="device_campaign_data != null">
					<div class="subtitle-2">
						<p>Content: {{device_campaign_data.content_name}}</p>
						<video width="400" controls>
							<source :src="device_campaign_data.file_url" type="video/mp4">
							Your browser does not support HTML video.
						</video>
						<p><span v-if="device_campaign_data.campaign_name != null">Campaign: {{device_campaign_data.campaign_name}}</span>
						<span v-else>Guaranteed: {{device_campaign_data.guaranteed_name}}</span></p>
						<span class="deep-purple--text">played {{moment(device_campaign_data.play_start_time).fromNow()}}</span>
					</div>
				</v-col>
				<v-col cols="12" v-if="campaignWarning">
					<div class="caption red--text">
						  no campaign data detected last 5 minutes
					</div>
				</v-col>
				<hr />
				<!----------------------------- Geo Data ------------------------------------>
				<v-col cols="12">
				  	<v-btn small color="warning" @click="getDeviceGeoData()">
						Last Reported Location
					</v-btn>
				</v-col>
				<v-col cols="12" v-if="device_geo_datas.length > 0">
				  	<l-map style="height: 350px" :zoom="16" :center="device_center">
						<l-tile-layer :url="'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'"></l-tile-layer>
						<div v-for="(geo, index) in device_geo_datas" :key="geo.play_start_time">
							<div v-if="index==0">
								<div v-if="checkDeviceOnline(geo.play_start_time)">
									<l-marker :lat-lng="[geo.lat, geo.lng]" :icon="lastIconOnline"><l-tooltip>{{geo.play_start_time}}</l-tooltip></l-marker>
								</div>
								<div v-else>
									<l-marker :lat-lng="[geo.lat, geo.lng]" :icon="lastIconOffline"><l-tooltip>{{geo.play_start_time}}</l-tooltip></l-marker>
								</div>
							</div>
							<div v-else>
								<l-marker :lat-lng="[geo.lat, geo.lng]" :icon="iconHistory"><l-tooltip>{{geo.play_start_time}}</l-tooltip></l-marker>
							</div>
						</div>
					</l-map>
				</v-col>
				<v-col cols="12" v-if="geoWarning">
					<div class="caption red--text">
						  device last lat and lon is 0
					</div>
				</v-col>
		  </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
		  <v-btn
            color="warning"
            text
            @click="changeStatus('download')"
          >
            REDOWNLOAD
          </v-btn>
		  <v-btn
            color="default"
            text
            @click="changeStatus('restart')"
          >
            RESTART
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="closeDialog"
          >
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</div>
</template>
<script>
import L from 'leaflet';
import { LMap, LTileLayer, LMarker, LIcon, LTooltip } from 'vue2-leaflet';
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
			device: {},
			device_device_type: "led",

			//maps=========
			device_geo_datas: [],
			device_center: [-7.273119, 112.742891],
			lastIconOnline: L.icon({
				iconUrl: this.$store.state.apiUrl+'public/img/maps/blue.webp',
				iconSize: [40,40],
				iconAnchor: [16,16]
			}),
			lastIconOffline: L.icon({
				iconUrl: this.$store.state.apiUrl+'public/img/maps/red.png',
				iconSize: [20,20],
				iconAnchor: [16,16]
			}),
			iconHistory: L.icon({
				iconUrl: this.$store.state.apiUrl+'public/img/maps/purple.png',
				iconSize: [20,20],
				iconAnchor: [16,16]
			}),
			geoWarning: false,
			//=============

			//maps=========
			device_campaign_data: null,
			campaignWarning: false,
			//=============

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
	components: {
		LMap,
		LTileLayer,
		LMarker,
		LIcon,
		LTooltip
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
		},
		getDeviceGeoData: async function(){
			let res = await this.$store.dispatch('device/operationalGeoData', this.device);
			let datas = res.datas;
			if(datas.length > 0){
				if(datas[0].lat == 0){
					this.device_geo_datas = [];
					this.geoWarning = true;
				}else{
					this.geoWarning = false;
					this.device_center = [datas[0].lat, datas[0].lng];
					this.device_geo_datas = res.datas;
				}
			}
		},
		getDeviceCampaignData: async function(){
			let res = await this.$store.dispatch('device/operationalCampaignData', this.device);
			let data = res.data;
			if(data == null){
				this.campaignWarning = true;
			}else{
				this.campaignWarning = false;
				this.device_campaign_data = data;
			}
		},
		checkDeviceOnline: function(tm){
			let t1 = new Date();
			let t2 = new Date(tm);
			let dif = t1.getTime()-t2.getTime();
			if(dif > 300000){
				return false;
			}else{
				return true;
			}
		},
		showDialog: async function(item){
			this.device_device_type = item.device_type_name;
			let res = await this.$store.dispatch('device/operationalShow', item);
			this.device = res.data;
			this.dialog = true;
		},
		closeDialog: function(){
			this.device = {};
			this.device_device_type = "led";
			this.device_geo_datas = [];
			this.device_center= [-7.273119, 112.742891];
			this.device_campaign_data = null;
			this.dialog = false;
			this.geoWarning = false;
			this.campaignWarning = false;
		},
		changeStatus: async function(status){
			if(confirm("Yakin akan melakukan " + status + " pada device ini?")){
				let payload = {
					id: this.device.id,
					status: status
				}
				let res = await this.$store.dispatch('device/operationalSetStatus', payload);
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