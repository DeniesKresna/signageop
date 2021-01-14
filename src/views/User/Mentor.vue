<template>
    <v-container>
      	<v-row>
        	<v-col>
        		<v-card>
				    <v-card-title>
						Mentor
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
								            <td>{{ item.company_name }}</td>
								            <td>{{ item.position }}</td>
								            <td>{{ item.updated_at }}</td>
								            <td>{{ item.updater.name }}</td>
								            <td>
								            	<v-icon
											        small
											        @click="showDialog(item)"
											      >
											        mdi-eye
											     </v-icon>
								            	<v-icon
											        small
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
	        <v-card-title class="headline">{{dataDialogModeLabel }} mentor</v-card-title>

	        <v-card-text>
	          <v-container>
	            <v-row>
	              <v-col cols="12">
	              	<v-text-field v-model="mentor.name" label="Nama mentor" :readonly="dataDialogMode == 'show'"></v-text-field>
	              </v-col>
	              <v-col cols="12">
	              	<v-text-field v-model="mentor.company_name" label="Nama perusahaan" :readonly="dataDialogMode == 'show'"></v-text-field>
	              </v-col>
	              <v-col cols="12">
	              	<v-text-field v-model="mentor.position" label="Jabatan" :readonly="dataDialogMode == 'show'"></v-text-field>
	              </v-col>
	              <v-col cols="12">
	              	<p>Latar belakang pendidikan</p>
	              	<vue-editor v-model="mentor.education" :readonly="dataDialogMode == 'show'"></vue-editor>
	              </v-col>
	              <v-col cols="12">
	              	<p>Pengalaman</p>
	              	<vue-editor v-model="mentor.experience" :readonly="dataDialogMode == 'show'"></vue-editor>
	              </v-col>
	              <v-col cols="12">
	              	<v-text-field v-model="mentor.linkedin_link" label="URL akun Linkedin" :readonly="dataDialogMode == 'show'"></v-text-field>
	              </v-col>
	              <v-col cols="12">
	              	<v-text-field v-model="mentor.email" label="Alamat email" :readonly="dataDialogMode == 'show'"></v-text-field>
	              </v-col>
	              <v-col cols="12">
	              	<v-text-field v-model="mentor.phone" label="Nomor handphone" :readonly="dataDialogMode == 'show'"></v-text-field>
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
	          	v-if="dataDialogMode == 'edit'"
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
import { VueEditor } from "vue2-editor";

export default{
	components: {
		VueEditor
	},
	data(){
		return{
			search: "",
			mentor: {
				name: "",
				company_name: "",
				position: "",
				education: "",
				experience: "",
				linkedin_link: "",
				email: "",
				phone: ""
			},
	        headers: [
	          { text: 'Nama', sortable: false},
	          { text: 'Perusahaan', sortable: false },
	          { text: 'Jabatan', sortable: false },
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
			this.$store.commit("setPage","academy")
			//this.$store.commit("setPage","academy");
		},
		loadData: async function(){
			let search = "";
			if(this.search != ""){
				search = this.search;
			}
			let res = await this.$store.dispatch('mentor/index',"?search="+search);
			this.datas = res.data.data;
			this.pagination.page = res.data.current_page;
			this.pagination.totalData = res.data.total;
			this.pagination.lastPage = res.data.last_page;
			this.totalPrice = res.total_price;
		},
		createData: async function(){
			let res = await this.$store.dispatch('mentor/store',this.mentor);
			this.dataDialog = false;
			this.resetDialog();
			this.loadData();
		},
		editData: async function(){
			let res = await this.$store.dispatch('mentor/update',this.mentor);
			this.dataDialog = false;
			this.resetDialog();
			this.loadData();
		},
		deleteData: async function(item){
			if(confirm("Yakin akan menghapus "+item.name+ " sebagai mentor?")){
				let res = await this.$store.dispatch("mentor/destroy",item.id);
				this.loadData();
			}
		},
		createDialog: function(){
			this.dataDialogMode = "create";
			this.dataDialog = true;
		},
		editDialog: function(item){
			this.mentor = Object.assign({}, item);
			this.dataDialogMode = "edit";
			this.dataDialog = true;
		},
		showDialog: function(item){
			this.mentor = item;
			this.dataDialogMode = "show";
			this.dataDialog = true;
		},
		reset: function(){
			this.search = "";
		},
		resetDialog: function(){
			this.mentor = {
				name: "",
				company_name: "",
				position: "",
				education: "",
				experience: "",
				linkedin_link: "",
				email: "",
				phone: ""
			};
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