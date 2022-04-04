    const song= document.getElementById("song");
    const playBtn= document.querySelector(".play-inner");
    const nextBtn= document.querySelector("#play-next")
    const prevbtn= document. querySelector("#play-back");
    const durationTime = document.querySelector(".duration");
    const remainingTime = document.querySelector(".remaining");
    const rangebar = document.querySelector(".range");
    const musicname = document.querySelector(".music_name");
    const musicImage = document.querySelector(".music-thumb img");
    const musicthumbnail = document.querySelector(".music-thumb");
    const playRepeat = document.querySelector("#play-repeat");
    const playinffinite = document.querySelector("#play-infinite");

    let isplaying= true;
    let indexsong= 0;
    let isRepeat= false; 
    const musics = [
        {
            id:1,
            title: "Ảo ảnh",
            File: "aoanh.mp3",
            image: "https://1.bigdata-vn.com/wp-content/uploads/2021/12/Hinh-Nen-Girl-Xinh-Full-HD-Cho-Laptop-Va-May.jpg"
        },
        {
            id:2,
            title: "Cưới thôi",
            File: "cuoithoi.mp3",
            image: "./anh/girl2.jpg"
        },
        {
            id:3,
            title: "Yêu đương khó quá chạy về khóc với anh",
            File: "yeuduongkhoqua.mp3",
            image: "https://s.meta.com.vn/img/thumb.ashx/Data/image/2021/10/08/hinh-anh-one-piece-an.jpg"
        },
        {
            id:4,
            title: "Memories",
            File: "Memories.mp3",
            image: "./anh/girl1.jpg"
        },
        {
            id:5,
            title: "Way Back Home",
            File: "Way Back Home.mp3",
            image: "./anh/girl3.jpg"
        },
        {
            id:6,
            title: "What Are Words",
            File: "What Are Words.mp3",
            image: "./anh/girl4.jpg"
        },
        {
            id:7,
            title: "Đám Cưới Nha",
            File: "đám cưới nha.mp3",
            image: "./anh/girl6.jpg"
        },
        {
            id:8,
            title: "Người Âm Phủ",
            File: "Người Âm Phủ.mp3",
            image: "./anh/girl6.jpg"
        },

        
    ]
    displayTimer();
    let timer ;
    playinffinite.addEventListener("click", function(){
        musics = musics.sort(() => Math.random() - 0.5);
    
    });
    playRepeat.addEventListener("click", function(){
        if (isRepeat) {
            isRepeat = false;
            playRepeat.style.color = "black";
        }
        else {
            isRepeat = true;
            playRepeat.style.color = "blue";
        }
       
    });
    nextBtn.addEventListener("click", function(){
        changeSong(1);
    } );
    prevbtn.addEventListener("click", function(){
        changeSong(-1);
    } );
     song.addEventListener("ended", handlEndedSong);
     function handlEndedSong (){
        if (isRepeat){
            // handle repeat song 
            isplaying = true;
            playPause();
        }else{
             changeSong(1);
        }
     }
    function changeSong(dir){
        if (dir === 1){
            indexsong++;
            if (indexsong >= musics.length){
                indexsong = 0;
        }
         isplaying = true;
        }else if(dir===-1){
            indexsong--;
                if(indexsong < 0){
                indexsong = musics.length -1;
            }
        isplaying = true;
        }
        init(indexsong);
    // song.setAttribute("src", `./music/${musics[indexsong].File}`);
    playPause();
    }
    playBtn.addEventListener("click", playPause);
    function playPause(){
        if (isplaying){
            musicthumbnail.classList.add("is-playing");
            song.play();
                playBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
            isplaying = false;
            timer = setInterval(displayTimer,500);
        }else {
            musicthumbnail.classList.remove("is-playing");
            song.pause();
                playBtn.innerHTML = '<i class="bi bi-play-fill" ></i>';
            isplaying = true;
            clearInterval(timer);
        }
    }
    function displayTimer (){
        const {duration, currentTime} = song;
        rangebar.max = duration;
        rangebar.value = currentTime;
        remainingTime.textContent = formatTimer(currentTime);
        if (!duration){
            durationTime.textContent = "00:00";
        }else{
            durationTime.textContent = formatTimer(duration);
        }

    }
    function formatTimer(Number){
        const minutes = Math.floor(Number/60);
        const seconds = Math.floor(Number-minutes *60);
        return `${minutes < 10 ? '0' + minutes: minutes}:
        ${seconds < 10 ? '0' + seconds: seconds}`;
    }
    rangebar.addEventListener("change", handleChangebar);
    function handleChangebar(){
          song.currentTime = rangebar.value;
    }
    function init(indexsong){
        displayTimer();
        song.setAttribute("src", `./music/${musics[indexsong].File}`);
        musicImage.setAttribute("src", musics[indexsong].image);
        musicname.textContent = musics[indexsong].title;
    }
   init(indexsong);