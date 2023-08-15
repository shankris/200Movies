let sortBy = "Name";
let movieList = [];
let sortOrder = document.getElementById("sort");
const movieDetail = document.getElementById("movieDetail");

sort.addEventListener("change", setSortOrder);

function showDetail(movieName) {
  let movie = movieList.filter((movie) => {
    if (movie.Image == movieName) return movie;
  });
  movieDetail.innerHTML = "";
  movieDetail.innerHTML += `${movie[0].Movie}
  <br> ${movie[0].ReleaseDate}
  &nbsp; <time datetime="2016-06-13"></time>`;
}

// object.addEventListener("load", resetFilters);

function resetFilters() {
  document.getElementById("all").checked = true;
  document.getElementById("allgenre").checked = true;
}

/**  Initial load movie list  */
const loadMovies = async () => {
  try {
    const res = await fetch("json/movies.json");
    movieList = await res.json();
    // movieList.sort(SortByName);
    movieList.sort(SortByDateReverse);
    movies.innerHTML = movieList;
    displayList(movieList);
  } catch (err) {
    console.error(err);
  }
};

function SortByName(x, y) {
  return x.Movie == y.Movie ? 0 : x.Movie < y.Movie ? 1 : -1;
}

function SortByNameReverse(x, y) {
  return x.Movie == y.Movie ? 0 : x.Movie > y.Movie ? 1 : -1;
}

function SortByDate(a, b) {
  return new Date(a.ReleaseDate).getTime() - new Date(b.ReleaseDate).getTime();
}

function SortByDateReverse(a, b) {
  return new Date(b.ReleaseDate).getTime() - new Date(a.ReleaseDate).getTime();
}

/** Set movie list sort order */
function setSortOrder() {
  var value = sortOrder.options[sortOrder.selectedIndex].value;
  sortBy = value;

  console.log(sortBy);
}

function displaySort(movieList) {
  console.log(movieList);

  if (sortBy === "Name") {
    movieList = movieList.sort();
    console.log("Sort");
    displayList(movieList);
  } else if (sortBy === "NameRev") {
    movieList = movieList.reverse();
    console.log("Reverse Sort");
    displayList(movieList);
  } else {
    console.log("Other sort order selected");
  }
}

const movies = document.getElementById("movies");
const searchBar = document.getElementById("searchBar");

movies.innerHTML = "Test";

// Search Functionality
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = movieList.filter((character) => {
    return character.Movie.toLowerCase().includes(searchString);
  });
  displayList(filteredCharacters);
});

// Filter data by language
function filterMovies() {
  // console.log("inside filterMovies");

  var lang = document.querySelector("input[type=radio][name=lang]:checked").value;
  var genre = document.querySelector("input[type=radio][name=genre]:checked").value;

  let filteredMovies = [];

  console.log("Language:", lang, " Genre:", genre);

  // const filteredMovies = movieList.filter(value => value.Language === lang)

  if (lang != "All" && genre != "AllGenres") {
    filteredMovies = movieList.filter((value) => value.Language === lang).filter((item) => item.Genre === genre);

    displayList(filteredMovies);
  } else if (lang === "All" && genre === "AllGenres") {
    displayList(movieList);
  } else if (lang === "All") {
    filteredMovies = movieList.filter((value) => value.Genre === genre);
    displayList(filteredMovies);
  } else {
    filteredMovies = movieList.filter((value) => value.Language === lang);
    displayList(filteredMovies);
  }
}

// Display Data
// console.log(movieList);
const displayList = (movieList) => {
  if (movieList.length != 0) {
    const htmlString = movieList
      .map((movie) => {
        console.log("Number of movies: ", movieList.length);
        let release = movie.ReleaseDate.substring(0, 4);
        return `
          <div class="movie">
            <a onClick="showDetail('${movie.Image}')"><img src="img/movies_LowRes/${movie.Image}.jpg"  loading="lazy" alt="${movie.Movie}" class="moviePic"></a>
              <div class="title">${movie.Movie}<br>
                <div class="year">${release}</div>
              </div>
            </div>
        `;
      })
      .join("");
    // console.log(htmlString);
    movies.innerHTML = htmlString;
    // console.log(charactersList);
  } else {
    var lang = document.querySelector("input[type=radio][name=lang]:checked").value;
    var genre = document.querySelector("input[type=radio][name=genre]:checked").value;

    movies.innerHTML = `<div class='notFound'>Your filter criteria did not find any movies
    <div class="notFoundCriteria">
      <span class="field"><span class="notFoundField">Language:</span> ${lang} </span> </span>
      <span class="field"><span class="notFoundField">Genre:</span> ${genre} </span></span>
    </div>
  </div>
  `;
  }
};

loadMovies();
