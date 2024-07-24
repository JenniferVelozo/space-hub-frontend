<template>
    <div class="card card-accent">
      <div class="card-header">
        <span> Nombre del espacio</span>
      </div>
      <div class="card-body">
        <span> Fecha de inicio: </span>
        <br>
        <span> Fecha de fin: </span>
        <br>
        <span class="accent-text"> Estado: {{ estado }}</span>

      </div>
      <div class="card-footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </template>

  <script>
  export default {
    props: {
      nroSolicitud: String,
      idOrdenCompra: String,
      idFolio: String,
      diasRestantes: String,
      estado: String
    }
  }
  </script>

  <style scoped>
  
  </style>