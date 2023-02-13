function populateStorage(projects) {
  projects.forEach((project, index) => {
    const key = `project-${index}`;
    localStorage.setItem(key, JSON.stringify(project));
  });
}

function getProjectsFromStorage(Project, TodoItem) {
  const projects = [];
  const len = localStorage.length;
  for (let i = 0; i < len; i += 1) {
    const key = `project-${i}`;
    const JSONProject = JSON.parse(localStorage.getItem(key));
    JSONProject.todoList = JSONProject.todoList.map((item) => TodoItem(item));
    const { title, description, todoList } = JSONProject;
    const project = Project(title, description, todoList);
    projects.push(project);
  }
  return projects;
}

export { getProjectsFromStorage, populateStorage };
