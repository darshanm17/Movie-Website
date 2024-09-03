const APIkey='&api_key=689d04f0726c8e2a1abdda1749ea79e6';
const baseUrl='https://api.themoviedb.org/3';
const searchURL=baseUrl+'/search/movie?'+APIkey;
const APIurl=baseUrl+'/discover/movie?sort_by=popularity.desc'+APIkey;
const tvUrl=baseUrl+'/discover/tv?sort_by=popularity.desc'+APIkey;
const imageUrl="https://image.tmdb.org/t/p/w500";

const form=document.getElementById("form");
const search=document.getElementById("textBox");
const main=document.querySelector(".main");
const prev=document.getElementById("prev");
const current=document.getElementById("current");
const next=document.getElementById("next");
const overlaycontent=document.getElementById('overlay-content');
const navGen=document.getElementById('navGenre');
const navTv=document.getElementById('navTv');
const navMovies=document.getElementById('navMovies');
const navPopular=document.getElementById('navPopular');
const genreE1=document.getElementById("genre");
const notification=document.getElementById("notification");
const watch=document.getElementById('watchlist');
const names=document.querySelector('.names');
const countnum=document.getElementById('countid');


var currentpage=1;
var nextpage=1;
var prevpage=3;
var lasturl="";
var totalpages=100;
var count=0;
let Bagitems;


let bagitemsstr=localStorage.getItem("Bagitems");
Bagitems= bagitemsstr ? JSON.parse(bagitemsstr) : [];
let array=[];

