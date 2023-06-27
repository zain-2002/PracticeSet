let products;
let cardContainer = document.getElementById("card-container");
( async () => {
    const productsResponse = await fetch('https://dummyjson.com/products')
        .then(res => res.json())
    products = productsResponse.products
console.log(products)
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