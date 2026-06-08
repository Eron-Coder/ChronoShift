// ChronoShift
// Split from the original single-file hackathon build for readability.

function LD(){return LEVELS[curLv]}

function initLevel(idx){
  curLv=idx;
  const ld=LD();
  TL=ld.startTL;
  player=mkPlayer(ld.playerStart.x,ld.playerStart.y);
  relics=0; parts=[];
  flashA=0; shk=0;
  cam={x:0,y:0};
  objState={};
  ld.objects.forEach(o=>{if(o.id)objState[o.id]=false});
  crystalCollected=false;
  updHUD();
}

let crystalCollected=false;

function updHUD(){
  document.getElementById('hl').textContent=curLv+1;
  document.getElementById('hd').textContent=deaths;
  document.getElementById('hk').textContent=relics;
  const ti=document.getElementById('ti');
  const tb=document.getElementById('tb');
  if(TL===PAST){ti.textContent='◈ PAST';ti.className='P';tb.className='P'}
  else{ti.textContent='◈ FUTURE';ti.className='F';tb.className='F'}
}

// ── Collision ─────────────────────────────────────────────────
function rc(a){return{l:a.x,r:a.x+a.w,t:a.y,b:a.y+a.h}}
function ov(a,b){
  const ra=rc(a),rb=rc(b);
  return ra.l<rb.r&&ra.r>rb.l&&ra.t<rb.b&&ra.b>rb.t;
}
function solid(o){
  if(o.t==='deco')return false;
  if(o.decor)return false;
  const inTL=(o.tl==='both'||o.tl===TL);
  if(!inTL)return false;
  if(o.t==='plat'||o.t==='wall')return true;
  if(o.t==='door'){
    return(o.keyId&&!objState[o.keyId])||(o.keyId2&&!objState[o.keyId2])||false;
  }
  return false;
}

function solidRects(o){
  if(o.vis==='bridge_broken'){
    if(o.shards){
      return o.shards.map(s=>({
        ...o,
        x:o.x+s.x,
        y:o.y+s.y,
        w:s.w,
        h:s.h,
        shards:null
      }));
    }
    const leftW=Math.floor(o.w*.3);
    const rightW=Math.floor(o.w*.3);
    return [
      {...o,w:leftW},
      {...o,x:o.x+o.w-rightW,w:rightW}
    ];
  }
  return [o];
}

function exitLocked(o){
  return (o.keyId&&!objState[o.keyId])||(o.needsCrystal&&!crystalCollected)||false;
}

// ── Physics ───────────────────────────────────────────────────
function updPhys(){
  if(!player.alive)return;
  player.vy+=GRAV;
  player.x+=player.vx;
  if(player.vx>0)player.face=1;
  if(player.vx<0)player.face=-1;
  const sl=LD().objects.filter(solid).flatMap(solidRects);
  for(const o of sl){
    if(ov(player,o)){
      const pr=rc(player),or=rc(o);
      const oL=pr.r-or.l,oR=or.r-pr.l;
      if(oL<oR)player.x=o.x-player.w; else player.x=o.x+o.w;
      player.vx=0;
    }
  }
  player.onGround=false;
  player.y+=player.vy;
  for(const o of sl){
    if(ov(player,o)){
      const pr=rc(player),or=rc(o);
      const oT=pr.b-or.t,oB=or.b-pr.t;
      if(oT<oB){player.y=o.y-player.h;player.vy=0;player.onGround=true}
      else{player.y=o.y+o.h;player.vy=0}
    }
  }
  const ld=LD();
  if(player.y>ld.h*40+140)killPlayer();
}

function killPlayer(){
  if(!player.alive)return;
  player.alive=false; deaths++;
  shake(9); flash('#ff2244',.8);
  spawnDeathBurst(player.x+player.w/2,player.y+player.h/2);
  setTimeout(()=>showOv('ds'),680);
  updHUD();
}

