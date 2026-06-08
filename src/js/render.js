// ChronoShift
// Split from the original single-file hackathon build for readability.

let bgTick=0;

// ── Background ────────────────────────────────────────────────
function drawBG(){
  const isPast=TL===PAST;
  bgTick+=.015;
  // Sky gradient — warm ancient dark vs cool sealed vault dark
  const g=ctx.createLinearGradient(0,0,0,H);
  if(isPast){
    g.addColorStop(0,'#070300');g.addColorStop(.5,'#100800');g.addColorStop(1,'#180d02');
  }else{
    g.addColorStop(0,'#010705');g.addColorStop(.5,'#020e08');g.addColorStop(1,'#041410');
  }
  ctx.fillStyle=g;ctx.fillRect(0,0,W,H);

  // Parallax silhouettes
  for(const layer of PX){
    const ox=-cam.x*layer.f;
    const wrap=1300;
    ctx.save();
    ctx.globalAlpha=isPast?.045:.035;
    ctx.fillStyle=isPast?'#EF9F27':'#5DCAA5';
    for(const sh of layer.shapes){
      const sx=((sh.x+ox)%wrap+wrap)%wrap-120;
      if(sh.arch){
        ctx.fillRect(sx,sh.y+45,14,sh.h-45);
        ctx.fillRect(sx+sh.w-14,sh.y+45,14,sh.h-45);
        ctx.beginPath();ctx.arc(sx+sh.w/2,sh.y+45,sh.w/2,Math.PI,0);ctx.fill();
      }else{
        ctx.fillRect(sx,sh.y,sh.w,sh.h);
        ctx.fillRect(sx-5,sh.y,sh.w+10,10);
      }
    }
    ctx.restore();
  }

  // PAST: floating amber dust motes
  // FUTURE: vertical shimmer lines
  ctx.save();
  if(isPast){
    for(let i=0;i<14;i++){
      const mx=(Math.sin(bgTick*.28+i*2.3)*.5+.5)*W;
      const my=(Math.sin(bgTick*.18+i*1.4)*.5+.5)*H;
      const a=.035+.04*Math.sin(bgTick+i);
      ctx.beginPath();ctx.arc(mx,my,.8+Math.sin(bgTick+i)*.4,0,Math.PI*2);
      ctx.fillStyle=`rgba(239,159,39,${a})`;ctx.fill();
    }
  }else{
    for(let i=0;i<8;i++){
      const lx=(Math.sin(bgTick*.38+i*1.9)*.5+.5)*W;
      const a=.025+.025*Math.sin(bgTick*1.8+i);
      ctx.strokeStyle=`rgba(93,202,165,${a})`;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(lx,0);ctx.lineTo(lx+18,H);ctx.stroke();
    }
  }
  ctx.restore();

  // Subtle scanlines
  ctx.fillStyle='rgba(0,0,0,.035)';
  for(let y=0;y<H;y+=4)ctx.fillRect(0,y,W,1);
}

// ── Ghost objects ─────────────────────────────────────────────
function drawGhosts(){
  const otherTL=TL===PAST?FUTURE:PAST;
  ctx.save();
  for(const o of LD().objects){
    if(o.tl!==otherTL)continue;
    if(o.id&&objState[o.id])continue;
    if(o.t==='deco')continue;
    const ox=o.x-cam.x,oy=o.y-cam.y;
    if(ox>W+100||ox+o.w<-100||oy>H+100||oy+o.h<-100)continue;
    // Pair objects (interactive transformations) — brighter ghost
    const alpha=o.pair?.15:.05;
    ctx.globalAlpha=alpha;
    ctx.fillStyle=otherTL===PAST?'#EF9F27':'#5DCAA5';
    ctx.fillRect(ox,oy,o.w,o.h);
    if(o.pair){
      ctx.globalAlpha=alpha*1.6;
      ctx.strokeStyle=otherTL===PAST?'#EF9F27':'#5DCAA5';
      ctx.lineWidth=1;ctx.setLineDash([4,5]);
      ctx.strokeRect(ox+.5,oy+.5,o.w-1,o.h-1);
      ctx.setLineDash([]);
    }
  }
  ctx.restore();
}

// ══════════════════════════════════════════════════════════════
//  OBJECT RENDERERS — each pair has two distinct visual forms
// ══════════════════════════════════════════════════════════════

