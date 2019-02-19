var url = "";
$(document).ready(function(){
    $.ajax({
        type: 'GET',
        url: "",
        dataType: "JSON",
        success: function(res){
            console.log("start");
            console.log(res);
            console.log("end");
        var body = document.getElementById('list');
       showtable(res);
        function showtable(jsonObj) {

            var table = document.createElement('table');
            var tr = document.createElement('tr');
            
            var th1 = document.createElement('th');
            var th2 = document.createElement('th');
            var th3 = document.createElement('th');
            
//            th.textContent="name of table/collection row"

            th1.textContent = "Employee_CGI_Code";
            th2.textContent = "First_Name";
            th3.textContent = "Last_Name";
            
            
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            
            
            table.appendChild(tr);
            var employeeIds = [];
            for (var i = 0; i < jsonObj.length; i++) {
                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
               
                
                td1.className = "one";
                td1.textContent = jsonObj[i].Employee_CGI_Code;
                td2.textContent = jsonObj[i].First_Name;
                td3.textContent = jsonObj[i].Last_Name;
                
//                Next 3 lines so as to click on id of employee it loads to next page that is user page
                td1.setAttribute("id", td1.innerHTML);                
                console.log(td1.innerHTML);
                td1.setAttribute("onclick","click1(this.id)" );
                

                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
                }
                body.appendChild(table);
        }
        }
    
    });
    
});


    function click1(clickid){
        
        console.log("here");
        console.log(clickid);
      localStorage.setItem("key",clickid);
        url = "retrieve.html?id="+clickid;
        window.location = url;
                    
                };