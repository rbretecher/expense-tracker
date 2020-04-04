import Modal from 'src/components/Shared/Modals/Modal';
import ModalExpenseName from 'src/components/Expenses/Modals/Shared/ModalExpenseName';
import ModalExpensePrice from 'src/components/Expenses/Modals/Shared/ModalExpensePrice';
import ModalExpenseDate from 'src/components/Expenses/Modals/Shared/ModalExpenseDate';
import ModalExpensePaidBy from 'src/components/Expenses/Modals/Shared/ModalExpensePaidBy';
import ModalExpenseCategory from 'src/components/Expenses/Modals/Shared/ModalExpenseCategory';

export default {
  data() {
    return {
      formData: {
        name: null,
        price: null,
        date: null,
        paidBy: null,
        category: null,
      },
    };
  },
  components: {
    Modal,
    ModalExpenseName,
    ModalExpensePrice,
    ModalExpenseDate,
    ModalExpensePaidBy,
    ModalExpenseCategory,
  },
};
