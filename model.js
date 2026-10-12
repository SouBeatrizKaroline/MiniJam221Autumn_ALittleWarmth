export const W=1100,H=680;
export const levels=[
 {name:'The First Nest',subtitle:'A little bird, a little blanket. Guide six leaves into the nest.',time:100,spawn:[[320,80]],shelters:[{x:685,y:510,need:6,type:'bird',name:'Robin'}],obstacles:[],water:[]},
 {name:'Hedgehog Hollow',subtitle:'The branches bend the breeze. Tuck both friends in.',time:115,spawn:[[240,85],[720,100]],shelters:[{x:380,y:592,need:7,type:'hedgehog',name:'Hazel'},{x:840,y:580,need:7,type:'hedgehog',name:'Pip'}],obstacles:[{x:410,y:345,w:220,h:20}],water:[]},
 {name:'Across the Brook',subtitle:'Wet leaves cannot keep anyone warm. Lift them over the water.',time:125,spawn:[[210,100],[370,100]],shelters:[{x:805,y:565,need:9,type:'rabbit',name:'Clover'}],obstacles:[],water:[{x:450,w:220}]},
 {name:'Squirrel Heights',subtitle:'A nest above, a hollow below. Share the autumn harvest.',time:145,spawn:[[300,65],[850,70]],shelters:[{x:700,y:320,need:8,type:'squirrel',name:'Maple'},{x:360,y:575,need:8,type:'bird',name:'Robin'}],obstacles:[{x:570,y:430,w:330,h:22}],water:[]},
 {name:'Before the Frost',subtitle:'The last cold evening. Give every friend a warm place to sleep.',time:160,spawn:[[210,60],[550,65],[880,70]],shelters:[{x:260,y:570,need:8,type:'hedgehog',name:'Hazel'},{x:565,y:385,need:8,type:'squirrel',name:'Maple'},{x:875,y:570,need:8,type:'rabbit',name:'Clover'}],obstacles:[{x:395,y:460,w:140,h:18},{x:690,y:330,w:160,h:18}],water:[{x:620,w:110}]}
];
export function createState(index=0,random=Math.random){return{index,level:levels[index],random,time:levels[index].time,elapsed:0,spawnClock:0,leaves:[],shelters:levels[index].shelters.map(s=>({...s,count:0})),wind:{x:0,y:0},delivered:0,lost:0,status:'playing',events:[]};}
export function spawnLeaf(s){const p=s.level.spawn[Math.floor(s.random()*s.level.spawn.length)];s.leaves.push({x:p[0]+(s.random()-.5)*130,y:p[1],vx:(s.random()-.5)*35,vy:15,angle:s.random()*6.28,spin:(s.random()-.5)*3,color:Math.floor(s.random()*4),age:0});}
export function step(s,dt){if(s.status!=='playing')return;dt=Math.min(dt,.05);s.events=[];s.time=Math.max(0,s.time-dt);s.elapsed+=dt;s.spawnClock-=dt;if(s.spawnClock<=0){if(s.leaves.length<65)spawnLeaf(s);s.spawnClock=.7;}const remaining=[];
 for(const l of s.leaves){l.age+=dt;l.vx+=(s.wind.x*260-l.vx*1.45+Math.sin(s.elapsed*2+l.angle)*16)*dt;l.vy+=(65+s.wind.y*260-l.vy*.9)*dt;l.x+=l.vx*dt;l.y+=l.vy*dt;l.angle+=l.spin*dt;
  l.x=Math.max(12,Math.min(W-12,l.x));if(l.y<25){l.y=25;l.vy=Math.max(0,l.vy);}for(const b of s.level.obstacles){if(l.x>b.x-7&&l.x<b.x+b.w+7&&l.y>b.y-9&&l.y<b.y+b.h+8){if(l.vy>=0){l.y=b.y-10;l.vy=-Math.abs(l.vy)*.25;l.vx+=20*dt;}else{l.y=b.y+b.h+9;l.vy=12;}}}
  const home=s.shelters.find(h=>h.count<h.need&&Math.abs(l.x-h.x)<57&&Math.abs(l.y-(h.y-12))<35);if(home){home.count++;s.delivered++;s.events.push({type:'home',x:home.x,y:home.y});continue;}
  const water=s.level.water.find(r=>l.x>r.x&&l.x<r.x+r.w&&l.y>595);if(water||l.y>H+20||l.age>35){s.lost++;if(water)s.events.push({type:'splash',x:l.x,y:600});continue;}remaining.push(l);
 }s.leaves=remaining;if(s.shelters.every(h=>h.count>=h.need))s.status='won';else if(s.time<=0)s.status='lost';}
