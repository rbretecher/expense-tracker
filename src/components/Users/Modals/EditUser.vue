<template>
  <modal
    title="Edit user"
    @success="saveUser"
  >
    <modal-name-input
      :name.sync="formData.name"
      autofocus="true"
      class="q-mb-sm"
    />

    <modal-icon-input :icon.sync="formData.icon.name" />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditUser from 'src/mixins/mixin-add-edit-user';

export default {
  mixins: [mixinAddEditUser],
  props: ['id', 'user'],
  methods: {
    ...mapActions('users', ['updateUser']),
    saveUser() {
      this.updateUser({
        id: this.id,
        updates: this.formData,
      });
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = {
      ...this.user,
      icon: { ...this.user.icon },
      settings: { ...this.user.settings },
    };
  },
};
</script>
