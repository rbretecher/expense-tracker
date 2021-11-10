<template>
  <div>
    <big-title>Users</big-title>

    <project-user-list :users="project.users" :projectId="project.id" />
  </div>
</template>

<script>
import BigTitle from '../../Shared/Titles/BigTitle.vue';
import ProjectUserList from '../List/ProjectUserList.vue';

export default {
  props: ['project'],
  components: {
    BigTitle,
    ProjectUserList,
  },
};
</script>
