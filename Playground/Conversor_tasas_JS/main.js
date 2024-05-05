//Import local modules
import { ratesFromJSON } from "/modules/getData.js";  //Procesa la petición para obtener las tasas
import { newElement,popAlerta,sugerencias} from "/modules/DOMControler.js";
import { conversorTasas} from "/modules/conversorTasas.js";
import { limpiar,showHideSectionResultados } from "/modules/DOMButtons.js";


// DOM elementos cuadro de busqueda
  const principal = document.getElementById('principal');
  const campoBusqueda = document.getElementById('campoBusqueda');
  const sugerenciasBox = document.getElementById('sugerencias');
  const tasas_seleccion=document.getElementById("tasas_selecion");
  const alerta=document.getElementById("alerta");
  const anticipadaCheck =document.getElementById("anticipadaCheck");
//DOM Elementos resultado
  const resultado = document.getElementById("resultado");
  const resultado_titulo=document.getElementById("resultado_titulo");
  const resultado_info=document.getElementById("resultado_info");
  const resultadoTasasConvertidas=document.getElementById("resultadoTasasConvertidas");

//DOM Pop Alerta
const pop=document.getElementById("pop");

//Cargar datos de tasas desde "Data"
  let tasasJSON = await ratesFromJSON();


//Funciones  ejecutadas desde botones
window.limpiar = limpiar;
window.showHideSectionResultados = showHideSectionResultados;

//Portapapeles
  const Portapapeles=document.getElementById("portapapeles");


  let tasas = [];           // Tus sugerencias
  let tasa_seleccionada;    // Guarda la tasa del menu deplegable del cuadro de busqueda
  let tasaAConvertir;       // Se usa para guardar la tasa desde el archivo tasa.json



for (var i = 0; i < tasas_seleccion.options.length; i++){
    //Proporciona sugerencias basadas en las opciones en html
    tasas.push(tasas_seleccion.options[i].text);
    tasas_seleccion.options[i].value=tasas_seleccion.options[i].text;
}


//Muestra sugerencia cuando se escribe en el campo de busqueda
campoBusqueda.oninput= function() {
  if((campoBusqueda.value.replace("%","")/1)>0 ){
    //Reinicia las sugerencias
    sugerenciasBox.innerHTML = '';

    //Verifica si se esta escribiendo en el campo de busqueda
    sugerencias(sugerenciasBox,campoBusqueda,tasas,"",tasas_seleccion);
}
}




//Refresca resultados al hacer click en el body
principal.onclick = function(e) {

    if (e.target !== campoBusqueda || e.target !== tasas_seleccion) { //Muestra sugerencias solo si el campo de busqueda es el target
      sugerenciasBox.style.display = 'none';
    }

    mostrarResultados();

  };



function mostrarResultados(){

  //Busca la tasa seleccionada en las tasas obtenidas del archivo tasas.json
  for (let i = 0; i < tasasJSON.length; i++) {
    if (tasasJSON[i].nombre ==tasas_seleccion.value) {
      tasaAConvertir=tasasJSON[i];
    }
  }


  //Muestra u oculta la sección de resultado dependiendo si hay o no valores en el cuadro de busqueda
  if (Number(campoBusqueda.value.replace("%",""))>0) {
    resultado.style.display="block";
  }else{
    resultado.style.display="none";
  }
  
  //Cambia el titulo del resultado basado en la tasa elegida
  //Comprueba si es una tasa Anticipada para adaptar el titulo
  anticipadaCheck.checked ? resultado_titulo.textContent=`${campoBusqueda.value} ${tasaAConvertir.nombre} acticipada` : resultado_titulo.textContent=`${campoBusqueda.value} ${tasaAConvertir.nombre}` ;

  //Cambia la definición de acuerdo al titulo
  resultado_info.textContent=`${tasaAConvertir.definicion} Esta tasa equivale a las siguientes tasas: `;

  //Muestra los resultados de la conversión
  resultadoTasasConvertidas.innerHTML="";

  //Se crea un boton para ocultar o mostrar un determinado grupo de tasas
  //Crea una <ul> donde se agregarán las li con tasas

  //Crea la secciones para cada tipo de tasa (Inlcuye un boton con el titulo del tipo y la seccion donde se colocan los resultados)
  
  let titulosSeccionesResultados = ["Tasas periodicas","Tasas periodicas Anticipadas","Tasas nominales","Tasas nominales anticipadas"];
  //Se usa el tipo de tasa para calcular los resultados
  let tipoTasas=["periodica","nominal"];

  for (let i = 0; i < 4; i++) {
    let seccionTipoTasa = newElement("section","",`section_id_${i}`,"tipo_tasa"); //Crea una nueva sección de resultados
    let btn_grupo_tasa=newElement("button",titulosSeccionesResultados[i],"btn_resultado_seccion","");  //Crea el titulo 
    let tasa_de_interes_ul=newElement("ul","","",`ulResultados${i}`); //Crea la lista de resultados O Contenido de la sección de resultados
    
    //Funcionalidad boton de seccion resultado
    btn_grupo_tasa.setAttribute("onclick", `showHideSectionResultados(${i})`);

    //Añade el boton como titullo de esta sección
    seccionTipoTasa.appendChild(btn_grupo_tasa);
    //Añade la UL a la sección de resultados
    
    //Añade la sección a la lista de resultados
    resultadoTasasConvertidas.appendChild(seccionTipoTasa);
    
  
  tasasJSON.forEach(element => {  //Crea por cada tipo de tasa el valor equivalente a  la tasa introducida
    let elementIdCode=(Math.random()*1000000).toFixed(0);
    
    
      //Crea los elementos para la lista de tasas convertidas
      let tasa_de_interes_li=document.createElement('li',"","",`tasa_de_interes_li_${elementIdCode}`); // Crea un nuevo elemento <li>
      let btn_valor_tasa_convertida=newElement("button",conversorTasas(campoBusqueda.value.replace("%","")),"btn_valor_tasa_convertida",`btn_valor_tasa_convertida_${elementIdCode}`);
      let nombre_tasa_p=newElement("p",element.nombre);       // Agrega un parrafo a li
      let btn_copiar_tasa_convertida=newElement("button","Copiar","btn_copiar_tasa_convertida"); 


      btn_valor_tasa_convertida.onclick = function() { //Copia la tasa del boton
        Portapapeles.value=this.textContent;
        Portapapeles.select();
        document.execCommand('copy'); //Copiar

        popAlerta(pop,this.textContent + " Se ha copiado",1000,"#1B998B")

        };

      //Añade elementos a la lista de resultados
      tasa_de_interes_li.appendChild(btn_valor_tasa_convertida)       // Valor tasa convertida
      tasa_de_interes_li.appendChild(nombre_tasa_p);                  // Nombre tasa convertida
      tasa_de_interes_li.appendChild(btn_copiar_tasa_convertida)      // Boton de copiar
      tasa_de_interes_ul.appendChild(tasa_de_interes_li);             //Añade cada tasa a la lista
      //Añade los valores y secciones al de resultados al DOM
      resultadoTasasConvertidas.appendChild(tasa_de_interes_ul);                

    })
     
  }

  
};

popAlerta(pop,"Hola, empieza gratis, rápido y sin anuncios.",5000)

setInterval(() => {
  if ( Number(campoBusqueda.value.replace("%","")) >= 0) {
  }else{
    popAlerta(pop,"Ingresa solo números o porcentajes",2000,"red");
  }
}, 3000);