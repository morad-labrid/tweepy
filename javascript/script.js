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
    ? user.css({ height: "44px", "margin-bottom": "16px" }) &
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

function getTweet() {
  var tmplink = $(".search").val();
  var tweet_id = /[^/]*$/.exec(tmplink)[0];
  var link =
    "https://api.twitter.com/2/tweets/" +
    tweet_id +
    "?media.fields=url,preview_image_url&tweet.fields=public_metrics,created_at&expansions=author_id,attachments.media_keys&user.fields=profile_image_url";

  var settings = {
    url: "/api/twitter.php",
    method: "POST",
    data: { tweet_link: link },
  };

  $.ajax(settings).done(function (response) {
    console.log(JSON.parse(response));
    var tweet = JSON.parse(response).data,
      replies = kFormatter(
        JSON.parse(response).data.public_metrics.reply_count
      ),
      shares = kFormatter(
        JSON.parse(response).data.public_metrics.retweet_count +
          JSON.parse(response).data.public_metrics.quote_count
      ),
      likes = kFormatter(JSON.parse(response).data.public_metrics.like_count),
      user = JSON.parse(response).includes.users[0];

    if (JSON.parse(response).includes.media) {
      var media = JSON.parse(response).includes.media[0];
      if (media.type === "photo") {
        media = JSON.parse(response).includes.media[0].url;
      }
      if (media.type === "video") {
        media = JSON.parse(response).includes.media[0].preview_image_url;
      }
      $(".tweet-img").css({
        "background-image": "url(" + media.replace("_normal", "") + ")",
        height: "360px",
      });

      $("#viewing").css({
        width: "600px",
      });
    }
    $(".tweet").val(tweet.text.replace(/(?:https?|ftp):\/\/[\n\S]+/g, ""));
    $(".date").text(
      new Date(tweet.created_at).toLocaleTimeString(navigator.language, {
        timeStyle: "short",
      }) +
        " - " +
        new Date(tweet.created_at).toLocaleDateString(navigator.language, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
    );
    $(".user-name").text(user.name);
    $(".user-image").css(
      "background-image",
      "url(" + user.profile_image_url.replace("_normal", "") + ")"
    );
    $(".replies").text(replies);
    $(".shares").text(shares);
    $(".likes").text(likes);

    changeTextareaSize($("textarea")[0]);
  });
}

function kFormatter(num) {
  var devide = 1;
  var fixed = 0;
  var lastDevide = 1;
  var letter = "";

  if (num >= 1000000000) {
    devide = 1000000000;
    lastDevide = 10;
    fixed = 1;
    letter = "Md";
  }
  if (num >= 999999) {
    devide = 100000;
    lastDevide = 10;
    fixed = 1;
    letter = "M";
  }
  if (num >= 999) {
    devide = 100;
    lastDevide = 10;
    fixed = 1;
    letter = "K";
  }

  num = num / devide;
  num = Math.floor(num);
  num = num / lastDevide;
  return parseFloat(num).toFixed(fixed) + letter;
}

$(document).ready(function () {
  changeTextareaSize($("textarea")[0]);
});

function changeTextareaSize(element) {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";
}

$("textarea").on("input", function () {
  changeTextareaSize($("textarea")[0]);
});

addEventListener("paste", (event) => {
  setTimeout(function () {
    getTweet();
  }, 1000);
});
