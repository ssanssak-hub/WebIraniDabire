/* معادل CustomKeyboardView.kt — ردیف کنترل، بعد کدپوینت‌های خطِ فعلی، ۸ ستون در هر ردیف */
var CustomKeyboardView={scripts:[],cur:0,listener:null,COLUMNS:8,
setScripts:function(s,pref){this.scripts=s;var i=-1;s.forEach(function(x,j){if(x.name===pref&&i<0)i=j});this.cur=i>=0?i:0;this.draw()},
go:function(d){var n=this.scripts.length;if(!n)return;this.cur=(this.cur+d+n)%n;this.draw()},
draw:function(){var me=this,L=me.listener,S=me.scripts,kb=$('kb'),fr=document.createDocumentFragment(),r=document.createElement('div');
r.className='row';
r.appendChild(mk('◀ خط','k c',function(){me.go(-1)}));r.appendChild(mk('خط ▶','k c',function(){me.go(1)}));
r.appendChild(mk('فاصله','k c',function(){L.onCharacter(' ')}));
r.appendChild(mk('⏎','k c',function(){L.onEnter()},'خط جدید'));
r.appendChild(mk('⌫','k c',function(){L.onBackspace()},'حذف'));
r.appendChild(mk('اپلیکیشن','k c',function(){window.open('https://github.com/ssanssak-hub/Ancient-Iranian-script-download-','_blank')},'دانلود اپلیکیشن'));fr.appendChild(r);
kb.innerHTML='';if(!S.length){$('lab').textContent='';kb.appendChild(fr);return}
var g=S[me.cur];$('lab').textContent='خط: '+g.name+'  ('+(me.cur+1)+'/'+S.length+')';L.onScriptChanged(g.name,me.cur,S.length);
var cp=g.codePoints;
for(var i=0;i<cp.length;i+=me.COLUMNS){var row=document.createElement('div');row.className='row';
cp.slice(i,i+me.COLUMNS).forEach(function(c){var ch=String.fromCodePoint(c);row.appendChild(mk(ch,'k',function(){L.onCharacter(ch)}))});fr.appendChild(row)}
kb.appendChild(fr)}}};
