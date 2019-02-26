 var arr=[];
     function CreateTableFromJSON() {
        var myBooks = arr;
        // EXTRACT VALUE FOR HTML HEADER. 
        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1 && key!="_id"  && key!="skill"&& key!="project"&& key!="skills"&& key!="__v") {
                    col.push(key);
                }
            }
        }
        // col.push("");
        // CREATE DYNAMIC TABLE.
        var table = document.getElementById("mytable");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
            
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1);
            
            for (var j = 0; j < col.length; j++) {
            if(col[j]!="Designation"){
                var tabCell = tr.insertCell(-1);
                tr.setAttribute("id",myBooks[i]._id);
//                tr.onclick = dynamicEvent;
                tabCell.innerHTML = myBooks[i][col[j]];
            }
                
                else
                    {
                        var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i]['Designation'].Name;
                        console.log(myBooks[i]['Designation'].Name);
                    }
        }
        var tabCell = tr.insertCell(-1);
        var myimage = new Image(20,);
        myimage.setAttribute("src","/del.png");
        myimage.setAttribute("onclick","deleterow($(this).closest('tr').attr('id'));");
        tabCell.appendChild(myimage);
            
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
//      var divContainer = document.getElementById("showData");
//      divContainer.innerHTML = "";
//      divContainer.appendChild(table);
    }
    
    function dynamicEvent() {
        //var getIdFromRow = this.getElementsByName('Id');
        //var table = document.getElementById('mytable');
        
    //var t = document.getElementById("mytable");
   // var d = t.getElementsByTagName("tr")[1];
    var r = this.getElementsByTagName("td")[1]; 
    //console.log(r.innerHTML);
        var p = r.innerHTML;
       localStorage.setItem('Id', p);
    console.log(localStorage.getItem('Id'));
    window.location.href = "/update.html";
        
    
  }

function deleterow(id){
//     console.log($(this).closest('tr').attr('id'));
    console.log(id);
if (confirm("Do you really want to delete that entry?")) {
//    console.log($(this).closest('tr').attr('id'));
//    console.log(this.getElementsByName('id'));
    $.ajax({
        type:'DELETE',
        url : 'http://localhost:8000/employee/'+id,
        dataType:"TEXT",
        contentType: "application/json; charset=utf-8",
//        data:myOBJ,
        headers: { 'authorization': localStorage.getItem('token') },
        success:function(res){
        alert("Entry has been deleted");
        window.location.href="home.html"
    }
    })
} else {
  txt = "You pressed Cancel!";
}
}

function updateemployee(mail){
ValidateEmail(mail);
    var name= document.getElementById("new-user").value;
    var email = document.getElementById("email-id").value ;
    var password = document.getElementById("password").value;
    
    if(name !="" && email !="" && password!=""){
    var myOBJ = JSON.stringify({
        name,
        email,
        password,
        admin : false
    });
        console.log(myOBJ);
   $.ajax({
        type:'POST',
        url : 'http://localhost:8000/employee',
        dataType:"TEXT",
        contentType: "application/json; charset=utf-8",
        data:myOBJ,
        headers: { 'authorization': localStorage.getItem('token') },
        success:function(res){
        alert("Entry has been created");
        window.location.href="home.html"
    },
       statusCode: {
    409: function() {
      alert('409 status code! Email exists');
    },
    500: function() {
      alert('500 status code! server error');
    }
       }
    })
     }
    else
        {
        alert("Please enter all the values")
        }
    }
function ValidateEmail(mail) 
          {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form1.text1.value))
            {
                return (true)
            }
            alert("Invalid Email ID. Please enter your valid Email ID.")
            return (false)
          }
        
     $(document).ready(function(){
         
        const Url = 'http://localhost:8000/employee';
//         const Url2 = 'http://localhost:62622/api/Designations';
        
         $.ajax({
    headers: { 'authorization': localStorage.getItem('token') },
    url: Url,
    dataType: 'json',
    type: 'GET',
  }).done(function(data) {
    // do something with the response, e.g. isolate the id of a linked resource   
    console.log(data);
          arr =data;
            CreateTableFromJSON();
  });
//        $.get(Url, function(data, status){
//            console.log(data);
//          arr =data;
//            CreateTableFromJSON();
//        });         
         
//        $.get(Url2, function(data, status){
//            console.log(data);
//          //arr =data;
//            //CreateTableFromJSON();
//        }); 
         
        
        $('.table > tbody > tr').click(function() {
            //var $item = $(this).arr;
            console.log($(this).text(arr));
            $('#hey').empty().append(self);
           // var res = $item.split(" ");
            $('#name').empty().html(arr);
            /*$('#Email').empty().html(res[24]);
            $('#Employment_Id').empty().html(res[32]);
            $('#designation').empty().html(res[40]);
            $('#PhNumber').empty().html(res[48]);
            $('#Gender').empty().html(res[56]);
             */
            });
       
            $('.table > tbody > tr').dblclick(function(e){ 
            $('#hey').empty();
        });
         
    CreateTableFromJSON();
     });

