/* معادل ThemeManager.kt — همان ۱۷ تم اپ با رنگ‌های روشن/تاریک [پس‌زمینه، سطح، نوار بالا، رنگ اصلی] */
var ThemeManager={
themes:[
{id:'blue',title:'آبی',light:['#e8f1fb','#f7fafd','#1e88e5','#1565c0'],dark:['#0e1720','#17232f','#1c2f42','#42a5f5']},
{id:'indigo',title:'نیلی',light:['#e8eaf6','#f8f9fd','#3f51b5','#283593'],dark:['#11131f','#1a1d2e','#232848','#7986cb']},
{id:'deep-purple',title:'بنفش تیره',light:['#ede7f6','#f9f7fd','#5e35b1','#4527a0'],dark:['#120f1a','#1c1828','#252036','#7e57c2']},
{id:'purple',title:'بنفش',light:['#f3e8f6','#fbf8fd','#8e24aa','#6a1b9a'],dark:['#161020','#221a2e','#2c2240','#ab47bc']},
{id:'pink',title:'صورتی',light:['#fce8ef','#fef7fa','#d81b60','#ad1457'],dark:['#1e1116','#2d1a22','#3d222c','#f06292']},
{id:'red',title:'قرمز',light:['#fdeaea','#fef7f7','#e53935','#c62828'],dark:['#1c1010','#2b1a1a','#3a2222','#ef5350']},
{id:'deep-orange',title:'نارنجی سوخته',light:['#fbe9e1','#fef8f4','#f4511e','#d84315'],dark:['#1c1210','#2b1c17','#3a241e','#ff7043']},
{id:'orange',title:'نارنجی',light:['#fff3e0','#fffaf2','#fb8c00','#ef6c00'],dark:['#1c150d','#2b2013','#3a2a19','#ffa726']},
{id:'amber',title:'کهربایی',light:['#fff8e1','#fffdf5','#ffb300','#ff8f00'],dark:['#1b160c','#2a2212','#382d17','#ffc107']},
{id:'gold',title:'طلایی',light:['#faf5e0','#fdfaf0','#b8960c','#8f7409'],dark:['#171408','#252010','#312a15','#d4af37']},
{id:'lime',title:'سبز روشن',light:['#f4f9e3','#fbfdf3','#9e9d24','#827717'],dark:['#15170c','#222414','#2d2f1a','#cddc39']},
{id:'green',title:'سبز',light:['#e6f4ea','#f6fbf8','#43a047','#2e7d32'],dark:['#0f1a12','#18271c','#203427','#66bb6a']},
{id:'teal',title:'فیروزه‌ای',light:['#e0f2f1','#f5fbfa','#00897b','#00695c'],dark:['#0d1716','#152624','#1c312f','#26a69a']},
{id:'cyan',title:'آبی فیروزه‌ای',light:['#e0f5f9','#f5fbfd','#00acc1','#0097a7'],dark:['#0d1618','#152327','#1c2e33','#26c6da']},
{id:'blue-grey',title:'خاکستری آبی',light:['#eceff1','#f8fafb','#546e7a','#37474f'],dark:['#121619','#1b2225','#232d31','#78909c']},
{id:'grey',title:'خاکستری',light:['#f0f0f2','#fafafb','#616161','#424242'],dark:['#131417','#1d1f23','#26282d','#9e9e9e']},
{id:'brown',title:'قهوه‌ای',light:['#efebe9','#faf8f7','#6d4c41','#4e342e'],dark:['#171211','#241c19','#30241f','#a1887f']}
],
current:function(){var id=st.theme;return this.themes.filter(function(t){return t.id===id})[0]||this.themes[0]},
apply:function(){var t=this.current();if(!t||!t.light)return;var s=st.dark?t.dark:t.light,r=document.documentElement.style;
function L(h){var n=parseInt(h.slice(1),16);return(0.299*(n>>16)+0.587*(n>>8&255)+0.114*(n&255))/255}
r.setProperty('--bg',s[0]);r.setProperty('--sf',s[1]);r.setProperty('--bar',s[2]);r.setProperty('--ac',s[3]);
r.setProperty('--fg',L(s[0])>.55?'#1f1f1f':'#f2f2f2');r.setProperty('--acf',L(s[3])>.55?'#1f1f1f':'#ffffff');
var m=document.querySelector('meta[name=theme-color]');if(m)m.content=s[2]},
showPicker:function(){var me=this;openDialog('تم اپلیکیشن',function(b,close){
var d=mk((st.dark?'✓ ':'')+'حالت تاریک','it',function(){st.dark=!st.dark;save();me.apply();close();me.showPicker()});b.appendChild(d);
me.themes.forEach(function(t){var s=st.dark?t.dark:t.light,x=mk('','it',function(){st.theme=t.id;save();me.apply();close();me.showPicker()});
s.forEach(function(c){var o=document.createElement('i');o.className='dot';o.style.background=c;x.appendChild(o)});
x.appendChild(document.createTextNode((t.id===st.theme?'✓ ':'')+t.title));b.appendChild(x)})})}};