// ── Pair 1 — WOODEN BRIDGE ────────────────────────────────────
function drawBridgeWhole(ox,oy,ow,oh){
  // Solid planks — dark walnut with amber highlights
  const pw=18;
  for(let px=0;px<ow;px+=pw){
    const w2=Math.min(pw-2,ow-px);
    ctx.fillStyle=px%(pw*2)<pw?'#4e2608':'#5c2e0a';
    ctx.fillRect(ox+px,oy+5,w2,oh-5);
    ctx.fillStyle='#2e1504';ctx.fillRect(ox+px+w2,oy+5,2,oh-5);
  }
  // Support beams
  ctx.fillStyle='#3a1c06';ctx.fillRect(ox,oy+oh-6,ow,6);
  // Top surface rail
  ctx.fillStyle='#c87818';ctx.fillRect(ox,oy,ow,5);
  ctx.fillStyle='#EF9F27';ctx.fillRect(ox,oy,ow,2);
}
function drawBridgeShard(x,y,w,h,tilt=0){
  ctx.save();
  ctx.translate(x+w/2,y+h/2);
  ctx.rotate(tilt);
  ctx.translate(-w/2,-h/2);
  ctx.fillStyle='#2b1204';
  ctx.fillRect(0,4,w,h-4);
  for(let px=3;px<w;px+=15){
    ctx.fillStyle=px%30?'#3e1c06':'#241004';
    ctx.fillRect(px,5,Math.min(10,w-px),h-5);
  }
  ctx.fillStyle='#7a4010';
  ctx.fillRect(0,0,w,4);
  ctx.fillStyle='rgba(239,159,39,.22)';
  ctx.fillRect(0,0,w,1.5);
  ctx.strokeStyle='#5a2808';
  ctx.lineWidth=1;
  ctx.beginPath();
  ctx.moveTo(0,2);
  ctx.lineTo(5,h-1);
  ctx.moveTo(w,3);
  ctx.lineTo(w-6,h);
  ctx.stroke();
  ctx.restore();
}

function drawBridgeBroken(ox,oy,ow,oh,o){
  const t=performance.now()/1000;
  if(o&&o.shards){
    for(let i=0;i<o.shards.length;i++){
      const s=o.shards[i];
      const tilt=(i%2?-.09:.08)+Math.sin(t*1.4+i)*.025;
      drawBridgeShard(ox+s.x,oy+s.y,s.w,s.h,tilt);
      ctx.save();
      ctx.globalAlpha=.28;
      ctx.strokeStyle='#4a2208';
      ctx.lineWidth=1;
      ctx.beginPath();
      ctx.moveTo(ox+s.x+s.w/2,oy);
      ctx.lineTo(ox+s.x+s.w/2+Math.sin(t+i)*3,oy+s.y+2);
      ctx.stroke();
      ctx.restore();
    }
    ctx.save();
    ctx.globalAlpha=.06;
    ctx.fillStyle='#ff3300';
    ctx.fillRect(ox,oy-52,ow,oh+92);
    ctx.restore();
    return;
  }
  const sl=Math.floor(ow*.3);  // left stub length
  const sr=Math.floor(ow*.3);  // right stub length
  const gapX=ox+sl, gapW=ow-sl-sr;
  // Left stub
  for(let px=0;px<sl;px+=16){
    ctx.fillStyle='#3e1c06';ctx.fillRect(ox+px,oy+5,Math.min(13,sl-px),oh-5);
  }
  ctx.fillStyle='#7a4010';ctx.fillRect(ox,oy,sl,4);
  // Right stub
  for(let px=0;px<sr;px+=16){
    ctx.fillStyle='#3e1c06';ctx.fillRect(ox+ow-sr+px,oy+5,Math.min(13,sr-px),oh-5);
  }
  ctx.fillStyle='#7a4010';ctx.fillRect(ox+ow-sr,oy,sr,4);
  // Hanging splinters in gap
  for(let i=0;i<4;i++){
    const hx=gapX+i*(gapW/4)+Math.sin(t*1.1+i)*.8;
    const drop=6+i*4;
    ctx.save();ctx.globalAlpha=.5;
    ctx.fillStyle='#3e1c06';
    ctx.fillRect(hx,oy+4,7,oh+drop);
    ctx.restore();
  }
  // Break edge marks
  ctx.strokeStyle='#5a2808';ctx.lineWidth=1.5;
  ctx.beginPath();ctx.moveTo(gapX,oy);ctx.lineTo(gapX-3,oy+oh);ctx.stroke();
  ctx.beginPath();ctx.moveTo(gapX+gapW,oy);ctx.lineTo(gapX+gapW+3,oy+oh);ctx.stroke();
  // "Broken" tint over gap hint
  ctx.save();ctx.globalAlpha=.07;
  ctx.fillStyle='#ff3300';ctx.fillRect(gapX,oy,gapW,oh+20);
  ctx.restore();
}

