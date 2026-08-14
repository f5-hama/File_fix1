const svgIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8EB69B"><path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12zM5 14h14v2H5zm0-4h8v2H5zm10 0h4v2h-4z"/></svg>`;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js', { scope: './' }).then(reg => {
            console.log('SW scope: ', reg.scope);
        }).catch(err => {
            console.log('SW err: ', err);
        });
    });
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); deferredPrompt = e;
    document.getElementById('install-app-btn').style.display = 'flex';
});

function installApp() { if (deferredPrompt) { document.getElementById('install-modal').style.display = 'flex'; } }
function confirmInstall() {
    document.getElementById('install-modal').style.display = 'none';
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') { document.getElementById('install-app-btn').style.display = 'none'; }
            deferredPrompt = null;
        });
    }
}

const i18n = {
    ckb: {
        pageTitle: "دەستکاریکەری ژێرنووس", loginTitle: "چوونەژوورەوەی وەرگێڕ", appDesc: "ئەم ماڵپەڕە تایبەتە بە وەرگێڕان و دەستکاریکردنی ژێرنووسی ڤیدیۆ.", loginBtn: "چوونەژوورەوە", logoutBtn: "چوونەدەرەوە", installApp: "دابەزاندنی ئەپ", origFileLbl: "فایلی ئەسڵی (ئینگلیزی/عەرەبی)", clickSelect: "کرتە بکە بۆ هەڵبژاردن", transFileLbl: "فایلی وەرگێڕدراو (ئارەزوومەندانە)", startBtn: "دەستپێکردن", batchBtn: "بە کۆمەڵ/فۆرمات", batchTitle: "کارکردن بە کۆمەڵ لەسەر چەند فایلێک", batchDesc: "دەتوانیت چەندین فایل پێکەوە هەڵبژێریت، کاتەکانیان بگۆڕیت یان فۆرماتەکەیان بگۆڕیت.", batchSelectLbl: "فایلەکان هەڵبژێرە:", batchNoFile: "هیچ فایلێک دیاری نەکراوە", batchTimeLbl: "پێشخستن/دواخستنی کات (بۆ هەموویان):", batchFmtLbl: "فۆرماتی دەرچوون:", applyBtn: "جێبەجێکردن", closeBtn: "داخستن", editorTitle: "دەستکاریکردنی ژێرنووس", backBtn: "گەڕانەوە", searchLbl: "گەڕان و گۆڕین", searchPlh: "گەڕان بەدوای...", replacePlh: "گۆڕین بە...", replaceBtn: "گۆڕین", replaceAllBtn: "هەمووی بگۆڕە", aiBtn: "دانانی وەرگێڕان", dirBtn: "ئاڕاستەی نووسین", saveBtn: "سەیڤکردن و داگرتن", aiTitle: "دانانی وەرگێڕانی AI", aiCopy: "کۆپی ئەسڵی", aiPaste: "پەیست بکە", resumeTitle: "دەتەوێت بەردەوام بیت؟", resumeDesc: "پێدەچێت پێشتر کارێکت تەواو نەکردبێت، دەتەوێت لەو شوێنەی پێشتر وەستایت بەردەوام بیت یان لە سەرەتاوە دەست پێ دەکەیتەوە؟", resumeBtn: "بەردەوامبوون", startNewBtn: "دەستپێکردنەوە", backTitle: "ئایا دڵنیایت؟", confirmBack: "ئایا دڵنیایت دەتەوێت بگەڕێیتەوە؟ کارەکانت سەیڤ نابن گەر داونلۆدت نەکردبێت.", yesLeave: "بەڵێ، دەرچوون", cancelBtn: "پاشگەزبوونەوە", developerInfo: "گەشەپێدەر: <strong>محمد عبدالقادر</strong>", welcomeText: "بەخێربێیت!",
        msgSelect: "تکایە فایل هەڵبژێرە!", msgDone: "پڕۆسەکە تەواو بوو!", msgCopied: "کۆپیکرا!", msgNotFound: "هیچ ئەنجامێک نەدۆزرایەوە!", installModalTitle: "دابەزاندنی ئەپ", installModalDesc: "ئایا دەتەوێت ئەم ماڵپەڕە وەک ئەپێک دابەزێنیتە سەر شاشەی ئامێرەکەت بۆ ئەوەی خێراتر بێت و بەبێ ئینتەرنێتیش کاربکات؟", installConfirmBtn: "دابەزاندن", batchDownloadTitle: "داگرتنی فایلەکان", batchDownloadDesc: "وێبگەڕەکەت داوای مۆڵەت دەکات بۆ داگرتنی چەند فایلێک پێکەوە. تکایە کرتە لە 'ڕێگەدان' یان 'Allow' بکە کاتێک داوات لێدەکرێت بۆ ئەوەی هەموو فایلەکان بێ کێشە دابەزن.", batchDownloadBtn: "دەستپێکردنی داگرتن"
    },
    ar: {
        pageTitle: "محرر الترجمات", loginTitle: "تسجيل دخول المترجم", appDesc: "هذا الموقع مخصص لترجمة وتعديل ترجمات الفيديو.", loginBtn: "تسجيل الدخول", logoutBtn: "تسجيل الخروج", installApp: "تثبيت التطبيق", origFileLbl: "الملف الأصلي (إنجليزي)", clickSelect: "انقر للاختيار", transFileLbl: "ملف الترجمة (اختياري)", startBtn: "البدء", batchBtn: "دفعة/صيغة", batchTitle: "العمل على ملفات متعددة", batchDesc: "يمكنك تحديد عدة ملفات لتغيير أوقاتها أو صيغها معاً.", batchSelectLbl: "اختر الملفات:", batchNoFile: "لم يتم تحديد أي ملف", batchTimeLbl: "تقديم/تأخير الوقت (للجميع):", batchFmtLbl: "صيغة الإخراج:", applyBtn: "تطبيق", closeBtn: "إغلاق", editorTitle: "تعديل الترجمة", backBtn: "رجوع", searchLbl: "بحث واستبدال", searchPlh: "ابحث عن...", replacePlh: "استبدل بـ...", replaceBtn: "استبدال", replaceAllBtn: "استبدال الكل", aiBtn: "إدراج الترجمة", dirBtn: "اتجاه الكتابة", saveBtn: "حفظ وتنزيل", aiTitle: "إدراج ترجمة AI", aiCopy: "نسخ الأصل", aiPaste: "لصق", resumeTitle: "هل تريد الاستمرار؟", resumeDesc: "يبدو أن لديك جلسة غير مكتملة، هل تريد الاستمرار أم البدء من جديد？", resumeBtn: "الاستمرار", startNewBtn: "البدء من جديد", backTitle: "هل أنت متأكد؟", confirmBack: "هل أنت متأكد من الرجوع؟ سيتم فقدان التغييرات إذا لم تقم بحفظها.", yesLeave: "نعم، خروج", cancelBtn: "إلغاء", developerInfo: "المطور: <strong>محمد عبدالقادر</strong>", welcomeText: "مرحباً!",
        msgSelect: "الرجاء تحديد ملف!", msgDone: "اكتملت العملية!", msgCopied: "تم النسخ!", msgNotFound: "لم يتم العثور على نتائج!", installModalTitle: "تثبيت التطبيق", installModalDesc: "هل تريد تثبيت هذا الموقع كتطبيق على جهازك ليعمل بشكل أسرع وبدون إنترنت؟", installConfirmBtn: "تثبيت", batchDownloadTitle: "تنزيل الملفات", batchDownloadDesc: "سيطلب متصفحك الإذن لتنزيل عدة ملفات معاً. يرجى النقر على 'Allow' أو 'سماح' عند المطالبة بذلك.", batchDownloadBtn: "بدء التنزيل"
    },
    en: {
        pageTitle: "Subtitle Editor", loginTitle: "Translator Login", appDesc: "This website is for translating and editing video subtitles.", loginBtn: "Login", logoutBtn: "Logout", installApp: "Install App", origFileLbl: "Original File (English)", clickSelect: "Click to select", transFileLbl: "Translated File (Optional)", startBtn: "Start Editing", batchBtn: "Batch/Format", batchTitle: "Batch Process", batchDesc: "Select multiple files to shift their timing or convert their format.", batchSelectLbl: "Select Files:", batchNoFile: "No files selected", batchTimeLbl: "Time Shift (for all):", batchFmtLbl: "Output Format:", applyBtn: "Apply", closeBtn: "Close", editorTitle: "Editing Subtitle", backBtn: "Back", searchLbl: "Search & Replace", searchPlh: "Search for...", replacePlh: "Replace with...", replaceBtn: "Replace", replaceAllBtn: "Replace All", aiBtn: "Insert Translation", dirBtn: "Text Direction", saveBtn: "Save & Download", aiTitle: "Insert AI Translation", aiCopy: "Copy Original", aiPaste: "Paste", resumeTitle: "Continue Session?", resumeDesc: "It looks like you have an unfinished session. Do you want to continue where you left off or start over?", resumeBtn: "Continue", startNewBtn: "Start Over", backTitle: "Are you sure?", confirmBack: "Are you sure you want to go back? Unsaved changes will be lost.", yesLeave: "Yes, Leave", cancelBtn: "Cancel", developerInfo: "Developer: <strong>Muhammad Abdulqadir</strong>", welcomeText: "Welcome!",
        msgSelect: "Please select a file!", msgDone: "Process completed!", msgCopied: "Copied!", msgNotFound: "No results found!", installModalTitle: "Install App", installModalDesc: "Do you want to install this website as an app on your device for faster access and offline use?", installConfirmBtn: "Install", batchDownloadTitle: "Download Files", batchDownloadDesc: "Your browser will ask for permission to download multiple files. Please click 'Allow' when prompted so all files can be downloaded.", batchDownloadBtn: "Start Download"
    }
};

let currentLang = 'ckb';
let originalData = [];
let isAssFormat = false, isVttFormat = false;
let assHeaderLines = [];
let currentFileName = '';
let historyStack = [], redoStack = []; 
let isEditing = false;
let lastSubtitleIndex = -1, currentSearchIndex = 0;
let pendingBatchDownloads = []; 

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

function changeLanguage(lang) {
    currentLang = lang; 
    document.getElementById('html-tag').setAttribute('dir', lang === 'en' ? 'ltr' : 'rtl');
    document.title = i18n[lang]['pageTitle'];
    document.querySelectorAll('.current-lang-text').forEach(e => { e.innerText = lang === 'en' ? 'English' : (lang === 'ar' ? 'العربية' : 'کوردی'); });
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[lang][key]) { if(el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { el.placeholder = i18n[lang][key]; } else { el.innerHTML = i18n[lang][key]; } }
    });
    if(localStorage.getItem('kf_user')) { document.getElementById('welcome-msg').innerText = i18n[currentLang]['welcomeText']; }
}

function checkLogin() {
    const user = localStorage.getItem('kf_user');
    if(user) {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('setup-screen').style.display = 'flex';
        document.getElementById('welcome-msg').innerText = i18n[currentLang]['welcomeText'] || "بەخێربێیت!";
        if(localStorage.getItem('kf_autosave_session')) { document.getElementById('resume-modal').style.display = 'flex'; }
    } else {
        document.getElementById('login-screen').style.display = 'flex';
        document.getElementById('setup-screen').style.display = 'none';
    }
    const hour = new Date().getHours();
    if(hour >= 19 || hour < 6) document.body.classList.add('dark-theme');
    else document.body.classList.remove('dark-theme');
}

function performLogin() { localStorage.setItem('kf_user', 'true'); checkLogin(); }
function logout() { localStorage.removeItem('kf_user'); checkLogin(); }
window.onload = () => { checkLogin(); changeLanguage('ckb'); };

function toggleLangMenu(btn) { btn.nextElementSibling.classList.toggle('show'); }
document.addEventListener('click', e => { if(!e.target.closest('.custom-select-wrapper')) document.querySelectorAll('.custom-select-menu').forEach(m => m.classList.remove('show')); });

function toggleClearBtn(input, boxId) {
    const box = document.getElementById(boxId);
    if(input.files.length > 0) {
        box.classList.add('has-file');
        box.querySelector('.clear-file-btn').style.display = 'flex';
        box.querySelector('.file-name-display').innerText = input.files[0].name;
    } else { clearFile(input.id, boxId); }
}
function clearFile(inputId, boxId) {
    document.getElementById(inputId).value = '';
    const box = document.getElementById(boxId);
    box.classList.remove('has-file');
    box.querySelector('.clear-file-btn').style.display = 'none';
    box.querySelector('.file-name-display').innerText = i18n[currentLang]['clickSelect'];
}

window.addEventListener('popstate', (e) => {
    if (isEditing) {
        document.getElementById('back-confirm-modal').style.display = 'flex';
        history.pushState({page: 'editor'}, '', '#editor'); 
    }
});
function confirmGoBack() { document.getElementById('back-confirm-modal').style.display = 'flex'; }
function executeGoBack() {
    isEditing = false;
    document.getElementById('back-confirm-modal').style.display = 'none';
    document.getElementById('editor-screen').style.display = 'none';
    document.getElementById('setup-screen').style.display = 'flex';
    document.body.className = document.body.classList.contains('dark-theme') ? 'startup-bg dark-theme' : 'startup-bg';
    closeHeaderVideo();
    clearSession(); 
    history.replaceState(null, '', window.location.pathname);
}

function loadHeaderVideo(input) {
    if(input.files && input.files[0]) {
        const url = URL.createObjectURL(input.files[0]);
        const videoEl = document.getElementById('preview-video');
        videoEl.src = url;
        document.getElementById('video-container').style.display = 'block';
        setupVideoSync();
        document.getElementById('add-video-btn').style.display = 'none';
        document.getElementById('remove-video-btn').style.display = 'flex';
    }
}
function closeHeaderVideo() {
    const videoEl = document.getElementById('preview-video');
    videoEl.pause(); videoEl.src = "";
    document.getElementById('video-container').style.display = 'none';
    document.getElementById('headerVideoInput').value = "";
    document.getElementById('add-video-btn').style.display = 'flex';
    document.getElementById('remove-video-btn').style.display = 'none';
}

function toggleSearchBar() {
    const panel = document.getElementById('searchBarPanel');
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'block'; document.getElementById('searchInput').focus();
    } else { panel.style.display = 'none'; }
}

function findNext(direction = 1) {
    const searchInput = document.getElementById('searchInput'); 
    const searchTerm = searchInput.value.toLowerCase();
    if (!searchTerm) return;
    const textareas = document.querySelectorAll('.subtitle-kurd textarea');
    let found = false; let startIdx = currentSearchIndex;
    if (direction === -1) { startIdx = currentSearchIndex - 2; if (startIdx < 0) startIdx = textareas.length - 1; }
    for (let i = 0; i < textareas.length; i++) {
        let idx = direction === 1 ? (startIdx + i) % textareas.length : (startIdx - i + textareas.length) % textareas.length;
        let text = textareas[idx].value.toLowerCase();
        if (text.indexOf(searchTerm) !== -1) {
            currentSearchIndex = idx + 1;
            const card = textareas[idx].closest('.subtitle-card');
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.style.transition = 'box-shadow 0.3s, transform 0.3s';
            card.style.boxShadow = '0 0 15px var(--primary)';
            card.style.transform = 'scale(1.02)';
            setTimeout(() => { card.style.boxShadow = ''; card.style.transform = ''; }, 1200);
            found = true; break;
        }
    }
    if (!found) { showToast(i18n[currentLang]['msgNotFound'], 'error'); currentSearchIndex = 0; }
}

function replaceText() {
    const searchTerm = document.getElementById('searchInput').value;
    const replaceTerm = document.getElementById('replaceInput').value;
    if (!searchTerm || currentSearchIndex === 0) return;
    const idx = currentSearchIndex - 1;
    const ta = document.querySelectorAll('.subtitle-kurd textarea')[idx];
    if (ta) {
        const matchIndex = ta.value.toLowerCase().indexOf(searchTerm.toLowerCase());
        if (matchIndex !== -1) {
            ta.value = ta.value.substring(0, matchIndex) + replaceTerm + ta.value.substring(matchIndex + searchTerm.length);
            ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px';
            let state = getCurrentState(); historyStack.push(state); saveSession();
        }
    }
    findNext(1);
}

function replaceAllText() {
    const searchTerm = document.getElementById('searchInput').value;
    const replaceTerm = document.getElementById('replaceInput').value;
    if (!searchTerm) return;
    const textareas = document.querySelectorAll('.subtitle-kurd textarea');
    let replacedCount = 0;
    textareas.forEach(ta => {
        if (ta.value.toLowerCase().includes(searchTerm.toLowerCase())) {
            const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
            ta.value = ta.value.replace(regex, replaceTerm);
            ta.style.height = 'auto'; ta.style.height = ta.scrollHeight + 'px';
            replacedCount++;
        }
    });
    if (replacedCount > 0) { 
        let state = getCurrentState(); historyStack.push(state); saveSession();
        showToast(i18n[currentLang]['msgDone'], 'success'); 
    } else { showToast(i18n[currentLang]['msgNotFound'], 'error'); }
}

function openConverterModal() { document.getElementById('converter-modal').style.display = 'flex'; }
function setConverterFormat(fmt) {
    document.getElementById('convertFormatValue').value = fmt;
    document.querySelectorAll('.fmt-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-fmt-' + fmt).classList.add('active');
}
function updateBatchCount(input) {
    const display = document.getElementById('batchCountDisplay');
    if(input.files.length > 0) {
        display.innerText = `${input.files.length} فایل دیاریکراون`; display.style.color = "var(--success)";
    } else { display.innerText = i18n[currentLang]['batchNoFile']; display.style.color = "var(--text-muted)"; }
}

async function prepareBatchProcess() {
    const files = document.getElementById('convertFileInput').files;
    const targetFormat = document.getElementById('convertFormatValue').value;
    const timeShift = parseFloat(document.getElementById('batchTimeShift').value) || 0;
    if (files.length === 0) { showToast(i18n[currentLang]['msgSelect'], "error"); return; }
    pendingBatchDownloads = []; 
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const text = await file.text();
        const isOrigAss = file.name.toLowerCase().endsWith('.ass');
        let parsed = isOrigAss ? parseASSContent(text, true) : (file.name.toLowerCase().endsWith('.vtt') ? parseVTTContent(text) : parseSRTContent(text));
        if (timeShift !== 0) { parsed.forEach(item => { item.startSec = Math.max(0, item.startSec + timeShift); item.endSec = Math.max(0, item.endSec + timeShift); }); }
        let finalContent = "";
        if (targetFormat === 'srt') {
            parsed.forEach((item, idx) => { finalContent += `${idx + 1}\n${formatTimeSRT(item.startSec)} --> ${formatTimeSRT(item.endSec)}\n${item.text}\n\n`; });
        } else if (targetFormat === 'vtt') {
            finalContent = "WEBVTT\n\n";
            parsed.forEach(item => { finalContent += `${formatTimeVTT(item.startSec)} --> ${formatTimeVTT(item.endSec)}\n${item.text}\n\n`; });
        } else if (targetFormat === 'ass') {
            finalContent = `[Script Info]\nTitle: Converted\nScriptType: v4.00+\nWrapStyle: 0\nScaledBorderAndShadow: yes\n\n[V4+ Styles]\nFormat: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding\nStyle: Default,Arial,20,&H00FFFFFF,&H000000FF,&H00000000,&H00000000,0,0,0,0,100,100,0,0,1,2,2,2,10,10,10,1\n\n[Events]\nFormat: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n`;
            parsed.forEach(item => { finalContent += `Dialogue: 0,${formatTimeASS(item.startSec)},${formatTimeASS(item.endSec)},Default,,0,0,0,,${item.text.replace(/\n/g, '\\N')}\n`; });
        }
        const blob = new Blob([finalContent], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        pendingBatchDownloads.push({ url: url, filename: file.name.replace(/\.[^/.]+$/, "") + "_edited." + targetFormat });
    }
    document.getElementById('converter-modal').style.display = 'none';
    document.getElementById('batch-download-modal').style.display = 'flex';
}

async function executeBatchDownload() {
    document.getElementById('batch-download-modal').style.display = 'none';
    for (let i = 0; i < pendingBatchDownloads.length; i++) {
        const item = pendingBatchDownloads[i];
        const a = document.createElement('a'); a.href = item.url; a.download = item.filename; a.click(); 
        URL.revokeObjectURL(item.url);
        await new Promise(r => setTimeout(r, 800)); 
    }
    showToast(i18n[currentLang]['msgDone'], "success");
    pendingBatchDownloads = []; 
}

function timeToSeconds(str) {
    if(!str) return 0; let p = str.replace(',', '.').split(':');
    return (parseFloat(p[0])||0)*3600 + (parseFloat(p[1])||0)*60 + (parseFloat(p[2])||0);
}
function formatTimeSRT(sec) {
    let h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=Math.floor(sec%60), ms=Math.round((sec-Math.floor(sec))*1000);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')},${String(ms).padStart(3,'0')}`;
}
function formatTimeASS(sec) {
    let h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=Math.floor(sec%60), cs=Math.round((sec-Math.floor(sec))*100);
    return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(cs).padStart(2,'0')}`;
}
function formatTimeVTT(sec) {
    let h=Math.floor(sec/3600), m=Math.floor((sec%3600)/60), s=Math.floor(sec%60), ms=Math.round((sec-Math.floor(sec))*1000);
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(ms).padStart(3,'0')}`;
}
function extLines(raw) { return raw.split(/\\[Nn]/).map(l => ({ tags: (l.match(/\{[^}]+\}/g)||[]).join(''), text: l.replace(/\{[^}]+\}/g,'').trim() })); }

