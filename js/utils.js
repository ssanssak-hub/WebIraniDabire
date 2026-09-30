/* ابزارهای مشترک + وضعیت برنامه (معادل SharedPreferences) */
var $=function(i){return document.getElementById(i)};
var st={txt:'',size:26,tc:'#1f1f1f',bc:'#ffffff',theme:'classic',dark:null,font:null,script:null};
function ls(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k));localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
function save(){ls('state',st)}
(function(){var s=ls('state');if(s)for(var k in s)if(k in st)st[k]=s[k];if(st.dark===null)st.dark=matchMedia('(prefers-color-scheme: dark)').matches})();
function flash(b,m){var o=b.textContent;b.textContent=m;setTimeout(function(){b.textContent=o},1500)}
function mk(label,cls,fn,aria){var b=document.createElement('button');b.className=cls;b.textContent=label;if(aria)b.setAttribute('aria-label',aria);b.onclick=fn;return b}
function openDialog(title,fill){var d=$('dlg');$('dlgt').textContent=title;var b=$('dlgb');b.innerHTML='';fill(b,function(){d.close()});d.showModal()}
