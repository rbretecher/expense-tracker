<template>
  <q-item clickable v-ripple @click="openProjectMonth">
    <q-item-section avatar>
      <q-icon name="calendar_today" color="primary" />
    </q-item-section>
    <q-item-section>{{ month | formatDate }}</q-item-section>
    <q-item-section side>
      <q-item-label> {{ month.count }} expenses</q-item-label>
      <q-item-label caption> {{ month.price }}€ </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { date } from 'quasar';

export default {
  props: ['projectId', 'month'],
  methods: {
    openProjectMonth() {
      this.$router.push(`/projects/${this.projectId}/${this.month.year}-${this.month.month}`).catch(() => { });
    },
  },
  filters: {
    formatDate(value) {
      return date.formatDate(value.month, 'MMMM');
    },
  },
};
</script>