function parseASSContent(data, isOrig) {
    let items = []; if(isOrig) assHeaderLines = []; let id=1;
    data.split(/\r?\n/).forEach(line => {
        if(line.startsWith('Dialogue:')) {
            let p = line.split(','); if(p.length >= 10) {
                let t = extLines(p.slice(9).join(','));
                items.push({ id: id++, time: `${p[1]} --> ${p[2]}`, startSec: timeToSeconds(p[1]), endSec: timeToSeconds(p[2]), assPrefix: p.slice(0,9).join(',')+',', parsedLines: t, text: t.map(l=>l.text).join('\n') });
            }
        } else if (isOrig) assHeaderLines.push(line);
    }); return items;
}
function parseSRTContent(data) {
    return data.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n\n').map(b => {
        let l = b.split('\n'); let timeLineIdx = l.findIndex(x => x.includes('-->'));
        if(timeLineIdx !== -1) {
            let t = l[timeLineIdx].split('-->'); let st = t[0]?t[0].trim():'0', en=t[1]?t[1].trim():'0';
            let pl = extLines(l.slice(timeLineIdx + 1).join('\n').replace(/\n/g, '\\N'));
            return { id: l[0], time: l[timeLineIdx], startSec: timeToSeconds(st), endSec: timeToSeconds(en), assPrefix: '', parsedLines: pl, text: pl.map(x=>x.text).join('\n') };
        } return null;
    }).filter(i => i!==null);
}
function parseVTTContent(data) {
    let items=[], id=1;
    data.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n\n').forEach(b => {
        if(b.startsWith('WEBVTT')) return;
        let l = b.split('\n'); let ti = l.findIndex(x=>x.includes('-->'));
        if(ti !== -1) {
            let t = l[ti].split('-->'); let st = t[0]?t[0].trim():'0', en=t[1]?t[1].trim().split(' ')[0]:'0';
            let pl = extLines(l.slice(ti+1).join('\n').replace(/\n/g, '\\N'));
            items.push({ id: id++, time: `${st} --> ${en}`, startSec: timeToSeconds(st), endSec: timeToSeconds(en), assPrefix: '', parsedLines: pl, text: pl.map(x=>x.text).join('\n') });
        }
    }); return items;
}

