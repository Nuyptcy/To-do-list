<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- CSS Link -->
    <link rel=stylesheet type="text/css" href="./main.css">
    <!--Font Awsome CSS-->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="https://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.4/themes/cupertino/jquery-ui.css">
    <title>To-do-list</title>
</head>

<body>
<div class="container">
  <div class="header">
    <div class="clear">
      <i class="fa fa-refresh"></i>
    </div>
    <div id="date"></div>
  </div>
  <div class="content">
    <ul id="list">
    </ul>
    <div class="add-item">
      <i id="send" class="fa fa-plus-circle"></i>
      <input type="text" id="input" placeholder="add a to-do">
    </div>
  </div>
</div>

    <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
    https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.14.2/firebase-analytics.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.9.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.9.3/firebase-database.js"></script>
<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBL26Gq3VAoQaZXQHHPv2vUlvGc5Zyty1I",
    authDomain: "to-do-list-5b197.firebaseapp.com",
    databaseURL: "https://to-do-list-5b197.firebaseio.com",
    projectId: "to-do-list-5b197",
    storageBucket: "to-do-list-5b197.appspot.com",
    messagingSenderId: "992218011327",
    appId: "1:992218011327:web:45bc9309ec139db106180a",
    measurementId: "G-Y0GZKYNTDM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  //connected to firebase(?)

  var database =firebase.database().ref('todos');
  let send = document.getElementById('send');

  //Select the Elements
  const clear = document.querySelector('.clear');
  const dateElement = document.getElementById('date');
  const list =document.getElementById('list');
  const input = document.getElementById('input');

  //Classed names
  const CHECK = "fa -fa clock";
  //const CHECK = document.getElementsByClassName('text');
  const UNCHECK = "fa -fa plus";
  const LINE_THROUGH = "lineThrough";

  //Variables
  let LIST=[];
  let id = 0;

  //Show todays date
  const options ={weekday: "long", month:"short", day:"numeric"};
  const today = new Date();
  dateElement.innerHTML = today.toLocaleDateString("en-US",options);

 //add to-do function
 function addToDo (toDo,id,done,trash){
//trash false
  if(trash){return;}

  //const DONE = done ? CHECK : UNCHECK;

 
  const LINE = done ? LINE_THROUGH:"";
  const item =`<li class='item'>
                <i class='checked fa fa-circle-thin' job='complete'  id='${id}'></i>
                <p class='text ${LINE}'>${toDo}</p>
                <i class='fa fa-trash-o' job='delete' id='${id}'></i>
              </li>
              `

        
      const position = 'beforeend';
list.insertAdjacentHTML(position,item);

}

/*
document.addEventListener("click",function(e){
  console.log("todos")
  
    let toDo = input.value;
    
    if(toDo){
      
      addToDo(toDo, id, false, false);

      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false
      })
      id++;
    }
    input.value ="";
    
  
});
*/


function completeToDo(element){
  element.parentNode.querySelector(".checked").classList.toggle("checked-grn");
  element.parentNode.querySelector(".text").classList.toggle("text-ch");
}
/*
function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}
*/

//remove to do
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);
  //LIST[element.id].trash = true;
}

//
  //target the items created dynamically
  list.addEventListener("click",function(e){
    var element = e.target;
    var elementJob = element.attributes.job.value;

    if(elementJob =="complete"){
      completeToDo(element);
      
    }else if(elementJob =="delete"){
      removeToDo(element);
    }
  })
  
  //todos connect to Firebase

  var todos = firebase.database().ref('todos');
  //顯示內容
  
  send.addEventListener('click',function(e){
  
    console.log("todos")
    //可寫進資料庫，無法顯示螢幕
    
    const addItem = document.getElementsByClassName('add-item');
    const inputVal = input.value;
      if(inputVal){
        addToDo(inputVal);
        todos.push(
          //{content: addItem, text: inputVal})
          {content: addItem})
          ;
      }
      input.value = "";
      
    })

  
  //即時顯示內容
  
  todos.on('value',function(snapshot){
    //累加html
    var str = '';
    //撈回資料
    //js可讀取的物件格式
    var data  = snapshot.val();
    for(var item in data){
      str+='<li data-key="'+ item +'">'+data[item].content+'</li>';

  }
  
  //把撈到的值帶回str裡
  list.innerHTML = str;
})


//刪除 mothed1
/*
list.addEventListener('click',function(e){
  if(e.target.nodeName="LI"){
    //用dataset讀取data-key的物件
    var key = e.target.dataset.key;
    todos.child(key).remove();
  }
})
*/

function doneItems(){
  {
    for(i=0; i<=length; i++){}
  }
}
</script> 
</body>
</html>