<template>
    <v-container>
      	<v-row>
        	<v-col>
        		<v-card>
				    <v-card-title>
						Kelas di Jobhun Academy
				    </v-card-title>
				    <v-container>
				    	<!-- ==================================== Filtering Form ==========================-->
				    	<v-row>
						   	<v-col md="6">
						   		<v-text-field v-model="search" label="Cari"></v-text-field>
						    </v-col>
						    <v-col>
						   		<v-btn
						   			tile
						          color="primary"
						           @click="loadData"
						        >
						          <v-icon left>
						            mdi-cloud-search-outline
						          </v-icon>
						          Filter
						        </v-btn>
						     </v-col>
						   		<v-spacer></v-spacer>
						     <v-col>
						   		<v-btn
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
							</v-col>
						</v-row>
				    	<!-- ==================================== End fo Filtering Form ==========================-->
						<v-row>
							<v-col col="12">
								<h6>total Data = {{pagination.totalData}} row{{pagination.totalData > 1?"s":""}}</h6>
							</v-col>
						</v-row>
						<v-row v-if="datas.length > 0">
							<v-col md="12">
								<v-data-table
							      :headers="headers"
							      hide-default-footer
							      :items-per-page="10"
							    >
							    	<template v-slot:body="{ items }" >
								        <tbody>
								          <tr
								            v-for="item in datas"
								            :key="item.name"
								          >
								            <td>{{ item.name }}</td>
								            <td>{{ item.updated_at }}</td>
								            <td>{{ item.updater.name }}</td>
								            <td>
								            	<v-icon
											        small
											        @click="deleteData(item)"
											      >
											        mdi-delete
											      </v-icon>
									  		</td>
								          </tr>
								        </tbody>
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
	        <v-card-title class="headline">{{dataDialogMode == "create"? 'Tambah':'Atur'}} kelas</v-card-title>

	        <v-card-text>
	          <v-container>
	            <v-row>
	              <v-col cols="12">
	              	<v-text-field v-model="academy.name" label="Nama kelas"></v-text-field>
	              </v-col>
	            </v-row>
	          </v-container>
	        </v-card-text>

	        <v-card-actions>
	          <v-spacer></v-spacer>
	          <v-btn
	            color="green darken-1"
	            text
	            @click="createData"
	          >
	            Kirim
	          </v-btn>
	          <v-btn
	            color="red darken-1"
	            text
	            @click="dataDialog = false"
	          >
	            Batal
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
			search: "",
			academy: {
				name: "",
			},
	        headers: [
	          { text: 'Kelas', sortable: false},
	          { text: 'Ditambah', sortable: false },
	          { text: 'Penambah', sortable: false },
	          { text: 'Aksi', value: 'actions', sortable: false }
	        ],
	        datas: [],
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
			this.$store.commit("setPage","academy");
		},
		loadData: async function(){
			let search = "";
			if(this.search != ""){
				search = this.search;
			}
			let res = await this.$store.dispatch('academy/index',"?search="+search);
			this.datas = res.data.data;
			this.pagination.page = res.data.current_page;
			this.pagination.totalData = res.data.total;
			this.pagination.lastPage = res.data.last_page;
			this.totalPrice = res.total_price;
		},
		createData: async function(){
			let res = await this.$store.dispatch('academy/store',this.academy);
			this.dataDialog = false;
			this.resetDialog();
			this.loadData();
		},
		editData: async function(){
		},
		deleteData: async function(item){
			if(confirm("Yakin akan menghapus kelas "+item.name+ " ?")){
				let res = await this.$store.dispatch("academy/destroy",item.id);
				this.loadData();
			}
		},
		createDialog: function(){
			this.dataDialogMode = "create";
			this.dataDialog = true;
		},
		editDialog: function(item){
			this.academyPeriod = item;
			this.dataDialogMode = "edit";
			this.dataDialog = true;
		},
		reset: function(){
			this.search = "";
		},
		resetDialog: function(){
			this.academy.name= "";
		}
	}
}
</script>