function saveSession() {
    if(!isEditing) return;
    const session = { originalData, currentFileName, isAssFormat, isVttFormat, assHeaderLines, savedState: getCurrentState() };
    localStorage.setItem('kf_autosave_session', JSON.stringify(session));
}
function clearSession() { localStorage.removeItem('kf_autosave_session'); document.getElementById('resume-modal').style.display = 'none'; }
function resumeSession() {
    try {
        const session = JSON.parse(localStorage.getItem('kf_autosave_session'));
        originalData = session.originalData; currentFileName = session.currentFileName;
        isAssFormat = session.isAssFormat; isVttFormat = session.isVttFormat; assHeaderLines = session.assHeaderLines;
        buildEditorUI(session.savedState);
        document.getElementById('resume-modal').style.display = 'none';
    } catch(e) { clearSession(); showToast("هەڵە لە هێنانەوەی فایلەکان ڕوویدا", "error"); }
}

async function startEditing() {
    const fOrig = document.getElementById('fileOriginal').files[0];
    const fKurd = document.getElementById('fileKurdish').files[0];
    if(!fOrig) { showToast(i18n[currentLang]['msgSelect'], "error"); return; }
    currentFileName = fOrig.name; isAssFormat = fOrig.name.toLowerCase().endsWith('.ass'); isVttFormat = fOrig.name.toLowerCase().endsWith('.vtt'); 
    originalData = isAssFormat ? parseASSContent(await fOrig.text(), true) : (isVttFormat ? parseVTTContent(await fOrig.text()) : parseSRTContent(await fOrig.text()));
    let kurdData = fKurd ? (fKurd.name.toLowerCase().endsWith('.ass') ? parseASSContent(await fKurd.text(), false) : (fKurd.name.toLowerCase().endsWith('.vtt') ? parseVTTContent(await fKurd.text()))) : [];
    let state = originalData.map((orig, i) => kurdData[i] ? kurdData[i].text : '');
    buildEditorUI(state);
}

