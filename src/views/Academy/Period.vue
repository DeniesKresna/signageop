<template>
    <v-container>
      	<v-row>
        	<v-col>
        		<v-card>
				    <v-card-title>
						Periode kelas
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
							        v-model="menu1"
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
							        <v-date-picker v-model="period" @input="menu1 = false"></v-date-picker>
							      </v-menu>	
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
						        <!--
						   		<v-btn
						   			small
						   			tile
						          color="warning"
						           @click="loadSummary"
						        >
						          <v-icon left>
						            mdi-file-outline
						          </v-icon>
						          Summary
						        </v-btn>
						    	-->
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
							      :items="datas"
							      hide-default-footer
							      :items-per-page="10"
							    >
							    <template v-slot:body="{ items }" >
								        <tbody>
								          <tr
								            v-for="item in datas"
								            :key="item.name"
								          >
								            <td>{{ item.academy.name }}</td>
								            <td>{{ item.period }}</td>
								            <td>{{ item.price }}</td>
								            <td>{{ item.active }}</td>
								            <td>{{ item.updated_at }}</td>
								            <td>{{ item.updater.name }}</td>
								            <td>
										      <v-icon
										        small
										        class="mr-2"
										        @click="editDialog(item)"
										      >
										        mdi-pencil
										      </v-icon>
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
	        <v-card-title class="headline">{{dataDialogMode == "create"? 'Tambah':'Atur'}} periode</v-card-title>

	        <v-card-text>
	          <v-container>
	            <v-row>
	              <v-col cols="12" v-if="dataDialogMode == 'edit'">
	              	<v-text-field v-model="academyPeriod.id" label="Id Periode Kelas" v-show="false"></v-text-field>
	              </v-col>
	              <v-col cols="12">
			        <v-select
			            v-model="academyPeriod.academy_id"
			            :items="jaList"
			            item-text="name"
			            item-value="id"
			            label="Nama kelas"
			            :disabled="dataDialogMode == 'edit'"
			          ></v-select>
			      </v-col>
	              <v-col cols="12">
				   		<v-menu
					        v-model="menu2"
					        :close-on-content-click="false"
					        :nudge-right="40"
					        transition="scale-transition"
					        offset-y
					        min-width="290px"
					      >
					        <template v-slot:activator="{ on, attrs }">
					          <v-text-field
					            v-model="academyPeriod.period"
					            label="Periode"
					            readonly
					            v-bind="attrs"
					            v-on="on"
					            :disabled="dataDialogMode == 'edit'"
					          ></v-text-field>
					        </template>
					        <v-date-picker v-model="academyPeriod.period" @input="menu2 = false"></v-date-picker>
					      </v-menu>	
					</v-col>
	              <v-col cols="12">
	              	<v-text-field v-model="academyPeriod.price" label="Harga" type="number"></v-text-field>
	              </v-col>
					<v-col cols="12">
		              	<v-checkbox v-model="academyPeriod.active" label="Aktif? Pengaktifan kelas akan menonaktifkan kelas yang sama di periode lain"></v-checkbox>
		            </v-col>
					<v-col cols="12">
		              	<v-textarea
					      label="Deskripsi"
					      :value="academyPeriod.description"
					    ></v-textarea>
		            </v-col>
					<v-col cols="12">
						<v-autocomplete
				            v-model="academyPeriod.mentor_ids"
				            :items="mentorList"
				            item-value="id"
				            item-text="name"
				            dense
				            chips
				            small-chips
				            label="Pilih mentor"
				            multiple
				          ></v-autocomplete>
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
	            v-if="dataDialogMode == 'create'"
	            color="green darken-1"
	            text
	            @click="createData"
	          >
	            Tambah
	          </v-btn>
	          <v-btn
	          	v-else
	            color="green darken-1"
	            text
	            @click="editData"
	          >
	            Ubah
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
			jaList:[],
			jaSelected:null,
			//period: new Date().toISOString().substr(0, 10),
			period: null,
			menu1: false,
			menu2: false,
			filterSelected: null,
			academyPeriod: {
				id: null,
				academy_id: null,
				period: null,
				price: 0,
				active: true,
				description: "",
				mentor_ids: null
			},
			mentorList: [],
	        headers: [
	          { text: 'Kelas', sortable: false},
	          { text: 'Periode', sortable: false},
	          { text: 'Harga', sortable: false },
	          { text: 'Aktif', sortable: false },
	          { text: 'Update', sortable: false },
	          { text: 'Perubah', sortable: false },
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
			this.$store.commit("setPage","academy")
			let res = await this.$store.dispatch('academy/list',"");
			let res2 = await this.$store.dispatch('mentor/list',"");
			this.jaList = res.data;
			this.mentorList = res2.data;
		},
		loadData: async function(){
			let jaSelectedId = "";
			let period = "";
			if(this.jaSelected != null){
				jaSelectedId = this.jaSelected;
			}
			if(this.period != null){
				period = this.period;
			}
			let qs = "?ja_id="+jaSelectedId+"&period="+period+"&page="+this.pagination.page;
			let res2 = await this.$store.dispatch('academyPeriod/index',qs);
			this.datas = res2.data.data;
			this.filterActiveItems();
			this.pagination.page = res2.data.current_page;
			this.pagination.totalData = res2.data.total;
			this.pagination.lastPage = res2.data.last_page;
			this.totalPrice = res2.total_price;
		},
		createData: async function(){
			let objCopy = Object.assign({}, this.academyPeriod);
			if(objCopy.active)
				objCopy.active = 1;
			else
				objCopy.active = 0;
			let res = await this.$store.dispatch('academyPeriod/store',objCopy);
			this.dataDialog = false;
			this.resetDialog();
			this.loadData();
		},
		editData: async function(){
			let objCopy = Object.assign({}, this.academyPeriod);
			if(objCopy.active)
				objCopy.active = 1;
			else
				objCopy.active = 0;
			let res = await this.$store.dispatch('academyPeriod/update',objCopy);
			this.dataDialog = false;
			this.resetDialog();
			this.loadData();
		},
		deleteData: async function(item){
			if(confirm("Yakin akan menghapus kelas "+item.academy_name+" periode "+ item.period + " ?")){
				let res = await this.$store.dispatch("academyPeriod/destroy",item.id);
				this.loadData();
			}
		},
		loadSummary: async function(){

		},
		createDialog: function(){
			this.dataDialogMode = "create";
			this.dataDialog = true;
		},
		editDialog: function(item){
			this.academyPeriod = Object.assign({}, item);
			this.academyPeriod.mentor_ids = [];
			for(let mentor of item.mentors){
				this.academyPeriod.mentor_ids.push(mentor.id)
			};
			this.dataDialogMode = "edit";
			this.dataDialog = true;
		},
		reset: function(){
			this.jaSelected = null;
			this.period= null;
			this.menu1= false;
		},
		resetDialog: function(){
			this.academyPeriod.id= null;
			this.academyPeriod.academy_id= null;
			this.academyPeriod.period= null;
			this.academyPeriod.price= 0;
			this.academyPeriod.active= true;
			this.academyPeriod.description= "";
			this.academyPeriod.mentor_ids= null;
		},
		filterActiveItems: function(){
			for(let item of this.datas){
				let v = item.active;
				if(v==1){
					item.active = true;
				}else{
					item.active = false;
				}
			}
		}
	}
}
</script>