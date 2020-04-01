<template>
  <q-input
    outlined
    label="Date"
    :value="date"
    mask="date"
    :rules="['date']"
  >
    <template v-slot:append>
      <q-icon
        name="event"
        class="cursor-pointer"
      >
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            :value="date"
            @input="onDateSelected"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  props: ['date'],
  methods: {
    onDateSelected($event) {
      this.$refs.qDateProxy.hide();
      this.$emit('update:date', $event);
    },
  },
};
</script>
