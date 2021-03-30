$( document ).ready(function(){
    getData();
    createEmployee();
    deleteEmployees();
})

var idEmployee = 1;

function getData(){
    $.ajax({
        url: 'http://localhost:8080/api/tutorial/1.0/employees',
        type: 'GET',
        contentType: 'application/json',
        success: function(data){
            for(var i=0; i<data.length; i++){
                $("table").append("<tr><td><input type=checkbox></td><td>" + data[i].firstName + " " + data[i].lastName + "</td><td>" + data[i].email + "</td><td>" + data[i].phone + "</td><td><button class=btn btn-light>&#9998</button></td><td><button class=\"btn btn-danger deleteButton\" id=" + data[i].employeeId + ">&#128465</button></td></tr>");
                idEmployee++;
            }
        },
        error: function(errorThrown){
            console.log(errorThrown);
        }
    })
}

function showForm(){
    $("#formEmployee").show();
}

function createEmployee(){
    $("#submitForm").click(function(){
        var name=$("#name").val();
        var lastName=$("#lastName").val();
        var email=$("#email").val();
        var phone=$("#phone").val();
        idEmployee++;

        var postData={
            "employeeId": idEmployee,
            "firstName": name,
            "lastName": lastName,
            "email": email,
            "phone": phone
        };

        $.ajax({
            url: 'http://localhost:8080/api/tutorial/1.0/employees',
            type:'POST',
            contentType: 'application/json',
            data: JSON.stringify(postData),
            accept:"*/*",
            success: function(data){
                alert("Employee added");
            },
            error: function(errorThrown){
                console.log(errorThrown);
            }
        });
    });
}

function deleteEmployees() {
    $(document).on('click', '.deleteButton', function() { 
        var idEmployee = this.id;
        $.ajax({
            url: 'http://localhost:8080/api/tutorial/1.0/employees/' + idEmployee,
            type: 'DELETE',
            contentType: 'application/json',
            accept: "*/*",
            success: function(){
                alert("Employee deleted");
                location.reload();
            },
            error: function(errorThrown){
                alert( errorThrown );
            }
        });
    }); 
  }