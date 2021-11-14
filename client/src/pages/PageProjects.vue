<template>
  <scroll-page
    title="Projects"
    actionName="Add new project"
    v-model:actionModel="showAddProject"
  >
    <project-list v-if="projects.length" :projects="projects" />

    <no-resource-banner v-else>
      There is no project yet. Add a new project and it will show up here.
    </no-resource-banner>

    <app-dialog v-model:showDialog="showAddProject">
      <add-project @close="showAddProject = false" :projectId="projectId" />
    </app-dialog>
  </scroll-page>
</template>

<script>
import { mapState } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import ProjectList from 'src/components/Projects/List/ProjectList';
import AddProject from 'src/components/Projects/Modals/AddProject';

export default {
  mixins: [mixinPage],
  props: ['projectId'],
  data() {
    return {
      showAddProject: false,
    };
  },
  components: {
    ProjectList,
    AddProject,
  },
  computed: {
    ...mapState('projects', ['projects']),
  },
};
</script>
