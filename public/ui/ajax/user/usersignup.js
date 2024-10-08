
$( "#btnAppr" ).click(function() {
    //event.preventDefault();
    $("#btnAppr").hide();
    var fd = new FormData();
    fd.append('fullname', $("#fname").val());
    fd.append('email', $("#email").val());
    fd.append('username', $("#username").val());
    fd.append('password', $("#password").val());
    fd.append('bankname', "NA");
    fd.append('phonenumber', $("#phonenumber").val());
    if($("#usertype").val() === "maker" || $("#usertype").val() === "checker")
        fd.append('role', "user");
    else
        fd.append('role', $("#usertype").val());
    fd.append('usertype', $("#usertype").val());
    fd.append('tmo', "NA");
    fd.append('bankcode', $("#bankcode").val());

    swal({
        title: "Processing...",
        text: "Please wait",
        //imageUrl: "images/ajaxloader.gif",
        showConfirmButton: false,
        allowOutsideClick: false
    });

    $.ajax({
        type: "POST",
        url : "/tms/usersignup/user",
        data : fd,
        processData: false,
        contentType: false,

        success : function(json) {
            swal({
                title: "Successful!",
                showConfirmButton: false,
                timer: 1000
            });
            if(json.status == 200)
            {
                location.href = '/tms/tmsusers/all';
            }else
            {
                location.reload();
            }
        },

        complete: function(){
            $("#btnAppr").show();
        },
        
        error : function(xhr,errmsg,err) {
            swal({
                title: "Error!",
                showConfirmButton: false,
                timer: 1000
            });
            var json = JSON.parse(xhr.responseText);
            swal(
                'Error!',
                json.message,
                'error'
            );
        }
    });
});

$(document).ready(function() {
    // var x = document.getElementById("details").innerText;
    // details = JSON.parse(x);
    // $("#fullname").text(details.fullname);
});