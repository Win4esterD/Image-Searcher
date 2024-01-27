const accessKey = "h_F3N8YoVToZjgpeUYgmOjseNhO6KKL1sCkvNHHDXeM";
const link = "https://api.unsplash.com/photos/?per_page=30";
const searchLink = "https://api.unsplash.com/search/photos?";
const main = document.body.firstElementChild.nextElementSibling;
const searchInput = document.body.firstElementChild.firstElementChild.firstElementChild;
const cross = document.body.firstElementChild.firstElementChild.firstElementChild.nextElementSibling;

searchInput.focus();

async function fetchFotos(url) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    const json = await response.json();
    return json;
  } catch (err) {
    console.log(err.message);
  }
}

function fotosGenerator(fotoObj) {
  fotoObj.forEach((item) => {
    const img = document.createElement("img");
    img.className = "foto";
    img.setAttribute("src", item.urls.small);
    main.appendChild(img);
  });
}

async function uploadFotosToThePage(link) {
  const fotos = await fetchFotos(link);
  main.innerHTML = '';
  if(fotos.results) {
    fotosGenerator(fotos.results);
  }else {
    fotosGenerator(fotos);
  }
  
}


searchInput.addEventListener('keyup', async function (e) {
  if(e.key === "Enter") {
    const url = `${searchLink}?page=1&query=${searchInput.value}&per_page=30`;
    await uploadFotosToThePage(url);
  }
});

cross.addEventListener('click', () => {
  searchInput.value = '';
});

uploadFotosToThePage(link);