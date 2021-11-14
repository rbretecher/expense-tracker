<template>
  <modal title="Add project" @success="saveProject">
    <modal-name-input
      v-model:name="formData.name"
      :autofocus="$q.platform.is.desktop"
    />
    <modal-icon-input v-model:name="formData.iconName" />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditProject from 'src/mixins/mixin-add-edit-project';

export default {
  mixins: [mixinAddEditProject],
  props: ['projectId'],
  methods: {
    ...mapActions('projects', ['addProject']),
    saveProject() {
      this.addProject(this.formData);
      this.$emit('close');
    },
  },
  mounted() {
    if (this.projectId) {
      this.formData.project = this.projectId;
    }
  },
};
</script>
