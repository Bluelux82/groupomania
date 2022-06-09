<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="logo">
      <img src="../assets/icon-left-font-monochrome-white.png" alt="Logo de Groupomania"/>
    </div>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <router-link class="nav-link notLogged" to="/">Accueil</router-link>
        </li>
        <li class="nav-item logged">
          <router-link class="nav-link" to="/login">Connexion</router-link>
        </li>
        <li class="nav-item logged">
          <router-link class="nav-link" to="/signup">Inscription</router-link>
        </li>
        <li class="nav-item">
          <button type="button" id="btn" class="notLogged">Déconnexion</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
    let token = localStorage.getItem('token')
    let notLogLink = document.getElementsByClassName('notLogged');
    let logLink = document.getElementsByClassName('logged')
    let navbar = document.getElementById('navbarSupportedContent')
    // If user is logged delete useless button
    if (token) {
      console.log('Utilisateur déjà identifié..!')
      logLink[0].style.display = 'none';
      logLink[1].style.display = 'none';
      navbar.style.width = '300px'
    // If user isn't logged delete useless button
    } else {
      console.log('Utilisateur pas identifié..! ')
      notLogLink[0].style.display = 'none';
      notLogLink[1].style.display = 'none';
      navbar.style.width = '300px'
    }
    // On click clear the localstorage and back to login page
    let disconnect = document.getElementById('btn')
    disconnect.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.clear();
      location.replace(location.origin + '/login')
    })
  }
}
</script>

<style scoped lang="scss">
// Header
nav {
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: center;
  padding-bottom: 3px;
  background-color: #FD2D01;

  // Logo
  .logo {
    height: 100%;
    width: 350px;
    text-align: end;
    margin-right: 100px;

    img {
      height: 100%;
      object-fit: cover;
      width: 350px;
    }
  }

  #navbarSupportedContent {
    width: 450px;
  }

  ul {
    display: flex;
    justify-content: space-evenly;

    li {
      list-style-type: none;

      a {
        text-decoration: none;
        align-self: center;
      }
    }
  }

  #btn {
    height: 30px;
    width: 100px;
    border-radius: 5px;
    border-color: #2c3e50;
    transition: 0.7s;
  }

  #btn:hover {
    cursor: pointer;
    background-color: #FFD7D7;
  }
}

@media only screen and (min-width: 320px) and (max-width: 761px) {
  nav {
    flex-direction: column;
    height: 100px;
    justify-content: center;

    .logo {
      margin-top: 10px;
      height: 70%;
      width: 350px;
      margin-right: 0px;

      img {
        height: 100%;
        object-fit: cover;
        width: 350px;
      }
    }
      ul {
    display: flex;
    justify-content: space-between;
    margin-top: 0px;
  }
  }
}
</style>