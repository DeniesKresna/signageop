<template>
    <v-container>
      	<v-row>
        	<v-col>
        		<v-card>
				    <v-card-title>
						Peserta
				    </v-card-title>
				    <v-container>
				    	<!-- ==================================== Filtering Form ==========================-->
				    	<v-row>
				    		<v-col cols="12" md="6" sm="6">
						        <v-select
						            v-model="jaSelected"
						            :items="jaList"
						            item-text="name"
						            item-value="id"
						            label="Nama kelas"
						          ></v-select>
						    </v-col>
						   	<v-col cols="12" md="6" sm="6">
						   		<v-menu
							        v-model="menu"
							        :close-on-content-click="false"
							        :nudge-right="40"
							        transition="scale-transition"
							        offset-y
							        min-width="290px"
							      >
							        <template v-slot:activator="{ on, attrs }">
							          <v-text-field
							            v-model="period"
							            label="Periode"
							            readonly
							            v-bind="attrs"
							            v-on="on"
							          ></v-text-field>
							        </template>
							        <v-date-picker v-model="period" @input="menu = false"></v-date-picker>
							      </v-menu>	
							</v-col>
						   	<v-col cols="12" md="6" sm="6">
						   		<v-text-field
							        v-model="searchCustomer"
							        label="Peserta"
							      ></v-text-field>
							</v-col>
						   	<v-col cols="12" md="6" sm="6">
						   		<v-select
						            v-model="filterSelected"
						            :items="filterList"
						            item-text="name"
						            item-value="link"
						            label="Pembayaran"
						          ></v-select>
							</v-col>
							<v-col cols="12" md="12" class="d-flex justify-space-around">
						   		<v-btn
						   			small
						   			tile
						          color="primary"
						           @click="reset"
						        >
						          <v-icon left>
						            mdi-refresh
						          </v-icon>
						          Atur
						        </v-btn>
						   		<v-btn
						   			small
						   			dark
						   			tile
						          color="pink darken-1"
						           @click="createDialog"
						        >
						          <v-icon left>
						            mdi-plus
						          </v-icon>
						          Tambah
						        </v-btn>
						   		<v-btn
						   			small
						   			tile
						          color="success"
						           @click="loadData"
						        >
						          <v-icon left>
						            mdi-cloud-search-outline
						          </v-icon>
						          Filter
						        </v-btn>
						        
						   		<v-btn
						   			v-show="rowSelected.length > 0"
						   			small
						   			tile
						          color="warning"
						           @click="editDialog()"
						        >
						          <v-icon left>
						            mdi-pencil
						          </v-icon>
						          Ubah
						        </v-btn>
						    	
							</v-col>
						</v-row>
				    	<!-- ==================================== End fo Filtering Form ==========================-->
						<v-row>
							<v-col col="12">
								<h6>total Data = {{pagination.totalData}} row{{pagination.totalData > 1?"s":""}}, total Price IDR {{totalPrice}} </h6>
							</v-col>
						</v-row>
						<v-row v-if="datas.length > 0">
							<v-col md="12">
								<v-data-table
								  v-model="rowSelected"
							      :headers="headers"
							      :items="datas"
							      item-key="id"
							      show-select
							      hide-default-footer
							      :items-per-page="10"
							    >
							    	<template v-slot:item.actions="{ item }">
							    	  <v-icon
								      	v-if="item.status == 1 || item.status == 2"
								        small
								        class="mr-2"
								        @click="showDialog(item)"
								      >
								        mdi-eye
								      </v-icon>
								      <v-icon
								      	v-if="item.status != 1"
								        small
								        class="mr-2"
								        @click="editDialog(item)"
								      >
								        mdi-pencil
								      </v-icon>
								      <v-icon
								      	v-if="item.status != 1"
								        small
								        @click="deleteData(item)"
								      >
								        mdi-delete
								      </v-icon>
								    </template>
							    </v-data-table>
							</v-col>
						</v-row>
						<v-row v-else>
							<v-col><p>no data</p></v-col>
						</v-row>
						<v-row v-if="pagination.totalData > 0">
							<v-col>
								<div class="text-center">
								    <v-pagination
								      v-model="pagination.page"
								      :length="pagination.last_page"
								      :total-visible="7"
								    ></v-pagination>
								 </div>
							</v-col>
						</v-row>
					</v-container>
				</v-card>
        	</v-col>
    	</v-row>
    	<v-dialog
		      v-model="dataDialog"
		      persistent
		    >
	      <v-card>
	        <v-card-title class="headline">{{dataDialogModeLabel}} pembayaran peserta</v-card-title>

	        <v-card-text>
	          <v-container>
	            <v-row>
	              <v-col cols="12">
	              	<v-textarea readonly v-model="payment.customer_list_string">
	              	</v-textarea>
	              </v-col>
	              <v-col cols="12">
	              	<v-text-field :readonly="dataDialogMode == 'show'" v-model="payment.transaction_id" label="Id transaksi" ></v-text-field>
	              </v-col>
	              <v-col cols="12">
	              	<v-text-field :readonly="dataDialogMode == 'show'" v-model="payment.via" label="Pembayaran via" ></v-text-field>
	              </v-col>
	              <v-col cols="12">
	              	<v-text-field :readonly="dataDialogMode == 'show'" v-model="payment.amount" label="Jumlah pembayaran" type="number"></v-text-field>
	              </v-col>
	            </v-row>
	            <v-row>
	              <v-col cols="12">
	              </v-col>
	            </v-row>
	          </v-container>
	        </v-card-text>

	        <v-card-actions>
	          <v-spacer></v-spacer>
	          <v-btn
	          	v-if="dataDialogMode != 'show'"
	            color="green darken-1"
	            text
	            @click="editData"
	          >
	            Kirim
	          </v-btn>
	          <v-btn
	            color="red darken-1"
	            text
	            @click="dataDialog = false"
	          >
	            Tunda
	          </v-btn>
	        </v-card-actions>
	      </v-card>
	    </v-dialog>
    </v-container>
