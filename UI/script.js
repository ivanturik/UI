// =======================
//   Лаба 7: Events + LocalStorage + Роли
// =======================

// ==== USERS & AUTH ====

const USERS = [
  {
    login: 'student',
    password: '123',
    name: 'Студент',
    role: 'student',
  },
  {
    login: 'teacher',
    password: '123',
    name: 'Преподаватель',
    role: 'teacher',
  },
  {
    login: 'admin',
    password: '123',
    name: 'Администратор',
    role: 'admin',
  },
];

// текущий пользователь (объект или null)
let currentUser = null;

function restoreCurrentUser() {
  try {
    const raw = localStorage.getItem('currentUser');
    if (!raw) return null;
    const obj = JSON.parse(raw);
    if (!obj || !obj.role) return null;
    return obj;
  } catch (e) {
    console.error('Ошибка восстановления currentUser', e);
    return null;
  }
}

function saveCurrentUser() {
  if (!currentUser) {
    localStorage.removeItem('currentUser');
    return;
  }
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

currentUser = restoreCurrentUser();

// ==== PROFILE ====

let userProfile = restoreProfile();

function restoreProfile() {
  try {
    const raw = localStorage.getItem('userProfile');
    if (!raw) {
      return {
        firstName: '',
        lastName: '',
        email: '',
      };
    }
    const obj = JSON.parse(raw);
    return {
      firstName: obj.firstName ?? '',
      lastName: obj.lastName ?? '',
      email: obj.email ?? '',
    };
  } catch (e) {
    console.error('Ошибка восстановления профиля', e);
    return {
      firstName: '',
      lastName: '',
      email: '',
    };
  }
}

function saveProfile() {
  localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

// ==== INITIAL DATA ====

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
    status: 'В работе',
    maxPoints: 10,
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
    maxPoints: 10,
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
    maxPoints: 8,
  },
  {
    id: '4',
    description: 'Решить систему линейных уравнений',
    createdAt: new Date('2025-11-13T14:00:00'),
    author: 'Teacher Petrov',
    photoLink: '',
    title: 'Задание 4: система уравнений',
    deadline: new Date('2025-11-26'),
    discipline: 'Математика',
    status: 'В работе',
    maxPoints: 12,
  },
  {
    id: '5',
    description: 'Реализовать сортировку массивов на C++',
    createdAt: new Date('2025-11-13T16:20:00'),
    author: 'Teacher Smirnov',
    photoLink: '',
    title: 'Задание 5: сортировка',
    deadline: new Date('2025-11-27'),
    discipline: 'Программирование',
    status: 'В работе',
    maxPoints: 9,
  },
  {
    id: '6',
    description: 'Подготовить конспект по теме "Интегралы"',
    createdAt: new Date('2025-11-14T09:00:00'),
    author: 'Teacher Petrov',
    photoLink: '',
    title: 'Задание 6: интегралы',
    deadline: new Date('2025-11-28'),
    discipline: 'Математика',
    status: 'На проверке',
    maxPoints: 7,
  },
  {
    id: '7',
    description: 'Сделать отчёт по лабораторной работе №1',
    createdAt: new Date('2025-11-14T11:30:00'),
    author: 'Teacher Sidorov',
    photoLink: '',
    title: 'Задание 7: отчёт по лабе',
    deadline: new Date('2025-11-29'),
    discipline: 'Программирование',
    status: 'Проверено',
    maxPoints: 10,
  },
  {
    id: '8',
    description: 'Решить задачи на законы Ньютона',
    createdAt: new Date('2025-11-15T10:10:00'),
    author: 'Teacher Ivanova',
    photoLink: '',
    title: 'Задание 8: законы Ньютона',
    deadline: new Date('2025-11-30'),
    discipline: 'Физика',
    status: 'В работе',
    maxPoints: 8,
  },
  {
    id: '9',
    description: 'Подготовить доклад по теме "Электромагнетизм"',
    createdAt: new Date('2025-11-15T13:45:00'),
    author: 'Teacher Ivanova',
    photoLink: '',
    title: 'Задание 9: доклад по физике',
    deadline: new Date('2025-12-01'),
    discipline: 'Физика',
    status: 'На проверке',
    maxPoints: 9,
  },
  {
    id: '10',
    description: 'Сделать UML-диаграмму для небольшого проекта',
    createdAt: new Date('2025-11-16T09:30:00'),
    author: 'Teacher Smirnov',
    photoLink: '',
    title: 'Задание 10: UML-диаграмма',
    deadline: new Date('2025-12-02'),
    discipline: 'Проектирование ПО',
    status: 'В работе',
    maxPoints: 10,
  },
  {
    id: '11',
    description: 'Реализовать поиск в ширину и глубину',
    createdAt: new Date('2025-11-16T15:00:00'),
    author: 'Teacher Sidorov',
    photoLink: '',
    title: 'Задание 11: графы',
    deadline: new Date('2025-12-03'),
    discipline: 'Алгоритмы и структуры данных',
    status: 'В работе',
    maxPoints: 11,
  },
  {
    id: '12',
    description: 'Подготовить тестовые вопросы по теме "ООП"',
    createdAt: new Date('2025-11-17T08:50:00'),
    author: 'Teacher Smirnov',
    photoLink: '',
    title: 'Задание 12: вопросы по ООП',
    deadline: new Date('2025-12-04'),
    discipline: 'Программирование',
    status: 'Проверено',
    maxPoints: 6,
  },
  {
    id: '13',
    description: 'Сделать сравнительный анализ сортировок',
    createdAt: new Date('2025-11-17T12:10:00'),
    author: 'Teacher Sidorov',
    photoLink: '',
    title: 'Задание 13: анализ алгоритмов',
    deadline: new Date('2025-12-05'),
    discipline: 'Алгоритмы и структуры данных',
    status: 'На проверке',
    maxPoints: 10,
  },
  {
    id: '14',
    description: 'Решить набор задач на производную',
    createdAt: new Date('2025-11-18T09:05:00'),
    author: 'Teacher Petrov',
    photoLink: '',
    title: 'Задание 14: производные',
    deadline: new Date('2025-12-06'),
    discipline: 'Математика',
    status: 'В работе',
    maxPoints: 9,
  },
  {
    id: '15',
    description: 'Написать простое веб-приложение на HTML/CSS',
    createdAt: new Date('2025-11-18T14:25:00'),
    author: 'Teacher Smirnov',
    photoLink: '',
    title: 'Задание 15: веб-страница',
    deadline: new Date('2025-12-07'),
    discipline: 'Веб-разработка',
    status: 'Проверено',
    maxPoints: 8,
  },
  {
    id: '16',
    description: 'Создать диаграмму классов для системы занятий',
    createdAt: new Date('2025-11-19T10:40:00'),
    author: 'Teacher Smirnov',
    photoLink: '',
    title: 'Задание 16: диаграмма классов',
    deadline: new Date('2025-12-08'),
    discipline: 'Проектирование ПО',
    status: 'На проверке',
    maxPoints: 9,
  },
  {
    id: '17',
    description: 'Подготовить презентацию по SOLID-принципам',
    createdAt: new Date('2025-11-19T13:00:00'),
    author: 'Teacher Smirnov',
    photoLink: '',
    title: 'Задание 17: SOLID',
    deadline: new Date('2025-12-09'),
    discipline: 'Проектирование ПО',
    status: 'В работе',
    maxPoints: 7,
  },
  {
    id: '18',
    description: 'Реализовать REST API для простого сервиса',
    createdAt: new Date('2025-11-20T09:20:00'),
    author: 'Teacher Sidorov',
    photoLink: '',
    title: 'Задание 18: REST API',
    deadline: new Date('2025-12-10'),
    discipline: 'Веб-разработка',
    status: 'В работе',
    maxPoints: 12,
  },
  {
    id: '19',
    description: 'Решить задачу на закон сохранения энергии',
    createdAt: new Date('2025-11-20T11:15:00'),
    author: 'Teacher Ivanova',
    photoLink: '',
    title: 'Задание 19: энергия',
    deadline: new Date('2025-12-11'),
    discipline: 'Физика',
    status: 'На проверке',
    maxPoints: 8,
  },
  {
    id: '20',
    description: 'Написать отчёт по итогам семестра',
    createdAt: new Date('2025-11-21T10:00:00'),
    author: 'Teacher Petrov',
    photoLink: '',
    title: 'Задание 20: итоговый отчёт',
    deadline: new Date('2025-12-15'),
    discipline: 'Проектная деятельность',
    status: 'В работе',
    maxPoints: 15,
  },
];

