const glass = $("#glass");
const viewing = $("#viewing");
const palettes = $("#color-palettes");
const response = $(".interaction");
const user = $(".user");
const firstColor = $("#first-color");
const secondColor = $("#second-color");

function darkmode() {
  glass.hasClass("glass-effect")
    ? glass.addClass("glass-effect-dark") &
      glass.removeClass("glass-effect") &
      $(".moon").attr("src", "styles/img/sun.svg")
    : glass.addClass("glass-effect") &
      glass.removeClass("glass-effect-dark") &
      $(".moon").attr("src", "styles/img/moon.svg");
}

function showresponse() {
  response.hasClass("fake-hide-element")
    ? response.css({ height: "20px", "margin-bottom": "4px" }) &
      $(".heart").attr("src", "styles/img/heart.svg") &
      response.removeClass("fake-hide-element")
    : response.css({ height: "0px", "margin-bottom": "0px" }) &
      response.addClass("fake-hide-element") &
      $(".heart").attr("src", "styles/img/heart-empty.svg");
}

function showuser() {
  user.hasClass("fake-hide-element")
    ? user.css({ height: "40px", "margin-bottom": "16px" }) &
      $(".user-icon").attr("src", "styles/img/user-check.svg") &
      user.removeClass("fake-hide-element")
    : user.css({ height: "0px", "margin-bottom": "0px" }) &
      user.addClass("fake-hide-element") &
      $(".user-icon").attr("src", "styles/img/user-x.svg");
}

function changeViewColor(color) {
  viewing.css("background-image", "");

  viewing.removeClass();
  viewing.addClass(color);

  palettes.removeClass();
  palettes.addClass(color);
}

function changeViewColorPerso() {
  viewing.css({
    background:
      "linear-gradient(135deg," +
      firstColor.val() +
      " 0%," +
      secondColor.val() +
      " 100%)",
  });
}
