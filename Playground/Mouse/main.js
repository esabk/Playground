
// Obtener el elemento que queremos seguir al mouse
var elemento = document.getElementById("point");
var x = document.getElementById("x");
var y = document.getElementById("y");

// Agregar un escuchador de eventos para el evento mousemove
document.addEventListener("mousemove", function(event) {
  // Actualizar la posición del elemento según la posición del mouse
  setTimeout(() => {   //Genera un retraso de 100ms
    elemento.style.left = event.pageX-10 + "px";
    elemento.style.top = event.pageY-10 + "px";
  }, 100);

  //Muestra la posicion del mouse
  x.innerText="x   "+event.pageX;
  y.innerText="y   "+ event.pageY;
});

document.addEventListener("mousedown",function(event){
    elemento.style.background="red";
})
document.addEventListener("mouseup",function(event){
    elemento.style.background="black";
})
