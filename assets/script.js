// Инициализация Mermaid
mermaid.initialize({ 
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true
    }
});

// Данные диаграмм с тегами и скриншотами
const diagramData = {
    overview: {
        title: "Бизнес-обзор системы",
        tags: ["business", "management", "overview"],
        screenshots: ["app-overview.png", "main-screen.png"],
        mermaid: `
flowchart TD
    USER[👤 Пользователь] --> MOBILE[📱 Мобильное приложение]
    MOBILE --> MAP[🗺️ Карта станций]
    MOBILE --> SEARCH[🔍 Поиск]
    MAP --> CHARGING[⚡ Зарядка]
    SEARCH --> STATION[🏢 Станция]
    STATION --> CHARGING
    
    classDef userStyle fill:#e74c3c,color:#fff
    classDef appStyle fill:#3498db,color:#fff
    classDef actionStyle fill:#2ecc71,color:#fff
    
    class USER userStyle
    class MOBILE,MAP,SEARCH appStyle
    class CHARGING,STATION actionStyle
    
    click MAP "#technical" "Техническая архитектура карты"
    click SEARCH "#technical" "Техническая архитектура поиска"
        `
    },
    
    technical: {
        title: "Техническая архитектура",
        tags: ["frontend", "backend", "api", "technical"],
        screenshots: ["architecture.png", "api-flow.png"],
        mermaid: `${YOUR_CURRENT_DIAGRAM}` // Здесь вставишь свою диаграмму
    },
    
    database: {
        title: "Архитектура базы данных",
        tags: ["database", "storage", "cache", "data"],
        screenshots: ["db-schema.png", "data-flow.png"],
        mermaid: `
erDiagram
    USERS {
        uuid id PK
        string email
        string name
        timestamp created_at
        json preferences
    }
    
    STATIONS {
        uuid id PK
        string name
        point location
        json connectors
        integer power_kw
        string status
        timestamp updated_at
    }
    
    CHARGING_SESSIONS {
        uuid id PK
        uuid user_id FK
        uuid station_id FK
        timestamp start_time
        timestamp end_time
        decimal energy_kwh
        decimal cost
        string status
    }
    
    FAVORITES {
        uuid user_id FK
        uuid station_id FK
        timestamp added_at
    }
    
    USERS ||--o{ CHARGING_SESSIONS : "заряжается"
    STATIONS ||--o{ CHARGING_SESSIONS : "обслуживает"
    USERS ||--o{ FAVORITES : "избранные"
    STATIONS ||--o{ FAVORITES : "в избранном"
        `
    },
    
    "user-journey": {
        title: "User Journey",
        tags: ["ux", "flows", "screens", "user"],
        screenshots: ["user-flow.png", "wireframes.png"],
        mermaid: `
journey
    title Путь пользователя: Поиск и зарядка
    section Поиск станции
      Открыть приложение: 5: Пользователь
      Найти станцию на карте: 4: Пользователь
      Проверить доступность: 3: Пользователь, Система
      Выбрать станцию: 5: Пользователь
    section Зарядка
      Сканировать QR код: 4: Пользователь
      Начать зарядку: 5: Пользователь, Станция
      Мониторинг процесса: 4: Пользователь, Система
      Завершить зарядку: 5: Пользователь, Станция
    section Оплата
      Подтвердить сессию: 4: Система
      Произвести оплату: 3: Пользователь, Платежная система
      Получить чек: 5: Пользователь
        `
    }
};

// Поисковые данные
const searchIndex = [
    { term: "карта", level: "technical", description: "Yandex Maps интеграция" },
    { term: "станция", level: "database", description: "Таблица stations" },
    { term: "пользователь", level: "user-journey", description: "User Journey" },
    { term: "api", level: "technical", description: "API Gateway и микросервисы" },
    { term: "база данных", level: "database", description: "Схема БД" },
    { term: "зарядка", level: "user-journey", description: "Процесс зарядки" }
];

// Текущий уровень
let currentLevel = 'overview';

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadDiagram('overview');
    setupEventListeners();
});

function setupEventListeners() {
    // Навигация по табам
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const level = e.target.dataset.level;
            setActiveTab(level);
            loadDiagram(level);
        });
    });
    
    // Поиск
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 1) {
            const results = searchIndex.filter(item => 
                item.term.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
            showSearchResults(results);
        } else {
            searchResults.style.display = 'none';
        }
    });
    
    // Закрытие поиска при клике вне его
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            searchResults.style.display = 'none';
        }
    });
}

function loadDiagram(level) {
    currentLevel = level;
    const container = document.getElementById('diagram-container');
    const data = diagramData[level];
    
    if (!data) return;
    
    // Показать загрузку
    container.innerHTML = '<div class="loading">Загрузка диаграммы...</div>';
    
    // Создать уникальный ID для диаграммы
    const diagramId = `diagram-${Date.now()}`;
    
    setTimeout(() => {
        container.innerHTML = `<div class="mermaid" id="${diagramId}">${data.mermaid}</div>`;
        
        // Рендер диаграммы
        mermaid.init(undefined, `#${diagramId}`);
        
        // Обновить метаданные
        updateMeta(data);
    }, 300);
}

function setActiveTab(level) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-level="${level}"]`).classList.add('active');
}

function updateMeta(data) {
    // Обновить теги
    const tagsContainer = document.getElementById('current-tags');
    tagsContainer.innerHTML = data.tags.map(tag => 
        `<span class="tag ${tag}">${tag}</span>`
    ).join('');
    
    // Обновить скриншоты
    const screenshotsContainer = document.getElementById('related-screenshots');
    screenshotsContainer.innerHTML = data.screenshots.map(screenshot => 
        `<img src="assets/screenshots/${screenshot}" 
              alt="${screenshot}" 
              class="screenshot-thumb" 
              onclick="openScreenshot('${screenshot}')"
              onerror="this.style.display='none'">`
    ).join('');
}

function showSearchResults(results) {
    const container = document.getElementById('searchResults');
    
    if (results.length === 0) {
        container.style.display = 'none';
        return;
    }
    
    container.innerHTML = results.map(result => 
        `<div class="search-result" onclick="goToLevel('${result.level}')">
            <strong>${result.term}</strong>
            <br><small>${result.description}</small>
        </div>`
    ).join('');
    
    container.style.display = 'block';
}

function goToLevel(level) {
    setActiveTab(level);
    loadDiagram(level);
    document.getElementById('searchResults').style.display = 'none';
    document.getElementById('searchInput').value = '';
}

function openScreenshot(filename) {
    // Открыть скриншот в модальном окне или новой вкладке
    window.open(`assets/screenshots/${filename}`, '_blank');
}
