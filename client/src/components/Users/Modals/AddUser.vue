<template>
  <modal
    title="Add user"
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

    <modal-password-input :password.sync="formData.password" />
  </modal>
</template>

<script>
import { mapActions } from 'vuex';
import mixinAddEditUser from 'src/mixins/mixin-add-edit-user';
import ModalPasswordInput from 'src/components/Shared/Modals/ModalPasswordInput';

export default {
  mixins: [mixinAddEditUser],
  methods: {
    ...mapActions('users', ['addUser']),
    saveUser() {
      this.addUser(this.formData);
      this.$emit('close');
    },
  },
  components: {
    ModalPasswordInput,
  },
};
</script>
