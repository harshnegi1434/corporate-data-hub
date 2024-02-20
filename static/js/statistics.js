// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal
var images = document.querySelectorAll(".visualization img");
var modalImg = document.getElementById("img01");

// Loop through all images and add onclick events
for (var i = 0; i < images.length; i++) {
    images[i].onclick = function(){
        modal.style.display = "block";
        modalImg.src = this.src;
    }
}

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
