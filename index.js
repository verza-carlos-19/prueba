const galeria = document.querySelector("#galeria");
const prodsShop = document.querySelector("#prods");
const url = "https://dummyjson.com/products/category/";
const urln = "https://dummyjson.com/product/";
let combox = document.querySelector("#combobox");
var seleccion = "";
var categories = "";
var cart = [];
var totalprice = 0;
const spanCart = document.querySelector("#numcart");
const spanTotal = document.querySelector("#total");
const spanCuantCart = document.querySelector(".numcuant");

//no se toca👇 porque es lo que hace funcionar la pag.
function init() {
  categories = "https://dummyjson.com/products/categories";
  fetch(categories)
    .then((res) => res.json())
    .then((json) => cargarCombox(json));
  cargarProductos();
}

//no se toca👇 porque es lo que hace funcionar el combox.
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
                    <div class="buttons">
                    <button class="btns btn-srv" onclick="enfocarUno(${producto.id})">more details</button>
                    <button class="btns btn-agregar" onclick="testCartAdd(${producto.id})">add to cart</button> 
                    <!--<span class="material-symbols-outlined cartadd"> add_shopping_cart </span>-->

                    </div>
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

function testCartAdd(id) {
  console.log("ok");
  console.log(id);
  mostrarLog(id);
  modSpanCart();
  cargarOne(id);
  spanTotal.innerHTML = "$" + totalprice;
}

function testCart() {
  console.log(cart);
  cargarCart();
}

function modSpanCart() {
  spanCart.innerHTML = `${cart.length + 1}`;
}

function mostrarLog(idd) {
  fetch(urln + idd)
    .then((res) => res.json())
    .then((json) => cart.push(json));
}

function cargarCart() {
  while (prodsShop.firstChild) {
    prodsShop.removeChild(prodsShop.firstChild);
  }
  totalprice = 0;
  for (let i = 0; i < cart.length; i++) {
    cargarAShop(cart[i]);
    totalprice += cart[i].price;
  }
  spanTotal.innerHTML = "$ " + totalprice;
  console.log("el preci de todo funciona y es:" + totalprice);
}

function cargarAShop(prd) {
  const prdd = document.createElement("div");
  prdd.classList.add("prodd");
  prdd.innerHTML = `
  <div class="boximg">
              <img src="${prd.images[0]}" alt="" />
            </div>
            <div class="box">
              <div class="titulo-precio">
                <div class="titfix">
                  <h3>${prd.title}</h3>
                </div>
                <p>$${prd.price}</p>
              </div>
            </div>
            <div class="box">
              <div class="quantity-handler">
              <span><i class="fa-solid fa-minus menos"></i></span>
              <span class="numcuant">1</span>
              <span onclick="sumar();"><i class="fa-solid fa-plus menos" ></i></span>
              </div>
            </div>
            <i class="fa-solid fa-trash"></i>
    `;
  prodsShop.append(prdd);
}

function cargarOne(pid) {
  fetch(urln + pid)
    .then((res) => res.json())
    .then((json) => cargarAShop(json));
  fetch(urln + pid)
    .then((res) => res.json())
    .then((json) => sumarPrecio(json));
}
function sumarPrecio(pdr) {
  let totp = totalprice + pdr.price;
  totalprice += pdr.price;
  spanTotal.innerHTML = "$ " + totp;
}
function vaciarCart() {
  cart = [];
  spanCart.innerHTML = "0";
  prodsShop.innerHTML = "";
  totalprice = 0;
  spanTotal.innerHTML = "$ " + totalprice;
}
function sumar() {
  console.log(spanCuantCart);
}
