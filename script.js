const inputList = document.getElementById('input-list');
const buttonEnvioList = document.getElementById('button-envio-list');
const countList = document.getElementById('count-list');
const msgErro = document.querySelector('.alert-erro');
const boxListLocal = document.querySelector('.box-conteudo ul');
const boxInputCheck = document.querySelector('.box-conteudo input');
const boxListDelete = document.querySelector('.box-conteudo button');
const listas = JSON.parse(localStorage.getItem("Listas:") || "[]");


buttonEnvioList.addEventListener('click', criarList);
buttonEnvioList.addEventListener('click', enviarList);
inputList.addEventListener('keyup', function(e)
{
	var enter = e.which || e.enterCode;
	if (enter == 13) 
	{
    	buttonEnvioList.click();
 	}
});

function enviarList()
{
	inputList.value = "";
	tagList();
}

function criarList()
{
	let inputValue = inputList.value;	
	if (inputValue) 
	{
		listas.push(inputValue);
		localStorage.setItem('Listas:', JSON.stringify(listas))

		inputList.classList.remove('erro');
		msgErro.classList.remove('show');
	}
	else
	{
		inputList.classList.add('erro');
		msgErro.classList.add('show');
	}
}

function tagList()
{
	document.querySelectorAll('.item-lista').forEach(lista => lista.remove())
	listas.forEach((lista, id) =>
	{
		elemento = 
		`
		<li class="item-lista">
			<input type="checkbox" id="list-${id}">
			<label for="list-${id}">${lista}</label>
			<button class="delete" onclick="deletar(${id})"><i class='bx bx-trash-alt'></i></button>
		</li>		
		`
		boxListLocal.insertAdjacentHTML("beforeend", elemento)
	})

	let numbr = listas.length;
	
	numbr < 10 ? countList.innerHTML = "0" + numbr : countList.innerHTML = numbr;
}
tagList();

function deletar(id)
{
	listas.splice(id, 1)
	tagList();
	localStorage.setItem('Listas:', JSON.stringify(listas))
}