// ==== MODEL: AssignmentCollection ====

class AssignmentCollection {
  constructor(objs = []) {
    this._assignments = [];
    const ok = this.restore();
    if (!ok || this._assignments.length === 0) {
      this.addAll(objs);
      this.save();
    }
  }

  _isValidId(id) {
    return typeof id === 'string' && id.trim().length > 0;
  }

  _isValidAssignment(obj, partial = false) {
    if (typeof obj !== 'object' || obj === null) return false;

    const checkField = (field, validator) => {
      if (partial && !(field in obj)) return true;
      return validator(obj[field]);
    };

    const okId = partial || this._isValidId(obj.id);
    const okDesc = checkField(
      'description',
      (v) => typeof v === 'string' && v.length > 0 && v.length < 200,
    );
    const okCreatedAt = checkField(
      'createdAt',
      (v) => v instanceof Date && !isNaN(v),
    );
    const okAuthor = checkField(
      'author',
      (v) => typeof v === 'string' && v.trim().length > 0,
    );
    const okPhoto = !('photoLink' in obj) || typeof obj.photoLink === 'string';

    const okTitle = checkField(
      'title',
      (v) => typeof v === 'string' && v.trim().length > 0,
    );
    const okDeadline = checkField(
      'deadline',
      (v) => v instanceof Date && !isNaN(v),
    );
    const okDiscipline = checkField(
      'discipline',
      (v) => typeof v === 'string' && v.trim().length > 0,
    );
    const okStatus = checkField(
      'status',
      (v) => typeof v === 'string' && v.trim().length > 0,
    );
    const okMaxPoints =
      checkField('maxPoints', (v) => typeof v === 'number' && v > 0);

    return (
      okId &&
      okDesc &&
      okCreatedAt &&
      okAuthor &&
      okPhoto &&
      okTitle &&
      okDeadline &&
      okDiscipline &&
      okStatus &&
      okMaxPoints
    );
  }

