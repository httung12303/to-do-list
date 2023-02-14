import _ from 'lodash';

function Project(
  title = 'Untitled',
  description = 'No description',
  list = []
) {
  const todoList = [];
  if (list.length !== 0) {
    list.forEach((item) => addItem(item));
  }

  function addItem(item) {
    todoList.push(item);
  }

  function removeItem(item) {
    _.remove(todoList, (todo) => item === todo);
  }

  function getItems() {
    return [...todoList];
  }

  function propertiesOnly() {
    const JSONList = todoList.map((item) => item.propertiesOnly());
    return { title, description, todoList: JSONList };
  }
  
  return {
    title,
    description,
    todoList,
    addItem,
    removeItem,
    getItems,
    propertiesOnly,
  };
}

export default Project;
