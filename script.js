const url = "https://dummyapi.io/data/v1/user";

function getData() {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: "GET",
            headers: {
                "app-id": "617548e4bfe8614742176239",
            }
        })
            .then(response => {
                return response.json();
            }).then(data => {
                let users = data.data;
                resolve(users);
            })
    })
}

getData().then(data => {
    const usersTable = document.querySelector('#tabela')
    data.forEach(data => {
        //console.log(data)
        const dataRow = document.createElement('tr')
        const dataTd = document.createElement('td')
        const dataButtonTd = document.createElement('td')
        const dataButton = document.createElement('button')
        const dataImageTag = document.createElement('img')
        dataTd.innerHTML = `${data.title}.<strong>${data.firstName} ${data.lastName}</strong>`
        dataImageTag.src = `${data.picture}`
        dataButton.innerHTML = `see more more about ${data.firstName}`
        dataButton.onclick = () => {getinfo(data.id) }
        dataButtonTd.append(dataButton)
        dataRow.append(dataImageTag, dataTd, dataButtonTd)
        usersTable.append(dataRow)
    });
})

function getinfo(id) {
    fetch(`${url}/${id}`, {
        method: "GET",
        headers: {
            "app-id": "617548e4bfe8614742176239",
        }
    })
        .then(response => {
            return response.json();
        }).then(data => {

            const divPodatoci = document.createElement('div')
            divPodatoci.classList.add('fullInfo')
            const div = document.getElementById('info')
            for (const property in data) {
                if (property == 'picture') {
                    const img = document.createElement('img')
                    img.src = `${data[property]}`
                    img.style.width = "150px"
                    img.style.height = "150px"
                    divPodatoci.append(img)
                    
                }
                else if (property === 'location') {
                    for(const property in data.location){
                    const label = document.createElement('label')
                    label.innerHTML = `${property}: <strong>${data.location[property]}</strong>`
                    label.style.border = "1px solid silver"
                    label.style.padding = "20px"
                    label.style.fontSize = '1.3em'
                    divPodatoci.append(label)
                }
                } else {
                    const tabela = document.querySelector('#tabela')
                    const label = document.createElement('label')
                    label.innerHTML = `${property} : <strong> ${data[property]} </strong>`
                    label.style.border = "1px solid silver"
                    label.style.padding = "20px"
                    label.style.fontSize = '1.5em'
                    tabela.style.display = "none"
                    divPodatoci.append(label)
                    div.append(divPodatoci)
                    div.style.display = 'block'
                }
           
        }
        })
        }

function  goBack() {
    const infoDiv = document.getElementById('info')
    const podatociZaUser = document.getElementsByClassName('fullInfo')
    const form = document.getElementById('formDiv')
    for(var i=0; i < podatociZaUser.length; i++){
        podatociZaUser[i].remove()
    }
    const tabela = document.getElementById('tabela')
    tabela.style.display = ""
    infoDiv.style.display = 'none'
    form.style.display = 'none'
}


function goToForm() {
    const div = document.getElementById('info')
    const formDiv = document.getElementById('formDiv')

    div.style.display = "none"
    formDiv.style.display = "flex"
}

const myForm = document.getElementById('create-user')


myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(myForm)

    const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);
    debugger;
    fetch(`${url}/create`, {
        method: 'post',
        body: formDataJsonString,
        headers: {
            'Content-Type': 'application/json',
            "app-id": "6177f33db8cc794cc80f72a5",
        }
    }).then(response =>{
         return response.json()
    }).then(text => {
        console.log(text)
    }).catch(err => {
        console.log(err)
    })
})
