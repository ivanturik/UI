// Прототип АИС "Обучение на курсах"
// Реализовано разделение ролей: студент, преподаватель, сотрудник.

const STORAGE_KEYS = {
  currentUser: 'ais_current_user',
  users: 'ais_users',
  assignments: 'ais_assignments',
  disciplines: 'ais_disciplines',
};

const BASE_USERS = [
  {
    id: 'student-1',
    login: 'student',
    password: '123',
    role: 'student',
    name: 'Иван Студент',
    email: 'student@mail.com',
    groupId: 'math-g1',
    completedCourses: 1,
    level: 8,
    bonus: 5,
  },
  {
    id: 'teacher-1',
    login: 'teacher',
    password: '123',
    role: 'teacher',
    name: 'Пётр Преподаватель',
    email: 'teacher@mail.com',
  },
  {
    id: 'admin-1',
    login: 'admin',
    password: '123',
    role: 'admin',
    name: 'Ольга Сотрудник',
    email: 'admin@mail.com',
  },
];

const BASE_DISCIPLINES = [
  {
    id: 'math',
    title: 'Математика',
    hours: 30,
    price: 900,
    groups: [
      {
        id: 'math-g1',
        name: 'Группа 1',
        teacherId: 'teacher-1',
        students: ['student-1'],
      },
      {
        id: 'math-g2',
        name: 'Группа 2',
        teacherId: 'teacher-1',
        students: [],
      },
    ],
  },
  {
    id: 'prog',
    title: 'Программирование',
    hours: 50,
    price: 1200,
    groups: [
      { id: 'prog-g1', name: 'Группа A', teacherId: 'teacher-1', students: [] },
    ],
  },
  {
    id: 'phys',
    title: 'Физика',
    hours: 40,
    price: 1000,
    groups: [
      { id: 'phys-g1', name: 'Группа 1', teacherId: 'teacher-1', students: [] },
    ],
  },
];

let disciplines = restoreDisciplines();
let users = restoreUsers();
let assignments = restoreAssignments();
let currentUser = restoreCurrentUser();
let statusFilter = 'Все';
let assignmentsVisibleCount = 10;

function resetAssignmentsPagination() {
  assignmentsVisibleCount = 10;
}

const TASK_TEMPLATES = {
  math: [
    {
      title: 'Решить квадратное уравнение',
      description: 'Подготовить решение и обоснование',
      deadlineDays: 7,
      maxPoints: 10,
    },
    {
      title: 'Система линейных уравнений',
      description: 'Сдать решение трёх систем уравнений',
      deadlineDays: 14,
      maxPoints: 12,
    },
    {
      title: 'Оптимизация функций',
      description: 'Исследовать функцию на экстремумы и построить график',
      deadlineDays: 12,
      maxPoints: 12,
    },
    {
      title: 'Тригонометрические уравнения',
      description: 'Подобрать решения с учётом ограничений области',
      deadlineDays: 10,
      maxPoints: 10,
    },
    {
      title: 'Численные методы',
      description: 'Реализовать метод Ньютона и сравнить с бисекцией',
      deadlineDays: 16,
      maxPoints: 14,
    },
    {
      title: 'Комбинаторика',
      description: 'Рассчитать вероятности в трёх сценариях',
      deadlineDays: 9,
      maxPoints: 9,
    },
    {
      title: 'Матрицы и определители',
      description: 'Вычислить определители разных порядков',
      deadlineDays: 11,
      maxPoints: 11,
    },
    {
      title: 'Ряды и сходимость',
      description: 'Проверить сходимость по признакам Даламбера и Раабе',
      deadlineDays: 13,
      maxPoints: 12,
    },
    {
      title: 'Интегралы',
      description: 'Посчитать набор неопределённых и определённых интегралов',
      deadlineDays: 15,
      maxPoints: 13,
    },
    {
      title: 'Дифференциальные уравнения',
      description: 'Решить уравнение первого порядка несколькими методами',
      deadlineDays: 17,
      maxPoints: 14,
    },
    {
      title: 'Вероятность и статистика',
      description: 'Построить доверительный интервал для выборки',
      deadlineDays: 8,
      maxPoints: 10,
    },
    {
      title: 'Геометрия',
      description: 'Вывести формулы площадей фигур с доказательствами',
      deadlineDays: 10,
      maxPoints: 10,
    },
    {
      title: 'Прогрессии',
      description: 'Составить решения задач на арифметические и геометрические прогрессии',
      deadlineDays: 6,
      maxPoints: 8,
    },
    {
      title: 'Логарифмы и степени',
      description: 'Упростить сложные выражения с логарифмами',
      deadlineDays: 7,
      maxPoints: 9,
    },
    {
      title: 'Комплексные числа',
      description: 'Представить числа в алгебраической и тригонометрической формах',
      deadlineDays: 12,
      maxPoints: 12,
    },
    {
      title: 'Полиномы',
      description: 'Разложить многочлены и найти корни',
      deadlineDays: 9,
      maxPoints: 10,
    },
    {
      title: 'Базис и линейные пространства',
      description: 'Проверить линейную независимость набора векторов',
      deadlineDays: 14,
      maxPoints: 12,
    },
    {
      title: 'Случайные величины',
      description: 'Построить функции распределения и плотности',
      deadlineDays: 11,
      maxPoints: 11,
    },
    {
      title: 'Фурье-анализ',
      description: 'Вычислить коэффициенты ряда Фурье для заданной функции',
      deadlineDays: 15,
      maxPoints: 13,
    },
    {
      title: 'Оптимизационные задачи',
      description: 'Решить задачи линейного программирования графически',
      deadlineDays: 16,
      maxPoints: 12,
    },
  ],
  prog: [
    {
      title: 'Программа на Python',
      description: 'Реализовать проверку ввода и логирования',
      deadlineDays: 10,
      maxPoints: 10,
    },
    {
      title: 'REST API',
      description: 'Набросок API с документацией',
      deadlineDays: 18,
      maxPoints: 12,
    },
  ],
  phys: [
    {
      title: 'Законы Ньютона',
      description: 'Решить набор задач и описать выводы',
      deadlineDays: 9,
      maxPoints: 8,
    },
  ],
};

