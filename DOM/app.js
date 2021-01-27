const btn1 = document.getElementById("btn1");

btn1.addEventListener("click", function master1() {
    let master = document.getElementsByClassName("master2");
    master[2].innerHTML = "This has changed";
})

const btn2 = document.getElementById("btn2");

btn2.addEventListener("click", function master2() {
    let master = document.getElementsByTagName("p");
    master[1].innerHTML = "And I also love CSS";
})