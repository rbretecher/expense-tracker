import Modal from 'src/components/Shared/Modals/Modal.vue';
import ModalNameInput from 'src/components/Shared/Modals/ModalNameInput.vue';
import ModalExpensePrice from 'src/components/Expenses/Modals/Shared/ModalExpensePrice.vue';
import ModalExpenseDate from 'src/components/Expenses/Modals/Shared/ModalExpenseDate.vue';
import ModalExpensePaidBy from 'src/components/Expenses/Modals/Shared/ModalExpensePaidBy.vue';
import ModalExpenseCategory from 'src/components/Expenses/Modals/Shared/ModalExpenseCategory.vue';

export default {
  data() {
    return {
      formData: {
        name: null,
        price: null,
        date: null,
        paidByUserId: null,
        categoryId: null,
      },
    };
  },
  components: {
    Modal,
    ModalNameInput,
    ModalExpensePrice,
    ModalExpenseDate,
    ModalExpensePaidBy,
    ModalExpenseCategory,
  },
};
