import Project from './project';
import _ from 'lodash';

function ProjectManager() {
  const defaultProjects = [Project('All'), Project('Today'), Project('This week')];
  const optionalProjects = [];
  function addProject(project) {
    optionalProjects.push(project);
  }
  function removeProject(project) {
    _.remove(optionalProjects, (p) => p === project);
  }
  return { addProject, removeProject, defaultProjects, optionalProjects };
}

export default ProjectManager();
