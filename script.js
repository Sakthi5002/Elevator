const revFloors = document.querySelectorAll(".floor");
const revButtons = document.querySelectorAll(".call");
const liftNum = document.getElementById("lift-num");
const floorNumButtons = document.querySelectorAll(".floor-num");
let floors = [];
let buttons = [];
let lift = 0;
let moveLiftIntervalId;
let calledQueue = [];

for (let i = revFloors.length-1; i >= 0; i--) {
    floors.push(revFloors[i]);
    buttons.push(revButtons[i]);
    if(document.getElementsByClassName("lift")[0].isSameNode(revFloors[i]))
    {
        lift = revFloors.length - i -1;
    }
}

// buttons.forEach((btn, id) => btn.addEventListener('click', () => startLift(id)));
buttons.forEach((btn, id) => btn.addEventListener('click', () => pushCall(id)));
floorNumButtons.forEach((btn) => btn.addEventListener('click', () => pushCall(parseInt(btn.innerHTML))));

function pushCall(id){
    if(calledQueue.length == 0){
        calledQueue.push(id);
        startLift(calledQueue[0]);
    } else {
        calledQueue.push(id);
    }
}

function startLift(id){
    console.log("To", id);
    
        if (lift < id) {
            moveLiftIntervalId = setInterval(() => moveLift(lift+1, id), 1000);
        } else if (lift > id) {
            moveLiftIntervalId = setInterval(() => moveLift(lift-1, id), 1000);
        } else {
            calledQueue.splice(0,1);
        }
}

function moveLift(id, stop) {
    console.log(id);
    floors[lift].classList.remove('lift');
    floors[id].classList.add('lift');
    lift = id;
    liftNum.innerHTML = `Lift at : ${id}`;
    if (lift == stop) {
        clearInterval(moveLiftIntervalId);
        calledQueue.splice(0,1);
        if (calledQueue.length !=0) {
            setTimeout(()=>startLift(calledQueue[0]), 1500);
        }
    }
}
