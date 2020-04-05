<template>
  <q-item class="bg-grey-1">
    <q-space />
    <q-item-section avatar>
      <q-icon
        name="functions"
        color="grey"
      />
    </q-item-section>
    <q-item-section side>
      <q-item-label><strong>{{ amount | formatPrice }}</strong></q-item-label>
      <q-item-label caption>{{ countLabel }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import mixinPrice from 'src/mixins/mixin-price';

export default {
  mixins: [mixinPrice],
  props: ['count', 'amount'],
  computed: {
    countLabel() {
      return this.count > 1 ? `${this.count} expenses` : `${this.count} expense`;
    },
  },
};
</script>
