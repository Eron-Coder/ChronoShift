// ChronoShift
// Split from the original single-file hackathon build for readability.

let lastT=0;
function loop(ts){
  requestAnimationFrame(loop);
  lastT=ts;
  fitCanvasToScreen();
  if(!running){
    ctx.clearRect(0,0,W,H);drawBG();return;
  }
  // Input
  if(player.alive){
    const L=keys['ArrowLeft']||keys['KeyA'];
    const R=keys['ArrowRight']||keys['KeyD'];
    player.vx=L?-SPD:R?SPD:0;
    if(player.sCD>0)player.sCD--;
  }
  updPhys();updItems();updCam();
  // Particles
  for(const p of parts){
    p.x+=p.vx;p.y+=p.vy;p.vy+=.06;p.life-=p.decay;
    if(p.shape==='spark'){p.vx*=.87;p.vy*=.87}
  }
  parts=parts.filter(p=>p.life>0);
  if(shk>0)shk=Math.max(0,shk-.42);
  // Draw
  ctx.save();
  if(shk>0)ctx.translate((Math.random()-.5)*shk,(Math.random()-.5)*shk);
  ctx.clearRect(-20,-20,W+40,H+40);
  drawBG();drawObjects();drawPlayer();drawParts();
  drawBanner();drawCrystalHint();drawFlash();
  ctx.restore();
}
initLevel(0);
requestAnimationFrame(loop);
