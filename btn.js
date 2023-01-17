// Get the button:
let mybutton = document.getElementById("loadMore");
let clicked = false;

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {


  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    if(!clicked){
      mybutton.style.display = "block";
    }
  } else {
    mybutton.style.display = "none";
    clicked = false;
  }
};

mybutton.addEventListener("click", function() {
  clicked = true;
  mybutton.style.display = "none";
});







