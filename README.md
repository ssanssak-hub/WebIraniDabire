# نویسنده با فونت — نسخه‌ی وب

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
