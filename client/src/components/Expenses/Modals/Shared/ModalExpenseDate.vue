<template>
  <q-input
    outlined
    label="Date"
    v-model="model"
    :rules="[validateDate]"
    mask="####-##-##"
  >
    <template v-slot:prepend>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy
          ref="qDateProxy"
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date mask="YYYY-MM-DD" v-model="model" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
import { date } from 'quasar';

export default {
  props: ['date'],
  emits: ['update:date'],
  computed: {
    model: {
      get() {
        return this.date;
      },
      set(val) {
        this.$emit('update:date', val);
        this.$refs.qDateProxy.hide();
      },
    },
  },
  methods: {
    validateDate(value) {
      if (!/^\d{4}-(((0)[0-9])|((1)[0-2]))-([0-2][0-9]|(3)[0-1])$/.test(value)) {
        return 'Please enter a valid date';
      }
      return true;
    },
  },
  created() {
    this.$nextTick(() => {
      if (this.date) {
        this.model = date.formatDate(Date.parse(this.date), 'YYYY-MM-DD');
      }
    });
  },
};
</script>
