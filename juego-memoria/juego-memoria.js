
let secuencia = [];
let sumaCorrecta = 0;
let indice = 0 ;
let intervalo;
let timeoutRespuesta;
let intervaloCuenta;

const botonIniciar = document.getElementById("botonIniciar");
const botonVerificar = document.getElementById("botonVerificar");

botonIniciar.addEventListener("click", iniciarJuego);
botonVerificar.addEventListener("click", verificar);

function generarNumero(permitirNegativos){
    let num = Math.floor(Math.random() * 20) + 1;
    if (permitirNegativos && Math.random() < 0.5){
        num *= -1;
    }
    return num;
}

function iniciarJuego(){

    clearInterval(intervalo); //para que no se acumulen

    const cantidad = parseInt(document.getElementById("cantidad").value);
    const tiempo = parseInt(document.getElementById("tiempo").value) * 1000;
    const negativos = document.getElementById("negativos").checked;

    secuencia = [];
    sumaCorrecta = 0;
    indice = 0;

    // generar secuencia
    for (let i = 0; i < cantidad; i++) {
        let num;

        do {
            num = generarNumero(negativos);
        } while (secuencia.includes(num)); //repite si ya existe el número

        secuencia.push(num);
        sumaCorrecta += num;
    }
    //para ver la secuencia de números por la consola
    console.log(secuencia);

    if (sumaCorrecta < 0){
        iniciarJuego();
        return;
    }

    const numeroDiv = document.getElementById("numero");

    document.getElementById("resultado").textContent = "";
    numeroDiv.textContent = "Preparado...";
    document.getElementById("respuesta").value = "";

    //esperar 1 segundo antes de empezar
    setTimeout(() => {

        intervalo = setInterval(() => {
            if (indice < secuencia.length){
                numeroDiv.textContent = secuencia[indice];
                indice++;
            } else {
                clearInterval(intervalo); // importante
                numeroDiv.textContent = "?";

                const resultado = document.getElementById("resultado");
                let segundos = 10;

                // mensaje inicial
                resultado.textContent = `Tienes ${segundos} segundos para responder...`;
                resultado.className = "";

                // contador visual
                intervaloCuenta = setInterval(() => {
                    segundos--;
                    if (segundos > 0) {
                        resultado.textContent = `Tienes ${segundos} segundos para responder...`;
                    } else {
                        clearInterval(intervaloCuenta);
                    }
                }, 1000);

                // tiempo límite
                timeoutRespuesta = setTimeout(() => {
                    verificar();
                }, 10000);
            }
        }, tiempo);

    }, 1000);
}
function verificar(){
    clearTimeout(timeoutRespuesta);
    clearInterval(intervaloCuenta);

    const respuestaUsuario = parseInt(document.getElementById("respuesta").value);
    const resultado = document.getElementById("resultado");
    const input = document.getElementById("respuesta");  

    if (respuestaUsuario === sumaCorrecta){
        resultado.textContent = "¡Correcto! Resultado: "+ sumaCorrecta;
        resultado.className = "correcto";

        lanzarConfetti(); // el confetti
    } else {
        resultado.textContent = "Resultado: " + sumaCorrecta + " Has perdido!";
        resultado.className = "incorrecto";

        //animación
        resultado.classList.remove("shake");
        void resultado.offsetWidth; // reinicia animación
        resultado.classList.add("shake");

        //Shake en el input
        input.classList.remove("shake");
        void input.offsetWidth;
        input.classList.add("shake");
    }
}

function lanzarConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        // posición horizontal aleatoria
        confetti.style.left = Math.random() * window.innerWidth + "px";

        // colores aleatorios
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

        document.body.appendChild(confetti);

        // eliminar después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 1000);
    }
}