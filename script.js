/**
 * Zendesk Doc Theme - Main JavaScript
 */
document.addEventListener("DOMContentLoaded", function () {
  // Instant search toggle
  var searchForms = document.querySelectorAll('[data-instant="true"]');
  searchForms.forEach(function (form) {
    var input = form.querySelector("input[type='search']");
    if (input) {
      input.addEventListener("focus", function () {
        form.classList.add("search-focused");
      });
      input.addEventListener("blur", function () {
        form.classList.remove("search-focused");
      });
    }
  });

  // Article vote handling
  var voteContainers = document.querySelectorAll("[data-article-id]");
  voteContainers.forEach(function (container) {
    var articleId = container.getAttribute("data-article-id");
    var upButton = container.querySelector(".article-vote-up");
    var downButton = container.querySelector(".article-vote-down");

    if (upButton) {
      upButton.addEventListener("click", function () {
        vote(articleId, "up");
      });
    }

    if (downButton) {
      downButton.addEventListener("click", function () {
        vote(articleId, "down");
      });
    }
  });

  function vote(articleId, direction) {
    var value = direction === "up" ? 1 : -1;
    fetch("/api/v2/help_center/articles/" + articleId + "/votes.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ vote: { value: value } }),
    })
      .then(function (response) {
        if (response.ok) {
          var container = document.querySelector(
            '[data-article-id="' + articleId + '"]'
          );
          if (container) {
            container.innerHTML =
              '<span class="article-vote-thanks">Thanks for your feedback!</span>';
          }
        }
      })
      .catch(function () {
        // Silently handle vote errors
      });
  }
});
