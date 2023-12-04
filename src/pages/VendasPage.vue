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
      open-item
      @row-click="editar"
      class="q-pa-md q-ma-md"
    >
      <template #body-cell-cliente="{row}">
        <q-td>
          <div>
            {{ row.usuario_comprou.name }}
          </div>
        </q-td>
      </template>
      <template #body-cell-vendedor="{row}">
        <q-td>
          <div>
            {{ row.usuario_vendeu.name }}
          </div>
        </q-td>
      </template>
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
    name: 'cliente',
    label: 'Cliente',
    align: 'left',
    style: 'width:30%',
    sortable: true
  },
  {
    name: 'vendedor',
    label: 'Vendedor',
    align: 'left',
    style: 'width:30%',
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
    field: 'created_at',
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

const editar = (evt, row) => {
  console.log(row)
  $q.dialog({
    component: VendaAddEditDialog,
    componentProps: {
      vendaId: row.id
    },

  }).onOk(async() => {
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
