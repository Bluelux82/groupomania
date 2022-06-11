<template>
  <div id="wrapper">
    <form id="contentBox">
      <!-- Email input -->
      <div class="loginBox">
        <label for="emailInput"> &nbsp; Adresse Email :
          <i class="fa-solid fa-envelope"></i>
          <input type="email" id="emailInput" placeholder="ex: Jean.Dupont@hotmail.com" v-model="logValue.email" />
        </label>
      </div>

      <!-- Password input -->
      <div class="loginBox">
        <label for="password"> &nbsp; Mots de passe :
          <i class="fa-solid fa-key"></i>
          <input type="password" id="password" v-model="logValue.password" />
        </label>
      </div>
      <!-- Submit button -->
      <div class="btn-container">
        <!-- On click use logMe methods-->
        <button type="button" class="btn-connect" @click.prevent="logMe">Se connecter</button>
      </div>
      <div>
        <p class="align">Pas encore membre ?
          <!-- On click switch to /signup view-->
          <router-link class="redirection" to="/signup">S'enregistrer</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: "LoginView",
  data() {
    return {
      // Contain log informations
      logValue: {
        email: null,
        password: null
      },
    };
  },
  methods: {
    logMe() {
      // get adress and password value
      let adress = document.getElementById('emailInput').value
      let password = document.getElementById('password').value
      // Regex
      const emailRegEx = (value) => {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      }
      const passwordRegEx = (value) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
      }
      // Regex check all informations
      function emailCheck() {
        if (emailRegEx(adress)) {
          return true;
        } else {
          return false;
        }
      }
      function passwordCheck() {
        if (passwordRegEx(password)) {
          return true;
        } else {
          return false;
        }
      }
      let regexTest = true;
      if (!emailCheck()) {
        regexTest = false;
      }
      if (!passwordCheck()) {
        regexTest = false
      }
      // if check = false send alert
      if (regexTest === false) {
        alert("L'un des champs lors de votre connexion comporte une erreur.")
        // else
      } else {
        // if informations isn't empty
        if (this.logValue.email !== null || this.logValue.password !== null) {
          // create data object that contains log info
          const data = {
            email: this.logValue.email,
            password: this.logValue.password
          }
          // make a post request to login 
          axios.post("http://localhost:5001/api/auth/login", data)
            // if response.ok
            .then(response => {
              console.log("Réussite !" + response)
              // set token into localstorage
              localStorage.setItem('token', response.data.token)
              // and replace location by Mainpage
              location.replace(location.origin)
            })
            .catch(err => {
              console.log(err)
              alert(err.response.data.error)
            });
        } else {
          console.log('Echec !')
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
@font-face {
  font-family: SalmaproMedium;
  src: url("../assets/SalmaproMedium-0Wooo.otf") format("opentype");
}

@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');

* {
  font-family: SalmaproMedium;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

#wrapper {
  overflow: hidden;
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #4E5166;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

form {
  padding-top: 25px;
  width: 607px;
  height: 310px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffd7d7cb;
  padding-right: 30px;

  div {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .loginBox {
    align-items: center;
    margin-top: 10px;
    height: 75px;

    label {
      position: relative;
      height: 60px;
    }

    input,
    select {
      color: white;
      border: none;
      border-radius: 2px;
      height: 60%;
      background-color: #4E5166;
      width: 100%;
      padding-left: 15px;
      font-size: 1em;
      font-family: 'Montserrat', sans-serif;
    }

    input:focus,
    select:focus {
      outline: #c0535b 3px solid;
    }

    #password {
      font-size: 20px;
    }
  }

  .redirection {
    text-decoration: none;
    color: #FD2D01;
  }
}

input::placeholder {
  color: white;
}

input,
label,
select {
  display: block;
  width: 65%;
}

.forgotpass {
  width: 190px;
}

.align {
  margin-top: 30px;
  margin-left: 17.5%;
}

.btn-container {
  display: flex;
  align-items: center;
  margin-left: 7%;
}

.btn-connect {
  color: white;
  margin-top: 20px;
  width: 40%;
  min-width: 130px;
  height: 38px;
  border: none;
  background-color: #4E5166;
  font-size: 1em;
  border-radius: 5px;
  transition: 0.5s;
}

.btn-connect:hover {
  cursor: pointer;
  border: 2px solid #050505;
  background-color: #ff4e2b;
}

@media only screen and (min-width: 320px) and (max-width: 761px) {
  #wrapper {
    height: 88%;
  }

  form {
    width: 530px;
    height: 350px;
  }
}
</style>

