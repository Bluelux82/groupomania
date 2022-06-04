<template>
  <div id="wrapper">
    <form id="contentBox" class="registermMode">
      <!-- Email input -->
      <div class="loginBox">
        <label for="emailInput"> &nbsp; Adresse Email :
          <i class="fa-solid fa-envelope"></i>
          <input type="email" id="emailInput" placeholder="ex: Jean.Dupont@hotmail.com" v-model="signUpValue.email" />
        </label>
      </div>

      <!-- Password input -->
      <div class="loginBox">
        <label for="password"> &nbsp; Mots de passe :
          <i class="fa-solid fa-key"></i>
          <input type="password" id="password" v-model="signUpValue.password" />
        </label>
      </div>
      <!-- LastName input -->
      <div class="identityContainer">
        <div class="loginBox identity">
          <label for="lastName"> &nbsp; Nom :
            <i class="fa-solid fa-id-card"></i>
            <input type="lastName" id="lastName" placeholder="ex: Dupont" v-model="signUpValue.lastName" />
          </label>
        </div>
        <!-- firstName input -->
        <div class="loginBox identity">
          <label for="firstName"> &nbsp; Prénom :
            <i class="fa-solid fa-id-card"></i>
            <input type="firstName" id="firstName" placeholder="ex: Jean" v-model="signUpValue.firstName" />
          </label>
        </div>
      </div>
      <!-- Submit button -->
      <div class="btn-container">
        <!-- On click user registerMe methods-->
        <button type="button" class="btn-connect" @click.prevent="registerMe">S'enregistrer</button>
      </div>
      <!-- Login buttons -->
      <div>
        <p class="align">Déjà membre ?
          <!-- On click switch to /login-->
          <router-link class="link" to="/login">Se connecter</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
export default {
  name: 'SignUpView',
  data() {
    return {
      // object that contain register info
      signUpValue: {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
      },
    };
  },
  methods: {
    registerMe() {
      // get all input value
      let adress = document.getElementById('emailInput').value
      let password = document.getElementById('password').value
      let lastName = document.getElementById('lastName').value
      let firstName = document.getElementById('firstName').value
      // Regex
      const emailRegEx = (value) => {
        return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      }
      const passwordRegEx = (value) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
      }
      const nameRegEx = (value) => {
        return /^[A-Za-z-\u00C0-\u00FF]{3,20}$/.test(value);
      };
      // Check them whit regex
      function lastNameCheck() {
        if (nameRegEx(lastName)) {
          return true;
        } else {
          return false;
        }
      }
      function firstNameCheck() {
        if (nameRegEx(firstName)) {
          return true;
        } else {
          return false;
        }
      }
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
      if (!firstNameCheck()) {
        regexTest = false
      }
      if (!lastNameCheck()) {
        regexTest = false
      }
      // If check = false 
      if (regexTest === false) {
        // send alert
        alert("L'un des champs lors de votre enregistrement comporte une erreur.")
        // Else
      } else {
        // If nothing is empty 
        if (this.signUpValue.email !== null || this.signUpValue.password !== null || this.signUpValue.firstName !== null || this.signUpValue.lastName !== null) {
          // Create object data contain all register value
          const data = {
            email: this.signUpValue.email,
            password: this.signUpValue.password,
            lastName: this.signUpValue.lastName,
            firstName: this.signUpValue.firstName,
          }
          // Make a post request to register 
          axios.post("http://localhost:5001/api/auth/register", data)
          // If response.ok
            .then(response => {
              // location replace by /login
              console.log("Réussite !" + response)
              location.replace(location.origin + '/#/login')
            })
            .catch(err => console.log(err));
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
  height: 380px;
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

  .identityContainer {
    flex-direction: row;
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
      border: none;
      border-radius: 2px;
      color: white; 
      height: 60%;
      background-color: #4E5166;
      width: 100%;
      padding-left: 15px;
      font-size: 1em;
      font-family: 'Montserrat', sans-serif;
    }
    input::placeholder{
      color: white;
    }
    input:focus,
    select:focus {
      outline: #c0535b 3px solid;
    }

    #password {
      font-size: 20px;
    }
  }
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
  margin-left: 17.5%;
}

.link {
  color: #FD2D01;
  text-decoration: none;
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
  background-color: #4E5166 ;
  font-size: 1em;
  border-radius: 5px;
  transition: 0.5s;
}

.btn-connect:hover {
  cursor: pointer;
  border: 2px solid #050505;
  background-color: #ff4e2b ;
}
@media only screen and (min-width: 320px) and (max-width: 761px) {
  #wrapper{
    height: 88%;
  }
  form {
    width: 530px;
    height: 360px;
    .identityContainer{
      width: 79%;
    }
  }
}
</style>