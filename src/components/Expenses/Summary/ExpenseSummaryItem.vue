<template>
  <q-item>
    <q-item-section avatar>
      <q-icon
        :name="user.icon"
        :color="user.color"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ users[expenseSummary.user].name }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label>
        Paid {{ expenseSummary.paid | round }}€
      </q-item-label>
      <q-item-label caption>
        Should have paid {{ expenseSummary.shouldHavePaid | round }}€
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label>
        <q-badge :color="color">{{ toPay | abs | round }}€</q-badge>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['expenseSummary'],
  computed: {
    ...mapState('users', ['users']),
    toPay() {
      return this.expenseSummary.shouldHavePaid - this.expenseSummary.paid;
    },
    user() {
      return this.users[this.expenseSummary.user];
    },
    color() {
      return this.toPay > 0 ? 'red' : 'green';
    },
  },
  filters: {
    abs(value) {
      return Math.abs(value);
    },
    round(value) {
      return Math.round(value * 100) / 100;
    },
  },
};
</script>
