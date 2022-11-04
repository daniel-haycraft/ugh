const container = document.querySelector('#container')
const form = document.getElementById('var')

const baseUrl = `/api/buddies/`

const budsCb = ({ data: buddies }) => displayBuddies(buddies)
const errCb = err => console.log(err)

const getBuds = () => axios.get(baseUrl).then(budsCb).catch(errCb)
const deleteBud = index => axios.delete(`${baseUrl}${index}`).then(budsCb).catch(errCb)
const createNew = body => axios.post(baseUrl, body).then(budsCb).catch(errCb)


function submitHandler(e){
    e.preventDefault()

    let dogName = document.querySelector('#name')
    console.log(dogName.value)
    let bodyObj = { 
        dogName: dogName.value
    }
    createNew(bodyObj)
    dogName.value = ''
    
}
function createDog(puppy){
    
    const newDiv = document.createElement('div')
    newDiv.classList.add('puppy-town')
    
    newDiv.innerHTML = `<p class="name">${puppy.dogName}</p>
 <button onclick="deleteBud(${ puppy.index })"> delete </button>`


    container.appendChild(newDiv)
}

function displayBuddies(arr){
    container.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createDog(arr[i])
    }
}
form.addEventListener('submit', submitHandler)
getBuds()