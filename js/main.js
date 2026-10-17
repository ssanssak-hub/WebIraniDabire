/* گزارش خطاهای سراسری — هر کرشی رخ بدهد، عیناً نمایش داده می‌شود */
window.addEventListener('error',function(e){try{alert('خطا: '+(e.message||'?')+'\nفایل: '+String(e.filename||'').split('/').pop()+':'+e.lineno)}catch(x){}});
window.addEventListener('unhandledrejection',function(e){try{var r=e.reason;alert('خطای ناهمگام: '+((r&&r.message)||r))}catch(x){}});

/* معادل MainActivity.kt — اتصال همه‌ی بخش‌ها */
function hh(){var h=document.querySelector('.sh');if(h)document.documentElement.style.setProperty('--hh',h.offsetHeight+'px')}hh();window.addEventListener('resize',hh);
var t=$('t'),hist=[st.txt],hi=0,cf=0,dp=null;
function show(){t.textContent=st.txt;t.scrollTop=t.scrollHeight;var n=Array.from(st.txt).length;$('cnt').textContent=n.toLocaleString('fa-IR')+' نویسه';t.style.fontSize=st.size+'px';t.style.color=st.tc;t.style.background=st.bc;$('sz').value=st.size;$('szo').textContent=st.size;$('tc').value=st.tc;$('bc').value=st.bc}
function setText(v){st.txt=v;hist=hist.slice(0,hi+1);hist.push(v);hi++;if(hist.length>300){hist.shift();hi--}show();save()}
function undo(d){var n=hi+d;if(n<0||n>=hist.length)return;hi=n;st.txt=hist[n];show();save()}
function put(s){setText(st.txt+s)}
function addRecent(ch){var a=(st.recent||[]).filter(function(x){return x!==ch});a.unshift(ch);st.recent=a.slice(0,12);CustomKeyboardView.drawRecent()}
CustomKeyboardView.listener={onCharacter:function(ch,fromRecent){put(ch);if(!fromRecent&&ch.trim())addRecent(ch);try{navigator.vibrate&&navigator.vibrate(6)}catch(x){}},onEnter:function(){put('\n')},
onBackspace:function(){var a=Array.from(st.txt);a.pop();setText(a.join(''))},
onScriptChanged:function(n){st.script=n;save()}};
async function useFont(file){try{var r=await FontManager.load(file);st.font=file;save();$('fnt').textContent=FontManager.displayName(file);CustomKeyboardView.setScripts(r.scripts,st.script)}
catch(e){$('lab').textContent='خواندن فونت ناموفق بود: '+((e&&e.message)||e)}}
function tab(i){[0,1,2].forEach(function(j){$('s'+j).hidden=j!=i;$('tb'+j).classList.toggle('on',j==i)});if(i==1)edraw();if(i==2)dlist()}
[0,1,2].forEach(function(j){$('tb'+j).onclick=function(){tab(j)}});
 $('un').onclick=function(){undo(-1)};$('re').onclick=function(){undo(1)};
 $('clr').onclick=function(){var b=this;if(!cf){cf=1;b.textContent='مطمئنی؟ دوباره بزن';setTimeout(function(){cf=0;b.textContent='پاک کردن'},3000)}else{cf=0;b.textContent='پاک کردن';setText('')}};
 $('sz').oninput=function(e){st.size=Math.round(e.target.value);show();save()};
 $('tc').oninput=function(e){st.tc=e.target.value;show();save()};
 $('bc').oninput=function(e){st.bc=e.target.value;show();save()};
 $('bf').onclick=function(){FontManager.showPicker(useFont)};$('bt').onclick=function(){ThemeManager.showPicker()};
 $('dlgx').onclick=function(){$('dlg').close()};
/* کیبورد فیزیکی: Backspace، Enter، Space و Ctrl+Z / Ctrl+Y — فقط وقتی تب «نوشتن» باز است */
document.addEventListener('keydown',function(e){if($('s0').hidden||$('dlg').open)return;var tg=e.target;if(tg&&tg.closest&&tg.closest('input,textarea,select'))return;
var k=e.key;if(e.ctrlKey||e.metaKey){var l=k.toLowerCase();if(l==='z'){e.preventDefault();undo(e.shiftKey?1:-1)}else if(l==='y'){e.preventDefault();undo(1)}return}
if(e.altKey)return;var onBtn=tg&&tg.closest&&tg.closest('button');
if(k==='Backspace'){e.preventDefault();CustomKeyboardView.listener.onBackspace()}
else if(!onBtn&&k==='Enter'){e.preventDefault();put('\n')}
else if(!onBtn&&k===' '){e.preventDefault();put(' ')}});
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;$('inst').hidden=false});
 $('inst').onclick=function(){if(dp){dp.prompt();dp=null;this.hidden=true}};
window.addEventListener('appinstalled',function(){$('inst').hidden=true});
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(function(){});
try{var qs=new URLSearchParams(location.search).get('script');if(qs){st.script=qs;save()}}catch(x){}
(async function(){try{show();ThemeManager.apply();tab(0);
await FontManager.listAvailableFonts();var f=FontManager.getSelected();
if(f)await useFont(f);else $('lab').textContent='هیچ فونتی در پوشه‌ی fonts پیدا نشد'}
catch(e){var m='خطای راه‌اندازی: '+((e&&e.message)||e);try{$('lab').textContent=m}catch(x){}alert(m)}})();
