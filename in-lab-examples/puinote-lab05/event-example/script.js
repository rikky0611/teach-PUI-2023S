window.onload = function () {
    console.log("hello world!");
    var myElement = document.getElementById("text");

    myElement.onclick = function () {
        myElement.innerHTML = "NEW TEXT WOO!";
    }
}
