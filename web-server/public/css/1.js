



const weatherForm=document.querySelector('form')
const search = document.querySelector('input')
const messO=document.querySelector('#message-1')
const messT=document.querySelector('#message-2')

// messO.textContent='Hey from js'
// messT.textContent='LOL'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
messO.textContent='Loading...'
messT.textContent=''
 fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
           messO.textContent=data.error
        }else{
            messO.textContent='The temperature in '+data.location+' is '+data.temperature+' degrees celsius!'
        }
    })
})

})