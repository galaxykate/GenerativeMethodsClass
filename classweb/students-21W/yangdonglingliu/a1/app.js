document.addEventListener("DOMContentLoaded", function(){
    console.log("Hello, webpage!")
});

let showBtn = document.querySelector("#assignments button");
let table = document.querySelector("table");

showBtn.addEventListener("click", function () {
    showBtn.classList.toggle("hideAll");
    table.classList.toggle("visible");
    
    if (showBtn.innerText === "Show All") {
        showBtn.innerText = "Hide All";
        console.log("Assignments are shown!")
    } else {
        showBtn.innerText = "Show All";
        console.log("Assignments are hidden!")
    }
})