/* معادل FontUnicodeReader.kt — همه‌ی code pointهای cmap فونت (فرمت‌های 0، 4، 6، 10، 12، 13) */
var FontUnicodeReader=(function(){
function tag(v,p){return String.fromCharCode(v.getUint8(p),v.getUint8(p+1),v.getUint8(p+2),v.getUint8(p+3))}
function ok(c){return c>=0&&c<=0x10FFFF&&!(c>=0xD800&&c<=0xDFFF)}
function sub(v,so,out){var f=v.getUint16(so),i,cp;
if(f===0){for(cp=0;cp<256;cp++)if(v.getUint8(so+6+cp))out.add(cp)}
else if(f===4){var n=v.getUint16(so+6)/2,eo=so+14,sO=eo+n*2+2,dO=sO+n*2,rO=dO+n*2;
for(i=0;i<n;i++){var e=v.getUint16(eo+i*2),s=v.getUint16(sO+i*2);if(s>e||(s===0xFFFF&&e===0xFFFF))continue;
var d=v.getInt16(dO+i*2),ro=v.getUint16(rO+i*2);
for(cp=s;cp<=e;cp++){var g;if(ro===0)g=(cp+d)&0xFFFF;else{var a=rO+i*2+ro+2*(cp-s);if(a+2>v.byteLength)break;var r=v.getUint16(a);g=r?(r+d)&0xFFFF:0}if(g)out.add(cp)}}}
else if(f===6){var fc=v.getUint16(so+6),cn=v.getUint16(so+8);for(i=0;i<cn;i++)if(v.getUint16(so+10+i*2))out.add(fc+i)}
else if(f===10){var st0=v.getUint32(so+12),c10=v.getUint32(so+16);for(i=0;i<c10;i++)if(v.getUint16(so+20+i*2)&&ok(st0+i))out.add(st0+i)}
else if(f===12||f===13){var ng=Math.min(v.getUint32(so+12),1000000);
for(i=0;i<ng;i++){var p=so+16+i*12;if(p+12>v.byteLength)break;var a0=v.getUint32(p),b0=v.getUint32(p+4),g0=v.getUint32(p+8);
if(b0<a0||b0>0x10FFFF||b0-a0>2000000)continue;
for(cp=a0;cp<=b0;cp++){var gg=f===12?g0+cp-a0:g0;if(gg&&ok(cp))out.add(cp)}}}}
function font(v,base,out){var nt=v.getUint16(base+4);
for(var i=0;i<nt;i++){var rec=base+12+i*16;if(tag(v,rec)!=='cmap')continue;
var co=v.getUint32(rec+8),cnt=v.getUint16(co+2);
for(var j=0;j<cnt;j++){var so=co+v.getUint32(co+4+j*8+4);try{sub(v,so,out)}catch(e){}}}}
return{getSupportedCodePoints:function(ab){var out=new Set();try{var v=new DataView(ab),offs=[0];
if(tag(v,0)==='ttcf'){offs=[];var n=Math.min(v.getUint32(8),64);for(var i=0;i<n;i++)offs.push(v.getUint32(12+i*4))}
offs.forEach(function(o){font(v,o,out)})}catch(e){}
return new Set(Array.from(out).filter(ok).sort(function(a,b){return a-b}))}}})();
