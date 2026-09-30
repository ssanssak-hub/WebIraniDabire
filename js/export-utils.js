/* معادل ExportUtils.kt — خروجی عکس PNG، PDF چندصفحه‌ای، TXT و کپی */
function dl(blob,name){var a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove()}
function wrap(c,s,w){var L=[];s.split('\n').forEach(function(p){var ln='';p.split(' ').forEach(function(wd){var tl=ln?ln+' '+wd:wd;if(ln&&c.measureText(tl).width>w){L.push(ln);ln=wd}else ln=tl});L.push(ln)});return L}
async function lines(w){await document.fonts.load('40px '+ff());var fs=st.size*2.4,m=document.createElement('canvas').getContext('2d');m.font=fs+'px '+ff();m.direction='rtl';return{L:wrap(m,st.txt,w-160),fs:fs,lh:fs*1.8}}
function page(W,H,L,fs,lh){var c=document.createElement('canvas');c.width=W;c.height=H;var x=c.getContext('2d');x.fillStyle=st.bc;x.fillRect(0,0,W,H);x.fillStyle=st.tc;x.font=fs+'px '+ff();x.direction='rtl';x.textAlign='right';x.textBaseline='top';L.forEach(function(l,i){x.fillText(l,W-80,80+i*lh)});return c}
function pdf(jp){var P=[],off=0,xr=[],E=new TextEncoder(),N=jp.length;
function add(x){var b=typeof x==='string'?E.encode(x):x;P.push(b);off+=b.length}
function obj(n,b){xr[n]=off;add(n+' 0 obj\n'+b+'\nendobj\n')}
add('%PDF-1.4\n');obj(1,'<</Type/Catalog/Pages 2 0 R>>');var kids=[];
for(var i=0;i<N;i++)kids.push((7+i*3)+' 0 R');
obj(2,'<</Type/Pages/Count '+N+'/Kids['+kids.join(' ')+']>>');
xr[3]=off;add('3 0 obj\n<</Producer(web)>>\nendobj\n');xr[4]=off;add('4 0 obj\n<<>>\nendobj\n');
for(i=0;i<N;i++){var b=3+i*3+2,c='q 595 0 0 842 0 0 cm /I Do Q';
xr[b]=off;add(b+' 0 obj\n<</Type/XObject/Subtype/Image/Width 1080/Height 1528/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length '+jp[i].length+'>>\nstream\n');add(jp[i]);add('\nendstream\nendobj\n');
obj(b+1,'<</Length '+c.length+'>>\nstream\n'+c+'\nendstream');
obj(b+2,'<</Type/Page/Parent 2 0 R/MediaBox[0 0 595 842]/Resources<</XObject<</I '+b+' 0 R>>>>/Contents '+(b+1)+' 0 R>>')}
var tot=5+N*3-2+0,sx=off;tot=3+N*3+2;add('xref\n0 '+tot+'\n0000000000 65535 f \n');
for(var n=1;n<tot;n++)add(String(xr[n]).padStart(10,'0')+' 00000 n \n');
add('trailer\n<</Size '+tot+'/Root 1 0 R>>\nstartxref\n'+sx+'\n%%EOF');return new Blob(P,{type:'application/pdf'})}
$('xp').onclick=async function(){var b=this;if(!st.txt)return flash(b,'متنی نیست');var o=await lines(1080);
page(1080,Math.max(400,160+o.L.length*o.lh),o.L,o.fs,o.lh).toBlob(function(x){dl(x,'text.png')})};
$('xd').onclick=async function(){var b=this;if(!st.txt)return flash(b,'متنی نیست');var o=await lines(1080),n=Math.max(1,Math.floor(1368/o.lh)),jp=[];
for(var i=0;i<o.L.length;i+=n){var u=page(1080,1528,o.L.slice(i,i+n),o.fs,o.lh).toDataURL('image/jpeg',.92),s=atob(u.split(',')[1]),a=new Uint8Array(s.length);
for(var j=0;j<s.length;j++)a[j]=s.charCodeAt(j);jp.push(a)}dl(pdf(jp),'text.pdf')};
$('xt').onclick=function(){if(!st.txt)return flash(this,'متنی نیست');dl(new Blob(['\ufeff'+st.txt],{type:'text/plain;charset=utf-8'}),'text.txt')};
$('xc').onclick=function(){var b=this;if(!st.txt)return flash(b,'متنی نیست');
function fb(){var a=document.createElement('textarea');a.value=st.txt;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(e){}a.remove();flash(b,'کپی شد')}
if(navigator.clipboard)navigator.clipboard.writeText(st.txt).then(function(){flash(b,'کپی شد')},fb);else fb()};
