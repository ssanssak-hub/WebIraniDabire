/* معادل FontManager.kt — فونت‌ها از پوشه‌ی fonts/
(لیست در fonts/fonts.json)؛
   هیچ اسمی هاردکد نیست و اولین فونت لیست (بعد از مرتب‌سازی)، پیش‌فرض است.
   + تشخیص خطا: اگر fonts.json خوانده نشود، علت دقیق در FontManager.lastError ذخیره می‌شود. */

var FontManager={list:[],family:null,n:0,lastError:null,
displayName:function(f){return String(f).replace(/\.[^.]+$/,'')},
listAvailableFonts:async function(){var a=[],me=this;this.lastError=null;
try{var r=await fetch('fonts/fonts.json',{cache:'no-store'});
if(!r.ok)throw new Error('HTTP '+r.status);
a=JSON.parse((await r.text()).replace(/^\uFEFF/,''));
if(!Array.isArray(a))a=(a&&(a.fonts||a.list))||[]}
catch(e){this.lastError=(e&&e.message)||String(e);a=[]}
this.list=a.filter(function(f){return /\.(ttf|otf|ttc)$/i.test(String(f))}).sort(function(x,y){return me.displayName(x).toLowerCase().localeCompare(me.displayName(y).toLowerCase())});return this.list},
getSelected:function(){return this.list.indexOf(st.font)>=0?st.font:(this.list[0]||null)},
load:async function(file){var r=await fetch('fonts/'+encodeURIComponent(file));
if(!r.ok)throw new Error('HTTP '+r.status+' — fonts/'+file);
var bytes=await r.arrayBuffer(),fam='AppFont'+(++this.n),ffc=new FontFace(fam,bytes);
await ffc.load();document.fonts.add(ffc);this.family=fam;document.documentElement.style.setProperty('--app-font',"'"+fam+"'");
return{scripts:UnicodeScripts.buildScripts(FontUnicodeReader.getSupportedCodePoints(bytes)),name:FontNameReader.readFamilyName(bytes)||this.displayName(file)}},
showPicker:function(onSel){var me=this;
if(!me.list.length)return alert('هیچ فونتی در پوشه‌ی fonts پیدا نشد'+(me.lastError?('\nعلت: '+me.lastError):''));
openDialog('انتخاب فونت',function(b,close){me.list.forEach(function(f){
b.appendChild(mk((f===me.getSelected()?'✓ ':'')+me.displayName(f),'it',function(){close();onSel(f)}))})})}};
function ff(){return "'"+(FontManager.family||'Tahoma')+"',Tahoma,sans-serif"}
