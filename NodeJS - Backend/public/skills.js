 var arr=[];
     function CreateTableFromJSON() {
        var myBooks = arr;
        // EXTRACT VALUE FOR HTML HEADER. 
        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1 && key!="_id" && key!="__v") {
                    col.push(key);
                }
            }
        }

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
//            tr.onclick = dynamicEvent;
            for (var j = 0; j < col.length; j++) {
            if(col[j]!="Designation"){
                var tabCell = tr.insertCell(-1);
                tr.setAttribute("id",myBooks[i]._id);
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
      var divContainer = document.getElementById("showData");
      divContainer.innerHTML = "";
      divContainer.appendChild(table);
    }
    
    function dynamicEvent() {
        //var getIdFromRow = this.getElementsByName('Id');
        //var table = document.getElementById('mytable');
        
    //var t = document.getElementById("mytable");
   // var d = t.getElementsByTagName("tr")[1];
    var r = this.getElementsByTagName("td")[1]; 
    console.log(r.innerHTML);
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
        url : 'http://localhost:8000/skills/'+id,
        dataType:"TEXT",
        contentType: "application/json; charset=utf-8",
//        data:myOBJ,
        success:function(res){
        alert("Entry has been deleted");
        window.location.href="skills.html"
    }
    })
} else {
  txt = "You pressed Cancel!";
}
}
function updateskill(){

    var skill= document.getElementById("skill").value;
    var skillid = arr.length + 1;
    console.log("bc"+skillid);
    if(skill !=""){
    var myOBJ = JSON.stringify({
        skillid,
        skill
    });
        console.log(myOBJ);
   $.ajax({
        type:'POST',
        url : 'http://localhost:8000/skills',
        dataType:"TEXT",
        contentType: "application/json; charset=utf-8",
        data:myOBJ,
        success:function(res){
        alert("Entry has been created");
        window.location.href="skills.html"
    }
    })
     }
    else
        {
        alert("Please enter all the values")
        }
    }
        
     $(document).ready(function(){
         
        const Url = 'http://localhost:8000/skills';
         const Url2 = 'http://localhost:62622/api/Designations';
               
        $.get(Url, function(data, status){
            console.log(data);
          arr =data;
             console.log(arr.length);
            CreateTableFromJSON();
           
        });         
         
        $.get(Url2, function(data, status){
            console.log(data);
          //arr =data;
            //CreateTableFromJSON();
        }); 
         
        
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

