<template>
  <q-page class="">
    <div class="row q-col-gutter-md">

      <q-input
        v-model="descricao"
        filled
        dense
        class="col-4"
        label="Descrição"
      />

      <q-input
        v-model="valor"
        filled
        dense
        class="col-3"
        label="Valor"
      />

      <q-input
        v-model="quantidade"
        filled
        dense
        class="col-3"
        label="Quantidade"
      />

      <q-btn
        color="secondary-1"
        label="Salvar"
        class="col-2"
        @click="salvar"
      />

    </div>

    <q-table
      :rows="produtos"
    />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue'

const $q = useQuasar();
const produtos = ref([]);
const descricao = ref('');
const valor = ref(0);
const quantidade = ref(0);

const salvar = async () => {
  const response = await api.post('/produtos', {
    descricao: descricao.value,
    valor: valor.value,
    quantidade: quantidade.value
  })
  if(response.data.success) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Produto salvo com sucesso!'
    })
  }
}

onMounted( async () => {
  const response = await api.get('/produtos');
  produtos.value = response.data.result;
})
</script>
