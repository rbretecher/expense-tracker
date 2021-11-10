<template>
  <q-list bordered separator>
    <project-user-list-item
      v-for="user in users"
      :key="user.id"
      :user="user"
      :projectId="projectId"
      :totalWeight="totalWeight"
    />
  </q-list>
</template>

<script>
import ProjectUserListItem from './ProjectUserListItem.vue';

export default {
  props: ['users', 'projectId'],
  components: {
    ProjectUserListItem,
  },
  computed: {
    totalWeight() {
      return this.users.reduce((weight, user) => (weight + user.weight), 0);
    },
  },
};
</script>
