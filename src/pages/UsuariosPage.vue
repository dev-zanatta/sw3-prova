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
      :rows="usuarios"
      :rows-per-page-options="[20,30,50]"
      :columns="columns"
      class="q-pa-md q-ma-md"
      open-item
      @row-click="editar"
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
import UsuarioAddEditDialog from 'src/components/cruds/UsuarioAddEditDialog.vue'

const $q = useQuasar();
const usuarios = ref([]);
const tableKey = ref(0);
const columns = [
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'left',
    style: 'width:30%',
    sortable: true
  },
  {
    name: 'email',
    label: 'E-mail',
    field: 'email',
    align: 'left',
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
    component: UsuarioAddEditDialog,
    componentProps: {
      produtoId: null
    },

  }).onOk(async() => {
    await getUsuarios();
  })
}

const getUsuarios = async () => {
  const response = await api.get('/usuarios');
  usuarios.value = response.data.result;
  tableKey.value++;
}

const editar = (evt, row) => {
  $q.dialog({
    component: UsuarioAddEditDialog,
    componentProps: {
      usuarioId: row.id
    },

  }).onOk(async() => {
    await getTiposProdutos();
  })
}

onMounted( async () => {
  await getUsuarios();
})
</script>
