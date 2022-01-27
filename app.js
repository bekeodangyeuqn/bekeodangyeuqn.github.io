$$ = document.querySelectorAll.bind(document)
$ = document.querySelector.bind(document)

const heading = $('header h2')
const image = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const btnPlay = $('.btn-toggle-play')
const play = $('.player')
const progress = $('.progress')
const cdWidth = cd.offsetWidth
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randBtn = $('.btn-random')
const repBtn = $('.btn-repeat')
//const songItems = $$('.song')
const playlist = $('.playlist')
const KEY_STORAGE = 'My player'
const runTime = $('.runTime')
const durationTime = $('.durationTime')
const opening = $('.opening-box')
const ending = $('.ending-box')
//opening.closest('.active')
// var hasEnding = ending.closest('.active')
const app = {
    currentIndex: 0,
    currentIndex2: 0,
    songs : [
        {
            name: 'Last regrets',
            singer: 'Ayana',
            image: './assets/image/LastRegrets.jpg',
            path: './assets/music/LastRegrets.mp3'
        },
        {
            name: 'Tori no uta',
            singer: 'Lia',
            image: './assets/image/ToriNoUta.jpg',
            path: './assets/music/ToriNoUta.mp3'
        },
        {
            name: 'Megu Meru',
            singer: 'Riya',
            image: './assets/image/MeguMeru.jpg',
            path: './assets/music/MeguMeru.mp3'
        },
        {
            name: 'Toki wo kizamu uta',
            singer: 'Lia',
            image: './assets/image/TokiWoKizamuUta.jpg',
            path: './assets/music/TokiWoKizamuUta.mp3'
        },
        {
            name: 'Little Busters!',
            singer: 'Rita',
            image: './assets/image/LittleBusters.jpg',
            path: './assets/music/LittleBusters.mp3'
        },
        {
            name: 'Boys be smile',
            singer: 'Suzuyu',
            image: './assets/image/BoysBeSmile.jpg',
            path: './assets/music/BoysBeSmile.mp3'
        },
        {
            name: 'Philosophyz',
            singer: 'Runa Mizutani',
            image: './assets/image/Philosophyz.jpg',
            path: './assets/music/Philosophyz.mp3'
        },
        {
            name: 'My soul, your beats!',
            singer: 'Lia',
            image: './assets/image/MySoulYourBeats.jpg',
            path: './assets/music/MySoulYourBeats.mp3'
        },
        {
            name: 'Bravely you',
            singer: 'Lia',
            image: './assets/image/BravelyYou.jpg',
            path: './assets/music/BravelyYou.mp3'
        },
        {
            name: 'Kimi to iu shinwa',
            singer: 'Nagi Yanagi',
            image: './assets/image/KimiToIuShinwa.jpg',
            path: './assets/music/KimiToIuShinwa.mp3'
        }
    ],
    songs2 : [
        {
            name: 'Kaze no tadori tsuku basho',
            singer: 'Ayana',
            image: './assets/image/LastRegrets.jpg',
            path: './assets/music/KazeNoTadoriTsukuBasho.mp3'
        },
        {
            name: 'Farewell song',
            singer: 'Lia',
            image: './assets/image/FarewellSong.jpg',
            path: './assets/music/FarewellSong.mp3'
        },
        {
            name: 'Dango daikazoku',
            singer: 'Chata',
            image: './assets/image/DangoDaikazoku.jpg',
            path: './assets/music/DangoDaikazoku.mp3'
        },
        {
            name: 'Torch',
            singer: 'Lia',
            image: './assets/image/Torch.jpg',
            path: './assets/music/Torch.mp3'
        },
        {
            name: 'Alicemagic',
            singer: 'Rita',
            image: './assets/image/LittleBusters.jpg',
            path: './assets/music/Alicemagic.mp3'
        },
        {
            name: 'Kimi to no nakushi mono',
            singer: 'Ayaka Kitazawa',
            image: './assets/image/KimiToNoNakushiMono.jpg',
            path: './assets/music/KimiToNoNakushiMono.mp3'
        },
        {
            name: 'Sunbright',
            singer: 'Ayaka Kitazawa',
            image: './assets/image/Sunbright.jpg',
            path: './assets/music/Sunbright.mp3'
        },
        {
            name: 'Koibumi',
            singer: 'Nagi Yanagi',
            image: './assets/image/Koibumi.jpg',
            path: './assets/music/Koibumi.mp3'
        },
        {
            name: 'Yami no kanata e',
            singer: 'Runa Mizutani',
            image: './assets/image/RewriteEnd.jpg',
            path: './assets/music/YamiNoKanataE.mp3'
        },
        {
            name: 'Itsuwaranai kimi e',
            singer: 'Nagi Yanagi',
            image: './assets/image/ItsuwaranaiKimiE.jpg',
            path: './assets/music/ItsuwaranaiKimiE.mp3'
        },
        {
            name: 'Brave song',
            singer: 'Aoi Tada',
            image: './assets/image/MySoulYourBeats.jpg',
            path: './assets/music/BraveSong.mp3'
        },
        {
            name: 'Yake ochinai tsubasa',
            singer: 'Aoi Tada',
            image: './assets/image/YakeOchinaiTsubasa.jpg',
            path: './assets/music/YakeOchinaiTsubasa.mp3'
        },
        {
            name: 'Goodbye seven seas',
            singer: 'Nagi Yanagi',
            image: './assets/image/GoodbyeSevenSeas.jpg',
            path: './assets/music/GoodbyeSevenSeas.mp3'
        },
    ],
    config: JSON.parse(localStorage.getItem(KEY_STORAGE)) || {},
    setConfig(key,value){
        this.config[key] = value
        localStorage.setItem(KEY_STORAGE,JSON.stringify(this.config))
    },
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    openConfig:false,
    endConfig:false,
    render() {
        const htmls = this.songs.map((song,index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>           
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    render2() {
        const htmls = this.songs2.map((song,index) => {
            return `
            <div class="song ${index === this.currentIndex2 ? 'active' : ''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>           
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    // Tao property currentSong cho app de the hien bai hat hien tai
    defineProperties(){
        Object.defineProperty(this,'currentSong',{
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
        Object.defineProperty(this,'currentSong2',{
            get: function(){
                return this.songs2[this.currentIndex2]
            }
        })
    },
    // Xu li xu kien DOM
    handleEvent(){
        const _this = this
        
        const imageRotate = image.animate([{
            transform: 'rotate(360deg)'
        }],{
            duration: 10000, // 10 giay
            iterations: Infinity
        })
        imageRotate.pause();
        // Truot xuong thi thu nho anh
        document.onscroll = function (){
            const minus = window.scrollY || document.documentElement.scrollTop
            var newCdWidth = cdWidth - minus
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
        }
        // Khi click nut Play
        btnPlay.onclick = function(){
            if (_this.isPlaying){
                audio.pause()
            } else {
                audio.play()
            }
        }
        // Khi nhac dang dung
        audio.onpause = function(){
            _this.isPlaying = false
            play.classList.remove('playing')
            imageRotate.pause()
        }
        // Khi nhac dang chay
        audio.onplay = function(){
            _this.isPlaying = true
            play.classList.add('playing')
            imageRotate.play()
        }
        // Khi thoi gian thay doi khi chay nhac
        audio.ontimeupdate = function(){
            if (audio.currentTime){
               var progressPercent = Math.floor(audio.currentTime/audio.duration * 100)
                progress.value = progressPercent
                var minutesDuration = Math.floor(audio.duration / 60).toFixed(0)
                var secondsDuration = (audio.duration - minutesDuration*60).toFixed(0)
                var minutesCurrent = Math.floor(audio.currentTime / 60).toFixed(0)
                var secondsCurrent = (audio.currentTime - minutesCurrent*60).toFixed(0)
                //time.textContent= `${minutesCurrent}:${secondsCurrent}- ${minutesDuration}:${secondsDuration}`
                if (audio.duration){
                    if (secondsDuration < 10){
                        durationTime.innerText = `0${minutesDuration}:0${secondsDuration}`
                    } else
                    durationTime.innerText = `0${minutesDuration}:${secondsDuration}`
                    if(secondsCurrent < 10){
                        runTime.innerText = `0${minutesCurrent}:0${secondsCurrent}`
                    } else if (secondsCurrent === 60){
                        runTime.innerText = `0${minutesCurrent}:00}`
                    } else
                        runTime.innerText = `0${minutesCurrent}:${secondsCurrent}`
                } else {
                    durationTime.innerText = '00:00'
                    runTime.innerText = '00:00'
                }
            }
        }
        audio.onended = function(){
            if (_this.isRepeat){
                audio.play()
            } else {
                nextBtn.click()
            }
        }
        // Khi thay doi gia tri thanh chay
        progress.onchange = function(e){
            var seekTime = audio.duration * e.target.value / 100
            audio.currentTime = seekTime 
            // có bug là khi nhấn chậm thì value bị update đến value tiếp theo
            //chứ không phải value tại vị trí nhấn 
        }
        // Khi nhan nut next
        nextBtn.onclick = function(){
            if (_this.isRandom){
                _this.randSong()
                audio.play()
            } else {
                _this.nextSong()
                audio.play()
            }
            _this.render()
            _this.changeView()
        }
        // Khi nhan nut Previous
        prevBtn.onclick = function(){
            if (_this.isRandom){
                _this.randSong()
                audio.play()
            } else {
                _this.prevSong()
                audio.play()
            }
            _this.render()
            _this.changeView()
        }
        // Khi nhan nut Random
        randBtn.onclick = function(){
            _this.isRandom = ! _this.isRandom
            _this.setConfig('isRandom',_this.isRandom)
            randBtn.classList.toggle('active', _this.isRandom)
        }
        // Khi nhan nut repeat
        repBtn.onclick = function(){
            _this.isRepeat = ! _this.isRepeat
            _this.setConfig('isRepeat',_this.isRepeat)
            repBtn.classList.toggle('active', _this.isRepeat)
        }
        playlist.onclick = function(e){
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')){
                if (songNode && !e.target.closest('.option')){
                    // console.log(songNode)
                    // console.log(ending.closest('.active'))
                    // console.log(opening.closest('.active'))
                    if (opening.closest('.active')){
                        _this.currentIndex = Number(songNode.dataset.index)
                        _this.currentIndex2 = -1
                        _this.render()
                        _this.loadCurrentSong()
                    } else
                    if (ending.closest('.active')){
                        _this.currentIndex2 = Number(songNode.dataset.index)
                        _this.currentIndex = -1
                       _this.render2()
                       _this.loadCurrentSong2()
                    }
                    audio.play()
                    _this.changeView()
                }
                if (e.target.closest('.option')){
                    console.log(e.target)
                }
            }
        }
        opening.onclick = function(e){
            _this.openConfig = true
            _this.endConfig = false
            _this.setConfig('openConfig',_this.openConfig)
            _this.setConfig('endConfig',_this.endConfig)
            _this.render()
            opening.classList.toggle('active',_this.openConfig)
            ending.classList.toggle('active',_this.endConfig)
            //_this.loadCurrentSong()
        }
        ending.onclick = function(e){
            _this.openConfig = false
            _this.endConfig = true
            _this.setConfig('openConfig',_this.openConfig)
            _this.setConfig('endConfig',_this.endConfig)
            _this.render2()
            opening.classList.toggle('active',_this.openConfig)
            ending.classList.toggle('active',_this.endConfig)
            //_this.loadCurrentSong2()
        }
    },
    // Load bai hat dau tien
    loadCurrentSong(){
        var currentSong = this.currentSong
        this.setConfig('currentIndex',this.currentIndex)
        this.setConfig('currentIndex2',this.currentIndex2)
        //console.log(heading,{image},audio,currentSong)
        heading.textContent = currentSong.name
        image.style.backgroundImage = `url(${currentSong.image})`
        audio.src = currentSong.path
        //audio.play()
    },
    loadCurrentSong2(){
        var currentSong2 = this.currentSong2
        this.setConfig('currentIndex2',this.currentIndex2)
        this.setConfig('currentIndex',this.currentIndex)
        //console.log(heading,{image},audio,currentSong)
        //console.log(currentSong2)
        heading.textContent = currentSong2.name
        image.style.backgroundImage = `url(${currentSong2.image})`
        audio.src = currentSong2.path
        //audio.play()
    },
    // Load cac config trong local storage
    loadConfig(){
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
        this.currentIndex = this.config.currentIndex
        this.currentIndex2 = this.config.currentIndex2
        this.openConfig = this.config.openConfig
        this.endConfig = this.config.endConfig
    },
    // Method xu ly next song
    nextSong(){
        if (opening.closest('.active')) {
            this.currentIndex++
            if (this.currentIndex >= this.songs.length){
                this.currentIndex = 0
            }
            this.loadCurrentSong()
        }
        else if (ending.closest('.active')){
            this.currentIndex2++
            if (this.currentIndex2 >= this.songs2.length){
                this.currentIndex2 = 0
            }
            this.loadCurrentSong2()
        }
    },
    // Method xu ly prev song
    prevSong(){
        if (opening.closest('.active')) {
            this.currentIndex--
            if (this.currentIndex < 0){
                this.currentIndex = this.songs.length - 1
            }
            this.loadCurrentSong()
        } else if (ending.closest('.active')){
            this.currentIndex2--
            if (this.currentIndex2 < 0){
                this.currentIndex2 = this.songs2.length - 1
            }
            this.loadCurrentSong2()
        }
    },
    // Method xu ly random song
    randSong(){
        if (opening.closest('.active')){
            let newIndex
            do {
                newIndex = Math.floor(Math.random()*this.songs.length)
            } while (newIndex === 0)
            this.currentIndex = newIndex
            this.loadCurrentSong()
        } else if (ending.closest('.active')){
            let newIndex
            do {
                newIndex = Math.floor(Math.random()*this.songs2.length)
            } while (newIndex === 0)
            this.currentIndex2 = newIndex
            this.loadCurrentSong2()
        }
    },
    // Keo den bai hat dang phat
    changeView(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior : 'smooth',
                block : 'center',
                inline : 'center'
            },300)
        })
    },

    // changeAciveSong(){

    // },
    // repeatSong(){
    //     audio.loop = true
    // },
    start() {
        this.loadConfig() // Load cac config tu local storage
        this.defineProperties() // Định nghĩa các property // Khởi tạo
        // if (opening.closest('.active') === null && ending.closest('.active') === null){
        //     opening.classList.add('active')
        // }
        //
        if (this.openConfig){
            if (this.currentIndex >= 0){
                this.render()
                this.loadCurrentSong()
            } 
            else {
                this.render()
                this.loadCurrentSong2()
            }
        } 
        else if (this.endConfig){
            if (this.currentIndex2 >= 0){
                this.render2()
                this.loadCurrentSong2()
            } else {
                this.render2()
                this.loadCurrentSong()
            }
        } else if (!this.openConfig && !this.endConfig) {
            this.currentIndex = 0
            this.render()
            this.loadCurrentSong()
        }
        this.handleEvent() // Xử lý sự kiện
        repBtn.classList.toggle('active', this.isRepeat)
        randBtn.classList.toggle('active', this.isRandom)
        opening.classList.toggle('active',this.openConfig)
        ending.classList.toggle('active',this.endConfig)
        //console.log(this.currentSong2)
    }
}

app.start()
