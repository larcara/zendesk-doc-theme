/**
 * Carbonio Partner Portal - Main JavaScript
 */
document.addEventListener("DOMContentLoaded", function () {
  // Search input focus/blur
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
              '<span class="article-vote-thanks">' +
              container.getAttribute("data-thanks-text") +
              "</span>";
          }
        }
      })
      .catch(function () {
        // Silently handle vote errors
      });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Active nav highlighting
  var currentPath = window.location.pathname;
  document.querySelectorAll(".header-nav a").forEach(function (link) {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
});
