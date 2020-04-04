<template>
  <q-input
    outlined
    label="Date"
    v-model="internalDate"
    @input="onDateUpdated"
    :rules="[ validateDate ]"
    mask="##/##/####"
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
            mask="DD/MM/YYYY"
            v-model="internalDate"
            @input="onDateSelected"
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
  data() {
    return {
      // This is used as the "date" prop cannot be muted.
      internalDate: null,
    };
  },
  methods: {
    onDateUpdated(updatedDate) {
      if (this.dateIsValid(updatedDate)) {
        this.$emit('update:date', this.convertDate(updatedDate));
      }
    },
    onDateSelected(selectedDate) {
      this.$refs.qDateProxy.hide();
      this.$emit('update:date', this.convertDate(selectedDate));
    },
    convertDate(aDate, inputMask = 'DD/MM/YYYY', outputMask = 'YYYY/MM/DD') {
      const dateExtracted = date.extractDate(aDate, inputMask);
      return date.formatDate(dateExtracted, outputMask);
    },
    validateDate(value) {
      if (!this.dateIsValid(value)) {
        return 'Please enter a valid date';
      }
      return true;
    },
    // DD/MM/YYYY validation
    dateIsValid(value) {
      return /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/.test(value);
    },
  },
  created() {
    this.$nextTick(() => {
      this.internalDate = this.convertDate(this.date, 'YYYY/MM/DD', 'DD/MM/YYYY');
    });
  },
};
</script>
