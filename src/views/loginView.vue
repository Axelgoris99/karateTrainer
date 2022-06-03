<template>
  <div>
    <div>
      <h2>Inscription</h2>
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
    </div>
    <div>
      <h2>Connection</h2>
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
    </div>
  </div>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
      error: null,
    };
  },
  methods: {
    handleName(evt) {
      this.form.name = evt.target.value;
      console.log(this.form.name);
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
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(() => {});
        })
        .catch((err) => {
          this.error = err.message;
          console.log(err.message);
        });
    },
    submitLogin() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.form.email, this.form.password)
        .then((data) => {
          data.user
            .updateProfile({
              displayName: this.form.name,
            })
            .then(() => {});
        })
        .catch((err) => {
          this.error = err.message;
          console.log(err.message);
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
