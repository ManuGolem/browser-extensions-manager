const botonesFiltros = document.querySelectorAll("li");
const container = document.querySelector(".container");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
let datos;
let idActivo;
let darkMode = true;
document.addEventListener("DOMContentLoaded", () => {
    fetch("../data.json")
        .then((response) => response.json())
        .then((data) => init(data));
});

function init(data) {
    datos = data;
    botonesFiltros.forEach((boton) => {
        boton.addEventListener("click", () => {
            botonesFiltros.forEach((b) => b.classList.remove("activo"));
            boton.classList.toggle("activo");
            const dataCopia = filtrar(datos, boton.id);
            mostrarData(dataCopia);
        });
    });
    sun.addEventListener("click", () => {
        cambiarModo();
        moon.style.display = "block";
        sun.style.display = "none";
    });
    moon.addEventListener("click", () => {
        cambiarModo();
        sun.style.display = "block";
        moon.style.display = "none";
    });
    mostrarData(datos);
}
function filtrar(data, id) {
    let dataReturn = [];
    if (id === "active") {
        data.forEach((extension) => {
            extension.isActive && dataReturn.push(extension);
        });
    } else if (id === "inactive") {
        data.forEach((extension) => {
            !extension.isActive && dataReturn.push(extension);
        });
    } else {
        dataReturn = data;
    }
    idActivo = id;
    return dataReturn;
}
function mostrarData(data) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    data.forEach((extension) => {
        const card = document.createElement("div");
        card.classList.add("card");
        const titulo = document.createElement("h1");
        titulo.textContent = extension.name;
        const logo = document.createElement("img");
        logo.src = extension.logo;
        const descripcion = document.createElement("p");
        descripcion.textContent = extension.description;
        const containerDiv = document.createElement("div");
        containerDiv.classList.add("divContainer");
        containerDiv.appendChild(logo);
        const divIntermedio = document.createElement("div");
        divIntermedio.appendChild(titulo);
        divIntermedio.appendChild(descripcion);
        containerDiv.appendChild(divIntermedio);
        card.appendChild(containerDiv);
        const remove = document.createElement("button");
        remove.id = extension.logo;
        remove.textContent = "Remove";
        remove.classList.add("remove");
        remove.addEventListener("click", (e) => {
            datos = data.filter((extension) => extension.logo !== e.target.id);
            //Esto es para actualizar la vista porque se queda renderizando lo viejo
            mostrarData(datos);
        });
        const toggleActive = document.createElement("label");
        toggleActive.innerHTML = `
            <input id=${extension.logo} type="checkbox" ${extension.isActive && "checked"}>
            <div class="toggle-switch-background" >
                <div class="toggle-switch-handle"></div>
            </div>
            `;
        toggleActive.classList.add("toggle-switch");
        toggleActive.addEventListener("change", (e) => {
            datos.forEach((extension) => {
                if (extension.logo == e.target.id) {
                    extension.isActive = !extension.isActive;
                }
            });
            //Esto es para actualizar la vista porque se queda renderizando lo viejo
            mostrarData(filtrar(datos, idActivo));
        });
        const botones = document.createElement("div");
        botones.appendChild(remove);
        botones.appendChild(toggleActive);
        botones.classList.add("botones");
        card.appendChild(botones);
        container.appendChild(card);
    });
}
function cambiarModo() {
    darkMode = !darkMode;
    console.log(darkMode ? "Dark" : "Light");
}
