const updateForm = document.forms['update-form']
const updateSelectRoles = document.getElementById('update-roles')


updateUser()
async function updateModal(id) {
    const modalUpdate = new bootstrap.Modal(document.querySelector('#modal-update'))
    let user = await getUsetById(id)
    loadRolesForUpdate(user.roles)
    await fillModal(updateForm, modalUpdate, id)
}

async function updateUser() {
    updateForm.addEventListener("submit", async function(ev){
        let rolesForJava =[]

        for (let i = 0; i < updateForm.roles.options.length; i++) {
            if (updateForm.roles.options[i].selected) {
                rolesForJava.push({
                    id: updateForm.roles.options[i].value,
                    role: 'ROLE_' + updateForm.roles.options[i].text
                })
            }
        }

        ev.preventDefault()
        let response = await fetch('http://localhost:8080/api/admin/update/', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                id: updateForm.id.value,
                name: updateForm.name.value,
                surname: updateForm.surname.value,
                age: updateForm.age.value,
                email: updateForm.email.value,
                password: document.getElementById("password1").value,
                roles: rolesForJava
            })
        })

        if (response.ok) {
            document.getElementById('update-close').click()
            showUsers()
        } else {
            let err = await response.json()
            alert(err['message'])
        }
    })
}

function loadRolesForUpdate(userRoles) {
    let selectDelete = document.getElementById("update-roles");
    selectDelete.innerHTML = "";
    console.log(userRoles)
    fetch("http://localhost:8080/api/admin/getRoles")
        .then(res => res.json())
        .then(data => {
            dataSelect = ''
                for (let role of data) {
                    let selected = false
                    for (let userRole of userRoles) {
                        if (userRole.name === role.name) {
                            selected = true
                            break
                        }
                    }
                    dataSelect += `<option th:selected="${selected}" value="${role.id}">${role.name} </option> `
                }
                selectDelete.innerHTML = dataSelect
            })
        .catch(error => console.error(error));
}
