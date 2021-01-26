import Vue from 'vue';

export function deleteProject(state, projectId) {
  Vue.delete(state.projects, projectId);
}

export function setCurrentProject(state, value) {
  state.currentProject = value;
}

export function setProjects(state, value) {
  state.projects = value;
}
