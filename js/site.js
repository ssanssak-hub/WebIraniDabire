/* رفتار مشترک همه‌ی صفحه‌ها: منو، تم، نصب PWA، لینک مستقیم تلگرام/اینستاگرام و جلوه‌های زنده */
(function(){
var D=document,W=window,reduce=W.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── منو و دکمه‌های تم / حالت تاریک ── */
var b=$('burger'),n=$('nav');
function menu(o){if(!n)return;n.classList.toggle('open',o);if(b){b.classList.toggle('open',o);b.setAttribute('aria-expanded',o?'true':'false')}}
if(b)b.onclick=function(){menu(!n.classList.contains('open'))};
if(n)n.addEventListener('click',function(e){if(e.target.closest('a'))menu(false)});
D.addEventListener('keydown',function(e){if(e.key==='Escape')menu(false)});
var ht=$('hth'),hd=$('hdk');
if(ht)ht.onclick=function(){ThemeManager.showPicker()};
if(hd)hd.onclick=function(){ThemeManager.setDark(!st.dark)};

/* ── پنجرهٔ گفتگوی مشترک (برای انتخاب تم و فونت) ── */
if(!$('dlg')){var dg=D.createElement('dialog');dg.id='dlg';dg.innerHTML='<div id="dlgt"></div><div id="dlgb"></div><button class="it" id="dlgx">بستن</button>';D.body.appendChild(dg)}
var dl=$('dlg');
$('dlgx').onclick=function(){dl.close()};
dl.addEventListener('click',function(e){if(e.target!==dl)return;var r=dl.getBoundingClientRect();
if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dl.close()});

/* ── آفلاین و نصب برنامه ── */
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(function(){});
var dp=null,ib=$('hinst');
W.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;if(ib)ib.hidden=false});
if(ib)ib.onclick=function(){if(dp){dp.prompt();dp=null;ib.hidden=true}};
W.addEventListener('appinstalled',function(){if(ib)ib.hidden=true});

/* ── بازکردن مستقیم اپ تلگرام/اینستاگرام ── */
var ua=navigator.userAgent,and=/Android/i.test(ua),ios=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
var TG='https://t.me/dabireirani',IG='https://www.instagram.com/sanss_ak/';
var L={tg:{web:TG,app:'tg://resolve?domain=dabireirani',
 and:'intent://resolve?domain=dabireirani#Intent;scheme=tg;package=org.telegram.messenger;S.browser_fallback_url='+encodeURIComponent(TG)+';end'},
 ig:{web:IG,app:'instagram://user?username=sanss_ak',
 and:'intent://instagram.com/_u/sanss_ak/#Intent;package=com.instagram.android;scheme=https;S.browser_fallback_url='+encodeURIComponent(IG)+';end'}};
function fallback(web){var gone=false;function s(){gone=true}
 D.addEventListener('visibilitychange',s,{once:true});W.addEventListener('blur',s,{once:true});
 setTimeout(function(){if(!gone&&!D.hidden)location.href=web},1600)}
D.addEventListener('click',function(e){
 var a=e.target.closest&&e.target.closest('a[data-dl]');if(!a)return;
 var k=L[a.getAttribute('data-dl')];if(!k||e.ctrlKey||e.metaKey||e.shiftKey||e.button)return;
 e.preventDefault();
 if(and){location.href=k.and}
 else if(ios||a.getAttribute('data-dl')==='tg'){location.href=k.app;fallback(k.web)}
 else{W.open(k.web,'_blank','noopener')}
});

/* ── نمونه‌ی نویسه‌های هر خط (پهلوی کتابی بر پایه‌ی بلوک عبری یونی‌کد) ── */
var S=[
{n:'پارسی باستان',t:'\uD800\uDFA0\uD800\uDFA1\uD800\uDFA2\uD800\uDFA3\uD800\uDFA4\uD800\uDFA5\uD800\uDFA6\uD800\uDFA7',d:'ltr'},
{n:'آرامی امپراتوری',t:'\uD802\uDC40\uD802\uDC41\uD802\uDC42\uD802\uDC43\uD802\uDC44\uD802\uDC45\uD802\uDC46\uD802\uDC47',d:'rtl'},
{n:'پهلوی کتابی (دستورمند)',t:'מלל ףכ ׃ ףאאחה',d:'rtl'},
{n:'پهلوی زبوری',t:'\uD802\uDF80\uD802\uDF81\uD802\uDF82\uD802\uDF83\uD802\uDF84\uD802\uDF85\uD802\uDF86\uD802\uDF87',d:'rtl'},
{n:'پهلوی سنگ‌نبشته‌ای',t:'\uD802\uDF60\uD802\uDF61\uD802\uDF62\uD802\uDF63\uD802\uDF64\uD802\uDF65\uD802\uDF66\uD802\uDF67',d:'rtl'},
{n:'پهلوی کتابی (بی‌دستور)',t:'מלל ףכ ׃ ףאאחה',d:'rtl'},
{n:'اوستایی',t:'\uD802\uDF00\uD802\uDF01\uD802\uDF02\uD802\uDF03\uD802\uDF04\uD802\uDF05\uD802\uDF06\uD802\uDF07',d:'rtl'},
{n:'مانوی',t:'\uD802\uDEC0\uD802\uDEC1\uD802\uDEC2\uD802\uDEC3\uD802\uDEC4\uD802\uDEC5\uD802\uDEC6\uD802\uDEC7',d:'rtl'},
{n:'سغدی',t:'\uD803\uDF30\uD803\uDF31\uD803\uDF32\uD803\uDF33\uD803\uDF34\uD803\uDF35\uD803\uDF36\uD803\uDF37',d:'rtl'},
{n:'خوارزمی',t:'\uD803\uDFB0\uD803\uDFB1\uD803\uDFB2\uD803\uDFB3\uD803\uDFB4\uD803\uDFB5\uD803\uDFB6\uD803\uDFB7',d:'rtl'},
{n:'الیمایی',t:'\uD803\uDFE0\uD803\uDFE1\uD803\uDFE2\uD803\uDFE3\uD803\uDFE4\uD803\uDFE5\uD803\uDFE6\uD803\uDFE7',d:'rtl'}
];

