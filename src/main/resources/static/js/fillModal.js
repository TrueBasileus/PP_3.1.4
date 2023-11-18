async function getUsetById(id) {
    let res = await fetch("http://localhost:8080/api/admin/users/"+ id)
    return await res.json()
}


async function fillModal(form, modal, id) {
    modal.show()
    let user = await getUsetById(id)
    form.id.value = user.id
    form.name.value = user.name
    form.surname.value = user.surname
    form.age.value = user.age
    form.email.value = user.email
    form.password.value = user.password
    form.roles.value = user.roles
}

