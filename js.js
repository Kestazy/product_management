import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
import firebaseConfig from "./firebase.js";

// initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

console.log("Sveikuciaia")

const enterId = document.getElementById("enterID");
const enterName = document.getElementById("enterName");
const enterQuantity = document.getElementById("enterQuantity");
const enterFind = document.getElementById("findID");
const result = document.getElementById("findData");

const insertBtn = document.getElementById("insert");
const updateBtn = document.getElementById("update");
const removeBtn = document.getElementById("remove");
const findBtn = document.getElementById("find");

function insertData(e) {
    e.preventDefault();
    console.log(typeof enterId.value, enterName.value, enterQuantity.value);

    set(ref(database, "Products/" + enterId.value), {
        Name: enterName.value,
        ID: enterId.value,
        Quantity: enterQuantity.value
    })
    .then(() => {
        alert("Data added successfully");
    })
    .catch((error) => {
        alert(error);
    });
}

insertBtn.addEventListener('click', insertData);



function findData(e) {
    e.preventDefault();
    console.log(`select function ${enterFind.value}`);
    if (enterFind.value.length < 3) {
        alert('Product code cant be blank! MIN 3 Symbols')
        return
    }
    const dbRef = ref(database);
    
    get(child(dbRef, "Products/" + enterFind.value))
        .then((snapshot) => {
            if (snapshot.exists()){
                // console.log(snapshot.val().Name);
                let listItem = document.createElement('li');
                listItem.classList.add("list-group-item", "list-group-item-secondary");
                listItem.textContent = "Product Name: " + snapshot.val().Name;
                result.appendChild(listItem);
                let listItemSecond = document.createElement('li');
                listItemSecond.classList.add("list-group-item", "list-group-item-light");
                listItemSecond.textContent = "Product Quantity: " + snapshot.val().Quantity;
                result.appendChild(listItemSecond);
            } else {
                alert("No data found");
            }
        })
        .catch((error) => {
            alert(error)
        })
}

findBtn.addEventListener('click', findData);

function updateData(e) {
    e.preventDefault();

    if (enterId.value.length < 3) {
        alert('Product code cant be blank! MIN 3 Symbols')
        return
    }

    if (enterName.value === "") {
        alert('Product Name cant be blank!')
        return
    }

    if (enterQuantity.value.length < 1) {
        alert('Product Quantity cant be blank! MIN 1 Symbol')
        return
    }

    console.log(`update function ${enterId.value} ${enterName.value} ${enterQuantity.value}`);
    update(ref(database, "Products/" + enterId.value), {
        Name: enterName.value,
        Quantity: enterQuantity.value
    })

    .then(() => {
        alert("Data update successfully");
    })
    .catch((error) => {
        alert(error);
    })

}

updateBtn.addEventListener('click', updateData);

function removeData(e) {
    e.preventDefault()

    if (enterId.value.length < 3) {
        alert('Product code cant be blank! MIN 3 Symbols')
        return
    }

    const dbRef = ref(database);

    get(child(dbRef, `Products/${enterId.value}`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            remove(ref(database, "Products/" + enterId.value))
            .then(() => {
                alert("Data deleted successfully");
            })
            .catch((error) => {
                alert(error);
            })
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.log(error);
    })
}

removeBtn.addEventListener('click', removeData);