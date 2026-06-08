// ChronoShift
// Split from the original single-file hackathon build for readability.

// ╔══════════════════════════════════════════════════════════════╗
//  CHRONOSHIFT — 4-Level Full Build
//  Transformation Pair System: same object, drawn differently per era
// ╚══════════════════════════════════════════════════════════════╝

const cv  = document.getElementById('cv');
const ctx = cv.getContext('2d');
const BASE_W=800, BASE_H=480;
let W=BASE_W, H=BASE_H;
const PAST='past', FUTURE='future';

function resizeCanvas(){
  const dpr=Math.max(1,window.devicePixelRatio||1);
  cv.width=Math.max(1,Math.floor(window.innerWidth*dpr));
  cv.height=Math.max(1,Math.floor(window.innerHeight*dpr));

  const screenAspect=window.innerWidth/window.innerHeight;
  const baseAspect=BASE_W/BASE_H;
  if(screenAspect>=baseAspect){
    H=BASE_H;
    W=BASE_H*screenAspect;
  }else{
    W=BASE_W;
    H=BASE_W/screenAspect;
  }
}
function fitCanvasToScreen(){
  const scale=cv.width/W;
  ctx.setTransform(scale,0,0,scale,0,0);
}
window.addEventListener('resize',resizeCanvas);
resizeCanvas();

// ── Global state ──────────────────────────────────────────────
let TL       = PAST;   // current timeline
let curLv    = 0;
let deaths   = 0;
let running  = false;
let keys     = {};
let relics   = 0;      // keys collected this session
let objState = {};     // id → true = collected/used

// ── Physics ───────────────────────────────────────────────────
const GRAV=0.55, JUMP=-13.2, SPD=4.3;
let player={};
function mkPlayer(x,y){
  return{x,y,w:26,h:36,vx:0,vy:0,onGround:false,alive:true,sCD:0,face:1};
}

// ── Particles ─────────────────────────────────────────────────
let parts=[];

function spawnRing(x,y,col,n,spd,sz,decay){
  for(let i=0;i<n;i++){
    const a=(Math.PI*2*i/n)+Math.random()*.7;
    const s=spd+Math.random()*spd*.6;
    parts.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1.2,
      life:1,decay:decay||.028,sz:sz||3,col,shape:'dot'});
  }
}
function spawnDust(x,y){          // PAST jump / switch
  for(let i=0;i<10;i++)
    parts.push({
      x:x+(Math.random()-.5)*36, y:y+Math.random()*16,
      vx:(Math.random()-.5)*.5, vy:-.35-Math.random()*.5,
      life:1, decay:.006+Math.random()*.006, sz:1.5+Math.random()*2,
      col:'#EF9F27', shape:'dot'
    });
}
function spawnSparks(x,y){        // FUTURE jump / switch
  for(let i=0;i<14;i++){
    const a=Math.random()*Math.PI*2, s=3+Math.random()*6;
    parts.push({
      x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,
      life:1,decay:.06+Math.random()*.05,sz:1.2+Math.random()*2,
      col:Math.random()>.5?'#5DCAA5':'#d0fff4',shape:'spark',
      tx:Math.cos(a)*.3, ty:Math.sin(a)*.3
    });
  }
}
function spawnRelicBurst(x,y){
  spawnRing(x,y,'#FAC775',20,4,4,.022);
  spawnRing(x,y,'#fff8e0',10,7,2,.03);
}
function spawnDeathBurst(x,y){
  if(TL===PAST) spawnDust(x,y);
  else spawnSparks(x,y);
  spawnRing(x,y,'#ff4466',16,5,4,.03);
}

// ── Camera ────────────────────────────────────────────────────
let cam={x:0,y:0};
function updCam(){
  const ld=LD();
  const lw=ld.w*40, lh=ld.h*40;
  cam.x+=(player.x-W/2+player.w/2-cam.x)*.09;
  cam.y+=(player.y-H/2+player.h/2-cam.y)*.09;
  cam.x=Math.max(0,Math.min(cam.x,lw-W));
  cam.y=Math.max(0,Math.min(cam.y,lh-H));
}

// ── Flash + Shake ─────────────────────────────────────────────
let flashA=0,flashCol='#fff';
let shk=0;
function flash(c,a){flashA=a;flashCol=c}
function shake(a){shk=a}

// ── Parallax ──────────────────────────────────────────────────
const PX=[
  {f:.06,shapes:[
    {x:30,y:260,w:22,h:220},{x:160,y:240,w:18,h:240},
    {x:310,y:255,w:26,h:225},{x:490,y:245,w:20,h:235},
    {x:650,y:260,w:24,h:220},{x:800,y:250,w:22,h:230},
    {x:960,y:258,w:20,h:222},{x:1120,y:244,w:24,h:236},
  ]},
  {f:.16,shapes:[
    {x:-20,y:310,w:130,h:170,arch:true},{x:240,y:305,w:120,h:175,arch:true},
    {x:490,y:310,w:130,h:170,arch:true},{x:730,y:308,w:120,h:172,arch:true},
    {x:970,y:312,w:128,h:168,arch:true},
  ]},
];

// ════════════════════════════════════════════════════════════════════
//  THE 5 TRANSFORMATION PAIRS
//
//  Pair 1 — WOODEN BRIDGE  : bridge_whole (past solid) ↔ bridge_broken (future gap)
//  Pair 2 — STONE IDOL     : idol_solid   (past wall)  ↔ idol_crumbled (future passable rubble)
//  Pair 3 — TEMPLE TORCH   : torch_lit    (past hazard) ↔ torch_cold   (future safe)
//  Pair 4 — SEALED DOOR    : door_sealed  (past wall)   ↔ door_open    (future open arch)
//  Pair 5 — SPIKE PIT      : pit_active   (past safe floor) ↔ pit_spikes (future death)
//           (floor tiles in past, spike field in future — reversal pair)
//
//  SPECIAL ITEMS:
//  - Ancient Key   (type:'key')    — standard key glyph, amber glow
//  - Time Crystal  (type:'crystal')— multi-facet gem, teal glow, L4 portal activator
//  - Temple Medal  (type:'medal')  — bronze disc, hidden
// ════════════════════════════════════════════════════════════════════
