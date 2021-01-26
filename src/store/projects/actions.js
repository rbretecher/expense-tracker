import { Notify, Loading } from 'quasar';
import { showErrorMessageWithTitle } from 'src/functions/show-error-message';
import { executeRequest } from 'src/client/json-rpc';

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
