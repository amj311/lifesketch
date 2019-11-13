var app = new Vue ({
    el: '#app',

    data: {
        gallery: [],
        startYear: 1800,
        numEras: 9,
        eraDuration: 5,
        yearUnit: 2,
        zoomTimeout: false,
        isQuizAll: false,
        coverImg: true,
        theaterMode: "img",
        theaterOn: false,
        subsOn: true,
        theaterData: {},
        recordsHTML: null,
        MONTH: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novemeber", "December"],
    },

    created() {
        this.gallery = galleryData;

        fetch('records.html')
            .then( res => {return res.text()})
            .then( html => { app.recordsHTML = html })
    },

    methods: {
        setTheaterImage(obj) {
            this.theaterMode = 'img'
            obj.bgSrc = `background-image: url(${obj.img})`;
            this.theaterData = obj;

            this.theaterData.subHTML = `
                <div class="title">${obj.name}</div>
                <div class="artist">${obj.artist}</div>
                <div class="period">${obj.period}</div>    
                <div class="year">${obj.year}</div>
            `;

            this.openTheater();
        },

        setTheaterRecord(obj) {
            this.theaterMode = 'rec';
            this.theaterData = {}

            
            this.openTheater();

            if (obj) {
                let record = document.getElementById(obj.recId)
                console.log(record)

                setTimeout( function(){ app.scrollToEl(record) }, 10)
            }

        },
        scrollToEl(el){
            el.classList.add('focus')
            el.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
            setTimeout( function(){ el.classList.remove('focus') }, 2000)
        },

        openTheater() {
            this.theaterOn = true;
            this.subsOn = true;
        },

        closeTheater() {
            this.theaterOn = false;
        },
        
        toggleSubs() {
            this.subsOn = !this.subsOn;
        },

        toggleImgCover() {
            let 
            this.coverImg = !this.coverImg;
            console.log(this.coverImg)
        },

        doScroll(event) {
            var y = event.deltaY;
            let ival = 50;

            if (y != 0 && !this.zoomTimeout){
                if(Math.abs(y) > 1){
                    console.log(y);

                    this.changeEraZoom(y/4000)

                    this.zoomTimeout = true;
        
                    setTimeout( function() { app.zoomTimeout = false }, ival)
                }
            }
        },

        changeEraZoom(delta) {
            this.yearUnit += delta;

            console.log(document.querySelector('#timeline-box').scrollLeft += delta*450)
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
            this.gallery.forEach ( piece => {
                let obj = piece;
                let yearPos = (piece.year - this.startYear) * this.yearUnit;
                let monthPos = piece.month * this.yearUnit / 12;
                let dayPos = piece.day * this.yearUnit / (12 * 31) 
                obj.netPos = yearPos + monthPos + dayPos;
                obj.styles = `left: ${piece.netPos}rem; height: ${piece.pos}%`;
                obj.classes = `art-pos ${piece.loc}`;
                obj.idString = `piece_${array.length}`

                obj.dateFormat = function() {
                    
                }

                array.push(obj)
            })
            return array;
        }
    }
})



document.addEventListener('keyup', e => {
    if (e.keyCode === 27 && app.theaterOn) { app.closeTheater() }
})

document.addEventListener('scroll', app.doScroll)