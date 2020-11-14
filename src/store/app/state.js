export default function () {
  return {
    // Toolbar
    toolbar: {
      title: null,
      button: null,
    },
    // Resources needed to display the app.
    categoriesLoaded: false,
    collectionsLoaded: false,
    // Resources needed to display the expenses page.
    expensesLoaded: false,
    collectionUsersLoaded: false,
    // Resources needed to display the users page.
    usersLoaded: false,
  };
}
