
var modal = document.getElementById("modal");

var mybtn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

// add issue button is clicked
mybtn.onclick = function() {
  modal.style.display = "block";
}

// if close popup box is clicked
span.onclick = function() {
  modal.style.display = "none";
}

// if clicked anywhere outside the box 
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
