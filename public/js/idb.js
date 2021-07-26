//const { classBody } = require("@babel/types");

//create variable to hold db connection
let db;
//establish a connection to indexedDB database called 'budget-tracker' and set
const request = indexedDB.open('budgettracker', 1); 

//this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function (event) {
    //save reference to the database
    const db = event.target.result;
    //create an object store (table) called `new_entry`, set it to have an auto incrementing primary key of sorts
    db.createObjectStore('new_entry', { autoIncrement: true });
};

//upon a successful
request.onsuccess = function(event) {
    //when db is successfully created with its object store (from onupgradeneeded event above) or simply established a connection, save reference to db in global variable
    db = event.target.result;

    //check if app is online, if yes run uploadEntry() function to send all local db data to api
   if (navigator.onLine) {
       //we haven't created this yet, but will soon, so comment it out for now
       //uploadEntry();
   } 
};

request.onerror = function(event) {
    //log error here
    console.log(event.target.errorCode);
};

//This function will be executed if we attempt to submit a new transaction when there is no internet connection
function saveRecord(record) {
    //open a new entry with the database with read and write permissions
    const transaction = db.transaction(['new_entry'], 'readwrite');

    //access to the object store for `new_entry`
    const entryObjectStore = transaction.objectStore('new_entry');

    //add record to the store with add method
    entryObjectStore.add(record);
}

function uploadEntry() {
    //open a transaction on the db
    const transaction = db.transaction(['new_entry'], 'readwrite');

    //access the object store
    const entryObjectStore = transaction.objectStore('new_entry');

    //get all record from store and set to a variable
    const getAll = entryObjectStore.getAll();



//upon a successful .getAll() execution, run this function
getAll.onsuccess = function() {
    //if there was data in indexDB;s store, let's send it to the api server
    if (getAll.result.length > 0) {
        fetch('/api/entry', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            header: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'applcation/json'
            }
        })
        .then(response => response.json())
        .then(serverResponse => {
            if (serverResponse.messgae) {
                throw new Error(serverResponse);
            }
            //open one more entry
            const transaction = db.transaction(['new_entry'], 'readwrite');
            //access the new_entry object store
            const entryObjectStore = transaction.objectStore('new_entry');
            //clear all items in the store
            entryObjectStore.clear();
            
            alert('All saved transactions have been submitted!');

        })
        .catch(err => {
            console.log(err);
        });
    }
};
}