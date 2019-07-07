// Coordinates of Museum

/* Layout
Small door (left) + Big door (right) is the entrance of museum
Small door + small door is the back of the museum

Chambers
front
1.l + 5.r
2.l + 6.r
3.l + 7.r
4.l + 8.r
back

Coordinates:
- Bulding
- Doors
  -Outside
  -Inside
-Paintings

Axis.
X - depth (e.g front doors to back doors)
Y - Height (e.g ground to roof)
Z - Width (e.g transverse to doors)

l -> Left
r -> Right
u -> Up
d -> Down
m -> Middle

*/

/*function storeCoordinate(x, y, z, array) {
    array.push(x);
    array.push(y);
    array.push(z);
}*/

/*Eg. var coords = [];
storeCoordinate(3, 5, coords);
storeCoordinate(19, 1000, coords);
storeCoordinate(-300, 4578, coords);*/


function storeCoordinate(x, y, z, name, obj) {
    obj[name] = {};
    obj[name]['x'] = x;
    obj[name]['y'] = y;
    obj[name]['z'] = z;
}


//----------DOORS-------------//
//Outside
var lDoorFront = {};
storeCoordinate(1.21609, 1.04373, 2.13812, "ld", lDoorFront); //ld
storeCoordinate(1.21609, 2.04373, 2.13812, "lu", lDoorFront); //lu
storeCoordinate(1.21609, 1.04373, 1.63812, "rd", lDoorFront); //rd
storeCoordinate(1.21609, 2.04373, 1.63812, "ru", lDoorFront); //ru

var rDoorFront = {};
storeCoordinate(1.21609, 1.04373, 0.588119, "ld", rDoorFront); //ld
storeCoordinate(1.21609, 2.04373, 0.588119, "lu", rDoorFront); //lu
storeCoordinate(1.21609, 1.04373, -0.411881,"rd", rDoorFront); //rd
storeCoordinate(1.21609, 2.04373, -0.411881,"ru", rDoorFront); //ru

var lDoorBack = {};
storeCoordinate(-6.93391, 1.04373, -0.411881, "ld", lDoorBack); //ld
storeCoordinate(-6.93391, 2.04373, -0.411881, "lu", lDoorBack); //lu
storeCoordinate(-6.93391, 1.04373, 0.088119, "rd", lDoorBack); //rd
storeCoordinate(-6.93391, 2.04373, 0.088119, "ru", lDoorBack); //ru

var rDoorBack = {};
storeCoordinate(-6.93391, 1.04373, 1.63812, "ld", rDoorBack); //ld
storeCoordinate(-6.93391, 2.04373, 1.63812, "lu", rDoorBack); //lu
storeCoordinate(-6.93391, 1.04373, 2.13812, "rd", rDoorBack); //rd
storeCoordinate(-6.93391, 2.04373, 2.13812, "ru", rDoorBack); //ru

//Inside
var lDoor1to2 = {};
storeCoordinate(-0.783914, 1.04373, 2.13812, "ld", lDoor1to2); //ld
storeCoordinate(-0.783914, 2.04373, 2.13812, "lu", lDoor1to2); //lu
storeCoordinate(-0.783914, 1.04373, 1.63812, "rd", lDoor1to2); //rd
storeCoordinate(-0.783914, 2.04373, 1.63812, "ru", lDoor1to2); //ru

var lDoor2to3 = {};
storeCoordinate(-2.83391, 1.04373, 2.13812, "ld", lDoor2to3); //ld
storeCoordinate(-2.83391, 2.04373, 2.13812, "lu", lDoor2to3); //lu
storeCoordinate(-2.83391, 1.04373, 1.63812, "rd", lDoor2to3); //rd
storeCoordinate(-2.83391, 2.04373, 1.63812, "ru", lDoor2to3); //ru

var lDoor3to4 = {};
storeCoordinate(-4.93391, 1.04373, 2.13812, "ld", lDoor3to4); //ld
storeCoordinate(-4.93391, 2.04373, 2.13812, "lu", lDoor3to4); //lu
storeCoordinate(-4.93391, 1.04373, 1.63812, "rd", lDoor3to4); //rd
storeCoordinate(-4.93391, 2.04373, 1.63812, "ru", lDoor3to4); //ru

