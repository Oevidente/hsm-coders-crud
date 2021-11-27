'use strict'

const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields();
    document.getElementById('modal').classList.remove('active')
}

// const tempCurso = {
//     id: "1005",
//     titulo: "Soft Skills",
//     descricao: "Lorem ipsum dolor sit amet.",
//     imagem: "https://i.pinimg.com/originals/21/c0/40/21c0403207a38659937fe764d93d20f0.png",
//     professor: "Guilherme Junqueira",
//     aulas: "https://xpcorp.gama.academy/aluno/playlist/555/4721"
// }
const getLocalStorage = () => JSON.parse(localStorage.getItem('db_curso')) ?? [];
const setLocalStorage = (dbCurso) => localStorage.setItem('db_curso', JSON.stringify(dbCurso));

//CRUD - create read update delete
const deletarCurso = (index) => {
    const dbCurso = listaCursos();
    dbCurso.splice(index, 1);
    setLocalStorage(dbCurso);
}

const atualizarCurso = (index, curso) => {
    const dbCurso = listaCursos();
    dbCurso[index] = curso;
    setLocalStorage(dbCurso);
}

const listaCursos = () => getLocalStorage();

//CRUD - CREATE
const criarCurso = (curso) => {
    const dbCurso = getLocalStorage();
    dbCurso.push(curso);
    setLocalStorage(dbCurso);
    
}

const isValidFields = () => {
    return document.getElementById('form').reportValidity();
}

//Interação com o layout
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field');
    fields.forEach(field => field.value = '')
}

const saveCurso = () => {
    if (isValidFields()){
        const curso = {
            id: document.getElementById('id').value,
            titulo: document.getElementById('titulo').value,
            descricao: document.getElementById('descricao').value,
            imagem: document.getElementById('imagem').value,
            professor: document.getElementById('professor').value,
            aulas: document.getElementById('aulas').value
        }
        criarCurso(curso);
        updateTable();
        closeModal()
    }
}

const createRow = (curso) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
    <td>${curso.id}</td>
    <td>${curso.titulo}</td>
    <td>${curso.descricao}</td>
    <td><img src="${curso.imagem}" width="20%" alt=""></td>
    <td>${curso.professor}</td>
    <td><a href="${curso.aulas}" target="_blank">LINK AULAS</a></td>
    <td>
        <button type="button" class="button green">editar</button>
        <button type="button" class="button red">excluir</button>
    </td>
    `
    document.querySelector('#tableCurso>tbody').appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll('#tableCurso>tbody tr');
    rows.forEach(row => row.parentNode.removeChild(row));
}

const updateTable = () => {
    const dbCurso = listaCursos();
    clearTable();
    dbCurso.forEach(createRow)
}


updateTable();

// Events
document.getElementById('cadastrarCurso')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)

document.getElementById('cancelar')
    .addEventListener('click', closeModal)

document.getElementById('salvar')
    .addEventListener("click", saveCurso)