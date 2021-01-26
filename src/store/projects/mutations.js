import Vue from 'vue';

export function initProject(state, projectId) {
  Vue.set(state.projects, projectId, null);
}

export function deleteProject(state, projectId) {
  Vue.delete(state.projects, projectId);
}

export function setProjects(state, value) {
  state.projects = value;
}
