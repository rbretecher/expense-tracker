import Modal from 'src/components/Shared/Modals/Modal';
import ModalNameInput from 'src/components/Shared/Modals/ModalNameInput';
import ModalIconInput from 'src/components/Shared/Modals/ModalIconInput';

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
