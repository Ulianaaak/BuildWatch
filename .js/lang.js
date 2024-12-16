document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.querySelector('.language-selector-down');
    const languageButtons = languageSelector.querySelectorAll('.language-content a');
    const languageBtnDisplay = languageSelector.querySelector('.language-btn');

    const translations = {
    en: {
        monitoring: 'Monitoring',
        dataStart: 'Data start',
        dataEnd: 'Data end',
        description: 'Description',
        messages: 'Messages',
        showAttributes: 'Show Technical Attributes',
        lastInspectionDate: 'Last Inspection Date',
        nextInspectionDate: 'Next Inspection Date',
        condition: 'Condition',
        technicalIssues: 'Technical Issues',
        maintenanceRecords: 'Maintenance Records',
        repairHistory: 'Repair History',
        criticalIssues: 'Critical Issues',
        lastRenovationDate: 'Last Renovation Date',
        nextRenovationPlanned: 'Next Renovation Planned'
    },
    ru: {
        monitoring: 'Мониторинг',
        dataStart: 'Дата начала',
        dataEnd: 'Дата окончания',
        description: 'Описание',
        messages: 'Сообщения',
        showAttributes: 'Показать технические атрибуты',
        lastInspectionDate: 'Дата последней проверки',
        nextInspectionDate: 'Дата следующей проверки',
        condition: 'Состояние',
        technicalIssues: 'Технические проблемы',
        maintenanceRecords: 'Записи о техобслуживании',
        repairHistory: 'История ремонтов',
        criticalIssues: 'Критические проблемы',
        lastRenovationDate: 'Дата последнего ремонта',
        nextRenovationPlanned: 'Планируемая дата следующего ремонта'
    },
    ta: {
        monitoring: 'Мониторинг',
        dataStart: 'Башланган дата',
        dataEnd: 'Тәмамланган дата',
        description: 'Тасвирлама',
        messages: 'Хәбәрләр',
        showAttributes: 'Техник үзенчәлекләрне күрсәтергә',
        lastInspectionDate: 'Соңгы тикшерү датасы',
        nextInspectionDate: 'Киләсе тикшерү датасы',
        condition: 'Хәләт',
        technicalIssues: 'Техник проблемалар',
        maintenanceRecords: 'Техобслуживание язмалары',
        repairHistory: 'Ремонт тарихы',
        criticalIssues: 'Критик проблемалар',
        lastRenovationDate: 'Соңгы ремонт датасы',
        nextRenovationPlanned: 'Киләсе ремонт планлаштырылган'
    }
};

    function translatePage(language) {
        document.querySelectorAll('[data-lang]').forEach(element => {
            const key = element.getAttribute('data-lang');
            if (translations[language][key]) {
                element.textContent = translations[language][key];
            }
        });
    }

    const savedLanguage = localStorage.getItem('language');
    const defaultLanguage = 'en';
    const currentLanguage = translations[savedLanguage] ? savedLanguage : defaultLanguage;
    translatePage(currentLanguage);
    languageBtnDisplay.textContent = currentLanguage.toUpperCase();

    languageButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const selectedLanguage = button.getAttribute('data-lang');
            if (!translations[selectedLanguage]) {
                console.error('Translation not found for:', selectedLanguage);
                return;
            }
            localStorage.setItem('language', selectedLanguage);
            translatePage(selectedLanguage);
            languageBtnDisplay.textContent = selectedLanguage.toUpperCase();
        });
    });
});