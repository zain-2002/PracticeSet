import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut, deleteUser} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvrBoaDaXkmDZFEDyFI5MNI63dugzmPmY",
  authDomain: "project-1-7c0af.firebaseapp.com",
  projectId: "project-1-7c0af",
  storageBucket: "project-1-7c0af.appspot.com",
  messagingSenderId: "65951281326",
  appId: "1:65951281326:web:a93d2b2c350db8e77f7d3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    document.getElementById('login-btn').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'block';
    document.getElementById('delete-btn').style.display = 'block';
  } else {
    document.getElementById('login-btn').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('delete-btn').style.display = 'none';
  }
});

let logOutBtn = document.getElementById('logout-btn')
logOutBtn.addEventListener('click', () => {
  const auth = getAuth();
signOut(auth).then(() => {
  Swal.fire({
    // position: 'top-end',
    icon: 'success',
    title: 'logged Out',
    showConfirmButton: false,
    timer: 1000
  });
}).catch((error) => {
});
});

let deleteBtn = document.getElementById('delete-btn')
deleteBtn.addEventListener('click', () => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire(
        'Deleted!',
        'Your account has been deleted.',
        'success'
      );
      deletingAccount();
    } else if (
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your account is safe :)',
        'error'
      );
    };
  });
  function deletingAccount() {
    const user = auth.currentUser;
    deleteUser(user).then(() => {
    }).catch((error) => {
    }); 
  };
});

let products;
let cardContainer = document.getElementById("card-container");

( async () => {
    const productsResponse = await fetch('https://dummyjson.com/products')
        .then(res => res.json())
    products = productsResponse.products
    let categories = ['all'];
    products.forEach(product => {
        if (!categories.includes(product.category)) {
            categories.push(product.category);
        };
    });

    categories.forEach(item => {
        let btn = `<button class="btn btn-success ctg-btn" onClick="ctgBtn(this)" value=${item}>${item}</button>`
        document.getElementById("categories").innerHTML += btn;
    })

    products.forEach(product => {
        let card = `<div class="card my-4">
        <img src=${product.thumbnail} class="card-img-top d-block mx-auto" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">$${product.price}</p>
        </div>
      </div>`
      cardContainer.innerHTML += card;
    });
})();

let ctgBtn = btn => {
  let categoryProducts = products.filter(product => product.category === btn.value);
  cardContainer.innerHTML = "";

  if (btn.value === "all") {
      products.forEach(product => {
          let card = `<div class="card my-4">
          <img src=${product.thumbnail} class="card-img-top d-block mx-auto" alt="...">
          <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">$${product.price}</p>
          </div>
        </div>`
        cardContainer.innerHTML += card;
      })
  } else {
  categoryProducts.forEach(product => {
      let card = `<div class="card my-4">
      <img src=${product.thumbnail} class="card-img-top d-block mx-auto" alt="...">
      <div class="card-body">
        <h5 class="card-title">${product.title}</h5>
        <p class="card-text">$${product.price}</p>
      </div>
    </div>`
    cardContainer.innerHTML += card;
  });
};
};

const search = async() => {
    let input = document.querySelector(".search__input").value;
    let search = await fetch(`https://dummyjson.com/products/search?q=${input}`)
    .then(res => res.json())
    let products = search.products;
    cardContainer.innerHTML ="";
    products.forEach(product => {
        let card = `<div class="card my-4">
        <img src=${product.thumbnail} class="card-img-top d-block mx-auto" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">$${product.price}</p>
        </div>
      </div>`
      cardContainer.innerHTML += card;
    });
    document.querySelector(".search__input").value = "";
};

document.querySelector(".search__input").addEventListener('keypress', (enter)=> {
    if (enter.key === 'Enter') {
        enter.preventDefault();
        search();
    }
});