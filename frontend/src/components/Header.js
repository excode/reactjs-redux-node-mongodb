import React from "react";


const Header = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
 <a class="navbar-brand" href="#">
    <img src="https://upaged.com/wp-content/uploads/2021/08/logo.png" height="45" class="d-inline-block align-top" alt="" />
    
  </a>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Find <span class="sr-only">Word</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Timesheet</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Messenging
        </a>
       
      </li>
     
    </ul>
   
   
  </div>
  <div class="pull-right float-right">
     
     <img src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp" width="45" class="rounded-circle mb-3" 
   alt="Avatar" />
 
    
   </div>
</nav>
  );
};

export default Header;
