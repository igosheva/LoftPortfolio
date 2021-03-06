# IGOSHEVA| Проект сайта-портфолио Игошевой Анастасии

> Автор: Игошева Анастасия.

> Сборка проекта с помощью Gulp версии 4.0.

## Старт проект

##### Склонируйте репозиторий и перейдите в папку проекта
```
git clone git@github.com:igosheva/LoftPortfolio.git
```

##### Установите модуль gulp-cli глобально
```
npm i gulp-cli -g
```

##### Установите модули локально
```
npm i
```

##### Запустите сборку проекта
```
gulp
```

## Структура папок и файлов
```
├── build/                     # Сборка (автогенерация)
│   ├── assets/                # Подключаемые ресурсы
│       └── css/               # Стили
│           └── app.css        # Главные стили
│           └── foundation.css # Стили normalize.css
│       ├── images/            # Изображения
│           └── sprite.png     # Спрайт со всеми картинками в png
│           └── sprite.svg     # Спрайт со всеми иконками в svg
│           └── block.jpg      # Картинка в jpg
│       ├── js/                # Скрипты
│           └── app.js         # Главные скрипты
│           └── foundation.js  # Скрипты normalize.js
│    └── index.html            # Страница
├── gulp/                      # Модули для функционирования gulpfile.js
│   ├── paths/                 # Пути для сборки проекта
│       ├── app.js             # Путь для js-файлов
│       ├── css.foundation.js  # Путь до стилей в npm
│       ├── js.foundation.js   # Путь до скриптов в npm
│       ├── tasks.js           # Пути до задач для gulpfile.js
│   ├── tasks/                 # Задачи для gulpfile.js
│       ├── clean.js           # Очистка
│       ├── copy.fonts.js      # Копирование шрифтов
│       ├── copy.image.js      # Копирование картинок
│       ├── css.foundation.js  # Подключение стилей для foundation.js
│       ├── js.foundation.js   # Подключние скриптов для foundation.js
│       ├── js.lint.js         # Подключние линтов
│       ├── js.process.js      # Оптимизация скриптов
│       ├── pug.js             # Сборка страниц из Pug шаблонов
│       ├── sass.js            # Сборка и оптимизация стилей
│       ├── serve.js           # Запуск локального сервера
│       ├── sprite.png.js      # Сборка спрайта PNG
│       ├── sprite.svg.js      # Сборка спрайта SVG
│       ├── watch.js           # Отслеживание изменений и запуск задач
│   ├── config/                # Файл с доп.настройками
├── source/                    # Исходники
│   ├── fonts/                 # Папка со шрифтами
│       └── font.ttf           # Файл со шрифтом
│   ├── images/                # Папка картинок
│       └── icons              # Папка с иконками в svg
│           ├── block.svg      # Иконка в svg
│       └── png                # Папка с картинками в png
│           ├── block.png      # Картинка в png
│       └── block.jpg          # Картинка в jpg
│   ├── js/                    # Скрипты
│       └── app.js             # Главный скрипт
│   └── styles/                # Стили
│       ├── common/            # Помощники
│           ├── sprite.scss    # Стили для спрайта png
│           ├── style.scss     # Стили для одной страницы
│       └── app.scss           # Главный стилевой файл
│   ├── template/              # Блоки
│       └── common/            # Компоненты страниц
│           ├── block.pug      # Разметка компонента
│       └── pages/             # Страницы
│           ├── block.pug      # Разметка страниц
│       └── block.pug          # Основной файл страниц
├── .eslintrc                  # Конфигурация проверки JavaScript в ESLint
├── .gitignore                 # Список исключённых файлов из Git
├── gulpfile.js                # Файл для запуска Gulp.js
├── package.json               # Список модулей и прочей информации
├── README.md                  # Документация шаблона
```