function buildEditorUI(kurdishState = []) {
    let html = '';
    for(let i=0; i<originalData.length; i++) {
        let orig = originalData[i]; let kText = kurdishState[i] || '';
        html += `<div class="subtitle-card" data-index="${i}">
            <div class="subtitle-header">
                <div style="display:flex; gap:10px; align-items:center;">
                    <div class="subtitle-line-num">#${i+1}</div>
                    <button class="play-sub-btn" onclick="seekToSubtitle(${i})"><svg style="width:16px;height:16px;" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>
                </div>
                <div class="subtitle-time">${orig.time}</div>
            </div>
            <div class="subtitle-orig">${orig.text.replace(/\n/g, '<br>')}</div>
            <div class="subtitle-kurd"><textarea>${kText}</textarea></div>
        </div>`;
    }
    document.getElementById('subtitles-container').innerHTML = html;
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('editor-screen').style.display = 'block';
    document.body.className = document.body.classList.contains('dark-theme') ? 'editor-bg dark-theme' : 'editor-bg';
    isEditing = true; historyStack = [getCurrentState()]; updateProgress();
    history.pushState({page: 'editor'}, '', '#editor');
    document.getElementById('add-video-btn').style.display = 'flex';
    document.getElementById('remove-video-btn').style.display = 'none';
    document.getElementById('subtitles-container').addEventListener('input', e => {
        if(e.target.tagName === 'TEXTAREA') {
            e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px';
            updateProgress();
            clearTimeout(window.typingTimer);
            window.typingTimer = setTimeout(() => {
                let state = getCurrentState();
                if(JSON.stringify(historyStack[historyStack.length-1]) !== JSON.stringify(state)) {
                    historyStack.push(state);
                    if(historyStack.length > 30) historyStack.shift();
                    redoStack = []; saveSession(); 
                }
            }, 1000);
        }
    });
    saveSession(); 
}