// ── Pair 2 — STONE IDOL ───────────────────────────────────────
function drawIdolSolid(ox,oy,ow,oh){
  // Stone wall with carved face
  ctx.fillStyle='#22180a';ctx.fillRect(ox,oy,ow,oh);
  // Block seams
  ctx.strokeStyle='#332208';ctx.lineWidth=1.2;
  for(let r=0;r<Math.ceil(oh/28);r++){
    const by=oy+r*28;
    ctx.beginPath();ctx.moveTo(ox,by);ctx.lineTo(ox+ow,by);ctx.stroke();
    const off=(r%2)*14;
    for(let bx=ox+off;bx<ox+ow;bx+=28){
      ctx.beginPath();ctx.moveTo(bx,by);ctx.lineTo(bx,Math.min(by+28,oy+oh));ctx.stroke();
    }
  }
  // Idol face carving (centered)
  const cx=ox+ow/2, cy=oy+oh*.35;
  ctx.save();ctx.globalAlpha=.55;
  // Eyes
  ctx.fillStyle='#c87818';
  ctx.fillRect(cx-10,cy-8,7,7);ctx.fillRect(cx+3,cy-8,7,7);
  // Nose
  ctx.fillRect(cx-3,cy-2,6,5);
  // Mouth
  ctx.fillRect(cx-9,cy+8,18,4);
  ctx.restore();
  // Amber edge glow (PAST signal)
  ctx.fillStyle='#EF9F27';ctx.fillRect(ox,oy,3,oh);
  ctx.fillStyle='#EF9F27';ctx.fillRect(ox+ow-3,oy,3,oh);
}
function drawIdolCrumbled(ox,oy,ow,oh){
  // Rubble pile — irregular chunks
  const chunks=[
    {rx:0,ry:0,rw:24,rh:14},{rx:20,ry:2,rw:20,rh:12},
    {rx:38,ry:1,rw:18,rh:10},{rx:4,ry:12,rw:26,rh:10},
    {rx:28,ry:11,rw:22,rh:9},{rx:10,ry:8,rw:16,rh:6},
    {rx:48,ry:4,rw:16,rh:16},{rx:2,ry:18,rw:18,rh:8},
    {rx:18,ry:16,rw:24,rh:8},{rx:40,ry:14,rw:20,rh:10},
  ];
  for(const c of chunks){
    if(ox+c.rx>ox+ow||oy+c.ry>oy+oh)continue;
    const cols=['#2e1c08','#3a2410','#442c12'];
    ctx.fillStyle=cols[c.rx%3];
    const rw=Math.min(c.rw,ow-c.rx), rh=Math.min(c.rh,oh-c.ry);
    ctx.fillRect(ox+c.rx,oy+c.ry,rw,rh);
    ctx.strokeStyle='#1a1006';ctx.lineWidth=.8;
    ctx.strokeRect(ox+c.rx,oy+c.ry,rw,rh);
  }
  // Dust around base
  ctx.save();ctx.globalAlpha=.18;
  ctx.fillStyle='#c87818';ctx.fillRect(ox-6,oy+oh-4,ow+12,4);
  ctx.restore();
}

// ── Pair 3 — TEMPLE TORCH ────────────────────────────────────
function drawTorchLit(ox,oy,ow,oh){
  const t=performance.now()/1000;
  // Stone base
  ctx.fillStyle='#2a1608';ctx.fillRect(ox,oy+Math.floor(oh*.45),ow,Math.ceil(oh*.55));
  ctx.fillStyle='#7a5018';ctx.fillRect(ox,oy+Math.floor(oh*.45),ow,3);
  // Wooden handle
  ctx.fillStyle='#5a3008';ctx.fillRect(ox+Math.floor(ow/2)-3,oy+8,6,Math.floor(oh*.45));
  // Flame — flickering bezier
  const fl1=Math.sin(t*9)*2.5,fl2=Math.sin(t*13+1)*2;
  ctx.save();
  ctx.shadowBlur=20;ctx.shadowColor='#ff8800';
  // Outer flame
  ctx.beginPath();
  ctx.moveTo(ox+ow/2,oy+oh*.42);
  ctx.bezierCurveTo(ox+ow/2-9+fl1,oy+oh*.24,ox+ow/2+7+fl2,oy+oh*.08,ox+ow/2+fl2*.5,oy+2);
  ctx.bezierCurveTo(ox+ow/2-5-fl1,oy+oh*.1,ox+ow/2+9,oy+oh*.28,ox+ow/2,oy+oh*.42);
  ctx.fillStyle='#ff5500';ctx.fill();
  // Inner flame
  ctx.beginPath();
  ctx.moveTo(ox+ow/2,oy+oh*.4);
  ctx.bezierCurveTo(ox+ow/2-5+fl1*.5,oy+oh*.27,ox+ow/2+4,oy+oh*.14,ox+ow/2+fl2*.3,oy+6);
  ctx.bezierCurveTo(ox+ow/2-3,oy+oh*.16,ox+ow/2+5,oy+oh*.3,ox+ow/2,oy+oh*.4);
  ctx.fillStyle='#ffcc00';ctx.fill();
  ctx.shadowBlur=0;
  ctx.restore();
  // Danger tint
  ctx.save();ctx.globalAlpha=.12;
  ctx.fillStyle='#ff3300';ctx.fillRect(ox,oy,ow,oh);
  ctx.restore();
}
function drawTorchCold(ox,oy,ow,oh){
  // Extinguished pedestal — grey, no glow
  ctx.fillStyle='#1e1610';ctx.fillRect(ox,oy,ow,oh);
  ctx.fillStyle='#2a2016';ctx.fillRect(ox,oy,ow,3);
  ctx.fillStyle='#181008';ctx.fillRect(ox+ow/2-2,oy+4,4,oh*.45);
  // Ash residue
  ctx.save();ctx.globalAlpha=.25;
  ctx.fillStyle='#a09080';ctx.fillRect(ox+ow/2-4,oy+2,8,4);
  ctx.restore();
  // Teal "safe" tint
  ctx.save();ctx.globalAlpha=.08;
  ctx.fillStyle='#5DCAA5';ctx.fillRect(ox,oy,ow,oh);
  ctx.restore();
}