function restoreDisciplines() {
  const raw = localStorage.getItem(STORAGE_KEYS.disciplines);
  if (!raw) {
    const initial = JSON.parse(JSON.stringify(BASE_DISCIPLINES));
    localStorage.setItem(STORAGE_KEYS.disciplines, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...BASE_DISCIPLINES];
  } catch (e) {
    console.error('Не удалось восстановить дисциплины', e);
    return [...BASE_DISCIPLINES];
  }
}

function saveDisciplines() {
  localStorage.setItem(STORAGE_KEYS.disciplines, JSON.stringify(disciplines));
}

function restoreUsers() {
  const raw = localStorage.getItem(STORAGE_KEYS.users);
  if (!raw) return [...BASE_USERS];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...BASE_USERS];
  } catch (e) {
    console.error('Не удалось восстановить пользователей', e);
    return [...BASE_USERS];
  }
}

function saveUsers() {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function restoreAssignments() {
  const raw = localStorage.getItem(STORAGE_KEYS.assignments);
  if (!raw) {
    return bootstrapAssignments();
  }
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.map((a) => ({ ...a, deadline: new Date(a.deadline) }))
      : bootstrapAssignments();
  } catch (e) {
    console.error('Не удалось восстановить задания', e);
    return bootstrapAssignments();
  }
}

function saveAssignments() {
  const data = assignments.map((a) => ({
    ...a,
    deadline: a.deadline.toISOString(),
  }));
  localStorage.setItem(STORAGE_KEYS.assignments, JSON.stringify(data));
}

function restoreCurrentUser() {
  const raw = localStorage.getItem(STORAGE_KEYS.currentUser);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    console.error('Не удалось восстановить пользователя', e);
    return null;
  }
}

function saveCurrentUser() {
  if (!currentUser) {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    return;
  }
  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(currentUser));
}

function bootstrapAssignments() {
  const prepared = [];
  const studentUsers = users.filter((u) => u.role === 'student' && u.groupId);
  studentUsers.forEach((student) => {
    const group = findGroup(student.groupId);
    if (!group) return;
    const discipline = findDisciplineByGroup(group.id);
    if (!discipline) return;
    const templates = TASK_TEMPLATES[discipline.id] || [];
    templates.forEach((tpl, index) => {
      const deadline = new Date();
      deadline.setDate(deadline.getDate() + tpl.deadlineDays + index);
      prepared.push({
        id: `${student.id}-${tpl.title}-${index}`,
        title: tpl.title,
        description: tpl.description,
        discipline: discipline.title,
        disciplineId: discipline.id,
        groupId: group.id,
        studentId: student.id,
        status: 'В работе',
        deadline,
        maxPoints: tpl.maxPoints,
        score: null,
        bonus: student.bonus || 0,
        comment: '',
      });
    });
  });
  localStorage.setItem(STORAGE_KEYS.assignments, JSON.stringify(prepared.map((a) => ({
    ...a,
    deadline: a.deadline.toISOString(),
  }))));
  return prepared;
}

function findDisciplineByGroup(groupId) {
  return disciplines.find((d) => d.groups.some((g) => g.id === groupId));
}

function findGroup(groupId) {
  for (const d of disciplines) {
    const found = d.groups.find((g) => g.id === groupId);
    if (found) return found;
  }
  return null;
}

function findUserById(userId) {
  return users.find((u) => u.id === userId) || null;
}

