export default function () {
  return {
    // User
    isSignedIn: false,
    // Toolbar
    currentPage: null,
    toolbarAction: null,
    // Resources for the app.
    usersLoaded: false,
    categoriesLoaded: false,
    // Resources for the expense page.
    collectionLoaded: false,
    expensesLoaded: false,
  };
}
