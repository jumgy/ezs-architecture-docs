
---
title: "Архитектура базы данных"
tags: ["database", "storage", "backend"]
---

# 🗄️ Архитектура базы данных

Схема данных системы ЭЗС с основными таблицами и связями.

```mermaid
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
    
    STATION_STATUS_LOG {
        uuid id PK "Уникальный ID записи"
        uuid station_id FK "Ссылка на станцию"
        string previous_status "Предыдущий статус"
        string new_status "Новый статус"
        string reason "Причина изменения статуса"
        jsonb additional_data "Дополнительные данные"
        timestamp changed_at "Время изменения"
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
    
    USER_SETTINGS {
        uuid user_id FK "Ссылка на пользователя"
        jsonb notification_preferences "Настройки уведомлений"
        jsonb search_filters "Сохраненные фильтры поиска"
        string preferred_language "Предпочитаемый язык"
        string preferred_currency "Предпочитаемая валюта"
        jsonb app_settings "Настройки приложения"
        timestamp updated_at "Дата последнего обновления"
    }
    
    %% Основные связи
    USERS ||--o{ CHARGING_SESSIONS : "инициирует"
    STATIONS ||--o{ CHARGING_SESSIONS : "обслуживает"
    USERS ||--o{ FAVORITES : "добавляет_в_избранное"
    STATIONS ||--o{ FAVORITES : "находится_в_избранном"
    STATIONS ||--o{ STATION_STATUS_LOG : "имеет_историю_статусов"
    CHARGING_SESSIONS ||--|| PAYMENTS : "оплачивается"
    USERS ||--|| USER_SETTINGS : "имеет_настройки"
    USERS ||--o{ PAYMENTS : "производит_оплату"
    
    click USERS "#user-journey" "Пользовательские сценарии"
    click CHARGING_SESSIONS "#technical" "Техническая реализация сессий"
    click STATIONS "#technical" "Управление станциями"
