const API_KEY = "b6f5b70782bb8eacf9ef1b4ecffab13b";
const GENRE_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ko-KR`;
const POPULAR_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;

let genres = [];
const searchInput = document.querySelector("searchInput");
const genreButtons = document.querySelector(".genreButtons");
const movieList = document.querySelector(".movieList");

// 장르 목록 가져오기
async function fetchGenres() {
  try {
    const response = await fetch(GENRE_URL);
    const data = await response.json();
    genres = data.genres;
    showButtons();
  } catch (error) {
    console.error("장르 불러오기 오류:", error);
  }
}

// 장르 버튼 보여주기
function showButtons() {
  for (const id in genres) {
    const name = genres[id];
    constbutton = document.createElement("button");
    button.textContent = name;
    button.setAttribute("data=genre", id);
    genreButtons.appendChild(button);
  }
  const allButton = document.createElement("button");
  allButton.textContent = "모두 보기";
}

allButton.setAttribute("data-genre", "all");
allButton.addEventListener("click", () => {
  fetchMovies();
});
genreButtons.appendChild(allButton);
// 장르 버튼 클릭 이벤트
// 영화 목록 가져오기
async function fetchMovies(genreId) {
  try {
    let url = POPULAR_URL;
    if (genreId) {
      url += `&with_genres=${genreId}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    showMovies(data.results);
  } catch (error) {
    console.error("영화 불러오기 오류:", error);
  }
}
fetchGenres();
