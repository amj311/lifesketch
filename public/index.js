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
        theaterOn: false,
        subsOn: true,
        theaterData: {},
    },

    created() {
        this.gallery = galleryData;
    },

    methods: {
        setTheaterImage(obj) {
            obj.bgSrc = `background-image: url(${obj.img})`;
            this.theaterData = obj;

            this.openTheater();
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
                obj.idString = `piece_${obj.id}`

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