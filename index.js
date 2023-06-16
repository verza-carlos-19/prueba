const galeria = document.querySelector("#galeria");
const url = "https://dummyjson.com/products/category/";
const urln = "https://dummyjson.com/product/";
let combox = document.querySelector("#combobox");
var seleccion = "";
var categories = "";
function init() {
  categories = "https://dummyjson.com/products/categories";
  fetch(categories)
    .then((res) => res.json())
    .then((json) => cargarCombox(json));
  cargarProductos();
}
function cargarCombox(jason) {
  for (let a = 0; a < jason.length; a++) {
    const option = document.createElement("option");
    option.classList.add("opt");
    option.value = jason[a];
    option.innerHTML = jason[a];
    combox.append(option);
    console.log(jason[a].name);
  }
  for (let j = 0; j < 10; j++) {
    console.log(j);
  }
}
function cargarProductos() {
  while (galeria.firstChild) {
    galeria.removeChild(galeria.firstChild);
  }
  for (let i = 1; i < 100; i++) {
    fetch(urln + i)
      .then((res) => res.json())
      .then((json) => mostrarProductos(json));
  }
}

function mostrarProductos(producto) {
  const Div = document.createElement("div");
  Div.classList.add("product");
  Div.innerHTML = `
                <div class="img">
                    <img src="${producto.images[0]}" alt="${producto.title}">
                </div>
                <div class="info">
                    <div class="info-title"> 
                        <h2 class="titlee">${producto.title}</h2>
                    </div>
                    <div class="info-des">
                        <p class="descripcion">${producto.description}</p>
                    </div>
                    <button class="btn-srv" onclick="enfocarUno(${producto.id})">SEE DETAILS</button>
                </div>
    `;
  galeria.append(Div);
}

function enviar() {
  if (combox.value == "") {
    cargarProductos();
  } else {
    seleccion = combox.value;
    fetch(url + seleccion)
      .then((res) => res.json())
      .then((json) => encontrarCat(json));
  }
}
function encontrarCat(jxson) {
  while (galeria.firstChild) {
    galeria.removeChild(galeria.firstChild);
  }
  console.log(jxson.products.length);
  for (let b = 0; b < jxson.products.length; b++) {
    console.log(jxson.products[b]);
    console.log(b);
    mostrarProductos(jxson.products[b]);
  }
}
function enfocarUno(prod) {
  console.log("carlos verza");
  console.log("hola mundo");
  console.log(prod);
}
