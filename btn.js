// Get the button:
let mybutton = document.getElementById("loadMore");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {


  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
