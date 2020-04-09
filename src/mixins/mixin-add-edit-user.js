import Modal from 'src/components/Shared/Modals/Modal';
import ModalNameInput from 'src/components/Shared/Modals/ModalNameInput';
import ModalIconColorInput from 'src/components/Shared/Modals/ModalIconColorInput';

export default {
  data() {
    return {
      formData: {
        name: null,
        icon: {
          name: 'face',
          color: 'blue-4',
        },
        settings: {
          weight: 0.5,
        },
      },
    };
  },
  components: {
    Modal,
    ModalNameInput,
    ModalIconColorInput,
  },
};
