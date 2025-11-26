// === Конфигурация "текущего пользователя" ===
const currentUser = 'Ivan Ivanov'; // или null, если пользователь не залогинен

// === Массив объектов информации (ObjInf) ===
// нужно будет довести количество объектов до >= 20
const initialAssignments = [
  {
    id: '1',
    description: 'Решить квадратное уравнение',
    createdAt: new Date('2025-11-10T10:00:00'),
    author: 'Teacher Petrov',
    photoLink: '',
    title: 'Задание 1: уравнение',
    deadline: new Date('2025-11-19'),
    discipline: 'Математика',
    status: 'В работе',   // В работе | На проверке | Проверено
    maxPoints: 10
  },
  {
    id: '2',
    description: 'Написать программу на Python',
    createdAt: new Date('2025-11-11T12:30:00'),
    author: 'Teacher Sidorov',
    photoLink: '',
    title: 'Задание 2: Python',
    deadline: new Date('2025-11-21'),
    discipline: 'Программирование',
    status: 'Проверено',
    maxPoints: 10
  },
  {
    id: '3',
    description: 'Подготовить презентацию по теме "Физика"',
    createdAt: new Date('2025-11-12T09:15:00'),
    author: 'Teacher Ivanova',
    photoLink: '',
    title: 'Задание 3: презентация',
    deadline: new Date('2025-11-25'),
    discipline: 'Физика',
    status: 'На проверке',
    maxPoints: 8
  },
  // ... дальше по аналогии дописываешь до 20+ объектов
];


class AssignmentCollection {
  constructor(objs = []) {
    this._assignments = [];
    this.addAll(objs);
  }

  // === Валидация одного объекта ===
  _isValidId(id) {
    return typeof id === 'string' && id.trim().length > 0;
  }

  _isValidAssignment(obj, partial = false) {
    if (typeof obj !== 'object' || obj === null) return false;

    // при partial = true используем только поля, которые есть
    const checkField = (field, validator) => {
      if (partial && !(field in obj)) return true;
      return validator(obj[field]);
    };

    const okId          = partial || this._isValidId(obj.id);
    const okDesc        = checkField('description', v => typeof v === 'string' && v.length > 0 && v.length < 200);
    const okCreatedAt   = checkField('createdAt', v => v instanceof Date && !isNaN(v));
    const okAuthor      = checkField('author', v => typeof v === 'string' && v.trim().length > 0);
    const okPhoto       = !('photoLink' in obj) || typeof obj.photoLink === 'string';

    const okTitle       = checkField('title', v => typeof v === 'string' && v.trim().length > 0);
    const okDeadline    = checkField('deadline', v => v instanceof Date && !isNaN(v));
    const okDiscipline  = checkField('discipline', v => typeof v === 'string' && v.trim().length > 0);
    const okStatus      = checkField('status', v => typeof v === 'string' && v.trim().length > 0);
    const okMaxPoints   = checkField('maxPoints', v => typeof v === 'number' && v > 0);

    return okId && okDesc && okCreatedAt && okAuthor && okPhoto &&
           okTitle && okDeadline && okDiscipline && okStatus && okMaxPoints;
  }

  // === getObjs(skip, top, filterConfig) ===
  getObjs(skip = 0, top = 10, filterConfig = {}) {
    let result = [...this._assignments];

    // фильтрация
    if (filterConfig.author) {
      result = result.filter(a => a.author === filterConfig.author);
    }
    if (filterConfig.discipline) {
      result = result.filter(a => a.discipline === filterConfig.discipline);
    }
    if (filterConfig.status) {
      result = result.filter(a => a.status === filterConfig.status);
    }
    if (filterConfig.dateFrom) {
      const from = filterConfig.dateFrom;
      result = result.filter(a => a.createdAt >= from);
    }
    if (filterConfig.dateTo) {
      const to = filterConfig.dateTo;
      result = result.filter(a => a.createdAt <= to);
    }

    // сортировка (поменяй при желании на сортировку по deadline)
    result.sort((a, b) => a.createdAt - b.createdAt);

    return result.slice(skip, skip + top);
  }

  // === getObj(id) ===
  getObj(id) {
    return this._assignments.find(a => a.id === id) || null;
  }

  // === addObj(obj) ===
  addObj(obj) {
    if (!this._isValidAssignment(obj)) return false;
    if (this.getObj(obj.id)) return false; // id должен быть уникален
    this._assignments.push(obj);
    return true;
  }

