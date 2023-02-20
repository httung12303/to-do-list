function populateStorage(projects) {
  localStorage.clear();
  projects.forEach((project, index) => {
    const key = `project-${index}`;
    localStorage.setItem(key, JSON.stringify(project.JSONFormat()));
  });
}

function getProjectsFromStorage(projectFactory, itemFactory) {
  const projects = [];
  const len = localStorage.length;
  for (let i = 0; i < len; i += 1) {
    const key = `project-${i}`;
    const JSONProject = JSON.parse(localStorage.getItem(key));
    JSONProject.todoList = JSONProject.todoList.map((item) => {
      const { title, description, dueDate, finished } = item;
      return itemFactory.createItem(title, description, dueDate, finished);
    });
    const { title, description, todoList } = JSONProject;
    const project = projectFactory.createProject(title, description, todoList);
    projects.push(project);
  }

  return projects;
}

export { getProjectsFromStorage, populateStorage };
