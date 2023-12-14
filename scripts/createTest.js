const KEY = 'TEST_CARDS';

/**
 * Метод для получения id карточки:
 * id нужен для того, чтобы при удалении карточки мы могли к ней обратиться (id - уникальное в рамках всего DOM-дерева)
 * @param str - тема теста (она уникальна)
 * @returns {number} - хеш
 */
const getHash = str => {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 3) - hash + chr;
    }

    return hash;
}

/**
 * Метод для получения данных из LS
 * localStorage.getItem возвращает строку (json) или null, если такого ключа в LS нет
 * @returns {any|*[]} - массив объектов
 */
const getLSData = () => {
    const lsValue = localStorage.getItem(KEY);

    return lsValue ? JSON.parse(lsValue) : [];
}

/**
 * Метод для сета данных по нашему ключу
 * @param data - данные, которые мы хотим положить в LS
 */
const setLSData = (data) => {
    localStorage.setItem(KEY, JSON.stringify(data));
}

/**
 * Проверка на уникальность создаваемого теста
 * @param objectId - id создаваемого объекта
 * @returns {boolean} - true если уникальный, иначе false
 */
const getIsUnique = (objectId) => {
    const cardWithGivenId = document.querySelector(`#test${objectId}`);

    return !cardWithGivenId;
}

/**
 * Метод, валидирующий значения:
 * Количество заданий в тесте не может быть <= 0, как и кол-во студентов, также есть граница сверху
 * @param tasks - количество заданий
 * @param students - количество студентов
 * @returns {boolean} - true, если значения валидны, иначе false
 */
const handleValidateValues = (tasks, students) => {
    if (tasks <= 0 || students <= 0) {
        return false;
    }

    if (tasks > 100 || students > 100) {
        return false;
    }

    return true;
}

/**
 * Метод, который рендерит карточку для каждого объекта
 * @param object - текущий объект
 */
const renderObjectCard = object => {
    const currentData = getLSData();

    const testCard = document.createElement('div');
    testCard.classList.add('test');

    const testLink = document.createElement('a');
    testLink.href = '#';
    testLink.innerText = `Тема: "${object.testTheme}"`;

    const tasksSpan = document.createElement('span');
    tasksSpan.innerText = `Количество заданий: ${object.tasksNum}`;

    const studentsSpan = document.createElement('span');
    studentsSpan.innerText = `Участники: 0 из ${object.studentsNum}`;

    const deleteButton = document.createElement('button');
    const deleteImg = document.createElement('img');
    deleteImg.src = 'assets/icons/trash.svg';
    deleteImg.alt = 'trash';
    deleteButton.appendChild(deleteImg);
    deleteButton.addEventListener('click', () => {
        testCard.remove();
        const filteredData = currentData.filter(item => item.id !== object.id);
        setLSData(filteredData);
    })

    /**
     * Проверяем, сохранили ли мы значение
     * Если да, то в карточке появляется соответствующая иконка
     */
    if (currentData.find(item => item.id === object.id)) {
        const saveImg = document.createElement('img');
        saveImg.src = 'assets/icons/save.svg';
        saveImg.alt = 'save';
        saveImg.classList.add('save-icon');
        testCard.appendChild(saveImg);
    }

    testCard.append(testLink, tasksSpan, studentsSpan, deleteButton);
    testCard.setAttribute('id', `test${object.id}`);

    testsContainer.appendChild(testCard);
}

const form = document.querySelector('.create-test-form');
const formInputs = Array.from(document.querySelectorAll('.test-input')).map(
    element => element.querySelector('input')
);
const formCheckbox = document.querySelector('.checkbox-button').querySelector('input');
const testsContainer = document.querySelector('.tests-container');

form.onsubmit = (event) => {
    event.preventDefault();
    const [testTheme, tasksNum, studentsNum] = formInputs.map(input => input.value);
    const objectId = getHash(testTheme);

    const isValid = handleValidateValues(tasksNum, studentsNum);

    const isUnique = getIsUnique(objectId);

    if (!isValid) {
        alert('Проверьте правильность введенных данных!');
        return;
    } else if (!isUnique) {
        alert('Тест на такую тему уже создан!');
        return;
    }

    const newDataObject = {
        id: objectId,
        testTheme,
        tasksNum,
        studentsNum,
    }

    const isSavingData = formCheckbox.checked;

    if (isSavingData) {
        const prevData = getLSData();
        setLSData([...prevData, newDataObject])
    }

    renderObjectCard(newDataObject);
}

/**
 * При загрузке страницы достаем все объекты из LS и рендерим каждый из них
 */
window.onload = () => {
    const currentData = getLSData();

    currentData.forEach(renderObjectCard);
}