// ── Input ─────────────────────────────────────────────────────
document.addEventListener('keydown',e=>{
  if(!running)return;
  keys[e.code]=true;
  if(e.code==='KeyR'){restartLevel();return}
  if((e.code==='ArrowUp'||e.code==='KeyW'||e.code==='Space')
      &&player.onGround&&player.alive){
    player.vy=JUMP;
    const px=player.x+player.w/2, py=player.y+player.h;
    if(TL===PAST)spawnDust(px,py); else spawnSparks(px,py);
  }
  if((e.code==='KeyE'||e.code==='ShiftLeft'||e.code==='ShiftRight')
      &&player.alive&&player.sCD<=0){
    switchTL();
  }
});
document.addEventListener('keyup',e=>{keys[e.code]=false});

// ── Timeline switch (all 5 signals) ──────────────────────────
function switchTL(){
  TL=TL===PAST?FUTURE:PAST;
  player.sCD=16;
  // Signal 1 — flash
  flash(TL===PAST?'#EF9F27':'#5DCAA5',.42);
  // Signal 2 — shake
  shake(4);
  // Signal 3 — particles
  const px=player.x+player.w/2,py=player.y+player.h/2;
  if(TL===PAST)spawnDust(px,py); else spawnSparks(px,py);
  // Signal 4+5 — HUD + title update
  updHUD();
  // Death check (switched into solid)
  const sl=LD().objects.filter(solid).flatMap(solidRects);
  for(const o of sl)if(ov(player,o)){killPlayer();return}
}

// ── Items + hazards ───────────────────────────────────────────
function updItems(){
  if(!player.alive)return;
  const ld=LD();
  for(const o of ld.objects){
    if(o.id&&objState[o.id])continue;
    const inTL=(o.tl==='both'||o.tl===TL);
    if(!inTL)continue;

    if((o.t==='key'||o.t==='crystal'||o.t==='medal')&&ov(player,o)){
      objState[o.id]=true;
      if(o.t==='crystal'){crystalCollected=true}
      relics++;
      spawnRelicBurst(o.x+o.w/2,o.y+o.h/2);
      flash('#FAC775',.32);
      updHUD();
    }

    if(o.t==='spike'&&!o.decor&&!o.vis&&ov(player,o)){killPlayer();return}
    // visType spike-likes (torch_lit, pit_spikes, river_deep)
    if(o.t==='spike'&&!o.decor&&o.vis&&ov(player,o)){killPlayer();return}

    if(o.t==='exit'&&ov(player,o)){
      if(exitLocked(o))continue;
      levelComplete(); return;
    }
  }
}

function levelComplete(){
  running=false;
  if(curLv<LEVELS.length-1){
    const ld=LD();
    document.getElementById('lm').textContent=
      `"${ld.name}" sealed. The rift moves forward...`;
    showOv('ls');
  }else{
    showOv('ws');
  }
}

// ── Screens ───────────────────────────────────────────────────
function showOv(id){
  ['ss','ds','ls','ws'].forEach(s=>document.getElementById(s).classList.remove('show'));
  if(id)document.getElementById(id).classList.add('show');
}
function startGame(){deaths=0;initLevel(0);showOv(null);running=true;showBanner()}
function restartLevel(){initLevel(curLv);showOv(null);running=true;showBanner()}
function nextLevel(){initLevel(curLv+1);showOv(null);running=true;showBanner()}
function restartAll(){deaths=0;initLevel(0);showOv(null);running=true;showBanner()}
window.startGame=startGame;window.restartLevel=restartLevel;
window.nextLevel=nextLevel;window.restartAll=restartAll;

// ── Level banner ─────────────────────────────────────────────
let banTmr=0,banAlpha=0;
function showBanner(){banTmr=230}

// ═══════════════════════════════════════════════════════════════
//  RENDERING
// ═══════════════════════════════════════════════════════════════
