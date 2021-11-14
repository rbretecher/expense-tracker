<template>
  <div>
    <div class="row">
      <div class="col">
        <h5 class="q-mt-md q-mb-sm text-primary">
          <slot></slot>
        </h5>
      </div>
      <div class="col-md">
        <q-btn
          unelevated
          outline
          type="submit"
          color="primary"
          :label="buttonLabel"
          :icon="buttonIcon"
          class="q-mt-sm float-right"
          @click="$emit('click', $event)"
        />
      </div>
    </div>

    <q-separator class="q-mt-sm q-mb-lg" />
  </div>
</template>

<script>
export default {
  props: ['buttonLabel', 'buttonIcon', 'buttonAction'],
  emits: ['click'],
};
</script>

<style scoped>
.row {
  height: 50px;
}
</style>