function syncGroupsWithUsers() {
  disciplines.forEach((d) => {
    d.groups.forEach((g) => {
      g.students = users.filter((u) => u.groupId === g.id).map((u) => u.id);
    });
  });
}

function renderRoleVisibility() {
  const role = currentUser?.role || 'guest';
  const isAdmin = role === 'admin';
  const isTeacher = role === 'teacher';
  const isStudent = role === 'student';
  const isGuest = !currentUser;

  document.querySelectorAll('.admin-only').forEach((el) => {
    el.style.display = isAdmin ? (el.tagName === 'SECTION' ? 'block' : 'inline-block') : 'none';
  });
  document.querySelectorAll('.teacher-only').forEach((el) => {
    const visible = isAdmin || isTeacher;
    el.style.display = visible ? (el.tagName === 'SECTION' ? 'block' : 'inline-block') : 'none';
  });
  document.querySelectorAll('.student-only').forEach((el) => {
    el.style.display = isStudent ? (el.tagName === 'SECTION' ? 'block' : 'inline-block') : 'none';
  });
  document.querySelectorAll('.guest-only').forEach((el) => {
    el.style.display = isGuest ? (el.tagName === 'SECTION' ? 'block' : 'inline-block') : 'none';
  });

  const nameEls = document.querySelectorAll('.current-user-name');
  nameEls.forEach((el) => {
    el.textContent = currentUser ? currentUser.name : 'Гость';
  });
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.style.display = isGuest ? 'none' : 'inline-block';
  }
}

function renderCatalog() {
  syncGroupsWithUsers();
  const list = document.getElementById('catalog-list');
  const filterSelect = document.getElementById('discipline-filter');
  if (!list || !filterSelect) return;

  filterSelect.innerHTML = '';
  const allOption = document.createElement('option');
  allOption.value = '';
  allOption.textContent = 'Все дисциплины';
  filterSelect.appendChild(allOption);

  disciplines.forEach((d) => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = d.title;
    filterSelect.appendChild(opt);
  });

  const selectedId = filterSelect.value;
  list.innerHTML = '';

  disciplines.filter((d) => !selectedId || d.id === selectedId).forEach((discipline) => {
    const li = document.createElement('li');
    const totalGroups = discipline.groups.length;
    const seats = discipline.groups.map((g) => 10 - g.students.length);
    const text = `Дисциплина: <strong>${discipline.title}</strong> (${totalGroups} групп(ы), макс. 10 студентов в каждой, ${discipline.hours} часов)`;
    const btn = document.createElement('a');
    btn.href = '#enroll';
    btn.className = 'submit-btn student-only';
    btn.dataset.disciplineId = discipline.id;
    btn.textContent = 'Записаться и оплатить';

    const availability = document.createElement('div');
    availability.className = 'hint';
    availability.textContent = `Свободных мест по группам: ${seats.join(', ')}`;

    li.innerHTML = text;
    li.appendChild(document.createElement('br'));
    li.appendChild(btn);
    li.appendChild(availability);
    list.appendChild(li);
  });
}

function renderEnrollForm(prefilledDisciplineId) {
  syncGroupsWithUsers();
  const disciplineSelect = document.getElementById('selected-discipline');
  const groupSelect = document.getElementById('group-select');
  const priceInput = document.getElementById('payment-amount');
  const hint = document.getElementById('discount-hint');
  if (!disciplineSelect || !groupSelect || !priceInput || !hint) return;

  disciplineSelect.innerHTML = '';
  disciplines.forEach((d) => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = `${d.title} (${d.hours} часов)`;
    disciplineSelect.appendChild(opt);
  });
  if (prefilledDisciplineId) {
    disciplineSelect.value = prefilledDisciplineId;
  }

  updateGroupOptions();
  updatePrice();

  disciplineSelect.onchange = () => {
    updateGroupOptions();
    updatePrice();
  };
  groupSelect.onchange = () => updatePrice();

  function updateGroupOptions() {
    const currentDiscipline = disciplines.find((d) => d.id === disciplineSelect.value);
    groupSelect.innerHTML = '';
    if (!currentDiscipline) return;
    currentDiscipline.groups.forEach((g) => {
      const free = 10 - g.students.length;
      const opt = document.createElement('option');
      opt.value = g.id;
      opt.textContent = `${g.name} (${free}/10 мест)`;
      opt.disabled = free <= 0;
      groupSelect.appendChild(opt);
    });
  }

  function updatePrice() {
    const discipline = disciplines.find((d) => d.id === disciplineSelect.value);
    if (!discipline) return;
    const discount = calculateDiscountForCurrentUser();
    const price = Math.round(discipline.price * (1 - discount));
    priceInput.value = price;
    hint.textContent = discount
      ? `Применена скидка ${Math.round(discount * 100)}% за ранее пройденные курсы`
      : 'Скидка не применяется';
  }
}

