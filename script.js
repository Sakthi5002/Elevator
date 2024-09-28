const revfloors = document.querySelectorAll(".floor");
const revbuttons = document.querySelectorAll(".floor button");
const liftNum = document.getElementById("lift-num");
let floors = [];
let buttons = [];
let lift = 0;
let moveLiftIntervalId;

for (let i = revfloors.length-1; i >= 0; i--) {
    floors.push(revfloors[i]);
    buttons.push(revbuttons[i]);
    if(document.getElementsByClassName("lift")[0].isSameNode(revfloors[i]))
    {
        lift = revfloors.length - i -1;
    }
}

buttons.forEach((btn, id) => btn.addEventListener('click', () => startLift(id)));

function startLift(id){
    console.log("Lift start");
    
        if (lift < id) {
            moveLiftIntervalId = setInterval(() => moveLift(lift+1, id), 1000);
        } else if (lift > id) {
            moveLiftIntervalId = setInterval(() => moveLift(lift-1, id), 1000);
        }
}

// setInterval(()=>moveLift())


function moveLift(id, stop) {
    console.log(id);
    floors[lift].classList.remove('lift');
    floors[id].classList.add('lift');
    lift = id;
    liftNum.innerHTML = `Lift at : ${id}`;
    if (lift == stop) {
        clearInterval(moveLiftIntervalId);
    }
}
