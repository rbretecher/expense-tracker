<template>
  <q-layout view="hHh lpR fFf" v-if="appReady">
    <app-header v-model:leftDrawerOpen="leftDrawerOpen" />

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <app-menu class="q-mt-sm" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppHeader from 'components/Layout/Header/Header';
import AppMenu from 'components/Layout/Menu/Menu';
import { mapGetters } from 'vuex';

export default {
  name: 'MainLayout',
  components: {
    AppHeader,
    AppMenu,
  },
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
  computed: {
    ...mapGetters('app', ['appReady']),
  },
};
</script>

<style lang="scss">
.q-toolbar {
  height: 64px;
}
</style>
