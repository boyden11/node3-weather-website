const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.getElementById('message-1')
const message2 = document.getElementById('message-2')

//Add Event Listener
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    message1.textContent = 'Loading...'
    message2.textContent = ''
    
    const location = search.value
    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if (data.error){
            message1.textContent = data.error
            message2.textContent = ""

        } else {
            message1.textContent = data.location
            message2.textContent = data.forecast

        }
    })
})
})