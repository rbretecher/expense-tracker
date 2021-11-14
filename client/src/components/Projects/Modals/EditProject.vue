<template>
  <modal title="Edit project" @success="saveProject">
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
  props: ['project'],
  methods: {
    ...mapActions('projects', ['updateProject']),
    saveProject() {
      this.updateProject(this.formData);
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = {
      ...this.project,
    };
  },
};
</script>
