<template>
  <q-page>
    <div
      class="absolute full-width full-height column"
      :class="{
        'q-pa-md': $q.platform.is.desktop,
        'q-pa-sm': !$q.platform.is.desktop,
      }"
    >
      <q-scroll-area
        class="q-scroll-area"
        :class="{'q-pr-lg': $q.platform.is.desktop}"
      >
        <div v-if="$q.platform.is.desktop">
          <right-side-button
            v-if="actionName"
            :label="actionName"
            icon="add_circle"
            @click="$emit('update:actionModel', true)"
          />

          <big-title>{{ title }}</big-title>
        </div>
        <slot></slot>
      </q-scroll-area>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex';
import BigTitle from 'src/components/Shared/BigTitle';
import RightSideButton from 'src/components/Shared/Buttons/RightSideButton';

export default {
  props: ['title', 'actionName', 'actionModel'],
  methods: {
    ...mapActions('app', ['setCurrentPage', 'setToolbarAction']),
  },
  mounted() {
    if (!this.$q.platform.is.desktop) {
      this.setCurrentPage(this.title);
      if (this.actionModel !== undefined) {
        this.setToolbarAction({
          name: this.actionName,
          action: () => {
            this.$emit('update:actionModel', true);
          },
        });
      } else {
        this.setToolbarAction(null);
      }
    }
  },
  components: {
    BigTitle,
    RightSideButton,
  },
};
</script>

<style scoped>
.q-scroll-area {
  display: flex;
  flex-grow: 1;
  height: 100%;
}
</style>
