<template>
    <div>
      
    </div>
  </template>

<script>

export default {
  name: 'App',
  async mounted() {
    const auth = useAuthStore();
    const user = auth.getUser;

    if (user) {
      const userRole = user.user.role;
      if (userRole === 'Usuario') {
        this.$router.push('/principal');
      } else if (userRole === 'Administrador') {
        this.$router.push('/administracion');
      } else if (userRole === 'Contabilidad') {
        this.$router.push('/contabilidad');
      } else if (userRole === 'Adquisiciones') {
        this.$router.push('/adquisiciones');
      } else {
        this.$router.push('/perfil'); // Ruta por defecto para otros roles
      }
    } else {
      this.$router.push('/login'); // Redirigir a login si no hay usuario
    }
  }
}
</script>