window.mobileAndTabletCheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

var app = new Vue ({
    el: '#app',

    data: {
        isAdmin: true,
        items: [],
        dateMin: null,
        dateMax: null,
        startYear: null,
        numEras: 9,
        eraDuration: null,
        yearUnit: 20,
        minYearUnit: null,
        zoomTimeout: false,
        coverImg: true,
        theaterMode: "img",
        theaterOn: false,
        subsOn: true,
        theaterData: {},
        records: [],
        MONTH: ["No Month", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"],
        isMobile: false,
        dividerHeight: 8,
        handFont: false,
        showModal: false,
        notes: [],
        modalData: {},
        addingNew: false,
        newEventDefault: {
            "type":"event",
            "name": "New Artwork",
            "artist": null,
            "day": null,
            "month": null,
            "year": null,
            "displayYear": false,
            "pos": 50,
            "img": null,
            "period": null,
            "id": 2,
            "group":"int",
            "recId":null,
            isNewPlaceholder: true,
        },
        editingEvent: false,
        editEventIdx: null,
        editOriginal: {},
        sources: [],
    },

    async created() {
        this.getEvents()
        this.getNotes()
        this.getRecords()
        this.getSources()

        this.isMobile = window.mobileAndTabletCheck();
    },

    watch: {
        items: function() {
            this.setZoom()
        },
    },

    methods: {
        async getEvents() {
            try {
                let response = await axios.get("/api/items");
                this.items = response.data;
                console.log(response.data)
                return true;
            }
            catch (error) {
                console.log(error);
            }
        },

        getNotes(){
            this.notes = notesData;
        },
        getRecords(){
            this.records = recordsData;
        },
        getSources(){
            this.sources = sourcesData;
        },


        async deleteEvent(event) {
            if (confirm(`Are you sure you want to delete '${event.name}?'`))
            {
                try {
                    // console.log("Made it into deleteItem");
                    let response = axios.delete("/api/items/" + event._id);
                    this.findItem = null;
                    this.getEvents();
                    this.closeEditForm();
                    return true;
                }
                catch (error) {
                    console.log(error);
                }
            }
        },
        
        openAddForm() {
            if (!this.editingEvent && !this.addingNew) {
                this.items.push(Object.assign({},this.newEventDefault))
                console.log(this.newEventDefault)
                this.newEvent.year = Math.floor((document.querySelector('#timeline-box').scrollLeft + 50) / this.yearUnit + this.startYear);
                this.addingNew = true;
            }
        },

        handleChangeAddYear(){
            this.setZoom()
            // this.scrollToEl(document.querySelector('.eventPos.hardFocus')) 
        },

        async addEvent(event) {
            try {
                let res = await axios.post('/api/items', event)
                console.log(res)
                this.getEvents()
                this.closeAddForm();
            }
            catch (error) {
                console.log(error)
            }
        },

        cancelAddForm() {
            this.items = this.items.filter(p => !p.isNewPlaceholder)
            this.closeAddForm();
        },
        
        closeAddForm() {
            if (this.addingNew) {
                this.addingNew = false;
            }
        },

        openEditForm(event) {
            if (!this.editingEvent && !this.addingNew) {
                this.editEventIdx = this.items.lastIndexOf(event)
                Object.assign(this.editOriginal, event)
                this.editEvent.hasFocus = true;
                this.scrollToEl(document.getElementById(event.idString))
                this.editingEvent = true;
            }
        },
        async submitEdit() {
            try {
                let res = await axios.put('/api/items/' + this.editEvent._id, this.editEvent)
                console.log(res.data)
                this.getEvents()
                this.closeEditForm();
            }
            catch (error) {
                console.log(error)
            }
        },
        cancelEditForm() {
            if (this.editingEvent) {
                Object.assign(this.editEvent, this.editOriginal)
                this.closeEditForm()
            }
        },
        closeEditForm() {
            if (this.editingEvent) {
                this.editEvent.hasFocus = false;
                this.editingEvent = false;
            }
        },

        getOptionsFor(list, prop) {
            let options = [];
            list.forEach(item => {
                if (options.lastIndexOf(item[prop]) < 0) options.push(item[prop])
            })
            return options;
        },

        setZoom() {
            let years = this.galleryEls.map(e => e.year)
            this.dateMax = Math.max.apply(null, years)
            this.dateMin = Math.min.apply(null, years)

            let range = this.dateMax - this.dateMin
            if (range < 10) this.eraDuration = 1;
            else if (range < 100) this.eraDuration = 10;
            else if (range < 1000) this.eraDuration = 100;
            else this.eraDuration = 1000;

            this.startYear = Math.floor(this.dateMin / this.eraDuration) * this.eraDuration;
            this.numEras = Math.ceil(range / this.eraDuration) + 2;

            this.minYearUnit = (window.innerWidth - 1) / (this.eraDuration * this.numEras)
            this.yearUnit = this.minYearUnit * 1.3;
        },

        setTheaterImage(shortId) {
            this.theaterMode = 'img'
            let obj = this.findInListById(this.galleryEls, shortId)
            this.theaterData = obj;

            this.theaterData.hasSubs = true;

            this.openTheater();
        },

        setTheaterRecord(shortId) {
            this.theaterMode = 'rec';
            this.theaterData = {}
            this.theaterData.hasSubs = false;
            
            this.openTheater();

            if (shortId) {
                let record = document.getElementById(`rec_${shortId}`)
                console.log(record)

                setTimeout( function(){ app.scrollToEl(record) }, 10)
            }

        },
        scrollToEl(el){
            el.classList.add('focus')
            el.scrollIntoView({behavior: "smooth", block: "start", inline: "start"})
            setTimeout( function(){ el.classList.remove('focus') }, 2000)
        },

        openTheater() {
            this.closeNote()
            this.theaterOn = true;
            this.subsOn = true;
        },

        closeTheater() {
            this.theaterOn = false;
        },
        
        toggleSubs() {
            this.subsOn = !this.subsOn;
        },

        handleTimelineScroll(e) {
            var y = e.deltaY;
            let ival = 50;

            if (y != 0 && !this.zoomTimeout) {
                if (Math.abs(y) > 1) {
                    let oldUnit = this.yearUnit;

                    let delta = y / 500;
                    this.changeEraZoom(delta)

                    // modify scroll position relative to mouse
                    let scrollBox = document.querySelector('#timeline-box');
                    let vp = scrollBox.getBoundingClientRect();
                    let mouseX = e.clientX - vp.x;

                    let newMPos = (scrollBox.scrollLeft + mouseX) * this.yearUnit / oldUnit;
                    scrollBox.scrollLeft = newMPos - mouseX;

                    this.zoomTimeout = true;
                    setTimeout(function() { app.zoomTimeout = false }, ival)
                }
            }
        },

        handleButtonZoom(delta){
            let oldUnit = this.yearUnit;
            this.changeEraZoom(delta)

            // modify scroll position to maintain center
            let scrollBox = document.querySelector('#timeline-box');
            let vp = scrollBox.getBoundingClientRect();
            let newMPos = (scrollBox.scrollLeft + vp.width/2) * this.yearUnit / oldUnit;
            scrollBox.scrollLeft = newMPos - vp.width/2;
        },

        changeEraZoom(delta) {
            this.yearUnit = Math.max(this.minYearUnit, this.yearUnit + delta);
            // console.log(this.minYearUnit, this.yearUnit);
        },

        toggleHandwriting() {
            this.handFont = !this.handFont;
        },
        findInListById(list, id) {
            return list.filter( n => n.elId === id)[0]
        },
        openNote(shortId) {
            this.showModal = true;

            let elId = 'note_' + shortId;
            let el = document.getElementById(elId)
            if (el) {
                // console.log('scrolling to '+elId, el)
                setTimeout( function(){ app.scrollToEl(el) }, 10)
            }
            else console.log('could not find id '+elId)
        },
        closeNote(){
            this.showModal = false;
        }
    },

    computed: {
        eras() {
            let array = [];
            for (i = 0; i < this.numEras; i++)
            {
                array.push(this.startYear + i*this.eraDuration)
            }
            return array;
        },
        eraWidth() {
            return this.yearUnit*this.eraDuration;
        },

        galleryEls() {
            let array = []
            this.items.filter( i => i.type === 'event' ).forEach ( event => {
                let obj = event;
                let yearPos = (event.year - this.startYear) * this.yearUnit;
                let monthPos = event.month * this.yearUnit / 12;
                let dayPos = event.day * this.yearUnit / (12 * 31) 
                obj.netPos = yearPos + monthPos + dayPos;
                obj.idString = `event_${array.length}`
                obj.yearStr = event.year < 0 ?
                    -event.year+' BC' : event.year+' AD';
                
                obj.dateStr = "";
                if (event.month) {
                    obj.dateStr += this.MONTH[event.month];
                    if (event.day && event.day != 0) obj.dateStr += ' '+event.day
                    obj.dateStr += ', ';
                }
                obj.dateStr += obj.yearStr;

                array.push(obj)
            })
            return array;
        },

        // noteEls(){
        //     let array = this.items.filter( i => i.type === 'note' )
        // },
        // recordEls(){
        //     return this.items.filter( i => i.type === 'record' )
        // },

        newEvent() {
            return this.items.filter(p => p.isNewPlaceholder)[0]
        },

        editEvent() {
            return this.items[this.editEventIdx]
        }
    }
})


document.addEventListener('keyup', e => {
    if (e.keyCode === 27 && app.showModal) { return app.closeNote() }
    else if (e.keyCode === 27 && app.theaterOn) { return app.closeTheater() }
})

document.addEventListener('scroll', app.doScroll)