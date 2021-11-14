<template>
  <q-layout>
    <q-page-container>
      <q-page class="bg-white window-height window-width row justify-center items-center">
        <div class="column">
          <div class="row">
            <h5 class="text-h5 text-primary q-my-md">
              <q-icon
                v-if="$q.platform.is.desktop"
                name="timeline"
                size="24px"
              />
              Expense Tracker
            </h5>
          </div>
          <div class="row">
            <q-form
              @submit="submitForm"
              ref="form"
              class="q-gutter-md"
            >
              <q-card
                square
                bordered
                class="q-pa-lg shadow-8"
              >
                <q-card-section>
                  <q-input
                    square
                    outlined
                    clearable
                    v-model="email"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please enter an email']"
                    type="email"
                    label="Email"
                  />
                  <q-input
                    square
                    outlined
                    clearable
                    v-model="password"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please enter a password']"
                    type="password"
                    label="Password"
                  />
                </q-card-section>
                <q-card-actions class="q-px-md">
                  <q-btn
                    type="submit"
                    unelevated
                    color="primary"
                    size="lg"
                    class="full-width"
                    label="Login"
                  />
                </q-card-actions>
              </q-card>
            </q-form>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    ...mapActions('app', ['login']),
    submitForm() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.login({ email: this.email, password: this.password });
        }
      });
    },
  },
};
</script>

<style>
.q-card {
  width: 360px;
}
</style>
