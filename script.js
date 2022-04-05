"use strict";

let posts = null;
let todos = null;
let users = null;

let postsLimit = 5;
let postsFilterValue = "";
let activeTab = "";

const filterInput = document.getElementById("filter-input");
const list = document.getElementById("list");
const div = document.getElementById("div");

const renderLoading = () => {
  div.innerHTML = '<p class="loader">Loading...</p>';
};

const renderError = () => {
  div.innerHTML = '<p class="error">ERROR</p>';
};

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
    renderPostsList(posts);
    activeTab = "posts";
  };

  todosBtn.onclick = () => {
    todosBtn.classList.add("active");
    postsBtn.classList.remove("active");
    usersBtn.classList.remove("active");
    renderTodosList(todos);
    activeTab = "todos";
  };

  usersBtn.onclick = () => {
    usersBtn.classList.add("active");
    todosBtn.classList.remove("active");
    postsBtn.classList.remove("active");
    renderUsersList(users);
    activeTab = "users";
  };

  tabs.append(postsBtn, todosBtn, usersBtn);
};

const renderInput = () => {
  const input = document.createElement("input");
  input.oninput = (e) => {
    if (activeTab === "posts") {
      postsFilterValue = e.target.value;
      renderPostsList(posts);
    }
  };
};

const renderPostsList = (posts) => {
  posts
    .filter((post = post.title.includes(postsFilterValue)))
    .slice(0, postsLimit)
    .forEach((post) => {
      ul.innerHTML += `<li>${post.title}</li>`;
    });
};

const renderTodosList = (todos) => {};

const renderUsersList = (users) => {
  list.innerHTML = "";
  const ul = document.createElement("ul");
  ul.className = "users";

  users.forEach((user) => {
    ul.innerHTML += `
          <li class="user">
              info: ${user.name.title} ${user.name.first} ${user.name.last}
          </li>
      `;
  });
  list.append(ul);
};

const fetchs = [
  fetch("https://jsonplaceholder.typicode.com/posts"),
  fetch("https://jsonplaceholder.typicode.com/todos"),
  fetch("https://jsonplaceholder.typicode.com/users"),
];

const fetchData = () => {
  renderLoading();

  Promise.allSettled(fetchs)
    .then((res) => Promise.all(res.map(({ value }) => value.json())))
    .then(([postsData, todosData, usersData]) => {
      posts = postsData;
      todos = todosData;
      users = usersData;

      renderTabs();
      renderInput();
      renderPostList(postsData);
    })
    .catch(() => {
      renderError();
    });
};

fetchData();
