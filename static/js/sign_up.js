function func()
{
    var username_value=$("#username").val();
    var email_value=$("#email").val();
    var password_value1=$("#password1").val();
    var password_value2=$("#password2").val();
    var email_value=$("#email").val();
    $.ajax({
        url:'/sign_up',
        type:'post',
        data:{
            'username':username_value,
            'email':email_value,
            'password1':password_value1,
            'password2':password_value2,
        },
        success: function(resp)
        {
            if (resp['message']=='Success'){
                alert(resp['message']);
                window.location.href='/menu';
            }
            document.getElementById("message").innerHTML="<h1 style='color:crimson;font-size: 22px;'>"+resp['message']+"</h1>";
            console.log(resp);
        }
    });
}