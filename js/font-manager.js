/* معادل FontManager.kt — فونت‌ها از پوشه‌ی fonts/ (لیست در fonts/fonts.json)؛
   هیچ اسمی هاردکد نیست و اولین فونت لیست (بعد از مرتب‌سازی)، پیش‌فرض است. */
var FontManager={list:[],family:null,n:0,
displayName:function(f){return f.replace(/\.[^.]+$/,'')},
listAvailableFonts:async function(){var a=[];try{a=await (await fetch('fonts/fonts.json')).json()}catch(e){}
var me=this;this.list=a.filter(function(f){return /\.(ttf|otf|ttc)$/i.test(f)}).sort(function(x,y){return me.displayName(x).toLowerCase().localeCompare(me.displayName(y).toLowerCase())});return this.list},
getSelected:function(){return this.list.indexOf(st.font)>=0?st.font:(this.list[0]||null)},
load:async function(file){var bytes=await (await fetch('fonts/'+encodeURIComponent(file))).arrayBuffer(),fam='AppFont'+(++this.n),ffc=new FontFace(fam,bytes);
await ffc.load();document.fonts.add(ffc);this.family=fam;document.documentElement.style.setProperty('--app-font',"'"+fam+"'");
return{scripts:UnicodeScripts.buildScripts(FontUnicodeReader.getSupportedCodePoints(bytes)),name:FontNameReader.readFamilyName(bytes)||this.displayName(file)}},
showPicker:function(onSel){var me=this;
if(!me.list.length)return alert('هیچ فونتی در پوشه‌ی fonts پیدا نشد');
openDialog('انتخاب فونت',function(b,close){me.list.forEach(function(f){
b.appendChild(mk((f===me.getSelected()?'✓ ':'')+me.displayName(f),'it',function(){close();onSel(f)}))})})}};
function ff(){return "'"+(FontManager.family||'Tahoma')+"',Tahoma,sans-serif"}
