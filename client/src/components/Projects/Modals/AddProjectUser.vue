<template>
  <modal title="Add user to project" @success="addUserToProject">
    <modal-project-user-select
      :users="availableUsers"
      v-model:userId="formData.userId"
      :autofocus="$q.platform.is.desktop"
    />

    <modal-project-user-weight v-model:weight="formData.weight" />
  </modal>
</template>

<script>
import mixinAddEditProjectUser from 'src/mixins/mixin-add-edit-project-user';
import { mapGetters, mapActions } from 'vuex';

export default {
  props: ['project'],
  mixins: [mixinAddEditProjectUser],
  methods: {
    ...mapActions('projects', ['addProjectUser']),
    addUserToProject() {
      this.addProjectUser({ projectId: this.project.id, ...this.formData });
      this.$emit('close');
    },
  },
  computed: {
    ...mapGetters('users', ['users']),
    availableUsers() {
      return this.users.filter(
        (user) => !this.project.users.some((projectUser) => (user.id === projectUser.id)),
      );
    },
  },
};
</script>
