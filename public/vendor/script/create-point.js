function populateUFs() {
    const ufselect = document.querySelector("select[name=uf]");

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            for (const state of states) {
                ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }



        })
}


populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");


    const ufValue = (event.target.value);

    const IndexOfSelectedState = event.target.selectedIndex;

    stateInput.value = event.target.options[IndexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            

            for (const city of cities) {
                // cityselect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens de Coleta

const itensToCollect = document.querySelectorAll(".items-grid li")

for (const item  of itensToCollect) {
    item.addEventListener("click", handleSelectedItem)
}


const collectItems = document.querySelector("input[name=items]");
let selectedItems = []



function handleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id

   // verificar se existem itens ou não
   const alreadySelected = selectedItems.findIndex( item => {
    const itemFound = item == itemId
    return itemFound
})



   //Se tiver selecionado tirar da seleção
   if (alreadySelected >= 0){
    //removendo item do array
    const filteredItems = selectedItems.filter( item=> {
        const itemsDifferent = item != itemId
        return itemsDifferent;

        

    })

    selectedItems = filteredItems
} else {
    selectedItems.push(itemId)
}

collectItems.value = selectedItems




   

   // se não estiver selecionado, adicionar a seleção


}