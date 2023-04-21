console.log('we are at notes app')
showNotes()

// if user add a note ,add it to the local storage

let addbtn = document.getElementById('addbtn');
addbtn.addEventListener('click', function (e) {
    let addtxt = document.getElementById('addtxt')
    let addtitle=document.getElementById('addtitle')
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }
    let myobj={
        title:addtitle.value,
        text:addtxt.value
    }
    notesobj.push(myobj);
    localStorage.setItem('notes', JSON.stringify(notesobj))
    addtxt.value = ""
    addtitle.value=""
    console.log(notesobj);

    showNotes();
})

// function to show elements from localStorage

function showNotes() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `<div class="notecard card mx-2 my-2" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${index + 1}.${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}"onclick="deletenote(this.id)" class="btn btn-primary">delete note</button>
        </div>
    </div>`

    });
    let noteselem = document.getElementById('notes');
    if (notesobj.length != 0) {
        noteselem.innerHTML = html;
    }
    else {
        noteselem.innerHTML = `<h3>add a note</h3>`
    }
}

// function to deletenote

function deletenote(index) {
 
    console.log('i am deleted', index)
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes)
    }  
    notesobj.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(notesobj))
    showNotes();

}
let search=document.getElementById('searchtxt')
search.addEventListener('input',function(){
    let inputval=search.value.toLowerCase()
    // console.log('input event fired',inputval)
    let notecards=document.getElementsByClassName('notecard')
    Array.from(notecards).forEach(function(element){
        let cardtxt=element.getElementsByTagName('p')[0].innerHTML
        // console.log(cardtxt)
        if(cardtxt.includes(inputval)){
            element.style.display="block"
        }
        else{
            element.style.display='none'
        }
    })
})

// further features
// 1.add titles
// 2.mark a note as important
// 3.separate notes by user
// sync and host to web server