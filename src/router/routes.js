const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/IndexPage.vue"),
        name: "IndexPage",
        meta: { requireAuth: true },
      },
      {
        path: "vendas",
        component: () => import("pages/VendasPage.vue"),
        name: "VendasPage",
        meta: { requireAuth: true },
      },
      {
        path: "relatorios",
        component: () => import("pages/RelatoriosPage.vue"),
        name: "RelatoriosPage",
        meta: { requireAuth: true },
      },
      {
        path: "tipos-produtos",
        component: () => import("pages/TiposProdutosPage.vue"),
        name: "TiposProdutosPage",
        meta: { requireAuth: true },
      },
      {
        path: "usuarios",
        component: () => import("pages/UsuariosPage.vue"),
        name: "UsuariosPage",
        meta: { requireAuth: true },
      },
      {
        path: "produtos",
        component: () => import("pages/ProdutosPage.vue"),
        name: "ProdutosPage",
        meta: { requireAuth: true },
      },
      {
        path: "grupos-produtos",
        component: () => import("pages/GruposProdutosPage.vue"),
        name: "GruposProdutosPage",
        meta: { requireAuth: true },
      },
    ],
  },

  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/LoginPage.vue"),
        name: "LoginPage",
      },
    ],
  },

  {
    path: "/cadastrar",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/CadastroPage.vue"),
        name: "CadastroPage",
      },
    ],
  },


  {
    path: "/opcoes-login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/OpcoesLoginPage.vue"),
        name: "OpcoesLoginPage",
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
