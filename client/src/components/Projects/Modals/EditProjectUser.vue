<template>
  <modal title="Edit project user" @success="saveProjectUser">
    <modal-project-user-select
      :users="[user]"
      v-model:userId="formData.userId"
      :autofocus="$q.platform.is.desktop"
    />

    <modal-project-user-weight v-model:weight="formData.weight" />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditProjectUser from 'src/mixins/mixin-add-edit-project-user';

export default {
  mixins: [mixinAddEditProjectUser],
  props: ['user', 'projectId'],
  methods: {
    ...mapActions('projects', ['updateProjectUser']),
    saveProjectUser() {
      this.updateProjectUser({
        projectId: this.projectId,
        ...this.formData,
      });
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = {
      userId: this.user.id,
      weight: this.user.weight,
    };
  },
};
</script>
