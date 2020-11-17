<template>
  <q-list
    bordered
    separator
  >
    <user-list-item
      v-for="user in users"
      :key="user.id"
      :user="user"
    />
  </q-list>
</template>

<script>
import UserListItem from 'src/components/Users/List/UserListItem';

export default {
  props: ['users'],
  components: {
    UserListItem,
  },
};
</script>