var rDoor5to6 = {};
storeCoordinate(-0.783914, 1.04373, 0.088119, "ld", rDoor5to6); //ld
storeCoordinate(-0.783914, 2.04373, 0.088119, "lu", rDoor5to6); //lu
storeCoordinate(-0.783914, 1.04373, -0.411881, "rd", rDoor5to6); //rd
storeCoordinate(-0.783914, 2.04373, -0.411881, "ru", rDoor5to6); //ru

var rDoor6to7 = {};
storeCoordinate(-2.83391, 1.04373, 0.088119, "ld", rDoor6to7); //ld
storeCoordinate(-2.83391, 2.04373, 0.088119, "lu", rDoor6to7); //lu
storeCoordinate(-2.83391, 1.04373, -0.411881, "rd",  rDoor6to7); //rd
storeCoordinate(-2.83391, 2.04373, -0.411881, "ru", rDoor6to7); //ru

var lDoor7to8 = {};
storeCoordinate(-4.93391, 1.04373, 0.088119, "ld", lDoor7to8); //ld
storeCoordinate(-4.93391, 2.04373, 0.088119, "lu", lDoor7to8); //lu
storeCoordinate(-4.93391, 1.04373, -0.411881, "rd", lDoor7to8); //rd
storeCoordinate(-4.93391, 2.04373, -0.411881, "ru", lDoor7to8); //ru

var mDoor5to1 = {};
storeCoordinate(0.716086, 1.04373, 1.08812, "ld", mDoor5to1); //ld
storeCoordinate(0.716086, 2.04373, 1.08812, "lu", mDoor5to1); //lu
storeCoordinate(0.216086, 1.04373, 1.08812, "rd", mDoor5to1); //rd
storeCoordinate(0.216086, 2.04373, 1.08812, "ru", mDoor5to1); //ru

var mDoor8to4 = {};
storeCoordinate(-5.93391, 1.04373, 1.08812, "ld", mDoor8to4); //ld
storeCoordinate(-5.93392, 2.04373, 1.08812, "lu", mDoor8to4); //lu
storeCoordinate(-6.43391, 1.04373, 1.08812, "rd", mDoor8to4); //rd
storeCoordinate(-6.43391, 2.04373, 1.08812, "ru", mDoor8to4); //ru

//--------END DOORS-------------------//

//--------CHAMBERS-----------------//
// Only floor coordinartes from top view
//Chamber 1
var chamber1 = {};
storeCoordinate(1.21609, 1.04373, 3.13812, "ld", chamber1); //ld
storeCoordinate(-0.73914, 1.04373, 3.13812, "lu", chamber1); //lu
storeCoordinate(1.21609, 1.04373, 1.13812, "rd", chamber1); //rd
storeCoordinate(-0.73914, 1.04373, 1.13812, "ru", chamber1); //ru

//Chamber 2
var chamber2 = {};
storeCoordinate(-0.833914, 1.04373, 3.13812, "ld", chamber2); //ld
storeCoordinate(-2.83391, 1.04373, 3.13812, "lu", chamber2); //lu
storeCoordinate(-0.833914, 1.04373, 1.13812, "rd", chamber2); //rd
storeCoordinate(-2.83391, 1.04373, 1.13812, "ru", chamber2); //ru

//Chamber 3
var chamber3 = {};
storeCoordinate(-2.83391, 1.04373, 3.13812, "ld", chamber3); //ld
storeCoordinate(-4.88391, 1.04373, 3.13812, "lu", chamber3); //lu
storeCoordinate(-2.83391, 1.04373, 1.13812, "rd", chamber3); //rd
storeCoordinate(-4.88391, 1.04373, 1.13812, "ru", chamber3); //ru

//Chamber 4
var chamber4 = {};
storeCoordinate(-4.93391, 1.04373, 3.13812, "ld", chamber4); //ld
storeCoordinate(-6.93391, 1.04373, 3.13812, "lu", chamber4); //lu
storeCoordinate(-4.93391, 1.04373, 1.13812, "rd", chamber4); //rd
storeCoordinate(-6.93391, 1.04373, 1.13812, "ru", chamber4); //ru

//Chamber 5
var chamber5 = {};
storeCoordinate(1.21609, 1.04373, 1.08812, "ld", chamber5); //ld
storeCoordinate(-0.783914, 1.04373, 1.08812,"lu", chamber5); //lu
storeCoordinate(1.21609, 1.04373, -0.911881,"rd", chamber5); //rd
storeCoordinate(-0.783913, 1.04373, -0.911881, "ru", chamber5); //ru

