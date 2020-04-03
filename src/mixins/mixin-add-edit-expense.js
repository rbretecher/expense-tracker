import ModalExpenseName from 'src/components/Expenses/Modals/Shared/ModalExpenseName';
import ModalExpensePrice from 'src/components/Expenses/Modals/Shared/ModalExpensePrice';
import ModalExpenseDate from 'src/components/Expenses/Modals/Shared/ModalExpenseDate';
import ModalExpensePaidBy from 'src/components/Expenses/Modals/Shared/ModalExpensePaidBy';
import ModalExpenseCategory from 'src/components/Expenses/Modals/Shared/ModalExpenseCategory';
import ModalExpenseActions from 'src/components/Expenses/Modals/Shared/ModalExpenseActions';
import ModalExpenseHeader from 'src/components/Expenses/Modals/Shared/ModalExpenseHeader';

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
  methods: {
    submitForm() {
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.saveExpense();
        }
      });
    },
  },
  components: {
    ModalExpenseName,
    ModalExpensePrice,
    ModalExpenseDate,
    ModalExpensePaidBy,
    ModalExpenseCategory,
    ModalExpenseActions,
    ModalExpenseHeader,
  },
};
