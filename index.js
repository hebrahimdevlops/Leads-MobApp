
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js"

import { getDatabase,
            push,
            ref,
            onValue,
            remove} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"




const firebaseConfig = {

    databaseURL: "https://leads-tracker-app-335bd-default-rtdb.europe-west1.firebasedatabase.app/"

}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "leads")



//let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
//const tabBtn = document.getElementById("tab-btn")

/*if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}*/

/*tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})*/

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot){
    const snapshotDoesExist = snapshot.exists() // a method to check if snapshot exists (true or false)
    if(snapshotDoesExist){                      //the if() helps check if a snapshot exists and then runs the function
        const snapshotValues = snapshot.val()
        //console.log(snapshot.val())
        // Challenge: Create a const called 'leads' which is an array containing the values inside of the snapshotValues object
        const leads = Object.values(snapshotValues) // transforming object into array

        render(leads)

    }
})


deleteBtn.addEventListener("dblclick", function() {
    //localStorage.clear()
    //myLeads = []
    //render(myLeads)
    remove(referenceInDB) // for deleting the snapshot from the database
    ulEl.innerHTML ="" //manually deletes from the client side
})

inputBtn.addEventListener("click", function() {
    //console.log(myLeads.push(inputEl.value))

    push(referenceInDB, inputEl.value)
    inputEl.value = ""
    //localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    //render(myLeads)
})