function calculateDiscountForCurrentUser() {
  if (!currentUser || currentUser.role !== 'student') return 0;
  const user = users.find((u) => u.id === currentUser.id);
  if (!user) return 0;
  return user.completedCourses > 0 ? 0.15 : 0;
}

function renderAssignments() {
  syncGroupsWithUsers();
  const list = document.getElementById('assignments-list');
  const showMoreBtn = document.getElementById('show-more-assignments');
  if (!list) return;
  list.innerHTML = '';

  const visibleAssignments = assignments
    .filter(filterAssignmentsByRole)
    .filter((a) => statusFilter === 'Все' || a.status === statusFilter)
    .sort((a, b) => a.deadline - b.deadline);

  if (assignmentsVisibleCount <= 0 && visibleAssignments.length > 0) {
    assignmentsVisibleCount = Math.min(10, visibleAssignments.length);
  }
  if (assignmentsVisibleCount > visibleAssignments.length) {
    assignmentsVisibleCount = visibleAssignments.length;
  }

  const role = currentUser?.role;
  const isAdmin = role === 'admin';
  const isTeacher = role === 'teacher';
  const isStudent = role === 'student';

  if (visibleAssignments.length === 0) {
    const empty = document.createElement('li');
    empty.textContent = 'Нет заданий по выбранным условиям';
    list.appendChild(empty);
    renderRoleVisibility();
    return;
  }

  visibleAssignments.slice(0, assignmentsVisibleCount).forEach((a) => {
    const li = document.createElement('li');
    li.dataset.id = a.id;
    const student = findUserById(a.studentId);
    const group = findGroup(a.groupId);
    const isOwnerStudent = isStudent && a.studentId === currentUser.id;
    const isResponsibleTeacher =
      (isTeacher || isAdmin) && (isAdmin || group?.teacherId === currentUser.id);

    const actions = [];
    if (isResponsibleTeacher) {
      actions.push('<button type="button" class="js-extend">Продлить срок</button>');
      if (a.status === 'На проверке') {
        actions.push('<button type="button" class="js-grade">Оценить</button>');
      }
      if (a.status === 'На проверке' || a.status === 'Проверено') {
        actions.push('<button type="button" class="js-return">Вернуть</button>');
      }
      actions.push('<button type="button" class="js-delete">Удалить</button>');
    }
    if (isOwnerStudent && a.status === 'В работе') {
      actions.push('<button type="button" class="js-submit">Отправить на проверку</button>');
    }

    li.innerHTML = `
      <strong>${a.title}</strong> — дисциплина: ${a.discipline}, группа: ${group?.name || ''}<br>
      Статус: <strong>${a.status}</strong>, дедлайн: <strong>${a.deadline
        .toISOString()
        .slice(0, 10)}</strong>, макс. баллы: ${a.maxPoints}<br>
      Студент: ${student?.name || 'Не указан'}, бонусы: ${a.bonus}<br>
      Комментарий: ${a.comment || 'нет'}
      <div class="actions">${actions.join(' ') || 'Действия недоступны'}</div>
    `;
    list.appendChild(li);
  });

  if (showMoreBtn) {
    const hasMore = visibleAssignments.length > assignmentsVisibleCount;
    showMoreBtn.style.display = hasMore ? 'inline-block' : 'none';
  }

  renderRoleVisibility();
}

function filterAssignmentsByRole(a) {
  if (!currentUser) return false;
  if (currentUser.role === 'admin') return true;
  if (currentUser.role === 'student') return a.studentId === currentUser.id;
  if (currentUser.role === 'teacher') {
    const group = findGroup(a.groupId);
    return group?.teacherId === currentUser.id;
  }
  return false;
}

