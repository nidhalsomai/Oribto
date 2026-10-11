(function(){
    'use strict';

    /* ============================================================
       I18N
       ============================================================ */
    var I18N = {
        en:{today:"Today",stats:"Stats",settings:"Settings",theme:"Theme",pomodoro:"Pomodoro",short:"Short Break",long:"Long Break",start:"Start",pause:"Pause",resume:"Resume",reset:"Reset",skip:"Skip",tasks:"Tasks",est:"Est.",add:"Add",taskPh:"Add a task",noTask:"No task selected.",noTasks:"No tasks yet.",profileSection:"Profile",focusSection:"Focus",tasksSection:"Tasks",soundSection:"Sound",keysSection:"Keyboard shortcuts",dangerSection:"Reset",autoBreaks:"Auto Start Breaks",autoPomos:"Auto Start Pomodoros",interval:"Long Break interval",autoCheck:"Auto Check Tasks",checkBottom:"Check to Bottom",alarmSound:"Alarm Sound",focusSound:"Focus Sound",volume:"Volume",repeat:"Repeat",kitchen:"Kitchen",bell:"Bell",digital:"Digital",none:"None",thisWeek:"This week",allTime:"All time",minutes:"minutes",sessions:"sessions",noData:"No data yet.",testSound:"Test sound",hintStart:"start / pause",hintReset:"reload",hintFocus:"focus",hintStats:"stats",hintNew:"new task",hintClose:"close",toastAdded:"Task added",toastRemoved:"Task removed",toastTheme:"Theme changed",toastFocus:"Focus mode",toastFocusOff:"Focus off",toastReset:"Timer reset",welcomeTitle:"Welcome to FocusFlow",welcomeSub:"Pick a name to get started. No account needed.",nameLabel:"Your name",nameHint:"2–30 characters. Be kind.",continueBtn:"Continue",nameSaved:"Name saved",nameBlocked:"That name isn't allowed. Please pick another.",nameTooShort:"Name must be at least 2 characters.",nameTooLong:"Name must be 30 characters or less.",wipeBtn:"Erase all my data",wipeConfirm:"Delete all your tasks, sessions, and settings? This cannot be undone.",wipeDone:"Everything erased."},
        fr:{today:"Aujourd’hui",stats:"Statistiques",settings:"Paramètres",theme:"Thème",pomodoro:"Pomodoro",short:"Pause courte",long:"Pause longue",start:"Démarrer",pause:"Pause",resume:"Reprendre",reset:"Réinitialiser",skip:"Passer",tasks:"Tâches",est:"Est.",add:"Ajouter",taskPh:"Ajouter une tâche",noTask:"Aucune tâche sélectionnée.",noTasks:"Aucune tâche pour le moment.",profileSection:"Profil",focusSection:"Concentration",tasksSection:"Tâches",soundSection:"Son",keysSection:"Raccourcis clavier",dangerSection:"Réinitialiser",autoBreaks:"Démarrer les pauses automatiquement",autoPomos:"Démarrer la concentration automatiquement",interval:"Intervalle de pause longue",autoCheck:"Cocher les tâches automatiquement",checkBottom:"Tâches cochées en bas de liste",alarmSound:"Son de l’alarme",focusSound:"Son de concentration",volume:"Volume",repeat:"Répétitions",kitchen:"Cuisine",bell:"Cloche",digital:"Numérique",none:"Aucun",thisWeek:"Cette semaine",allTime:"Tout le temps",minutes:"minutes",sessions:"séances",noData:"Aucune donnée.",testSound:"Tester le son",hintStart:"démarrer / pause",hintReset:"recharger",hintFocus:"focus",hintStats:"stats",hintNew:"nouvelle tâche",hintClose:"fermer",toastAdded:"Tâche ajoutée",toastRemoved:"Tâche supprimée",toastTheme:"Thème modifié",toastFocus:"Mode focus",toastFocusOff:"Focus désactivé",toastReset:"Minuteur réinitialisé",welcomeTitle:"Bienvenue sur FocusFlow",welcomeSub:"Choisissez un nom pour commencer. Aucun compte requis.",nameLabel:"Votre nom",nameHint:"2 à 30 caractères. Restez courtois.",continueBtn:"Continuer",nameSaved:"Nom enregistré",nameBlocked:"Ce nom n’est pas autorisé. Choisissez-en un autre.",nameTooShort:"Le nom doit contenir au moins 2 caractères.",nameTooLong:"Le nom ne doit pas dépasser 30 caractères.",wipeBtn:"Effacer toutes mes données",wipeConfirm:"Supprimer toutes vos tâches, sessions et paramètres ? Action irréversible.",wipeDone:"Tout a été effacé."},
        ar:{today:"اليوم",stats:"الإحصائيات",settings:"الإعدادات",theme:"المظهر",pomodoro:"بومودورو",short:"استراحة قصيرة",long:"استراحة طويلة",start:"ابدأ",pause:"إيقاف مؤقت",resume:"متابعة",reset:"إعادة الضبط",skip:"تخطٍ",tasks:"المهام",est:"التقدير",add:"إضافة",taskPh:"أضف مهمة",noTask:"لم يتم تحديد مهمة.",noTasks:"لا توجد مهام بعد.",profileSection:"الملف الشخصي",focusSection:"تركيز",tasksSection:"المهام",soundSection:"الصوت",keysSection:"اختصارات لوحة المفاتيح",dangerSection:"إعادة الضبط",autoBreaks:"بدء الاستراحات تلقائيًا",autoPomos:"بدء جلسات التركيز تلقائيًا",interval:"الفاصل الزمني للاستراحة الطويلة",autoCheck:"تحديد المهام تلقائيًا",checkBottom:"نقل المكتملة إلى الأسفل",alarmSound:"صوت التنبيه",focusSound:"صوت التركيز",volume:"مستوى الصوت",repeat:"التكرار",kitchen:"مطبخ",bell:"جرس",digital:"رقمي",none:"بدون",thisWeek:"هذا الأسبوع",allTime:"كل الوقت",minutes:"دقيقة",sessions:"جلسات",noData:"لا توجد بيانات بعد.",testSound:"اختبار الصوت",hintStart:"ابدأ / إيقاف",hintReset:"إعادة التحميل",hintFocus:"تركيز",hintStats:"الإحصائيات",hintNew:"مهمة جديدة",hintClose:"إغلاق",toastAdded:"تمت إضافة المهمة",toastRemoved:"تم حذف المهمة",toastTheme:"تم تغيير المظهر",toastFocus:"وضع التركيز",toastFocusOff:"تم إيقاف التركيز",toastReset:"تمت إعادة الضبط",welcomeTitle:"مرحبًا بك في FocusFlow",welcomeSub:"اختر اسمًا للبدء. لا حاجة إلى حساب.",nameLabel:"اسمك",nameHint:"من 2 إلى 30 حرفًا. كن لطيفًا.",continueBtn:"متابعة",nameSaved:"تم حفظ الاسم",nameBlocked:"هذا الاسم غير مسموح. اختر اسمًا آخر.",nameTooShort:"يجب أن يتكون الاسم من حرفين على الأقل.",nameTooLong:"يجب ألا يتجاوز الاسم 30 حرفًا.",wipeBtn:"حذف جميع بياناتي",wipeConfirm:"حذف كل المهام والجلسات والإعدادات؟ لا يمكن التراجع.",wipeDone:"تم حذف كل شيء."}
    };

    /* ============================================================
       PROFANITY FILTER  (EN / FR / AR + Tunisian slang)
       ============================================================ */

    // Slurs + hard slurs — block if found anywhere as substring
    var HARD_BLOCK = [
        // English — racial/ethnic/homophobic slurs
        'nigger','nigga','niglet','niggress','faggot','fagot','fagg','tranny','trannie',
        'kike','spic','wetback','chink','gook','raghead','towelhead','coon','darkie','darky',
        'paki','beaner','gringo','kraut','slope','jap','wop','dago','guinea','polack',
        'retard','retarded','spastic','mongoloid','autist',
        // English — strong sexual/violent
        'fuck','motherfuck','cocksucker','cuntsucker','bullshit','pieceofshit',
        'rapist','pedophile','paedophile','pedo','childporn','bestiality','necrophil',
        'hitler','nazi','nazis','kkk','whitepower','siegheil',
        // French — strong
        'encul','encule','niqu','nique','putain','salope','salaud','pute','petasse','pétasse',
        'connard','connasse','baisé','baise','foutre','foutu','merdeux','merdeuse',
        'pede','pédé','pd','tapette','negre','nègre','negro','bamboula','bougnoule',
        'raton','youpin','feuj','crouille','bicot','rital','schleu',
        // Arabic — strong (written without diacritics, normalized forms)
        'قحبه','قحبة','شرموط','شرموطه','عاهره','عاهرة','لوطي','خول','زبي','زب','كس','كسمك','كسه','نيك','ينيك','منيك','عرص','معرص','خنزير','كلب','حمار','حقير','تافه','خرا','زباله','زبالة','قذر','نصاب','كذاب','ياخي','ملعون','لعنة','طز','مص','يمص'
    ];

    // Whole-word blocks — only block if the token IS the word
    var WORD_BLOCK = [
        'ass','arse','dick','cock','pussy','bitch','bastard','damn','crap','piss','shit',
        'porn','rape','slut','whore','sex','sexy','tit','tits','boob','boobs','prick',
        'con','cul','sein','bites','chatte','couille','couilles','fesse','fesses',
        'زق','خر','طيز','صرم','فرخ','كلبة','حمارة'
    ];

    // Leetspeak + Unicode normalization
    function normalize(str){
        var s = String(str).normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // strip diacritics
        s = s.toLowerCase();
        // Leetspeak substitutions
        var leet = {
            '0':'o','1':'i','3':'e','4':'a','5':'s','7':'t','8':'b','9':'g',
            '@':'a','$':'s','!':'i','|':'i','+':'t'
        };
        s = s.replace(/[013457890@$!|+]/g, function(c){ return leet[c] || c; });
        // Arabic normalization
        s = s.replace(/[أإآٱ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/ـ/g,'');
        s = s.replace(/[\u064B-\u065F\u0670]/g,''); // remove tashkeel
        return s;
    }

    // Split into tokens, stripping separators so "f u c k" and "f.u.c.k" both catch
    function tokenize(norm){
        // Replace common separators with space, then split
        var spaced = norm.replace(/[\s._\-*+=\/\\|,;:!?()\[\]{}'"`~^$#%&<>=]+/g, ' ');
        var tokens = spaced.split(/\s+/).filter(Boolean);
        // Also produce a "collapsed" version for substring check
        var collapsed = norm.replace(/[^\p{L}\p{N}]+/gu, '');
        return { tokens: tokens, collapsed: collapsed };
    }

    function containsBlockedName(rawName){
        if (!rawName || typeof rawName !== 'string') return false;
        var norm = normalize(rawName);
        if (!norm.trim()) return false;
        var parts = tokenize(norm);

        // 1. Hard block: check the collapsed string for any hard-blocked substring
        for (var i = 0; i < HARD_BLOCK.length; i++){
            var w = HARD_BLOCK[i];
            if (parts.collapsed.indexOf(w) !== -1) return true;
        }

        // 2. Word block: check each token against the whole-word list
        var tokenSet = {};
        parts.tokens.forEach(function(t){ tokenSet[t] = true; });
        for (var j = 0; j < WORD_BLOCK.length; j++){
            if (tokenSet[WORD_BLOCK[j]]) return true;
        }

        // 3. Repeated-character evasion (fuuuuck, niiiigger)
        var squeezed = parts.collapsed.replace(/(.)\1+/g, '$1');
        for (var k = 0; k < HARD_BLOCK.length; k++){
            if (squeezed.indexOf(HARD_BLOCK[k]) !== -1) return true;
        }

        return false;
    }

    /* ============================================================
       STORAGE
       ============================================================ */
    var LS = {
        get:function(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},
        set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}},
        del:function(k){try{localStorage.removeItem(k)}catch(e){}}
    };

    function todayKey(){
        var d = new Date();
        return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
    }

    /* ============================================================
       STATE
       ============================================================ */
    var state = {
        lang: LS.get('ff_lang','en'),
        theme: LS.get('ff_theme','ember'),
        mode:'pomodoro',
        remaining:25*60,
        total:25*60,
        running:false,
        lastTick:0,
        sessionCount: LS.get('ff_sessions_'+todayKey(), 0),
        activeTaskId: LS.get('ff_active', null),
        tasks: LS.get('ff_tasks', []),
        history: LS.get('ff_history', []),
        name: LS.get('ff_name', ''),
        settings: Object.assign({
            pomodoro:25,short_break:5,long_break:15,long_break_interval:4,
            auto_start_breaks:0,auto_start_pomodoros:0,auto_check_tasks:0,
            check_to_bottom:0,alarm_sound:'kitchen',alarm_volume:60,
            alarm_repeat:1,focus_sound:'none',focus_volume:40
        }, LS.get('ff_settings', {})),
        themeToastShown:false
    };

    /* ============================================================
       UTIL
       ============================================================ */
    function $(s){return document.querySelector(s)}
    function $$(s){return [].slice.call(document.querySelectorAll(s))}
    function T(k){return (I18N[state.lang]||I18N.en)[k]||I18N.en[k]||k}
    function esc(s){
        return String(s).replace(/[&<>"']/g, function(c){
            return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
        });
    }

    /* ============================================================
       TOAST
       ============================================================ */
    var toastTimers = {};
    function toast(msg, key, duration, isError){
        if (!msg) return;
        var wrap = $('#toastWrap');
        if (!wrap) return;
        var el = document.createElement('div');
        el.className = 'toast' + (isError ? ' err' : '');
        el.textContent = msg;
        wrap.appendChild(el);
        key = key || msg;
        clearTimeout(toastTimers[key]);
        toastTimers[key] = setTimeout(function(){
            el.classList.add('out');
            setTimeout(function(){ el.remove() }, 200);
        }, duration || 1500);
        var all = wrap.querySelectorAll('.toast');
        if (all.length > 3) all[0].remove();
    }

    /* ============================================================
       AUDIO
       ============================================================ */
    var actx = null;
    function ensureAudio(){
        if (!actx){
            try{ actx = new (window.AudioContext||window.webkitAudioContext)(); }
            catch(e){ actx = null; }
        }
        if (actx && actx.state === 'suspended') actx.resume();
        return actx;
    }
    function playTone(freq, startOffset, dur, type, vol){
        var o = actx.createOscillator();
        var g = actx.createGain();
        o.type = type;
        o.frequency.value = freq;
        var t0 = actx.currentTime + startOffset;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g).connect(actx.destination);
        o.start(t0);
        o.stop(t0 + dur + 0.05);
    }
    function playSound(kind, volume){
        if (kind === 'none' || !volume) return;
        if (!ensureAudio()) return;
        var v = Math.min(0.35, (volume/100)*0.28);
        if (kind === 'bell'){
            playTone(880,0,1.4,'sine',v);
            playTone(1318,0.15,1.1,'sine',v*0.7);
            playTone(1760,0.30,0.9,'sine',v*0.5);
        } else if (kind === 'digital'){
            playTone(1200,0,0.09,'square',v*0.8);
            playTone(1200,0.14,0.09,'square',v*0.8);
            playTone(1200,0.28,0.09,'square',v*0.8);
        } else {
            playTone(1568,0,0.35,'sine',v);
            playTone(2093,0.10,0.30,'sine',v*0.7);
        }
    }

    /* ============================================================
       I18N + THEME
       ============================================================ */
    function applyI18n(){
        var dir = state.lang==='ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = state.lang;
        document.documentElement.dir = dir;
        $$('[data-i18n]').forEach(function(el){
            var k = el.getAttribute('data-i18n');
            if (T(k)) el.textContent = T(k);
        });
        $$('[data-i18n-ph]').forEach(function(el){
            var k = el.getAttribute('data-i18n-ph');
            if (T(k)) el.setAttribute('placeholder', T(k));
        });
    }

    function applyTheme(t, silent){
        var themes = ['ember','ocean','sage','lavender','rose'];
        if (themes.indexOf(t)<0) t='ember';
        state.theme = t;
        themes.forEach(function(x){document.body.classList.remove('t-'+x)});
        document.body.classList.add('t-'+t);
        LS.set('ff_theme', t);
        $$('.theme-dot').forEach(function(d){d.classList.toggle('active', d.dataset.t===t)});
        if (!silent && !state.themeToastShown){
            state.themeToastShown = true;
            toast(T('toastTheme'), 'theme', 900);
        }
    }

    /* ============================================================
       NAME
       ============================================================ */
    function setDisplayName(name){
        state.name = name;
        LS.set('ff_name', name);
        var initial = (name || '?').trim().charAt(0).toUpperCase();
        $('#nameInitial').textContent = initial;
        $('#nameText').textContent = name;
        var sName = $('#sName');
        if (sName) sName.value = name;
    }

    function openNameModal(isFirstRun){
        $('#nameModal').classList.add('active');
        $('#scrim').classList.add('open');
        $('#nameModalClose').classList.toggle('hidden', isFirstRun);
        $('#nameInput').value = state.name || '';
        $('#nameMsg').textContent = '';
        setTimeout(function(){ $('#nameInput').focus(); $('#nameInput').select(); }, 80);
    }
    function closeNameModal(){
        $('#nameModal').classList.remove('active');
        if (!$('.modal.active')) $('#scrim').classList.remove('open');
    }

    function submitName(e){
        e.preventDefault();
        var raw = $('#nameInput').value.trim();
        var msg = $('#nameMsg');
        msg.textContent = '';

        if (raw.length < 2){ msg.textContent = T('nameTooShort'); return; }
        if (raw.length > 30){ msg.textContent = T('nameTooLong'); return; }
        if (containsBlockedName(raw)){
            msg.textContent = T('nameBlocked');
            $('#nameInput').classList.add('invalid');
            setTimeout(function(){ $('#nameInput').classList.remove('invalid') }, 1400);
            return;
        }

        setDisplayName(raw);
        closeNameModal();
        toast(T('nameSaved'), 'nameSaved', 1200);
    }

    /* ============================================================
       TIMER
       ============================================================ */
    function modeSeconds(m){
        if (m==='short') return (+state.settings.short_break||5)*60;
        if (m==='long') return (+state.settings.long_break||15)*60;
        return (+state.settings.pomodoro||25)*60;
    }
    function fmt(sec){
        var m = Math.floor(sec/60), s = sec%60;
        return String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');
    }
    function renderTimer(){
        $('#time').textContent = fmt(state.remaining);
        var pct = state.total ? (1 - state.remaining/state.total)*100 : 0;
        $('#timerProgress').style.width = pct+'%';
        var idle = state.remaining >= state.total;
        $('#startBtn').textContent = state.running ? T('pause') : (idle ? T('start') : T('resume'));
        $$('.mode-btn').forEach(function(b){b.classList.toggle('active', b.dataset.mode===state.mode)});
        document.title = (state.running ? fmt(state.remaining)+' · ' : '') + 'FocusFlow';
    }
    function setMode(m, doReset){
        state.mode = m;
        document.body.classList.remove('mode-pomodoro','mode-short','mode-long');
        document.body.classList.add('mode-'+m);
        if (doReset!==false){
            state.total = modeSeconds(m);
            state.remaining = state.total;
            state.running = false;
            if (raf) cancelAnimationFrame(raf);
        }
        renderTimer();
        updateDots();
    }

    var raf = null;
    function tick(){
        if (!state.running) return;
        var now = performance.now();
        var delta = Math.floor((now - state.lastTick)/1000);
        if (delta>=1){
            state.lastTick += delta*1000;
            state.remaining = Math.max(0, state.remaining - delta);
            renderTimer();
            if (state.remaining<=0){ completeSession(); return; }
        }
        raf = requestAnimationFrame(tick);
    }
    function start(){
        if (state.running) return;
        ensureAudio();
        if (state.mode==='pomodoro' && state.settings.focus_sound!=='none'){
            playSound(state.settings.focus_sound, state.settings.focus_volume);
        }
        state.running = true;
        state.lastTick = performance.now();
        raf = requestAnimationFrame(tick);
        renderTimer();
    }
    function pause(){
        state.running = false;
        if (raf) cancelAnimationFrame(raf);
        renderTimer();
    }
    function resetTimer(silent){
        pause();
        state.remaining = state.total;
        renderTimer();
        if (!silent) toast(T('toastReset'), 'reset', 1000);
    }

    function completeSession(){
        state.running = false;
        var wasPom = state.mode==='pomodoro';
        var repeats = Math.max(1, +state.settings.alarm_repeat||1);
        for (var i=0; i<repeats; i++){
            (function(idx){
                setTimeout(function(){
                    playSound(state.settings.alarm_sound, state.settings.alarm_volume);
                }, idx*700);
            })(i);
        }

        if (wasPom){
            state.sessionCount++;
            LS.set('ff_sessions_'+todayKey(), state.sessionCount);
            var hist = state.history.slice();
            hist.push({ts:Date.now(), min:(+state.settings.pomodoro||25)});
            hist = hist.filter(function(h){return h.ts > Date.now() - 120*864e5});
            state.history = hist;
            LS.set('ff_history', hist);

            var interval = +state.settings.long_break_interval||4;
            var next = (state.sessionCount % interval === 0) ? 'long' : 'short';
            setMode(next);
            if (+state.settings.auto_start_breaks) start();
        } else {
            setMode('pomodoro');
            if (+state.settings.auto_start_pomodoros) start();
        }
        pulse();
        refreshBadge();
    }

    function pulse(){
        var w = $('#timeWrap');
        w.classList.remove('pulse');
        void w.offsetWidth;
        w.classList.add('pulse');
        setTimeout(function(){w.classList.remove('pulse')}, 1100);
    }
    function updateDots(){
        var interval = +state.settings.long_break_interval||4;
        var inCycle = state.sessionCount % interval;
        var filled = state.mode==='pomodoro' ? inCycle : (inCycle===0 && state.sessionCount>0 ? interval : inCycle);
        $$('#sessionDots .dot').forEach(function(d,i){d.classList.toggle('on', i<filled)});
        $('#sessionText').textContent = (inCycle+1)+' / '+interval;
    }

    /* ============================================================
       TASKS
       ============================================================ */
    function renderTasks(){
        var ul = $('#taskList');
        if (!ul) return;
        ul.innerHTML = '';
        var open = state.tasks.filter(function(t){return !t.is_done}).length;
        $('#taskCount').textContent = state.tasks.length ? open+' / '+state.tasks.length : '';

        if (!state.tasks.length){
            var li = document.createElement('li');
            li.className = 'task-empty';
            li.textContent = T('noTasks');
            ul.appendChild(li);
            return;
        }
        var items = state.tasks.slice();
        if (+state.settings.check_to_bottom) items.sort(function(a,b){return (a.is_done?1:0) - (b.is_done?1:0)});

        items.forEach(function(t){
            var li = document.createElement('li');
            li.className = 'task-item' + (t.is_done?' done':'') + (state.activeTaskId==t.id?' active':'');
            li.dataset.id = t.id;

            var check = document.createElement('button');
            check.className = 'task-check';
            check.type = 'button';
            check.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
            check.onclick = function(e){e.stopPropagation(); toggleTask(t.id)};

            var title = document.createElement('span');
            title.className = 'task-title';
            title.textContent = t.title;

            var pomos = document.createElement('span');
            pomos.className = 'task-pomos';
            pomos.textContent = t.done+'/'+t.estimate;

            var del = document.createElement('button');
            del.className = 'task-del';
            del.type = 'button';
            del.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>';
            del.onclick = function(e){e.stopPropagation(); deleteTask(t.id)};

            li.appendChild(check); li.appendChild(title); li.appendChild(pomos); li.appendChild(del);
            li.onclick = function(){setActiveTask(t.id)};
            ul.appendChild(li);
        });
    }
    function saveTasks(){ LS.set('ff_tasks', state.tasks); }

    function addTask(title, estimate){
        title = (title||'').trim();
        if (!title) return;
        if (containsBlockedName(title)){
            toast(T('nameBlocked'), 'taskBlocked', 1600, true);
            return;
        }
        estimate = Math.max(1, Math.min(12, parseInt(estimate,10)||1));
        state.tasks.push({id:Date.now(), title:title, estimate:estimate, done:0, is_done:false});
        saveTasks();
        renderTasks();
        toast(T('toastAdded'), 'added', 1000);
    }
    function toggleTask(id){
        var t = state.tasks.find(function(x){return x.id==id});
        if (!t) return;
        t.is_done = !t.is_done;
        if (t.is_done && state.activeTaskId==id){
            state.activeTaskId = null;
            LS.set('ff_active', null);
            $('#taskName').textContent = T('noTask');
        }
        saveTasks(); renderTasks();
    }
    function deleteTask(id){
        state.tasks = state.tasks.filter(function(x){return x.id!=id});
        if (state.activeTaskId==id){
            state.activeTaskId = null;
            LS.set('ff_active', null);
            $('#taskName').textContent = T('noTask');
        }
        saveTasks(); renderTasks();
        toast(T('toastRemoved'), 'removed', 1000);
    }
    function setActiveTask(id){
        var t = state.tasks.find(function(x){return x.id==id});
        if (!t || t.is_done) return;
        state.activeTaskId = state.activeTaskId==id ? null : id;
        LS.set('ff_active', state.activeTaskId);
        $('#taskName').textContent = state.activeTaskId ? t.title : T('noTask');
        renderTasks();
    }

    /* ============================================================
       SETTINGS
       ============================================================ */
    function bindSettings(){
        var s = state.settings;
        $('#sName').value = state.name || '';
        $('#sPomodoro').value = s.pomodoro;
        $('#sShort').value = s.short_break;
        $('#sLong').value = s.long_break;
        $('#sInterval').value = s.long_break_interval;
        $('#sRepeat').value = s.alarm_repeat;
        $('#sAutoBreaks').checked = !!+s.auto_start_breaks;
        $('#sAutoPomos').checked = !!+s.auto_start_pomodoros;
        $('#sAutoCheck').checked = !!+s.auto_check_tasks;
        $('#sCheckBottom').checked = !!+s.check_to_bottom;
        $('#sAlarmSound').value = s.alarm_sound || 'kitchen';
        $('#sFocusSound').value = s.focus_sound || 'none';
        $('#sAlarmVol').value = s.alarm_volume;
        $('#sAlarmVolVal').textContent = s.alarm_volume;
        $('#sFocusVol').value = s.focus_volume;
        $('#sFocusVolVal').textContent = s.focus_volume;

        $('#sName').onblur = function(){
            var v = this.value.trim();
            if (v === state.name) return;
            if (v.length < 2 || v.length > 30 || containsBlockedName(v)){
                toast(T('nameBlocked'), 'nameBlocked', 1800, true);
                this.value = state.name || '';
                return;
            }
            setDisplayName(v);
            toast(T('nameSaved'), 'nameSaved', 1100);
        };

        [['sPomodoro','pomodoro'],['sShort','short_break'],['sLong','long_break'],['sInterval','long_break_interval'],['sRepeat','alarm_repeat']].forEach(function(p){
            var el = $('#'+p[0]), key = p[1];
            el.onchange = function(){
                s[key] = parseInt(el.value,10)||1;
                saveSettings();
                if (key==='pomodoro' && state.mode==='pomodoro' && !state.running) setMode('pomodoro');
                if (key==='short_break' && state.mode==='short' && !state.running) setMode('short');
                if (key==='long_break' && state.mode==='long' && !state.running) setMode('long');
                updateDots();
            };
        });
        [['sAutoBreaks','auto_start_breaks'],['sAutoPomos','auto_start_pomodoros'],['sAutoCheck','auto_check_tasks'],['sCheckBottom','check_to_bottom']].forEach(function(p){
            var el = $('#'+p[0]), key = p[1];
            el.onchange = function(){
                s[key] = el.checked ? 1 : 0;
                saveSettings();
                if (key==='check_to_bottom') renderTasks();
            };
        });
        $('#sAlarmSound').onchange = function(){ s.alarm_sound = this.value; saveSettings(); playSound(this.value, s.alarm_volume); };
        $('#sFocusSound').onchange = function(){ s.focus_sound = this.value; saveSettings(); playSound(this.value, s.focus_volume); };
        $('#sAlarmVol').oninput = function(){ $('#sAlarmVolVal').textContent = this.value };
        $('#sAlarmVol').onchange = function(){ s.alarm_volume = parseInt(this.value,10)||0; saveSettings() };
        $('#sFocusVol').oninput = function(){ $('#sFocusVolVal').textContent = this.value };
        $('#sFocusVol').onchange = function(){ s.focus_volume = parseInt(this.value,10)||0; saveSettings() };
        $('#testSound').onclick = function(){ playSound(s.alarm_sound, s.alarm_volume); };

        $('#wipeBtn').onclick = function(){
            if (!confirm(T('wipeConfirm'))) return;
            ['ff_lang','ff_theme','ff_tasks','ff_active','ff_history','ff_settings','ff_name'].forEach(function(k){ LS.del(k); });
            Object.keys(localStorage).forEach(function(k){
                if (k.indexOf('ff_sessions_') === 0) LS.del(k);
            });
            toast(T('wipeDone'), 'wipe', 1400);
            setTimeout(function(){ window.location.reload(); }, 900);
        };
    }

    function saveSettings(){
        LS.set('ff_settings', state.settings);
    }

    /* ============================================================
       MODALS
       ============================================================ */
    function openModal(id){
        document.getElementById(id).classList.add('active');
        $('#scrim').classList.add('open');
    }
    function closeModal(id){
        document.getElementById(id).classList.remove('active');
        if (!$('.modal.active')) $('#scrim').classList.remove('open');
    }
    function closeAll(){
        $$('.modal').forEach(function(m){m.classList.remove('active')});
        $$('.popover').forEach(function(p){p.classList.remove('active')});
        $('#scrim').classList.remove('open');
    }

    function refreshBadge(){
        var today = todayKey();
        var total = 0;
        state.history.forEach(function(h){
            var d = new Date(h.ts);
            var key = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
            if (key===today) total += (+h.min||0);
        });
        $('#todayBadge').textContent = total;
    }

    function openStats(){
        openModal('statsModal');
        var body = $('#statsBody');

        var today = todayKey();
        var totalToday = 0, count = 0;
        state.history.forEach(function(h){
            var d = new Date(h.ts);
            var key = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
            if (key===today){ totalToday += (+h.min||0); count++; }
        });
        var weekTotal = state.history.reduce(function(a,h){return a+(+h.min||0)},0);

        var chart = [];
        for (var i=6;i>=0;i--){
            var d = new Date(); d.setDate(d.getDate()-i);
            var key = d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
            var mins = 0;
            state.history.forEach(function(h){
                var dd = new Date(h.ts);
                var k = dd.getFullYear()+'-'+String(dd.getMonth()+1).padStart(2,'0')+'-'+String(dd.getDate()).padStart(2,'0');
                if (k===key) mins += (+h.min||0);
            });
            chart.push({day:key, minutes:mins});
        }

        var max = 1;
        chart.forEach(function(x){ if (+x.minutes > max) max = +x.minutes; });

        var html = '';
        if (state.name){
            html += '<div style="text-align:center;margin-bottom:22px">';
            html += '<div style="font-size:14px;font-weight:500">'+esc(state.name)+'</div>';
            html += '<div style="font-size:12px;color:var(--muted);margin-top:2px">'+esc(T('thisWeek'))+' · '+weekTotal+' '+esc(T('minutes'))+'</div>';
            html += '</div>';
        }

        html += '<div class="stats-grid">';
        html += '<div class="stat-box"><div class="stat-value mono">'+totalToday+'<span class="u">'+esc(T('minutes'))+'</span></div><div class="stat-label">'+esc(T('today'))+'</div></div>';
        html += '<div class="stat-box"><div class="stat-value mono">'+weekTotal+'<span class="u">'+esc(T('minutes'))+'</span></div><div class="stat-label">'+esc(T('thisWeek'))+'</div></div>';
        html += '<div class="stat-box"><div class="stat-value mono">'+state.sessionCount+'</div><div class="stat-label">'+esc(T('sessions'))+'</div></div>';
        html += '<div class="stat-box"><div class="stat-value mono">'+state.tasks.length+'</div><div class="stat-label">'+esc(T('tasks'))+'</div></div>';
        html += '</div>';

        if (weekTotal === 0 && count === 0){
            html += '<div class="stats-msg">'+esc(T('noData'))+'</div>';
        } else {
            html += '<div class="stats-title">'+esc(T('thisWeek'))+'</div>';
            html += '<div class="stats-chart">';
            chart.forEach(function(d){
                var pct = (+d.minutes||0)/max*100;
                var dt = new Date(d.day+'T00:00:00');
                var lbl = dt.toLocaleDateString(state.lang, {weekday:'short'});
                var color = (+d.minutes>0) ? 'var(--accent)' : 'var(--line)';
                html += '<div class="chart-col"><div class="chart-bar-wrap"><div class="chart-bar" data-h="'+Math.max(2,pct)+'" style="background:'+color+'"></div></div><div class="chart-label">'+esc(lbl)+'</div></div>';
            });
            html += '</div>';
        }

        body.innerHTML = html;
        setTimeout(function(){
            $$('.chart-bar').forEach(function(b){ b.style.height = b.dataset.h + '%'; });
        }, 40);
    }

    /* ============================================================
       BOOT
       ============================================================ */
    function boot(){
        applyTheme(state.theme, true);
        applyI18n();
        setMode('pomodoro', true);
        bindSettings();
        refreshBadge();
        renderTasks();

        if (state.name){
            setDisplayName(state.name);
        } else {
            openNameModal(true);
        }

        if (state.activeTaskId){
            var t = state.tasks.find(function(x){return x.id==state.activeTaskId});
            if (t) $('#taskName').textContent = t.title;
        }

        $('#nameForm').onsubmit = submitName;
        $('#nameBtn').onclick = function(){ openNameModal(false); };

        $$('.theme-dot').forEach(function(d){
            d.onclick = function(){ applyTheme(d.dataset.t) };
        });
        $('#themeBtn').onclick = function(e){
            e.stopPropagation();
            $('#themePopover').classList.toggle('active');
        };
        document.addEventListener('click', function(e){
            if (!e.target.closest('#themePopover') && !e.target.closest('#themeBtn')) $('#themePopover').classList.remove('active');
        });

        $$('.mode-btn').forEach(function(b){
            b.onclick = function(){ pause(); setMode(b.dataset.mode, true) };
        });
        $('#startBtn').onclick = function(){ state.running ? pause() : start() };
        $('#resetBtn').onclick = function(){ resetTimer() };
        $('#skipBtn').onclick = function(){
            pause();
            if (state.mode==='pomodoro'){
                var interval = +state.settings.long_break_interval||4;
                setMode((state.sessionCount+1)%interval===0 ? 'long' : 'short', true);
            } else {
                setMode('pomodoro', true);
            }
        };
        $('#focusBtn').onclick = function(){
            var on = document.body.classList.toggle('focus');
            toast(on ? T('toastFocus') : T('toastFocusOff'), 'focus', 1000);
        };

        $('#addTaskForm').onsubmit = function(e){
            e.preventDefault();
            addTask($('#taskInput').value, $('#estimateInput').value);
            $('#taskInput').value = '';
            $('#estimateInput').value = 1;
            $('#taskInput').focus();
        };

        $('#settingsBtn').onclick = function(){ openModal('settingsModal') };
        $('#statsBtn').onclick = openStats;

        $$('[data-close]').forEach(function(b){
            b.onclick = function(){ closeModal(b.dataset.close) };
        });
        $('#scrim').onclick = closeAll;
        $$('.modal').forEach(function(m){
            m.onclick = function(e){ if (e.target===m) closeModal(m.id) };
        });

        $('#langBtn').onclick = function(){
            var order = ['en','fr','ar'];
            var next = order[(order.indexOf(state.lang)+1)%3];
            state.lang = next;
            LS.set('ff_lang', next);
            window.location.reload();
        };

        document.addEventListener('dblclick', function(){
            if (document.body.classList.contains('focus')) document.body.classList.remove('focus');
        });

        document.addEventListener('keydown', function(e){
            var tag = (e.target.tagName||'').toUpperCase();
            var typing = tag==='INPUT' || tag==='TEXTAREA' || tag==='SELECT';

            if (e.key==='Escape'){
                if (typing){ e.target.blur(); return; }
                if (document.body.classList.contains('focus')){ document.body.classList.remove('focus'); return; }
                closeAll();
                return;
            }
            if (typing) return;
            if (e.metaKey||e.ctrlKey||e.altKey) return;

            var k = e.key.toLowerCase();
            if (e.key===' '){ e.preventDefault(); state.running ? pause() : start(); }
            else if (k==='r') window.location.reload();
            else if (k==='f'){ document.body.classList.toggle('focus'); }
            else if (k==='s'){ e.preventDefault(); openStats(); }
            else if (k==='n'){ e.preventDefault(); $('#taskInput').focus(); }
        });
    }

    if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();