/* ── پس‌زمینهٔ زنده: حباب‌های رنگی + نویسه‌های شناور ── */
(function(){
 var o=D.createElement('div');o.className='orbs';o.setAttribute('aria-hidden','true');o.innerHTML='<i></i><i></i><i></i>';
 if(!reduce){var pool=Array.from(S.map(function(x){return x.t}).join('')).filter(function(c){return c.trim()}),cnt=innerWidth<700?7:14;
  for(var i=0;i<cnt;i++){var f=D.createElement('span'),t=24+Math.random()*44;f.className='fl';f.textContent=pool[Math.floor(Math.random()*pool.length)];
   f.style.cssText='left:'+(Math.random()*96).toFixed(1)+'%;font-size:'+t.toFixed(0)+'px;--t:'+(26+Math.random()*24).toFixed(1)+'s;--dl:-'+(Math.random()*40).toFixed(1)+'s;--o:'+(.07+Math.random()*.08).toFixed(3)+';--dx:'+(Math.random()*160-80).toFixed(0)+'px;--rot:'+(Math.random()*120-60).toFixed(0)+'deg';
   o.appendChild(f)}}
 D.body.insertBefore(o,D.body.firstChild)})();

/* ── نوار پیشرفت اسکرول و سایه‌ی سرصفحه ── */
var pr=$('prog'),sh=D.querySelector('.sh'),tick=false;
function sc(){tick=false;var y=W.scrollY||D.documentElement.scrollTop,h=D.documentElement.scrollHeight-W.innerHeight;
 if(pr)pr.style.transform='scaleX('+(h>0?Math.min(1,y/h):0)+')';if(sh)sh.classList.toggle('sc',y>10)}
W.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(sc)}},{passive:true});sc();

/* ── نمایش تدریجی بخش‌ها هنگام اسکرول ── */
(function(){
 var els=Array.prototype.slice.call(D.querySelectorAll('.card,.imgs>*,.sec>h2,.sec>.sub,.page>h1,.page>.sub,.prose>*,.tool>*,.marq')).filter(function(e){return !e.closest('#app')});
 if(reduce||!('IntersectionObserver' in W)||!els.length)return;
 var idx=new Map();els.forEach(function(e){var p=e.parentNode,c=idx.get(p)||0;idx.set(p,c+1);e.style.setProperty('--d',(Math.min(c,8)*.07).toFixed(2)+'s');e.classList.add('rv')});
 var io=new IntersectionObserver(function(es){es.forEach(function(x){if(!x.isIntersecting)return;var e=x.target;e.classList.add('in');io.unobserve(e);
  setTimeout(function(){e.classList.remove('rv','in');e.style.removeProperty('--d')},1500)})},{threshold:.1,rootMargin:'0px 0px -30px 0px'});
 els.forEach(function(e){io.observe(e)})})();

/* ── درخشش دنبال‌کنندهٔ نشانگر روی کارت‌ها + موج لمس روی دکمه‌ها ── */
D.addEventListener('pointermove',function(e){var c=e.target.closest&&e.target.closest('.card');if(!c)return;var r=c.getBoundingClientRect();
 c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});
D.addEventListener('pointerdown',function(e){if(reduce)return;var t=e.target.closest&&e.target.closest('.btn,#app button,.tpls button,.it');if(!t||t.disabled)return;
 var r=t.getBoundingClientRect(),s=Math.max(r.width,r.height)*2,p=D.createElement('span');p.className='rp';
 p.style.cssText='width:'+s+'px;height:'+s+'px;left:'+(e.clientX-r.left-s/2)+'px;top:'+(e.clientY-r.top-s/2)+'px';t.appendChild(p);setTimeout(function(){p.remove()},650)},{passive:true});

/* ── صفحهٔ اصلی: چرخش نمونه‌ی دبیره‌ها و نوار متحرک ── */
var g=$('glyph'),gn=$('gname');
if(g&&gn){
 var box=g.parentNode,i=0;
 // 👇 تغییرات اعمال شده: متن دیگر به حروف تقسیم نمی‌شود و کل کلمه یکجا نمایش داده می‌شود
 var set=function(s){
   g.textContent=s.t;
   g.dir=s.d;
   gn.textContent=s.n;
   // ریست کردن انیمیشن برای اجرای مجدد روی کل کلمه
   g.style.animation='none';
   g.offsetHeight; // ترفند برای فورس کردن ری‌فلو (اجبار مرورگر به شناسایی تغییر)
   g.style.animation='';
 };
 set(S[0]);
 if(!reduce)setInterval(function(){
   box.classList.add('out');
   setTimeout(function(){
     i=(i+1)%S.length;
     set(S[i]);
     box.classList.remove('out');
   },450);
 },3800);
}
var mq=$('marq');
if(mq){var h='';S.forEach(function(s){h+='<span><b dir="rtl"'+(s.o?' class="pua"':'')+'>'+s.t+'</b><em>'+s.n+'</em></span>'});
 mq.innerHTML='<div class="mt">'+h+h+'</div>'}
})();
