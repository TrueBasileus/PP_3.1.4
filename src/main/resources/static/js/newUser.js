const form = document.forms['new-user-form']
const selectRoles = document.getElementById('select-roles')

fillRoles()
newUser()

function fillRoles() {
    fetch('http://localhost:8080/api/admin/getRoles')
        .then(res => res.json())
        .then(roles => {
            let options = ''
            for(let role of roles) {
                options += `<option value="${role.id}">
                ${role.name}
                </option>
                `
            }
            selectRoles.innerHTML = options
        })
}

async function newUser() {
    await form.addEventListener('submit', async function(ev) {
        ev.preventDefault()

        let rolesForJava = []

        for (let i = 0; i < form.roles.options.length; i++) {
            if (form.roles.options[i].selected) {
                rolesForJava.push({
                    id: form.roles.options[i].value,
                    role: 'ROLE_' + form.roles.options[i].text
                })
            }
        }

        let response = await fetch('http://localhost:8080/api/admin/new', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name: document.getElementById("name").value,
                surname: document.getElementById("surname").value,
                age: document.getElementById("age").value,
                email: document.getElementById("email").value,
                password: document.getElementById("password").value,
                roles: rolesForJava
            })
        })

        form.reset()
        if (response.ok) {
            showUsers()
            document.getElementById('users-tab').click()
        } else {
            let err = await response.json()
            alert(err['message'])

        }
    })
}