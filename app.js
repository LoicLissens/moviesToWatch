//! attention carte mettre en balise template html ou faire plusieurs creat element car innerhtml quand ca vient d'unAPI peut etre du script malhonnete
//! https://developer.mozilla.org/fr/docs/Web/HTML/Element/template
//! anglais/fr/ pagination/ remove vrom my list and new button for movies already watched
//! HONEY POT// voir htmlentities PHP
//! redirection page connection si mdp foirer
//! mdp ddb webhost = rootroot/ et utilisateur = id12726260_root et nom ddb = id12726260_watchmovies

/* ===================================
        ?GLOBAL VAR AND DOM SELECT
==================================== */
let url;
const allGenres = new Map();
const urlGenre = "https://api.themoviedb.org/3/genre/movie/list?api_key=23ba62fc39d351bae842170d72f6ba3e&language=fr-Fr";
let urlGenreSelected;
const urlToAddFilm = "assets/php/models/pushtolist.php";
const urlToGetFilm = "assets/php/models/getfilmtowatch.php";
const $listFilm = document.querySelector("#movielist");
const $bestEver = document.getElementById("bestever");
const $trends = document.getElementById("trends");
const $showFilm = document.getElementById("showfilm");
const $selectGenre = document.getElementById("selectgenre");
const $listButton = document.getElementById("list-button");
const $myListButton = document.getElementById("mylist");

/* ===================================
              ?FUNCTION
==================================== */

const checkForConnect = () => {
  if (isConnected == false) {
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
const checkDisplayButton = () => {
  if (isConnected == false) {
    return "to-hide";
  } else {
    return "to-display";
  }
};

const changeStateButton = ($idButton) => {
  $idButton.innerText = "Dans ma liste";
  $idButton.classList.add("in-my-list");
  $idButton.disabled = true;
};
// this const will push the film to the film to watch idFilm is a number
const pushToMyList = (idFilm) => {
  const $idButton = document.getElementById(`${idFilm}`);
  $idButton.addEventListener("click", () => {
    fetch(urlToAddFilm, {
      method: "post",
      headers: { "Content-Type": "application/x-www-form-urlencoded" }, //! way to don't post form or json format for what ?
      body: "id=" + idFilm
    })
      .then((response) => {
        return response.text();
      })
      .then((text) => {
        changeStateButton($idButton);
      })
      .catch((error) => {
        console.error(error);
      });
  });
};
// This fct will fetch all the movie in the list of the current connected user and display it

const getFilmToWatch = () => {
  fetch(urlToGetFilm)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      text = text.split(",");
      text.pop();
      text.forEach((el) => {
        let url = `https://api.themoviedb.org/3/movie/${el}?api_key=23ba62fc39d351bae842170d72f6ba3e&language=fr-FR`;
        fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            creatCardFilm(json);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
const checkIsFilmIsToWatch = (idFilm) => {
  const $idButton = document.getElementById(`${idFilm}`);
  fetch(urlToGetFilm)
    .then((response) => {
      return response.text();
    })
    .then((text) => {
      text = text.split(",");
      text.pop();
      text.forEach((el) => {
        if (el == idFilm) {
          changeStateButton($idButton);
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
// ?function to creat card
const creatCardFilm = (film) => {
  const pathUrl = film.poster_path;
  const addList = checkDisplayButton();
  const idFilm = film.id;
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
                            <button id="${idFilm}" class="${addList}" >Ajouter à ma liste</button>
                          </div>
                         </div>`;
      $listFilm.appendChild(myDiv);
      pushToMyList(idFilm);
    })
    .then(() => {
      checkIsFilmIsToWatch(idFilm);
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
              ?EVENT
==================================== */
window.addEventListener("load", () => {
  checkForConnect();
  $showFilm.innerText = "Les mieux notés:";
  url = "https://api.themoviedb.org/3/movie/top_rated?api_key=23ba62fc39d351bae842170d72f6ba3e&language=fr-FR&page=1";
  getAllGenre();
  fetchFilm(url);
});
$bestEver.addEventListener("click", () => {
  url = "https://api.themoviedb.org/3/movie/top_rated?api_key=23ba62fc39d351bae842170d72f6ba3e&language=fr-FR&page=1";
  $showFilm.innerText = "Les mieux notés:";
  removeCurrentCard();
  fetchFilm(url);
});
$trends.addEventListener("click", () => {
  url = "https://api.themoviedb.org/3/trending/all/day?api_key=23ba62fc39d351bae842170d72f6ba3e&language=fr-FR&page=1";
  $showFilm.innerText = "Films tendances:";
  removeCurrentCard();
  fetchFilm(url);
});

$selectGenre.addEventListener("change", () => {
  $showFilm.innerText = $selectGenre.value;
  urlGenreSelected = `https://api.themoviedb.org/3/discover/movie?api_key=23ba62fc39d351bae842170d72f6ba3e&language=fr-FR&with_genres=${allGenres.get($selectGenre.value)}&page=1`;
  removeCurrentCard();
  fetchFilm(urlGenreSelected);
});
if (isConnected) {
  $myListButton.addEventListener("click", () => {
    $showFilm.innerText = "Ma liste de films:";
    removeCurrentCard();
    getFilmToWatch();
  });
}
