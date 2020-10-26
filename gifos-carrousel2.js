function flechaIzquierdaHoverReverse() {
    if (flechaDerecha.src == 'http://127.0.0.1:5500/img/button-slider-right-md-noct.svg') { // https://kevinyaguar.github.io
        flechaIzquierda.setAttribute('src', flechaIzquierdaSrcNocturno);
    } else {
        flechaIzquierda.setAttribute('src', flechaIzquierdaSrcNormal);
    }
}

function flechaDerechaHoverReverse() {
    if (flechaIzquierda.src == 'http://127.0.0.1:5500/img/button-slider-left-md-noct.svg') { //https://kevinyaguar.github.io
        flechaDerecha.setAttribute('src', flechaDerechaSrcNocturno);
    } else {
        flechaDerecha.setAttribute('src', flechaDerechaSrcNormal);
    }
}


//Hover en flecha izquierda
flechaIzquierda.addEventListener('mouseover', () => {
    flechaIzquierda.setAttribute('src', flechaIzquierdaSrcHover);
});
flechaIzquierda.addEventListener('mouseout', () => {
    flechaIzquierdaHoverReverse();
});

//Hover en flecha derecha
flechaDerecha.addEventListener('mouseover', () => {
    flechaDerecha.setAttribute('src', flechaDerechaSrcHover);
});
flechaDerecha.addEventListener('mouseout', () => {
    flechaDerechaHoverReverse();
});


//Funcion para descargar imagenes
async function algo(imgTrend) {

    let a = document.createElement('a');
    let response = await fetch(imgTrend.src);
    let file = await response.blob();
    a.download = 'MiNuevoGif.gif';
    a.href = window.URL.createObjectURL(file);
    a.dataset.downloadurl = ['application/octet-stream', a.download, a.href].join(':');
    a.click();

};

// Variables Carrusel

let galeryIn = document.getElementById('galeryIn');


