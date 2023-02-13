import Project from './project';
import TodoItem from './todo-item';
import { getProjectsFromStorage, populateStorage } from './storage';

const sampleItem = TodoItem();
const sampleProject = Project('General', 'H');

sampleProject.addItem(sampleItem);

const projects = getProjectsFromStorage(Project, TodoItem);

projects.forEach((project) => console.log(project));

populateStorage([sampleProject.propertiesOnly()]);
