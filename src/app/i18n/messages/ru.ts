import EN from './en';

const RU: typeof EN = {
  appName: 'Менеджер Проектов',
  settings: {
    title: 'Настройки',
    quick: 'Быстрые Настройки',
    pageWhenOpened: 'Страница при открытии',
  },
  kanban: {
    columns: 'Колонки',
    toDo: 'Сделать',
    inProgress: 'В процессе',
    done: 'Готово',
    addColumn: 'Добавить колонку',
  },
  avalableProjectsCount: 'Доступые Проекты {{count}}',
  projectsList: 'Список Проектов',
  project: 'Проект',
  common: {
    name: 'Имя',
    description: 'Описание',
    new: 'Новый',
    save: 'Сохранить',
    cancel: 'Отменить',
    delete: 'Удалить',
    edit: 'Редактировать',
    add: 'Добавить',
    close: 'Закрыть',
    yes: 'Да',
    no: 'Нет',
    back: 'Назад',
    next: 'Далее',
    create: 'Создать',
    update: 'Обновить',
    confirm: 'Подтвердить',
  },
  errors: {
    required: 'Это поле обязательно',
  },
};
export default RU;
