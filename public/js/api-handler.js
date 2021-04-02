const btnApi = document.getElementById("btn-api");
const contField = document.getElementById("api-content");

// Se define el query y las variables segun: https://anilist.github.io/ApiV2-GraphQL-Docs/
var query = `
  query($id: Int){
    Media (id: $id, type: ANIME){
      id
      bannerImage
      coverImage {
        extraLarge
        large
        medium
        color
      }
      title {
        romaji
        english
        native
      }
      description
    }
  }
`;

var variables = {
  id: 15125,
};
// La url a la que se hara el request con las opciones
var url = "https://graphql.anilist.co",
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

btnApi.addEventListener("click", () => {
  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
});

function handleResponse(response) {
  return response.json().then((json) => {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data){
  media = data.data.Media
  contField.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${media.coverImage.large}" style="width: 100%; height: auto;" />
      <div class="card-body">
        <h5 class="card-title">${media.title.romaji}[${media.title.native}]</h5>
        <h6 class="card-subtitle mb-2 text-muted">ID: ${media.id}</h6>
        <p class="card-text">${media.description}</p>
      </div>
    </div>
  `
  console.log(media)
}

function handleError(error){
    contField.innerHTML = "<h3>Error obteniendo contenido</h3>"
    console.log(error);
}