//Chamber 6
var chamber6 = {};
storeCoordinate(-0.833914, 1.04373, 1.08812, "ld", chamber6); //ld
storeCoordinate(-2.83391, 1.04373, 1.08812, "lu", chamber6); //lu
storeCoordinate(-0.833914, 1.04373, -0.911881, "rd", chamber6); //rd
storeCoordinate(-2.83391, 1.04373, -0.911881, "ru", chamber6); //ru

//Chamber 7
var chamber7 = {};
storeCoordinate(-2.83391, 1.04373, 1.08812, "ld", chamber7); //ld
storeCoordinate(-4.88391, 1.04373, 1.08812, "lu", chamber7); //lu
storeCoordinate(-2.83391, 1.04373, -0.911881, "rd", chamber7); //rd
storeCoordinate(-4.88391, 1.04373, -0.911881, "ru", chamber7); //ru

//Chamber 8
var chamber8 = {};
storeCoordinate(-4.93391, 1.04373, 1.08812, "ld", chamber8); //ld
storeCoordinate(-6.93391, 1.04373, 1.08812, "lu", chamber8); //lu
storeCoordinate(-4.93391, 1.04373, -0.911881, "rd", chamber8); //rd
storeCoordinate(-6.93391, 1.04373, -0.911881, "ru", chamber8); //ru

//--------END CHAMBERS-------------//

//--------GROUND--------------//
//It's called chamber0 the outside rectangle
var chamber0 = {};
storeCoordinate(1.61494, 1.04417, 3.58796, "ld", chamber0); //ld
storeCoordinate(-7.38506, 1.04417, 3.58796, "lu", chamber0); //lu
storeCoordinate(1.61494, 1.04417, -1.41204, "rd", chamber0); //rd
storeCoordinate(-7.38506, 1.04417, -1.41204, "ru", chamber0); //ru

//-------- END GROUND--------------//


//--------PAINTINGS-----------------//
//Front View
//Chamber 8
var coorDejeuner = {};
storeCoordinate(-5.85562, 1.63947, 3.10141, "ld", coorDejeuner); //ld
storeCoordinate(-5.85562, 2.13541, 3.10141, "lu", coorDejeuner); //lu
storeCoordinate(-6.35155, 1.63947, 3.10141, "rd", coorDejeuner); //rd
storeCoordinate(-6.35155, 2.13541, 3.10141, "ru", coorDejeuner); //ru

var coorTheDance = {};
storeCoordinate(-4.11019, 1.63947, 3.10141, "ld", coorTheDance); //ld
storeCoordinate(-4.11019, 2.13541, 3.10141, "lu", coorTheDance); //lu
storeCoordinate(-4.60613, 1.63947, 3.10141, "rd", coorTheDance); //rd
storeCoordinate(-4.60613, 2.13541, 3.10141, "ru", coorTheDance); //ru

var coorSunrise = {};
storeCoordinate(-3.04645, 1.63947, 3.10141, "ld", coorSunrise); //ld
storeCoordinate(-3.04645, 2.13541, 3.10141, "lu", coorSunrise); //lu
storeCoordinate(-3.54239, 1.63947, 3.10141, "rd", coorSunrise); //rd
storeCoordinate(-3.54239, 2.13541, 3.10141, "ru", coorSunrise); //ru

var coorScream = {};
storeCoordinate(-1.92753, 1.63947, 3.10141, "ld", coorScream); //ld
storeCoordinate(-1.92753, 2.13541, 3.10141, "lu", coorScream); //lu
storeCoordinate(-2.42347, 1.63947, 3.10141, "rd", coorScream); //rd
storeCoordinate(-2.42347, 2.13541, 3.10141, "ru", coorScream); //ru

var coorGuernica = {};
storeCoordinate(-0.70248, 1.52928, -0.861823, "ld", coorGuernica); //ld
storeCoordinate(-0.70248, 2.2456, -0.861823, "lu", coorGuernica); //lu
storeCoordinate(-1.16417, 1.52928, -0.861823, "rd", coorGuernica); //rd
storeCoordinate(-1.16417, 2.2456, -0.861823, "ru", coorGuernica); //ru

