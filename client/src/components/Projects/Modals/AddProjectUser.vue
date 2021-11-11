<template>
  <modal title="Add user to project" @success="addUserToProject">
    <modal-project-user-select
      :users="users"
      :projectUsers="project.users"
      :userId.sync="formData.userId"
      :autofocus="$q.platform.is.desktop"
    />

    <modal-project-user-weight :weight.sync="formData.weight" />
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
  },
};
</script>
