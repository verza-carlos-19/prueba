const galeria = document.querySelector("#galeria");
const url = "https://dummyjson.com/products/category/";
const urln = "https://dummyjson.com/product/";
let combox = document.querySelector("#combobox");
var seleccion = "";
var categories = "";
var cartVisibility = false;

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  init();
  setTimeout(2000);
  ready();
}

function ready() {
  var btnsEliminarItem = document.getElementsByClassName("trsh");
  for (var i = 0; i < btnsEliminarItem.length; i++) {
    var btn = btnsEliminarItem[i];
    btn.addEventListener("click", eliminarItemCart);
  }

  var btnSumarCant = document.getElementsByClassName("sumar");
  for (var j = 0; j < btnSumarCant.length; j++) {
    var sumBtn = btnSumarCant[j];
    sumBtn.addEventListener("click", sumarCantidadCart);
  }

  var btnRestarCant = document.getElementsByClassName("restar");
  for (var j = 0; j < btnRestarCant.length; j++) {
    var resBtn = btnRestarCant[j];
    resBtn.addEventListener("click", restarCantidadCart);
  }
  document
    .getElementsByClassName("cart-trsh")[0]
    .addEventListener("click", eliminarTodosCart);
  document
    .getElementsByClassName("carting")[0]
    .addEventListener("click", guardCart);
}
function guardCart() {
  if (cartVisibility == false) {
    guardarCart(true);
  } else {
    guardarCart(false);
  }
}
function guardarCart(tog) {
  var cartItems = document.getElementsByClassName("prods")[0];
  var cart = document.getElementsByClassName("shop-cart")[0];
  cartVisibility = tog;
  if (cartItems.hasChildNodes() == false || cartVisibility == false) {
    cart.style.translate = "200%";
    console.log("ok el test de guardar el carro funciona");
  } else {
    cart.style.translate = "0%";
  }
}

