//Cambio de menu desplegable
hamburguesa.addEventListener('click', () => {
    hamburguesa.classList.toggle('fa-times');
    hamburguesa.classList.toggle('fa-bars');
    menu.classList.toggle('menu');
    menu.classList.toggle('menuOn');
}, false);

//focus X en el buscador
inputBusqueda.addEventListener('focus', () => {
    buscador.classList.toggle('fa-times');
}, false);

inputBusqueda.addEventListener('focusout', () => {
    buscador.classList.toggle('fa-times');
}, false);

// Click on X para input.value vacío. y para plegar lista de sugerencias
buscador.addEventListener('click', () => {
    inputBusqueda.value = '';
    sugerencias.setAttribute('class', 'Lista-Sugerencias');
}, false);

//Buscador: focus, sugerencias y mostrar resultados gifs solicitados impresos en el DOM.
inputBusqueda.addEventListener('focus', () => {
    sugerencias.setAttribute('class', 'Lista-Activa');
}, false);

//Obtener sugerencias al escribir
inputBusqueda.addEventListener('keyup', () => {
    obetenerSugerencias(inputBusqueda.value);
}, false);

// Evento ENTER para imprimir los gifs en el DOM
inputBusqueda.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {

        eliminarHijos(bloqueDeRespuestas);
        
        printGifsSearched(inputBusqueda.value, 0);
        sugerencias.setAttribute('class', 'Lista-Sugerencias');
    }
}, false);


// VER MAS GIFS 
botonVerMas.addEventListener('click', () => {
    bloqueDeRespuestas.removeChild(contenedorDeBotonVerMas);
    pagOffset = pagOffset + 12;
    printGifsSearched(inputBusqueda.value, pagOffset);

    insertarBotonVerMas();

}, false);