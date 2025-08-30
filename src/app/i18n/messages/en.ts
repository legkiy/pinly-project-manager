import RU from './ru';

const EN: typeof RU = {
  appName: 'Project Manager',

  settings: {
    title: 'Settings',
    quick: 'Quick Setting',
    pageWhenOpened: 'Page when opened',

    themes: {
      select: 'Theme of the App',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
    },

    lang: {
      title: 'Language of the App',
    },
  },

  kanban: {
    columns: 'Columns',
    queue: 'Queue',
    inProgress: 'In Progress',
    done: 'Done',
    addColumn: 'Add Column',
    toColumn: 'To Column',
    deleteColumn: 'Delete column',
    whatToBoTasks: 'Choose what to do with the remaining tasks',
    noAvailableColumns: 'there are no available columns',
  },

  task: {
    new: 'New task',
  },

  project: {
    title: 'Project',
    avalableCount: 'Available Projects {{count}}',
    list: 'Projects List',
    deleteConfirm: 'Delete project',
    deleteWarn: 'All internal tasks will be deleted',
  },

  note: {
    title: 'Note',
    deleteConfirm: 'Delete project',
    add: 'Add a note',
  },

  common: {
    name: 'Name',
    description: 'Description',
    new: 'New',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    close: 'Close',
    yes: 'Yes',
    no: 'No',
    back: 'Back',
    next: 'Next',
    create: 'Create',
    update: 'Update',
    confirm: 'Confirm',
    deleteConfirm: 'To confirm deletion, enter',
    move: 'move',
  },
  errors: {
    required: 'This field is required',
  },
};
export default EN;
