const deleteForm = document.forms['delete-form']
const deleteSelectRoles = document.getElementById('delete-roles')


deleteUser()
async function deleteModal(id) {
    const modalDelete = new bootstrap.Modal(document.querySelector('#deleteModal'))
    loadRolesForDelete()
    await fillModal(deleteForm, modalDelete, id)
}

function deleteUser() {
    deleteForm.addEventListener("submit", ev => {
        ev.preventDefault()
        fetch('http://localhost:8080/api/admin/delete/' + deleteForm.id.value, {
            method: "DELETE"
        }).then(() => {
            document.getElementById('deleteClose').click()
            showUsers()
        })
    })
}


function loadRolesForDelete() {
    let selectDelete = document.getElementById("delete-roles");
    selectDelete.innerHTML = "";

    fetch("http://localhost:8080/api/admin/getRoles")
        .then(res => res.json())
        .then(data => {
            data.forEach(role => {
                let option = document.createElement("option");
                option.value = role.id;
                option.text = role.name.toString().replace('ROLE_', '');
                selectDelete.appendChild(option);
            });
        })
        .catch(error => console.error(error));
}

// window.addEventListener("load", loadRolesForDelete);