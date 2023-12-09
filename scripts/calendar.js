const DAYS_OF_WEEK = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const MONTHS = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

class Calendar {
    year;
    month;
    day;

    constructor() {
        const currentDate = new Date();
        this.day = currentDate.getDate();
        this.month = currentDate.getMonth();
        this.year = currentDate.getFullYear();
    }

    showMonth(year, month) {
        let k;
        let i;

        const firstDayOfMonth = new Date(year, month, 7).getDay(); // Первый день недели в выбранном месяце
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // Последний день выбранного месяца
        const lastDayOfLastMonth = month === 0 ?
            new Date(year - 1, 11, 0).getDate() : new Date(year, month, 0).getDate(); // Последний день предыдущего месяца

        let html = '<table>';

        // Запись выбранного месяца и года
        html += '<thead><tr>';
        html += '<td colspan="7">' + MONTHS[month] + ' ' + year + '</td>';
        html += '</tr></thead>';


        // заголовок дней недели
        html += '<tr class="days">';
        for(i = 0; i < DAYS_OF_WEEK.length; i++) {
            html += '<td>' + DAYS_OF_WEEK[i] + '</td>';
        }
        html += '</tr>';

        // Записываем дни
        i = 1;
        do {

            let dow = new Date(year, month, i).getDay();

            // Начать новую строку в понедельник
            if ( dow === 1 ) {
                html += '<tr>';
            }

            // Если первый день недели не понедельник показать последние дни предыдущего месяца
            else if ( i === 1 ) {
                html += '<tr>';
                k = lastDayOfLastMonth - firstDayOfMonth + 1;
                for (let j = 0; j < firstDayOfMonth; j++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }

            // Записываем текущий день в цикл
            const chk = new Date();
            const chkY = chk.getFullYear();
            const chkM = chk.getMonth();

            if (chkY === this.year && chkM === this.month && i === this.day) {
                html += '<td class="today">' + i + '</td>';
            } else {
                html += '<td class="normal">' + i + '</td>';
            }

            // закрыть строку в воскресенье
            if ( dow === 0 ) {
                html += '</tr>';
            }

            // Если последний день месяца не воскресенье, показать первые дни следующего месяца
            else if ( i === lastDateOfMonth ) {
                k = 1;
                for(dow; dow < 7; dow++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }

            i++;
        } while (i <= lastDateOfMonth);

        // Конец таблицы
        html += '</table>';

        // Записываем HTML в div
        document.querySelector('.calendar').innerHTML = html;
    }

    showCurrent() {
        this.showMonth(this.year, this.month);
    }

    goToNextMonth() {
        if (this.month === 11) {
            this.month = 0;
            this.year = this.year + 1;
        }
        else {
            this.month = this.month + 1;
        }

        this.showCurrent();
    }

    goToPrevMonth() {
        if (this.month === 0) {
            this.month = 11;
            this.year = this.year - 1;
        }
        else {
            this.month = this.month - 1;
        }

        this.showCurrent();
    }
}

// При загрузке окна
window.onload = function() {

    // Начать календарь
    const calendar = new Calendar();
    calendar.showCurrent();

    // Привязываем кнопки «Следующий» и «Предыдущий»
    document.querySelector('.calendar-next').onclick = calendar.goToNextMonth.bind(calendar);
    document.querySelector('.calendar-prev').onclick = calendar.goToPrevMonth.bind(calendar);
}
