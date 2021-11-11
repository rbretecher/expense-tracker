import { Notify, Loading } from 'quasar';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';
import { executeRequest } from 'src/client/json-rpc';

export async function loadProject({ commit }, projectId) {
  try {
    const project = await executeRequest('Project.GetSummary', { id: projectId });

    commit('setCurrentProject', project);
  } catch (e) {
    showErrorMessageWithTitle('Could not load project', e.message);
  }
}

export async function loadProjectMonth({ commit }, { projectId, month }) {
  try {
    const project = await executeRequest('Project.GetMonth', { id: projectId, month });

    commit('setCurrentProjectMonth', project);
  } catch (e) {
    showErrorMessageWithTitle('Could not load project month', e.message);
  }
}

export async function loadProjects({ commit }) {
  try {
    const projects = await executeRequest('Project.All');

    commit('setProjects', projects);
  } catch (e) {
    showErrorMessageWithTitle('Could not load projects', e.message);
  }
}

export async function addProject({ dispatch }, project) {
  try {
    Loading.show();
    await executeRequest('Project.Create', project);
    await dispatch('loadProjects');
    Loading.hide();

    Notify.create('Project added!');
  } catch (e) {
    showErrorMessageWithTitle('Could not create project', e.message);
  }
}

export async function deleteProject({ dispatch }, id) {
  try {
    Loading.show();
    await executeRequest('Project.Delete', { id });
    await dispatch('loadProjects');
    Loading.hide();

    Notify.create('Project deleted!');
  } catch (e) {
    showErrorMessageWithTitle('Could not delete project', e.message);
  }
}

export async function updateProject({ dispatch }, project) {
  try {
    Loading.show();
    await executeRequest('Project.Update', project);
    await dispatch('loadProjects');
    Loading.hide();

    Notify.create('Project updated!');
  } catch (e) {
    showErrorMessageWithTitle('Could not update project', e.message);
  }
}

export const resetCurrentProject = ({ commit }) => commit('setCurrentProject', null);

export const resetCurrentProjectMonth = ({ commit }) => commit('setCurrentProjectMonth', null);

export async function addProjectUser({ dispatch }, userHasProject) {
  try {
    Loading.show();
    await executeRequest('Project.AddUser', userHasProject);
    await dispatch('loadProject', userHasProject.projectId);
    Loading.hide();

    Notify.create('User has been added to project!');
  } catch (e) {
    showErrorMessageWithTitle('Could not add user to project', e.message);
  }
}

export async function updateProjectUser({ dispatch }, userHasProject) {
  try {
    Loading.show();
    await executeRequest('Project.UpdateUser', userHasProject);
    await dispatch('loadProject', userHasProject.projectId);
    Loading.hide();

    Notify.create('User has been updated!');
  } catch (e) {
    showErrorMessageWithTitle('Could not update user', e.message);
  }
}

export async function removeProjectUser({ dispatch }, userHasProject) {
  try {
    Loading.show();
    await executeRequest('Project.RemoveUser', userHasProject);
    await dispatch('loadProject', userHasProject.projectId);
    Loading.hide();

    Notify.create('User has been removed from project!');
  } catch (e) {
    showErrorMessageWithTitle('Could not remove user from user', e.message);
  }
}
