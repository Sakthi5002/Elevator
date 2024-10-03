const revFloors = document.querySelectorAll(".floor");
const revUpButtons = document.querySelectorAll(".up");
const revDownButtons = document.querySelectorAll(".down");
const liftNum = document.getElementById("lift-num");
const floorNumButtons = document.querySelectorAll(".floor-num");
let floors = [];
let UpButtons = [];
let DownButtons = [];
let lift = 0;
let moveLiftIntervalId;
let calledQueue = [];
let isMoving = false;
let moveDirection = 1;
let stops = [];
// let max = 0;
let edges = [0,revFloors.length-1];

for (let i = revFloors.length-1; i >= 0; i--) {
    floors.push(revFloors[i]);
    UpButtons.push(revUpButtons[i]);
    DownButtons.push(revDownButtons[i]);
    if(document.getElementsByClassName("lift")[0].isSameNode(revFloors[i]))
    {
        lift = revFloors.length - i -1;
    }
}

// buttons.forEach((btn, id) => btn.addEventListener('click', () => startLift(id)));
UpButtons.forEach((btn, id) => btn.addEventListener('click', () => pushCall(id)));
DownButtons.forEach((btn, id) => btn.addEventListener('click', () => pushCall(id)));
floorNumButtons.forEach((btn) => btn.addEventListener('click', () => pushCall(parseInt(btn.innerHTML))));
// for (var i = 0; i <= 11; i++) {
//     for (var j = 0; j <=1 ; j++) {
//         buttons[i+j].addEventListener('click', () => pushCall(i));        
//     }
// }


function pushCall(id){
    console.log("Push" + id);
    
    if(calledQueue.length == 0){
        calledQueue.push(id);
        checkStack();
    } else {
        calledQueue.push(id);
    }
}

// function startLift(id){
//     console.log("To", id);
    
//         if (lift < id) {
//             moveLiftIntervalId = setInterval(() => moveLift(lift+1, id), 1000);
//         } else if (lift > id) {
//             moveLiftIntervalId = setInterval(() => moveLift(lift-1, id), 1000);
//         } else {
//             calledQueue.splice(0,1);
//         }
// }

// function moveLift(id, stop) {
//     console.log(id);
//     isMoving = true
//     floors[lift].classList.remove('lift');
//     floors[id].classList.add('lift');
//     lift = id;
//     liftNum.innerHTML = `Lift at : ${id}`;
//     if (lift == stop) {
//         clearInterval(moveLiftIntervalId);
//         calledQueue.splice(0,1);
//         isMoving = false;
//         if (calledQueue.length !=0) {
//             setTimeout(()=>startLift(calledQueue[0]), 1500);
//         }
//     }
// }


// setInterval(()=>checkStack(), 1000);

function checkStack(){
    console.log("Checking");
    console.log(isMoving);
    
    if (!isMoving) {
        if (calledQueue.length == 0) {
            console.log("Empty");
        } else {
            console.log("Calling Lift");            
            startLift(calledQueue[0]);
            calledQueue.splice(0,1);
        }
    }
}

function startLift(end){
    console.log("To", end);
    if (lift==end) {
        return;
    }
    isMoving = true;
    
        if (lift < end) {
            moveDirection = 1;
            max = Math.max(calledQueue);
            for (let i = lift+1; i < end; i++) {
                stops.push(i);
            }
            console.log("Stops: " +stops);
            
            moveLiftIntervalId = setInterval(() => moveLift(lift+1, end), 1000);
        } else if (lift > end) {
            moveDirection = 0;
            max = Math.min(calledQueue);
            console.log(max);
            
            for (let i = lift-1; i > end; i--) {
                console.log(i);
                
                stops.push(i);
            }
            console.log("Stops: " + stops);
            
            moveLiftIntervalId = setInterval(() => moveLift(lift-1, end), 1000);
        }
        //  else {
        //     calledQueue.splice(0,1);
        // }
}

function moveLift(id, stop) {
    console.log(id);
    console.log(calledQueue);
    // isMoving = true;
    floors[lift].classList.remove('lift');
    floors[id].classList.add('lift');
    lift = id;
    liftNum.innerHTML = `Lift at : ${id}`;
    
    if (stops.includes(lift) && calledQueue.includes(lift)) {
        clearInterval(moveLiftIntervalId);
        // setTimeout(()=>moveLiftIntervalId = setInterval(() => moveLift(lift+1, max), 1000), 1500);
        // var newCalledQueue = calledQueue.filter(val => val!=lift);
        // calledQueue = newCalledQueue;
        calledQueue = calledQueue.filter(val => val!=lift);

        console.log("after dele " + calledQueue);
        
        setTimeout(()=>moveLiftIntervalId = setInterval(() => moveLift(moveDirection?lift+1:lift-1, stop), 1000), 2000);
    //     moveLiftIntervalId = setInterval(() => moveLift(lift+1, max), 1000);
    }
    // console.log(stop, lift);
    if (edges.includes(lift)) {
        moveDirection = !moveDirection;
    }
    
    if (lift == stop) {
        clearInterval(moveLiftIntervalId);
        // calledQueue.splice(0,1);
        // var newCalledQueue = calledQueue.filter(val => val!=lift);
        // calledQueue = newCalledQueue;
        calledQueue = calledQueue.filter(val => val!=lift);
        isMoving = false;
        console.log("reached end");
        stops = [];
        
        // var newCalledQueue = calledQueue.filter(val => false);
        // calledQueue = newCalledQueue;
        console.log(lift, edges.includes(lift));
        
        if (calledQueue.length !=0) {
            moveDirection?moveUp():moveDown();
        function moveUp() {
            console.log(calledQueue);
            var max = Math.max(...calledQueue);
            console.log(max);
            console.log("Up " + max);
            if (lift<max) {
                startLift(max);
            }
        }
        function moveDown() {
            console.log(calledQueue);
            var min = Math.min(...calledQueue);
            console.log("Down " + min);
            if (lift>min) {
                startLift(min);
            }
        }

            if (!isMoving) {
                moveLiftIntervalId = setTimeout(()=>startLift(calledQueue[0]), 1000);
                
            }
        }
    }
}