async function gifsTrendingCarrousel(trending, offset) {
    var url = `https://api.giphy.com/v1/gifs/search?${ApiKey}&q=${trending}&limit=12&offset=${offset}&rating=g&lang=en`;
    var res = await fetch(url);
    var json = await res.json();

    for (var data of json.data) {
        var gif = data.images.original;
        var imgTrend = document.createElement('img');
        imgTrend.setAttribute('src', gif.url);
        imgTrend.setAttribute('id', 'imgTrend');

        //cards
        let bloqueParaCadaImagen = document.createElement('div'); //En este div sucederan los eventos mouseover
        let bloqueParaCadaImagenInferior = document.createElement('div'); // En este se imprimiran los gifs

        bloqueParaCadaImagen.id = 'bloque-para-cada-imagen';
        bloqueParaCadaImagenInferior.id = 'bloque-inferior';


        bloqueParaCadaImagen.setAttribute('class', 'imagenes-trending');
        bloqueParaCadaImagenInferior.setAttribute('class', 'imagenes-trending');
        imgTrend.setAttribute('class', 'imagenes-trending');

        galeryIn.appendChild(bloqueParaCadaImagen);
        bloqueParaCadaImagen.appendChild(bloqueParaCadaImagenInferior);
        bloqueParaCadaImagenInferior.appendChild(imgTrend);

        //Variables y eventos mouseover
        let btnFav = document.createElement('div'); //Boton Favoritos.
        btnFav.classList.toggle('btnFavOut'); //por defecto display:none.
        let heartFav = document.createElement('img'); //imagen Corazon.
        heartFav.setAttribute('src', './img/icon-fav.svg');

        heartFav.id = 'btn-gif-card-trending';

        let btnDownload = document.createElement('div'); //Boton Descargar.
        btnDownload.classList.toggle('btnFavOut'); //por defecto display:none.
        let downloadImg = document.createElement('img'); //imagen Descargar.
        downloadImg.setAttribute('src', './img/icon-download.svg');
        downloadImg.id = 'btn-gif-card-trending';
        //descargar imagenes
        downloadImg.addEventListener('click', () => {
            return algo(imgTrend)
        }, false);

        let btnExpand = document.createElement('div'); // Boton Expandir.
        btnExpand.classList.toggle('btnFavOut'); //por defecto display:none.
        let expandImg = document.createElement('img'); //imagen Expandir
        expandImg.setAttribute('src', './img/icon-max-normal.svg');
        expandImg.id = 'btn-gif-card-trending';

        bloqueParaCadaImagen.appendChild(btnFav); //Insercion del boton en el bloque FAV
        btnFav.appendChild(heartFav); //Insercion de la imagen en el boton

        bloqueParaCadaImagen.appendChild(btnDownload); //Insercion del boton en el bloque DOWNLOAD
        btnDownload.appendChild(downloadImg) //link de descarga


        bloqueParaCadaImagen.appendChild(btnExpand); //Insercion del boton en el bloque EXPAND
        btnExpand.appendChild(expandImg); //Insercion de la imagen en el boton

        //funciones de normal, hover y click del src del heart fav.
        function corazonNormalFunction() {
            if (heartFav.src == corazonActiveActive) {
                heartFav.setAttribute('src', corazonActive);
                heartFav.style.padding = '7px';
            } else {
                heartFav.setAttribute('src', corazonNormal);
                heartFav.style.padding = '';
            }
        }

        function corazonHoverFunction() {
            if (heartFav.src == corazonActiveActive) {
                heartFav.setAttribute('src', corazonActive);
                heartFav.style.padding = '7px';
            } else {
                heartFav.setAttribute('src', corazonHover);
                heartFav.style.padding = '';
            }
        }

        function corazonActiveFunction() {
            if (heartFav.src == corazonActiveActive) {
                heartFav.setAttribute('src', corazonHover);
                heartFav.style.padding = '';
            } else {
                heartFav.setAttribute('src', corazonActive);
                heartFav.style.padding = '7px';
            }
        }

        function guardarEnSssionStorage() {
            if (heartFav.src == corazonActiveActive) {
                arrayGifsParaStorage.push(imgTrend.getAttribute('src'));
                //console.log(arrayGifsParaStorage);
            } else {
                arrayGifsParaStorage.pop(imgTrend.getAttribute('src'));
                //console.log(arrayGifsParaStorage);
            }
            var arrayGifsParaStorage2 = JSON.stringify(arrayGifsParaStorage);
            sessionStorage.setItem('arrayGifs', arrayGifsParaStorage2);

        }

        //Eventos mouseover sobre el GIF
        bloqueParaCadaImagen.addEventListener('mouseover', () => {
            bloqueParaCadaImagen.classList.toggle('bloque-para-cada-imagen-hover-background');
            bloqueParaCadaImagenInferior.classList.toggle('opacity-cero-dot-six');

            if(btnFav.classList.value == 'btnFavOut'){
                btnFav.classList.toggle('btnFavOut'); //por defecto display:none.   
            }
            btnFav.classList.toggle('btn-gif-card-trending');

            //Eventos mouseover/out y click sobre el boton FAV
            heartFav.addEventListener('mouseover', corazonHoverFunction, false);
            heartFav.addEventListener('mouseout', corazonNormalFunction, false);
            heartFav.addEventListener('click', corazonActiveFunction, false);
            heartFav.addEventListener('click', guardarEnSssionStorage, false);

            //Eventos mouseover sobre el boton DOWNLOAD
            if(btnDownload.classList.value == 'btnFavOut'){
                btnDownload.classList.toggle('btnFavOut'); //por defecto display:none.   
            }
            btnDownload.classList.toggle('btn-gif-card-trending');
            btnDownload.addEventListener('mouseover', () => {
                downloadImg.setAttribute('src', './img/icon-download-hover.svg');

            }, false);



            //Eventos mouseover sobre el boton EXPAND
            if(btnExpand.classList.value == 'btnFavOut'){
                btnExpand.classList.toggle('btnFavOut'); //por defecto display:none.   
            }
            btnExpand.classList.toggle('btn-gif-card-trending');
            btnExpand.addEventListener('mouseover', () => {
                expandImg.setAttribute('src', './img/icon-max-hover.svg');
            }, false);


        }, false); //fin del evento mouseover

        //Eventos mouseout sobre el boton DOWNLOAD
        btnDownload.addEventListener('mouseout', () => {
            downloadImg.setAttribute('src', './img/icon-download.svg');
        }, false);

        //Eventos mouseout sobre el boton EXPAND
        btnExpand.addEventListener('mouseout', () => {
            expandImg.setAttribute('src', './img/icon-max-normal.svg');
        }, false);

        //Eventos mouseout sobre el GIF
        bloqueParaCadaImagen.addEventListener('mouseout', () => {
            bloqueParaCadaImagen.classList.toggle('bloque-para-cada-imagen-hover-background');
            bloqueParaCadaImagenInferior.classList.toggle('opacity-cero-dot-six');
            btnFav.classList.toggle('btn-gif-card-trending');

            if(btnFav.classList.value !== 'btnFavOut'){
                btnFav.classList.toggle('btnFavOut'); //por defecto display:none.   
            }

            btnDownload.classList.toggle('btn-gif-card-trending');

            if(btnDownload.classList.value !== 'btnFavOut'){
                btnDownload.classList.toggle('btnFavOut'); //por defecto display:none.   
            }

            btnExpand.classList.toggle('btn-gif-card-trending');

            if(btnExpand.classList.value !== 'btnFavOut'){
                btnExpand.classList.toggle('btnFavOut'); //por defecto display:none.   
            }
        });

        //Efecto carrusel flecha derecha //Solo funciona con 12 Gifs de la medida actual
        let inicio = 0;
        flechaDerecha.addEventListener('click', () => {
            if (inicio > -4246 && inicio <= 0) {
                inicio = inicio - 386;
                bloqueParaCadaImagen.style.left = inicio + 'px';
            }
            if (inicio <= -4246) {
                inicio = 0;
                bloqueParaCadaImagen.style.left = inicio + 'px';
            }
        });
        //Efecto carrusel flecha derecha
        flechaIzquierda.addEventListener('click', () => {
            if (inicio == 0) {
                inicio = -3860;
                bloqueParaCadaImagen.style.left = inicio + 'px';
            }
            if (inicio >= -3860 && inicio < 0) {
                inicio = inicio + 386;
                bloqueParaCadaImagen.style.left = inicio + 'px';
            }
        });

        //Evento EXPANDIR
        function expandir() {

            seccionOne.classList.toggle('one');
            seccionTwo.classList.toggle('two');
            seccionOne.classList.toggle('clase-display-none');
            seccionTwo.classList.toggle('clase-display-none');

            seccionMax.classList.toggle('seccion-max');
            seccionMax.appendChild(cruzClose);
            seccionMax.appendChild(imgTrend);
            seccionMax.appendChild(contenedorBajoMax);
            while (contenedorBajoMax.firstChild) {
                contenedorBajoMax.removeChild(contenedorBajoMax.firstChild);
            }
            contenedorBajoMax.appendChild(btnFav);
            contenedorBajoMax.appendChild(btnDownload);

            if(btnFav.classList.value !== 'btnFavOut'){
                btnFav.classList.toggle('btnFavOut'); //por defecto display:none.   
            }
            if(btnDownload.classList.value !== 'btnFavOut'){
                btnDownload.classList.toggle('btnFavOut'); //por defecto display:none.   
            }
            if(btnExpand.classList.value !== 'btnFavOut'){
                btnExpand.classList.toggle('btnFavOut'); //por defecto display:none.   
            }

            btnFav.classList.toggle('btn-gif-card-trending-max');
            btnDownload.classList.toggle('btn-gif-card-trending-max');
        }
        expandImg.addEventListener('click', expandir, false);

        cruzClose.addEventListener('click', () => {
            if(btnFav.classList.value == 'btn-gif-card-trending-max'){
                btnFav.classList.toggle('btn-gif-card-trending-max');
            }
            if(btnDownload.classList.value == 'btn-gif-card-trending-max'){
                btnDownload.classList.toggle('btn-gif-card-trending-max');
            }
            
            if(btnFav.classList.value !== 'btnFavOut'){
                btnFav.classList.toggle('btnFavOut'); //por defecto display:none.   
            }
            if(btnDownload.classList.value !== 'btnFavOut'){
                btnDownload.classList.toggle('btnFavOut'); //por defecto display:none.   
            }
            if(btnExpand.classList.value !== 'btnFavOut'){
                btnExpand.classList.toggle('btnFavOut'); //por defecto display:none.   
            }
            
            bloqueParaCadaImagenInferior.appendChild(imgTrend);
            
            bloqueParaCadaImagen.appendChild(btnFav); //Insercion del boton en el bloque FAV
            btnFav.appendChild(heartFav); //Insercion de la imagen en el boton

            bloqueParaCadaImagen.appendChild(btnDownload); //Insercion del boton en el bloque DOWNLOAD
            btnDownload.appendChild(downloadImg) //link de descarga

            bloqueParaCadaImagen.appendChild(btnExpand); //Insercion del boton en el bloque EXPAND
            btnExpand.appendChild(expandImg); //Insercion de la imagen en el boton
        }, false);

    }
}

gifsTrendingCarrousel('trending', 0);

main.appendChild(seccionMax);


function cerrarExpand() {
    while (seccionMax.firstChild) {
        seccionMax.removeChild(seccionMax.firstChild);
    }
    seccionOne.classList.toggle('one');
    seccionTwo.classList.toggle('two');
    seccionOne.classList.toggle('clase-display-none');
    seccionTwo.classList.toggle('clase-display-none');
    seccionMax.classList.toggle('seccion-max');
    seccionMax.classList.toggle('clase-display-none');

};
cruzClose.addEventListener('click', cerrarExpand);