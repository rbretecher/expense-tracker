import Modal from 'src/components/Shared/Modals/Modal.vue';
import ModalNameInput from 'src/components/Shared/Modals/ModalNameInput.vue';
import ModalIconInput from 'src/components/Shared/Modals/ModalIconInput.vue';

export default {
  data() {
    return {
      formData: {
        name: null,
        iconName: 'calendar_today',
        iconColor: 'primary',
      },
    };
  },
  components: {
    Modal,
    ModalNameInput,
    ModalIconInput,
  },
};
