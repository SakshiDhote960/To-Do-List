$(document).ready(function () {
  let recordDisplay = $("#records");
  let todosList = [];

  let todos = localStorage.getItem("todos");
  if (todos !== null) {
    todosList = JSON.parse(todos);
    DisplayInfo();
  }

  $("#modal-save").click(function () {
    let title = $("#Modal-title").val();
    let msg = $("#message-text").val();
    let date = $("#Date").val();
    
    if (title !== "" && msg !== "" && date !== "") {
      let user = {
        title: title,
        message: msg,
        date: date,
        status: "Pending",
      };
      todosList.push(user);
      SaveInfo(todosList);
      DisplayInfo();
      alert("Data Saved");
      $("#Modal-title, #message-text, #Date").val("");
    } 
    else {
      alert("Fill complete information");
    }
  });

  $("#EditBtn").click(function () {
    let index = $(this).data("val");
    let title = $("#edit-title").val();
    let message = $("#edit-text").val();
    let status = $("#edit-status").val();

    todosList[index].title = title;
    todosList[index].message = message;
    todosList[index].status = status;

    SaveInfo(todosList);
    DisplayInfo();
    alert("Data Updated");
    $("#editModel").modal("hide");
  });

  function SaveInfo(todosList) {
    localStorage.setItem("todos", JSON.stringify(todosList));
  }

  function DisplayInfo() {
    let statement = "";
    $.each(todosList, function (i, user) {
      statement += `<tr>
                <td scope="col">${i + 1}</td>
                <td scope="col">${user.title}</td>
                <td scope="col">${user.message}</td>
                <td scope="col">${user.date}</td>
                <td scope="col"><span class="badge rounded-pill bg-success d-inline">${
                  user.status
                }</span></td>
                <td scope="col">
                <button type="button" class="btn btn-warning edit-btn" data-val="${i}">
                Edit</button></td>
                <td scope="col"><button type="button" class="btn btn-danger delete-btn" data-val="${i}">Delete</button></td>
            </tr>`;
    });
    recordDisplay.html(statement);
  }

  $(document).on("click", ".edit-btn", function () {
    let index = $(this).data("val");
    let todo = todosList[index];
    $("#EditBtn").data("val", index);
    $("#edit-title").val(todo.title);
    $("#edit-text").val(todo.message);
    $("#edit-status").val(todo.status);
    $("#editModel").modal("show");
  });

  $(document).on("click", ".delete-btn", function () {
    let index = $(this).data("val");
    todosList.splice(index, 1);
    SaveInfo(todosList);
    DisplayInfo();
    alert("Deleting");
  });
});