  // === editObj(id, changes) ===
  editObj(id, changes) {
    const assignment = this.getObj(id);
    if (!assignment) return false;

    // нельзя менять id, author, createdAt
    const forbidden = ['id', 'author', 'createdAt'];
    forbidden.forEach(f => { if (f in changes) delete changes[f]; });

    const draft = { ...assignment, ...changes };

    if (!this._isValidAssignment(draft, true)) return false;

    Object.assign(assignment, changes);
    return true;
  }

  // === removeObj(id) ===
  removeObj(id) {
    const index = this._assignments.findIndex(a => a.id === id);
    if (index === -1) return false;
    this._assignments.splice(index, 1);
    return true;
  }

  // === addAll(objs) ===
  addAll(objs = []) {
    const invalid = [];
    objs.forEach(o => {
      if (!this.addObj(o)) invalid.push(o);
    });
    return invalid; // по заданию можно вернуть список невалидных
  }

  clear() {
    this._assignments = [];
  }
}


class AssignmentView {
  constructor(listElementId) {
    this._listEl = document.getElementById(listElementId);
    this._userNameEls = document.querySelectorAll('.current-user-name');
    this._teacherOnlyEls = document.querySelectorAll('.teacher-only');
  }

  renderUser(user) {
    this._userNameEls.forEach(el => {
      el.textContent = user || 'Гость';
    });

    const display = user ? '' : 'none';
    this._teacherOnlyEls.forEach(el => {
      el.style.display = display;
    });
  }

  clearList() {
    this._listEl.innerHTML = '';
  }

  renderAssignments(assignments) {
    this.clearList();
    assignments.forEach(a => this._appendAssignment(a));
  }

  _appendAssignment(a) {
    const li = document.createElement('li');
    li.dataset.id = a.id;
    li.innerHTML = `
      <strong>${a.title}</strong> 
      (Дисциплина: ${a.discipline}, срок: <strong>${a.deadline.toISOString().slice(0, 10)}</strong>, 
      статус: <strong>${a.status}</strong>)<br>
      <small>Автор: ${a.author}, создано: ${a.createdAt.toISOString().slice(0, 10)}</small><br>
      Описание: ${a.description}
    `;
    this._listEl.appendChild(li);
  }

  removeAssignment(id) {
    const li = this._listEl.querySelector(`li[data-id="${id}"]`);
    if (li) li.remove();
  }

  updateAssignment(a) {
    const li = this._listEl.querySelector(`li[data-id="${a.id}"]`);
    if (!li) return this._appendAssignment(a);
    li.innerHTML = `
      <strong>${a.title}</strong> 
      (Дисциплина: ${a.discipline}, срок: <strong>${a.deadline.toISOString().slice(0, 10)}</strong>, 
      статус: <strong>${a.status}</strong>)<br>
      <small>Автор: ${a.author}, создано: ${a.createdAt.toISOString().slice(0, 10)}</small><br>
      Описание: ${a.description}
    `;
  }
}


const App = (function () {
  const collection = new AssignmentCollection(initialAssignments);
  let view;

  function init() {
  view = new AssignmentView('assignments-list');
  view.renderUser(currentUser);
  // при старте сразу показываем первые 20 заданий через общий метод
  getObjs(0, 20);
}

// === Функции, которые дергаешь из консоли ===
function getObjs(skip = 0, top = 10, filterConfig = {}) {
  const result = collection.getObjs(skip, top, filterConfig);
  // каждый вызов getObjs теперь перерисовывает список в DOM
  view.renderAssignments(result);
  return result;
}


  function addObj(obj) {
    const ok = collection.addObj(obj);
    if (ok) {
      // перерисовываем список (или можно добавить только один элемент)
      view.renderAssignments(collection.getObjs(0, 100));
    }
    return ok;
  }

  function editObj(id, changes) {
    const ok = collection.editObj(id, changes);
    if (ok) {
      const updated = collection.getObj(id);
      view.updateAssignment(updated);
    }
    return ok;
  }

  function removeObj(id) {
    const ok = collection.removeObj(id);
    if (ok) {
      view.removeAssignment(id);
    }
    return ok;
  }

  return {
    init,
    getObjs,
    addObj,
    editObj,
    removeObj,
  };
})();

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
