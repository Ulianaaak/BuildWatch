let selectedMarker = null;  // Переменная для хранения выбранной метки
let markersCollection = [];  // Коллекция меток на карте

ymaps.ready(init);

function init() {
    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 7,
        controls: ['zoomControl', 'searchControl']
    });

    // данные из get_markers.php
    fetch('php/get_markers.php')
        .then(response => response.json())
        .then(data => {
            const myCollection = new ymaps.GeoObjectCollection();

            data.forEach(marker => {
                const point = marker.point.split(',').map(coord => parseFloat(coord.trim())); // Преобразуем строку координат в массив
                const myPlacemark = new ymaps.Placemark(
                    point,
                    { balloonContent: marker.name },
                    { preset: 'islands#icon', iconColor: '#0000ff' } // Стилизация
                );

                // Привязка события клика на метке
                myPlacemark.events.add('click', () => {
                    // Сохраняем выбранную метку
                    selectedMarker = marker;
                    // Обновляем данные для мониторинга
                    updateMonitoringSection(marker);
                });

                myCollection.add(myPlacemark);
                markersCollection.push({ name: marker.name, placemark: myPlacemark });
            });

            // Добавляем метки на карту
            myMap.geoObjects.add(myCollection);

            // Устанавливаем границы карты, чтобы все метки были видны
            if (myCollection.getLength() > 0) {
                myMap.setBounds(myCollection.getBounds(), { checkZoomRange: true, zoomMargin: 20 });
            }

            // Добавляем обработчик для поиска
            document.getElementById('search-input').addEventListener('input', function(event) {
                const searchText = event.target.value.toLowerCase();
                filterMarkers(searchText);
            });

            // Добавляем обработчик для кнопки отображения технических атрибутов
            document.getElementById('show-technical-attributes').addEventListener('click', function() {
                if (selectedMarker) {
                    showTechnicalAttributes(selectedMarker);
                } else {
                    alert('Выберите метку на карте!');
                }
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки данных:', error);
        });
}

// Функция для обновления секции мониторинга при клике на метку
function updateMonitoringSection(marker) {
    document.getElementById('start-date').textContent = marker.start_date || '—';
    document.getElementById('end-date').textContent = marker.end_date || '—';
    document.getElementById('description').textContent = marker.description || '—';
    document.getElementById('messages').textContent = marker.messages || '—';

    // Прокрутка до раздела мониторинга
    document.getElementById('monitoring').scrollIntoView({ behavior: 'smooth' });
}

// Функция для отображения технических атрибутов
function showTechnicalAttributes(marker) {
    // Обновление данных о технических атрибутах
    document.getElementById('last-inspection-date').textContent = marker.last_inspection_date || '—';
    document.getElementById('next-inspection-date').textContent = marker.next_inspection_date || '—';
    document.getElementById('condition').textContent = marker.condition || '—';
    document.getElementById('technical-issues').textContent = marker.technical_issues || '—';
    document.getElementById('maintenance-records').textContent = marker.maintenance_records || '—';
    document.getElementById('repair-history').textContent = marker.repair_history || '—';
    document.getElementById('critical-issues').textContent = marker.critical_issues || '—';
    document.getElementById('last-renovation-date').textContent = marker.last_renovation_date || '—';
    document.getElementById('next-renovation-planned').textContent = marker.next_renovation_planned || '—';

    // Показываем модальное окно с техническими аттрибутами
    document.getElementById('technical-attributes-modal').style.display = 'block';
}

// Функция для фильтрации меток по названию
function filterMarkers(searchText) {
    markersCollection.forEach(markerObj => {
        const markerName = markerObj.name.toLowerCase();
        const placemark = markerObj.placemark;

        if (markerName.includes(searchText)) {
            placemark.options.set('visible', true);  // Показываем метку
        } else {
            placemark.options.set('visible', false);  // Скрываем метку
        }
    });
}


