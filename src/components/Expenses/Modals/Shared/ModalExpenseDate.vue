<template>
  <q-input
    outlined
    label="Date"
    :value="formattedDate"
    :rules="[ validateDate ]"
  >
    <template v-slot:prepend>
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
            :value="formattedDate"
            @input="onDateSelected"
            mask="DD/MM/YYYY"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { date } from 'quasar';

export default {
  props: ['date'],
  computed: {
    formattedDate() {
      return date.formatDate(this.date, 'DD/MM/YYYY');
    },
  },
  methods: {
    onDateSelected(selectedDate) {
      const dateExtracted = date.extractDate(selectedDate, 'DD/MM/YYYY');
      const formattedDate = date.formatDate(dateExtracted, 'YYYY/MM/DD');

      this.$refs.qDateProxy.hide();
      this.$emit('update:date', formattedDate);
    },
    validateDate(value) {
      // DD/MM/YYYY validation
      if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
        return 'Please enter a valid date';
      }
      return true;
    },
  },
};
</script>