function renderProfile() {
  syncGroupsWithUsers();
  const nameEl = document.getElementById('profile-name');
  const roleEl = document.getElementById('profile-role');
  const emailEl = document.getElementById('profile-email');
  const discEl = document.getElementById('profile-discipline');
  const levelEl = document.getElementById('profile-level');
  const bonusEl = document.getElementById('profile-bonus');
  const discountEl = document.getElementById('profile-discount');
  const teacherList = document.getElementById('teacher-groups');

  if (!currentUser) {
    [nameEl, roleEl, emailEl].forEach((el) => el && (el.textContent = 'Гость'));
    return;
  }
  const user = users.find((u) => u.id === currentUser.id) || currentUser;
  if (nameEl) nameEl.textContent = user.name;
  if (roleEl) roleEl.textContent = roleText(user.role);
  if (emailEl) emailEl.textContent = user.email || 'email не указан';

  const studentBlock = document.getElementById('student-progress');
  const teacherBlock = document.getElementById('teacher-progress');
  const adminBlock = document.getElementById('admin-progress');
  [studentBlock, teacherBlock, adminBlock].forEach((el) => el && (el.style.display = 'none'));

  if (user.role === 'student' && studentBlock) {
    studentBlock.style.display = 'block';
    const group = user.groupId ? findGroup(user.groupId) : null;
    const discipline = group ? findDisciplineByGroup(group.id) : null;
    if (discEl) discEl.textContent = discipline ? `${discipline.title} (${group?.name})` : '—';
    if (levelEl) levelEl.textContent = `${user.level || 0}/10`;
    if (bonusEl) bonusEl.textContent = user.bonus ?? 0;
    if (discountEl) {
      const discount = calculateDiscountForCurrentUser();
      discountEl.textContent = `${Math.round(discount * 100)}%`;
    }
  }

  if (user.role === 'teacher' && teacherBlock) {
    teacherBlock.style.display = 'block';
    if (teacherList) {
      teacherList.innerHTML = '';
      disciplines.forEach((d) => {
        d.groups
          .filter((g) => g.teacherId === user.id)
          .forEach((g) => {
            const li = document.createElement('li');
            const students = g.students
              .map((id) => findUserById(id)?.name || 'Неизвестно')
              .join(', ');
            li.textContent = `${d.title} — ${g.name}: ${students || 'нет студентов'}`;
            teacherList.appendChild(li);
          });
      });
    }
  }

  if (user.role === 'admin' && adminBlock) {
    adminBlock.style.display = 'block';
  }
}

function roleText(role) {
  switch (role) {
    case 'student':
      return 'Студент';
    case 'teacher':
      return 'Преподаватель';
    case 'admin':
      return 'Сотрудник';
    default:
      return role;
  }
}

function renderAdminUsers() {
  syncGroupsWithUsers();
  const list = document.getElementById('admin-users');
  if (!list) return;
  const search = document.getElementById('user-search')?.value?.toLowerCase() || '';
  const roleFilter = document.getElementById('role-filter')?.value || '';
  const sortValue = document.getElementById('user-sort')?.value || 'name';

  let data = [...users];
  if (roleFilter) {
    data = data.filter((u) => u.role === roleFilter);
  }
  if (search) {
    data = data.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        (u.email || '').toLowerCase().includes(search) ||
        (u.login || '').toLowerCase().includes(search),
    );
  }
  data.sort((a, b) => {
    if (sortValue === 'role') return a.role.localeCompare(b.role);
    return a.name.localeCompare(b.name);
  });

  list.innerHTML = '';
  data.forEach((u) => {
    const li = document.createElement('li');
    li.className = 'user-row';
    li.dataset.id = u.id;
    const group = u.groupId ? findGroup(u.groupId)?.name : '';
    const discipline = u.groupId ? findDisciplineByGroup(u.groupId)?.title : '';
    li.innerHTML = `
      ${roleText(u.role)}: <strong>${u.name}</strong> (${u.email || 'почта не указана'} ${
      group ? ', ' + group : ''
    }${discipline ? ', ' + discipline : ''}) →
      <button type="button" class="action-btn js-admin-edit">Редактировать</button>
      <button type="button" class="action-btn delete-btn js-admin-delete">Удалить</button>
    `;
    list.appendChild(li);
  });
}

function handleLoginSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const login = form.elements['login']?.value?.trim();
  const password = form.elements['password']?.value?.trim();
  const user = users.find((u) => u.login === login && u.password === password);
  if (!user) {
    alert('Неверный логин или пароль');
    return;
  }
  currentUser = { id: user.id, role: user.role, name: user.name, email: user.email };
  saveCurrentUser();
  resetAssignmentsPagination();
  renderRoleVisibility();
  renderProfile();
  renderAssignments();
  alert(`Вы вошли как ${user.name}`);
  location.hash = '#welcome';
}

function handleLogout() {
  currentUser = null;
  saveCurrentUser();
  resetAssignmentsPagination();
  renderRoleVisibility();
  renderProfile();
  renderAssignments();
  location.hash = '#login';
}

function handleEnrollSubmit(event) {
  event.preventDefault();
  if (!currentUser || currentUser.role !== 'student') {
    alert('Записываться могут только студенты');
    return;
  }
  const disciplineId = document.getElementById('selected-discipline')?.value;
  const groupId = document.getElementById('group-select')?.value;
  const group = findGroup(groupId);
  const discipline = disciplines.find((d) => d.id === disciplineId);
  if (!group || !discipline) {
    alert('Не удалось выбрать группу или дисциплину');
    return;
  }
  if (group.students.length >= 10) {
    alert('В группе нет мест');
    return;
  }
  const user = users.find((u) => u.id === currentUser.id);
  group.students.push(user.id);
  user.groupId = group.id;
  user.completedCourses += 1;
  saveUsers();
  saveDisciplines();
  syncGroupsWithUsers();
  issueAssignmentsForStudent(user, group, discipline);
  renderProfile();
  renderAssignments();
  alert(`Запись успешна. Оплачено ${document.getElementById('payment-amount')?.value} у.е.`);
  location.hash = '#profile';
}