// ── Pair 4 — SEALED DOOR (deco only, wall handled as solid) ───
function drawDoorSealed(ox,oy,ow,oh){
  // Massive stone door — same draw as idol wall variant
  ctx.fillStyle='#1c1408';ctx.fillRect(ox,oy,ow,oh);
  ctx.strokeStyle='#3a2a10';ctx.lineWidth=1.5;
  for(let r=0;r<Math.ceil(oh/30);r++){
    ctx.beginPath();ctx.moveTo(ox,oy+r*30);ctx.lineTo(ox+ow,oy+r*30);ctx.stroke();
  }
  // Sealed rune in centre
  const cx=ox+ow/2,cy=oy+oh*.4;
  ctx.save();ctx.globalAlpha=.5;
  ctx.beginPath();ctx.arc(cx,cy,10,0,Math.PI*2);
  ctx.strokeStyle='#cc4400';ctx.lineWidth=2;ctx.stroke();
  ctx.fillStyle='#cc4400';ctx.fillRect(cx-6,cy-1,12,2);
  ctx.fillRect(cx-1,cy-6,2,12);
  ctx.restore();
  ctx.fillStyle='#cc4400';ctx.fillRect(ox,oy,3,oh);
  ctx.fillStyle='#cc4400';ctx.fillRect(ox+ow-3,oy,3,oh);
}
function drawDoorOpen(ox,oy,ow,oh){
  // Open archway — just the frame, no fill
  ctx.save();ctx.globalAlpha=.35;
  ctx.strokeStyle='#5DCAA5';ctx.lineWidth=3;
  // Left post
  ctx.strokeRect(ox,oy+Math.floor(oh*.2),6,Math.ceil(oh*.8));
  // Right post
  ctx.strokeRect(ox+ow-6,oy+Math.floor(oh*.2),6,Math.ceil(oh*.8));
  // Arch top
  ctx.beginPath();
  ctx.arc(ox+ow/2,oy+Math.floor(oh*.2),ow/2,Math.PI,0);
  ctx.stroke();
  ctx.restore();
}

// ── Pair 5 — SPIKE PIT ───────────────────────────────────────
function drawPitFloor(ox,oy,ow,oh){
  // Stone tiles — same as standard platform, PAST colour
  ctx.fillStyle='#24180a';ctx.fillRect(ox,oy,ow,oh);
  ctx.strokeStyle='#3a2810';ctx.lineWidth=1;
  for(let bx=ox+30;bx<ox+ow;bx+=30){
    ctx.beginPath();ctx.moveTo(bx,oy);ctx.lineTo(bx,oy+oh);ctx.stroke();
  }
  ctx.fillStyle='#c87818';ctx.fillRect(ox,oy,ow,3);
  ctx.fillStyle='#EF9F27';ctx.fillRect(ox,oy,ow,1.5);
}
function drawPitSpikes(ox,oy,ow,oh){
  // Same x/y as the floor — spikes erupt upward
  // Dark pit base
  ctx.fillStyle='#0a0604';ctx.fillRect(ox,oy,ow,oh);
  const cnt=Math.max(1,Math.floor(ow/16));
  const sw=ow/cnt;
  for(let i=0;i<cnt;i++){
    ctx.beginPath();
    ctx.moveTo(ox+i*sw,oy+oh);
    ctx.lineTo(ox+i*sw+sw/2,oy);
    ctx.lineTo(ox+(i+1)*sw,oy+oh);
    ctx.closePath();
    ctx.fillStyle='#cc2244';ctx.fill();
    ctx.strokeStyle='#ff4466';ctx.lineWidth=.8;ctx.stroke();
    // Highlight edge
    ctx.strokeStyle='rgba(255,80,100,.4)';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(ox+i*sw+sw/2,oy);ctx.lineTo(ox+i*sw,oy+oh);ctx.stroke();
  }
  // Danger glow
  ctx.save();ctx.globalAlpha=.2;
  ctx.fillStyle='#ff2244';ctx.fillRect(ox,oy,ow,oh);
  ctx.restore();
}

