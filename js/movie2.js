let sortBy = "Name";
let movieList = [];
// let sortOrder = document.getElementById("sortOrder").value;
const movieDetail = document.getElementById("movieDetail");
let modalTitle = document.getElementById("modalTitle");
modalTitle = "Movie Title 1";
// sort.addEventListener("change", setSortOrder);

function formatDate(value) {
  let date = new Date(value);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
  return day + " " + month + " " + year;
}

function showDetail(movieName) {
  let movie = movieList.filter((movie) => {
    if (movie.Image == movieName) return movie;
  });

  releaseDate = movie[0].ReleaseDate;
  releaseDate = formatDate(releaseDate);

  modalTitle.innerHTML = "";
  modalTitle.innerHTML = `<h1>${movie.Movie}</h1>`;
  movieDetail.innerHTML = "";
  movieDetail.innerHTML += `

<div class="movieLeft">
  <img src="img/movies_LowRes/${movie[0].Image}.jpg" onLoad="this.src='img/movies/${movie[0].Image}.jpg'"  class="hirzPic">
</div>

<div class="movieRight">
<div class="movieTxt">
  <h1>${movie[0].Movie}</h1>

  <div class="movieDetails">
<span>
  <div class="fieldName">Release Date</div>
    <div class="value"> ${releaseDate}</div>
</span>
<span>
    <div class="fieldName">Genre</div>
    <div class="value"> ${movie[0].Genre}</div>
</span>
<span>
    <div class="fieldName">Language</div>
    <div class="value"> ${movie[0].Language}</div>
</span>
    </div>

  <div class="fieldName">Overview</div>
  <div class="value">${movie[0].Overview}</div>
  

   </div>
</div>
  `;
}

// object.addEventListener("load", resetFilters);

function resetFilters() {
  document.getElementById("all").checked = true;
  document.getElementById("allgenre").checked = true;
  document.getElementById("searchBar").value = "";
}

/**  Initial load movie list  */
const loadMovies = async () => {
  try {
    const res = await fetch("json/movies.json");
    movieList = await res.json();
    // movieList.sort(SortByName);
    movieList.sort(SortByName);
    movies.innerHTML = movieList;
    displayList(movieList);
    initializePanel();
  } catch (err) {
    console.error(err);
  }
};

function SortByName(x, y) {
  return x.Movie === y.Movie ? 0 : x.Movie > y.Movie ? 1 : -1;
}

function SortByNameReverse(x, y) {
  return x.Movie === y.Movie ? 0 : x.Movie < y.Movie ? 1 : -1;
}

function SortByDate(a, b) {
  return new Date(b.ReleaseDate).getTime() - new Date(a.ReleaseDate).getTime();
}

function SortByDateReverse(a, b) {
  return new Date(a.ReleaseDate).getTime() - new Date(b.ReleaseDate).getTime();
}

const movies = document.getElementById("movies");
const searchBar = document.getElementById("searchBar");

// movies.innerHTML = "Test";

// Search Functionality
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = movieList.filter((character) => {
    return character.Movie.toLowerCase().includes(searchString);
  });
  displayList(filteredCharacters);
  initializePanel();
});

// Filter data by language
function filterMovies() {
  var lang = document.querySelector("input[type=radio][name=lang]:checked").value;
  var genre = document.querySelector("input[type=radio][name=genre]:checked").value;
  var sortOrder = document.querySelector("input[type=radio][name=sortOrder]:checked").value;

  let filteredMovies = [];

  // console.log("Language:", lang, " Genre:", genre, " Sort Order: ", sortOrder);
  // const filteredMovies = movieList.filter(value => value.Language === lang)

  if (lang != "All" && genre != "AllGenres") {
    filteredMovies = movieList.filter((value) => value.Language === lang).filter((item) => item.Genre === genre);
    // displayList(filteredMovies);
  } else if (lang === "All" && genre === "AllGenres") {
    filteredMovies = movieList;
    // displayList(movieList);
  } else if (lang === "All") {
    filteredMovies = movieList.filter((value) => value.Genre === genre);
    // displayList(filteredMovies);
  } else {
    filteredMovies = movieList.filter((value) => value.Language === lang);
    // displayList(filteredMovies);
  }
  console.log(filteredMovies);

  if (sortOrder === "name") {
    filteredMovies = filteredMovies.sort(SortByName);
    console.log(filterMovies);
  } else if (sortOrder === "nameRev") {
    filteredMovies = filteredMovies.sort(SortByNameReverse);
  } else if (sortOrder === "new") {
    filteredMovies = filteredMovies.sort(SortByDate);
  } else {
    filteredMovies = filteredMovies.sort(SortByDateReverse);
  }

  displayList(filteredMovies);
  initializePanel();
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
          <div onClick="showDetail('${movie.Image}')" class="movie js-cd-panel-trigger" data-panel="main">
            <img src="img/movies_LowRes/${movie.Image}.jpg"  loading="lazy" alt="${movie.Movie}" class="moviePic">
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

function initializePanel() {
  // Slide In Panel - by CodyHouse.co
  var panelTriggers = document.getElementsByClassName("js-cd-panel-trigger");
  // console.log(panelTriggers);
  if (panelTriggers.length > 0) {
    for (var i = 0; i < panelTriggers.length; i++) {
      (function (i) {
        var panelClass = "js-cd-panel-" + panelTriggers[i].getAttribute("data-panel"),
          panel = document.getElementsByClassName(panelClass)[0];
        // open panel when clicking on trigger btn
        panelTriggers[i].addEventListener("click", function (event) {
          event.preventDefault();
          addClass(panel, "cd-panel--is-visible");
        });
        //close panel when clicking on 'x' or outside the panel
        panel.addEventListener("click", function (event) {
          if (hasClass(event.target, "js-cd-close") || hasClass(event.target, panelClass)) {
            event.preventDefault();
            removeClass(panel, "cd-panel--is-visible");
          }
        });
      })(i);
    }
  }

  //class manipulations - needed if classList is not supported
  //https://jaketrent.com/post/addremove-classes-raw-javascript/
  function hasClass(el, className) {
    if (el.classList) return el.classList.contains(className);
    else return !!el.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
  }
  function addClass(el, className) {
    if (el.classList) el.classList.add(className);
    else if (!hasClass(el, className)) el.className += " " + className;
  }
  function removeClass(el, className) {
    if (el.classList) el.classList.remove(className);
    else if (hasClass(el, className)) {
      var reg = new RegExp("(\\s|^)" + className + "(\\s|$)");
      el.className = el.className.replace(reg, " ");
    }
  }
}