function issueAssignmentsForStudent(student, group, discipline) {
  const templates = TASK_TEMPLATES[discipline.id] || [];
  templates.forEach((tpl, index) => {
    const id = `${student.id}-${group.id}-${Date.now()}-${index}`;
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + tpl.deadlineDays + index);
    assignments.push({
      id,
      title: tpl.title,
      description: tpl.description,
      discipline: discipline.title,
      disciplineId: discipline.id,
      groupId: group.id,
      studentId: student.id,
      status: 'В работе',
      deadline,
      maxPoints: tpl.maxPoints,
      score: null,
      bonus: student.bonus || 0,
      comment: '',
    });
  });
  saveAssignments();
}

function handleAssignmentsClick(event) {
  const btn = event.target.closest('button');
  if (!btn) return;
  const li = btn.closest('li[data-id]');
  if (!li) return;
  const id = li.dataset.id;
  const assignment = assignments.find((a) => a.id === id);
  if (!assignment) return;

  const isTeacher = currentUser && (currentUser.role === 'teacher' || currentUser.role === 'admin');
  const isResponsibleTeacher =
    isTeacher && (currentUser.role === 'admin' || findGroup(assignment.groupId)?.teacherId === currentUser.id);

  if (btn.classList.contains('js-extend')) {
    if (!isResponsibleTeacher) {
      alert('Продлевать срок может только закреплённый преподаватель или сотрудник');
      return;
    }
    assignment.deadline = new Date(assignment.deadline.getTime() + 3 * 24 * 60 * 60 * 1000);
    saveAssignments();
    renderAssignments();
    alert('Срок продлён на 3 дня');
  }

  if (btn.classList.contains('js-submit')) {
    if (!currentUser || currentUser.role !== 'student' || assignment.studentId !== currentUser.id) {
      alert('Отправить может только владелец задания');
      return;
    }
    assignment.status = 'На проверке';
    saveAssignments();
    renderAssignments();
  }

  if (!isResponsibleTeacher && (btn.classList.contains('js-grade') || btn.classList.contains('js-return') || btn.classList.contains('js-delete'))) {
    alert('Действие доступно только закреплённому преподавателю или сотруднику');
    return;
  }

  if (btn.classList.contains('js-grade')) {
    if (assignment.status !== 'На проверке') {
      alert('Оценку можно выставить только работе, находящейся на проверке');
      return;
    }
    const score = Number(prompt('Введите оценку', assignment.maxPoints));
    if (!Number.isFinite(score) || score < 0 || score > assignment.maxPoints) {
      alert('Некорректная оценка');
      return;
    }
    const comment = prompt('Комментарий', assignment.comment || '') || '';
    assignment.score = score;
    assignment.comment = comment;
    assignment.status = 'Проверено';
    saveAssignments();
    renderAssignments();
  }

  if (btn.classList.contains('js-return')) {
    if (assignment.status === 'В работе') {
      alert('Вернуть можно только работу, отправленную на проверку или уже оцененную');
      return;
    }
    const comment = prompt('Комментарий для доработки', assignment.comment || 'Требуется доработка') || 'Требуется доработка';
    assignment.status = 'В работе';
    assignment.comment = comment;
    assignment.score = null;
    saveAssignments();
    renderAssignments();
  }

  if (btn.classList.contains('js-delete')) {
    if (!confirm('Удалить задание безвозвратно?')) return;
    assignments = assignments.filter((a) => a.id !== assignment.id);
    saveAssignments();
    renderAssignments();
  }
}

function handleAddAssignmentSubmit(event) {
  event.preventDefault();
  if (!currentUser || (currentUser.role !== 'teacher' && currentUser.role !== 'admin')) {
    alert('Добавлять задания могут только преподаватели или сотрудники');
    return;
  }
  const form = event.target;
  const title = form.elements['title']?.value?.trim();
  const description = form.elements['description']?.value?.trim();
  const disciplineId = form.elements['discipline']?.value;
  const groupId = form.elements['group']?.value;
  const deadlineStr = form.elements['deadline']?.value;
  if (!title || !description || !disciplineId || !groupId || !deadlineStr) {
    alert('Заполните все поля');
    return;
  }
  const group = findGroup(groupId);
  if (!group) {
    alert('Группа не найдена');
    return;
  }
  if (currentUser.role === 'teacher' && group.teacherId !== currentUser.id) {
    alert('Нельзя создавать задания для чужой группы');
    return;
  }
  const discipline = disciplines.find((d) => d.id === disciplineId);
  const deadline = new Date(deadlineStr);
  group.students.forEach((studentId) => {
    const id = `${studentId}-${Date.now()}-${Math.random()}`;
    assignments.push({
      id,
      title,
      description,
      discipline: discipline?.title || disciplineId,
      disciplineId,
      groupId,
      studentId,
      status: 'В работе',
      deadline,
      maxPoints: 10,
      score: null,
      bonus: findUserById(studentId)?.bonus || 0,
      comment: '',
    });
  });
  saveAssignments();
  renderAssignments();
  form.reset();
  alert('Задание добавлено для всех студентов группы');
}