// ── Standard platform ─────────────────────────────────────────
function drawPlat(ox,oy,ow,oh){
  const isPast=TL===PAST;
  ctx.fillStyle=isPast?'#221608':'#081814';
  ctx.fillRect(ox,oy,ow,oh);
  if(isPast){
    ctx.strokeStyle='#5a3c10';ctx.lineWidth=1.3;
    ctx.strokeRect(ox+1,oy+1,ow-2,oh-2);
    ctx.fillStyle='#c87818';ctx.fillRect(ox,oy,ow,4);
    ctx.fillStyle='#EF9F27';ctx.fillRect(ox,oy,ow,1.8);
    // Block seam hints
    ctx.strokeStyle='rgba(58,36,8,.6)';ctx.lineWidth=.8;
    for(let bx=ox+36;bx<ox+ow;bx+=36){
      ctx.beginPath();ctx.moveTo(bx,oy);ctx.lineTo(bx,oy+oh);ctx.stroke();
    }
  }else{
    ctx.save();ctx.shadowBlur=5;ctx.shadowColor='#5DCAA5';
    ctx.strokeStyle='#1D9E75';ctx.lineWidth=1.4;
    ctx.strokeRect(ox+1,oy+1,ow-2,oh-2);
    ctx.fillStyle='#5DCAA5';ctx.fillRect(ox,oy,ow,2.5);
    ctx.shadowBlur=0;ctx.restore();
    ctx.strokeStyle='rgba(29,158,117,.18)';ctx.lineWidth=.6;
    for(let bx=ox+24;bx<ox+ow;bx+=24){
      ctx.beginPath();ctx.moveTo(bx,oy);ctx.lineTo(bx,oy+oh);ctx.stroke();
    }
  }
}

// ── Standard spike (non-pair) ─────────────────────────────────
function drawSpikeStd(ox,oy,ow,oh){
  const cnt=Math.max(1,Math.floor(ow/16));
  const sw=ow/cnt;
  for(let i=0;i<cnt;i++){
    ctx.beginPath();
    ctx.moveTo(ox+i*sw,oy+oh);
    ctx.lineTo(ox+i*sw+sw/2,oy);
    ctx.lineTo(ox+(i+1)*sw,oy+oh);
    ctx.closePath();
    ctx.fillStyle='#cc2244';ctx.fill();
    ctx.strokeStyle='#ff4466';ctx.lineWidth=.8;ctx.stroke();
  }
}

// ── Key ───────────────────────────────────────────────────────
function drawKey(ox,oy,ow,oh,id){
  if(objState[id])return;
  const t=performance.now()/1000;
  const bob=Math.sin(t*2.6+ox*.01)*4;
  ctx.save();ctx.translate(ox+ow/2,oy+oh/2+bob);
  ctx.shadowBlur=16;ctx.shadowColor='#FAC775';
  // Ring
  ctx.beginPath();ctx.arc(0,-8,10,0,Math.PI*2);
  ctx.strokeStyle='#FAC775';ctx.lineWidth=2.8;ctx.stroke();
  ctx.beginPath();ctx.arc(0,-8,5,0,Math.PI*2);
  ctx.strokeStyle='#EF9F27';ctx.lineWidth=1.4;ctx.stroke();
  // Shaft
  ctx.beginPath();
  ctx.moveTo(0,2);ctx.lineTo(0,14);
  ctx.moveTo(0,7);ctx.lineTo(5,7);
  ctx.moveTo(0,12);ctx.lineTo(4,12);
  ctx.strokeStyle='#FAC775';ctx.lineWidth=2.4;ctx.stroke();
  ctx.shadowBlur=0;ctx.restore();
}

// ── Time Crystal ──────────────────────────────────────────────
function drawCrystal(ox,oy,ow,oh,id){
  if(objState[id])return;
  const t=performance.now()/1000;
  const bob=Math.sin(t*2.2+ox*.01)*5;
  const spin=t*.8;
  ctx.save();ctx.translate(ox+ow/2,oy+oh/2+bob);ctx.rotate(spin);
  ctx.shadowBlur=20;ctx.shadowColor='#5DCAA5';
  // Multi-facet gem shape
  const pts=[[0,-14],[10,-5],[10,7],[0,14],[-10,7],[-10,-5]];
  ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);
  for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);
  ctx.closePath();
  ctx.fillStyle='rgba(93,202,165,.3)';ctx.fill();
  ctx.strokeStyle='#5DCAA5';ctx.lineWidth=2;ctx.stroke();
  // Inner facets
  ctx.beginPath();ctx.moveTo(0,-14);ctx.lineTo(0,14);ctx.strokeStyle='rgba(93,202,165,.4)';ctx.lineWidth=1;ctx.stroke();
  ctx.beginPath();ctx.moveTo(-10,-5);ctx.lineTo(10,7);ctx.stroke();
  ctx.beginPath();ctx.moveTo(10,-5);ctx.lineTo(-10,7);ctx.stroke();
  // Core glow
  ctx.shadowBlur=10;ctx.fillStyle='rgba(255,255,255,.6)';
  ctx.beginPath();ctx.arc(0,0,3,0,Math.PI*2);ctx.fill();
  ctx.shadowBlur=0;ctx.restore();
}

