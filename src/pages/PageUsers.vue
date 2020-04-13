<template>
  <scroll-page title="Users">
    <right-side-button
      label="Add new user"
      icon="add_circle"
      @click="showAddUser = true"
    />
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
import ScrollPage from 'src/components/Shared/ScrollPage';
import NoResourceBanner from 'src/components/Shared/Banners/NoResourceBanner';
import RightSideButton from 'src/components/Shared/Buttons/RightSideButton';
import UserList from 'src/components/Users/List/UserList';
import AddUser from 'src/components/Users/Modals/AddUser';
import AppDialog from 'src/components/Shared/Dialog/Dialog';

export default {
  data() {
    return {
      showAddUser: false,
    };
  },
  components: {
    ScrollPage,
    NoResourceBanner,
    RightSideButton,
    UserList,
    AddUser,
    AppDialog,
  },
  computed: {
    ...mapGetters('users', ['users']),
  },
};
</script>
