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
      <div class="row q-pa-md self-end justify-end">
        <q-btn
          flat
          color="primary-5 button"
          padding="12px 16px"
          label="Cancelar"
          class="q-mr-md"
          @click="onDialogCancel"
        />
        <q-btn
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
import { ref, computed } from "vue";
import { useDialogPluginComponent } from "quasar";
import { api } from "src/boot/axios.js";
import ProdutoSelect from 'src/components/cruds/ProdutoSelect.vue'
import UsuarioSelect from 'src/components/cruds/UsuarioSelect.vue'

defineEmits([...useDialogPluginComponent.emits]);

const addProdutoForm_ref = ref(null);
const cliente = ref(null);
const produtos = ref([]);

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
  }
  response = await api.post("vendas", data);

  if (response.data.success) {
    onDialogOK();
  }
};

const removeProduto = (index) => {
  produtos.value.splice(index, 1);
};
</script>
