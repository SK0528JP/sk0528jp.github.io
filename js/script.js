document.addEventListener('DOMContentLoaded', () => {
    const langSwitcherButtons = document.querySelectorAll('.lang-switcher button');
    const elementsToTranslate = document.querySelectorAll('[data-lang-ja]');
    const navLinks = document.querySelectorAll('.main-nav a');
    const backToTopButton = document.getElementById('back-to-top');

    // 言語を更新する関数
    const updateText = (lang) => {
        elementsToTranslate.forEach(el => {
            const text = el.getAttribute(`data-lang-${lang}`);
            if (text) {
                el.textContent = text;
            }
        });
    };

    // アクティブな言語ボタンを設定する関数
    const setActiveButton = (lang) => {
        langSwitcherButtons.forEach(button => {
            button.classList.remove('active');
        });
        document.getElementById(`lang-${lang}`).classList.add('active');
    };

    // URLハッシュに基づいて言語を切り替える関数
    const handleLanguageChange = () => {
        const hash = window.location.hash.substring(1);
        const supportedLangs = ['ja', 'en', 'sv'];
        let lang = 'ja'; // デフォルト言語

        if (supportedLangs.includes(hash)) {
            lang = hash;
        } else if (hash === '') {
            // ハッシュがない場合はURLにデフォルト言語を追加
            window.location.hash = lang;
            return;
        }

        updateText(lang);
        setActiveButton(lang);
        document.documentElement.lang = lang;
    };

    // 言語切り替えボタンのイベントリスナー
    langSwitcherButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id.replace('lang-', '');
            window.location.hash = lang;
        });
    });

    // URLハッシュが変更されたときに言語を切り替える
    window.addEventListener('hashchange', handleLanguageChange);

    // ページロード時に言語設定を初期化
    handleLanguageChange();

    // スムーズスクロール機能
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - document.querySelector('header').offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // トップへ戻るボタンの表示・非表示
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    // トップへ戻るボタンのスムーズスクロール
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
