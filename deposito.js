document.addEventListener('DOMContentLoaded', () => {
    const btnTraerPociones = document.querySelector('#btnTraerPociones');
    btnTraerPociones.addEventListener('click', () => {
        const lista = document.querySelector('#deposito');
        
        fetch('/data.json')
            .then((res) => res.json())
            .then((data) => {
                lista.innerHTML = ''; 
                
                data.forEach((pocionDeposito, index) => { 
                    const pocionItemDeposito = document.createElement('div');
                    
                    pocionItemDeposito.classList.add("pocionItem");
                    
                    pocionItemDeposito.innerHTML = `
                    
                    <h4>Poción del depósito ${index + 1}</h4>
                        <p>Elemento: ${pocionDeposito.elemento}<p>
                        <p>Mágica: ${pocionDeposito.magica}<p>
                        <p>Poder de ataque: ${pocionDeposito.poder}</p>
                        <p>Precio + impuestos: ${pocionDeposito.precio}</p>
                    `;
                    lista.append(pocionItemDeposito);
                });
            });
    });
});