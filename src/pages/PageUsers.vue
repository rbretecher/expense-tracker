<template>
  <scroll-page
    title="Users"
    actionName="Add new user"
    :actionModel.sync="showAddUser"
  >
    <user-list
      v-if="Object.keys(users).length"
      :users="users"
    />

    <no-resource-banner v-else>
      There is no user. Add a user and it will have access to your collections.
    </no-resource-banner>

    <app-dialog :showDialog.sync="showAddUser">
      <add-user @close="showAddUser = false" />
    </app-dialog>
  </scroll-page>
</template>

<script>
import { mapGetters } from 'vuex';
import mixinPage from 'src/mixins/mixin-page';
import UserList from 'src/components/Users/List/UserList';
import AddUser from 'src/components/Users/Modals/AddUser';

export default {
  mixins: [mixinPage],
  data() {
    return {
      showAddUser: false,
    };
  },
  components: {
    UserList,
    AddUser,
  },
  computed: {
    ...mapGetters('users', ['users']),
  },
};
</script>
