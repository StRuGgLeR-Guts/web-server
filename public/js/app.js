

const form=document.querySelector("form")
const input=document.querySelector('input')


const mes1=document.querySelector('#msg-1')
const mes2 = document.querySelector('#msg-2')





form.addEventListener('submit',(e)=>{
    e.preventDefault()
    mes1.textContent="Loading......"
    mes2.textContent=""

    const Location=input.value

    fetch("http://localhost:3000/weather?address="+Location).then((res)=>{
        res.json().then((data)=>{
            if(data.err){
                return mes1.textContent=(data.err)
            }
            else{
                
                mes1.textContent=  data.address,
                mes2.textContent= data.Data
    
                
            }
        })
    })

})