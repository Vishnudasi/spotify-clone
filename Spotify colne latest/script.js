let currentSong = new Audio();
let songs;
let currFolder;

async function getSongs(folder){
    currFolder = folder;
    let a = await fetch(`/${folder}/`)
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
     songs = []

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split(`/${folder}/`)[1])
        }
        
    }


    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    songUL.innerHTML = " "
    for (const song of songs) {
 
        songUL.innerHTML = songUL.innerHTML + `<li><img class=invert src="music.svg" alt="">
                        <div class="info">
                            <div>${song.replaceAll("%20"," ")}</div>
                            <div>Supriya</div>
                        </div>
                        <div class="Playnow">
                            <span>Play Now</span>
                            <img class=invert src="play.svg" alt="">
                        </div>
                         </li>`;
    }

    //Attach an event listener to each song
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element =>{console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

        })
    })
}
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}


const playMusic = (track,pause = false)=>{
    //let audio = new Audio("/songs/"+ track)
    currentSong.src = `/${currFolder}/` + track
    if(!pause){
        currentSong.play()
        play.src = "pause.svg"
    }
    currentSong.play()
    play.src = "pause.svg"
    document.querySelector(".songinfo").innerHTML = decodeURI(track) 
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00"

}

async function displayAlbums(){
    let a = await fetch(`/songs/`)
    let response = await a.text()
    let div = document.createElement("div")
    
    div.innerHTML = response;
    let anchors = div.getElementsByTagName("a")
    
     let cardContainer = document.querySelector(".cardContainer")
     let array = Array.from(anchors)
     for (let index = 0; index < array.length; index++) {
        const e = array[index];
   
   
    if( e & e.href && e.href.includes("/songs")){
       let folder = (e.href.split("/").slice(-2)[0]);
       console.log("AAAAA",folder)
       //Get the metadata of the folder
       let a = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
       let response = await a.json();
       console.log(response)
       cardContainer.innerHTML = cardContainer.innerHTML + `<div data-folder ="${folder}" class="card">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                <!-- Outer Green Circle
                             <circle cx="12" cy="12" r="10" fill="green" stroke="none" /> -->
                                <path
                                    d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z"
                                    fill="black" />
                            </svg>
                        </div>
                        <img src="/songs/${folder}/cover.jpg" alt="">
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>

                    </div>`
    }
    // console.log(cardContainer.innerHTML)
     }

    // Load the playlist whenever card is clicked
    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        console.log(e)
       e.addEventListener("click", async item=>{
        console.log(item,item.currentTarget.dataset)
        songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)
        playMusic(songs[0])
           
       })
 })

}

// async function displayAlbums() {
//     console.log("displaying albums")
//     let a = await fetch(`/songs/`)
//     let response = await a.text();
//     let div = document.createElement("div")
//     div.innerHTML = response;
//     let anchors = div.getElementsByTagName("a")
//     let cardContainer = document.querySelector(".cardContainer")
//     let array = Array.from(anchors)
//     for (let index = 0; index < array.length; index++) {
//         const e = array[index]; 
//         if (e.href.includes("/songs") && !e.href.includes(".htaccess")) {
//             let folder = e.href.split("/").slice(-2)[0]
//             console.log(folder)
//             // Get the metadata of the folder
//             let a = await fetch(`/songs/${folder}/info.json`)
//             console.log(a)
//             let response = await a.json(); 
//             cardContainer.innerHTML = cardContainer.innerHTML + ` <div data-folder="${folder}" class="card">
//             <div class="play">
//                 <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//                     xmlns="http://www.w3.org/2000/svg">
//                     <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5"
//                         stroke-linejoin="round" />
//                 </svg>
//             </div>

//             <img src="/songs/${folder}/cover.jpg" alt="">
//             <h2>${response.title}</h2>
//             <p>${response.description}</p>
//         </div>`
//         }
//     }

//     // Load the playlist whenever card is clicked
//     Array.from(document.getElementsByClassName("card")).forEach(e => { 
//         e.addEventListener("click", async item => {
//             console.log("Fetching Songs")
//             songs = await getSongs(`songs/${item.currentTarget.dataset.folder}`)  
//             playMusic(songs[0])

//         })
//     })
// }


async function main() {
     await getSongs("songs/cs")
    playMusic(songs[0],true)
    // console.log(songs)

    //Display all the albums on the page
   await displayAlbums()
    
    

    // if (songs.length > 0) {
    //     var audio = new Audio(songs[0])
    //       audio.play()
    // } else {  
    //     console.error("No songs found.")
    // }     
 

    //Attach an event listener to each song
    play.addEventListener("click", ()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src = "pause.svg"
        }
        else{
            currentSong.pause()
            play.src= "play.svg"
        }
    })

    //Listen for timeupdate event
    currentSong.addEventListener("timeupdate", ()=>{
        console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left = (currentSong.currentTime/currentSong.duration)*100 + "%";
    })
    
    //Add an event listener to seekbar
    document.querySelector(".seekbar").addEventListener("click", e=>{
        let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration)* percent)/100
        
    })

    // Add an event listener for hambuger

    document.querySelector(".hamburger").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "0"
    })

    //Add an event listener for close button
     document.querySelector(".close").addEventListener("click", ()=>{
        document.querySelector(".left").style.left = "-120%"
     })

     // Add an event listener to previous and next
     previous.addEventListener("click",()=>{
        console.log("Previous clicked")
        console.log(currentSong)

       
        let index = songs.indexOf( currentSong.src.split("/").slice(-1)[0])

        if((index-1)>= 0){
         console.log(songs,index)
         playMusic(songs[index-1])
        }
        

     })

     next.addEventListener("click",()=>{
        currentSong.pause()
        console.log("next clicked")

        let index = songs.indexOf( currentSong.src.split("/").slice(-1)[0])

       if((index+1) < songs.length){
        console.log(songs,index)
        playMusic(songs[index+1])
       }
        
     })

     //Add an event to volume
     document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
         currentSong.volume = parseInt(e.target.value)/100
     })

     //Add event listener to mute the track
     document.querySelector(".volume>img").addEventListener("click", e=>{
        console.log(e.target)
        if(e.target.src.includes("volume.svg")){
            e.target.src =e.target.src.replace("volume.svg","mute.svg")
            currentSong.volume = 0;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 0;
        }
        else{
            e.target.src = e.target.src.replace("mute.svg","volume.svg")
            currentSong.volume = .1;
            document.querySelector(".range").getElementsByTagName("input")[0].value = 10;


        }
     })

     
}
main()

