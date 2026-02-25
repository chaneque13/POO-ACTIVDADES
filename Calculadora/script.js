


function operacionSel(){
    const seleccion = document.getElementById("lista").value;
    const operacion = document.getElementById("operacion");
    
    if (seleccion === "calcTriangu"){
        operacion.innerHTML = '<h3>Área del Triángulo</h3>' +  
            '<label>Base:</label> <input id="base" type="number" min="0" step="any">' +
            '<br><label>Altura:</label> <input id="altura" type="number" min="0" step="any">' +
            '<br><button onclick="calcularTriangulo()">Calcular</button>' +
            '<button onclick="limpiarCampos()">Limpiar</button>' +
            '<p id="resultado"></p>';
    } else if (seleccion === "voluEsf"){
        operacion.innerHTML = '<h3>Volumen de la Esfera</h3>' +
            '<label>Radio:</label> <input id="radio" type="number" min="0" step="any">' +
            '<br><button onclick="calcularEsfera()">Calcular</button>' +
            '<button onclick="limpiarCampos()">Limpiar</button>' +
            '<p id="resultado"></p>';
    } else if (seleccion === "convDivi"){
        operacion.innerHTML = '<h3>Conversión Pesos a Dólares</h3>' +
            '<label>Pesos (MX):</label> <input id="pesos" type="number" min="0" step="any">' +
            '<br><button onclick="calcularConversion()">Calcular</button>' +
            '<button onclick="limpiarCampos()">Limpiar</button>' +
            '<p id="resultado"></p>';
    }
}

// Funciones de cálculo
function calcularTriangulo() {
    let base = document.getElementById("base").value;
    let altura = document.getElementById("altura").value;
    
    if(validarCampos(base, altura)){
        let area = (base * altura) / 2;
        let resultadoTexto = `Área: ${area.toFixed(2)}`;
        document.getElementById("resultado").innerHTML = resultadoTexto;
        guardarEnStorage("Triángulo", `Base: ${base}, Altura: ${altura}`, resultadoTexto);
    }
}

function calcularEsfera() {
    let radio = document.getElementById("radio").value;
    
    if(validarCampos(radio)){
        let volumen = (4/3) * Math.PI * Math.pow(radio, 3);
        let resultadoTexto = `Volumen: ${volumen.toFixed(2)}`;
        document.getElementById("resultado").innerHTML = resultadoTexto;
        guardarEnStorage("Esfera", `Radio: ${radio}`, resultadoTexto);
    }
}

function calcularConversion() {
    let pesos = document.getElementById("pesos").value;
    let tasaCambio = 17.17;
    
    if(validarCampos(pesos)){
        let dolares = pesos / tasaCambio;
        let resultadoTexto = `USD $${dolares.toFixed(2)}`;
        document.getElementById("resultado").innerHTML = resultadoTexto;
        guardarEnStorage("Conversión", `Pesos: $${pesos} mx`, resultadoTexto);
    }
}

// Validar campos
function validarCampos(...valores) {
    for(let valor of valores) {
        if(valor === "" || isNaN(valor) || Number(valor) < 0) {
            document.getElementById("resultado").innerHTML = 
                "Error: Ingresa valores numéricos válidos (no negativos)";
            return false;
        }
    }
    return true;
}

function limpiarCampos() {
    let inputs = document.querySelectorAll("#operacion input");
    inputs.forEach(input => input.value = "");
    document.getElementById("resultado").innerHTML = "";
}
function guardarEnStorage(tipo, datos, resultado) {
    let ultimoCalculo = {
        tipo: tipo,
        datos: datos,
        resultado: resultado,
        fecha: new Date().toLocaleString()
    };

    localStorage.setItem("ultimoCalculo", JSON.stringify(ultimoCalculo));
}

function mostrarUltimoCalculo() {
    let ultimo = localStorage.getItem("ultimoCalculo");
    if(ultimo) {
     
        ultimo = JSON.parse(ultimo);
        

        if(document.getElementById("ultimo-calculo")) {
            document.getElementById("ultimo-calculo").remove();
        }
        
        let infoDiv = document.createElement("div");
        infoDiv.id = "ultimo-calculo";
        infoDiv.innerHTML = `
            <h3>Último cálculo:</h3>
            <p><strong>Tipo:</strong> ${ultimo.tipo}</p>
            <p><strong>Datos:</strong> ${ultimo.datos}</p>
            <p><strong>Resultado:</strong> ${ultimo.resultado}</p>
            <p><strong>Fecha:</strong> ${ultimo.fecha}</p>
        `;
        
  
        let select = document.getElementById("lista");
        select.insertAdjacentElement('afterend', infoDiv);
    }
}

function borrarHistorial() {
    localStorage.removeItem("ultimoCalculo");
    let ultimoDiv = document.getElementById("ultimo-calculo");
    if(ultimoDiv) {
        ultimoDiv.remove();
    }
    alert("Historial borrado");
}

window.onload = function() {
    mostrarUltimoCalculo();
};