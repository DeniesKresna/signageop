<template>
    <v-container>
      <v-snackbar
          top
          v-model="snackbar"
          timeout="5000"
          color="cyan darken-2"
        >
          Pembayaranmu akan segera diverifikasi admin. Tunggu pemberitahuan dari kami melalui email.

          <template v-slot:action="{ attrs }">
            <v-btn
              color="white"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      <v-row>
        <v-col cols="12" md="12">
          <v-autocomplete
            v-model="jaSelected"
            :items="jaList"
            item-value="id"
            item-text="name"
            dense
            chips
            small-chips
            label="Pilih kelas"
            multiple
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field label="Alamat email" v-model="customer.email" @blur="checkCustomerExist" />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field label="Nama lengkap" v-model="customer.name" />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field label="Nomor WhatsApp" v-model="customer.phone" />
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field label="Dari mana kamu mengetahui Jobhun Academy?" v-model="customer.reference" />
        </v-col>
        <v-col cols="12" md="12">
          <v-textarea
          label="Apa profesimu saat ini?"
          v-model="customer.profession"
        ></v-textarea>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field label="Kamu berasal dari kota mana?" v-model="customer.domicile" />
        </v-col>  
        <v-col cols="12" md="12">
          <v-text-field label="Kode promo" v-model="customer.promo_code" />
        </v-col>      
      </v-row>
      <v-row
        align="center"
        justify="space-around"
      >
        <v-btn
          tile
          color="primary"
          @click.native="storeAcademyCustomer"
          v-if="user == null"
        >
          <v-icon left>
            mdi-check-circle
          </v-icon>
          Lanjutkan pembayaran
        </v-btn>
        <v-btn
          tile
          color="indigo darken-1"
          dark
          @click.native="storeAcademyCustomer"
          v-else
        >
          <v-icon left>
            mdi-plus
          </v-icon>
          Tambah peserta
        </v-btn>
      </v-row>
    </v-container>
</template>
<script>
  export default{
    data(){
      return{
        snackbar: false,
        customer: {
          name: '',
          email: '',
          phone: '',
          reference: '',
          profession: '',
          domicile: ''
        },
        jaSelected: [],
        jaList: []
      }
    },
    mounted(){
    	this.setup();
    },
    methods:{
      setup: async function(){
        this.$store.commit("setPage","academy");

      	let name = "";

	      let res = await this.$store.dispatch('academy/list',"?active=1");
        this.jaList = res.data;
        if(this.$route.query.order_id !== undefined && this.$route.query.order_id != ""){
          this.snackbar = true;
        }
/*
	      let jaList = res.data.map(obj => {
	        return obj.name
	      });
        if(this.$route.query.name !== undefined && this.$route.query.name != ""){
          name = this.$route.query.name;
          if(!jaList.includes(name)){
            this.$swal("Maaf","Tidak ada academy dengan nama " + name,"warning").then(()=>{
                this.jaSelected = "";
            });
          }else{
            this.jaSelected = name;
          }
        }	    
*/  
      },
      storeAcademyCustomer: async function(){
        let payload = this.customer;
        payload['ja_ids'] = this.jaSelected;
        let res = await this.$store.dispatch('academy/customerStore',payload);
        if(res.payment)
          window.location.href = res.data.redirect_url;
      },
      checkCustomerExist: async function(){
        let payload = this.customer.email.trim();
        if(payload != ""){
          let res = await this.$store.dispatch('customer/byEmail', payload);
          if(res.data != null)
            this.customer = res.data;
        }
      },
      reset: function(){
        this.customer = {
          name: '',
          email: '',
          phone: '',
          reference: '',
          profession: '',
          domicile: ''
        }
      }
    },
    computed:{
      user: function(){
        return this.$store.getters.user;
      }
    }
  }
</script>