<template>
  <q-list
    bordered
    separator
  >
    <user-list-item
      v-for="(user, key) in users"
      :key="key"
      :id="key"
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
