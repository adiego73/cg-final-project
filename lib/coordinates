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

function storeCoordinate(x, y, z, array) {
    array.push(x);
    array.push(y);
    array.push(z);
}

/*var coords = [];
storeCoordinate(3, 5, coords);
storeCoordinate(19, 1000, coords);
storeCoordinate(-300, 4578, coords);*/

//----------DOORS-------------//
//Outside
var lDoorFront = [];
storeCoordinate(1.21609, 1.04373, 2.13812, lDoorFront); //ld
storeCoordinate(1.21609, 2.04373, 2.13812, lDoorFront); //lu
storeCoordinate(1.21609, 1.04373, 1.63812, lDoorFront); //rd
storeCoordinate(1.21609, 2.04373, 1.63812, lDoorFront); //ru

var rDoorFront = [];
storeCoordinate(1.21609, 1.04373, 0.588119, rDoorFront); //ld
storeCoordinate(1.21609, 2.04373, 0.588119, rDoorFront); //lu
storeCoordinate(1.21609, 1.04373, -0.411881, rDoorFront); //rd
storeCoordinate(1.21609, 2.04373, -0.411881, rDoorFront); //ru

var lDoorBack = [];
storeCoordinate(-6.93391, 1.04373, -0.411881, lDoorBack); //ld
storeCoordinate(-6.93391, 2.04373, -0.411881, lDoorBack); //lu
storeCoordinate(-6.93391, 1.04373, 0.088119, lDoorBack); //rd
storeCoordinate(-6.93391, 2.04373, 0.088119, lDoorBack); //ru

var rDoorBack = [];
storeCoordinate(-6.93391, 1.04373, 1.63812, rDoorBack); //ld
storeCoordinate(-6.93391, 2.04373, 1.63812, rDoorBack); //lu
storeCoordinate(-6.93391, 1.04373, 2.13812, rDoorBack); //rd
storeCoordinate(-6.93391, 2.04373, 2.13812, rDoorBack); //ru

//Inside
var lDoor1to2 = [];
storeCoordinate(-0.783914, 1.04373, 2.13812, lDoor1to2); //ld
storeCoordinate(-0.783914, 2.04373, 2.13812, lDoor1to2); //lu
storeCoordinate(-0.783914, 1.04373, 1.63812, lDoor1to2); //rd
storeCoordinate(-0.783914, 2.04373, 1.63812, lDoor1to2); //ru

var lDoor2to3 = [];
storeCoordinate(-2.83391, 1.04373, 2.13812, lDoor2to3); //ld
storeCoordinate(-2.83391, 2.04373, 2.13812, lDoor2to3); //lu
storeCoordinate(-2.83391, 1.04373, 1.63812, lDoor2to3); //rd
storeCoordinate(-2.83391, 2.04373, 1.63812, lDoor2to3); //ru

var lDoor3to4 = [];
storeCoordinate(-4.93391, 1.04373, 2.13812, lDoor3to4); //ld
storeCoordinate(-4.93391, 2.04373, 2.13812, lDoor3to4); //lu
storeCoordinate(-4.93391, 1.04373, 1.63812, lDoor3to4); //rd
storeCoordinate(-4.93391, 2.04373, 1.63812, lDoor3to4); //ru

var rDoor5to6 = [];
storeCoordinate(-0.783914, 1.04373, 0.088119, rDoor5to6); //ld
storeCoordinate(-0.783914, 2.04373, 0.088119, rDoor5to6); //lu
storeCoordinate(-0.783914, 1.04373, -0.411881, rDoor5to6); //rd
storeCoordinate(-0.783914, 2.04373, -0.411881, rDoor5to6); //ru

var rDoor6to7 = [];
storeCoordinate(-2.83391, 1.04373, 0.088119, rDoor6to7); //ld
storeCoordinate(-2.83391, 2.04373, 0.088119, rDoor6to7); //lu
storeCoordinate(-2.83391, 1.04373, -0.411881, rDoor6to7); //rd
storeCoordinate(-2.83391, 2.04373, -0.411881, rDoor6to7); //ru

var lDoor7to8 = [];
storeCoordinate(-4.93391, 1.04373, 0.088119, lDoor7to8); //ld
storeCoordinate(-4.93391, 2.04373, 0.088119, lDoor7to8); //lu
storeCoordinate(-4.93391, 1.04373, -0.411881, lDoor7to8); //rd
storeCoordinate(-4.93391, 2.04373, -0.411881, lDoor7to8); //ru