  getObjs(skip = 0, top = 10, filterConfig = {}) {
    let result = [...this._assignments];

    if (filterConfig.author) {
      result = result.filter((a) => a.author === filterConfig.author);
    }
    if (filterConfig.discipline) {
      result = result.filter((a) => a.discipline === filterConfig.discipline);
    }
    if (filterConfig.status) {
      result = result.filter((a) => a.status === filterConfig.status);
    }
    if (filterConfig.dateFrom) {
      result = result.filter((a) => a.createdAt >= filterConfig.dateFrom);
    }
    if (filterConfig.dateTo) {
      result = result.filter((a) => a.createdAt <= filterConfig.dateTo);
    }

    result.sort((a, b) => a.createdAt - b.createdAt);

    return result.slice(skip, skip + top);
  }

  getObj(id) {
    return this._assignments.find((a) => a.id === id) || null;
  }

  addObj(obj) {
    if (!this._isValidAssignment(obj)) return false;
    if (this.getObj(obj.id)) return false;
    this._assignments.push(obj);
    this.save();
    return true;
  }

  editObj(id, changes) {
    const assignment = this.getObj(id);
    if (!assignment) return false;

    const forbidden = ['id', 'author', 'createdAt'];
    forbidden.forEach((f) => {
      if (f in changes) delete changes[f];
    });

    const draft = { ...assignment, ...changes };
    if (!this._isValidAssignment(draft, true)) return false;

    Object.assign(assignment, changes);
    this.save();
    return true;
  }

  removeObj(id) {
    const index = this._assignments.findIndex((a) => a.id === id);
    if (index === -1) return false;
    this._assignments.splice(index, 1);
    this.save();
    return true;
  }

  addAll(objs = []) {
    const invalid = [];
    objs.forEach((o) => {
      if (!this.addObj(o)) invalid.push(o);
    });
    this.save();
    return invalid;
  }

  clear() {
    this._assignments = [];
    this.save();
  }

  save() {
    const data = this._assignments.map((a) => ({
      ...a,
      createdAt: a.createdAt.toISOString(),
      deadline: a.deadline.toISOString(),
    }));
    localStorage.setItem('assignments', JSON.stringify(data));
  }

  restore() {
    const raw = localStorage.getItem('assignments');
    if (!raw) return false;
    try {
      const data = JSON.parse(raw);
      this._assignments = data.map((a) => ({
        ...a,
        createdAt: new Date(a.createdAt),
        deadline: new Date(a.deadline),
      }));
      return true;
    } catch (e) {
      console.error('Ошибка восстановления assignments', e);
      return false;
    }
  }
}

