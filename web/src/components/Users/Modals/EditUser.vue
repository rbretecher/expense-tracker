<template>
  <modal
    title="Edit user"
    @success="saveUser"
  >
    <modal-name-input
      :name.sync="formData.name"
      :autofocus="$q.platform.is.desktop"
    />

    <modal-email-input :email.sync="formData.email" />

    <modal-icon-color-input
      :iconName.sync="formData.iconName"
      :iconColor.sync="formData.iconColor"
    />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditUser from 'src/mixins/mixin-add-edit-user';

export default {
  mixins: [mixinAddEditUser],
  props: ['user'],
  methods: {
    ...mapActions('users', ['updateUser']),
    saveUser() {
      this.updateUser(this.formData);
      this.$emit('close');
    },
  },
  mounted() {
    this.formData = {
      ...this.user,
    };
  },
};
</script>