</template>
<script>
export default{
	data(){
		return{
			jaList:[],
			jaSelected:null,
			//period: new Date().toISOString().substr(0, 10),
			period: null,
			menu: false,
			searchCustomer: '',
			filterList:[
				{name: "Semua", link: ""},
				{name: "Belum Bayar", link: "&status=0"},
				{name: "Pending Bayar", link: "&status=2"},
				{name: "Sudah Bayar", link: "&status=1"}
			],
			filterSelected: null,
			payment: {
				transaction_id: "",
				via: "",
				amount: "",
				customer_list_string: "",
			},
			totalPrice: 0,
	        headers: [
	          { text: 'Kelas', value: 'academy_name', sortable: false},
	          { text: 'Periode', value: 'period', sortable: false},
	          { text: 'Peserta', value: 'customer_name', sortable: false },
	          { text: 'Email', value: 'customer_email', sortable: false },
	          { text: 'Harga', value: 'amount', sortable: false },
	          { text: 'Status', value: 'status_string', sortable: false },
	          { text: 'Diubah', value: 'updated_at', sortable: false },
	          { text: 'Pengubah', value: 'updater_name', sortable: false },
	          { text: 'Aksi', value: 'actions', sortable: false },
	        ],
	        datas: [],
			rowSelected: [],
	        pagination:{
	        	page: 1,
	        	totalData: 0,
	        	lastPage: 1
	        },
	        dataDialog:false,
	        dataDialogMode:"create"
		}
	},
	mounted(){
		this.setup()
	},
	methods: {
		setup: async function(){
			this.$store.commit("setPage","academy")
			let res = await this.$store.dispatch('academy/list',"?active=1");
			this.jaList = res.data;
		},
		loadData: async function(){
			let jaSelectedId = "";
			let filterSelected = "";
			let period = "";
			if(this.jaSelected != null){
				jaSelectedId = this.jaSelected;
			}
			if(this.filterSelected != null){
				filterSelected = this.filterSelected
			}
			if(this.period != null){
				period = this.period;
			}
			let qs = "?search="+this.searchCustomer+"&ja_id="+jaSelectedId+"&period="+period+filterSelected+"&page="+this.pagination.page;
			
			let res2 = await this.$store.dispatch('academy/customerShow',qs);
			this.datas = res2.data.data;
			this.pagination.page = res2.data.current_page;
			this.pagination.totalData = res2.data.total;
			this.pagination.lastPage = res2.data.last_page;
			this.totalPrice = res2.total_price;
		},
		editData: async function(){
			let objCopy = Object.assign({}, this.payment);
			objCopy.customer_list = this.rowSelected;
			let res = await this.$store.dispatch('academy/paymentStore',objCopy);
			this.dataDialog = false;
			this.resetDialog();
			this.loadData();
		},
		deleteData: async function(item){
			if(confirm("Yakin akan menghapus peserta "+item.customer_name+" di kelas "+item.academy_name+" periode "+ item.period + " ?")){
				let res = await this.$store.dispatch("academy/customerDestroy",item.id);
				this.loadData();
			}
		},
		loadSummary: async function(){

		},
		createDialog: function(){
			this.$router.push("/academy/form");
		},
		editDialog: function(item=null){
			if(item != null){
				/*
				let exist = false;
				for(let it of this.rowSelected){
					if(it.id == item.id)
						exist = true;
				}
				if(!exist)*/
				this.rowSelected = [];
				this.rowSelected.push(item);
			}
			let customer_list_string = "";
			for(let itm of this.rowSelected){
				customer_list_string += itm.customer_name+" - "+itm.academy_name+" - "+itm.period+"\n";
			}
			this.payment.customer_list_string = customer_list_string;
			this.dataDialogMode = "edit";
			this.dataDialog = true;
		},
		showDialog: async function(item){
			let res = await this.$store.dispatch("payment/show",item.payment_id);
			let customer_list_string = "";
			for(let itm of res.data.academy_period_customers){
				customer_list_string += itm.customer.name+" - "+itm.academy_period.academy.name+" - "+itm.academy_period.period+"\n";
			}
			this.payment = res.data;
			this.payment.customer_list_string = customer_list_string;
			this.dataDialogMode = "show";
			this.dataDialog = true;
		},
		reset: function(){
			this.jaSelected = null;
			this.period= null;
			this.menu= false;
			this.searchCustomer= '';
			this.filterSelected= null;
		},
		resetDialog: function(){
			this.payment.transaction_id= "";
			this.payment.via= "";
			this.payment.amount= "";
			this.payment.customer_list_string= "";
		}
	},
	computed: {
		dataDialogModeLabel: function(){
			if(this.dataDialogMode == "create"){
				return "Tambah";
			}else if(this.dataDialogMode == "edit"){
				return "Ubah";
			}else{
				return "Lihat";
			}
		}
	}
}
</script>