// ── Temple Medal ─────────────────────────────────────────────
function drawMedal(ox,oy,ow,oh,id){
  if(objState[id])return;
  const t=performance.now()/1000;
  const bob=Math.sin(t*3+ox*.01)*3;
  ctx.save();ctx.translate(ox+ow/2,oy+oh/2+bob);
  ctx.shadowBlur=12;ctx.shadowColor='#b87820';
  // Bronze disc
  ctx.beginPath();ctx.arc(0,0,11,0,Math.PI*2);
  ctx.fillStyle='#9a6010';ctx.fill();
  ctx.strokeStyle='#d4941e';ctx.lineWidth=2;ctx.stroke();
  ctx.beginPath();ctx.arc(0,0,6,0,Math.PI*2);
  ctx.strokeStyle='#c87818';ctx.lineWidth=1;ctx.stroke();
  // Star mark
  ctx.fillStyle='#e8a820';ctx.font='bold 8px monospace';ctx.textAlign='center';
  ctx.fillText('★',0,3);
  ctx.shadowBlur=0;ctx.restore();
}

// ── Door ──────────────────────────────────────────────────────
function drawDoor(ox,oy,ow,oh,o){
  const locked=(o.keyId&&!objState[o.keyId])||(o.keyId2&&!objState[o.keyId2])||false;
  const t=performance.now()/1000;
  ctx.fillStyle=locked?'#2e0e04':'#041c0e';
  ctx.fillRect(ox,oy,ow,oh);
  const gc=locked?'#cc4400':'#22cc66';
  ctx.save();ctx.shadowBlur=locked?7+Math.sin(t*4)*3:5;ctx.shadowColor=gc;
  ctx.strokeStyle=gc;ctx.lineWidth=2;
  ctx.strokeRect(ox+1,oy+1,ow-2,oh-2);ctx.restore();
  // Arch
  ctx.save();ctx.globalAlpha=.25;ctx.fillStyle=gc;
  ctx.beginPath();ctx.arc(ox+ow/2,oy+4,ow/2-2,Math.PI,0);ctx.fill();
  ctx.restore();
  // Lock symbol
  if(locked){
    ctx.save();ctx.shadowBlur=8;ctx.shadowColor='#ff6600';
    ctx.beginPath();ctx.arc(ox+ow/2,oy+oh*.56,6,0,Math.PI*2);
    ctx.fillStyle='#cc4400';ctx.fill();ctx.restore();
  }
}

// ── Exit portal ───────────────────────────────────────────────
function drawExit(ox,oy,ow,oh,o){
  const t=performance.now()/1000;
  const cx=ox+ow/2,cy=oy+oh/2;
  const r=Math.min(ow,oh)/2-5;
  const locked=o&&exitLocked(o);
  const glowCol=locked?'#4a8870':'#5DCAA5';
  const alpha=locked?.35:1;
  ctx.save();ctx.globalAlpha=alpha;
  // Pulsing rings
  for(let i=3;i>=0;i--){
    const pf=1+.09*Math.sin(t*2.5+i);
    const rg=ctx.createRadialGradient(cx,cy,0,cx,cy,r*(1+i*.14)*pf);
    rg.addColorStop(0,`rgba(93,202,165,${.15-i*.03})`);
    rg.addColorStop(1,'rgba(93,202,165,0)');
    ctx.beginPath();ctx.arc(cx,cy,r*(1+i*.14)*pf,0,Math.PI*2);
    ctx.fillStyle=rg;ctx.fill();
  }
  ctx.shadowBlur=locked?6:16;ctx.shadowColor=glowCol;
  ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);
  ctx.strokeStyle=glowCol;ctx.lineWidth=2.5;ctx.stroke();
  // Inner spiral
  ctx.shadowBlur=4;
  ctx.beginPath();ctx.arc(cx,cy,r*.5,t%(Math.PI*2),(t+2)%(Math.PI*2));
  ctx.strokeStyle=`rgba(93,202,165,${locked?.2:.5})`;ctx.lineWidth=1.5;ctx.stroke();
  // Arrow or lock if requirements are missing
  ctx.shadowBlur=5;ctx.strokeStyle=locked?'rgba(255,255,255,.3)':'#fff';
  ctx.lineWidth=2;
  if(locked){
    // Lock icon
    ctx.beginPath();ctx.arc(cx,cy-2,5,Math.PI,0);ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.3)';ctx.fillRect(cx-5,cy-2,10,8);
  }else{
    ctx.beginPath();ctx.moveTo(cx-7,cy);ctx.lineTo(cx+7,cy);
    ctx.moveTo(cx+1,cy-5);ctx.lineTo(cx+7,cy);ctx.lineTo(cx+1,cy+5);
    ctx.stroke();
  }
  ctx.restore();
}

