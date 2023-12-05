<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card
      class="column no-wrap"
      style="width: 900px;height: fit-content"
    >

      <q-card-section class="row no-padding scroll full-height">
        <!-----inf------>
        <div class="col-xs-12 col-sm col-md q-px-md q-pt-md">
          <q-form
            ref="addProdutoForm_ref"
            class="row q-col-gutter-md"
            autocomplete="off"
            @submit.prevent
          >
            <UsuarioSelect
              v-model="cliente"
              :clientes="true"
              class="col-12"
            />


            <ProdutoSelect
              v-model="produtos"
              class="col-12"
              @update:produto="produtos = $event"
            />

            <div v-for="(produto, index) in produtos" :key="index">
              <q-chip
                removable
                class="col-12 q-pa-md text-secondary-3"
                dense
                outlined
                :label="produto.descricao"
                @remove="removeProduto(index)"
              />
              <!-- Quantidade -->

              <q-input
                v-model="produto.quantidade"
                outlined
                class="col-6"
                dense
                color="secondary-3"
                label="Quantidade"
                hint="Campo obrigatório"
                lazy-rules
                :rules="[(val) => !!val || 'Campo obrigatório']"
                type="number"
              />

            </div>
          </q-form>
        </div>
      </q-card-section>
      <div class="row q-pa-md">
        <div v-if="valorTotal">Valor Total: {{ parseFloat(valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</div>
        <!-- <div v-if="props.vendaId">Valor Total: {{ parseFloat(valorTotal).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</div> -->
        <q-space/>
        <q-btn
          v-if="!props.vendaId"
          flat
          color="primary-5 button"
          padding="12px 16px"
          label="Cancelar"
          class="q-mr-md"
          @click="onDialogCancel"
        />
        <q-btn
          v-if="!props.vendaId"
          color="primary-3 text-black button-primary"
          padding="12px 16px"
          label="Salvar"
          @click="adicionar"
        />
      </div>
    </q-card>
  </q-dialog>
</template>
s

<script setup>
import { ref, computed, onMounted } from "vue";
import { useDialogPluginComponent, useQuasar } from "quasar";
import { api } from "src/boot/axios.js";
import ProdutoSelect from 'src/components/cruds/ProdutoSelect.vue'
import UsuarioSelect from 'src/components/cruds/UsuarioSelect.vue'

defineEmits([...useDialogPluginComponent.emits]);

const $q = useQuasar();
const addProdutoForm_ref = ref(null);
const cliente = ref(null);
const produtos = ref([]);
const valorTotal = computed(() => {
  let total = 0;

  if(props.vendaId) {
    produtos.value.forEach((produto) => {
      total += produto.valor_total;
    });
  } else {
    produtos.value.forEach((produto) => {
      total += produto.valor * produto.quantidade;
    });
  }
  return total;
})

const props = defineProps({
  vendaId: {
    type: [String, Number],
    required: false,
    default: null,
  },
});

const add = computed(() => {
  return props.vendaId ? false : true;
});

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } =
  useDialogPluginComponent();

const adicionar = async () => {
  let response = null;

  let data = {
    cliente_id: cliente.value.id,
    produtos: produtos.value,
    soma_valor: valorTotal.value,
  }
  response = await api.post("vendas", data);

  if (response.data.success) {
    onDialogOK();
  } else {
    $q.notify({
      type: "negative",
      message: response.data.message,
    });
  }
};

const removeProduto = (index) => {
  produtos.value.splice(index, 1);
};

const getVenda = async () => {
  const response = await api.get(`/vendas/${props.vendaId}`);
  cliente.value = response.data.result.usuario_comprou;
  produtos.value = response.data.result.venda_itens;

  produtos.value.forEach((produto) => {
    produto.venda_item_id = produto.id;
    produto.id = produto.produto.id;
    produto.descricao = produto.produto.descricao;
  });
}

onMounted( async () => {
  if (props.vendaId) {
    await getVenda();
  }
});
</script>
