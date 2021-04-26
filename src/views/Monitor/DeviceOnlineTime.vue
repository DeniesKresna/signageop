<template>
<div>
<v-row>
	<v-col cols="12" md="3">
		<v-text-field
			v-model="filter.search"
            label="Type Imei"
			@keyup.enter="loadData(1)"
          ></v-text-field>
	</v-col>
    <v-col cols="12" md="3">
		<v-dialog
            ref="dialogDate"
            v-model="modalDate"
            :return-value.sync="filter.date"
            persistent
            width="290px"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="filter.date"
                label="Choose Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
            </template>
            <v-date-picker
                v-model="filter.date"
                scrollable
            >
                <v-spacer></v-spacer>
                <v-btn
                    text
                    color="primary"
                    @click="$refs.dialogDate.save(filter.date)"
                >
                    OK
                </v-btn>
            </v-date-picker>
        </v-dialog>
	</v-col>
	<v-col>
		<v-btn
	      class="ma-2" outlined
	      fab color="indigo"
	      @click="getTimeTotal"
	    >
	      <v-icon>mdi-cloud-search-outline</v-icon>
	    </v-btn>
	</v-col>
</v-row>
<v-row v-if="lastImei != '' && lastDate != ''">
    <v-col>
        <p>Total Online device with Imei <strong>{{lastImei}}</strong> at <strong>{{lastDate}}</strong> is : <strong>{{timeTotal}}</strong></p>
    </v-col>
</v-row>
</div>
</template>
<script>
var moment = require('moment');
require("moment-duration-format");
export default{
	data(){
		return {
            filter: {
                search: "",
                date: new Date().toISOString().substr(0, 10),
            },
            modalDate: false,
            timeTotal: "00:00:00",
            lastImei: "",
            lastDate: ""
		}
	},
	mounted(){
	},
	methods: {
        getTimeTotal: async function(){
            this.lastImei = this.filter.search;
            this.lastDate = this.filter.date;
            this.timeTotal= "00:00:00";
            let payload = "";
            if(this.filter.search != "" && this.filter.date != ""){
                payload += "?imei="+this.filter.search+"&date="+this.filter.date;
            }
            let res = await this.$store.dispatch('device/operationalOnlineTime', payload);
			let datas = res.total_online;
            let duration = moment.duration(datas, 'seconds');
            this.timeTotal = duration.format("hh:mm:ss", { trim: false });
        }
	},
	computed: {
	}
}
</script>
<style scoped>
.cursormode{
	cursor: pointer;
}
.fly-left {
    position: relative;
    z-index: 90;
}
</style>