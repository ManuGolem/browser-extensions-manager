const botonesFiltros = document.querySelectorAll("li");
const container = document.querySelector(".container");
let datos;
let idActivo;
document.addEventListener("DOMContentLoaded", () => {
    //Traer los datos del .json
    fetch("../data.json")
        .then((response) => response.json())
        .then((data) => init(data));
});

function init(data) {
    datos = data;
    //Agregar Eventos a los botones
    botonesFiltros.forEach((boton) => {
        boton.addEventListener("click", () => {
            botonesFiltros.forEach((b) => b.classList.remove("activo"));
            boton.classList.toggle("activo");
            const dataCopia = filtrar(datos, boton.id);
            mostrarData(dataCopia);
        });
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
