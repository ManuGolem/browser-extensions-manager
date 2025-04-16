const botonesFiltros = document.querySelectorAll("li");
const container = document.querySelector(".container");
document.addEventListener("DOMContentLoaded", () => {
    //Traer los datos del .json
    fetch("../data.json")
        .then((response) => response.json())
        .then((data) => init(data));
});

function init(data) {
    //Agregar Eventos a los botones
    botonesFiltros.forEach((boton) => {
        boton.addEventListener("click", () => {
            boton.classList.toggle("activo");
            console.log(data);
        });
    });
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
        //Aca falta agregar los dos botones
        card.appendChild(containerDiv);
        const remove = document.createElement("button");
        remove.textContent = "Remove";
        const toggleActive = document.createElement("label");
        toggleActive.innerHTML = `
            <input id=${extension.name} type="checkbox" ${extension.isActive && "checked"}>
            <div class="toggle-switch-background" >
                <div class="toggle-switch-handle"></div>
            </div>
            `;
        toggleActive.classList.add("toggle-switch");
        toggleActive.addEventListener("change", (e) => {
            data.filter((extension) => {
                if (extension.name == e.target.id) {
                    extension.isActive = !extension.isActive;
                }
            });
        });
        const botones = document.createElement("div");
        botones.appendChild(remove);
        botones.appendChild(toggleActive);
        botones.classList.add("botones");
        card.appendChild(botones);
        container.appendChild(card);
    });
}
