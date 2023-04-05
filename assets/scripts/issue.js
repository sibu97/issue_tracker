var btn = document.getElementById('fbtn');
var hbtn = document.getElementById('hbtn');
var fcontainer = document.getElementById('select-filter');
btn.addEventListener('click', function(e){
    e.preventDefault();
    fcontainer.style.display = 'block';
})
hbtn.addEventListener('click', function(e){
    e.preventDefault();
    fcontainer.style.display = 'none';
})
