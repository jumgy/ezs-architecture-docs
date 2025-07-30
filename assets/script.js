// Инициализация Mermaid
mermaid.initialize({ 
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: 'basis'
    },
    er: {
        useMaxWidth: true
    },
    journey: {
        useMaxWidth: true
    }
});

// Данные диаграмм с реальным содержимым
const diagramData = {
    overview: {
        title: "Бизнес-обзор системы ЭЗС",
        tags: ["business", "management", "overview"],
        screenshots: ["business-overview.png", "user-flow.png"],
        mermaid: `
flowchart TD
    USER[👤 Пользователь<br/>Владелец электромобиля]
    
    subgraph APP[📱 Мобильное приложение ЭЗС]
        MAP[🗺️ Карта станций<br/>Поиск ближайших ЭЗС]
        SEARCH[🔍 Поиск и фильтры<br/>По типу, мощности, доступности]
        BOOKING[📅 Бронирование<br/>Резерв времени зарядки]
    end
    
    subgraph STATION[🏢 Зарядная станция]
        QR[📷 QR-код<br/>Идентификация станции]
        CHARGER[⚡ Зарядное устройство<br/>Различные типы коннекторов]
        PAYMENT[💳 Система оплаты<br/>Карта, приложение, RFID]
    end
    
    subgraph SERVICES[🌐 Облачные сервисы]
        MONITORING[📊 Мониторинг<br/>Статус станций в реальном времени]
        BILLING[💰 Биллинг<br/>Расчет стоимости зарядки]
        SUPPORT[🎧 Поддержка<br/>Техническая помощь]
    end
    
    USER --> APP
    APP --> STATION
    STATION --> SERVICES
    SERVICES --> APP
    
    MAP -.->|Навигация| STATION
    SEARCH -.->|Фильтрация| MAP
    BOOKING -.->|Резерв| CHARGER
    QR -.->|Активация| PAYMENT
    CHARGER -.->|Данные| MONITORING
    BILLING -.->|Счет| USER
    
    classDef userStyle fill:#E53E3E,color:#fff,stroke:#C53030
    classDef appStyle fill:#3182CE,color:#fff,stroke:#2C5282
    classDef stationStyle fill:#38A169,color:#fff,stroke:#2F855A
    classDef serviceStyle fill:#805AD5,color:#fff,stroke:#6B46C1
    
    class USER userStyle
    class MAP,SEARCH,BOOKING appStyle
    class QR,CHARGER,PAYMENT stationStyle
    class MONITORING,BILLING,SUPPORT serviceStyle
        `
    },
    
    technical: {
        title: "Техническая архитектура системы",
        tags: ["frontend", "backend", "technical", "api"],
        screenshots: ["technical-arch.png", "api-schema.png"],
        mermaid: `
flowchart TD
    %% UI Layer - General Components
    subgraph UI_LAYER[📱 UI Layer - Пользовательский интерфейс]
        MAP_SCREEN["[UI] 📱 Экран карты ЭЗС<br/>Main Screen Container<br/>Координирует все компоненты"]

        MAP_SCREEN --> MAP_WIDGET["[UI] 🗺️ Интерактивная карта<br/>YandexMap Widget<br/>Отображает карту с zoom управлением<br/>Центрирование по геолокации"]

        MAP_SCREEN --> STATION_PINS["[UI] 📍 Пины станций<br/>YMKPlacemarkMapObject<br/>Цветовая индикация по мощности<br/>Отображение типа и количества точек"]

        MAP_SCREEN --> FILTER_BAR["[UI] 🔧 Панель фильтров<br/>Filter Controls Widget<br/>Переключатели по типам коннекторов<br/>Категории по скорости зарядки<br/>Избранные и доступные станции"]

        MAP_SCREEN --> LIST_BUTTON["[UI] 📋 Кнопка списка<br/>List Toggle Button<br/>Открывает overlay со списком<br/>Включает поиск по станциям"]

        MAP_SCREEN --> QR_SCANNER["[UI] 📷 QR сканер<br/>Camera Integration<br/>Распознавание QR кодов станций<br/>Навигация к детальной информации"]

        MAP_SCREEN --> LOCATION_BUTTON["[UI] 🎯 Кнопка геолокации<br/>Location Services Button<br/>Запрос разрешений на геолокацию<br/>Центрирование карты на пользователе"]

        MAP_SCREEN --> SEARCH_BAR["[UI] 🔍 Поиск станций<br/>Search Input Field<br/>Поиск по названию и адресу<br/>Автодополнение с задержкой"]
    end

    %% Frontend Layer - Processing Logic
    subgraph FRONTEND_LAYER[⚙️ Frontend Layer - Бизнес-логика клиента]
        MAP_WIDGET --> FE_MAP_CONTROLLER["[FE] YandexMap Controller<br/>Управление YandexMapController<br/>Обработка жестов и навигации<br/>Слежение за изменениями viewport"]

        STATION_PINS --> FE_STATION_HANDLER["[FE] Station Display Handler<br/>Получает данные станций<br/>Создает маркеры с цветовой схемой<br/>Логика отображения по категориям<br/>Обработка нажатий на пины"]

        FILTER_BAR --> FE_FILTER_LOGIC["[FE] Client-side Filter Engine<br/>Фильтрация массива станций<br/>По типам коннекторов и мощности<br/>По статусу и времени работы<br/>Визуальное выделение результатов"]

        LIST_BUTTON --> FE_LIST_HANDLER["[FE] List View Manager<br/>Построение списка станций<br/>Сортировка по расстоянию<br/>Пагинация и обновление<br/>Синхронизация с картой"]

        QR_SCANNER --> FE_QR_HANDLER["[FE] QR Processing Handler<br/>Интеграция с камерой<br/>Парсинг и валидация QR данных<br/>Запрос информации о станции<br/>Обработка ошибок сканирования"]

        LOCATION_BUTTON --> FE_LOCATION_HANDLER["[FE] Geolocation Manager<br/>Работа с GPS сервисами<br/>Управление разрешениями<br/>Определение координат<br/>Обновление центра карты"]

        SEARCH_BAR --> FE_SEARCH_HANDLER["[FE] Search Logic Handler<br/>Обработка поисковых запросов<br/>Дебаунс и автодополнение<br/>Фильтрация по текстовым полям<br/>Подсветка результатов"]

        %% Data Management Layer
        FE_STATION_HANDLER --> FE_DATA_MANAGER["[FE] Station Data Manager<br/>Центральное управление данными<br/>Кэширование списка станций<br/>Состояния загрузки и ошибок<br/>Периодическое обновление<br/>Уведомления об изменениях"]

        FE_FILTER_LOGIC --> FE_DATA_MANAGER
        FE_SEARCH_HANDLER --> FE_DATA_MANAGER
        FE_LIST_HANDLER --> FE_DATA_MANAGER
    end

    %% Backend Integration
    subgraph BACKEND_LAYER[🌐 Backend Layer - Серверная архитектура]
        FE_DATA_MANAGER --> API_GATEWAY["[BE] 🌐 API Gateway<br/>Единая точка входа для API<br/>Аутентификация и авторизация<br/>Роутинг к микросервисам<br/>Rate limiting и безопасность"]

        FE_LOCATION_HANDLER --> API_GATEWAY
        FE_QR_HANDLER --> API_GATEWAY

        %% Microservices Layer
        API_GATEWAY --> STATION_SERVICE["[BE] ⚡ Station Data Service<br/>Управление информацией о станциях<br/>Географические запросы по области<br/>Данные о мощности и типах<br/>Статус доступности<br/>Пространственная индексация"]

        API_GATEWAY --> LOCATION_SERVICE["[BE] 📍 Location Service<br/>Геокодирование и координаты<br/>Обратное геокодирование адресов<br/>Валидация географических данных<br/>Кэширование результатов"]

        API_GATEWAY --> SEARCH_SERVICE["[BE] 🔍 Search Service<br/>Индексация и поиск станций<br/>Full-text search по параметрам<br/>Ранжирование результатов<br/>Поддержка автодополнения"]

        API_GATEWAY --> USER_SERVICE["[BE] 👤 User Preferences Service<br/>Управление избранными станциями<br/>Пользовательские настройки<br/>История поиска<br/>Персональные фильтры"]
    end

    %% External Integrations
    subgraph EXTERNAL_LAYER[🌐 Внешние API и сервисы]
        FE_MAP_CONTROLLER --> YANDEX_MAPS["🗺️ Yandex Maps API<br/>MapKit SDK для Flutter<br/>API Key в конфигурации<br/>Тайлы карты и стили<br/>Жесты и анимация zoom<br/>Rate limit по квотам Яндекс"]

        LOCATION_SERVICE --> YANDEX_GEOCODING["📍 Yandex Geocoding API<br/>https://geocode-maps.yandex.ru/1.x/<br/>API Key для геокодирования<br/>Преобразование координат в адреса<br/>Обратное геокодирование<br/>Кэширование ответов от Яндекс"]
    end

    %% Service Communications
    STATION_SERVICE -.->|Location Requests| LOCATION_SERVICE
    SEARCH_SERVICE -.->|Station Data| STATION_SERVICE
    USER_SERVICE -.->|Favorite Updates| STATION_SERVICE

    %% Styling
    classDef uiStyle fill:#87CEEB,stroke:#4682B4,stroke-width:3px,color:#000
    classDef uiComponentStyle fill:#B0E0E6,stroke:#4682B4,stroke-width:2px,color:#000
    classDef frontendStyle fill:#90EE90,stroke:#228B22,stroke-width:2px,color:#000
    classDef dataManagerStyle fill:#98FB98,stroke:#228B22,stroke-width:3px,color:#000
    classDef backendStyle fill:#FFA500,stroke:#FF8C00,stroke-width:2px,color:#000
    classDef microserviceStyle fill:#DDA0DD,stroke:#9370DB,stroke-width:2px,color:#000
    classDef yandexApiStyle fill:#FFB6C1,stroke:#DC143C,stroke-width:2px,color:#000

    class MAP_SCREEN uiStyle
    class MAP_WIDGET,STATION_PINS,FILTER_BAR,LIST_BUTTON,QR_SCANNER,LOCATION_BUTTON,SEARCH_BAR uiComponentStyle
    class FE_MAP_CONTROLLER,FE_STATION_HANDLER,FE_FILTER_LOGIC,FE_LIST_HANDLER,FE_QR_HANDLER,FE_LOCATION_HANDLER,FE_SEARCH_HANDLER frontendStyle
    class FE_DATA_MANAGER dataManagerStyle
    class API_GATEWAY backendStyle
    class STATION_SERVICE,LOCATION_SERVICE,SEARCH_SERVICE,USER_SERVICE microserviceStyle
    class YANDEX_MAPS,YANDEX_GEOCODING yandexApiStyle
        `
    },
    
    database: {
        title: "Архитектура базы данных",
        tags: ["database", "storage", "backend"],
        screenshots: ["db-schema.png", "data-relations.png"],
        mermaid: `
erDiagram
    USERS {
        uuid id PK "Уникальный ID пользователя"
        string email UK "Email адрес"
        string name "Имя пользователя"
        string phone "Номер телефона"
        jsonb preferences "Пользовательские настройки"
        point last_location "Последняя геолокация"
        timestamp created_at "Дата регистрации"
        timestamp updated_at "Дата обновления"
        boolean is_active "Активен ли аккаунт"
    }
    
    STATIONS {
        uuid id PK "Уникальный ID станции"
        string name "Название станции"
        string address "Физический адрес"
        point location "Координаты (lat, lng)"
        jsonb connectors "Типы коннекторов и их количество"
        integer max_power_kw "Максимальная мощность в кВт"
        string status "Статус: active/maintenance/offline"
        jsonb working_hours "Часы работы по дням недели"
        decimal price_per_kwh "Стоимость за кВт·ч"
        string operator_id "ID оператора станции"
        timestamp created_at "Дата создания записи"
        timestamp updated_at "Дата последнего обновления"
    }
    
    CHARGING_SESSIONS {
        uuid id PK "Уникальный ID сессии"
        uuid user_id FK "Ссылка на пользователя"
        uuid station_id FK "Ссылка на станцию"
        string connector_type "Тип использованного коннектора"
        timestamp start_time "Время начала зарядки"
        timestamp end_time "Время окончания зарядки"
        decimal energy_delivered_kwh "Переданная энергия в кВт·ч"
        decimal total_cost "Общая стоимость сессии"
        string payment_method "Способ оплаты"
        string status "Статус: active/completed/cancelled/error"
        jsonb session_data "Дополнительные данные сессии"
        timestamp created_at "Дата создания записи"
    }
    
    FAVORITES {
        uuid user_id FK "ID пользователя"
        uuid station_id FK "ID станции"
        string alias "Пользовательское название"
        timestamp added_at "Дата добавления в избранное"
        integer usage_count "Количество использований"
        timestamp last_used "Дата последнего использования"
    }
    
    PAYMENTS {
        uuid id PK "Уникальный ID платежа"
        uuid session_id FK "Ссылка на сессию зарядки"
        uuid user_id FK "Ссылка на пользователя"
        decimal amount "Сумма платежа"
        string currency "Валюта"
        string payment_method "Метод оплаты"
        string external_payment_id "ID в платежной системе"
        string status "Статус: pending/completed/failed/refunded"
        timestamp processed_at "Время обработки платежа"
        timestamp created_at "Дата создания записи"
    }
    
    %% Основные связи
    USERS ||--o{ CHARGING_SESSIONS : "инициирует"
    STATIONS ||--o{ CHARGING_SESSIONS : "обслуживает"
    USERS ||--o{ FAVORITES : "добавляет_в_избранное"
    STATIONS ||--o{ FAVORITES : "находится_в_избранном"
    CHARGING_SESSIONS ||--|| PAYMENTS : "оплачивается"
    USERS ||--o{ PAYMENTS : "производит_оплату"
        `
    },
    
    "user-journey": {
        title: "User Journey - Путь пользователя",
        tags: ["ux", "flows", "user"],
        screenshots: ["user-flow.png", "wireframes.png"],
        mermaid: `
journey
    title Путь пользователя: Поиск и зарядка ЭЗС
    
    section 🔍 Поиск станции
        Открыть приложение: 5: Пользователь
        Найти станцию на карте: 4: Пользователь
        Применить фильтры: 3: Пользователь
        Проверить доступность: 3: Пользователь, Система
        Построить маршрут: 4: Пользователь, Yandex Maps
        Выбрать станцию: 5: Пользователь
        
    section 🚗 Поездка к станции
        Следовать по маршруту: 4: Пользователь, Навигация
        Получить уведомление о прибытии: 5: Система
        Найти нужный разъем: 3: Пользователь
        
    section ⚡ Процесс зарядки
        Сканировать QR код: 4: Пользователь
        Подтвердить тип коннектора: 4: Пользователь, Система
        Подключить кабель: 3: Пользователь
        Начать зарядку: 5: Пользователь, Станция
        Мониторинг процесса: 4: Пользователь, Система
        Получать обновления статуса: 5: Система
        
    section 💳 Завершение и оплата
        Завершить зарядку: 5: Пользователь, Станция
        Отключить кабель: 4: Пользователь
        Подтвердить сессию: 4: Система
        Произвести оплату: 3: Пользователь, Платежная система
        Получить чек: 5: Пользователь, Система
        Оценить станцию: 3: Пользователь
        `
    }
};