function eliminarTodosCart() {
  var cartt = document.getElementsByClassName("prods")[0];
  while (cartt.firstChild) {
    cartt.removeChild(cartt.firstChild);
  }
  actualizarTotalCart();
  //   var spanCant = document.getElementsByClassName("numcart")[0];
  //   spanCant.innerHTML = "0";
  actualizarSpanCant();
  guardarCart();
}
function eliminarItemCart(event) {
  var btnClicked = event.target;
  btnClicked.parentElement.remove();
  actualizarTotalCart();
  actualizarSpanCant();
  guardarCart();
}
function actualizarTotalCart() {
  var cartCont = document.getElementsByClassName("prods")[0];
  var cartItems = cartCont.getElementsByClassName("prodd");
  var total = 0;

  for (var i = 0; i < cartItems.length; i++) {
    var item = cartItems[i];
    var precioItem = item.getElementsByClassName("price-item")[0];
    console.log(precioItem);
    var precio = parseFloat(
      precioItem.innerText.replace("$", "").replace(".", "")
    );
    console.log(precio);
    var cantidadItem = item.getElementsByClassName("numcuant")[0];
    console.log(cantidadItem);
    var cantidad = parseFloat(cantidadItem.value);
    console.log(cantidad);
    total = total + precio * cantidad;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-gral")[0].innerText =
    "$" + total.toLocaleString("es") + ",00";
  console.log(total);
}

// funciones del quantity-handler
function sumarCantidadCart(event) {
  var btnClicked = event.target;
  var selector = btnClicked.parentElement;
  var cantidadActual = selector.getElementsByClassName("numcuant")[0].value;
  console.log(cantidadActual);
  cantidadActual++;
  console.log(cantidadActual);
  selector.getElementsByClassName("numcuant")[0].value = cantidadActual;
  sumarSpanCantidad();
  actualizarTotalCart();
}
function restarCantidadCart(event) {
  var btnClicked = event.target;
  var selector = btnClicked.parentElement;
  var cantidadActual = selector.getElementsByClassName("numcuant")[0].value;
  console.log(cantidadActual);
  cantidadActual--;
  console.log(cantidadActual);
  selector.getElementsByClassName("numcuant")[0].value = cantidadActual;
  actualizarTotalCart();
  if (cantidadActual == 0) {
    selector.parentElement.parentElement.remove();
  }
  actualizarSpanCant();
  guardarCart();
}
function cargarAlCart(event) {
  var btnClicked = event.target;
  var prod = btnClicked.parentElement.parentElement.parentElement;
  console.log(prod);
  var titulo = prod.getElementsByClassName("titlee")[0].innerText;
  var precio = prod.getElementsByClassName("price-itemm")[0].innerText;
  var imagen = prod.getElementsByClassName("img-prd")[0].src;
  console.log(titulo + " " + precio + " " + imagen);
  cargarItemAlCarrito(titulo, precio, imagen);
  console.log("ok");
  actualizarSpanCant();
}
function actualizarSpanCant() {
  var spanCant = document.getElementsByClassName("numcart")[0];
  var cantsCart = document.getElementsByClassName("numcuant");
  var total = parseInt(spanCant.innerText);
  var tot = 0;
  for (var i = 0; i < cantsCart.length; i++) {
    console.log(cantsCart[i].value);
    tot += parseInt(cantsCart[i].value);
  }
  spanCant.innerHTML = tot;
}

function cargarItemAlCarrito(titulo, precio, imagen) {
  var item = document.createElement("div");
  item.classList.add("prodd");
  var itemsCarrito = document.getElementsByClassName("prods")[0];

  var nombresItemsCarrito =
    itemsCarrito.getElementsByClassName("title-item-cart");
  for (var i = 0; i < nombresItemsCarrito.length; i++) {
    console.log("esto es una prueba del for");
    if (nombresItemsCarrito[i].innerText == titulo) {
      var select =
        nombresItemsCarrito[i].parentElement.parentElement.parentElement
          .parentElement;
      var cantidadActual = select.getElementsByClassName("numcuant")[0].value;
      console.log(select);
      console.log(cantidadActual);
      cantidadActual++;
      console.log(cantidadActual);
      select.getElementsByClassName("numcuant")[0].value = cantidadActual;
      console.log(cantidadActual);
      actualizarTotalCart();
      return;
    }
  }

  var itemCarritoContenido = `
    <div class="boximg">
              <img src="${imagen}" alt="" />
            </div>
            <div class="box">
              <div class="titulo-precio">
                <div class="titfix">
                  <h3 class="title-item-cart">${titulo}</h3>
                </div>
                <p class="price-item">$${precio}</p>
              </div>
            </div>
            <div class="box">
              <div class="quantity-handler">
                <i class="fa-solid fa-minus menos restar"></i>
                <input type="num" value="1" class="numcuant" disabled />
                <i class="fa-solid fa-plus menos sumar"></i>
              </div>
            </div>
            <i class="fa-solid fa-trash trsh"></i>
            </div>
    `;
  item.innerHTML = itemCarritoContenido;
  itemsCarrito.append(item);

  item
    .getElementsByClassName("trsh")[0]
    .addEventListener("click", eliminarItemCart);
  item
    .getElementsByClassName("restar")[0]
    .addEventListener("click", restarCantidadCart);
  item
    .getElementsByClassName("sumar")[0]
    .addEventListener("click", sumarCantidadCart);
  actualizarTotalCart();
  actualizarSpanCant();
}

//bateria de funciones que hacen funcionar el combox y cargan los prods.
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
                    <img class="img-prd" src="${producto.images[0]}" alt="${producto.title}">
                </div>
                <div class="info">
                    <div class="info-title"> 
                        <h2 class="titlee">${producto.title}</h2>
                    </div>
                    <div class="info-des">
                        <p class="descripcion">${producto.description}</p>
                        <span class="price-itemm">${producto.price}</span>
                    </div>
                    <div class="buttons">
                    <button class="btns btn-srv" onclick="enfocarUno(${producto.id})">more details</button>
                    <button class="btns btn-agregar addd" >add to cart</button> 
                    </div>
                    </div>
    `;
  galeria.append(Div);
  var btnsAgregarAlCart = document.getElementsByClassName("addd");
  for (var i = 0; i < btnsAgregarAlCart.length; i++) {
    var btnAdd = btnsAgregarAlCart[i];
    btnAdd.addEventListener("click", cargarAlCart);
  }
}
//                    <!--<span class="material-symbols-outlined cartadd"> add_shopping_cart </span>-->
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
  console.log(jxson);
  for (let b = 0; b < jxson.products.length; b++) {
    console.log(jxson.products[b]);
    console.log(b);
    mostrarProductos(jxson.products[b]);
  }
}