// ==== VIEW: DOM ====

class AssignmentView {
  constructor(listElementId) {
    this._listEl = document.getElementById(listElementId);
    this._userNameEls = document.querySelectorAll('.current-user-name');
    this._logoutBtn = document.getElementById('logout-btn');
  }

  renderUser(user) {
    // Имя в шапке
    this._userNameEls.forEach((el) => {
      el.textContent = user ? user.name : 'Гость';
    });

    const role = user?.role || 'guest';
    const isTeacherOrAdmin = role === 'teacher' || role === 'admin';
    const isAdmin = role === 'admin';
    const isGuest = !user;
    const isStudent = role === 'student';

    // каждый раз берём актуальные элементы
    const teacherEls = document.querySelectorAll('.teacher-only');
    const adminEls = document.querySelectorAll('.admin-only');
    const guestEls = document.querySelectorAll('.guest-only');
    const studentEls = document.querySelectorAll('.student-only');

    // teacher-only: только teacher/admin
    teacherEls.forEach((el) => {
      el.style.display = isTeacherOrAdmin ? 'inline-block' : 'none';
    });

    // admin-only: только admin
    adminEls.forEach((el) => {
      const isSection = el.tagName === 'SECTION';
      if (isAdmin) {
        el.style.display = isSection ? 'block' : 'inline-block';
      } else {
        el.style.display = 'none';
      }
    });

    // guest-only: только гость
    guestEls.forEach((el) => {
      const isSection = el.tagName === 'SECTION';
      if (isGuest) {
        el.style.display = isSection ? 'block' : 'inline-block';
      } else {
        el.style.display = 'none';
      }
    });

    // student-only: только студент (запись на курсы)
    studentEls.forEach((el) => {
      const isSection = el.tagName === 'SECTION';
      if (isStudent) {
        el.style.display = isSection ? 'block' : 'inline-block';
      } else {
        el.style.display = 'none';
      }
    });

    // Кнопка "Выйти"
    if (this._logoutBtn) {
      this._logoutBtn.style.display = isGuest ? 'none' : 'inline-block';
    }
  }

  clearList() {
    this._listEl.innerHTML = '';
  }

  renderAssignments(assignments) {
    this.clearList();
    assignments.forEach((a) => this._appendAssignment(a));
  }

  _appendAssignment(a) {
    const li = document.createElement('li');
    li.dataset.id = a.id;
    li.innerHTML = `
      <strong>${a.title}</strong>
      (Дисциплина: ${a.discipline}, срок: <strong>${a.deadline
        .toISOString()
        .slice(0, 10)}</strong>,
      статус: <strong>${a.status}</strong>, макс. балл: <strong>${a.maxPoints}</strong>)<br>
      <small>Автор: ${a.author}, создано: ${a.createdAt
        .toISOString()
        .slice(0, 10)}</small><br>
      Описание: ${a.description}
      <div class="actions">
        <button type="button" class="js-edit-assignment teacher-only">Редактировать</button>
        <button type="button" class="js-delete-assignment teacher-only">Удалить</button>
        <button type="button" class="js-set-grade teacher-only">Поставить оценку</button>
      </div>
    `;
    this._listEl.appendChild(li);
  }

  removeAssignment(id) {
    const li = this._listEl.querySelector(`li[data-id="${id}"]`);
    if (li) li.remove();
  }

  updateAssignment(a) {
    const li = this._listEl.querySelector(`li[data-id="${a.id}"]`);
    if (!li) {
      this._appendAssignment(a);
      return;
    }
    li.innerHTML = `
      <strong>${a.title}</strong>
      (Дисциплина: ${a.discipline}, срок: <strong>${a.deadline
        .toISOString()
        .slice(0, 10)}</strong>,
      статус: <strong>${a.status}</strong>, макс. балл: <strong>${a.maxPoints}</strong>)<br>
      <small>Автор: ${a.author}, создано: ${a.createdAt
        .toISOString()
        .slice(0, 10)}</small><br>
      Описание: ${a.description}
      <div class="actions">
        <button type="button" class="js-edit-assignment teacher-only">Редактировать</button>
        <button type="button" class="js-delete-assignment teacher-only">Удалить</button>
        <button type="button" class="js-set-grade teacher-only">Поставить оценку</button>
      </div>
    `;
  }
}

