

var bufferAvailable = []; // declaración del buffer
const BUFFER_LIMIT = 24; // límite del buffer = 24
var spaceAvailable = BUFFER_LIMIT; // declarando espacio disponible con el valor inicial establecido como límite de búfer
var itemAvailable = 0; // declarando e inicializando artículos disponibles en 0
var activity = document.getElementById("activity");
var gui = document.getElementById("gui");
var getProducerinput = document.getElementById("producer");
var getConsumerinput = document.getElementById("consumer");
var pInput,cInput;
// evento click para el boton enviar.
// obteniendo valor de inputs
document.getElementById("submit").addEventListener("click",function () {
    pInput = parseInt(getProducerinput.value); // Obteniendo valor del productor
    cInput = parseInt(getConsumerinput.value); // Obteniendo valor del consumidor
    onclk();
});

// Función para el productor
function producer() {
    var newProducerMessage = document.createElement("b");
    if (spaceAvailable >= pInput) { // Comprobar espacio disponible es mayor o igual que el productor
        for (var i = 0; i < pInput; i++) {
            bufferAvailable.push("item"); // insertando articulos en el espacio del buffer
            var newPizza = document.createElement("li");
            newPizza.className = 'col-xs-2';
            gui.appendChild(newPizza);
        }
        // Notificación
        console.log("El productor insertó " + pInput + "artículos");

        newProducerMessage.textContent= "El productor insertó " + pInput + " artículos";
        newProducerMessage.style = "color:green";
        activity.appendChild(newProducerMessage);
        activity.appendChild(document.createElement("br"));

        console.log(bufferAvailable);
        itemAvailable = bufferAvailable.length; // señalización no de artículos disponibles
        console.log(itemAvailable);
    } else { // condición para la disponibilidad de espacio
        console.log("Espacio no disponible");
        newProducerMessage.textContent = "Espacio no disponible";
        newProducerMessage.style = "color:red";
        activity.appendChild(newProducerMessage);
        activity.appendChild(document.createElement("br"));

    }
}

//Función del consumidor
function consumer() {
    var newConsumerMessage = document.createElement("b");
    setTimeout(function() { // para mantener una brecha de 1 segundo entre productor y consumidor
        if (itemAvailable >= cInput) { // verificando disponibilidad de articulos

            bufferAvailable.splice(0, cInput); // consumiendo artículos desde el buffer
            for (var i = 0; i < cInput; i++) {
                gui.removeChild(gui.lastChild);
            }
            console.log("El consumidor eliminó " + cInput + " artículos");
            newConsumerMessage.textContent= "El consumidor eliminó " + cInput + " artículos";
            newConsumerMessage.style = "color:orange";
            activity.appendChild(newConsumerMessage);
            activity.appendChild(document.createElement("br"));
            console.log(bufferAvailable);
            spaceAvailable = BUFFER_LIMIT - bufferAvailable.length; // señalización no de artículos disponibles
            console.log(spaceAvailable);
        } else {
            console.log("Artículos no disponibles");
            newConsumerMessage.textContent = "Artículos no disponibles";
            newConsumerMessage.style = "color:red";
            activity.appendChild(newConsumerMessage);
            activity.appendChild(document.createElement("br"));
        }
    }, 1000);
}
// Haga clic en el evento triggered para enviar el botón.
function onclk() {
    setInterval(producer, 2000); // inicializando la función productor al hacer click
    setInterval(consumer, 2000); // inicializando la función consumidor al hacer click
    console.log("iniciado");
}