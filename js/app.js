'use strict';

//Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

//Eventos

addEventListener();
function addEventListener() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
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
    insertarPresupuesto(cantidad){
        //Extrayendo valor
        const {presupuesto, restante} = cantidad;
        //Agragado al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }
}

const ui = new UI();

//Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tu presupuesto?');
    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();
    }
    presupuesto = new Presupuesto(presupuestoUsuario); // Instanciar clase con la variable global
    console.log(presupuesto);
    ui.insertarPresupuesto(presupuesto);
}