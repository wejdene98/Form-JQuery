const validate = {
  usersURL: "",

  autocompleteFullName() {
    usersURL = "https://jsonplaceholder.typicode.com/users?&_limit=10";
    $.get(usersURL, function (data) {
      let fullnames = [];
      for (let i = 0; i < data.length; i++) {
        const user = data[i];
        fullnames.push(user.name);
      }
      $("#fullname").autocomplete({ source: fullnames });
    });
  },
  addPostsToSelect() {
    const postsURL = "https://jsonplaceholder.typicode.com/posts?&_limit=10";
    $.get(postsURL, function (data) {
      for (let i = 0; i < data.length; i++) {
        const post = data[i];
        $("#postsList").append(
          `<option value="${post.id}">${post.title}</option>`
        );
      }
    });
  },
  verifandstyle(IdInput, msg, errorid) {
    let verif = $(IdInput).val() == "";

    $(IdInput).css("border", `2px solid ${verif ? "red" : "green"} `);
    $(errorid).text(verif ? msg : "");
  },

  init: function () {
    let ids = [
      "#fullname",
      "#age",
      "#postsList",
      "#experienceYes",
      "#experienceNo",
      "#describeExperience",
      "#password",
    ];
    ids.forEach((id) => {
      $(id).blur(function () {
        validate.verifandstyle(id, "filed requierd", "#fullname-error");
      });
    });
    $("#phone").blur(function () {
      const phoneRegex = /^\d{8}$/;
      const phone = $(this).val();
      let verif = phoneRegex.test(phone);

      validate.verifandstyle("#phone", "c number is required", "#phone-error");

      $(this).css("border", `2px solid ${verif ? "green" : "red"} `);
      $("#phone-error").text(verif ? "" : "This is not a valid phone");
    });
    $("#email").blur(function () {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

      const email = $(this).val();
      validate.verifandstyle("#email", "email is required", "#email-error");
      let verif = emailRegex.test(email);

      $(this).css("border", `2px solid ${verif ? "green" : "red"} `);
      $("#email-error").text(verif ? "" : "This is not a valid email");
    });
    // Dynamic Text Area
    const experienceRadio = $("input[name='experience']");
    experienceRadio.change(function () {
      const experienceValue = $(this).val();
      if (experienceValue === "Yes") {
        $("#describeExperienceSection").show();
      } else {
        $("#describeExperience").val("");
        $("#describeExperienceSection").hide();
      }
    });
    validate.autocompleteFullName();
    validate.addPostsToSelect();
  },
};
$(document).ready(function () {
  validate.init();
});
