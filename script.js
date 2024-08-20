const textAreaIn = document.querySelector(".ingresa_texto");
const textAreaOut = document.querySelector(".salida_texto");
const msg_input = document.querySelector(".msg-input");
const btnCopiar = document.querySelector(".btn_copiar");


window.onload = inicializar();
window.addEventListener('resize', inicializar);

// La letra "e" es convertida para "enter"
// La letra "i" es convertida para "imes"
// La letra "a" es convertida para "ai"
// La letra "o" es convertida para "ober"
// La letra "u" es convertida para "ufat"


function btnEncriptar() {

    const textEncriptado = encriptar(textAreaIn.value);
    textAreaOut.style.fontWeight = 'normal';
    textAreaOut.value = textEncriptado;
    textAreaIn.value = "";
    textAreaOut.style.backgroundImage = "none";
    msg_input.textContent = "Mensaje encriptado satisfactoriamente";
    btnCopiar.style.display = "inline-block";
    inicializar();
    textAreaOut.fontSize='1rem';
    
}


function encriptar(stringEncriptada){
    let matrizCodigo = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            // Sustituyo la letra que esta entrando por su correspondiente en el arreglo
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0],matrizCodigo[i][1]);
        }
            
    }
   
    return stringEncriptada;
}


function btnDesencriptar() {
    const textEncriptado = desencriptar(textAreaIn.value);
    textAreaOut.value = textEncriptado;
    textAreaIn.value = "";
    msg_input.textContent = "Mensaje desencriptado satisfactoriamente";
   
    inicializar();
    btnCopiar.style.display = "none";

}


function insertarTextoEnFila(texto, fila, tamanioFuenteRem, esNegrita) {
    const textarea = document.querySelector('.salida_texto');
    
    // Aplica el tamaño de la fuente en rem y el estilo negrita al textarea
    textarea.style.fontSize = `${tamanioFuenteRem}rem`;
    textarea.style.fontWeight = esNegrita ? 'bold' : 'normal';

    const lineas = textarea.value.split('\n');

    // Calcula el número de columnas basándote en el tamaño de la fuente (en rem) y el ancho del textarea
    const tamanioFuentePx = tamanioFuenteRem * 16; // Asumiendo que 1rem = 16px
    const columnas = Math.floor(textarea.clientWidth / (tamanioFuentePx * 0.6)) ; // Aproximadamente 0.6 veces el tamaño de la fuente

    function insertarTextoEnFila(texto, fila, tamanioFuenteRem, esNegrita) {
    const textarea = document.querySelector('.salida_texto');
    
    // Aplica el tamaño de la fuente en rem y el estilo negrita al textarea
    textarea.style.fontSize = `${tamanioFuenteRem}rem`;
    textarea.style.fontWeight = esNegrita ? 'bold' : 'normal';

    const lineas = textarea.value.split('\n');

    // Calcula el número de columnas basándote en el tamaño de la fuente (en rem) y el ancho del textarea
    const tamanioFuentePx = tamanioFuenteRem * 16; // Asumiendo que 1rem = 16px
    const columnas = Math.floor(textarea.clientWidth / (tamanioFuentePx * 0.6)) ; // Aproximadamente 0.6 veces el tamaño de la fuente

       // Divide el texto en partes de tamaño 'columnas'
    const textoDividido = [];
    for (let i = 0; i < texto.length; i += columnas) {
        textoDividido.push(texto.slice(i, i + columnas));
    }

    // Si la fila no existe, se crean líneas vacías
    while (lineas.length < fila) {
        lineas.push('');
    }

    // Inserta el texto dividido en la fila deseada
    lineas[fila - 1] = textoDividido.join('\n');
    
    // Une las líneas de nuevo en el textarea
    textarea.value = lineas.join('\n');
}
    // Divide el texto en partes de tamaño 'columnas'
    const textoDividido = [];
    for (let i = 0; i < texto.length; i += columnas) {
        textoDividido.push(texto.slice(i, i + columnas));
    }

    // Si la fila no existe, se crean líneas vacías
    while (lineas.length < fila) {
        lineas.push('');
    }

    // Inserta el texto dividido en la fila deseada
    lineas[fila - 1] = textoDividido.join('\n');
    
    // Une las líneas de nuevo en el textarea
    textarea.value = lineas.join('\n');
}




function inicializar() {
    const ancho = window.innerWidth;
    

    if (textAreaIn.value == '' && ((textAreaOut.value.trim() == 'Ningun Mensaje fue encontrado.') || (textAreaOut.value == ''))){
   
        // Reiniciar textarea y background image
        textAreaOut.value = "";
       
        let texto = " Ningun Mensaje fue encontrado.";
        let fila = 20;
        let tamanioFuenteRem = 1.2;
        let esNegrita = true;

        if (ancho <= 650) {
            texto = "Ningun Mensaje fue encontrado.";
            fila = 2;
            tamanioFuenteRem = 1;
            textAreaOut.style.backgroundImage = 'none';
        }else if( (ancho >= 650) && (ancho <= 890)) {
            texto = "                Ningun Mensaje fue encontrado.";
            fila = 2;
            tamanioFuenteRem = 1.5;
            textAreaOut.style.backgroundImage = 'none';
        }
        
        if (ancho >= 891){
            textAreaOut.style.backgroundImage = "url('imagen/muneco.png')";
        }
       
        btnCopiar.style.display = 'none';
        msg_input.textContent = "Solo letras minúsculas y sin acentos";
        insertarTextoEnFila(texto, fila, tamanioFuenteRem, esNegrita);
    }

}


function desencriptar(stringDesencriptada){
    let matrizCodigo = [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            // Sustituyo la letra que esta entrando por su correspondiente en el arreglo
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
            
    }

    return stringDesencriptada;
}


//funcion copiar
function copy() {
    let copyText = document.querySelector("#salida_texto");
    let pasteText = document.querySelector("#ingresa_texto");

    // Verificar si el navegador soporta la API del portapapeles
    if (navigator.clipboard) {
        navigator.clipboard.writeText(copyText.value)
            .then(() => {
                console.log('Texto copiado al portapapeles!');
                pasteText.value = copyText.value;
            })
            .catch(err => {
                console.error('Error al copiar al portapapeles: ', err);
            });
    } else {
        // Fallback para navegadores que no soportan la API del portapapeles
        copyText.select();
        document.execCommand("copy");
        console.log('Texto copiado al portapapeles usando execCommand');
    }
}

  

// Validacion en el textarea para que no acepte Numeros
document.addEventListener('DOMContentLoaded', function () {
    const textarea = document.getElementById('ingresa_texto');

    // Función para filtrar números en el input
    function filtrarNumeros(event) {
        textarea.value = textarea.value.replace(/[0-9]/g, '');
    }

    // Función para prevenir la entrada de números en el keypress
    function bloquearNumeros(event) {
        const keyCode = event.keyCode || event.which;
        if (keyCode >= 48 && keyCode <= 57) {
            event.preventDefault();
        }
    }

    // Asignar eventos al textarea
    textarea.addEventListener('input', filtrarNumeros);
    textarea.addEventListener('keypress', bloquearNumeros);
    

});


// Llama a la función también cuando cambie el tamaño de la ventana
window.addEventListener('resize', inicializar);




