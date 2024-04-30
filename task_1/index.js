import { encoded, translations } from './data.js';

console.log("Let's rock");
console.log(encoded, translations);

// ТЗ смущает
// зачем упоминать суфикс id, если в исключениях есть ca без id?
// "суфикс" подразумевает, что может быть ещё и окончание?
// А как обрабатывать поля отсутсвующие в translations?
// О каких уникальных id речь?

// Чтож...
// Пусть суфикс id не является критерием отбора и достаточно перебрать все нужные ключи
// Пусть уникальные id - те id, которые используются в рамках одного объекта и не входят в исключения
// Пусть отсутсвующие в translations объекты остаются без изменений
// Также выведем общее количество объектов

const exceptions = ['groupId', 'service', 'formatSize', 'ca']; // поля, которые нужно исключить
const decoded = []; // декодированные данные
const uniqueIds = []; // массив с уникальными id для каждого объекта

for (const obj of encoded) {
  const newObj = {};
  const uniqueIdsElement = { groupId: obj.groupId, ids: new Set(), total: 0 };
  for (const [key, value] of Object.entries(obj)) {
    if (!exceptions.includes(key) && value !== null) {
      newObj[key] = translations[value] || value; // или value на случай неизвестного значения
      uniqueIdsElement.ids.add(value);
      continue;
    }

    newObj[key] = value;
  }
  uniqueIdsElement.total = uniqueIdsElement.ids.size;
  uniqueIds.push(uniqueIdsElement);
  decoded.push(newObj);
}

console.log('\n************************************\n');
console.log(`Общее количество обработанных объектов: ${decoded.length}\n`, decoded);
console.log('\n************************************\n');
console.log('Уникальные id:', uniqueIds);
