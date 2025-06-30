//API 키 저장
const API_KEY = "f82568fa872671bddb97d46be4b7e701";
//불러오는 주소
//장르 주소
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ko-KR`;

//인기순 영화
const MOVIE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
//DOM
const searchInput = document.querySelector("#searchInput");
const genreButtons = document.querySelector(".genreButtons");
const movieList = document.querySelector(".movie-list");

//데이터 저장 변수
//영화목록, 장르정보를 저장할 변수 선언
let movies = [];
let genres = {};
let selectedGenre = 0;

//장르 보여주기
function showButtons() {
    for (const id in genres) {
        const name = genres[id];
        const button = document.createElement("button");
        button.textContent = name;
        button.setAttribute('data-genre', id);
        genreButtons.appendChild(button);
    }

    const buttons = genreButtons.querySelectorAll("button");
    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            buttons.forEach(b => b.classList.remove("active"))
            btn.classList.add("active");
            selectedGenre = Number(btn.getAttribute("data-genre"));
            showMovies();
        })
    })
}

//영화 보여주기
function showMovies(){
    const searchText = searchInput.value.toLowerCase();
    //화면 비우기
    movieList.innerHTML="";

    //장르 체크하여 필터
    const filterMovies = movies.filter(movie =>{
        const matchGenre = selectedGenre === 0 || movie.genre_ids.includes(selectedGenre);
        const matchSearch = movie.title.toLowerCase().includes(searchText);
        return matchGenre && matchSearch;
    })

    console.log(filterMovies);

    filterMovies.forEach(movie =>{
        const li = document.createElement("li");
        const imgSrc=movie.poster_path ? `http://image.tmdb.org/t/p/w500${movie.poster_path}`
        :`https://via.placeholder.com/500x700?text=No+Image`;
        li.innerHTML=`<div class=posterImg><img src="${imgSrc}" alt="${movie.title}" /></div>
        <div class=title><strong>${movie.title}</strong><span>${movie.vote_average}</span></div>`;
        movieList.appendChild(li);
    })

}
//장르 가져오기
async function fetchGenres() {
    try {
        await fetch(GENRE_URL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.genres.forEach(element => {
                    genres[element.id] = element.name;
                });
                showButtons();
            })
    } catch (error) {
        console.log("영화 장르 불러오는것을 실폐", error)
    }
}

//영화 가져오기
async function fetchMovies(){
    try{
        await fetch(MOVIE_URL)
        .then(response =>response.json())
        .then(data =>{
            console.log(data);
            movies=data.results;
            showMovies();
        })

    }catch(error){

    }
}
//input에 글자를 입력하면 입력한 글자를 포함하는 내용을 필터하여 영화 보여주기
searchInput.addEventListener("input",showMovies);

fetchGenres();
fetchMovies();