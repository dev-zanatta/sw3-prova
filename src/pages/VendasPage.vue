<template>
  <q-page class="">
    <div class="row q-px-md q-pt-md">
      <q-space/>
      <q-btn
        color="primary-3"
        label="Adicionar"
        @click="adicionar"
      />
    </div>

    <q-table
      :key="tableKey"
      :rows="vendas"
      :rows-per-page-options="[20,30,50]"
      :columns="columns"
      class="q-pa-md q-ma-md"
    >
    </q-table>
  </q-page>
</template>

<script setup>
import { format, parseISO } from 'date-fns';
import { useQuasar } from 'quasar';
import { api } from 'src/boot/axios';
import { onMounted, ref } from 'vue'
import VendaAddEditDialog from 'src/components/cruds/VendaAddEditDialog.vue'

const $q = useQuasar();
const vendas = ref([]);
const tableKey = ref(0);
const columns = [
  {
    name: 'produto',
    label: 'Produto',
    align: 'left',
    style: 'width:40%',
    sortable: true
  },
  {
    name: 'cliente',
    label: 'Cliente',
    align: 'left',
    sortable: true
  },
  {
    name: 'vendedor',
    label: 'Vendedor',
    field: '',
    align: 'left',
    sortable: true
  },
  {
    name: 'valor_total',
    label: 'Valor Total',
    field: 'valor_total',
    format: (val) => val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    align: 'left',
    sortable: true
  },
  {
    name: 'data_hora_venda',
    label: 'Vendido em',
    field: 'data_hora_venda',
    format: (val) => format(parseISO(val), 'dd/MM/yyyy HH:mm:ss'),
    align: 'left',
    sortable: true
  },
]

const adicionar = () => {
  $q.dialog({
    component: VendaAddEditDialog,
    componentProps: {
      produtoId: null
    },

  }).onOk(async(data) => {
    await getVendas();
  })
}

const getVendas = async () => {
  const response = await api.get('/vendas');
  vendas.value = response.data.result;
  tableKey.value++;
}

onMounted( async () => {
  await getVendas();
})
</script>