// ==== CONTROLLER: App (Events + Глобальные функции) ====

const App = (function () {
  const collection = new AssignmentCollection(initialAssignments);
  let view;

  let currentFilter = {};
  let currentSkip = 0;
  const PAGE_SIZE = 10;
    // ===== Админ-панель: пользователи (localStorage) =====

  let adminUsers = restoreAdminUsers();

  function restoreAdminUsers() {
    try {
      const raw = localStorage.getItem('adminUsers');
      if (!raw) {
        // Первый запуск: стартовый набор пользователей
        return [
          {
            id: 'u1',
            name: 'Иван Иванов',
            email: 'ivan.ivanov@mail.com',
            role: 'student',
            group: 'Группа 1',
            discipline: '',
          },
          {
            id: 'u2',
            name: 'Пётр Петров',
            email: 'p.petrov@mail.com',
            role: 'teacher',
            group: '',
            discipline: 'Программирование',
          },
        ];
      }
      const arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      console.error('Ошибка восстановления adminUsers', e);
      return [];
    }
  }

  function saveAdminUsers() {
    localStorage.setItem('adminUsers', JSON.stringify(adminUsers));
  }

  function renderPage(reset = false) {
    if (reset) currentSkip = 0;
    const slice = collection.getObjs(currentSkip, PAGE_SIZE, currentFilter);
    if (reset) {
      view.renderAssignments(slice);
    } else {
      const existing = collection.getObjs(0, currentSkip, currentFilter);
      const all = existing.concat(slice);
      view.renderAssignments(all);
    }
  }
  
  function renderAdminUsers() {
    const list = document.querySelector('.admin-list');
    if (!list) return;

    list.innerHTML = '';

    adminUsers.forEach((u) => {
      const li = document.createElement('li');
      li.className = 'user-row';
      li.dataset.id = u.id;

      const roleLabel =
        u.role === 'student'
          ? 'Student'
          : u.role === 'teacher'
            ? 'Teacher'
            : 'Admin';

      li.innerHTML = `
        ${roleLabel}: <strong>${u.name}</strong> (${u.email}${
          u.group ? ', ' + u.group : ''
        }${u.discipline ? ', ' + u.discipline : ''}) →
        <button type="button" class="action-btn js-admin-edit">Редактировать</button>
        <button type="button" class="action-btn delete-btn js-admin-delete">Удалить</button>
      `;
      list.appendChild(li);
    });
  }

  function onAdminListClick(event) {
    const btn = event.target.closest('button');
    if (!btn) return;

    if (!currentUser || currentUser.role !== 'admin') {
      alert('Управлять пользователями может только администратор');
      return;
    }

    const li = btn.closest('li.user-row');
    if (!li) return;

    const id = li.dataset.id;
    const user = adminUsers.find((u) => u.id === id);
    if (!user) return;

    if (btn.classList.contains('js-admin-edit')) {
      const newName = prompt('Имя пользователя:', user.name);
      if (!newName) return;

      const newEmail = prompt('Email пользователя:', user.email);
      if (!newEmail) return;

      const newRole = prompt(
        'Роль (student / teacher / admin):',
        user.role,
      );
      if (!newRole || !['student', 'teacher', 'admin'].includes(newRole)) {
        alert('Некорректная роль');
        return;
      }

      let newGroup = user.group || '';
      let newDiscipline = user.discipline || '';

      if (newRole === 'student') {
        newGroup = prompt('Группа студента:', newGroup || 'Группа 1') || '';
        newDiscipline = '';
      } else if (newRole === 'teacher') {
        newDiscipline =
          prompt(
            'Дисциплина преподавателя:',
            newDiscipline || 'Программирование',
          ) || '';
        newGroup = '';
      } else {
        newGroup = '';
        newDiscipline = '';
      }

      user.name = newName.trim();
      user.email = newEmail.trim();
      user.role = newRole;
      user.group = newGroup.trim();
      user.discipline = newDiscipline.trim();

      saveAdminUsers();
      renderAdminUsers();
    }

    if (btn.classList.contains('js-admin-delete')) {
      if (!confirm(`Удалить пользователя ${user.name}?`)) return;
      adminUsers = adminUsers.filter((u) => u.id !== id);
      saveAdminUsers();
      renderAdminUsers();
    }
  }



  function init() {
    view = new AssignmentView('assignments-list');
    view.renderUser(currentUser);
    initProfileUI();
    currentSkip = 0;
    renderPage(true);

    // защита маршрутов для гостя
    window.addEventListener('hashchange', guardRoute);
    guardRoute();

    // ЛОГИН
    const loginForm = document.querySelector('#login form');
    if (loginForm) {
      loginForm.addEventListener('submit', onLoginSubmit);
    }

    // ЛОГАУТ
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', onLogoutClick);
    }

    // ФИЛЬТРЫ / ПАГИНАЦИЯ ЗАДАНИЙ
    const filtersForm = document.getElementById('assignments-filters-form');
    if (filtersForm) {
      filtersForm.addEventListener('submit', onFiltersSubmit);
    }

    const showMoreBtn = document.getElementById('show-more-assignments');
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', onShowMoreClick);
    }

    // ДОБАВЛЕНИЕ ЗАДАНИЯ
    const addForm = document.querySelector('#add-assignment form');
    if (addForm) {
      addForm.addEventListener('submit', onAddAssignmentSubmit);
    }

    // ДЕЛЕГИРОВАНИЕ ПО СПИСКУ ЗАДАНИЙ
    const listEl = document.getElementById('assignments-list');
    if (listEl) {
      listEl.addEventListener('click', onAssignmentsListClick);
    }

    // фильтр каталога курсов
    const catalogFilterBtn = document.querySelector('#home .filter-btn');
    if (catalogFilterBtn) {
      catalogFilterBtn.addEventListener('click', onCatalogFilterClick);
    }
    // --- Админ-панель: пользователи ---
    renderAdminUsers();
    const adminList = document.querySelector('.admin-list');
    if (adminList) {
      adminList.addEventListener('click', onAdminListClick);
    }

  }

  // ==== Handlers / вспомогательные ====

  const GUEST_ALLOWED_HASHES = ['#welcome', '#login', '#register', ''];

  function guardRoute() {
    const hash = location.hash || '#welcome';
    if (!currentUser && !GUEST_ALLOWED_HASHES.includes(hash)) {
      alert('Для доступа к этой странице необходимо авторизоваться');
      location.hash = '#login';
    }
  }

  function onCatalogFilterClick(event) {
    event.preventDefault();
    const select = document.getElementById('discipline-filter');
    const value = select ? select.value : 'Все';

    const list = document.querySelector('#home ul.list');
    if (!list) return;

    const items = list.querySelectorAll('li');
    items.forEach((li) => {
      if (value === 'Все') {
        li.style.display = '';
        return;
      }
      const strong = li.querySelector('strong');
      const d = strong ? strong.textContent.trim() : '';
      li.style.display = d === value ? '' : 'none';
    });
  }

  function getRoleTextFromUser(user) {
    if (!user) return 'Гость';
    switch (user.role) {
      case 'student':
        return 'Студент';
      case 'teacher':
        return 'Преподаватель';
      case 'admin':
        return 'Администратор';
      default:
        return user.role;
    }
  }

  function initProfileUI() {
    const nameEl = document.getElementById('profile-name');
    const roleEl = document.getElementById('profile-role');
    const emailEl = document.getElementById('profile-email');

    // Имя и фамилия — из userProfile
    const fullName =
      (userProfile.firstName || '') +
      (userProfile.lastName ? ' ' + userProfile.lastName : '');
    if (nameEl) {
      nameEl.textContent = fullName || 'Имя не указано';
    }

    // Роль — из currentUser
    if (roleEl) {
      roleEl.textContent = getRoleTextFromUser(currentUser);
    }

    // Email — из userProfile
    if (emailEl) {
      emailEl.textContent = userProfile.email || 'email не указан';
    }

    // Форма редактирования
    const form = document.getElementById('profile-edit-form');
    if (form) {
      form.elements['firstName'].value = userProfile.firstName || '';
      form.elements['lastName'].value = userProfile.lastName || '';
      form.elements['email'].value = userProfile.email || '';

      // Чтобы не навешивать слушатель несколько раз
      form.removeEventListener('submit', onProfileEditSubmit);
      form.addEventListener('submit', onProfileEditSubmit);
    }
  }

  function onProfileEditSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const firstName = form.elements['firstName'].value.trim();
    const lastName = form.elements['lastName'].value.trim();
    const email = form.elements['email'].value.trim();

    if (!firstName || !lastName || !email) {
      alert('Заполните все поля профиля');
      return;
    }

    userProfile = {
      firstName,
      lastName,
      email,
    };
    saveProfile();
    initProfileUI();
    location.hash = '#profile';
  }

  function onLoginSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const login = form.elements['login']?.value?.trim();
    const password = form.elements['password']?.value?.trim();

    const user = USERS.find(
      (u) => u.login === login && u.password === password,
    );

    if (!user) {
      alert('Неверный логин или пароль');
      return;
    }

    currentUser = {
      login: user.login,
      name: user.name,
      role: user.role,
    };
    saveCurrentUser();
    view.renderUser(currentUser);
    initProfileUI();
    alert(`Вы вошли как ${user.name} (${user.role})`);
    location.hash = '#welcome';
  }

  function onLogoutClick() {
    currentUser = null;
    saveCurrentUser();
    view.renderUser(null);
    initProfileUI();
    location.hash = '#login';
  }

  function onFiltersSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const status = form.elements['status-filter']?.value;

    currentFilter = {};
    if (status && status !== 'Все') {
      currentFilter.status = status;
    }
    renderPage(true);
  }

  function onShowMoreClick() {
    currentSkip += PAGE_SIZE;
    renderPage(false);
  }

  function onAddAssignmentSubmit(event) {
    event.preventDefault();

    const role = currentUser?.role || 'guest';
    const isTeacherOrAdmin = role === 'teacher' || role === 'admin';

    if (!isTeacherOrAdmin) {
      alert('Добавлять задания могут только преподаватель или администратор');
      return;
    }

    const form = event.target;
    const title = form.elements['title']?.value?.trim();
    const description = form.elements['description']?.value?.trim();
    const discipline = form.elements['discipline']?.value?.trim();
    const deadlineStr = form.elements['deadline']?.value;

    if (!title || !description || !discipline || !deadlineStr) {
      alert('Заполните все поля');
      return;
    }

    const newId = String(Date.now());
    const newAssignment = {
      id: newId,
      description,
      createdAt: new Date(),
      author: currentUser.name,
      photoLink: '',
      title,
      deadline: new Date(deadlineStr),
      discipline,
      status: 'В работе',
      maxPoints: 10,
    };

    const ok = collection.addObj(newAssignment);
    if (!ok) {
      alert('Не удалось добавить задание (проверьте данные)');
      return;
    }

    renderPage(true);
    form.reset();
  }

  function onAssignmentsListClick(event) {
    const btn = event.target.closest('button');
    if (!btn) return;

    const li = btn.closest('li[data-id]');
    if (!li) return;

    const id = li.dataset.id;
    const role = currentUser?.role || 'guest';
    const isTeacherOrAdmin = role === 'teacher' || role === 'admin';

    if (btn.classList.contains('js-delete-assignment')) {
      if (!isTeacherOrAdmin) {
        alert('Удалять задания могут только преподаватель или администратор');
        return;
      }
      if (confirm('Удалить это задание?')) {
        removeObj(id);
        renderPage(true);
      }
    }

    if (btn.classList.contains('js-edit-assignment')) {
      if (!isTeacherOrAdmin) {
        alert('Редактировать задания могут только преподаватель или администратор');
        return;
      }
      const current = collection.getObj(id);
      const newTitle = prompt(
        'Новое название задания:',
        current?.title || '',
      );
      if (newTitle) {
        editObj(id, { title: newTitle });
        renderPage(true);
      }
    }

    if (btn.classList.contains('js-set-grade')) {
      if (!isTeacherOrAdmin) {
        alert('Оценку могут ставить только преподаватель или администратор');
        return;
      }
      const current = collection.getObj(id);
      const valueStr = prompt(
        'Введите максимальные баллы (число):',
        current?.maxPoints ?? 10,
      );
      const value = Number(valueStr);
      if (!Number.isFinite(value) || value <= 0) {
        alert('Некорректное число');
        return;
      }
      editObj(id, { maxPoints: value, status: 'Проверено' });
      renderPage(true);
    }
  }

  // ==== Глобальные функции для консоли (как в лабе 6) ====

  function getObjs(skip = 0, top = 10, filterConfig = {}) {
    return collection.getObjs(skip, top, filterConfig);
  }

  function addObj(obj) {
    const ok = collection.addObj(obj);
    if (ok) {
      renderPage(true);
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

// ==== Start ====

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
