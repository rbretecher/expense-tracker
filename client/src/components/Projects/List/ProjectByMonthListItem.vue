<template>
  <q-item clickable v-ripple @click="openProjectMonth">
    <q-item-section avatar>
      <q-icon name="calendar_today" color="primary" />
    </q-item-section>
    <q-item-section>{{ formatDate(month) }}</q-item-section>
    <q-item-section side>
      <q-item-label> {{ month.count }} expenses</q-item-label>
      <q-item-label caption> {{ month.price }}€ </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: ['projectId', 'month'],
  data() {
    return {
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    };
  },
  methods: {
    openProjectMonth() {
      this.$router.push(`/projects/${this.projectId}/${this.month.year}-${this.month.month}`).catch(() => { });
    },
    formatDate(val) {
      return this.months[parseInt(val.month, 10) - 1];
    },
  },
};
</script>
