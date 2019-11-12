/* global Vue */
/* global axios */

var admin = new Vue({
    el: '#admin',
    
    data: {
        name: "",
        descr: "",
        file: null,
        addItem: {},
        items: [],
        findName: "",
        findItem: {},
    },
    
    created(){
        this.getAll();
    },
    
    methods: {
        async getAll(){
            try{
                let res = await axios.get('/api/items')
                this.items = res.data
            } catch(error){console.log(error)}
        },
        
        fileChanged(event) {
            this.file = event.target.files[0];
        },
        
        async upload(){
            try {
                let formData = new FormData;
                formData.append('photo', this.file, this.file.name)
                let r1 = await axios.post('api/photos', formData)
                let r2 = await axios.post('/api/items', {
                    name: this.name,
                    descr: this.descr,
                    img: r1.data.path
                })
                this.addItem = r2.data;  
                this.getAll()
            }
            catch (error) {
                console.log(error)
            }
        },
        
        selectItem(item){
            this.findItem = item;
        },
        
        async deleteItem(item) {
          try { 
            let response = axios.delete("/api/items/" + item._id);
            this.findItem = null;
            this.getAll();
            return true;
          } catch (error) {
            console.log(error);
          }
        },
        
        async updateItem(item){
            await axios.put('/api/items/'+item._id, {
                name: this.findItem.name,
                descr: this.findItem.descr
            })
            this.findItem = null;
            this.getAll()
        },
    },
    
    computed: {
        suggestions() {
          return this.items.filter(item => item.name.toLowerCase().includes(this.findName.toLowerCase()));
        }
    }
    
    
})