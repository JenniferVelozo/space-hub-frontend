<template>
  <header>
    <img  class="header-logo" @click="redirectToRoute"/>
    <div v-if="useHeaderStore().getTitle != ''" class="title-container">
      {{ useHeaderStore().getTitle }}
    </div>
    <div v-if="useAuthStore().getIsAuth" class="header-icon">
      <svg-icon class="logo-account" type="mdi" :path="path" style="cursor: pointer" @click="toggleDropdown"></svg-icon>
      <div v-if="isMenuVisible" class="dropdown-menu-navbar">
        <ul>
          <li @click="goToMyAccount">Mi Cuenta</li>
          <li @click="logout">Cerrar Sesión</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import 'primeicons/primeicons.css';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount } from '@mdi/js';

export default {
	name: "headerComponent",
	components: {
		SvgIcon
	},

	data() {
		return {
      path: mdiAccount,
      isMenuVisible: false,
      title: ''
		}
	},

  methods: {
    redirectToRoute() {
      if (useAuthStore().getUser.user) {
        if (useAuthStore().getUser.user.role === 'Usuario') {
          this.$router.push({
            name: 'principal', // Nombre de la ruta para centro de costos
          })
        } else if (useAuthStore().getUser.user.role === 'Administrador') {
          this.$router.push({
            name: 'administracion', // Nombre de la ruta para administrador
          })
        } else if (useAuthStore().getUser.user.role === 'Contabilidad') {
          this.$router.push({
            name: 'contabilidad', // Nombre de la ruta para contabilidad
          })
        } else if (useAuthStore().getUser.user.role === 'Adquisiciones') {
          this.$router.push({
            name: 'adquisiciones', // Nombre de la ruta para adquisiciones
          })
        } else {
          this.$router.push({
            name: 'perfil', // Ruta por defecto para otros roles
          })
        }
      }
    },
    toggleDropdown() {
      this.isMenuVisible = !this.isMenuVisible;
      if (this.isMenuVisible) {
        window.addEventListener('click', this.handleClickOutside);
      } else {
        window.removeEventListener('click', this.handleClickOutside);
      }
    },
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isMenuVisible = false;
        window.removeEventListener('click', this.handleClickOutside);
      }
    },
    destroyed() {
      window.removeEventListener('click', this.handleClickOutside);
    },
    goToMyAccount() {
      this.$router.push('/perfil');
    },
    async logout() {
      await useHeaderStore().setTitle('');
      await useAuthStore().logOut();
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.title-container {
  font-size: 35px; /* Utiliza el 3% del ancho del viewport para el tamaño del texto */
  margin-top: 0.6%; /* Utiliza el 0.6% del alto del viewport para el margen superior */
  text-align: left; /* Alinea el texto a la izquierda dentro del contenedor */
}
</style>
