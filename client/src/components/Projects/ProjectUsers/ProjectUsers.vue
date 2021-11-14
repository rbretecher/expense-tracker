<template>
  <div>
    <big-title-with-button
      buttonLabel="Add user to project"
      buttonIcon="face"
      @click="showAddProjectUser = true"
    >
      Users
    </big-title-with-button>

    <project-user-list :users="project.users" :projectId="project.id" />

    <app-dialog v-model:showDialog="showAddProjectUser">
      <add-project-user
        @close="showAddProjectUser = false"
        :project="project"
      />
    </app-dialog>
  </div>
</template>

<script>
import AppDialog from 'src/components/Shared/Dialog/Dialog';
import BigTitleWithButton from '../../Shared/Titles/BigTitleWithButton.vue';
import ProjectUserList from '../List/ProjectUserList.vue';
import AddProjectUser from '../Modals/AddProjectUser.vue';

export default {
  props: ['project'],
  components: {
    AppDialog,
    BigTitleWithButton,
    ProjectUserList,
    AddProjectUser,
  },
  data() {
    return {
      showAddProjectUser: false,
    };
  },
};
</script>
