export default {
  data() {
    return {
      showRegister: false,
      showVerify: false,
      showReset: false,
      showResetCode: false,
      dirtyFirstName: false,
      dirtyLastName: false,
      dirtyEmail: false,
      dirtyUsername: false,
      dirtyPassword: false,
      dirtyConfirmPassword: false,
      loginVals: {
        email: '',
        password: ''
      },
      registerVals: {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        confirm_password: ''
      },
      resetPasswordVals: {
        email: '',
        password: '',
        confirm_password: ''
      },
      verifyToken: '',
      resetToken: '',
      loginErrors: {
        email: '',
        password: ''
      },
      registerErrors: {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        confirm_password: ''
      },
      resetPasswordErrors: {
        email: '',
        password: '',
        confirm_password: ''
      },
      submitting: false
    }
  },
  emits: ['close', 'login'],
  computed: {
    loginDisabled() {
      if (this.submitting) {
        return true;
      }

      let valid = true;
      for (const key in this.loginErrors) {
        this.loginErrors[key] = '';
      }

      if (this.dirtyEmail && this.loginVals.email === '') {
        this.loginErrors.email = 'Email cannot be empty';
        valid = false;
      }

      if (this.dirtyEmail && !this.isValidEmail(this.loginVals.email)) {
        this.loginErrors.email = 'Invalid email address';
        valid = false;
      }

      if (this.dirtyPassword && this.loginVals.password === '') {
        this.loginErrors.password = 'Password cannot be empty';
        valid = false;
      }

      return !valid || this.loginVals.email === '' || this.loginVals.password === '';
    },
    registerDisabled() {
      if (this.submitting) {
        return true;
      }

      let valid = true;
      for (const key in this.registerErrors) {
        this.registerErrors[key] = '';
      }

      if (this.dirtyFirstName && this.registerVals.first_name === '') {
        this.registerErrors.first_name = 'First name cannot be empty';
        valid = false;
      }

      if (this.dirtyLastName && this.registerVals.last_name === '') {
        this.registerErrors.last_name = 'Last name cannot be empty';
        valid = false;
      }

      if (this.dirtyUsername && this.registerVals.username === '') {
        this.registerErrors.username = 'Username cannot be empty';
        valid = false;
      }

      if (this.dirtyEmail && this.registerVals.email === '') {
        this.registerErrors.email = 'Email cannot be empty';
        valid = false
      }

      if (this.dirtyEmail && !this.isValidEmail(this.registerVals.email)) {
        this.registerErrors.email = 'Invalid email address';
        valid = false;
      }

      if (this.dirtyPassword && this.registerVals.password === '') {
        this.registerErrors.password = 'Password cannot be empty';
        valid = false;
      }

      if (this.dirtyPassword && !this.isValidPassword(this.registerVals.password)) {
        this.registerErrors.password = 'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character';
        valid = false;
      }

      if (this.dirtyPassword && this.dirtyConfirmPassword && this.registerVals.password !== this.registerVals.confirm_password) {
        this.registerErrors.confirm_password = 'Passwords do not match';
        valid = false;
      }

      return !valid || this.registerVals.first_name === '' || this.registerVals.last_name === '' || this.registerVals.email === '' || this.registerVals.username === '' || this.registerVals.password === '' || this.registerVals.confirm_password === '';
    },
    verifyDisabled() {
      if (this.submitting) {
        return true
      }

      return this.verifyToken === '';
    },
    resetPasswordRequestDisabled() {
      if (this.submitting) {
        return true;
      }

      let valid = true;
      for (const key in this.resetPasswordErrors) {
        this.resetPasswordErrors[key] = '';
      }

      if (this.dirtyEmail && this.resetPasswordVals.email === '') {
        this.resetPasswordErrors.email = 'Email cannot be empty';
        valid = false;
      }

      if (this.dirtyEmail && !this.isValidEmail(this.resetPasswordVals.email)) {
        this.resetPasswordErrors.email = 'Invalid email address';
        valid = false;
      }

      return !valid || this.resetPasswordVals.email === '';
    },
    resetPasswordDisabled() {
      if (this.submitting) {
        return true;
      }

      let valid = true;
      for (const key in this.resetPasswordErrors) {
        this.resetPasswordErrors[key] = '';
      }

      if (this.dirtyPassword && this.resetPasswordVals.password === '') {
        this.resetPasswordErrors.password = 'Password cannot be empty';
        valid = false;
      }

      if (this.dirtyPassword && !this.isValidPassword(this.resetPasswordVals.password)) {
        this.resetPasswordErrors.password = 'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character';
        valid = false;
      }

      if (this.dirtyPassword && this.dirtyConfirmPassword && this.resetPasswordVals.password !== this.resetPasswordVals.confirm_password) {
        this.resetPasswordErrors.confirm_password = 'Passwords do not match';
        valid = false;
      }

      return !valid || this.resetPasswordVals.password === '' || this.resetPasswordVals.confirm_password === '';
    }
  },
  methods: {
    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },
    isValidPassword(password) {
      return password.length >= 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password);
    },
    async loginUser(event) {
      event.preventDefault();
      this.submitting = true;

      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.loginVals)
      });

      if (response.ok) {
        let data = await response.json();

        this.$emit('close');
        this.$emit('login', {user_id: data.user.id, verified: data.user.active});
        Toastify({
          text: `Logged In Successfully!`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#28a745",
            boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
          }
        }).showToast();
      } else {
        if (response.status === 403) {
          Toastify({
            text: `Invalid email or password!`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "#dc3545",
              boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
            }
          }).showToast();
        } else {
          Toastify({
            text: `An error occurred while logging in!`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "#dc3545",
              boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
            }
          }).showToast();
        }
      }

      this.submitting = false;
    },
    async registerUser(event) {
      event.preventDefault();
      this.submitting = true;

      let submitFields = ['first_name', 'last_name', 'email', 'username', 'password'];
      let submitVals = {};

      for (const field of submitFields) {
        submitVals[field] = this.registerVals[field];
      }

      // Create new user
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitVals)
      });

      if (response.ok) {
        // Login new user
        const login = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: this.registerVals.email, password: this.registerVals.password })
        });

        if (login.ok) {
          // Generate verification token for new user
          const verify = await fetch('/api/users/me/verify');

          if (verify.ok) {
            // Move to verification page
            this.showRegister = false;
            this.showVerify = true;
          } else {
            Toastify({
              text: `Could not generate verification code!`,
              duration: 3000,
              close: true,
              gravity: "top",
              position: "center",
              stopOnFocus: true,
              style: {
                background: "#dc3545",
                boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
              }
            }).showToast();
          }
        } else {
          Toastify({
            text: `Could not login user ${this.registerVals.username}!`,
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
              background: "#dc3545",
              boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
            }
          }).showToast();
        }
      } else {
        Toastify({
          text: `Could not create user ${this.registerVals.username}!`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#dc3545",
            boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
          }
        }).showToast();
      }

      this.submitting = false;
    },
    async verifyUser(event) {
      event.preventDefault();
      this.submitting = true;

      const response = await fetch('/api/users/me/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: this.verifyToken })
      });

      if (response.ok) {
        this.$emit('close');
        Toastify({
          text: `Registration and Verification Complete!`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#28a745",
            boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
          }
        }).showToast();
      } else {
        Toastify({
          text: `Could not verify user!`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#dc3545",
            boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
          }
        }).showToast();
      }
      

      this.submitting = false;
    },
    async resetPasswordRequest(event) {
      event.preventDefault();
      this.submitting = true;

      const response = await fetch('/api/users/me/reset-password', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        query: JSON.stringify({ email: this.resetPasswordVals.email })
      });

      if (response.ok) {
        this.showReset = false;
        this.showResetCode = true;
        Toastify({
          text: `Password Reset Email Sent!`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#28a745",
            boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
          }
        }).showToast();
      } else {
        Toastify({
          text: `Could not reset password!`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#dc3545",
            boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
          }
        }).showToast();
      }

      this.submitting = false;
    },
    async resetPassword(event) {
      event.preventDefault();
      this.submitting = true;

      const response = await fetch('/api/users/me/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: this.resetToken, new_password: this.resetPasswordVals.password })
      });

      if (response.ok) {
        this.showResetCode = false;
        
        Toastify({
          text: `Password Reset Successfully!`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#28a745",
            boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
          }
        }).showToast();
      } else {
        Toastify({
          text: `Could not reset password!`,
          duration: 3000,
          close: true,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "#dc3545",
            boxShadow: "0.3rem 0.3rem 0.2rem rgba(0, 0, 0, 0.1)"
          }
        }).showToast();
      }

      this.submitting = false;
    }
  },
  template: `
  <div class="modal-backdrop" @click="$emit('close')"></div>

  <div class="modal" id="login-modal" v-if="!showRegister && !showVerify && !showReset && !showResetCode">
    <div class="modal-content">
      <span class="close" id="close-login-modal" @click="$emit('close')">&times;</span>
      <h2>Login</h2>
      <form id="login-form" @submit="loginUser">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="loginVals.email" required @blur="dirtyEmail = true">
          <p v-if="loginErrors.email" class="error-message">{{ loginErrors.email }}</p>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" v-model="loginVals.password" required @blur="dirtyPassword = true">
          <p v-if="loginErrors.password" class="error-message">{{ loginErrors.password }}</p>
          <a href="#" @click="() => showReset = !showReset" id="reset-link">Forgot your password?</a>
        </div>
        <button type="submit" class="btn btn-success" :disabled="loginDisabled">Login</button>
        <button type="button" class="btn btn-dark" @click="$emit('close')">Cancel</button>
      </form>
      <a href="#" @click="() => showRegister = !showRegister" id="register-link">Don't have an account?</a>
    </div>
  </div>
    
  <div class="modal" id="register-modal" v-else-if="showRegister && !showVerify && !showReset && !showResetCode">
    <div class="modal-content">
      <span class="close" id="close-login-modal" @click="$emit('close')">&times;</span>
      <h2>Register</h2>
      <form id="register-form" @submit="registerUser">
        <div class="form-group">
            <label for="first_name">First Name</label>
            <input type="text" id="first_name" name="first_name" v-model="registerVals.first_name" required @blur="dirtyFirstName = true">
            <p v-if="registerErrors.first_name" class="error-message">{{ registerErrors.first_name }}</p>
          </div>
          <div class="form-group">
            <label for="last_name">Last Name</label>
            <input type="text" id="last_name" name="last_name" v-model="registerVals.last_name" required @blur="dirtyLastName = true">
            <p v-if="registerErrors.last_name" class="error-message">{{ registerErrors.last_name }}</p>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" v-model="registerVals.email" required @blur="dirtyEmail = true">
            <p v-if="registerErrors.email" class="error-message">{{ registerErrors.email }}</p>
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="registerVals.username" required @blur="dirtyUsername = true">
            <p v-if="registerErrors.username" class="error-message">{{ registerErrors.username }}</p>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" v-model="registerVals.password" required @blur="dirtyPassword = true">
            <p v-if="registerErrors.password" class="error-message">{{ registerErrors.password }}</p>
          </div>
          <div class="form-group">
            <label for="confirm_password">Confirm Password</label>
            <input type="password" id="confirm_password" name="confirm_password" v-model="registerVals.confirm_password" required @blur="dirtyConfirmPassword = true">
            <p v-if="registerErrors.confirm_password" class="error-message">{{ registerErrors.confirm_password }}</p>
          </div>
          <div class="flex-v">
            <button type="submit" class="btn btn-success" :disabled="registerDisabled">Register</button>
            <button type="button" class="btn btn-dark" @click="$emit('close')">Cancel</button>
          </div>  
      </form>
      <a href="#" @click="() => showRegister = !showRegister" id="register-link">Already have an account?</a>
    </div>
  </div>
  
  <div class="modal" id="verify-modal" v-else-if="!showRegister && showVerify && !showReset && !showResetCode">
    <div class="modal-content">
      <span class="close" id="close-login-modal" @click="$emit('close')">&times;</span>
      <h2>Verify</h2>
      <p>A verification code has been sent to your email.</p>
      <p>Enter the code below to complete registration.</p>
      <p>If you did not receive the email, check your spam folder.</p>
      <form id="verify-form" @submit="verifyUser">
        <div class="form-group">
          <label for="token">Verification Code</label>
          <input type="text" id="token" name="token" v-model="verifyToken" required>
        </div>
        <button type="submit" class="btn btn-success" :disabled="verifyDisabled">Verify</button>
      </form>
    </div>
  </div>

  <div class="modal" id="reset-modal" v-else-if="!showRegister && !showVerify && showReset && !showResetCode">
    <div class="modal-content">
      <span class="close" id="close-login-modal" @click="$emit('close')">&times;</span>
      <h2>Reset Password</h2>
      <p>Enter your email below to receive a password reset link.</p>
      <form id="reset-form" @submit="resetPasswordRequest">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" v-model="resetPasswordVals.email" required @blur="dirtyEmail = true">
          <p v-if="resetPasswordErrors.email" class="error-message">{{ resetPasswordErrors.email }}</p>
        </div>
        <button type="submit" class="btn btn-success" :disabled="resetPasswordRequestDisabled">Reset Password</button>
        <button type="button" class="btn btn-dark" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </div>

  <div class="modal" id="reset-code-modal" v-else-if="!showRegister && !showVerify && !showReset && showResetCode">
    <div class="modal-content">
      <span class="close" id="close-login-modal" @click="$emit('close')">&times;</span>
      <h2>Reset Password</h2>
      <p>A password reset code has been sent to your email.</p>
      <p>Enter the code below to reset your password.</p>
      <form id="reset-code-form" @submit="resetPassword">
        <div class="form-group">
          <label for="token">Reset Code</label>
          <input type="text" id="token" name="token" v-model="resetToken" required>
        </div>
        <div class="form-group">
          <label for="password">New Password</label>
          <input type="password" id="password" name="password" v-model="resetPasswordVals.password" required @blur="dirtyPassword = true">
          <p v-if="resetPasswordErrors.password" class="error-message">{{ resetPasswordErrors.password }}</p>
        </div>
        <div class="form-group">
          <label for="confirm_password">Confirm Password</label>
          <input type="password" id="confirm_password" name="confirm_password" v-model="resetPasswordVals.confirm_password" required @blur="dirtyConfirmPassword = true">
          <p v-if="resetPasswordErrors.confirm_password" class="error-message">{{ resetPasswordErrors.confirm_password }}</p>
        </div>
        <button type="submit" class="btn btn-success" :disabled="resetPasswordDisabled">Reset Password</button>
        <button type="button" class="btn btn-dark" @click="$emit('close')">Cancel</button>
      </form>
    </div>
  </div>
  `
}