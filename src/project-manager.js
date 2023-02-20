import Project from './project';
import _ from 'lodash';
import add from 'date-fns/add';

function ProjectManager() {
  const defaultProjects = [];
  const optionalProjects = [];
  function addDefaultProject(project) {
    defaultProjects.push(project);
  }
  function addOptionalProjects(projects) {
    projects.forEach((project) => {
      addOptionalProject(project);
      project.todoList.forEach((item) => addItemToDefaultProjects(item));
    });
  }
  function addOptionalProject(project) {
    optionalProjects.push(project);
  }
  function removeProject(index) {
    const proj = getProjectByIndex(index);
    proj.todoList.forEach((item) =>
      defaultProjects.forEach((defProj) => defProj.removeItem(item.index))
    );
    _.remove(optionalProjects, (p) => p.index === index);
  }
  function getProjectByIndex(index) {
    let res = null;
    [...defaultProjects, ...optionalProjects].forEach((project) => {
      res = project.index === index ? project : res;
    });
    return res;
  }
  function isDefaultProject(project) {
    let res = false;
    defaultProjects.forEach((proj) => (res = res || (proj === project)));
    return res;
  }
  function addItemToDefaultProjects(item) {
    const [all, today, thisWeek] = defaultProjects;
    all.addItem(item);
    if (item.dueDate === 'No due date') {
      return;
    }
    const itemDate = new Date(item.dueDate);
    itemDate.setHours(0, 0, 0, 0);
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    if (itemDate.getTime() === date.getTime()) {
      today.addItem(item);
    }
    const nextWeek = add(date, { days: 7 });
    const lastWeek = add(date, { days: -7 });
    if (lastWeek < itemDate && itemDate < nextWeek) {
      thisWeek.addItem(item);
    }
  }
  function removeItem(index) {
    defaultProjects.forEach((project) => project.removeItem(index));
    optionalProjects.forEach((project) => project.removeItem(index));
  }
  return {
    addDefaultProject,
    addOptionalProject,
    removeProject,
    defaultProjects,
    optionalProjects,
    getProjectByIndex,
    isDefaultProject,
    addItemToDefaultProjects,
    removeItem,
    addOptionalProjects,
  };
}

export default ProjectManager;
