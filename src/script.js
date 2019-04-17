let url = "https://api.myjson.com/bins/mla54";
let data;

document.querySelector("#my-form").addEventListener("submit", e => {
  e.preventDefault();
});

const handleClick = data => {
  document.querySelector(".btn-initial").addEventListener("click", () => {
    data._embedded.request_fields.map((d, index) => {
      var a = document.getElementsByTagName("select");
      var span = document.createElement("span");
      for (let i = 0; i < a.length; i++) {
        if (a[i].required) {
          a[i].append(span);
        }
      }
      console.log(a);
    });
    document.querySelector(".form-request").classList.remove("active");
    document.querySelector(".form-user").classList.add("active");
    document.querySelector(".request").classList.remove("tab--active");
    document.querySelector(".user").classList.add("tab--active");
  });
};

const handleFinish = data => {
  document.querySelector(".btn-finish").addEventListener("click", () => {
    document.querySelector(".modal").classList.add("modal--active");
  });
  document
    .querySelector(".modal__content-close")
    .addEventListener("click", () => {
      document.querySelector(".modal").classList.remove("modal--active");
      document.querySelector(".form-request").classList.add("active");
      document.querySelector(".form-user").classList.remove("active");
      document.querySelector(".request").classList.add("tab--active");
      document.querySelector(".user").classList.remove("tab--active");
    });
};

const createRequestFields = request_fields => {
  var formRequest = document.getElementById("form-request__content");

  request_fields.map((r, index) => {
    var label = document.createElement("label");
    if (r.type === "enumerable") {
      var selectInput = document.createElement("select");
      label.textContent = r.label;
      formRequest.appendChild(label);
      formRequest.append(selectInput);
      selectInput.className = "select-" + index;
      selectInput.setAttribute("required", r.required);
      for (var opt in r.values) {
        var myOption = document.createElement("option");
        myOption.setAttribute("value", r.values[opt]);
        myOption.append(opt);
        selectInput.append(myOption);
      }
    } else if (r.type === "big_text") {
      var textArea = document.createElement("textarea");
      label.textContent = r.label;
      textArea.placeholder = r.placeholder;
      formRequest.append(label);
      formRequest.append(textArea);
      textArea.setAttribute("required", r.required);
    }
  });
};

const createUserFields = user_fields => {
  var formUser = document.getElementById("form-user__content");

  user_fields.map((u, index) => {
    var inputName = document.createElement("input");
    var label = document.createElement("label");
    label.textContent = u.label;
    inputName.setAttribute("type", u.type);
    inputName.setAttribute("required", u.required);
    inputName.placeholder = u.placeholder;
    formUser.append(label);
    formUser.append(inputName);
  });
};
fetch(url, {
  method: "GET"
})
  .then(response => {
    if (!response.ok) {
      console.log("not ok");
    }
    return response;
  })
  .then(res => res.json())
  .then(res => {
    data = res;
    let request_fields = data._embedded.request_fields;
    let user_fields = data._embedded.user_fields;
    handleClick(data);
    handleFinish(data);
    createRequestFields(request_fields);
    createUserFields(user_fields);
  })
  .catch(err => {
    console.log(err);
  });