// ── Player ────────────────────────────────────────────────────
function drawPlayer(){
  if(!player.alive)return;
  const isPast=TL===PAST;
  const gc=isPast?'#EF9F27':'#5DCAA5';
  const bc=isPast?'#c87818':'#1D9E75';
  const body=isPast?'#3c2006':'#041c10';
  const px=player.x-cam.x,py=player.y-cam.y;
  ctx.save();ctx.translate(px+player.w/2,py+player.h/2);
  if(player.face===-1)ctx.scale(-1,1);
  ctx.shadowBlur=14;ctx.shadowColor=gc;
  // Cloak
  ctx.fillStyle=body;ctx.fillRect(-13,-18,26,36);
  // Chest armour
  ctx.fillStyle=bc;ctx.fillRect(-8,-13,16,22);
  // Chest highlight
  ctx.fillStyle=gc;ctx.globalAlpha=.28;ctx.fillRect(-7,-13,6,20);ctx.globalAlpha=1;
  // Head
  ctx.fillStyle=bc;ctx.fillRect(-8,-27,16,14);
  // Eyes
  ctx.shadowBlur=6;ctx.shadowColor=gc;ctx.fillStyle=gc;
  ctx.fillRect(-5,-24,4,4);ctx.fillRect(1,-24,4,4);
  // Scarf
  ctx.fillStyle=isPast?'#7a4008':'#085028';ctx.fillRect(-9,-13,18,5);
  // Era sigil on chest
  ctx.shadowBlur=7;ctx.font='bold 10px monospace';ctx.textAlign='center';
  ctx.fillStyle=gc;ctx.fillText(isPast?'⟨':'⟩',0,12);
  ctx.restore();
}

// ── Particles ─────────────────────────────────────────────────
function drawParts(){
  for(const p of parts){
    ctx.save();ctx.globalAlpha=Math.max(0,p.life);
    if(p.shape==='spark'){
      ctx.strokeStyle=p.col;ctx.lineWidth=p.sz*.5;
      ctx.beginPath();
      ctx.moveTo(p.x-cam.x,p.y-cam.y);
      ctx.lineTo(p.x-cam.x-p.vx*3,p.y-cam.y-p.vy*3);
      ctx.stroke();
    }else{
      ctx.beginPath();ctx.arc(p.x-cam.x,p.y-cam.y,Math.max(.5,p.sz*p.life),0,Math.PI*2);
      ctx.fillStyle=p.col;ctx.shadowBlur=4;ctx.shadowColor=p.col;ctx.fill();
    }
    ctx.restore();
  }
}

// ── Flash ─────────────────────────────────────────────────────
function drawFlash(){
  if(flashA<=0)return;
  ctx.save();ctx.globalAlpha=flashA;ctx.fillStyle=flashCol;ctx.fillRect(0,0,W,H);
  ctx.restore();flashA=Math.max(0,flashA-.038);
}

// ── Banner ────────────────────────────────────────────────────
function drawBanner(){
  if(banTmr<=0)return;
  banTmr--;
  banAlpha=Math.min(1,banTmr/28)*Math.min(1,(230-banTmr)/28);
  if(banAlpha<=0)return;
  const ld=LD();
  const isPast=TL===PAST;
  const col=isPast?'#EF9F27':'#5DCAA5';
  ctx.save();ctx.globalAlpha=banAlpha;
  // Sub label
  ctx.font="12px 'Share Tech Mono'";ctx.textAlign='center';
  ctx.fillStyle='rgba(255,255,255,.4)';
  ctx.fillText(`ROOM ${curLv+1} — ${ld.sub}`,W/2,H/2-34);
  // Big name
  ctx.font="900 28px 'Cinzel'";
  ctx.shadowBlur=22;ctx.shadowColor=col;ctx.fillStyle=col;
  ctx.fillText(ld.name,W/2,H/2);
  // Hint
  ctx.font="13px 'Share Tech Mono'";
  ctx.shadowBlur=0;ctx.fillStyle='rgba(255,255,255,.38)';
  ctx.fillText(ld.hint,W/2,H/2+30);
  ctx.restore();
}

