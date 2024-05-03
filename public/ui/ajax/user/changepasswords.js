// Check if all the characters are present in string
function validatePassword(string) {
    // Initialize counter to zero
    var counter = 0;
    // On each test that is passed, increment the counter
    if (/[a-z]/.test(string)) {
        // If string contain at least one lowercase alphabet character
        counter++;
    }
    if (/[A-Z]/.test(string)) {
        counter++;
    }
    if (/[0-9]/.test(string)) {
        counter++;
    }
    if (/[!@#$&*]/.test(string)) {
        counter++;
    }
    if(string.length > 7){
        counter++;
    }
    // Check if at least three rules are satisfied
    return counter == 5;
}

var record = null;
var id;
$( "#btnAppr" ).click(function() {
    $("#btnAppr").hide();
    var fd = new FormData();
    if($("#newpassword").val() !== $("#confirmpassword").val())
    {
        swal(
            'Oops!',
            'Password Mismatch.',
            'error'
        );
        $("#btnAppr").show();
        return;
    }

    if($("#oldpassword").val() === $("#newpassword").val())
    {
        swal(
            'Oops!',
            'Same Password. Not Allowed.',
            'error'
        );
        $("#btnAppr").show();
        return;
    }
    var ps = $("#newpassword").val();
    if (ps.length >= 8 && validatePassword(ps)) {

    }else
    {
        swal(
            'Oops!',
            'Password Not Allowed. Must have at least 1 small case, 1 uppercase, 1 number, 1 special character and Length greater than 7.',
            'error'
        );
        $("#btnAppr").show();
        return;
    }

    fd.append('oldpassword', $("#oldpassword").val());
    fd.append('newpassword', $("#newpassword").val());


    swal({
        title: "Processing...",
        text: "Please wait",
        //imageUrl: "images/ajaxloader.gif",
        showConfirmButton: false,
        allowOutsideClick: false
    });

    $.ajax({
        type: "POST",
        url : "/tms/usermodify/changepassword",
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
                location.href = '/tms/dashboard/show';
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
    
});