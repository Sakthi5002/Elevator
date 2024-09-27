const floors = document.querySelectorAll(".floor");
const buttons = document.querySelectorAll(".floor button");
let lift = document.querySelector(".lift")
const liftNum = document.getElementById("lift-num");

buttons.forEach((btn, id) => btn.addEventListener('click', () => moveLift(id)));

function moveLift(id) {
    console.log(id);
    lift.classList.remove('lift');
    floors[id].classList.add('lift');
    lift = floors[id];
    liftNum.innerHTML = `Lift at : ${id}`;
}
