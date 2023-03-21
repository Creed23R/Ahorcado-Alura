const $bienvenido = document.getElementById("bienvenido")
const $buttonEmpezar = document.getElementById("empezar")
const $contentGame = document.getElementById("content-game")
const $imagen = document.getElementById("img")

const $teclado1 = document.getElementById("keys1")
const $teclado2 = document.getElementById("keys2")
const $teclado3 = document.getElementById("keys3")

const $errores = document.getElementById("erroresdos")
const $letrasUtilizadas = document.getElementById("letrasUtilizadas")

const $letrasADescubrir = document.getElementById("letras-a-descubrir")

const $agregarPalabras = document.getElementById("div-agregar-palabras")
const $formAgregarPalabras = document.getElementById("form-agregar-palabras")

const $buttonAgregarPalabra = document.getElementById("button-agregar-palabras")
const $buttonVolverAJugar = document.getElementById("volver-a-iniciar")

const $input = document.getElementById("input")
const $error = document.getElementById("error")
let letrasUsadas;
let errores;
let aciertos;

const palabraInput = document.getElementById('input').value.trim(); //Obtener el valor del input y quitar los espacios en blanco al inicio y al final
const error = document.getElementById('error');




const buttons = document.querySelectorAll('input[type="button"]');

// Agregar un evento de escucha de teclado a todo el documento
document.addEventListener('keydown', (event) => {
    const keyPressed = event.key.toLowerCase();
    buttons.forEach((button) => {
        if (button.value.toLowerCase() === keyPressed) {
            button.style.background = "#141414";
            button.style.color = 'gray'; // Cambia el color de fuente
            button.style.boxShadow = 'inset -3px -3px 7px #00000073, inset 2px 2px 5px rgba(94, 104, 121, 0.288)'; // Cambia el box shadow
            button.style.width = "52px"
            button.style.height = "52px"
            button.style.margin = "13px"
            button.style.transform = 'translateY(2px)';
        }
    });
});





$buttonEmpezar.addEventListener("click", start)

function start() {
    letrasUsadas = [];
    errores = 0;
    aciertos = 0

    $bienvenido.style.display = "none"
    $contentGame.style.visibility = "visible";
    $agregarPalabras.style.display = "none"

    if (palabras.length > 0) {
        $contentGame.style.visibility = "visible";
        $contentGame.style.display = "flex"
        $agregarPalabras.style.display = "none"
    }

    $letrasUtilizadas.textContent = ""
    $errores.textContent = ""
    $letrasADescubrir.textContent = ""
    $imagen.setAttribute("src", `img/ahorcado-${errores}.png`)
    $letrasUtilizadas.value = "";

    buttons.forEach((button) => {
        button.style.background = "";
        button.style.color = '';
        button.style.boxShadow = '';
        button.style.width = "";
        button.style.height = "";
        button.style.margin = "";
        button.style.transform = '';
    });


    if (palabras.length === 0) {
        //si el array de palabras es 0 entonces tenemos que agregar más palabras para que otros puedan jugar
        $contentGame.style.display = "none"
        $agregarPalabras.style.display = "flex"
        const agregarPalabra = (palabra) => {
            //aca hago una serie de condiciones 
            if (palabra === "") {
                //si el input viene vacío no le dejo que agregue nd al array de palabras
                error.textContent = 'El campo no puede estar vacío';
            }
            else if (palabras.includes(palabra)) {
                //si el array de palabras incluye la palabra añadida le digo lo siguiente:
                error.textContent = 'La palabra ya existe en el arreglo';
                $input.value = ""
            }
            else if (!palabras.includes(palabra) && palabra !== undefined) {
                //si el array de palabras no incluye la palabra añadida le dejo añadir su palabra al nuevo array
                palabras.push(palabra)
                //reseteo los valores
                $input.value = ""
                error.textContent = 'PALABRA AGREGADA';
                //y aca lo que hago es que siempre y cuando el array sea mayor a 0 va a poder hacer click en el boton iniciar el juego
                $buttonVolverAJugar.addEventListener("click", () => {
                    if (palabras.length < 5) {
                        // mostramos mensaje de error
                        error.textContent = 'Debe agregar al menos 5 palabras para poder jugar';
                    } else {
                        // iniciamos el juego
                        error.textContent = '';
                        start();
                    }
                });
            }
        }
        const handleSubmit = (e) => {
            //aqui lo que hado es que el formulario no se envie y con eso cancelo el evento por defecto
            e.preventDefault()
            //aca ejecuto la función agregarPalabra
            agregarPalabra($input.value.toUpperCase())
        }
        //esto es cuando haga click al boton para poder agregar una nueva palabra*/
        $formAgregarPalabras.addEventListener("submit", handleSubmit)
    } else {
        //creamos un funcion para elegir la palabra al azar
        seleccionDeLaPalabra()
        //creamos una funcion para pintarlo en el DOM
        pintarPalabra()
        //aca lo que hago que cada vez que presiona una tecla va a pasar algo, para eso le paso como 2 argumento la función handleKeydown
        document.addEventListener("keydown", handleKeydown)
    }
}