var coorBoulevard = {};
storeCoordinate(-1.01913, 1.63947, 3.10141, "ld", coorBoulevard); //ld
storeCoordinate(-1.01913, 2.13541, 3.10141, "lu", coorBoulevard); //lu
storeCoordinate(-1.51507, 1.63947, 3.10141, "rd", coorBoulevard); //rd
storeCoordinate(-1.51507, 2.13541, 3.10141, "ru", coorBoulevard); //ru

var coorSunday = {};
storeCoordinate(-1.42347, 1.63947, -0.869044, "ld", coorSunday); //ld
storeCoordinate(-1.42347, 2.13541, -0.869044, "lu", coorSunday); //lu
storeCoordinate(-0.927528, 1.63947, -0.869044, "rd", coorSunday); //rd
storeCoordinate(-0.927528, 2.13541, -0.869044, "ru", coorSunday); //ru

var coorNight = {};
storeCoordinate(-3.54239, 1.63947, -0.869044, "ld", coorNight); //ld
storeCoordinate(-3.54239, 2.13541, -0.869044, "lu", coorNight); //lu
storeCoordinate(-3.04645, 1.63947, -0.869044, "rd", coorNight); //rd
storeCoordinate(-3.04645, 2.13541, -0.869044, "ru", coorNight); //ru

var coorCezane = {};
storeCoordinate(-2.42347, 1.63947, -0.869044, "ld", coorCezane); //ld
storeCoordinate(-2.42347, 2.13541, -0.869044, "lu", coorCezane); //lu
storeCoordinate(-1.92753, 1.63947, -0.869044, "rd", coorCezane); //rd
storeCoordinate(-1.92753, 2.13541, -0.869044, "ru", coorCezane); //ru

var coorGogh = {};
storeCoordinate(0.630145, 1.77926, 3.08946, "ld", coorGogh); //ld
storeCoordinate(0.630145, 2.58057, 3.08946, "lu", coorGogh); //lu
storeCoordinate(-0.171167, 1.77926, 3.08946, "rd", coorGogh); //rd
storeCoordinate(-0.171167, 2.58057, 3.08946, "ru", coorGogh); //ru

var coorFourth = {};
storeCoordinate(-6.35155, 1.63947, -0.869044, "ld", coorFourth); //ld
storeCoordinate(-6.35155, 2.13541, -0.869044, "lu", coorFourth); //lu
storeCoordinate(-5.85562, 1.63947, -0.869044, "rd", coorFourth); //rd
storeCoordinate(-5.85562, 2.13541, -0.869044, "ru", coorFourth); //ru

//--------END PAINTINGS-------------//

function check_door(userCoor) {
    /*
     Check if we are crossing a door

     return 1 if you are inside the doors path area
     */
    //User Coordinates
    //console.log("inside check door");
    var uZ = userCoor[2];
    var uX = userCoor[0];

    var invalidMove;
    //left and right side doors
    if ((uZ < lDoorFront["ld"]["z"]  && uZ > lDoorFront["rd"]["z"]) ||
        ((uZ > lDoorBack["ld"]["z"]  && uZ < lDoorBack["rd"]["z"]) ||
        (uZ > rDoorFront["ld"]["z"]  && uZ < rDoorFront["rd"]["z"]))) {
        invalidMove = 0;
    } else if ((uX < mDoor5to1["ld"]["x"]  && uX > mDoor5to1["rd"]["x"]) ||
        ((uX < mDoor8to4["ld"]["x"]  && uX > mDoor8to4["rd"]["x"]))) { //Middle doors
        invalidMove = 0;
    } else {
            invalidMove = 1;
    }
    return invalidMove;
}

