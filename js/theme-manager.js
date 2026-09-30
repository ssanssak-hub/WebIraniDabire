/* معادل ThemeManager.kt — همان ۱۷ تم اپ با رنگ‌های روشن/تاریک [پس‌زمینه، سطح، نوار بالا، رنگ اصلی] */
var ThemeManager={
themes:[],
current:function(){var id=st.theme;return this.themes.filter(function(t){return t.id===id})[0]||this.themes[0]},
apply:function(){var t=this.current(),s=st.dark?t.dark:t.light,r=document.documentElement.style;
function L(h){var n=parseInt(h.slice(1),16);return(0.299*(n>>16)+0.587*(n>>8&255)+0.114*(n&255))/255}
r.setProperty('--bg',s[0]);r.setProperty('--sf',s[1]);r.setProperty('--bar',s[2]);r.setProperty('--ac',s[3]);
r.setProperty('--fg',L(s[0])>.55?'#1f1f1f':'#f2f2f2');r.setProperty('--acf',L(s[3])>.55?'#1f1f1f':'#ffffff');
var m=document.querySelector('meta[name=theme-color]');if(m)m.content=s[2]},
showPicker:function(){var me=this;openDialog('تم اپلیکیشن',function(b,close){
var d=mk((st.dark?'✓ ':'')+'حالت تاریک','it',function(){st.dark=!st.dark;save();me.apply();close();me.showPicker()});b.appendChild(d);
me.themes.forEach(function(t){var s=st.dark?t.dark:t.light,x=mk('','it',function(){st.theme=t.id;save();me.apply();close();me.showPicker()});
s.forEach(function(c){var o=document.createElement('i');o.className='dot';o.style.background=c;x.appendChild(o)});
x.appendChild(document.createTextNode((t.id===st.theme?'✓ ':'')+t.title));b.appendChild(x)})})}};
