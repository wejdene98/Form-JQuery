function autocompleteFullName() {
  const usersURL = "https://jsonplaceholder.typicode.com/users?&_limit=10";
  $.get(usersURL, function (data) {
    let fullnames = [];
    for (let i = 0; i < data.length; i++) {
      const user = data[i];
      fullnames.push(user.name);
    }
    $("#fullname").autocomplete({ source: fullnames });
  });
}

function addPostsToSelect() {
  const postsURL = "https://jsonplaceholder.typicode.com/posts?&_limit=10";
  $.get(postsURL, function (data) {
    for (let i = 0; i < data.length; i++) {
      const post = data[i];
      $("#postsList").append(
        `<option value="${post.id}">${post.title}</option>`
      );
    }
  });
}

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

// Form Validation start
$("#fullname").blur(function () {
  const fullname = $(this).val();
  if (fullname === "") {
    $(this).css("border", "2px solid red");
    $("#fullname-error").text("This field is required");
  } else {
    $(this).css("border", "2px solid green");
    $("#fullname-error").text("");
  }
});

$("#age").blur(function () {
  const age = $(this).val();
  if (age === "") {
    $(this).css("border", "2px solid red");
    $("#age-error").text("This field is required");
  } else {
    $(this).css("border", "2px solid green");
    $("#age-error").text("");
  }
});

$("#phone").blur(function () {
  const phoneRegex = /^\d{8}$/;

  const phone = $(this).val();
  if (phone === "") {
    $(this).css("border", "2px solid red");
    $("#phone-error").text("This field is required");
  } else if (!phoneRegex.test(phone)) {
    $(this).css("border", "2px solid red");
    $("#phone-error").text("Phone number must be valid (8 Chiffres)");
  } else {
    $(this).css("border", "2px solid green");
    $("#phone-error").text("");
  }
});

$("#email").blur(function () {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const email = $(this).val();
  if (email === "") {
    $(this).css("border", "2px solid red");
    $("#email-error").text("This field is required");
  } else if (!emailRegex.test(email)) {
    $(this).css("border", "2px solid red");
    $("#email-error").text("This is not a valid email");
  } else {
    $(this).css("border", "2px solid green");
    $("#email-error").text("");
  }
});

$("#password").blur(function () {
  const password = $(this).val();
  if (password === "") {
    $(this).css("border", "2px solid red");
    $("#password-error").text("This field is required");
  } else if (password.length < 6) {
    $(this).css("border", "2px solid red");
    $("#password-error").text("Password must be at least 6 characters long");
  } else {
    $(this).css("border", "2px solid green");
    $("#password-error").text("");
  }
});

$("#postsList").blur(function () {
  const postsList = $(this).val();
  if (postsList === "") {
    $(this).css("border", "2px solid red");
    $("#postsList-error").text("This field is required");
  } else {
    $(this).css("border", "2px solid green");
    $("#postsList-error").text("");
  }
});
// Form Validation end

$(document).ready(function () {
  autocompleteFullName();
  addPostsToSelect();
});
