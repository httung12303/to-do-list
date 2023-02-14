function DisplayManager() {
  function createProjectTab(project) {
    const projectEle = document.createElement('div');
    projectEle.classList.add('project');

    const projectTitle = document.createElement('h2');
    projectEle.appendChild(projectTitle);
    projectTitle.textContent = project.title;

    project.todoList.forEach((item) => {
      projectEle.appendChild(createItemElement(item));
    });

    return projectEle;
  }

  function createItemElement(item) {
    const itemEle = document.createElement('div');
    itemEle.classList.add('item');

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    const title = document.createElement('label');
    title.classList.add('item-title');
    title.textContent = item.title;

    const description = document.createElement('div');

    itemEle.appendChild(checkbox);
    itemEle.appendChild(title);
    itemEle.appendChild(description);

    return itemEle;
  }

  function createSideBar(defaultProjects, optionalProjects) {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

    defaultProjects.forEach(project => sidebar.appendChild(createSidebarProjectElement(project)));

    const optionalProjectsLabel = document.createElement('h3');
    optionalProjectsLabel.textContent = 'Projects';
    sidebar.appendChild(optionalProjectsLabel);

    optionalProjects.forEach(project => sidebar.appendChild(createSidebarProjectElement(project)));

    return sidebar;
  }  

  function createSidebarProjectElement(project) {
    const projectEle = document.createElement('div');
    projectEle.classList.add('sidebar-project');
    projectEle.textContent = project.title;

    return projectEle;
  }

  function createHeader() {
    const header = document.createElement('header');
    const title = document.createElement('div');
    title.textContent = 'To-do';
    header.appendChild(title);

    return header;
  }

  return { createProjectTab, createItemElement, createSideBar, createHeader };
}

export default DisplayManager();
