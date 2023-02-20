function TodoItem(index, title, description, dueDate, finished) {
  function setInitialValue() {
    index = index || 0;
    title = title || 'Untitled';
    description = description || 'No description';
    dueDate = dueDate || 'No due date';
    finished = finished || false;
  }
  setInitialValue();
  function JSONFormat() {
    const { title, dueDate, description, finished } = this;
    return {title, dueDate, description, finished};
  }
  return { title, dueDate, description, finished, JSONFormat, index };
}

function ItemFactory() {
  let index = 0;
  function createItem(title, description, dueDate, finished) {
    const item = TodoItem(index, title, description, dueDate, finished);
    index += 1;
    return item;
  }
  return { createItem };
}

export { ItemFactory, TodoItem };
