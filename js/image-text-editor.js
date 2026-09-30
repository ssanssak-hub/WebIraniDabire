/* معادل ImageTextEditorActivity.kt / ImageOverlayView.kt — متن روی عکس */
var im=null,ex=.5,ey=.5,dr=false;
async function edraw(){var c=$('cv'),x=c.getContext('2d');if(!im){c.width=600;c.height=300;x.fillStyle='#888';x.font='16px Tahoma';x.textAlign='center';x.fillText('عکسی انتخاب نشده',300,150);return}
await document.fonts.load('40px '+ff());var W=Math.min(1080,im.naturalWidth),H=Math.round(im.naturalHeight*W/im.naturalWidth);c.width=W;c.height=H;x.drawImage(im,0,0,W,H);
var fs=W*$('es').value/1000,lh=fs*1.7;x.font=fs+'px '+ff();x.direction='rtl';x.textAlign='center';x.textBaseline='middle';
var L=wrap(x,st.txt,W*.86);x.fillStyle=st.tc;x.shadowColor='rgba(0,0,0,.55)';x.shadowBlur=fs*.15;
L.forEach(function(l,i){x.fillText(l,ex*W,ey*H-(L.length-1)*lh/2+i*lh)})}
$('up').onchange=function(e){var f=e.target.files[0];if(!f)return;var i=new Image();i.onload=function(){im=i;edraw()};i.src=URL.createObjectURL(f)};
$('es').oninput=edraw;
function mv(e){if(!dr)return;var r=$('cv').getBoundingClientRect();ex=(e.clientX-r.left)/r.width;ey=(e.clientY-r.top)/r.height;edraw()}
$('cv').onpointerdown=function(e){dr=true;this.setPointerCapture(e.pointerId);mv(e)};$('cv').onpointermove=mv;$('cv').onpointerup=function(){dr=false};
$('ed').onclick=function(){if(!im)return flash(this,'اول عکس انتخاب کن');$('cv').toBlob(function(x){dl(x,'image-text.png')})};
