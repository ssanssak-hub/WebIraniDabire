# دبیره ایرانی — نسخه‌ی وب

ساختار فایل‌ها مثل اپ اندروید است؛ هر فایل یک کار دارد:

| فایل وب | معادل در اندروید |
|---|---|
| js/main.js | MainActivity.kt |
| js/custom-keyboard-view.js | CustomKeyboardView.kt |
| js/unicode-scripts.js | UnicodeScripts.kt |
| js/font-unicode-reader.js | FontUnicodeReader.kt |
| js/font-name-reader.js | FontNameReader.kt |
| js/font-manager.js | FontManager.kt |
| js/theme-manager.js | ThemeManager.kt |
| js/export-utils.js | ExportUtils.kt |
| js/image-text-editor.js | ImageTextEditorActivity.kt |
| js/saved-files.js | SavedFilesActivity.kt |

## اضافه کردن فونت
فایل (.ttf / .otf / .ttc) را داخل `fonts/` بگذار و اسمش را به `fonts/fonts.json` اضافه کن.
فونت اول لیست (بعد از مرتب‌سازی الفبایی) پیش‌فرض است؛ کاربر از دکمه‌ی «فونت» انتخاب می‌کند.

## اجرا
فقط روی http/https کار می‌کند (هاست، یا سرور محلی مثل `python3 -m http.server`)؛ با دوبار کلیک روی index.html کار نمی‌کند.

## تم‌ها و ظاهر سایت
- تم‌ها (۱۷ تم، روشن/تاریک) در `js/theme-manager.js` هستند و روی **همهٔ صفحه‌ها** اعمال می‌شوند؛ هر صفحه این فایل و `js/utils.js` را در `<head>` بارگذاری می‌کند.
- دکمهٔ 🎨 و دکمهٔ ☾/☀ در سرصفحه، پنجرهٔ انتخاب تم را باز می‌کنند؛ انتخاب کاربر بین همهٔ صفحه‌ها مشترک است (`localStorage`).
- تم پیش‌فرض: `st.theme` در `js/utils.js` (الان `indigo`).
- جلوه‌های متحرک در `css/site.css` و `js/site.js` هستند و با `prefers-reduced-motion` خودکار خاموش می‌شوند.

## خط‌های پهلوی (در `js/unicode-scripts.js`)
| نام در فهرست | بازهٔ یونی‌کد |
|---|---|
| پهلوی زبوری | U+10B80–10BAF |
| پهلوی کتابی (دستورمند) | U+0590–05FF (بلوک عبری) |
| پهلوی کتابی (بی‌دستور) | U+E000–F8FF (ناحیهٔ خصوصی) |

## تخته کلید (keyboard.html)
- خود کیبورد اسکرول عمودی دارد (`#kb` در `css/style.css`)؛ ردیف کنترل‌ها و ردیف «اخیر» بالای آن چسبیده می‌ماند و کادر متن همیشه در دید است.
- کیبورد اسکرول مستقل از صفحه دارد (`overscroll-behavior:contain`)؛ با رسیدن به انتهای کیبورد، صفحه اسکرول نمی‌شود. کادر متن هم زیر سرصفحه می‌چسبد و هنگام اسکرول صفحه همیشه در دید است.
- کادر متن با تایپ خودکار به آخرین خط اسکرول می‌شود و شمارندهٔ نویسه دارد.
- ردیف «اخیر»: ۱۲ نویسهٔ آخری که زده‌ای (در `st.recent` ذخیره می‌شود).
- پشتیبانی از کیبورد فیزیکی: Backspace، Enter، Space، Ctrl+Z، Ctrl+Y.
- لرزش کوتاه روی موبایل هنگام زدن کلید.
