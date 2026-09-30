/* معادل FontManager.kt — فونت‌ها از پوشه‌ی fonts/ (لیست در fonts/fonts.json)
   + پاکسازی نویسه‌های نامرئی + گزارش دقیق وضعیت در showPicker */

var FontManager={list:[],family:null,n:0,lastError:null,raw:null,loaded:false,
reveal:function(x){try{var s=JSON.stringify(x);return String(s).replace(/[^\x20-\x7E]/g,function(c){return'\\u'+('000'+c.codePointAt(0).toString(16)).slice(-4)})}catch(e){return String(x)}},
clean:function(s){return String(s).replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g,'').trim()},
displayName:function(f){return String(f).replace(/\.[^.]+$/,'')},
listAvailableFonts:async function(){var a=[],me=this;this.lastError=null;this.raw=null;this.loaded=false;
try{var r=await fetch('fonts/fonts.json',{cache:'no-store'});
if(!r.ok)throw new Error('HTTP '+r.status);
a=JSON.parse((await r.text()).replace(/^\uFEFF/,''));this.raw=a;
if(a==null)a=[];else if(!Array.isArray(a))a=(a&&(a.fonts||a.list))||[]}
catch(e){this.lastError=(e&&e.message)||String(e);a=[]}
this.loaded=true;
this.list=a.map(function(f){return me.clean(f)}).filter(function(f){return /\.(ttf|otf|ttc)$/i.test(f)}).filter(function(f,i,arr){return arr.indexOf(f)===i}).sort(function(x,y){return me.displayName(x).toLowerCase().localeCompare(me.displayName(y).toLowerCase())});return this.list},
getSelected:function(){return this.list.indexOf(st.font)>=0?st.font:(this.list[0]||null)},
load:async function(file){var r=await fetch('fonts/'+encodeURIComponent(file));
if(!r.ok)throw new Error('HTTP '+r.status+' — fonts/'+file);
var bytes=await r.arrayBuffer(),fam='AppFont'+(++this.n),ffc=new FontFace(fam,bytes);
await ffc.load();document.fonts.add(ffc);this.family=fam;document.documentElement.style.setProperty('--app-font',"'"+fam+"'");
return{scripts:UnicodeScripts.buildScripts(FontUnicodeReader.getSupportedCodePoints(bytes)),name:FontNameReader.readFamilyName(bytes)||this.displayName(file)}},
showPicker:function(onSel){var me=this;
if(!me.list.length){var m='هیچ فونتی در پوشه‌ی fonts پیدا نشد';
if(!me.loaded)m+='\n⚠️ فهرست هنوز بارگذاری نشده — راه‌اندازی صفحه قبل از فونت‌ها خطا خورده';
else if(me.lastError)m+='\nعلت: '+me.lastError;
else if(me.raw!=null){var s=me.reveal(me.raw);if(s.length>300)s=s.slice(0,300)+'…';m+='\nمحتوای fonts.json:\n'+s}
else m+='\nمحتوای fonts.json برابر null است (فایل خراب)';
return alert(m)}
openDialog('انتخاب فونت',function(b,close){me.list.forEach(function(f){
b.appendChild(mk((f===me.getSelected()?'✓ ':'')+me.displayName(f),'it',function(){close();onSel(f)}))})})}};
function ff(){return "'"+(FontManager.family||'Tahoma')+"',Tahoma,sans-serif"}