function check_room(userCoor) {
    /*
     Check in what room we are located

     return the room the user is in and 1 which means inside museum
     */
    //User Coordinates
    var uX = userCoor[0];
    var uZ = userCoor[2];


    //Chamber 1
    if ((uX < chamber1["ld"]["x"]  && uX > chamber1["lu"]["x"]) &&
        (uZ < chamber1["ld"]["z"]  && uZ > chamber1["rd"]["z"])) {
        return [chamber1, 1];
    }

    //Chamber 2
    if ((uX < chamber2["ld"]["x"]  && uX > chamber2["lu"]["x"]) &&
        (uZ < chamber2["ld"]["z"]  && uZ > chamber2["rd"]["z"])) {
        return [chamber2, 2];
    }

    //Chamber 3
    if ((uX < chamber3["ld"]["x"]  && uX > chamber3["lu"]["x"]) &&
        (uZ < chamber3["ld"]["z"]  && uZ > chamber3["rd"]["z"])) {
        return [chamber3, 3];
    }

    //Chamber 4
    if ((uX < chamber4["ld"]["x"]  && uX > chamber4["lu"]["x"]) &&
        (uZ < chamber4["ld"]["z"]  && uZ > chamber4["rd"]["z"])) {
        return [chamber4, 4];
    }

    //Chamber 5
    if ((uX < chamber5["ld"]["x"]  && uX > chamber5["lu"]["x"]) &&
        (uZ < chamber5["ld"]["z"]  && uZ > chamber5["rd"]["z"])) {
        return [chamber5, 5];
    }

    //Chamber 6
    if ((uX < chamber6["ld"]["x"]  && uX > chamber6["lu"]["x"]) &&
        (uZ < chamber6["ld"]["z"]  && uZ > chamber6["rd"]["z"])) {
        return [chamber6, 6];
    }

    //Chamber 7
    if ((uX < chamber7["ld"]["x"]  && uX > chamber7["lu"]["x"]) &&
        (uZ < chamber7["ld"]["z"]  && uZ > chamber7["rd"]["z"])) {
        return [chamber7, 7];
    }

    //Chamber 8
    if ((uX < chamber8["ld"]["x"]  && uX > chamber8["lu"]["x"]) &&
        (uZ < chamber8["ld"]["z"]  && uZ > chamber8["rd"]["z"])) {
        return [chamber8, 8];
    }


    return [chamber0, 0];
}


function check_move(userCoor, room, museumFlag) {
    /*
    userCoor: is an array [x,z] with person moving inside the museum
    room is an object with a room coordinates
    museumFlag checks if we are moving inside the museum or outside
    Z->Width and X->Depth
    return 1 if a move is invalid or 0 if move is valid
     */
    var invalidMove; //Flags
    //User Coordinates
    var uX = userCoor[0];
    var uZ = userCoor[2];
    //Room Coordinates
    var rX1 = room["ld"]["x"] - 0.1;
    var rX2 = room["ru"]["x"] + 0.1;
    var rZ1 = room["ld"]["z"] - 0.1;
    var rZ2 = room["rd"]["z"] + 0.1;
    //Ground Coordinates
    var gX1 = chamber0["ld"]["x"];
    var gX2 = chamber0["ru"]["x"];
    var gZ1 = chamber0["ld"]["z"];
    var gZ2 = chamber0["rd"]["z"];
    //Building  Coordinates
    var bX1 = chamber5["ld"]["x"] + 0.1;
    var bX2 = chamber4["ru"]["x"] - 0.1;
    var bZ1 = chamber1["ld"]["z"] + 0.1;
    var bZ2 = chamber8["ru"]["z"] - 0.1;

    if (museumFlag) { //inside museum
        if ((uZ < rZ1 && uZ > rZ2) && (uX < rX1 && uX > rX2)) {
            //Moving in the outside frame of the museum
            //console.log("inside Museum, chamber: ".concat(museumFlag));
            invalidMove = 0;
        } else {
            console.log("inside Museum invalid flag, chamber: ".concat(museumFlag));
            invalidMove = 1;
        }
    } else { //Outside museum
        //Moving in the outside frame of the museum
        if ((uX < gX1 && uX > bX1)  && (uZ < gZ1 && uZ > gZ2)) {
            console.log("outside museum 1");
            invalidMove = 0;
        } else if((uX > gX2 && uX < bX2) && (uZ < gZ1 && uZ > gZ2)) {
            console.log("outside museum 2");
            invalidMove = 0;
        } else if((uZ > gZ2 && uZ < bZ2) && (uX < gX1 && uX > gX2)) {
            console.log("outside museum 3");
            invalidMove = 0;
        } else if((uZ < gZ1 && uZ > bZ1) && (uX < gX1 && uX > gX2)) {
            console.log("outside museum 4");
            invalidMove = 0;
        } else { //Out of bounds
            //console.log("outside museum not valid");
            invalidMove = 1;
        }
    }

    //Check that we are trying to cross a door
    if ((invalidMove) && ((uX < gX1) && (uX > gX2))) {
        if (!check_door(userCoor)) {
            console.log("Passing through door");
            invalidMove = 0;
        }
    }
    console.log("Move: ".concat(invalidMove).concat(" chamber: ".concat(museumFlag)));
    return invalidMove;//(invalidMoveX || invalidMoveZ);
}
