/* معادل FontNameReader.kt — نام خانواده‌ی فونت را از جدول name می‌خواند (نه از اسم فایل) */
var FontNameReader={readFamilyName:function(ab){try{var v=new DataView(ab),b=0;
function tg(p){return String.fromCharCode(v.getUint8(p),v.getUint8(p+1),v.getUint8(p+2),v.getUint8(p+3))}
if(tg(0)==='ttcf')b=v.getUint32(12);var nt=v.getUint16(b+4),no=-1;
for(var i=0;i<nt;i++){var r=b+12+i*16;if(tg(r)==='name')no=v.getUint32(r+8)}
if(no<0)return null;var n=v.getUint16(no+2),so=no+v.getUint16(no+4),best=null;
for(i=0;i<n;i++){var p=no+6+i*12,pl=v.getUint16(p),id=v.getUint16(p+6),len=v.getUint16(p+8),off=v.getUint16(p+10);
if(id!==1&&id!==16)continue;var s='';
if(pl===3||pl===0){for(var k=0;k<len;k+=2)s+=String.fromCharCode(v.getUint16(so+off+k))}
else{for(k=0;k<len;k++)s+=String.fromCharCode(v.getUint8(so+off+k))}
if(!s)continue;if(id===16&&pl===3)return s;if(!best)best=s}
return best}catch(e){return null}}};
