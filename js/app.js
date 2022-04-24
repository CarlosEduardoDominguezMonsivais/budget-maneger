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

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total += gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    methodEliminarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);
        this.calcularRestante();
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

    agregarGastoListado(gastos) {
        this.limpiarHTML(); //Meotodo para limpiar HTML
        gastos.forEach(gasto => {
            const { nombre, cantidad, id } = gasto;
            //Nueva forma de agregar atributos de tipo data en las nuevas versones de js
            //Crear un Li
            const listNewGasto = document.createElement('li');
            listNewGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            listNewGasto.dataset.id = id;

            //Agregar el HTML del gasto
            listNewGasto.innerHTML = `
                ${nombre} 
                <span class="badge badge-primary badge-pill">$ ${cantidad}</span>
            `;

            //Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times;';
            btnBorrar.addEventListener('click', () => {
                eliminarGasto(id);
            });

            listNewGasto.appendChild(btnBorrar);

            //Agregar al HTML

            gastoListado.appendChild(listNewGasto);

        })
    }

    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actulizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comprobarPresupuesto(presupuestObj) {
        const { presupuesto, restante } = presupuestObj;
        const restanteDiv = document.querySelector('.restante');
        //Comprobar si el restante es mayor o igual 25% del presupuesto
        if (restante <= (presupuesto * .25)) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');
        } //Comprobar si el restante es mayor o igual 50% del presupuesto
        else if (restante <= (presupuesto * .5)) {
            restanteDiv.classList.remove('alert-success', 'alert-danger');
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }
        //Si el total es 0 o menor
        if (restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
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
    ui.insertarPresupuesto(presupuesto);
}

//Agregar gastos
function agregarGasto(e) {
    e.preventDefault();
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    } else if (cantidad <= 0 || isNaN(cantidad)) {
        ui.imprimirAlerta('Valor no valido', 'error');
        return;
    } else {
        //Generar un objeto con el gasto con |mejoria del objeto literal|
        const objectGasto = { nombre, cantidad, id: Date.now() };

        //Añade nuevo gasto
        presupuesto.nuevoGasto(objectGasto);

        //Mensaje de successfully
        ui.imprimirAlerta('Agregado correctamente');

        //Imprimir los gastos

        const { gastos, restante } = presupuesto;
        ui.agregarGastoListado(gastos);
        ui.actulizarRestante(restante);

        //Metodo para comprobar presupuesto y cambiar su restante
        ui.comprobarPresupuesto(presupuesto);

        //Reinicia formulario
        formulario.reset();

    }
}

function eliminarGasto(id) {
    //Elimina los gastos del objeto
    presupuesto.methodEliminarGasto(id);
    //Elimina los gatos del HTML
    const { gastos, restante } = presupuesto;
    ui.agregarGastoListado(gastos);
    ui.actulizarRestante(restante);
    ui.comprobarPresupuesto(presupuesto);
}