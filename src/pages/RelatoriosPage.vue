<template>
  <q-page class="">
    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div>
          <q-btn label="Vendedor com maior número de vendas"></q-btn>
        </div>
        <div>
          <q-btn label="Cliente com maior número de compras"></q-btn>
        </div>
        <div>
          <q-btn label="Produto mais vendido"></q-btn>
        </div>
        <div>
          <q-btn label="Produto menos vendido"></q-btn>
        </div>
        <div>
          <q-btn label="Média do valor das vendas"></q-btn>
        </div>

      </div>
    </div>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { onMounted } from 'vue'

onMounted( async () => {

})
</script>
