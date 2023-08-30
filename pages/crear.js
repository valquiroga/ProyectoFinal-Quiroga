let elemento = document.getElementById("elemento");
let magica = document.getElementById("magica");
let poder = document.getElementById("poder");
let precio = document.getElementById("precio");

class Pocion {
    constructor(elemento, magica, poder, precio) {
        this.elemento = elemento;
        this.magica = magica;
        this.poder = poder;
        this.precio = precio;
        this.precioFinal = this.calcularPrecioFinal();
        this.poderAtaqueFinal = this.calcularPoderAtaqueFinal();
    }

    calcularPoderAtaqueFinal() {
        const poderBase = parseInt(this.poder);
        const aumentoPorFuego = this.elemento.toLowerCase() === "fuego" ? 5 : 0;
        return poderBase + aumentoPorFuego;
    }

    calcularImpuesto() {
        return this.magica.toLowerCase() === "si" ? this.precio * 0.5 : this.precio * 0.1;
    }
    
    calcularPrecioElemento() {
        return this.elemento.toLowerCase() === "aire" ? 0 : 30;
    }
    
    calcularPrecioFinal() {
        let precioElemento = this.calcularPrecioElemento();  
        let subtotal = this.precio + precioElemento;         
        let impuesto = this.calcularImpuesto();              
        return subtotal + impuesto;                          
    }
}

let form = document.getElementById("register");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let elementoValor = elemento.value;
    let magicaValor = magica.value;
    let poderValor = poder.value;
    let precioValor = precio.value;
    let pocion = new Pocion(elementoValor, magicaValor, poderValor, precioValor);

    let pocionesGuardadas = JSON.parse(localStorage.getItem("pociones")) || [];
    pocionesGuardadas.push(pocion);
    localStorage.setItem("pociones", JSON.stringify(pocionesGuardadas));

    elemento.value = "";
    magica.value = "";
    poder.value = "";
    precio.value = "";

    mostrarPociones();

    Toastify({
        text: "Poción creada",
        duration: 3000
    }).showToast();
});

let pocionesLista = document.getElementById("pocionesLista");

function mostrarPociones() {
    pocionesLista.innerHTML = "";
    let pocionesGuardadas = JSON.parse(localStorage.getItem("pociones")) || [];

    !pocionesGuardadas.length && (pocionesLista.innerHTML = "<p>Todavía no creaste pociones</p>");

    pocionesGuardadas.forEach((pocion, index) => {
        const pocionItem = document.createElement("div");
        pocionItem.classList.add("pocionItem");

        pocionItem.innerHTML = `
            <h4>Poción ${index + 1}</h4>
            <p>Elemento: ${pocion.elemento}</p>
            <p>Mágica: ${pocion.magica}</p>
            <p>Poder de Ataque: ${pocion.poderAtaqueFinal}</p>
            <p>Precio + impuestos:  $ ${Math.round(pocion.precioFinal)}</p>
            <button class="delete" onclick="eliminarPocion(${index})">Tirar</button>
        `;

        pocionesLista.appendChild(pocionItem);
    });

}

function eliminarPocion(index) {
    let pocionesGuardadas = JSON.parse(localStorage.getItem("pociones")) || [];

    Swal.fire({
        title: "¿Estás seguro de que quieres tirar esta poción?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
    }).then((result) => {
        if (result.isConfirmed) {
            pocionesGuardadas.splice(index, 1);
            localStorage.setItem("pociones", JSON.stringify(pocionesGuardadas));
            mostrarPociones();
        }
    });
}

