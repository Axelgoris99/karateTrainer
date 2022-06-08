<template>
  <div>
    <n-card>
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        justify-content="space-evenly"
        style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="Connexion">
          <p>{{ errorLog }}</p>
          <form action="" method="get" class="form">
            <div class="formItem">
              <label for="email">Entrer votre adresse mail: </label>
              <input
                type="email"
                name="email"
                id="emailLog"
                required
                autofocus
                autocomplete="email"
                placeholder="SuperTonAdresse@gmail.com"
                :value="login.email"
                @input="handleLoginMail"
              />
            </div>
            <div class="formItem">
              <label for="pwd">Entrer votre mot de passe: </label>
              <input
                type="password"
                name="password"
                id="passwordLog"
                required
                autofocus
                placeholder="1A3-45-678"
                autocomplete="current-password"
                :value="login.password"
                @input="handleLoginPwd"
              />
            </div>
            <div class="formItem">
              <n-button strong type="primary" @click="submitLogin"
                >Connection !</n-button
              >
            </div>
          </form>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="Inscription">
          <p>{{ errorReg }}</p>
          <form action="" method="get" class="form">
            <div class="formItem">
              <label for="name">Entrer votre nom: </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                autofocus
                autocomplete="username"
                placeholder="Karateka Exceptionel"
                :value="form.name"
                @input="handleName"
              />
            </div>
            <div class="formItem">
              <label for="email">Entrer votre adresse mail: </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                autofocus
                autocomplete="email"
                placeholder="SuperTonAdresse@gmail.com"
                :value="form.email"
                @input="handleMail"
              />
            </div>
            <div class="formItem">
              <label for="pwd">Entrer votre mot de passe: </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                autofocus
                placeholder="1A3-45-678"
                autocomplete="current-password"
                :value="form.password"
                @input="handlePwd"
              />
            </div>
            <div class="formItem">
              <n-button strong type="primary" @click="submitRegister"
                >Inscription !</n-button
              >
            </div>
          </form>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script>
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, addUserFirestore } from "../firebaseModel";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      login: {
        email: "",
        password: "",
      },
      errorReg: null,
      errorLog: null,
    };
  },
  methods: {
    handleName(evt) {
      this.form.name = evt.target.value;
    },
    handleMail(evt) {
      this.form.email = evt.target.value;
    },
    handleLoginMail(evt) {
      this.login.email = evt.target.value;
    },
    handlePwd(evt) {
      this.form.password = evt.target.value;
    },
    handleLoginPwd(evt) {
      this.login.password = evt.target.value;
    },
    submitRegister() {
      createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then((data) => {
          updateProfile(data.user, {
            displayName: this.form.name,
          })
            .then(() => signOut(auth))
            .then(() =>
              signInWithEmailAndPassword(
                auth,
                this.form.email,
                this.form.password
              )
            )
            .then(() => addUserFirestore(auth.currentUser))
            .then(() => {
              this.$router.push("profile");
            });
        })
        .catch((err) => {
          this.errorReg = err.message;
        });
    },
    submitLogin() {
      signInWithEmailAndPassword(auth, this.login.email, this.login.password)
        .then(() => {
          this.$router.push("profile");
        })
        .catch((err) => {
          this.errorLog = err.message;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
}
.formItem {
  display: flex;
  flex-direction: column;
  margin: 10px;
}
</style>
