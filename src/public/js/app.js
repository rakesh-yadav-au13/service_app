let addToCart = document.querySelectorAll('.add-to-cart');

function updateCart(data) {
    axios.post('/profile', data)
        .then(res => {
            if(res.data.error){
                toastr.options = {
                    "positionClass": "toast-top-right",
                    "showDuration": "0",
                    "hideDuration": "0",
                    "timeOut": "1000",
                    "extendedTimeOut": "0",
                }
                toastr.error(res.data.error)
            }
            // cartCounter.innerText = res.data.totalQty;
            
        })
};



addToCart.forEach((item) => {
    item.addEventListener('click', (e) => {

        // console.log(item.dataset.data)
        let data = { id: item.dataset.data };
        updateCart(data)
    })
});