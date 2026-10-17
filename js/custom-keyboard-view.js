/* معادل CustomKeyboardView.kt — ردیف کنترل، نوار انتخاب خط، بعد کدپوینت‌های خطِ فعلی، ۸ ستون در هر ردیف */
var CustomKeyboardView={scripts:[],cur:0,listener:null,COLUMNS:8,
setScripts:function(s,pref){this.scripts=s;pref=(UnicodeScripts.ALIASES&&UnicodeScripts.ALIASES[pref])||pref;var i=-1;s.forEach(function(x,j){if(x.name===pref&&i<0)i=j});this.cur=i>=0?i:0;this.buildStrip();this.draw()},
go:function(d){var n=this.scripts.length;if(!n)return;this.cur=(this.cur+d+n)%n;this.draw(true)},
buildStrip:function(){var me=this,sl=$('sl');if(!sl)return;sl.innerHTML='';
me.scripts.forEach(function(g,i){var b=mk(g.name,'sch',function(){me.cur=i;me.draw(true)});b.setAttribute('data-i',i);sl.appendChild(b)})},
markStrip:function(user){var sl=$('sl');if(!sl)return;var on=null;
Array.prototype.forEach.call(sl.children,function(b){var a=+b.getAttribute('data-i')===CustomKeyboardView.cur;b.classList.toggle('on',a);if(a)on=b});
if(on){var r=on.getBoundingClientRect(),q=sl.getBoundingClientRect();sl.scrollBy({left:(r.left+r.width/2)-(q.left+q.width/2),behavior:user?'smooth':'auto'})}},
draw:function(user){var me=this,L=me.listener,S=me.scripts,kb=$('kb'),fr=document.createDocumentFragment(),r=document.createElement('div');
r.className='row';
r.appendChild(mk('◀ خط','k c',function(){me.go(-1)}));r.appendChild(mk('خط ▶','k c',function(){me.go(1)}));
r.appendChild(mk('فاصله','k c',function(){L.onCharacter(' ')}));
r.appendChild(mk('⏎','k c',function(){L.onEnter()},'خط جدید'));
r.appendChild(mk('⌫','k c',function(){L.onBackspace()},'حذف'));
r.appendChild(mk('نسخه‌اپلیکیشن','k c',function(){window.open('https://github.com/ssanssak-hub/Ancient-Iranian-script-download-','_blank')},'دانلود اپلیکیشن'));fr.appendChild(r);
kb.innerHTML='';if(!S.length){$('lab').textContent='';kb.appendChild(fr);return}
var g=S[me.cur];$('lab').textContent='خط: '+g.name+'  ('+(me.cur+1)+'/'+S.length+')';L.onScriptChanged(g.name,me.cur,S.length);me.markStrip(user);
var cp=g.codePoints,n=0;
for(var i=0;i<cp.length;i+=me.COLUMNS){var row=document.createElement('div');row.className='row';
cp.slice(i,i+me.COLUMNS).forEach(function(c){var ch=String.fromCodePoint(c),k=mk(ch,'k',function(){L.onCharacter(ch)});k.style.setProperty('--i',Math.min(n++,40));row.appendChild(k)});fr.appendChild(row)}
kb.appendChild(fr)}};