// Поисковые данные для автодополнения
const searchData = [
    { title: "API Gateway", description: "Единая точка входа для всех API", section: "technical", tags: ["backend", "api"] },
    { title: "Yandex Maps", description: "Интерактивная карта и навигация", section: "technical", tags: ["frontend", "maps"] },
    { title: "QR Scanner", description: "Сканирование QR кодов станций", section: "technical", tags: ["frontend", "camera"] },
    { title: "Station Data Manager", description: "Управление данными станций", section: "technical", tags: ["frontend", "data"] },
    { title: "База данных пользователей", description: "Таблица USERS", section: "database", tags: ["database", "users"] },
    { title: "Сессии зарядки", description: "Таблица CHARGING_SESSIONS", section: "database", tags: ["database", "sessions"] },
    { title: "User Journey", description: "Путь пользователя от поиска до зарядки", section: "user-journey", tags: ["ux", "flows"] },
    { title: "Мобильное приложение", description: "Flutter приложение для ЭЗС", section: "overview", tags: ["business", "mobile"] }
];

// Текущий активный раздел
let currentLevel = 'overview';

// DOM элементы
const diagramContainer = document.getElementById('diagramContainer');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const currentTags = document.getElementById('currentTags');
const relatedScreenshots = document.getElementById('relatedScreenshots');
const lastUpdated = document.getElementById('lastUpdated');

// Обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    // Установка даты обновления
    lastUpdated.textContent = new Date().toLocaleDateString('ru-RU');
    
    // Обработчики для кнопок табов
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            switchToLevel(level);
            
            // Обновляем активные кнопки
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Поиск
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length > 0) {
            searchResults.style.display = 'block';
        }
    });
    
    // Скрыть результаты поиска при клике вне
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // Загрузить первую диаграмму
    switchToLevel('overview');
});

// Переключение между уровнями
function switchToLevel(level) {
    currentLevel = level;
    const data = diagramData[level];
    
    if (!data) {
        console.error('Diagram data not found for level:', level);
        return;
    }
    
    // Показать загрузку
    diagramContainer.innerHTML = '<div class="loading">Загрузка диаграммы...</div>';
    
    // Загрузить диаграмму
    setTimeout(() => {
        renderDiagram(data);
        updateTags(data.tags);
        updateScreenshots(data.screenshots);
    }, 500);
}

// Рендеринг диаграммы
async function renderDiagram(data) {
    try {
        diagramContainer.innerHTML = `
            <h2 class="diagram-title">${data.title}</h2>
            <div class="mermaid" id="mermaid-diagram">${data.mermaid}</div>
        `;
        
        const mermaidElement = document.getElementById('mermaid-diagram');
        
        // Очистить и перерендерить
        mermaidElement.removeAttribute('data-processed');
        await mermaid.init(undefined, mermaidElement);
        
        // Добавить анимацию появления
        diagramContainer.classList.add('fade-in');
        setTimeout(() => diagramContainer.classList.remove('fade-in'), 300);
        
    } catch (error) {
        console.error('Error rendering diagram:', error);
        diagramContainer.innerHTML = `
            <div style="text-align: center; color: #e53e3e; padding: 40px;">
                <h3>❌ Ошибка загрузки диаграммы</h3>
                <p>Попробуйте обновить страницу</p>
            </div>
        `;
    }
}

