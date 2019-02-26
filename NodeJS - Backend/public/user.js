
  var id = localStorage.getItem('id');
var skill =[];
var drop =[];
function updateskill(){
//    for(i =1; i<Object.keys(skill).length;i++){
//        if()
//    }
           
    var skill1= document.getElementById("skilldrop").value;
//    var skillid = arr.length + 1;
    
    console.log(typeof(skill),skill);
skill.push(skill1);
    if(skill !=""){
    var myOBJ = JSON.stringify({
        skill
    });
        console.log(myOBJ);
   $.ajax({
        type:'PUT',
        url : 'http://localhost:8000/employee/'+id,
        dataType:"TEXT",
        contentType: "application/json; charset=utf-8",
        headers: { 'authorization': localStorage.getItem('token') },
        data:myOBJ,
        success:function(res){
        alert("Entry has been updated");
        window.location.href="user.html"
    }
    })
     }
    else
        {
        alert("Please enter all the values")
        }
    }

function getProjects(){
 
    console.log(id);
    $.ajax({
        url:'http://localhost:8000/employee/'+id,
        type: 'GET',
        dataType: 'json',
         headers: { 'authorization': localStorage.getItem('token') },
        success: function(data){
            console.log(data);
            
//            skill = data.project;
            var arr=data.project;
//            console.log(l.length);
            console.log(arr);
           // CreateTableFromJSON(arr,"mytable");
            if(arr){
            for(i =1; i<Object.keys(arr).length;i++){
               // console.log(arr[i].name);
                $('#mytable').append("<tr><td>"+arr.name+"</td>"+"<td>"+arr.status +"</td></tr>");
            }
            }
            getSkills();
             allSkills();
        
        }
    
    });
}


function getSkills(){
    
    $.ajax({
        url:'http://localhost:8000/employee/'+id,
        type: 'GET',
        dataType: 'json',
         headers: { 'authorization': localStorage.getItem('token') },
        success: function(data){
            console.log(data);
            var arr=data.skill;
            skill = data.skill
            for(i=0; i<arr.length; i++){
                $('#mytable2').append("<tr><td>"+arr[i]+"</td><tr>")  
            }
            
        }
    });
}

function allSkills(){
     $.ajax({
        url:'http://localhost:8000/skills',
        type: 'GET',
        headers: { 'authorization': localStorage.getItem('token') },
        dataType: 'json',
        success: function(res){
            console.log(res);
            $.each(res, function(i,item){
                $('#skilldrop').append($('<option>',{
                    value:item.skill,
                    text :item.skill
                }));
            })
        }
    });
}
//function dropdown(){
//    var node = document.getElementById("skilldrop");
//for(i=0;i<drop.length;i++)
//{ 
//var op = new Option();
//op.value = drop[i].skill;
//op.text = drop[i].skill;
//node.options.add(op); 
//}
//    
//}

    