function getCurrentState() { return Array.from(document.querySelectorAll('.subtitle-kurd textarea')).map(t => t.value); }
function undo() { if(historyStack.length > 1) { redoStack.push(historyStack.pop()); restoreState(historyStack[historyStack.length-1]); saveSession(); } }
function redo() { if(redoStack.length > 0) { let s = redoStack.pop(); historyStack.push(s); restoreState(s); saveSession(); } }
function restoreState(s) { document.querySelectorAll('.subtitle-kurd textarea').forEach((t, i) => { if(s[i]!==undefined) t.value = s[i]; }); }
function updateProgress() {
    let tas = document.querySelectorAll('.subtitle-kurd textarea');
    let filled = Array.from(tas).filter(t => t.value.trim() !== '').length;
    document.getElementById('progress-bar').style.width = tas.length ? (filled/tas.length*100)+'%' : '0%';
}
function toggleDirection() { document.querySelectorAll('.subtitle-kurd textarea').forEach(ta => ta.setAttribute('dir', ta.getAttribute('dir')==='ltr'?'rtl':'ltr')); }

function setupVideoSync() {
    const video = document.getElementById('preview-video');
    video.addEventListener('timeupdate', () => {
        let ct = video.currentTime; let found = -1;
        for(let i=0; i<originalData.length; i++) { if(ct >= originalData[i].startSec && ct <= originalData[i].endSec) { found = i; break; } }
        if(found !== lastSubtitleIndex) {
            lastSubtitleIndex = found;
            document.querySelectorAll('.active-sub').forEach(el => el.classList.remove('active-sub'));
            if(found !== -1) {
                let card = document.querySelector(`.subtitle-card[data-index="${found}"]`);
                if(card) { card.classList.add('active-sub'); document.getElementById('video-subtitle-overlay').innerHTML = (card.querySelector('textarea').value || originalData[found].text).replace(/\n/g, '<br>'); }
            } else document.getElementById('video-subtitle-overlay').innerHTML = '';
        }
    });
}
function seekToSubtitle(idx) { let vid = document.getElementById('preview-video'); if(vid && originalData[idx] && document.getElementById('video-container').style.display !== 'none') { vid.currentTime = originalData[idx].startSec; vid.play(); } }

