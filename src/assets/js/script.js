let url = "http://localhost:3000/fields";
let data;
let formUserFields = [];

document.querySelector("#my-form").addEventListener("submit", e => {
  e.preventDefault();
  return false;
});

const handleClick = data => {
  document.querySelector(".btn-initial").addEventListener("click", () => {
    document.querySelector(".form-request").classList.remove("active");
    document.querySelector(".form-user").classList.add("active");
    document.querySelector(".request").classList.remove("tab--active");
    document.querySelector(".user").classList.add("tab--active");
  });
};

const handleFinish = data => {
  document.querySelector(".btn-finish").addEventListener("click", () => {
    if (validateFields()) {
      document.querySelector(".modal").classList.add("modal--active");
      let els = document.getElementsByTagName("input");
      for (let el of els) {
        el.value = "";
      }
      document.getElementsByTagName("textarea")[0].value = "";
    }
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

const insertAfter = (el, referenceNode) => {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
};

const validateFields = () => {
  let isValid = true;
  formUserFields.map(f => {
    let el = document.getElementsByTagName("span");
    for (let e of el) {
      if (f.attributes.required && f.value.length <= 0) {
        f.classList.add("error");
        isValid = false;
        f.nextSibling.classList.add("active");
      } else {
        f.classList.remove("error");
        f.nextSibling.classList.remove("active");
      }
    }
    return f;
  });
  return isValid;
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
    return r;
  });
};

const createUserFields = user_fields => {
  var formUser = document.getElementById("form-user__content");
  formUserFields = [];

  user_fields.map(u => {
    var inputName = document.createElement("input");
    var label = document.createElement("label");
    formUserFields.push(inputName);
    label.textContent = u.label;
    inputName.setAttribute("type", u.type);
    inputName.setAttribute("required", u.required);
    inputName.placeholder = u.placeholder;
    formUser.append(label);
    formUser.append(inputName);
    let newEl = document.createElement("span");
    let t = document.createTextNode("Campo obrigatório");
    newEl.appendChild(t);
    insertAfter(newEl, inputName);
    return u;
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
