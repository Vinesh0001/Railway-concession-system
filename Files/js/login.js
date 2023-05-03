// function store(){

//     var email = document.getElementById('email');
//     var pw = document.getElementById('pw');
//     var lowerCaseLetters = /[a-z]/g;
//     var upperCaseLetters = /[A-Z]/g;
//     var numbers = /[0-9]/g;

//     if(email.value.length == 0){
//         alert('Please fill in email');

//     }else if(pw.value.length == 0){
//         alert('Please fill in password');

//     }else if(email.value.length == 0 && pw.value.length == 0){
//         alert('Please fill in email and password');

//     }else if(pw.value.length > 8){
//         alert('Max of 8');

//     }else if(!pw.value.match(numbers)){
//         alert('please add 1 number');

//     }else if(!pw.value.match(upperCaseLetters)){
//         alert('please add 1 uppercase letter');

//     }else if(!pw.value.match(lowerCaseLetters)){
//         alert('please add 1 lovercase letter');

//     }else{
//         localStorage.setItem('email', email.value);
//         localStorage.setItem('pw', pw.value);
//         alert('Your account has been created');
//     }
// }

//checking
function checkForLogin(){
    var storedEmail = "ex@mail.com";
    var storedPw = "ex@123";

    var userEmail = document.getElementById('email');
    var userPw = document.getElementById('pw');
    // var userRemember = document.getElementById("rememberMe");

    var adminUsername = ("admin");
    var adminPass = ("admin@123");

    
    if(userEmail.value==adminUsername && userPw.value==adminPass){
        alert('You are logged in.');
        window.location.href="admin.html";
        
    }
    else if((userEmail.value == storedEmail && userPw.value == storedPw)){
        alert('You are logged in.');
        window.location.href="home.html";
        // this.action = "home.html";
        
    }
         else if(!userEmail.value && !userPw.value) {
            var enter = document.getElementById("enter");
            enter.innerHTML=`
             <div style="color: red;font: bold;">Please enter email and password</div>
            `;
            // alert('Please enter a username and password');
            
        }
        else if(userEmail.value==storedEmail && !userPw.value) {
            var enter = document.getElementById("enter");
            enter.innerHTML=`
             <div style="color: red;font: bold;">Please enter password</div>
            `;
            // alert('Please enter a username and password');
            
        }
        else if(!userEmail.value && !userPw.value==storedPw) {
            var enter = document.getElementById("enter");
            enter.innerHTML=`
             <div style="color: red;font: bold;">Please enter email</div>
            `;
            // alert('Please enter a username and password');
            
        }
        
    
        else if(userEmail.value!=storedEmail && userPw.value==storedPw){
                var inc=document.getElementById("enter");
            inc.innerHTML=`
             <div style="color: red;font: bold;">Please enter correct email</div>
            `;
            
            }
        else if(userEmail.value==storedEmail && userPw.value!=storedPw){
                var inc=document.getElementById("enter");
            inc.innerHTML=`
             <div style="color: red;font: bold;">Please enter correct password</div>
            `;
            
            }
        else if(userEmail.value!=storedEmail && userPw.value==!storedPw){
                var inc=document.getElementById("enter");
            inc.innerHTML=`
             <div style="color: red;font: bold;">Please enter corrrect email and password</div>
            `;
         }
            
            
        else{
            alert("Error")
        }
        
      
    
    
    return false;
}


function logout(){
    // Replace current page with login page in browsing history
    history.replaceState({}, 'Login', 'login.html');
  
    // Redirect to login page
     window.location.href = 'login.html';
  }

//  || (userEmail.value==adminUsername && userPw.value==adminPass)