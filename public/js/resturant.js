$(document).ready(function() {

  var nameInput = $("#resturant-name");
  var resturantList = $("tbody");
  var resturantContainer = $(".resturant-container");

  $(document).on("submit", "#resturant-form", handleResturantFormSubmit);
  $(document).on("click", ".delete-resturant", handleDeleteButtonPress);


  getResturants();


  function handleResturantFormSubmit(event) {
    event.preventDefault();

    if (!nameInput.val().trim().trim()) {
      return;
    }

    upsertResturant({
      name: nameInput
        .val()
        .trim()
    });
  }


  function upsertResturant(resturantData) {
    $.post("/api/resturants", resturantData)
      .then(getResturants);
  }


  function createResturantRow(resturantData) {
    console.log(resturantData);
    var newTr = $("<tr>");
    newTr.data("resturant", resturantData);
    newTr.append("<td>" + resturantData.name + "</td>");
    newTr.append("<td># of reviews will display when we learn joins in the next activity!</td>");
    newTr.append("<td><a href='/blog?resturant_id=" + resturantData.id + "'>Go to Reviews</a></td>");
    newTr.append("<td><a href='/cms?resturant_id=" + resturantData.id + "'>Create a Review</a></td>");
    newTr.append("<td><a style='cursor:pointer;color:red' class='delete-resturant'>Delete Resturant</a></td>");
    return newTr;
  }


  function getResturants() {
    $.get("/api/resturants", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createResturantRow(data[i]));
      }
      renderResturantList(rowsToAdd);
      nameInput.val("");
    });
  }
  function renderResturantList(rows) {
    resturantList.children().not(":last").remove();
    resturantContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      resturantList.prepend(rows);
    }
    else {
      renderEmpty();
    }
  }


  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must create a Resturant before you can create a Review.");
    resturantContainer.append(alertDiv);
  }

  function handleDeleteButtonPress() {
    var listItemData = $(this).parent("td").parent("tr").data("resturant");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/resturants/" + id
    })
      .then(getResturants);
  }
});
