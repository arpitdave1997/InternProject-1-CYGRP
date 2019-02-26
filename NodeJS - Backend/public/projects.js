 var arr=[];
var drop =[];
var user =[];
     function CreateTableFromJSON() {
        var myBooks = arr;
        // EXTRACT VALUE FOR HTML HEADER. 
        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1 && key!="_id" && key!="admin" && key!="__v") {
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
            tr.onclick = dynamicEvent;
            for (var j = 0; j < col.length; j++) {
            if(col[j]!="Designation"){
                var tabCell = tr.insertCell(-1);
                
                tabCell.innerHTML = myBooks[i][col[j]];
            }
                
                else
                    {
                        var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i]['Designation'].Name;
                        console.log(myBooks[i]['Designation'].Name);
                    }
        }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
      var divContainer = document.getElementById("showData");
      divContainer.innerHTML = "";
      divContainer.appendChild(table);
    }
    
function dropdown(){
    var node = document.getElementById("skilldrop");
for(i=0;i<drop.length;i++)
{ 
var op = new Option();
op.value = drop[i].skill;
op.text = drop[i].skill;
node.options.add(op); 
}
    
}
function recommend(){
    var node = document.getElementById("empdrop");
    $("#empdrop").empty();
    var skill=[];
skill= $("#skilldrop").val();
    console.log(skill);
    for (i=0;i<user.length;i++)
        {   
         if(user[i].skill){
             
            if(user[i].skill.some(r=> skill.indexOf(r) >= 0))
                {   console.log(user[i].skill);
                    var op = new Option();
                    op.value = user[i]._id;
                    op.text = user[i].name +" - [ " +user[i].skill+" ]";
;                   node.options.add(op);
                }
         }
        }
    
}
function project(){
    
    var technology= $("#skilldrop").val();
    var name = document.getElementById("project-name").value;
   // console.log("bc"+skillid);
    var status = document.getElementById("status").value;
    if(technology !="" && name!="" && status!=""){
    var myOBJ = JSON.stringify({
        technology,
        name,
        status
    });
        console.log(name);
   $.ajax({
        type:'POST',
        url : 'http://localhost:8000/project',
        dataType:"TEXT",
        contentType: "application/json; charset=utf-8",
        data:myOBJ,
        headers: { 'authorization': localStorage.getItem('token') },
        success:function(res){
        alert("Entry has been created");
        window.location.href="projects.html"
    }
    })
     }
    else
        {
        alert("Please enter all the values")
        }
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
         
        const Url = 'http://localhost:8000/project';
         const Url2 = 'http://localhost:8000/skills';
         const Url3 = 'http://localhost:8000/employee';
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
//         
         $.ajax({
    headers: { 'authorization': localStorage.getItem('token') },
    url: Url2,
    dataType: 'json',
    type: 'GET',
  }).done(function(data) {
    // do something with the response, e.g. isolate the id of a linked resource   
  drop =data;
            dropdown();
  });
//        $.get(Url2, function(data, status){
//            console.log(data);
//          drop =data;
//            dropdown();
//        }); 
         $.ajax({
    headers: { 'authorization': localStorage.getItem('token') },
    url: Url3,
    dataType: 'json',
    type: 'GET',
  }).done(function(data) {
    // do something with the response, e.g. isolate the id of a linked resource   
 console.log(data);
          user =data;
  });
//          $.get(Url3, function(data, status){
//            console.log(data);
//          user =data;
//            
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
$("#skilldrop").on("select2:select select2:unselect", function (e) {

    //this returns all the selected item
    var items= $(this).val();       

    //Gets the last selected item
    var lastSelectedItem = e.params.data.id;
console.log(items,lastSelectedItem);
})
        });
         
    CreateTableFromJSON();
     });

