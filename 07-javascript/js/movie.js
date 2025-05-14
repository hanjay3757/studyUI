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
            selectedGenre = Number(btn.getAttribute("data-genre"))
        })
    })
}
//영화 보여주기

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

fetchGenres();