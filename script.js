"use strict";

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
