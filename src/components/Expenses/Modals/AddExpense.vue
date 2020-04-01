<template>
  <q-card style="width: 700px; max-width: 80vw;">
    <q-form
      @submit="submitForm"
      ref="form"
    >
      <q-card-section>
        <div class="text-h6">Add expense</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          outlined
          v-model="formData.name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please enter a name']"
          clearable
          label="Name"
        />
        <q-input
          outlined
          v-model.number="formData.price"
          lazy-rules
          :rules="[ val => val || 'Please enter a valid price']"
          clearable
          type="number"
          min="0.00"
          step="0.01"
          label="Price"
        />

        <q-input
          outlined
          label="Date"
          v-model="formData.date"
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
                  v-model="formData.date"
                  @input="() => $refs.qDateProxy.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions
        class="q-pa-md"
        align="right"
      >
        <q-btn
          unelevated
          rounded
          type="submit"
          color="primary"
          label="Add expense"
        />

      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      formData: {
        name: null,
        price: null,
        date: null,
      },
    };
  },
  methods: {
    ...mapActions('expenses', ['addExpense']),
    submitForm() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.addExpense(this.formData);
          this.$emit('close');
        }
      });
    },
  },
};
</script>