function handleAdminAddSubmit(event) {
  event.preventDefault();
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Создавать пользователей может только сотрудник');
    return;
  }
  const form = event.target;
  const login = form.elements['user-login']?.value?.trim();
  const password = form.elements['user-password']?.value?.trim();
  const name = form.elements['user-name']?.value?.trim();
  const email = form.elements['user-email']?.value?.trim();
  const role = form.elements['user-role']?.value;
  const disciplineId = form.elements['user-discipline']?.value;
  const groupId = form.elements['group']?.value;

  if (!login || !password || !name) {
    alert('Заполните обязательные поля');
    return;
  }
  if (users.some((u) => u.login === login)) {
    alert('Пользователь с таким логином уже существует');
    return;
  }
  const id = `${role}-${Date.now()}`;
  const newUser = { id, login, password, name, email, role, completedCourses: 0, bonus: 0, level: 0 };
  if (role === 'student') {
    newUser.groupId = groupId || '';
  }
  users.push(newUser);
  if (role === 'student' && groupId) {
    const group = findGroup(groupId);
    const discipline = findDisciplineByGroup(groupId);
    group?.students.push(newUser.id);
    if (group && discipline) {
      issueAssignmentsForStudent(newUser, group, discipline);
    }
  }
  saveUsers();
  saveDisciplines();
  syncGroupsWithUsers();
  renderAdminUsers();
  setupAdminFormOptions();
  form.reset();
  alert('Пользователь создан');
}

function handleAdminCourseSubmit(event) {
  event.preventDefault();
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Создавать дисциплины может только сотрудник');
    return;
  }
  const form = event.target;
  const title = form.elements['course-title']?.value?.trim();
  const hours = Number(form.elements['course-hours']?.value) || 0;
  const price = Number(form.elements['course-price']?.value) || 0;
  const groupName = form.elements['course-group']?.value?.trim() || 'Группа 1';
  const teacherId = form.elements['course-teacher']?.value || '';

  if (!title) {
    alert('Укажите название дисциплины');
    return;
  }

  let id = title
    .toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 20);
  if (!id) id = `course-${Date.now()}`;
  while (disciplines.some((d) => d.id === id)) {
    id = `${id}-${Math.floor(Math.random() * 10)}`;
  }

  const groupId = `${id}-g${Math.floor(Math.random() * 10000)}`;
  const newDiscipline = {
    id,
    title,
    hours: Math.max(hours, 1),
    price: Math.max(price, 0),
    groups: [
      {
        id: groupId,
        name: groupName || 'Группа 1',
        teacherId: teacherId || null,
        students: [],
      },
    ],
  };

  disciplines.push(newDiscipline);
  saveDisciplines();
  syncGroupsWithUsers();
  setupAdminFormOptions();
  setupAddAssignmentOptions();
  renderCatalog();
  renderEnrollForm(newDiscipline.id);
  form.reset();
  alert('Дисциплина добавлена');
}

function handleAdminListClick(event) {
  const btn = event.target.closest('button');
  if (!btn) return;
  if (!currentUser || currentUser.role !== 'admin') {
    alert('Доступно только сотруднику');
    return;
  }
  const li = btn.closest('li.user-row');
  if (!li) return;
  const id = li.dataset.id;
  const user = users.find((u) => u.id === id);
  if (!user) return;

  if (btn.classList.contains('js-admin-edit')) {
    const name = prompt('Имя', user.name) || user.name;
    const email = prompt('Email', user.email || '') || user.email;
    user.name = name.trim();
    user.email = email.trim();
    saveUsers();
    renderAdminUsers();
  }
  if (btn.classList.contains('js-admin-delete')) {
    if (!confirm('Удалить пользователя?')) return;
    users = users.filter((u) => u.id !== id);
    disciplines.forEach((d) =>
      d.groups.forEach((g) => {
        g.students = g.students.filter((s) => s !== id);
      }),
    );
    saveUsers();
    saveDisciplines();
    syncGroupsWithUsers();
    renderAdminUsers();
  }
}

function handleFilterSubmit(event) {
  event.preventDefault();
  const value = event.target.elements['status-filter']?.value || 'Все';
  statusFilter = value;
  resetAssignmentsPagination();
  renderAssignments();
}

function handleShowMoreAssignments() {
  assignmentsVisibleCount += 10;
  renderAssignments();
}

