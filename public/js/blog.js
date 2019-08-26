$(document).ready(function() {

  var blogContainer = $(".blog-container");
  var reviewCategorySelect = $("#category");

  $(document).on("click", "button.delete", handleReviewDelete);
  $(document).on("click", "button.edit", handleReviewEdit);

  var reviews;

  var url = window.location.search;
  var resturantId;
  if (url.indexOf("?resturant_id=") !== -1) {
    resturantId = url.split("=")[1];
    getReviews(resturantId);
  }

  else {
    getReviews();
  }

  function getReviews(resturant) {
    resturantId =  resturant || "";
    if (resturantId) {
      resturantId = "/?resturant_id=" + resturantId;
    }
    $.get("/api/savings" + resturantId, function(data) {
      console.log("Reviews", data);
      reviews = data;
      if (!reviews || !reviews.length) {
        displayEmpty(resturant);
      }
      else {
        initializeRows();
      }
    });
  }

  function deleteReview(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/reviews/" + id
    })
      .then(function() {
        getReviews(reviewCategorySelect.val());
      });
  }

  function initializeRows() {
    blogContainer.empty();
    var reviewsToAdd = [];
    for (var i = 0; i < reviews.length; i++) {
      reviewsToAdd.push(createNewRow(reviews[i]));
    }
    blogContainer.append(reviewsToAdd);
    
  }

  function createNewRow(review) {
    var formattedDate = new Date(review.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newReviewCard = $("<div>");
    newReviewCard.addClass("card");
    var newReviewCardHeading = $("<div>");
    newReviewCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newReviewTitle = $("<h2>");
    var newReviewDate = $("<small>");
    var newReviewResturant = $("<h5>");
    newReviewResturant.text("Written by: Anonymous");
    newReviewResturant.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newReviewCardBody = $("<div>");
    newReviewCardBody.addClass("card-body");
    var newReviewBody = $("<p>");
    newReviewTitle.text(review.title + " ");
    newReviewBody.text(review.body);
    newReviewDate.text(formattedDate);
    newReviewTitle.append(newReviewDate);
    newReviewCardHeading.append(deleteBtn);
    newReviewCardHeading.append(editBtn);
    newReviewCardHeading.append(newReviewTitle);
    newReviewCardHeading.append(newReviewResturant);
    newReviewCardBody.append(newReviewBody);
    newReviewCard.append(newReviewCardHeading);
    newReviewCard.append(newReviewCardBody);
    newReviewCard.data("review", review);
    return newReviewCard;
  }

  function handleReviewDelete() {
    var currentReview = $(this)
      .parent()
      .parent()
      .data("review");
    deleteReview(currentReview.id);
  }

  function handleReviewEdit() {
    var currentReview = $(this)
      .parent()
      .parent()
      .data("review");
    window.location.href = "/cms?review_id=" + currentReview.id;
  }

  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Resturant #" + id;
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No reviews yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    blogContainer.append(messageH2);
  }

});
