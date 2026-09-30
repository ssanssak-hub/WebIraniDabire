/* معادل SavedFilesActivity.kt — «پیش‌نویس‌های من» */
function dlist(){var d=ls('drafts')||[],box=$('dlst');box.innerHTML='';if(!d.length){box.textContent='هنوز پیش‌نویسی ذخیره نشده.';return}
d.forEach(function(x,i){var r=document.createElement('div'),s=document.createElement('span');r.className='dr';s.textContent=(x.t.trim().slice(0,30)||'بدون متن')+'  —  '+new Date(x.ts).toLocaleDateString('fa-IR');
r.appendChild(s);r.appendChild(mk('باز کردن','',function(){setText(x.t);tab(0)}));
r.appendChild(mk('حذف','',function(){var a=ls('drafts')||[];a.splice(i,1);ls('drafts',a);dlist()}));box.appendChild(r)})}
$('ds').onclick=function(){if(!st.txt)return flash(this,'متنی نیست');var d=ls('drafts')||[];d.unshift({t:st.txt,ts:Date.now()});ls('drafts',d.slice(0,50));flash(this,'ذخیره شد');dlist()};
