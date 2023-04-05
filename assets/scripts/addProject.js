
var modal = document.getElementById("modal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

// when add project button is clicked
btn.onclick = function() {
  modal.style.display = "block";
}

// when close button is clicked
span.onclick = function() {
  modal.style.display = "none";
}

// if clicked anywhere outside the box 
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
