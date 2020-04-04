<template>
  <scroll-page>
    <big-title>Users</big-title>

    <q-list
      bordered
      separator
    >
      <q-item
        clickable
        v-ripple
        v-for="(user, key) in users"
        :key="key"
      >
        <q-item-section avatar>
          <q-icon
            :name="user.icon.name"
            :color="user.icon.color"
          />

        </q-item-section>
        <q-item-section>{{ user.name }}</q-item-section>
      </q-item>
    </q-list>

  </scroll-page>
</template>

<script>
import { mapGetters } from 'vuex';
import ScrollPage from 'src/components/Shared/ScrollPage';
import BigTitle from 'src/components/Shared/BigTitle';

export default {
  components: {
    ScrollPage,
    BigTitle,
  },
  computed: {
    ...mapGetters('users', ['users']),
  },
};
</script>
