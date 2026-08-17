const cuerpoTabla = document.getElementById("tablaValores");

const tituloResultado =
    document.getElementById("tituloResultado");

const valoresIniciales = [

    {
        p: true,
        q: true
    },

    {
        p: true,
        q: false
    },

    {
        p: false,
        q: true
    },

    {
        p: false,
        q: false
    }

];


function obtenerOperador() {

    const seleccionado =
        document.querySelector(
            'input[name="operador"]:checked'
        );

    return seleccionado.value;
}


function calcular(p, q, operador) {

    switch (operador) {

        case "AND":
            return p && q;

        case "OR":
            return p || q;

        case "IMPLICA":
            return !p || q;

        case "BICOND":
            return p === q;

        default:
            return false;
    }
}


function obtenerNombreOperador(operador) {
    const MapeoSimbolos = {
        "AND": "∧",
        "OR": "∨",
        "IMPLICA": "→",
        "BICOND": "↔"
    };
    return MapeoSimbolos[operador] || "∧";
}


function crearSelect(valorInicial) {

    const select =
        document.createElement("select");


    const opcionVerdadero =
        document.createElement("option");

    opcionVerdadero.value = "true";
    opcionVerdadero.textContent = "Verdadero";


    const opcionFalso =
        document.createElement("option");

    opcionFalso.value = "false";
    opcionFalso.textContent = "Falso";


    select.appendChild(opcionVerdadero);
    select.appendChild(opcionFalso);


    select.value =
        valorInicial ? "true" : "false";


    return select;
}


function generarTabla() {

    cuerpoTabla.innerHTML = "";

    const operador =
        obtenerOperador();


    tituloResultado.textContent = `Resultado (p ${obtenerNombreOperador(operador)} q)`;


    valoresIniciales.forEach((fila) => {

        const tr =
            document.createElement("tr");


        const tdP =
            document.createElement("td");

        const tdQ =
            document.createElement("td");

        const tdResultado =
            document.createElement("td");


        const selectP =
            crearSelect(fila.p);

        const selectQ =
            crearSelect(fila.q);


        tdP.appendChild(selectP);
        tdQ.appendChild(selectQ);


        tdResultado.classList.add(
            "resultado"
        );


        function actualizarResultado() {

            const p =
                selectP.value === "true";

            const q =
                selectQ.value === "true";

            const operadorActual =
                obtenerOperador();


            const resultado =
                calcular(
                    p,
                    q,
                    operadorActual
                );


            tdResultado.textContent =
                resultado
                    ? "Verdadero"
                    : "Falso";
        }


        selectP.addEventListener(
            "change",
            actualizarResultado
        );


        selectQ.addEventListener(
            "change",
            actualizarResultado
        );


        actualizarResultado();


        tr.appendChild(tdP);
        tr.appendChild(tdQ);
        tr.appendChild(tdResultado);

        cuerpoTabla.appendChild(tr);

    });

}

const operadoresRadios = document.querySelectorAll('input[name="operador"]');
operadoresRadios.forEach(radio => {
    radio.addEventListener('change', generarTabla);
});


generarTabla();