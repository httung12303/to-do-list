import { format } from 'date-fns';

function DisplayManager() {
  function showItemForm() {
    const form = document.querySelector('.item-form');
    form.classList.add('active');
  }

  function showProjForm() {
    const form = document.querySelector('.proj-form');
    form.classList.add('active');
  }

  function cancelItemForm() {
    const form = document.querySelector('.item-form');
    form.classList.remove('active');
  }

  function cancelProjectForm() {
    const form = document.querySelector('.proj-form');
    form.classList.remove('active');
  }

  function createProjectTab(
    project,
    delItemFunc,
    updateItemDate,
    isDefaultProject
  ) {
    const oldTab = document.querySelector('.project-tab');
    if (oldTab) {
      oldTab.parentNode.removeChild(oldTab);
    }
    const projectEle = document.createElement('div');
    projectEle.classList.add('project-tab');
    projectEle.setAttribute('data-project-index', project.index);

    const projectTitle = document.createElement('h2');
    projectEle.appendChild(projectTitle);
    projectTitle.textContent = project.title;

    const description = document.createElement('div');
    description.classList.add('proj-description');
    description.textContent = project.description;
    projectEle.appendChild(description);

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');
    projectEle.appendChild(itemContainer);

    project.todoList.forEach((item) => {
      itemContainer.appendChild(
        createItemElement(item, delItemFunc, updateItemDate)
      );
    });

    if (!isDefaultProject) {
      const addItemButton = document.createElement('button');
      addItemButton.classList.add('add-item-btn');
      addItemButton.addEventListener('click', showItemForm);
      addItemButton.textContent = '+ Add item';
      projectEle.appendChild(addItemButton);
    }

    document.body.appendChild(projectEle);

    return projectEle;
  }

  function formatDate(date) {
    if (date === 'No due date') {
      return date;
    }
    console.log(date);
    return format(new Date(date), 'dd/MM/yyyy');
  }

  function createItemElement(item, delItemFunc, updateItemDate) {
    const itemEle = document.createElement('div');
    itemEle.classList.add('item');
    itemEle.setAttribute('data-item-index', item.index);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.id = `box-${item.index}`;
    checkbox.checked = item.finished;
    checkbox.addEventListener('change', updateItemDate);

    const title = document.createElement('label');
    title.classList.add('item-title');
    title.textContent = item.title;
    title.setAttribute('for', checkbox.id);

    const dueDate = document.createElement('div');
    dueDate.classList.add('item-date');
    dueDate.textContent = formatDate(item.dueDate);

    const datePicker = document.createElement('input');
    datePicker.setAttribute('type', 'date');
    datePicker.classList.add('item-date-picker', 'hidden');
    datePicker.addEventListener('input', updateItemDate);

    dueDate.addEventListener('click', () => {
      datePicker.classList.remove('hidden');
      dueDate.classList.add('hidden');
    });
    datePicker.addEventListener('input', () => {
      dueDate.textContent = formatDate(datePicker.value);
      datePicker.classList.add('hidden');
      dueDate.classList.remove('hidden');
    });

    const delBtn = document.createElement('button');
    delBtn.classList.add('item-del-btn');
    delBtn.addEventListener('click', delItemFunc);
    delBtn.textContent = 'x';

    itemEle.appendChild(checkbox);
    itemEle.appendChild(title);
    itemEle.appendChild(dueDate);
    itemEle.appendChild(datePicker);
    itemEle.appendChild(delBtn);

    return itemEle;
  }

  function createSideBar(
    defaultProjects,
    optionalProjects,
    removeProjFunc,
    delItemFunc,
    updateItemDate
  ) {
    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');

    const defaultPros = document.createElement('div');
    sidebar.appendChild(defaultPros);
    defaultPros.classList.add('default-projects');

    defaultProjects.forEach((project) =>
      defaultPros.appendChild(
        createSidebarProjectElement(project, null, delItemFunc, updateItemDate, true)
      )
    );

    const optionalProjectsLabel = document.createElement('h3');
    optionalProjectsLabel.textContent = 'Projects';
    optionalProjectsLabel.classList.add('sb-proj-lb');
    sidebar.appendChild(optionalProjectsLabel);

    const optionalPros = document.createElement('div');
    sidebar.appendChild(optionalPros);
    optionalPros.classList.add('optional-projects');

    optionalProjects.forEach((project) =>
      optionalPros.appendChild(
        createSidebarProjectElement(
          project,
          removeProjFunc,
          delItemFunc,
          updateItemDate,
          false
        )
      )
    );

    const addProjBtn = document.createElement('button');
    addProjBtn.addEventListener('click', showProjForm);
    addProjBtn.classList.add('add-proj-btn');
    addProjBtn.textContent = '+';
    sidebar.appendChild(addProjBtn);

    return sidebar;
  }

  function createSidebarProjectElement(
    project,
    removeProjFunc,
    delItemFunc,
    updateItemDate,
    isDefaultProject
  ) {
    const projectEle = document.createElement('div');
    projectEle.classList.add('sidebar-project');
    projectEle.setAttribute('data-project-index', project.index);
    const projectTitle = document.createElement('div');
    projectTitle.classList.add('sb-proj-title');
    projectTitle.textContent = project.title;
    projectEle.appendChild(projectTitle);

    if (removeProjFunc) {
      const removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-prj-btn');
      removeBtn.addEventListener('click', removeProjFunc);
      removeBtn.textContent = 'x';
      projectEle.appendChild(removeBtn);
    }

    projectEle.addEventListener(
      'click',
      createProjectTab.bind(
        this,
        project,
        delItemFunc,
        updateItemDate,
        isDefaultProject
      )
    );

    return projectEle;
  }

  function createHeader() {
    const header = document.createElement('header');
    const title = document.createElement('div');
    title.textContent = '🕥 To-do';
    header.appendChild(title);

    return header;
  }

  function createItemForm(confirmBtnOnClick) {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.classList.add('item-form');

    const form = document.createElement('div');
    form.classList.add('form');

    const formTitle = document.createElement('div');
    formTitle.textContent = 'Add an item';
    formTitle.classList.add('form-title');
    form.appendChild(formTitle);

    const title = document.createElement('input');
    title.setAttribute('type', 'text');
    title.setAttribute('placeholder', 'Title');
    title.id = 'item-title-input';
    form.appendChild(title);

    const description = document.createElement('input');
    description.setAttribute('type', 'text');
    description.setAttribute('placeholder', 'Description');
    description.id = 'item-des-input';
    form.appendChild(description);

    const dueDate = document.createElement('input');
    dueDate.setAttribute('type', 'date');
    dueDate.id = 'item-date-input';
    form.appendChild(dueDate);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('form-btn-container');
    form.appendChild(btnContainer);

    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('form-confirm-btn');
    confirmBtn.setAttribute('type', 'button');
    confirmBtn.addEventListener('click', confirmBtnOnClick);
    confirmBtn.textContent = 'Confirm';
    btnContainer.appendChild(confirmBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('form-cancel-btn');
    cancelBtn.setAttribute('type', 'button');
    cancelBtn.addEventListener('click', cancelItemForm);
    cancelBtn.textContent = 'Cancel';
    btnContainer.appendChild(cancelBtn);

    formContainer.appendChild(form);
    document.body.appendChild(formContainer);

    return formContainer;
  }

  function addItem(item, delItemFunc, updateItemDate) {
    const itemContainer = document.querySelector('.item-container');
    const itemEle = createItemElement(item, delItemFunc, updateItemDate);
    itemContainer.appendChild(itemEle);
  }

  function removeItem(index) {
    const item = document.querySelector(`.item[data-item-index="${index}"]`);
    const itemContainer = document.querySelector('.item-container');
    itemContainer.removeChild(item);
  }

  function addProject(project, delProjFunc) {
    const optionalPros = document.querySelector('.optional-projects');
    const projEle = createSidebarProjectElement(project, delProjFunc);
    optionalPros.appendChild(projEle);
  }

  function createProjectForm(confirmBtnOnClick) {
    const formContainer = document.createElement('div');
    formContainer.classList.add('form-container');
    formContainer.classList.add('proj-form');

    const form = document.createElement('form');
    form.classList.add('form');
    formContainer.appendChild(form);

    const formTitle = document.createElement('div');
    formTitle.textContent = 'Add a project';
    formTitle.classList.add('form-title');
    form.appendChild(formTitle);

    const title = document.createElement('input');
    title.setAttribute('type', 'text');
    title.setAttribute('placeholder', 'Title');
    title.id = 'proj-title-input';
    form.appendChild(title);

    const description = document.createElement('input');
    description.setAttribute('type', 'text');
    description.setAttribute('placeholder', 'Description');
    description.id = 'proj-des-input';
    form.appendChild(description);

    const btnContainer = document.createElement('div');
    btnContainer.classList.add('form-btn-container');
    form.appendChild(btnContainer);

    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('form-confirm-btn');
    confirmBtn.setAttribute('type', 'button');
    confirmBtn.addEventListener('click', confirmBtnOnClick);
    confirmBtn.textContent = 'Confirm';
    btnContainer.appendChild(confirmBtn);

    const cancelBtn = document.createElement('button');
    cancelBtn.classList.add('form-cancel-btn');
    cancelBtn.setAttribute('type', 'button');
    cancelBtn.addEventListener('click', cancelProjectForm);
    cancelBtn.textContent = 'Cancel';
    btnContainer.appendChild(cancelBtn);

    return formContainer;
  }

  return {
    addItem,
    createProjectTab,
    createItemElement,
    createSideBar,
    createHeader,
    createItemForm,
    removeItem,
    createProjectForm,
    addProject,
  };
}

export default DisplayManager;
