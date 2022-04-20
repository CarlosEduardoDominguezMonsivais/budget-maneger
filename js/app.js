'use strict';

//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

//Eventos

addEventListener();

function addEventListener() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto)
}

//Clases

class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
}

let presupuesto; // Iniciar una variable global fuera de funciones

class UI {
    insertarPresupuesto(cantidad) {
        //Extrayendo valor
        const { presupuesto, restante } = cantidad;
        //Agragado al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        const mensajeText = document.createElement('div');
        mensajeText.classList.add('text-center', 'alert');
        if (tipo === 'error') {
            mensajeText.classList.add('alert-danger');
        } else {
            mensajeText.classList.add('alert-success');
        }
        //Mensaje de alerta
        mensajeText.textContent = mensaje;

        //Insertar el mensaje de alerta en el HTML
        document.querySelector('.primario').insertBefore(mensajeText, formulario);

        setTimeout(() => {
            mensajeText.remove();
        }, 2000);
    }
}

const ui = new UI();

//Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario); // Instanciar clase con la variable global
    console.log(presupuesto);
    ui.insertarPresupuesto(presupuesto);
}

//Agregar gastos
function agregarGasto(e) {
    e.preventDefault();
    const inputGasto = document.querySelector('#gasto').value;
    const inputCantidad = document.querySelector('#cantidad').value;
    console.log(inputGasto);
    if (inputGasto === '' || inputCantidad === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    } else if (inputCantidad <= 0 || isNaN(inputCantidad)) {
        ui.imprimirAlerta('Valor no valido', 'error');
        return;
    } else {
        ui.imprimirAlerta('Agregado', 'correcto');

        //Generar un objeto con el gasto con |mejoria del objeto literal|
        const objectGasto = { inputGasto, inputCantidad };
        console.log(objectGasto);

    }

}