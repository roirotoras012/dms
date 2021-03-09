function myFunction() {
    var input, filter, table, tr, td, i, txtValue,txtValue1;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");

   
    
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      td1 = tr[i].getElementsByTagName("td")[1];
      td2 = tr[i].getElementsByTagName("td")[2];
      td3 = tr[i].getElementsByTagName("td")[3];
      td4 = tr[i].getElementsByTagName("td")[4];
      td5 = tr[i].getElementsByTagName("td")[5];
  
      if (td || td1 || td2 || td3 || td4 || td5) {
        txtValue = td.textContent || td.innerText;
        txtValue1 = td1.textContent || td1.innerText;
        txtValue2 = td2.textContent || td2.innerText;
        txtValue3 = td3.textContent || td3.innerText;
        txtValue4 = td4.textContent || td4.innerText;
        txtValue5 = td5.textContent || td5.innerText;
        
        
        if (txtValue.toUpperCase().indexOf(filter) > -1 ||
            txtValue1.toUpperCase().indexOf(filter) > -1 || 
            txtValue2.toUpperCase().indexOf(filter) > -1 || 
            txtValue3.toUpperCase().indexOf(filter) > -1 ||
            txtValue4.toUpperCase().indexOf(filter) > -1 ||
            txtValue5.toUpperCase().indexOf(filter) > -1 
            
            
            ) {
          tr[i].style.display = "";
        
        } else {
          tr[i].style.display = "none";
          
        }
      }
      
            
    }
    
  }

  function SubForm (){
    $.ajax({
        url: '/Person/Edit/@Model.Id/',
        type: 'post',
        data: $('#myForm').serialize(),
        success: function(){
            alert("worked");
        }
    });
}



  