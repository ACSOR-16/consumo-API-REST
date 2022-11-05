const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2"; 
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites";
const API_URL_FAVORITES_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload";
//?api_key=live_QQNFyxjg7XRGD0vI1rnkZkjMv8PIiX3hE4ZXm7Mozgh01dwpsiFbmsddeLC3H0zj
const spanError = document.getElementById('error');

async function loadRandomCats () {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log('random')
  console.log(data)
  
  if (res.status !==  200)  {
    spanError.innerHTML = `Existe un error de tipo: ${res.status}`;
  } else {
  const image1 = document.getElementById('img1');
  const image2 = document.getElementById('img2');
  const button1 = document.getElementById('button1');
  const button2 = document.getElementById('button2');

  image1.src = data[0].url;
  image2.src = data[1].url;

  button1.onclick = () => saveFavouriteCats(data[0].id);
  button2.onclick = () => saveFavouriteCats(data[1].id);
  }
};

async function loadFavouriteCats () {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'GET',
    headers: {
      'x-api-key': 'live_QQNFyxjg7XRGD0vI1rnkZkjMv8PIiX3hE4ZXm7Mozgh01dwpsiFbmsddeLC3H0zj',
    }
  });
  const data = await res.json();
  console.log('favorites')
  console.log(data)
  
  if (res.status !==  200)  {
    spanError.innerHTML = `Existe un error de tipo: ${res.status} ${data.message}`;
  } else {
    const section = document.getElementById('favoritesCats');
    section.innerHTML = "";

    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Favorite Cats');
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach(cat => {
      const article = document.createElement('article');
      const img = document.createElement('img');
      const button = document.createElement('button');
      const buttonText = document.createTextNode('Remove Favorite Cats');
      
      img.src = cat.image.url;
      img.width = 320; 
      button.onclick = () => deleteFavoriteCat(cat.id);
      button.appendChild(buttonText);
      article.appendChild(img);
      article.appendChild(button);
      section.appendChild(article);
      // cat.image.url
    })
  }
};

async function saveFavouriteCats(id) {
  const res = await fetch(API_URL_FAVORITES,  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'live_QQNFyxjg7XRGD0vI1rnkZkjMv8PIiX3hE4ZXm7Mozgh01dwpsiFbmsddeLC3H0zj',
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = await res.json();

  console.log('save')
  console.log(res)

  if (res.status !==  200)  {
    spanError.innerHTML = `Existe un error de tipo: ${res.status} ${data.message}`;
  } else {
    console.log('cat guardado en favoritos');
    loadFavouriteCats();
  }
}

async function deleteFavoriteCat (id) {
  const res = await fetch(API_URL_FAVORITES_DELETE(id),  {
    method: 'DELETE',
    headers: {'x-api-key': 'live_QQNFyxjg7XRGD0vI1rnkZkjMv8PIiX3hE4ZXm7Mozgh01dwpsiFbmsddeLC3H0zj',
    },
  });
  const data = await res.json();
  if (res.status !==  200)  {
    spanError.innerHTML = `Existe un error de tipo: ${res.status} ${data.message}`;
  } else {
    console.log('cat eliminado en favoritos');
    loadFavouriteCats();
  }
}

async function uploadPhotoCat() {
  const form = document.getElementById('uploadingForm');
  const formData = new FormData(form);

  console.log(formData.get('file'));

  const res = await fetch(API_URL_UPLOAD, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      'x-api-key': 'live_QQNFyxjg7XRGD0vI1rnkZkjMv8PIiX3hE4ZXm7Mozgh01dwpsiFbmsddeLC3H0zj',
    },
    body: formData
  });
  const data = await res.json();
  
  if (res.status !== 201) {
    spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
    } else {
    console.log("Foto de michi cargada :)");
    console.log({ data });
    console.log(data.url);
    saveFavouriteCats(data.id) 
}

}

loadRandomCats();
loadFavouriteCats();