function guardRoute() {
  const allowed = ['#welcome', '#login', '#register', '#home', ''];
  const hash = location.hash;
  if (!currentUser && !allowed.includes(hash)) {
    alert('Авторизуйтесь, чтобы продолжить');
    location.hash = '#login';
  }
}

function setupAdminFormOptions() {
  const groupSelect = document.getElementById('group');
  const disciplineSelect = document.getElementById('user-discipline');
  const courseTeacherSelect = document.getElementById('course-teacher');
  if (groupSelect) {
    groupSelect.innerHTML = '';
    disciplines.forEach((d) => {
      d.groups.forEach((g) => {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = `${d.title} — ${g.name}`;
        groupSelect.appendChild(opt);
      });
    });
  }
  if (disciplineSelect) {
    disciplineSelect.innerHTML = '';
    const empty = document.createElement('option');
    empty.value = '';
    empty.textContent = '—';
    disciplineSelect.appendChild(empty);
    disciplines.forEach((d) => {
      const opt = document.createElement('option');
      opt.value = d.id;
      opt.textContent = d.title;
      disciplineSelect.appendChild(opt);
    });
  }
  if (courseTeacherSelect) {
    courseTeacherSelect.innerHTML = '';
    const empty = document.createElement('option');
    empty.value = '';
    empty.textContent = '—';
    courseTeacherSelect.appendChild(empty);
    users
      .filter((u) => u.role === 'teacher')
      .forEach((t) => {
        const opt = document.createElement('option');
        opt.value = t.id;
        opt.textContent = t.name;
        courseTeacherSelect.appendChild(opt);
      });
  }
}

function setupAddAssignmentOptions() {
  const disciplineSelect = document.getElementById('add-discipline');
  const groupSelect = document.getElementById('add-group');
  if (!disciplineSelect || !groupSelect) return;
  disciplineSelect.innerHTML = '';
  disciplines.forEach((d) => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.textContent = d.title;
    disciplineSelect.appendChild(opt);
  });
  const updateGroups = () => {
    groupSelect.innerHTML = '';
    const selected = disciplineSelect.value;
    const discipline = disciplines.find((d) => d.id === selected);
    if (!discipline) return;
    discipline.groups
      .filter((g) => currentUser?.role === 'admin' || g.teacherId === currentUser?.id)
      .forEach((g) => {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = g.name;
        groupSelect.appendChild(opt);
      });
  };
  disciplineSelect.onchange = updateGroups;
  updateGroups();
}

function init() {
  renderRoleVisibility();
  renderProfile();
  renderCatalog();
  renderEnrollForm();
  renderAssignments();
  renderAdminUsers();
  setupAdminFormOptions();
  setupAddAssignmentOptions();

  window.addEventListener('hashchange', guardRoute);
  guardRoute();

  const loginForm = document.querySelector('#login form');
  loginForm?.addEventListener('submit', handleLoginSubmit);
  document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
  document.getElementById('enroll-form')?.addEventListener('submit', handleEnrollSubmit);
  document.getElementById('assignments-list')?.addEventListener('click', handleAssignmentsClick);
  document.getElementById('show-more-assignments')?.addEventListener('click', handleShowMoreAssignments);
  document.querySelector('#add-assignment form')?.addEventListener('submit', handleAddAssignmentSubmit);
  document.getElementById('admin-add-form')?.addEventListener('submit', handleAdminAddSubmit);
  document.getElementById('admin-course-form')?.addEventListener('submit', handleAdminCourseSubmit);
  document.getElementById('admin-users')?.addEventListener('click', handleAdminListClick);
  document.getElementById('assignments-filters-form')?.addEventListener('submit', handleFilterSubmit);
  document.getElementById('discipline-filter')?.addEventListener('change', renderCatalog);
  document.getElementById('user-search')?.addEventListener('input', renderAdminUsers);
  document.getElementById('role-filter')?.addEventListener('change', renderAdminUsers);
  document.getElementById('user-sort')?.addEventListener('change', renderAdminUsers);

  document.getElementById('profile-edit-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!currentUser) return;
    const form = e.target;
    const firstName = form.elements['firstName']?.value?.trim();
    const lastName = form.elements['lastName']?.value?.trim();
    const email = form.elements['email']?.value?.trim();
    const user = users.find((u) => u.id === currentUser.id);
    if (!user) return;
    user.name = `${firstName} ${lastName}`.trim();
    user.email = email;
    saveUsers();
    currentUser = { ...currentUser, name: user.name, email: user.email };
    saveCurrentUser();
    renderProfile();
    renderRoleVisibility();
    alert('Профиль обновлён');
    location.hash = '#profile';
  });

  document.querySelectorAll('[data-discipline-id]')?.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.disciplineId;
      renderEnrollForm(id);
    });
  });

  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-discipline-id]');
    if (!btn) return;
    const id = btn.dataset.disciplineId;
    renderEnrollForm(id);
  });
}

window.addEventListener('DOMContentLoaded', init);
