const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#boton-enter');

let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

// Función para renderizar tareas
function renderizarTareas() {
    lista.innerHTML = '';
    tareas.forEach((tarea, i) => {
        const elemento = `
            <li class="elemento">
                <i class="far ${tarea.realizada ? 'fa-check-circle realizado' : 'fa-circle co'}" data="realizado" data-indice="${i}"></i>
                <p class="text ${tarea.realizada ? 'tachado' : ''}">${tarea.texto}</p>
                <i class="fas fa-trash de" data="eliminado" data-indice="${i}"></i>
            </li>
        `;
        lista.insertAdjacentHTML("beforeend", elemento);
    });
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Función para agregar tarea
function agregarTarea(texto) {
    if (!texto) return;
    tareas.push({ texto, realizada: false });
    renderizarTareas();
}

// Evento click en el botón
botonEnter.addEventListener('click', () => {
    const tarea = input.value.trim();
    if (tarea) {
        agregarTarea(tarea);
        input.value = '';
    }
});

// Evento Enter en el input
input.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const tarea = input.value.trim();
        if (tarea) {
            agregarTarea(tarea);
            input.value = '';
        }
    }
});

// Marcar como realizada o eliminar tarea
lista.addEventListener('click', (e) => {
    const indice = e.target.getAttribute('data-indice');
    if (e.target.classList.contains('co') || e.target.classList.contains('realizado')) {
        tareas[indice].realizada = !tareas[indice].realizada;
        renderizarTareas();
    }
    if (e.target.classList.contains('de')) {
        tareas.splice(indice, 1);
        renderizarTareas();
    }
});

function mostrarFecha() {
    const opciones = { weekday: 'long', month: 'short', day: 'numeric' };
    fecha.innerHTML = new Date().toLocaleDateString('es-ES', opciones);
}

mostrarFecha(); // Mostrar la fecha al cargar

// Actualizar la fecha cada minuto (por si cambia el día)
setInterval(mostrarFecha, 60000);

// Renderizar tareas al cargar
renderizarTareas();