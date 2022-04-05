/*
  используя https://jsonplaceholder.typicode.com/ при первой загрузке выполнить 3 запроса
  1. за постами (https://jsonplaceholder.typicode.com/posts)
  2. за тудушками (https://jsonplaceholder.typicode.com/todos)
  3. за юзерами (https://jsonplaceholder.typicode.com/users)
  реализовать на странице табы с переключанием отображения между постами, тудушками и юзерами
  отображать первые пять элементов из массива
  реализовать ленивую загрузку, по кнопке отображать +5 элементов из массива
  добавить инпут для фильтрации постов по названию
  добавить инпут для фильтрации тудушками по названию
  добавить инпут для фильтрации юзеров по имени
  добавить в карточку с постом кнопку показать комментарии 
  отправлять за комментариями к посту (https://jsonplaceholder.typicode.com/posts/{{ id }}/comments)
*/

let posts = null;
let todos = null;
let users = null;

const renderLoading = () => {};

const renderError = () => {};

const renderTabs = () => {
  const tabs = document.getElementById("tabs");
  const postsBtn = document.createElement("button");
  postsBtn.textContent = "posts";
  postsBtn.className = "active";
  const todosBtn = document.createElement("button");
  todosBtn.textContent = "todos";
  const usersBtn = document.createElement("button");
  usersBtn.textContent = "users";

  postsBtn.onclick = () => {
    postsBtn.classList.add("active");
    todosBtn.classList.remove("active");
    usersBtn.classList.remove("active");
    // renderPostsList(posts);
  };

  todosBtn.onclick = () => {
    todosBtn.classList.add("active");
    postsBtn.classList.remove("active");
    usersBtn.classList.remove("active");
    // renderTodosList(todos);
  };

  usersBtn.onclick = () => {
    usersBtn.classList.add("active");
    todosBtn.classList.remove("active");
    postsBtn.classList.remove("active");
    // renderUsersList(users);
  };

  tabs.append(postsBtn, todosBtn, usersBtn);
};

const renderInput = () => {};

const renderPostsList = (posts) => {};

const renderTodosList = (todos) => {};

const renderUsersList = (users) => {};

const fetchs = [
  fetch("https://jsonplaceholder.typicode.com/posts"),
  fetch("https://jsonplaceholder.typicode.com/todos"),
  fetch("https://jsonplaceholder.typicode.com/users"),
];

const fetchData = () => {
  // renderLoading()

  Promise.allSettled(fetchs)
    .then((res) => Promise.all(res.map(({ value }) => value.json())))
    .then(([postsData, todosData, usersData]) => {
      posts = postsData;
      todos = todosData;
      users = usersData;

      renderTabs();
      // renderInput()
      // renderPostList(postsData)
    })
    .catch(() => {
      // renderError()
    });
};

fetchData();
