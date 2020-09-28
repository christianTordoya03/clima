const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
    formulario.addEventListener("submit", buscarClima);
})

function buscarClima(e) {
    e.preventDefault();

  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

   if(ciudad === "" || pais === ""){
    mostrarError("ambos campos sin obligatorios");

    return;
}

  consultarAPI(ciudad,pais);
}

function mostrarError(mensaje){
    const alerta = document.querySelector(".bg-red-100");

    if(!alerta){

    const alerta = document.createElement ("div");

    alerta.classList.add("bg-red-100","border-red-400", "text-red-700", "px-4", "py-3", "rounded",
    "max-w-md", "mx-auto", "mt-6", "text-center");

    alerta.innerHTML = `
      <strong class="font-bold">Error!</strong>
      <span class="block">${mensaje}</span>
    `;

    container.appendChild(alerta);

    setTimeout(() => {
        alerta.remove();
    }, 3000);
    }
}

function consultarAPI(ciudad,pais){


    const appId = "688d468c5386ba43e6f62e5df6e29e48";
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner();
    
    fetch(url)
    .then( respuesta => respuesta.json())
    .then( datos => {

        limpiarHTML();

        if(datos.cod === "404"){
            mostrarError("Ciudad no encontrada")
            return;
        }

        mostrarClima(datos);
    })
}

function mostrarClima(datos){
    const {name, main: { temp, temp_max, temp_min}} = datos;


    const centigrados = KelvinACentigrados(temp);
    const max = KelvinACentigrados(temp_max);
    const min = KelvinACentigrados(temp_min);


    const nombreCiudad = document.createElement("p");
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add("font-bold", "text-2x1");


    const tempMaxima = document.createElement ("p");
    tempMaxima.innerHTML = `Max: ${max} &#8451`;
    tempMaxima.classList.add("text-xl");


    const tempMinima = document.createElement ("p");
    tempMinima.innerHTML = `Min: ${min} &#8451`;
    tempMinima.classList.add("text-xl");


    const actual = document.createElement("p");
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add("font-bold","text-6xl");

    const resultadoDiv = document.createElement("div");

    resultadoDiv.classList.add("text-center", "text-white");
    resultadoDiv.appendChild(nombreCiudad);

    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);



    resultado.appendChild(resultadoDiv);
}

const KelvinACentigrados = (grados) => parseInt(Math.ceil(grados - 273.15));


function limpiarHTML(){

    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

function Spinner(){


    limpiarHTML();

    const divSipnner = document.createElement("div");
    divSipnner.classList.add("sk-fading-circle");

    divSipnner.innerHTML = `
     <div class="sk-circle1 sk-circle"></div>
     <div class="sk-circle2 sk-circle"></div>
     <div class="sk-circle3 sk-circle"></div>
     <div class="sk-circle4 sk-circle"></div>
     <div class="sk-circle5 sk-circle"></div>
     <div class="sk-circle6 sk-circle"></div>
     <div class="sk-circle7 sk-circle"></div>
     <div class="sk-circle8 sk-circle"></div>
     <div class="sk-circle9 sk-circle"></div>
     <div class="sk-circle10 sk-circle"></div>
     <div class="sk-circle11 sk-circle"></div>
     <div class="sk-circle12 sk-circle"></div>
    `;
    

    resultado.appendChild(divSipnner);

}

