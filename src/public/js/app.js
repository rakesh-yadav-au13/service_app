// let addToCart = document.querySelectorAll('.add-to-cart');


    
// function updateCart(data) {
//     axios.post('/profile', data)
//         .then(res => {
//             if(res.data.error){
//                 toastr.options = {
//                     "positionClass": "toast-top-right",
//                     "showDuration": "0",
//                     "hideDuration": "0",
//                     "timeOut": "1000",
//                     "extendedTimeOut": "0",
//                 }
//                 toastr.error(res.data.error)
            
//             }else if(res.data.id){
//                 axios.get(`/profile/${res.data.id}`)
//                     .then(data => {
//                         console.log(data.data)
//                         res.render('customer/profile',{
//                             data:data.data
//                         })
//                     })
//             }
//         })
// };



// addToCart.forEach((item) => {
//     item.addEventListener('click', (e) => {
//         let data = { id: item.dataset.data };
//         updateCart(data)
//     })
// });

const altmsg = document.querySelector('#error-alert');

if(altmsg){
    setTimeout(()=> {
        altmsg.remove()
    },2000)
}

// var modal = document.getElementById("myModal");

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 


// When the user clicks on <span> (x), close the modal
// const cencelHendler = () => {
//     document.getElementById("myModal").style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target === modal) {
        document.getElementById("myModal").style.display = "none";
    }
}
