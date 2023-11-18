const URL = 'http://localhost:8080/api/user/showuser'
const tableUser = document.getElementById('tableUser')
const navBar = document.getElementById('navbar')


function getUser() {
    let cuser = fetch(URL)
        .then(res => res.json())
    cuser.then(user => {
            let dataOfUser = ''
            let navbarContent =''
            let rolesOnStringFormat = rolesToString(user.roles)

            navbarContent += `
                <b> ${user.email} </b> with roles ${rolesOnStringFormat}
            `


            dataOfUser += `<tr> 
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.surname}</td>
                <td>${user.email}</td>
                <td>${user.age}</td>
                <td>${rolesOnStringFormat}</td>
                </tr>`

            tableUser.innerHTML = dataOfUser
            navBar.innerHTML = navbarContent
            console.log(user)
        })
}

getUser()

function rolesToString(roles) {
    let rolesString =''
    for (let role of roles) {
        rolesString += (role.name.toString().replace('ROLE_', '') + ', ');
    }
    rolesString = rolesString.substring(0, rolesString.length - 2);
    return rolesString;
}