var mDoor5to1 = [];
storeCoordinate(0.716086, 1.04373, 1.08812, lDoor5to1); //ld
storeCoordinate(0.716086, 2.04373, 1.08812, lDoor5to1); //lu
storeCoordinate(0.216086, 1.04373, 1.08812, lDoor5to1); //rd
storeCoordinate(0.216086, 2.04373, 1.08812, lDoor5to1); //ru

var mDoor8to4 = [];
storeCoordinate(-5.93391, 1.04373, 1.08812, lDoorFront); //ld
storeCoordinate(-5.93392, 2.04373, 1.08812, lDoorFront); //lu
storeCoordinate(-6.43391, 1.04373, 1.08812, lDoorFront); //rd
storeCoordinate(-6.43391, 2.04373, 1.08812, lDoorFront); //ru

//--------END DOORS-------------------//

//--------CHAMBERS-----------------//
// Only floor coordinartes from top view
//Chamber 1
var chamber1 = [];
storeCoordinate(1.21609, 1.04373, 3.13812, chamber1); //ld
storeCoordinate(-0.73914, 1.04373, 3.13812, chamber1); //lu
storeCoordinate(1.21609, 1.04373, 1.13812, chamber1); //rd
storeCoordinate(-0.73914, 1.04373, 1.13812, chamber1); //ru

//Chamber 2
var chamber2 = [];
storeCoordinate(-0.833914, 1.04373, 3.13812, chamber2); //ld
storeCoordinate(-2.83391, 1.04373, 3.13812, chamber2); //lu
storeCoordinate(-0.833914, 1.04373, 1.13812, chamber2); //rd
storeCoordinate(-2.83391, 1.04373, 1.13812, chamber2); //ru

//Chamber 3
var chamber3 = [];
storeCoordinate(-2.83391, 1.04373, 3.13812, chamber3); //ld
storeCoordinate(-4.88391, 1.04373, 3.13812, chamber3); //lu
storeCoordinate(-2.83391, 1.04373, 1.13812, chamber3); //rd
storeCoordinate(-4.88391, 1.04373, 1.13812, chamber3); //ru

//Chamber 4
var chamber4 = [];
storeCoordinate(-4.93391, 1.04373, 3.13812, chamber4); //ld
storeCoordinate(-6.93391, 1.04373, 3.13812, chamber4); //lu
storeCoordinate(-4.93391, 1.04373, 1.13812, chamber4); //rd
storeCoordinate(-6.93391, 1.04373, 1.13812, chamber4); //ru

//Chamber 5
var chamber5 = [];
storeCoordinate(1.21609, 1.04373, 1.08812, chamber5); //ld
storeCoordinate(-0.783914, 1.04373, 1.08812, chamber5); //lu
storeCoordinate(1.21609, 1.04373, -0.911881, chamber5); //rd
storeCoordinate(-0.783913, 1.04373, -0.911881, chamber5); //ru

//Chamber 6
var chamber6 = [];
storeCoordinate(-0.833914, 1.04373, 1.08812, chamber6); //ld
storeCoordinate(-2.83391, 1.04373, 1.08812, chamber6); //lu
storeCoordinate(-0.833914, 1.04373, -0.911881, chamber6); //rd
storeCoordinate(-2.83391, 1.04373, -0.911881, chamber6); //ru

//Chamber 7
var chamber7 = [];
storeCoordinate(-2.83391, 1.04373, 1.08812, chamber7); //ld
storeCoordinate(-4.88391, 1.04373, 1.08812, chamber7); //lu
storeCoordinate(-2.83391, 1.04373, -0.911881, chamber7); //rd
storeCoordinate(-4.88391, 1.04373, -0.911881, chamber7); //ru

//Chamber 8
var chamber8 = [];
storeCoordinate(-4.93391, 1.04373, 1.08812, chamber8); //ld
storeCoordinate(-6.93391, 1.04373, 1.08812, chamber8); //lu
storeCoordinate(-4.93391, 1.04373, -0.911881, chamber8); //rd
storeCoordinate(-6.93391, 1.04373, -0.911881, chamber8); //ru

//--------END CHAMBERS-------------//

