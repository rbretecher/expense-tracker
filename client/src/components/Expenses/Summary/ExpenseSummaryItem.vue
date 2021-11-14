<template>
  <q-item>
    <q-item-section avatar>
      <q-icon
        :name="expenseSummary.user.iconName"
        :color="expenseSummary.user.iconColor"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ expenseSummary.user.name }}</q-item-label>
    </q-item-section>

    <q-item-section>
      <q-item-label> Paid {{ formatPrice(expenseSummary.paid) }} </q-item-label>
      <q-item-label caption>
        Should have paid {{ formatPrice(expenseSummary.shouldHavePaid) }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-item-label>
        <q-badge :color="color">{{ formatPrice(abs(toPay)) }}</q-badge>
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import mixinPrice from 'src/mixins/mixin-price';

export default {
  mixins: [mixinPrice],
  props: ['expenseSummary'],
  computed: {
    toPay() {
      return this.expenseSummary.shouldHavePaid - this.expenseSummary.paid;
    },
    color() {
      return this.toPay > 0 ? 'red' : 'green';
    },
  },
};
</script>