// ── HUD tooltip: crystal needed ────────────────────────────────
function drawCrystalHint(){
  const ld=LD();
  if(!ld.exitNeedsCrystal||crystalCollected)return;
  const t=performance.now()/1000;
  const a=.35+.2*Math.sin(t*2);
  ctx.save();ctx.globalAlpha=a;
  ctx.font="11px 'Share Tech Mono'";ctx.textAlign='center';
  ctx.fillStyle='#5DCAA5';
  ctx.fillText('[ Find the Time Crystal to activate the portal ]',W/2,H-18);
  ctx.restore();
}

// ── Master object draw ────────────────────────────────────────
function drawObjects(){
  const ld=LD();
  for(const o of ld.objects){
    const ox=o.x-cam.x,oy=o.y-cam.y;
    if(ox>W+130||ox+o.w<-130||oy>H+130||oy+o.h<-130)continue;
    const inTL=(o.tl==='both'||o.tl===TL);
    const v=o.vis||'';
    ctx.save();
    ctx.globalAlpha=inTL?1:.055;

    if(o.t==='plat'||o.t==='wall'){
      if(v==='bridge_whole')   drawBridgeWhole(ox,oy,o.w,o.h);
      else if(v==='bridge_broken')drawBridgeBroken(ox,oy,o.w,o.h,o);
      else if(v==='torch_cold')drawTorchCold(ox,oy,o.w,o.h);
      else if(v==='river_dry') drawPitFloor(ox,oy,o.w,o.h);  // dry bed = floor texture
      else if(v==='idol_solid')   drawIdolSolid(ox,oy,o.w,o.h);
      else if(v==='idol_crumbled')drawIdolCrumbled(ox,oy,o.w,o.h);
      else if(v==='door_sealed')  drawDoorSealed(ox,oy,o.w,o.h);
      else if(v==='pit_floor')    drawPitFloor(ox,oy,o.w,o.h);
      else if(v==='gate_open')  { /* open arch — drawn via deco */ }
      else                        drawPlat(ox,oy,o.w,o.h);
    }
    else if(o.t==='spike'){
      if(v==='torch_lit')  drawTorchLit(ox,oy,o.w,o.h);
      else if(v==='pit_spikes')drawPitSpikes(ox,oy,o.w,o.h);
      else if(v==='river_deep'){
        // River — dark water
        ctx.fillStyle='#04101a';ctx.fillRect(ox,oy,o.w,o.h);
        const t=performance.now()/1e3;
        for(let wi=0;wi<4;wi++){
          ctx.globalAlpha=(.08+wi*.04)*inTL;
          ctx.fillStyle='#0a4060';
          ctx.fillRect(ox+Math.sin(t*1.4+wi)*8,oy+(o.h*wi/4|0),o.w,o.h/4+2);
        }
        ctx.globalAlpha=inTL?.3:.03;
        ctx.strokeStyle='#1a8090';ctx.lineWidth=1.5;
        for(let si=0;si<Math.floor(o.w/22);si++){
          const sx=ox+si*22+Math.sin(t*2+si)*4;
          ctx.beginPath();ctx.moveTo(sx,oy+3);ctx.lineTo(sx+10,oy+3);ctx.stroke();
        }
      }
      else drawSpikeStd(ox,oy,o.w,o.h);
    }
    else if(o.t==='deco'){
      if(v==='door_open')drawDoorOpen(ox,oy,o.w,o.h);
    }
    ctx.restore();

    // Items (always use inTL check internally)
    if(!inTL)continue;
    if(o.t==='key')     drawKey(ox,oy,o.w,o.h,o.id);
    if(o.t==='crystal') drawCrystal(ox,oy,o.w,o.h,o.id);
    if(o.t==='medal')   drawMedal(ox,oy,o.w,o.h,o.id);
    if(o.t==='door')    drawDoor(ox,oy,o.w,o.h,o);
    if(o.t==='exit')    drawExit(ox,oy,o.w,o.h,o);
  }
}

// ── Pair label nudge ─────────────────────────────────────────
function drawPairLabels(){
  const t=performance.now()/1e3;
  const drawn=new Set();
  for(const o of LD().objects){
    if(!o.pair||drawn.has(o.pair))continue;
    if(o.tl!==TL&&o.tl!=='both')continue;
    drawn.add(o.pair);
    const ox=o.x-cam.x,oy=o.y-cam.y;
    if(ox<-50||ox>W+50)continue;
    ctx.save();
    ctx.globalAlpha=.22+.1*Math.sin(t*2.2);
    ctx.font="9px 'Share Tech Mono'";ctx.textAlign='center';
    ctx.fillStyle=TL===PAST?'#EF9F27':'#5DCAA5';
    ctx.fillText(TL===PAST?'— PAST FORM —':'— FUTURE FORM —',ox+o.w/2,oy-5);
    ctx.restore();
  }
}

// ═══════════════════════════════════════════════════════════════
//  MAIN LOOP
// ═══════════════════════════════════════════════════════════════
