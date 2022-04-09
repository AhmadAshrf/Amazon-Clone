function ajaxRequest() {
    var XMLHTTPReq = new XMLHttpRequest();
    var url = 'https://fakestoreapi.com/products';
    XMLHTTPReq.open('get', url, true)
    XMLHTTPReq.onreadystatechange = function () {
        if (XMLHTTPReq.readyState == 4 && XMLHTTPReq.status == 200) {
            //console.log('hi from if body')
            var data = XMLHTTPReq.responseText;
            var parsedData = JSON.parse(data);
            //console.log(parsedData[0].id)
            let cards = document.getElementById('loopCards');
            for (let i = 0; i < parsedData.length; i++) {
                cards.innerHTML += '<div class="card"><img src=' + parsedData[i].image + ' class="img-fluid"><div class="card-body"><h5 class="card-title">' + parsedData[i].title + '</h5><p class="card-text">' + parsedData[i].description + '</p></div><span class="badge bg-danger">' + parsedData[i].price + ' $' + '</span><button type="button" onclick="addToCart(' + parsedData[i].id + ', this)" class="btn btn-lg btn-primary"">Add to Cart + </button><div class="card-footer"><small class="text-muted">Last updated 3 mins ago</small></div></div>';
            }
        }
    }
    XMLHTTPReq.send();
}

let arr = []
function addToCart(id, btn) {
    showAlert()
    arr.push(id)
    localStorage.setItem('userCart', JSON.stringify(arr))
    let items = JSON.parse(localStorage.getItem('userCart'))
    document.getElementById('cartNumber').innerHTML = items.length
    btn.setAttribute('disabled', 'disabled')
}

function getCartItems() {
    var secondHTTPReq = new XMLHttpRequest();
    var url = 'https://fakestoreapi.com/products';
    secondHTTPReq.open('get', url, true)
    secondHTTPReq.onreadystatechange = function () {
        if (secondHTTPReq.readyState == 4 && secondHTTPReq.status == 200) {
            console.log('hi from if body second request')
            let data = secondHTTPReq.responseText;
            let parsedData = JSON.parse(data);
            let userProducts = [];
            let items = JSON.parse(localStorage.getItem('userCart'))
            console.log(items)

            if (items === '' || items === undefined || items === null || items === 0) {
                var btnCart = document.getElementById('cartBTN')
                btnCart.setAttribute('disabled', 'disabled')
                let str = '<div class="alert alert-danger" role="alert"><div class="spinner-grow text-danger" role="status"><span class="visually-hidden">Loading...</span></div> Error 404, No items on cart <a href="/index.html">Go Back to Choose a Product !</a></div>'
                document.getElementById('alert2').innerHTML = str
            } else {
                for (let i = 0; i < items.length; i++) {
                    userProducts.push(parsedData.find((products) => products.id == items[i]))
                }
                console.log(userProducts)
                addItemsToDOM(userProducts)
                document.getElementById('cartNumber').innerHTML = userProducts.length

            }
        }
    }
    secondHTTPReq.send();
}

function addItemsToDOM(items) {
    let total = 0
    let cards = document.getElementById('loopCards');

    for (let i = 0; i < items.length; i++) {


        cards.innerHTML += '<div class="card"><img src=' + items[i].image + ' class="img-fluid"><div class="card-body"><h5 class="card-title">' + items[i].title + '</h5><p class="card-text">' + items[i].description + '</p></div><span class="badge bg-danger">' + items[i].price + ' $' + '</span><div class="card-footer"><small class="text-muted">Last updated 3 mins ago</small></div></div>';
        total = total + items[i].price
    }
    document.getElementById('total').innerHTML = total + ' $'
    let log = localStorage.getItem('users')
    let btn = document.getElementById('cartBTN')
    if (log != null) {
        btn.setAttribute('disabled', 'disabled')
        btn.innerHTML = '<i class="fa-brands fa-paypal"></i>' + ' PayPal'
    }
}

function showAlert() {
    let str = '<div class="alert alert-success" role="alert"> Product added Succesfully</div>'
    var alert = document.getElementById('alert')
    alert.innerHTML = str
    alert.style.display = 'block';
    setTimeout(function () {
        alert.style.display = 'none'
    }, 1700);
}


function isUserValid() {
    return emailChecker()
}

function signUp() {
    let emailAddress = document.getElementById('wrongReg')

    if (isUserValid()) {
        registerForm()
    } else {
        emailAddress.style.display = 'block'
        setTimeout(() => {
            emailAddress.style.display = 'none'
        }, 1900);
    }


}

function registerForm() {
    let userInfo = {
        emailAddress: document.getElementById('EmailReg').value,
        userName: document.getElementById('UserNameReg').value,
        password: document.getElementById('PasswordReg').value
    }

    let usersData = localStorage.getItem('users')
    var users = []

    if (usersData != '' && usersData != null) {
        users = JSON.parse(usersData)
    }
    users.push(userInfo)
    localStorage.setItem('users', JSON.stringify(users))

    let alert = document.getElementById('successReg');
    alert.style.display = 'block'

    setTimeout(() => {
        alert.style.display = 'none'
        window.open('./login.html', '_self')
    }, 1900);

}

function logIn() {
    let userInfo = {
        emailAddress: document.getElementById('emailInput').value,
        password: document.getElementById('passwordInput').value,
        userCheck: localStorage.getItem('users')
    }

    var arr = []
    if (userInfo.userCheck != null) {
        arr = JSON.parse(userInfo.userCheck)
    } else {
        let wrong = document.getElementById('wrongLog')
        wrong.style.display = 'block'
        setTimeout(() => {
            wrong.style.display = 'none'
        }, 1900);
    }
    //let checker = arr.find((chk) => chk.emailAddress === userInfo.emailAddress && chk.password === userInfo.password)

    let checker = arr.filter(chk => chk.emailAddress == userInfo.emailAddress && chk.password == userInfo.password)

    console.log(checker)

    if (checker == 0 || checker === undefined || checker == null || checker == '') {
        console.log(checker)
        let wrong = document.getElementById('wrongLog')

        wrong.style.display = 'block'
        setTimeout(() => {
            wrong.style.display = 'none'
        }, 1900);

    } else {
        let successLog = document.getElementById('successLog');
        localStorage.setItem('loginUser', '1')
        successLog.style.display = 'block'
        setTimeout(() => {
            successLog.style.display = 'none'
            window.open('/logedin.html', '_self')
        }, 1900);
    }
}

function redirect(btn) {
    //var btnCart = document.getElementById('cartBTN')
    if (!(btn.hasAttribute('disabled'))) {
        window.open('/register.html', '_self')
    }
}

function emailChecker() {
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let emailAddress = document.getElementById('EmailReg').value
    if (!(emailPattern.test(emailAddress))) {
        return false
    } else {
        return true
    }
}

function showEmail() {
    let getEmail = localStorage.getItem('users')
    if (getEmail != null) {
        let s = (getEmail.split(',')[0])
        let finalEmail = s.split(':')[1]
        document.getElementById('userEmailShow').innerHTML = '' + 'Hello ' + finalEmail.slice(1)
    } else {
        window.open('./login.html', '_self')
        let wrong = document.getElementById('wrongLog')
        wrong.style.display = 'block'
        setTimeout(() => {
            wrong.style.display = 'none'
        }, 1900);
    }
}

