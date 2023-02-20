import _ from 'lodash';

function Project(index, title, description, list) {
  const todoList = [];

  function setInitialValue() {
    index = index || 0;
    title = title || 'Untitled';
    description = description || 'No description';
    list = list || [];
    if (list.length !== 0) {
      list.forEach((item) => addItem(item));
    }
  }
  setInitialValue();

  function addItem(item) {
    let exist = false;
    todoList.forEach((td) => (exist = item === td));
    if (!exist) {
      todoList.push(item);
    }
  }

  function removeItem(index) {
    _.remove(todoList, (item) => item.index === index);
  }

  function getItem(index) {
    return _.find(todoList, (item) => item.index === index);
  }

  function JSONFormat() {
    const JSONList = this.todoList.map((item) => item.JSONFormat());
    const {title, description} = this;
    return { title, description, todoList: JSONList };
  }

  return {
    title,
    description,
    todoList,
    index,
    getItem,
    addItem,
    removeItem,
    JSONFormat,
  };
}

function ProjectFactory() {
  let index = 0;
  function createProject(title, description, list) {
    const project = Project(index, title, description, list);
    index += 1;
    return project;
  }
  return { createProject };
}

export { ProjectFactory, Project };
