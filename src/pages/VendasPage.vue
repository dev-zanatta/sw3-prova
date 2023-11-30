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
      :rows="produtos"
      :rows-per-page-options="[20,30,50]"
      :columns="columns"
      class="q-pa-md q-ma-md"
    >
      <template #body-cell-ativo="{row}">
        <q-td class="text-center">
          <q-chip
            :color="row.ativo ? 'green' : 'red'"
            :label="row.ativo ? 'Ativo' : 'Inativo'"
          />
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
import ProdutoAddEditDialog from 'src/components/cruds/ProdutoAddEditDialog.vue'

const $q = useQuasar();
const produtos = ref([]);
const tableKey = ref(0);
const columns = [
  {
    name: 'descricao',
    label: 'Descrição',
    field: 'descricao',
    align: 'left',
    style: 'width:40%',
    sortable: true
  },
  {
    name: 'valor',
    label: 'Valor',
    field: 'valor',
    format: (val) => parseFloat(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    align: 'left',
    sortable: true
  },
  {
    name: 'quantidade',
    label: 'Quantidade',
    field: 'estoque',
    align: 'left',
    sortable: true
  },
  {
    name: 'ativo',
    label: 'Ativo',
    field: 'ativo',
    align: 'center',
    sortable: true
  },
  {
    name: 'created_at',
    label: 'Criado em',
    field: 'created_at',
    format: (val) => format(parseISO(val), 'dd/MM/yyyy HH:mm:ss'),
    align: 'left',
    sortable: true
  },
]

const adicionar = () => {
  $q.dialog({
    component: ProdutoAddEditDialog,
    componentProps: {
      produtoId: null
    },

  }).onOk(async(data) => {
    await getProdutos();
  })
}

const getProdutos = async () => {
  const response = await api.get('/produtos');
  produtos.value = response.data.result;
  tableKey.value++;
}

onMounted( async () => {
  await getProdutos();
})
</script>
