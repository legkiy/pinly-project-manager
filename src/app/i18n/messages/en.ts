import RU from './ru';

const EN: typeof RU = {
  appName: 'Project Manager',
  settings: {
    title: 'Settings',
    quick: 'Quick Setting',
    pageWhenOpened: 'Page when opened',
  },
  kanban: {
    columns: 'Columns',
    queue: 'Queue',
    inProgress: 'In Progress',
    done: 'Done',
    addColumn: 'Add Column',
    toColumn: 'To Column',
  },
  task: {
    new: 'New task',
  },
  project: {
    title: 'Project',
    avalableCount: 'Available Projects {{count}}',
    list: 'Projects List',
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
  },
  errors: {
    required: 'This field is required',
  },
};
export default EN;
