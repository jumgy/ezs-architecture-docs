---
title: "Бизнес-обзор системы ЭЗС"
tags: ["business", "management", "overview"]
---

# 👔 Бизнес-обзор системы ЭЗС

Упрощенная схема для менеджеров и стейкхолдеров.

```mermaid
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
    
    click APP "#technical" "Техническая архитектура приложения"
    click SERVICES "#technical" "Архитектура бэкенд сервисов"
    click BILLING "#database" "Структура данных биллинга"
    click USER "#user-journey" "Путь пользователя"
