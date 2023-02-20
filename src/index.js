import 'normalize.css';
import './style.css';
import { ProjectFactory, Project } from './project';
import DisplayManager from './display';
import ProjectManger from './project-manager';
import { ItemFactory, TodoItem } from './todo-item';
import { getProjectsFromStorage, populateStorage } from './storage';

const projectFactory = ProjectFactory();
const display = DisplayManager();
const itemFactory = ItemFactory();
const projectManager = ProjectManger();

createDefaultProjects();
projectManager.addOptionalProjects(
  getProjectsFromStorage(projectFactory, itemFactory)
);

const header = display.createHeader();
const sidebar = display.createSideBar(
  projectManager.defaultProjects,
  projectManager.optionalProjects,
  deleteSideBarProject,
  deleteItem,
  updateItemDate
);

const itemForm = display.createItemForm(confirmItemForm);
const projForm = display.createProjectForm(confirmProjectForm);

document.body.appendChild(header);
document.body.appendChild(sidebar);
document.body.appendChild(itemForm);
document.body.appendChild(projForm);
display.createProjectTab(
  projectManager.defaultProjects[0],
  deleteItem,
  updateItemDate,
  true
);

function createDefaultProjects() {
  const titles = ['All', 'Today', 'This week'];
  titles.forEach((title) =>
    projectManager.addDefaultProject(projectFactory.createProject(title))
  );
}

function getItemFromForm() {
  const title = document.getElementById('item-title-input').value;
  const description = document.getElementById('item-des-input').value;
  const dueDate =
    document.getElementById('item-date-input').value || 'No due date';
  return itemFactory.createItem(title, description, dueDate);
}

function confirmItemForm() {
  const form = document.querySelector('.item-form');
  form.classList.remove('active');
  const project = getActiveProject();
  const newItem = getItemFromForm();
  project.addItem(newItem);
  projectManager.addItemToDefaultProjects(newItem);
  display.addItem(newItem, deleteItem, updateItemDate);
  populateStorage(projectManager.optionalProjects);
}

function deleteItem(e) {
  const itemEle = e.currentTarget.parentNode;
  const index = parseInt(itemEle.getAttribute('data-item-index'));
  projectManager.removeItem(index);
  display.removeItem(index);
  populateStorage(projectManager.optionalProjects);
}

function getActiveProject() {
  const projectIndex = parseInt(
    document.querySelector('.project-tab').getAttribute('data-project-index')
  );
  const project = projectManager.getProjectByIndex(projectIndex);
  return project;
}

function getProjectFromForm() {
  const title = document.getElementById('proj-title-input').value;
  const description = document.getElementById('proj-des-input').value;

  return projectFactory.createProject(title, description);
}

function confirmProjectForm() {
  const form = document.querySelector('.proj-form');
  form.classList.remove('active');
  const project = getProjectFromForm();
  projectManager.addOptionalProject(project);
  display.addProject(project, deleteSideBarProject);
  populateStorage(projectManager.optionalProjects);
}

function deleteSideBarProject(e) {
  e.stopPropagation();
  const projectEle = e.currentTarget.parentNode;
  const projectIndex = parseInt(projectEle.getAttribute('data-project-index'));
  const activeProj = getActiveProject();
  projectManager.removeProject(projectIndex);
  if (projectIndex === activeProj.index) {
    display.createProjectTab(
      projectManager.defaultProjects[0],
      deleteItem,
      updateItemDate,
      true
    );
  } else if (projectManager.isDefaultProject(activeProj)) {
    display.createProjectTab(activeProj, deleteItem, updateItemDate, true);
  }
  const optionalPros = projectEle.parentNode;
  optionalPros.removeChild(projectEle);
  populateStorage(projectManager.optionalProjects);
}

function updateItemDate(e) {
  const target = e.currentTarget;
  const itemEle = target.parentNode;
  const checkbox = itemEle.querySelector('input[type="checkbox"]');
  const datePicker = itemEle.querySelector('input[type="date"]');
  const itemIndex = parseInt(itemEle.getAttribute('data-item-index'));
  const project = getActiveProject();
  const item = project.getItem(itemIndex);
  if (target === checkbox) {
    item.finished = !item.finished;
  }
  if (target === datePicker) {
    item.dueDate = datePicker.value;
  }
  populateStorage(projectManager.optionalProjects);
}
