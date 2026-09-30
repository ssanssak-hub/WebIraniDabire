/* معادل MainActivity.kt — اتصال همه‌ی بخش‌ها */
var t=$('t'),hist=[st.txt],hi=0,cf=0,dp=null;
function show(){t.textContent=st.txt;t.style.fontSize=st.size+'px';t.style.color=st.tc;t.style.background=st.bc;$('sz').value=st.size;$('szo').textContent=st.size;$('tc').value=st.tc;$('bc').value=st.bc}
function setText(v){st.txt=v;hist=hist.slice(0,hi+1);hist.push(v);hi++;if(hist.length>300){hist.shift();hi--}show();save()}
function undo(d){var n=hi+d;if(n<0||n>=hist.length)return;hi=n;st.txt=hist[n];show();save()}
function put(s){setText(st.txt+s)}
CustomKeyboardView.listener={onCharacter:put,onEnter:function(){put('\n')},
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
window.addEventListener('beforeinstallprompt',function(e){e.preventDefault();dp=e;$('inst').hidden=false});
 $('inst').onclick=function(){if(dp){dp.prompt();dp=null;this.hidden=true}};
window.addEventListener('appinstalled',function(){$('inst').hidden=true});
if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol))navigator.serviceWorker.register('sw.js').catch(function(){});
(async function(){try{show();ThemeManager.apply();tab(0);
await FontManager.listAvailableFonts();var f=FontManager.getSelected();
if(f)await useFont(f);else $('lab').textContent='هیچ فونتی در پوشه‌ی fonts پیدا نشد'}
catch(e){var m='خطای راه‌اندازی: '+((e&&e.message)||e);try{$('lab').textContent=m}catch(x){}alert(m)}})();
