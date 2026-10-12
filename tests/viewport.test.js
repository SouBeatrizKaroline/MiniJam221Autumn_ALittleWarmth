import test from 'node:test';
import assert from 'node:assert/strict';
import {fitScene,scenePoint} from '../viewport.js';
const sizes=[[320,480],[390,844],[844,390],[768,1024],[1366,768],[1920,1080],[2560,1080]];
for(const [width,height] of sizes){
 test(`scene fits ${width} × ${height} without cropping, stretching or input drift`,()=>{
  const scene=fitScene(width,height),rect={left:16,top:120};
  assert.ok(scene.left>=0&&scene.top>=0);
  assert.ok(scene.width<=width+.0001&&scene.height<=height+.0001);
  assert.ok(Math.abs(scene.width/scene.height-1100/680)<1e-10);
  for(const [x,y] of [[0,0],[550,340],[1000,600],[685,498]]){
   const p=scenePoint(rect.left+scene.left+x*scene.scale,rect.top+scene.top+y*scene.scale,rect,scene);
   assert.ok(Math.abs(p.x-x)<1e-8&&Math.abs(p.y-y)<1e-8);
  }
 });
}
test('letterbox margins cannot start a wind gesture',()=>{
 const scene=fitScene(390,700),rect={left:0,top:0};
 assert.equal(scenePoint(195,2,rect,scene).inside,false);
 assert.equal(scenePoint(195,350,rect,scene).inside,true);
});
test('zero-sized hidden canvas has no usable input coordinates',()=>{
 assert.equal(scenePoint(0,0,{left:0,top:0},fitScene(0,0)),null);
});
