/// --- First Person View Maze Game ---
var CANVAS = document.getElementById('game');
var CTX = CANVAS.getContext('2d');
var CANVAS_WIDTH = CANVAS.width = window.innerWidth;
var CANVAS_HEIGHT = CANVAS.height = innerHeight;

window.addEventListener('resize', function()
{
    CANVAS_WIDTH = CANVAS.width = innerWidth;
    CANVAS_HEIGHT = CANVAS.height = innerHeight;
});

/// Simple map: 0 = empty, 1 = wall, 2 = target (enemy)
var MAP_1 =
[
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var MAP_2 =
[
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];
var CURRENT_MAP = MAP_2;

var MAP_W = CURRENT_MAP[0].length, MAP_H = CURRENT_MAP.length, TILE = 64;

// Player
var player = {x: TILE*2.5, y: TILE*2.5, ang: 0, speed: 0, side:0, height: 32};
var keys = {};

// Mouse look
var pointerLocked = false;
var sens = 0.0025;
CANVAS.addEventListener('click',()=>{ if(!pointerLocked) CANVAS.requestPointerLock(); shoot(); });
document.addEventListener('pointerlockchange',()=>{pointerLocked = document.pointerLockElement===CANVAS; document.getElementById('hint').style.display = pointerLocked? 'none':'block'});
document.addEventListener('mousemove',e=>{ if(pointerLocked){ player.ang += e.movementX * sens; }});

// Input
addEventListener('keydown',e=>keys[e.key.toLowerCase()]=true);
addEventListener('keyup',e=>keys[e.key.toLowerCase()]=false);

// Raycasting parameters
var FOV = Math.PI/3; // 60deg
var DEPTH = 800;

function gameLoop(ts){ update(); render(); requestAnimationFrame(gameLoop); }

function update(){
  // movement
  var forward = (keys['w']?1:0) - (keys['s']?1:0);
  var strafe = (keys['d']?1:0) - (keys['a']?1:0);
  var mv = 2.2;
  var dx = Math.cos(player.ang)*forward*mv + Math.cos(player.ang+Math.PI/2)*strafe*mv;
  var dy = Math.sin(player.ang)*forward*mv + Math.sin(player.ang+Math.PI/2)*strafe*mv;
  tryMove(dx,dy);
}

function tryMove(dx,dy){
  var nx = player.x + dx;
  var ny = player.y + dy;
  if(!isWallAt(nx, player.y)) player.x = nx;
  if(!isWallAt(player.x, ny)) player.y = ny;
}

function isWallAt(px,py){
  var mx = Math.floor(px / TILE);
  var my = Math.floor(py / TILE);
  if(mx<0||mx>=MAP_W||my<0||my>=MAP_H) return true;
  return CURRENT_MAP[my][mx] === 1;
}

// Shooting: cast a single ray and check if hit tile 2
var score = 0;
function shoot(){
  // simple cooldown could be added
  var rayAng = player.ang;
  for(var d=0; d<DEPTH; d+=4){
    var rx = player.x + Math.cos(rayAng)*d;
    var ry = player.y + Math.sin(rayAng)*d;
    var mx = Math.floor(rx/TILE), my = Math.floor(ry/TILE);
    if(mx<0||mx>=MAP_W||my<0||my>=MAP_H) break;
    var tile = CURRENT_MAP[my][mx];
    if(tile === 1){ break; }
    if(tile === 2){ // hit target
      CURRENT_MAP[my][mx] = 0; score++;
      hitFlash();
      break;
    }
  }
}

var flash = 0;
function hitFlash(){ flash = 10; }

function render(){
  // clear
  CTX.fillStyle = '#738'; // ceiling
  CTX.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT/2);
  CTX.fillStyle = '#444'; // floor
  CTX.fillRect(0,CANVAS_HEIGHT/2,CANVAS_WIDTH,CANVAS_HEIGHT/2);

  // raycast columns
  for(var x=0; x<CANVAS_WIDTH; x+=2){
    var camX = (2 * x / CANVAS_WIDTH - 1);
    var rayAng = player.ang + camX * (FOV/2);
    // step ray
    var dist = 0; var hit=false; var tile=0;
    while(!hit && dist < DEPTH){
      dist += 2;
      var rx = player.x + Math.cos(rayAng)*dist;
      var ry = player.y + Math.sin(rayAng)*dist;
      var mx = Math.floor(rx/TILE), my = Math.floor(ry/TILE);
      if(mx<0||mx>=MAP_W||my<0||my>=MAP_H){ hit=true; tile=1; break; }
      tile = CURRENT_MAP[my][mx];
      if(tile !== 0) hit = true;
    }
    // fish-eye correction
    var corrected = dist * Math.cos(rayAng - player.ang);
    var sliceH = Math.min(CANVAS_HEIGHT, (TILE*CANVAS_HEIGHT)/corrected);

    // shading
    var shade = 1 - Math.min(1, corrected/600);
    if(tile === 1){ CTX.fillStyle = `rgba(${Math.floor(180*shade)},${Math.floor(120*shade)},${Math.floor(80*shade)},1)`; }
    else if(tile === 2){ CTX.fillStyle = `rgba(${Math.floor(220*shade)},${Math.floor(30*shade)},${Math.floor(30*shade)},1)`; }
    else { CTX.fillStyle = '#000'; }

    var px = x; var py = (CANVAS_HEIGHT/2) - sliceH/2;
    CTX.fillRect(px, py, 2, sliceH);
  }

  // simple mini-map
  var scale = 0.16; var mW = MAP_W * TILE * scale, mH = MAP_H*TILE*scale;
  CTX.fillStyle='rgba(0,0,0,0.6)'; CTX.fillRect(12,50,mW+8,mH+8);
  for(var my=0; my<MAP_H; my++) for(var mx=0; mx<MAP_W; mx++){
    var t=CURRENT_MAP[my][mx];
    if(t===1) CTX.fillStyle='#999';
    else if(t===2) CTX.fillStyle='#f55';
    else CTX.fillStyle='#222';
    CTX.fillRect(16+mx*TILE*scale,54+my*TILE*scale,TILE*scale-1,TILE*scale-1);
  }
  // player on minimap
  CTX.fillStyle='#0f0'; CTX.beginPath(); CTX.arc(16+player.x*scale,54+player.y*scale,4,0,Math.PI*2); CTX.fill();
  // view cone
  CTX.strokeStyle='rgba(0,255,0,0.2)'; CTX.beginPath(); CTX.moveTo(16+player.x*scale,54+player.y*scale);
  CTX.lineTo(16+(player.x+Math.cos(player.ang+FOV/2)*50)*scale,54+(player.y+Math.sin(player.ang+FOV/2)*50)*scale);
  CTX.moveTo(16+player.x*scale,54+player.y*scale);
  CTX.lineTo(16+(player.x+Math.cos(player.ang-FOV/2)*50)*scale,54+(player.y+Math.sin(player.ang-FOV/2)*50)*scale);
  CTX.stroke();

  // HUD
  CTX.fillStyle = 'white'; CTX.font='18px system-ui'; CTX.fillText('Score: '+score, 14, 42);

  // hit flash
  if(flash>0){ CTX.fillStyle='rgba(255,255,255,'+ (flash/12) +')'; CTX.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT); flash--; }
}

// start
requestAnimationFrame(gameLoop);

// small accessibility: click hint also focuses
CANVAS.style.cursor = 'crosshair';