//--------PAINTINGS-----------------//
//Front View
//Chamber 8
var coorDejeuner = []; //Done
storeCoordinate(-5.85562, 1.63947, 3.10141, coorDejeuner); //ld
storeCoordinate(-5.85562, 2.13541, 3.10141, coorDejeuner); //lu
storeCoordinate(-6.35155, 1.63947, 3.10141, coorDejeuner); //rd
storeCoordinate(-6.35155, 2.13541, 3.10141, coorDejeuner); //ru

var coorTheDance = []; //Done
storeCoordinate(-4.11019, 1.63947, 3.10141, coorTheDance); //ld
storeCoordinate(-4.11019, 2.13541, 3.10141, coorTheDance); //lu
storeCoordinate(-4.60613, 1.63947, 3.10141, coorTheDance); //rd
storeCoordinate(-4.60613, 2.13541, 3.10141, coorTheDance); //ru

var coorSunrise = []; //Done
storeCoordinate(-3.04645, 1.63947, 3.10141, coorSunrise); //ld
storeCoordinate(-3.04645, 2.13541, 3.10141, coorSunrise); //lu
storeCoordinate(-3.54239, 1.63947, 3.10141, coorSunrise); //rd
storeCoordinate(-3.54239, 2.13541, 3.10141, coorSunrise); //ru

var coorScream = []; //Done
storeCoordinate(-1.92753, 1.63947, 3.10141, coorScream); //ld
storeCoordinate(-1.92753, 2.13541, 3.10141, coorScream); //lu
storeCoordinate(-2.42347, 1.63947, 3.10141, coorScream); //rd
storeCoordinate(-2.42347, 2.13541, 3.10141, coorScream); //ru

var coorGuernica = []; //Done
storeCoordinate(-0.70248, 1.52928, -0.861823, coorGuernica); //ld
storeCoordinate(-0.70248, 2.2456, -0.861823, coorGuernica); //lu
storeCoordinate(-1.16417, 1.52928, -0.861823, coorGuernica); //rd
storeCoordinate(-1.16417, 2.2456, -0.861823, coorGuernica); //ru

var coorBoulevard = []; //Done
storeCoordinate(-1.01913, 1.63947, 3.10141, coorBoulevard); //ld
storeCoordinate(-1.01913, 2.13541, 3.10141, coorBoulevard); //lu
storeCoordinate(-1.51507, 1.63947, 3.10141, coorBoulevard); //rd
storeCoordinate(-1.51507, 2.13541, 3.10141, coorBoulevard); //ru

var coorSunday = []; //Done
storeCoordinate(-1.42347, 1.63947, -0.869044, coorSunday); //ld
storeCoordinate(-1.42347, 2.13541, -0.869044, coorSunday); //lu
storeCoordinate(-0.927528, 1.63947, -0.869044, coorSunday); //rd
storeCoordinate(-0.927528, 2.13541, -0.869044, coorSunday); //ru

var coorNight = []; //Done
storeCoordinate(-3.54239, 1.63947, -0.869044, coorNight); //ld
storeCoordinate(-3.54239, 2.13541, -0.869044, coorNight); //lu
storeCoordinate(-3.04645, 1.63947, -0.869044, coorNight); //rd
storeCoordinate(-3.04645, 2.13541, -0.869044, coorNight); //ru

var coorCezane = []; //Done
storeCoordinate(-2.42347, 1.63947, -0.869044, coorCezane); //ld
storeCoordinate(-2.42347, 2.13541, -0.869044, coorCezane); //lu
storeCoordinate(-1.92753, 1.63947, -0.869044, coorCezane); //rd
storeCoordinate(-1.92753, 2.13541, -0.869044, coorCezane); //ru

var coorGogh = []; //Done
storeCoordinate(0.630145, 1.77926, 3.08946, coorGogh); //ld
storeCoordinate(0.630145, 2.58057, 3.08946, coorGogh); //lu
storeCoordinate(-0.171167, 1.77926, 3.08946, coorGogh); //rd
storeCoordinate(-0.171167, 2.58057, 3.08946, coorGogh); //ru

var coorFourth = []; //Done
storeCoordinate(-6.35155, 1.63947, -0.869044, coorFourth); //ld
storeCoordinate(-6.35155, 2.13541, -0.869044, coorFourth); //lu
storeCoordinate(-5.85562, 1.63947, -0.869044, coorFourth); //rd
storeCoordinate(-5.85562, 2.13541, -0.869044, coorFourth); //ru

//--------END PAINTINGS-------------//