// Обновление тегов
function updateTags(tags) {
    currentTags.innerHTML = '';
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = `tag ${tag}`;
        tagElement.textContent = tag;
        currentTags.appendChild(tagElement);
    });
}

// Обновление скриншотов
function updateScreenshots(screenshots) {
    relatedScreenshots.innerHTML = '';
    screenshots.forEach(screenshot => {
        const imgElement = document.createElement('div');
        imgElement.className = 'screenshot-thumb';
        imgElement.textContent = screenshot.replace('.png', '');
        imgElement.title = `Скриншот: ${screenshot}`;
        relatedScreenshots.appendChild(imgElement);
    });
}

// Обработка поиска
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length < 2) {
        searchResults.style.display = 'none';
        return;
    }
    
    const results = searchData.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
    );
    
    displaySearchResults(results);
}

// Отображение результатов поиска
function displaySearchResults(results) {
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result">Ничего не найдено</div>';
        searchResults.style.display = 'block';
        return;
    }
    
    searchResults.innerHTML = results.map(result => `
        <div class="search-result" onclick="selectSearchResult('${result.section}')">
            <div class="search-result-title">${result.title}</div>
            <div class="search-result-desc">${result.description}</div>
        </div>
    `).join('');
    
    searchResults.style.display = 'block';
}

// Выбор результата поиска
function selectSearchResult(section) {
    searchResults.style.display = 'none';
    searchInput.value = '';
    
    // Переключиться на нужную диаграмму
    switchToLevel(section);
    
    // Обновить активную кнопку
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-level') === section) {
            btn.classList.add('active');
        }
    });
}
