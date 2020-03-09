

 const weatherForm = document.querySelector('form')
 const getLocation = document.getElementById('location');
 const msg1= document.getElementById('msg1');
 const msg2=document.getElementById('msg2');

 weatherForm.addEventListener('submit',(event)=>{
   event.preventDefault()
   const location = getLocation.value
   msg1.textContent = 'Loading...'
   msg2.textContent = ''
   // console.log(getLocation.value)
   fetch('/weather?address=' + location).then((response) => {
      const resData=response.json()
      console.log(resData)
      
            resData.then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})


// fetch(myRequest)
//   .then(response => response.json())