const genres= [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

  document.getElementById('logo').addEventListener('click',()=>{
    getMovies(APIurl);
  })

getMovies(APIurl)
function getsearch(url){
    fetch(url).then(response=>response.json()).then(data=>{
      showsearchresults(data.results);
  
    })
   }
   form.addEventListener('submit',(e)=>{
  e.preventDefault();
  const searchTerm=search.value;
  if(searchTerm){
      getsearch(searchURL+'&query='+searchTerm);
  }
})
function getMovies(url){
    lasturl=url
    fetch(url).then(response=>response.json()).then(data=>{
        console.log(data);
       
        if(data.results!=0){
         // showbackground(data.results);
          
        showMovies(data.results);
            currentpage=data.page;
            nextpage=currentpage+1;
            prevpage=currentpage-1;
            totalpages=data.total_pages;
            current.innerText=currentpage;

            if(currentpage<=1){
                prev.classList.add("disabled");
                next.classList.remove("disabled");
            }
            else if(currentpage>=totalpages){
                prev.classList.remove('disabled');
                next.classList.add('disabled');
            }
            else{
                prev.classList.remove('disabled');
                next.classList.remove('disanled');
            }
            

      }
        else{
            main.innerHTML="<h1>NO Results</h1>"
        }
        //showUsers(data.results);
    });
    
}

function showMovies(data){
    main.innerHTML="";
data.forEach(container => {
  
    const{original_title,poster_path,vote_average,overview, id}=container;
    console.log(id.name);
    const name=`${original_title}`;
    const photo=`${poster_path}`;
    
    const vote=`${vote_average}`;
    const aboutmovie=`${overview}`;

    const movieE1=document.createElement('div');
    movieE1.classList.add('container');
    movieE1.innerHTML=`  <img src="${imageUrl+poster_path}" alt="" id="img" 
    >
    <div id="innercontainer">
        <div id="voting">
         <h3> &#11088 ${vote_average}</h3>
         
    </div>
   
    <div id="title">
       <h3></h3>${original_title}</h3>
    </div>
   

    <div class="overview">
    <h2>Overview</h2>
    <h3>${overview}</h3>
    <button  class="knowmore" id="${id}">Know More</button>
     <button  class ="watchlist"id="watchlist${id}" onclick="update(${id})" >Add to WatchList</button>

</div>
   
    
</div>
    `
   


  main.appendChild(movieE1);
  
  document.getElementById(id).addEventListener('click',()=>{
  opennav(container);
  })
  document.getElementById('watchlist'+id).addEventListener('click',()=>{
    let name=document.getElementById('watchlist'+id).innerText;
    if (Bagitems.includes(id)){
    notificationcount();
   name= document.getElementById('watchlist'+id).innerText=`Remove`;
    }
    else{
      notificationcount();
      name= document.getElementById('watchlist'+id).innerText=`Add to WatchList`;

    }
  })

    
});


}

function notificationcount(){
  const baglength=Bagitems.length;
    console.log(baglength);
    if(baglength<=0){
        notification.classList.remove("count");
        notification.innerText=``;
    }
    else{
        notification.setAttribute("class","count");
    notification.innerHTML=`${baglength}`
   }
  
}

function showsearchresults(data){
    
  
    main.innerHTML=``;
    data.forEach(element=>{
      const {poster_path,vote_average,original_title,id,overview}=element;
      const searchcont=document.createElement('div');
  
      searchcont.classList.add('searchmain');
      searchcont.innerHTML=`
      <div class="container">
      <img src="${imageUrl+poster_path}" alt="" id="img" ">
      <div id="innercontainer">
    
  
          <div id="voting">
          <h3> &#11088 ${vote_average}</h3>
           
        
      </div>
     
      <div id="title">
         <h3></h3>${original_title}</h3>
      </div>
      <div class="overview">
      <h2>Overview</h2>
      <h3>${overview}</h3>
      <button  class="knowmore" id="${id}">Know More</button>
      <button  class ="watchlist"id="watchlist${id}" >Add to WatchList</button>
  
  </div>
      
  </div>
  </div>
      `
      main.appendChild(searchcont);
      document.getElementById(id).addEventListener('click',()=>{
        console.log(id);
        
        opennav(element);
      })
      document.getElementById('watchlist'+id).addEventListener('click',()=>{
        let name=document.getElementById('watchlist'+id).innerText;
        if (name=='Add to WatchList'){
        notificationcount(name,element);
       name= document.getElementById('watchlist'+id).innerText=`Remove`;
        }
        else{
          notificationcount(name,element);
          name= document.getElementById('watchlist'+id).innerText=`Add to WatchList`;
    
        }
      })
    
    })
  
  
  }
prev.addEventListener('click',()=>{
    if(nextpage<=totalpages){
        getpages(prevpage);
    }
})
next.addEventListener('click',()=>{
    if(nextpage<=totalpages){
        getpages(nextpage);
    }
})

function getpages(page){

    let urlsplit=lasturl.split('?');
    let queryparam=urlsplit[1].split('&');
    let key=queryparam[queryparam.length-1].split('=');
    console.log(key);
    if(key[0]!='page'){
      console.log(key);
        let url=lasturl+"&page="+page;
        console.log(url);
        getMovies(url);
    }
    else{
        key[1]=page.toString();
        console.log(key);
        let a=key.join('=');
        console.log(a);
        queryparam[queryparam.length-1]=a;
        let b=queryparam.join('&');
        console.log(b);
        url=urlsplit[0]+'?'+ b;
        getMovies(url);
    }
    genreE1.scrollIntoView({behavior:"smooth"});
}

function leftScroll() {
    const left = document.querySelector(".main");
    left.scrollBy(200, 0);
  }
  function rightScroll() {
    const right = document.querySelector(".main");
    right.scrollBy(-200, 0);
  }
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
  function opennav(container){

    let id=container.id;
  fetch(baseUrl+'/movie/'+id+'/videos?'+APIkey).then(response=>response.json()).then(videodata=>{
    console.log(videodata.results);
    if(videodata){
      document.getElementById("myNav").style.width = "100%";
    }
    if(videodata.results.length>0){
      var embd=[];
      videodata.results.forEach(video=>{
        let {key,type,site,name}=video;
        if(site==='YouTube'){
          embd.push(`<iframe width="560" height="315" class="embed hide" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`)
        }


      
      })
      overlaycontent.innerHTML=embd.join('  ');


    }else{
      overlaycontent.innerHTML=``;

    }
  })}

  const selectedGenre=[];


  navPopular.addEventListener('click',()=>{
    getMovies(APIurl);
  })
  navMovies.addEventListener('click',()=>{
    getMovies(APIurl);

  })
  navTv.addEventListener('click',()=>{
    getMovies(tvUrl);

  })
  

 
 setGenre();
function setGenre(){
    genreE1.innerHTML='';
    genres.forEach(genre=>{
        const t=document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
     
        t.innerText=genre.name;
        t.addEventListener('click',()=>{
            if(selectedGenre.length==0){
                selectedGenre.push(genre.id);

            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id,idx)=>{
                        if(id==genre.id){
                            selectedGenre.splice(idx,1);
                        }
                    })
                }
                else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre);
            getMovies(APIurl+"&with_genres="+encodeURI(selectedGenre.join(',')));
            highlet();

        })
        
        genreE1.append(t);
    })

}
function highlet(){
    const tags=document.querySelectorAll('.tag');
    tags.forEach(tag=>{
        tag.classList.remove('highlight')
    })
   
    if(selectedGenre.length!=0){
        selectedGenre.forEach(id=>{
        const highletElements=document.getElementById(id);
        highletElements.classList.add('highlight');
    })
    
}}
function update(Itemid){

 // console.log(container);
  if (Bagitems.length==0){

  Bagitems.push(Itemid);
 
  }
  else{
      if(Bagitems.includes(Itemid)){
      Bagitems.forEach((itemid,idx)=>{
          if(itemid==Itemid){
              Bagitems.splice(idx,1);

          }})}
          else{
              Bagitems.push(Itemid);
          }
            console.log(Bagitems);
  
  }
  localStorage.setItem("Bagitems",JSON.stringify(Bagitems));
  //carticon();
  renderWatchlist();
  console.log(Bagitems);
  }
gsap.from('#logo ',{

  top:"-100vh",
  scale:1,
  duration:1,
  delay:0.5


})
gsap.from('#navMovies ',{

  top:"-100vh",
  duration:1,
  delay:0.5


})
gsap.from('#navTv ',{

  top:"-100vh",
  duration:1,
  delay:0.7


})
gsap.from('#navPopular ',{

  top:"-100vh",
  duration:1,
  delay:0.9


})
gsap.from('.tag',{
  duration:2,
  x:"-100vw",
 delay:2,
 
})
