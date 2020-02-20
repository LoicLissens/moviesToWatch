//! attention carte mettre en balise template html ou faire plusieurs creat element car innerhtml quand ca vient d'unAPI peut etre du script malhonnete
//GLOBAL VAR AND DOM SELECT
let url;
const allGenres = new Map();
const urlGenre = "https://api.themoviedb.org/3/genre/movie/list?api_key=23ba62fc39d351bae842170d72f6ba3e&language=fr-Fr";
let urlGenreSelected;
const $listFilm = document.querySelector("#movielist");
const $bestEver = document.getElementById("bestever");
const $trends = document.getElementById("trends");
const $showFilm = document.getElementById("showfilm");
const $selectGenre = document.getElementById("selectgenre");
const $listButton = document.getElementById("list-button");

/*
        FUNCTION
*/
const checkForConnect = () => {
  if ($listButton.innerText === "Non Connecté") {
    $listButton.style.visibility = "hidden";
  } else {
    $listButton.style.visibility = "visible";
  }
};
const getAllGenre = () => {
  fetch(urlGenre)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      json.genres.forEach((el) => {
        const name = el.name;
        allGenres.set(name, el.id);
        const option = document.createElement("option");
        option.innerText = name;
        $selectGenre.appendChild(option);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};

const removeCurrentCard = () => {
  let $toRemove = document.getElementsByClassName("card");
  $toRemove = [...$toRemove];

  $toRemove.forEach((el) => {
    el.remove();
  });
};
const checkForRate = (num) => {
  return num * 10;
};
const checkForRateClass = (num) => {
  if (num > 7.5) {
    return "great-quote";
  } else if (num > 5 && num <= 7.5) {
    return "good-quote";
  } else if (num > 2.5 && num <= 5) {
    return "medium-quote";
  } else if (num <= 2.5) {
    return "bad-quote";
  }
};
const checkForResum = (resume) => {
  if (resume) {
    return resume;
  } else {
    return "Pas de résumé disponible";
  }
};
const checkForGenre = (film) => {};
// function to creat card
const creatCardFilm = (film) => {
  const pathUrl = film.poster_path;
  const urlImage = `https://image.tmdb.org/t/p/w500${pathUrl}`;
  const myDiv = document.createElement("div");
  const vo = film.original_language.toUpperCase();
  const myClass = checkForRateClass(film.vote_average);
  const myRate = checkForRate(film.vote_average);
  const resume = checkForResum(film.overview);
  fetch(urlImage)
    .then((response) => {
      return response.blob();
    })
    .then((image) => {
      const imgBlob = URL.createObjectURL(image);
      const srcImage = imgBlob;
      myDiv.classList.add("card");
      myDiv.innerHTML = `<div class="flip-card">
                          <div class="card-front">
                            <img width="302px" height="422px" src="${srcImage}" alt="Image de ${film.title}" >
                          </div>
                          <div class="card-back">
                            <h2>${film.title}</h2>
                            <p>Date de sortie: ${film.release_date}</p>
                            <p>VO: ${vo}</p>
                            <p>Cotation:</p>
                            <div class="border-quote">
                              <div style="width:${myRate}%" class="${myClass}">${film.vote_average}/10</div>
                            </div>
                            <h2>Résumé:</h2>
                            <p>${resume}</p>
                          </div>
                         </div>`;
      $listFilm.appendChild(myDiv);
    })
    .catch((error) => {
      console.error(error);
    });
};
const fetchFilm = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      let filmOne = json.results;

      filmOne.forEach((el) => {
        creatCardFilm(el);
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
/* ===================================
              EVENT
==================================== */
window.addEventListener("load", () => {
  checkForConnect();
  getAllGenre();
  $showFilm.innerText = "Les mieux notés:";
  url = "https://api.themoviedb.org/3/movie/top_rated?api_key=23ba62fc39d351bae842170d72f6ba3e&language=fr-FR&page=1";
  fetchFilm(url);
});
$bestEver.addEventListener("click", () => {
  $showFilm.innerText = "Les mieux notés:";
  removeCurrentCard();
  url = "https://api.themoviedb.org/3/movie/top_rated?api_key=23ba62fc39d351bae842170d72f6ba3e&language=fr-FR&page=1";
  fetchFilm(url);
});
$trends.addEventListener("click", () => {
  $showFilm.innerText = "Films tendances:";
  removeCurrentCard();
  url = "https://api.themoviedb.org/3/trending/all/day?api_key=23ba62fc39d351bae842170d72f6ba3e";
  fetchFilm(url);
});

$selectGenre.addEventListener("change", () => {
  $showFilm.innerText = $selectGenre.value;
  urlGenreSelected = `https://api.themoviedb.org/3/discover/movie?api_key=23ba62fc39d351bae842170d72f6ba3e&language=fr-FR&with_genres=${allGenres.get($selectGenre.value)}`;
  removeCurrentCard();
  fetchFilm(urlGenreSelected);
});