function copyForAI() {
    let t = originalData.map((x,i) => `[${i+1}] ${x.text.replace(/\n/g, ' ')}`).join('\n');
    let ta = document.createElement("textarea"); ta.value = t; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); showToast(i18n[currentLang]['msgCopied'], "success");
}
async function pasteFromClipboard() { try { document.getElementById('ai-paste-area').value = await navigator.clipboard.readText(); } catch(e){} }
function processAIPaste() {
    let txt = document.getElementById('ai-paste-area').value; let m;
    let regex = /\[(\d+)\]\s*([\s\S]*?)(?=\n\s*\[\d+\]|$)/g;
    while((m = regex.exec(txt)) !== null) {
        let card = document.querySelector(`.subtitle-card[data-index="${parseInt(m[1])-1}"]`);
        if(card) card.querySelector('textarea').value = m[2].trim();
    }
    document.getElementById('ai-modal').style.display = 'none'; updateProgress(); saveSession();
}

// فەنکشنی دەستپێکردنی پرۆسەی وەرگێڕانی خودکار بە مۆدێلی Gemini 3.1 Pro
async function startAutoTranslation() {
    const apiKey = document.getElementById('ai-api-key').value.trim();
    if (!apiKey) {
        showToast("تکایە سەرەتا Google API Key بنووسە!", "error");
        return;
    }
    const statusDiv = document.getElementById('ai-status');
    const startBtn = document.getElementById('start-ai-btn');
    startBtn.disabled = true; statusDiv.innerText = "ئامادەکاری دەکرێت...";
    const batchSize = 25; const total = originalData.length;
    try {
        for (let i = 0; i < total; i += batchSize) {
            const batch = originalData.slice(i, i + batchSize);
            statusDiv.innerText = `وەرگێڕانی دێڕەکانی ${i + 1} تا ${Math.min(i + batchSize, total)} لە کۆی ${total}...`;
            let textToTranslate = batch.map((x, idx) => `[${i + idx + 1}] ${x.text.replace(/\n/g, ' ')}`).join('\n');
            const responseText = await callGeminiAPI(textToTranslate, apiKey);
            parseAndFillAIResult(responseText);
            updateProgress(); saveSession();
            await new Promise(r => setTimeout(r, 600)); 
        }
        statusDiv.innerText = "وەرگێڕان بە سەرکەوتوویی تەواو بوو!";
        statusDiv.style.color = "var(--success)";
        showToast("وەرگێڕانی خودکار تەواو بوو!", "success");
    } catch (error) {
        console.error(error);
        statusDiv.innerText = "هەڵەیەک لە کاتی پەیوەندیکردن بە سێرڤەر ڕوویدا.";
        statusDiv.style.color = "#ef4444";
        showToast("هەڵەیەک ڕوویدا!", "error");
    } finally { startBtn.disabled = false; }
}

