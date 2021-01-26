export default function () {
  return {
    // Toolbar
    toolbar: {
      title: null,
      button: null,
    },
    // Resources needed to display the app.
    categoriesLoaded: false,
    projectsLoaded: false,
    // Resources needed to display the expenses page.
    expensesLoaded: false,
    projectUsersLoaded: false,
    // Resources needed to display the users page.
    usersLoaded: false,
  };
}