const agregarLetras = (letter) => {
    //se crea un span y la agregamos a $letrasUtilizadas en el DOM
    const letterElement = document.createElement("span")
    letterElement.innerHTML = letter
    //lo añadimos al DOM
    $letrasUtilizadas.appendChild(letterElement)
    //agregamos al array de letrasUsada, la letra que viene por parametro para que ya no se pueda utilizar esa letra
    letrasUsadas.push(letter)
}

const letraIngresada = (letra) => {
    //aca la condicion se va a cumplir si es que la palabra seleccionada incluye la letra que viene por parametro
    if (palabraSeleccionada.includes(letra)) {
        //si se cumple se ejecuta la función letraCorrecta con el letra presiona que viene por parametro
        letraCorrecta(letra)
    } else {
        //si no se cumple se ejecuta la función letraIncorrecta
        letraIncorrecta()
    }
    //esto si o si se va a ejecutar 
    agregarLetras(letra)
}

const letraIncorrecta = () => {
    //aumentamos los errores
    errores++
    if (errores === 1) {
        $errores.textContent = `Llevas ${errores} intento`
    } else {
        $errores.textContent = `Llevas ${errores} intentos`
    }

    //ejecutamos la funcion cambiarImagen 
    cambiarImagen()

    //si los errores es igual a 6 errores entonces terminamos el juego
    if (errores === 6) {
        endGame();
        console.log("fin");
    }
}


const letraCorrecta = (letra) => {
    const { children } = $letrasADescubrir
    //el bucle se va a cumpler hasta que la condición sea falsa
    for (let i = 0; i < children.length; i++) {
        //comparamos si la letra del array es igual a la letra que viene por parametro
        if (children[i].innerText === letra) {
            //aca lo que hace es quitarle la clase hidden para que se muestre la letra
            children[i].classList.toggle("hidden")
            //y aumentamos los aciertos
            aciertos++
            console.log("aciertos:" + aciertos)
        }
    }
    //si los aciertos es igual a la longitud de la palabra entonces terminamos el juego
    if (aciertos === palabraSeleccionada.length) {
        endGame()
        palabras = palabras.filter(ele => ele !== palabraSeleccionada.join(""))
    }
}


const cambiarImagen = () => {
    //cambiar la imagen por cada error
    return $imagen.setAttribute("src", `img/ahorcado-${errores}.png`)
}
const handleKeydown = (e) => {
    //aca lo que hago es comvertir la tecla presiona en mayuscula
    let letraPresionada = e.key.toUpperCase()
    $letrasUtilizadas.value += letraPresionada;
    //aca la condición se va a cumplir siempre y cuando la tecla que se esta presionando sea de la A hacia la Z y tmb cuenta la Ñ, y que en letrasUsada no este la letra presionada
    if (letraPresionada.match(/^[a-z]$/i) && !letrasUsadas.includes(letraPresionada)) {
        //si pasa la condicion se va a ejecutar esta funcion con el parametro letraPresionada
        letraIngresada(letraPresionada)
    }



}

const seleccionDeLaPalabra = () => {
    const palabraRandom = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase()
    palabraSeleccionada = palabraRandom.split("")
}

const pintarPalabra = () => {
    //recorremos el array de palabraSeleccionada y por cada palabra se crea un span
    console.log(palabraSeleccionada);
    palabraSeleccionada.forEach(letra => {
        //se crea un span y la agregamos a $letrasADescubrir en el DOM
        const span = document.createElement("span")
        span.textContent = letra.toUpperCase()
        //le agregamos clases para estilizar
        span.classList.add("letra")
        span.classList.add("hidden")
        //lo añadimos al Dom
        $letrasADescubrir.appendChild(span)
    });
};



const endGame = () => {
    //eliminamos el event de keydown
    document.removeEventListener("keydown", handleKeydown)
    //si perdimos el juego por los errores
    //entonces mostramos un modal con la libreria sweetAlert
    if (errores === 6) {
        Swal.fire({
            title: '<span>Fallaste</span>',
            text: `La palabra era: ${palabraSeleccionada.join("")}`,
            icon: 'error',
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonText: "Reintentar",
            confirmButtonAriaLabel: "Reintentar",
            confirmButtonColor: '#e74c3c',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            customClass: {
                title: "span-swal",
                confirmButton: "close-swal",
                htmlContainer: "text-swal",
            }
        })
        const $reintentar = document.querySelector(".swal2-confirm")
        $reintentar.addEventListener("click", start)
    } else {
        //si ganamos el juego
        //entonces mostramos un modal con la libreria sweetAlert
        Swal.fire({
            title: '<span>Felicidades Ganaste</span>',
            text: `La palabra era: ${palabraSeleccionada.join("")}`,
            icon: 'success',
            showCloseButton: false,
            showConfirmButton: true,
            confirmButtonText: "Volver a jugar",
            confirmButtonAriaLabel: "Volver a jugar",
            confirmButtonColor: '#a5dc86',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            customClass: {
                title: "span-swal",
                confirmButton: "close-swal",
                htmlContainer: "text-swal",
            }


        })
        const $volverAJugar = document.querySelector(".swal2-confirm")
        $volverAJugar.addEventListener("click", start)
    }

}