async function callGeminiAPI(text, apiKey) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-pro:generateContent?key=${apiKey}`;
    const systemInstruction = `You are a professional subtitle translator translating to Kurdish Sorani. Ensure natural, meaning-based translation rather than word-for-word translation. Think deeply and twice to ensure absolute Kurdish translation quality.

Strict Formatting Rules:
1. Character names must be enclosed in parentheses, e.g., (Luffy).
2. Country, city, and village names must be enclosed in double quotes, e.g., "Tokyo".
3. Honorific Suffixes (like -san, -chan, -kun) must be attached outside the parentheses, e.g., (Luffy)-san.
4. If Kurdish vowel suffixes follow a name or place, attach them using a filler 'ـ' directly after the closed punctuation, e.g., ئەوە (لوفی)ـیە or ئەمە "تۆکیۆ" ـیە.
5. Translate idioms, expressions or proverbs to their closest natural Kurdish equivalent meaning.
6. Remove emotional/interjection filler words (like "Ah", "Oh", "Ugh", "Ahhh", "ئاخ", "ئۆف", "ئۆهـ") unless they are crucial to the actual sentence meaning.
7. If a sentence requires an explanatory note, add it on a new line below the translation, enclosed in parentheses and colored yellow using HTML font tags: <font color="#ffff00">(تێبینی: [note])</font>.
8. Convert LTR text style to RTL.
9. If "you two" or "you three" is mentioned, translate as "ئەو دووانەتان" or "ئەو سیانەتان".
10. Remove single trailing periods (.) from the end of subtitles. However, preserve ellipses (...), commas (، or ,), exclamation marks (!), and question marks (؟ or ?) exactly as they appear in the source.
11. Output format MUST strictly be: [Number] Translated Text. Do not output anything else.`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [ { parts: [ { text: text } ] } ],
            systemInstruction: { parts: [ { text: systemInstruction } ] },
            generationConfig: { temperature: 0.2 }
        })
    });
    if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error?.message || "Failed to fetch from Gemini API");
    }
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
}

function parseAndFillAIResult(translatedText) {
    let m;
    let regex = /\[(\d+)\]\s*([\s\S]*?)(?=\n\s*\[\d+\]|$)/g;
    while((m = regex.exec(translatedText)) !== null) {
        const index = parseInt(m[1]) - 1;
        const card = document.querySelector(`.subtitle-card[data-index="${index}"]`);
        if(card) {
            const textarea = card.querySelector('textarea');
            textarea.value = m[2].trim();
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }
}

function downloadEditedFile() {
    let final = isAssFormat ? (assHeaderLines.join('\n')+'\n') : "";
    document.querySelectorAll('.subtitle-card').forEach(card => {
        let idx = card.getAttribute('data-index'); let orig = originalData[idx];
        let kt = card.querySelector('textarea').value.trim();
        if(kt !== "") {
            let kl = kt.split('\n'); let ol = orig.parsedLines || [];
            let fp = []; 
            for(let j=0; j<Math.max(kl.length, ol.length); j++) { fp.push((ol[j]?ol[j].tags:'') + (kl[j]!==undefined ? kl[j] : '')); }
            if(isAssFormat) { final += (orig.assPrefix || '') + fp.join('\\N') + '\n'; } 
            else if (isVttFormat) { final += formatTimeVTT(orig.startSec) + " --> " + formatTimeVTT(orig.endSec) + '\n' + fp.join('\n') + '\n\n'; } 
            else { final += (parseInt(idx)+1) + '\n' + formatTimeSRT(orig.startSec) + " --> " + formatTimeSRT(orig.endSec) + '\n' + fp.join('\n') + '\n\n'; }
        }
    });
    if(isVttFormat) final = "WEBVTT\n\n" + final;
    let blob = new Blob([final.trim()], {type: 'application/octet-stream'}); let a = document.createElement('a');
    a.href = URL.createObjectURL(blob); const extension = isAssFormat ? '.ass' : (isVttFormat ? '.vtt' : '.srt');
    a.download = 'Edited_' + currentFileName.replace(/\.[^/.]+$/, "") + extension; a.click();
    clearSession();
}