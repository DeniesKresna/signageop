<template>
<v-container>
    <v-row>
        <v-col cols="12" md="12">
			<v-card
			    class="mx-auto"
			    outlined
			  >
			  	<v-card-title>
			  		{{status}}
			  	</v-card-title>
			  	<v-card-text>
			  		{{statusText}}
			  	</v-card-text>
			    <v-card-actions>
			      <v-btn
			    	@click="backToJobhun"
			        outlined
			        rounded
			        text
			      >
			      	Kembali ke jobhun 
			      </v-btn>
			      <v-btn
			      	to="/academy-form"
			        outlined
			        rounded
			        text
			      >
			        Pilih Akademi
			      </v-btn>
			    </v-card-actions>
			  </v-card>
		</v-col>
	</v-row>
</v-container>
</template>
<script>
export default{
	data(){
		return{
			status: "Error",
			statusText: "Hubungi Admin"
		}
	},
	mounted(){
		this.setup();
	},
	methods:{
		setup: function(){
			let status = "";
			if(this.$route.query.status != undefined && this.$route.query.status != ""){
				status = this.$route.query.status
			}
			if(status == "success"){
				this.status = "Berhasil";
				this.statusText = "Kamu berhasil melakukan pembayaran :). Tunggu verifikasi Admin Jobhun.";
			}
			else if(status == "fail"){
				this.status = "Maaf";
				this.statusText = "Kamu tidak berhasil melakukan pembayaran :(. Coba hubungi admin jika bermasalah.";
			}
			else if(status == "pending"){
				this.status = "Pending";
				this.statusText = "Permintaan kamu sedang pending, coba hubungi admin jika ingin tau masalahnya";
			}
		},
		backToJobhun: function(){
			window.location.href = 'https://jobhun.id';
		}
	}
}
</script>