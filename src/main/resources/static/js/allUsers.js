const usersTable = document.getElementById('all-users-table')


function showUsers() {
    fetch('http://localhost:8080/api/admin')
        .then(res => res.json())
        .then(users => {
            let dataAllUsers = ''

            // navbarContent += `
            //     <b> ${user.email} </b> with roles ${rolesOnStringFormat}
            // `

            for(let user of users) {
                let stringRoles = rolesToString(user.roles)

                dataAllUsers += `<tr>
           <td class="with-border">${user.id}</td>
             <td class="with-border">${user.name}</td>
             <td class="with-border">${user.surname}</td>
             <td class="with-border">${user.email}</td>
             <td class="with-border">${user.age}</td>
             <td class="with-border">${stringRoles}</td>
             <td>
                <button type="submit" class="btn btn-info" data-toggle="modal" data-target="'#modal-update'" onclick="updateModal(${user.id})"> update</button>
             </td>
             <td>
                <button type="submit" class="btn btn-danger" data-toggle="modal" data-target="'#modal-delete'" onclick="deleteModal(${user.id})"> delete </button>
             </td>`
            }

            usersTable.innerHTML = dataAllUsers
        })
}

showUsers()
function rolesToString(roles) {
    let rolesString =''
    for (let role of roles) {
        rolesString += (role.name.toString().replace('ROLE_', '') + ', ');
    }
    rolesString = rolesString.substring(0, rolesString.length - 2);
    return rolesString;
}