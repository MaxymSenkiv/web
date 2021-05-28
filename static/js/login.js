function Login()
{
    debugger;
    var username_value=$("#username").val();
    var password_value=$("#password").val();
    $.ajax({
        url:'/login',
        type:'post',
        data:{'username':username_value,
            'password':password_value},
        success: function(resp)
        {
            if (resp['message']=='Success')
                window.location.href='/menu';
            else
                document.getElementById("login").innerHTML =
                    '<h1 style="color:crimson;">'+resp["message"]+'</h1>';
        }
    });
}