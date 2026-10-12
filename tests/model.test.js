import test from 'node:test';
import assert from 'node:assert/strict';
import {levels,createState,step,spawnLeaf} from '../model.js';
test('all five chapters award warmth only for leaves delivered to shelters',()=>{for(let i=0;i<levels.length;i++){const s=createState(i,()=>.5);s.spawnClock=999;for(const h of s.shelters){for(let n=0;n<h.need;n++){s.leaves.push({x:h.x,y:h.y-15,vx:0,vy:0,angle:0,spin:0,age:0,color:0});step(s,.016);}}assert.equal(s.status,'won');assert.equal(s.delivered,s.shelters.reduce((a,h)=>a+h.need,0));}});
test('wet leaves disappear without warming an animal',()=>{const s=createState(2);s.spawnClock=999;s.leaves=[{x:500,y:610,vx:0,vy:0,angle:0,spin:0,age:0,color:0}];step(s,.016);assert.equal(s.lost,1);assert.equal(s.delivered,0);assert.equal(s.leaves.length,0);});
test('upward wind overcomes gravity; rightward wind directs leaves',()=>{const s=createState(0,()=>.5);spawnLeaf(s);s.spawnClock=999;s.wind={x:1,y:-1};for(let i=0;i<60;i++)step(s,1/60);assert.ok(s.leaves[0].vx>0);assert.ok(s.leaves[0].x>320);assert.ok(s.leaves[0].y<80);});
test('frost ends the chapter, and terminal states cannot advance',()=>{const s=createState();s.time=.01;step(s,.02);assert.equal(s.status,'lost');const snapshot=JSON.stringify(s);step(s,.02);assert.equal(JSON.stringify(s),snapshot);});
test('branches stop falling leaves from passing through',()=>{const s=createState(1);s.spawnClock=999;s.leaves=[{x:500,y:340,vx:0,vy:100,angle:0,spin:0,age:0,color:0}];step(s,.02);assert.ok(s.leaves[0].y<345);assert.ok(s.leaves[0].vy<0);});
