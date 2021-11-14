<template>
  <div>
    <scroll-page
      title="Users"
      actionName="Add new user"
      v-model:actionModel="showAddUser"
    >
      <user-list v-if="users.length" :users="users" />

      <no-resource-banner v-else>
        There is no user. Add a user and it will have access to your projects.
      </no-resource-banner>

      <app-dialog v-model:showDialog="showAddUser">
        <add-user @close="showAddUser = false" />
      </app-dialog>
    </scroll-page>
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
    ...mapState('users', ['users']),
  },
};
</script>
