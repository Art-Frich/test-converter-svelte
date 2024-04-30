# Просто тестовое

### Task_1
Необходимо написать функцию расшифровки полей с суффиксом id из переменной _encoded_, используя словарь с расшифровками _translations_.  

При этом структура данных должна сохраниться в виде списка объектов с теми же ключами.  

Некоторые поля при раскодировании нужно исключить и оставить в изначальном виде: _groupId_, _service_, _formatSize_ и _ca_

Также необходимо вывести список уникальных id, из _encoded_ (можно использовать _translations_ для проверки).

### Task_2
Необходимо разработать одностраничный сервис для конвертации валют. Для получения актуальной информации нужно воспользоваться открытым API, [_например этим_](https://www.exchangerate-api.com/docs/free). 

У пользователя должна быть возможность выбрать пару валют и ввести сумму конвертации. При вводе чисел должен происходить реактивный перерасчет.

Важным условием этой задачи является наличие двух полей для ввода. Пользователь может ввести в произвольное и тогда значение в другом должно поменяться.

Проект уже инициализирован с фреймворком Svelte, сторонние библиотеки не требуются.

Визуальная составляющая остается на ваш вкус. Она не является ключевым фактором в данном задании.