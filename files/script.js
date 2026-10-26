(function(){
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var ease=function(t){return 1-Math.pow(1-t,3)};
var $=function(s){return document.querySelector(s)};
/* beams background */
(function(){var cv=$('#beams'),cx=cv.getContext('2d'),W,Hh,B=[];
function mk(){return{x:Math.random()*W*1.5-W*.25,y:Math.random()*Hh*1.5-Hh*.25,w:30+Math.random()*60,l:Hh*2.5,a:-35+Math.random()*10,s:.6+Math.random()*1.2,o:.12+Math.random()*.16,h:190+Math.random()*70,p:Math.random()*6.28,ps:.02+Math.random()*.03}}
function reset(b,i,n){var sp=W/3;b.y=Hh+100;b.x=(i%3)*sp+sp/2+(Math.random()-.5)*sp*.5;b.w=100+Math.random()*100;b.s=.5+Math.random()*.4;b.h=190+i*70/n;b.o=.2+Math.random()*.1}
function draw(b){cx.save();cx.translate(b.x,b.y);cx.rotate(b.a*Math.PI/180);var o=b.o*(.8+Math.sin(b.p)*.2),g=cx.createLinearGradient(0,0,0,b.l),c='hsla('+b.h+',85%,65%,';g.addColorStop(0,c+'0)');g.addColorStop(.1,c+(o*.5)+')');g.addColorStop(.4,c+o+')');g.addColorStop(.6,c+o+')');g.addColorStop(.9,c+(o*.5)+')');g.addColorStop(1,c+'0)');cx.fillStyle=g;cx.fillRect(-b.w/2,0,b.w,b.l);cx.restore()}
function frame(){cx.clearRect(0,0,W,Hh);cx.filter='blur(35px)';B.forEach(function(b,i){b.y-=b.s;b.p+=b.ps;if(b.y+b.l<-100)reset(b,i,B.length);draw(b)});if(!reduce)requestAnimationFrame(frame)}
function size(){W=innerWidth;Hh=innerHeight;cv.width=W;cv.height=Hh;B=[];for(var i=0;i<30;i++)B.push(mk());if(reduce)frame()}
size();addEventListener('resize',size);frame()})();
/* brand glow */
var br=$('#brand');addEventListener('scroll',function(){br.classList.toggle('sc',scrollY>24)},{passive:true});
/* spotlight + stagger */
var cards=document.querySelectorAll('.c');
cards.forEach(function(c,i){c.style.transitionDelay=(i%4*70)+'ms';c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
/* ticks */
function ticks(el,f,n){n=n||+el.dataset.n||40;var s='';for(var i=0;i<n;i++)s+='<i></i>';el.innerHTML=s;el.querySelectorAll('i').forEach(function(x,i){setTimeout(function(){if(i/(n-1)<=f)x.classList.add('on')},reduce?0:300+i*16)})}
/* gauge */
function gauge(){var f=.2,n=56,s='';
  for(var i=0;i<=n;i++){var a=(180+i/n*180)*Math.PI/180,r2=i%7===0?112:118,on=i/n<=f;
    s+='<line x1="'+(136*Math.cos(a)).toFixed(1)+'" y1="'+(136*Math.sin(a)).toFixed(1)+'" x2="'+(r2*Math.cos(a)).toFixed(1)+'" y2="'+(r2*Math.sin(a)).toFixed(1)+'" stroke="'+(on?'#E8FF1F':'rgba(255,255,255,.3)')+'" stroke-width="3.2" stroke-linecap="round" style="opacity:0;animation:tk .4s '+i*14+'ms forwards"/>'}
  s+='<text y="-22" text-anchor="middle" font-family="Geist" font-weight="200" font-size="56" fill="#fff" letter-spacing="-2">1<tspan font-size="17" dy="-24" fill="rgba(255,255,255,.56)"> year</tspan></text><text y="2" text-anchor="middle" font-size="12" font-weight="500" fill="rgba(255,255,255,.45)" font-family="Geist">of experience</text>';
  $('#gauge').innerHTML=s}
/* counters */
function count(n){var to=+n.dataset.to,t0=performance.now();(function f(now){var t=reduce?1:Math.min(1,(now-t0)/1400);n.textContent=Math.round(to*ease(t));if(t<1)requestAnimationFrame(f)})(t0)}
/* clock */
function clk(){$('#clock').textContent=new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}clk();setInterval(clk,30000);
/* reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var c=e.target;io.unobserve(c);c.classList.add('in');
  c.querySelectorAll('.cnt').forEach(count);c.querySelectorAll('.tk').forEach(function(t){ticks(t,+t.dataset.f)});if(c.querySelector('#gauge'))gauge()})},{threshold:.18});
(document.fonts?document.fonts.ready:Promise.resolve()).then(function(){cards.forEach(function(c){io.observe(c)})});
})();
