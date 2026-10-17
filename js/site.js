/* منوی موبایل، نصب PWA، آفلاین و بازکردن مستقیم اپ تلگرام/اینستاگرام */
(function(){
var b=document.getElementById('burger'),n=document.getElementById('nav');
if(b)b.onclick=function(){n.classList.toggle('open')};
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(function(){});
var dp=null,ib=document.getElementById('hinst');
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;if(ib)ib.hidden=false});
if(ib)ib.onclick=function(){if(dp){dp.prompt();dp=null;ib.hidden=true}};
window.addEventListener('appinstalled',function(){if(ib)ib.hidden=true});
var ua=navigator.userAgent,and=/Android/i.test(ua),ios=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
var TG='https://t.me/dabireirani',IG='https://www.instagram.com/sanss_akq/';
var L={tg:{web:TG,app:'tg://resolve?domain=dabireirani',
 and:'intent://resolve?domain=dabireirani#Intent;scheme=tg;package=org.telegram.messenger;S.browser_fallback_url='+encodeURIComponent(TG)+';end'},
 ig:{web:IG,app:'instagram://user?username=sanss_akq',
 and:'intent://instagram.com/_u/sanss_akq/#Intent;package=com.instagram.android;scheme=https;S.browser_fallback_url='+encodeURIComponent(IG)+';end'}};
function fallback(web){var gone=false;function s(){gone=true}
 document.addEventListener('visibilitychange',s,{once:true});window.addEventListener('blur',s,{once:true});
 setTimeout(function(){if(!gone&&!document.hidden)location.href=web},1600)}
document.addEventListener('click',function(e){
 var a=e.target.closest&&e.target.closest('a[data-dl]');if(!a)return;
 var k=L[a.getAttribute('data-dl')];if(!k||e.ctrlKey||e.metaKey||e.shiftKey||e.button)return;
 e.preventDefault();
 if(and){location.href=k.and}
 else if(ios||a.getAttribute('data-dl')==='tg'){location.href=k.app;fallback(k.web)}
 else{window.open(k.web,'_blank','noopener')}
});
})();
