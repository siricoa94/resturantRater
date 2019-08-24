$(document).ready(function() {

  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var resturantSelect = $("#resturant");

  $(cmsForm).on("submit", handleFormSubmit);

  var url = window.location.search;
  var reviewId;
  var resturantId;

  var updating = false;

  if (url.indexOf("?review_id=") !== -1) {
    reviewId = url.split("=")[1];
    getReviewData(reviewId, "review");
  }

  else if (url.indexOf("?resturant_id=") !== -1) {
    resturantId = url.split("=")[1];
  }

  getResturants();

  function handleFormSubmit(event) {
    event.preventDefault();
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !resturantSelect.val()) {
      return;
    }

    var newReview = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      ResturantId: resturantSelect.val()
    };

    if (updating) {
      newReview.id = reviewId;
      updateReview(newReview);
    }
    else {
      submitReview(newReview);
    }
  }

  function submitReview(review) {
    $.post("/api/reviews", review, function() {
      window.location.href = "/blog";
    });
  }

  function getReviewData(id, type) {
    var queryUrl;
    switch (type) {
    case "review":
      queryUrl = "/api/reviews/" + id;
      break;
    case "resturant":
      queryUrl = "/api/resturants/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.ResturantId || data.id);

        titleInput.val(data.title);
        bodyInput.val(data.body);
        resturantId = data.ResturantId || data.id;

        updating = true;
      }
    });
  }


  function getResturants() {
    $.get("/api/resturants", renderResturantList);
  }

  function renderResturantList(data) {
    if (!data.length) {
      window.location.href = "/resturants";
    }
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createResturantRow(data[i]));
    }
    resturantSelect.empty();
    console.log(rowsToAdd);
    console.log(resturantSelect);
    resturantSelect.append(rowsToAdd);
    resturantSelect.val(resturantId);
  }


  function createResturantRow(resturant) {
    var listOption = $("<option>");
    listOption.attr("value", resturant.id);
    listOption.text(resturant.name);
    return listOption;
  }


  function updateReview(review) {
    $.ajax({
      method: "PUT",
      url: "/api/reviews",
      data: review
    })
      .then(function() {
        window.location.href = "/blog";
      });
  }
});
