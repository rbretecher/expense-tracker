<template>
  <q-page>
    <div
      class="absolute full-width full-height column"
      :class="{
        'q-pa-md': $q.platform.is.desktop,
        'q-pa-sm': !$q.platform.is.desktop,
      }"
    >
      <q-scroll-area
        class="q-scroll-area"
        :class="{'q-pr-lg': $q.platform.is.desktop}"
      >
        <big-title v-if="$q.platform.is.desktop">{{ title }}</big-title>
        <slot></slot>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import BigTitle from 'src/components/Shared/BigTitle';

export default {
  props: ['title'],
  methods: {
    ...mapActions('app', ['setCurrentPage']),
  },
  mounted() {
    this.setCurrentPage(this.title);
  },
  components: {
    BigTitle,
  },
};
</script>

<style scoped>
.q-scroll-area {
  display: flex;
  flex-grow: 1;
  height: 100%;
}
</style>
