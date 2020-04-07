import Modal from 'src/components/Shared/Modals/Modal';
import ModalCollectionName from 'src/components/Collections/Modals/Shared/ModalCollectionName';

export default {
  data() {
    return {
      formData: {
        name: null,
        count: 0,
        icon: 'calendar_today',
      },
    };
  },
  components: {
    Modal,
    ModalCollectionName,
  },
};
