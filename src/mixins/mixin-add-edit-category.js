import Modal from 'src/components/Shared/Modals/Modal';
import ModalNameInput from 'src/components/Shared/Modals/ModalNameInput';
import ModalIconInput from 'src/components/Shared/Modals/ModalIconInput';

export default {
  data() {
    return {
      formData: {
        name: null,
        icon: null,
      },
    };
  },
  components: {
    Modal,
    ModalNameInput,
    ModalIconInput,
  },
};
