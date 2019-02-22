function ValidateEmail(mail) 
          {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form1.text1.value))
            {
                return (true)
            }
            alert("Invalid Email ID. Please enter your valid Email ID.")
            return (false)
          }
        
function auth(){
    ValidateEmail(document.form1.text1);
    var email = document.getElementById("email").value;
    console.log(email);
    var password = document.getElementById("password").value;
    if(password !="" && email!=""){
    var myOBJ = JSON.stringify({
        email,
        password
    });
        console.log(name);
   $.ajax({
        type:'POST',
        url : 'http://localhost:8000/login',
        dataType:"TEXT",
        contentType: "application/json; charset=utf-8",
        data:myOBJ,
       
        success:function(res){
            var k = JSON.parse(res);
            //alert(res);
        alert(k.message);
            localStorage.setItem('token', k.token);
            localStorage.setItem('id', k.userId);
            if(k.admin)
                {
                    window.location.href="home.html"
                }
            else
                {
                    window.location.href="user.html"
                }
            },
       statusCode: {
    401: function() {
      alert('401 status code! chek Email or password');
    },
    500: function() {
      alert('500 status code! server error');
    }
       }
//       error:function(exception) {
//       var k = JSON.parse(res);
//       alert(k.message);
//   }
    })
     }
    else
        {
        alert("Please enter all the values")
        }
}