import { NbMenuItem } from "@nebular/theme";

export const DASHBOARD_MENU_ITEMS: NbMenuItem[] = [
  {
    title: " محصولات",
    icon: "shopping-cart-outline",
    link: "/home/products",
    home: true,
  },
  {
    title: " بارگزاری محصولات",
    icon: "shopping-cart-outline",
    link: "/home/upload-product",
    home: true,
  },
];
export const PROFILE_MENU_ITEMS: NbMenuItem[] = [
  {
    title: "برگزیده ها",
    icon: "shopping-cart-outline",
    link: "/profile/save",
    home: true,
  },
  {
    title: "کالای خریداری شده",
    icon: "shopping-cart-outline",
    link: "/profile/uploader",
    home: true,
  },
];

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "بارگزاری محصولات ",
    icon: "shopping-cart-outline",
    link: "/dashboard/upload-product",
    home: true,
  },
  {
    title: " نمایش محصولات" ,
    icon: "shopping-cart-outline",
    link: "/dashboard/products",
    home: true,
  },

  // {
  //   title: "E-commerce",
  //   icon: "shopping-cart-outline",
  //   link: "/profile/dashboard",
  //   home: true,
  // },
  // {
  //   title: 'IoT Dashboard',
  //   icon: 'home-outline',
  //   link: '/profile/iot-dashboard',
  // },

  // {
  //   title: "محصولات",
  //   icon: "shopping-cart-outline",
  //   link: "/profile/products",
  //   home: true,
  // },
  // {

  //   title: "IoT Dashboard",
  //   icon: "home-outline",
  //   link: "/profile/iot-dashboard",
  // },
  // {
  //   title: "FEATURES",

  //   group: true,
  // },
  // {
  //   title: "Layout",
  //   icon: "layout-outline",
  //   children: [
  //     {
  //       title: "Stepper",
  //       link: "/profile/layout/stepper",
  //     },
  //     {
  //       title: "List",
  //       link: "/profile/layout/list",
  //     },
  //     {
  //       title: "Infinite List",
  //       link: "/profile/layout/infinite-list",
  //     },
  //     {
  //       title: "Accordion",
  //       link: "/profile/layout/accordion",
  //     },
  //     {
  //       title: "Tabs",
  //       pathMatch: "prefix",
  //       link: "/profile/layout/tabs",
  //     },
  //   ],
  // },
  // {
  //   title: "Forms",
  //   icon: "edit-2-outline",
  //   children: [
  //     {
  //       title: "Form Inputs",
  //       link: "/profile/forms/inputs",
  //     },
  //     {
  //       title: "Form Layouts",
  //       link: "/profile/forms/layouts",
  //     },
  //     {
  //       title: "Buttons",
  //       link: "/profile/forms/buttons",
  //     },
  //     {
  //       title: "Datepicker",
  //       link: "/profile/forms/datepicker",
  //     },
  //   ],
  // },
  // {
  //   title: "UI Features",
  //   icon: "keypad-outline",
  //   link: "/profile/ui-features",
  //   children: [
  //     {
  //       title: "Grid",
  //       link: "/profile/ui-features/grid",
  //     },
  //     {
  //       title: "Icons",
  //       link: "/profile/ui-features/icons",
  //     },
  //     {
  //       title: "Typography",
  //       link: "/profile/ui-features/typography",
  //     },
  //     {
  //       title: "Animated Searches",
  //       link: "/profile/ui-features/search-fields",
  //     },
  //   ],
  // },
  // {
  //   title: "Modal & Overlays",
  //   icon: "browser-outline",
  //   children: [
  //     {
  //       title: "Dialog",
  //       link: "/profile/modal-overlays/dialog",
  //     },
  //     {
  //       title: "Window",
  //       link: "/profile/modal-overlays/window",
  //     },
  //     {
  //       title: "Popover",
  //       link: "/profile/modal-overlays/popover",
  //     },
  //     {
  //       title: "Toastr",
  //       link: "/profile/modal-overlays/toastr",
  //     },
  //     {
  //       title: "Tooltip",
  //       link: "/profile/modal-overlays/tooltip",
  //     },
  //   ],
  // },
  // {
  //   title: "Extra Components",
  //   icon: "message-circle-outline",
  //   children: [
  //     {
  //       title: "Calendar",
  //       link: "/profile/extra-components/calendar",
  //     },
  //     {
  //       title: "Progress Bar",
  //       link: "/profile/extra-components/progress-bar",
  //     },
  //     {
  //       title: "Spinner",
  //       link: "/profile/extra-components/spinner",
  //     },
  //     {
  //       title: "Alert",
  //       link: "/profile/extra-components/alert",
  //     },
  //     {
  //       title: "Calendar Kit",
  //       link: "/profile/extra-components/calendar-kit",
  //     },
  //     {
  //       title: "Chat",
  //       link: "/profile/extra-components/chat",
  //     },
  //   ],
  // },
  // {
  //   title: "Maps",
  //   icon: "map-outline",
  //   children: [
  //     {
  //       title: "Google Maps",
  //       link: "/profile/maps/gmaps",
  //     },
  //     {
  //       title: "Leaflet Maps",
  //       link: "/profile/maps/leaflet",
  //     },
  //     {
  //       title: "Bubble Maps",
  //       link: "/profile/maps/bubble",
  //     },
  //     {
  //       title: "Search Maps",
  //       link: "/profile/maps/searchmap",
  //     },
  //   ],
  // },
  // {
  //   title: "Charts",
  //   icon: "pie-chart-outline",
  //   children: [
  //     {
  //       title: "Echarts",
  //       link: "/profile/charts/echarts",
  //     },
  //     {
  //       title: "Charts.js",
  //       link: "/profile/charts/chartjs",
  //     },
  //     {
  //       title: "D3",
  //       link: "/profile/charts/d3",
  //     },
  //   ],
  // },
  // {
  //   title: "Editors",
  //   icon: "text-outline",
  //   children: [
  //     {
  //       title: "TinyMCE",
  //       link: "/profile/editors/tinymce",
  //     },
  //     {
  //       title: "CKEditor",
  //       link: "/profile/editors/ckeditor",
  //     },
  //   ],
  // },
  // {
  //   title: "Tables & Data",
  //   icon: "grid-outline",
  //   children: [
  //     {
  //       title: "Smart Table",
  //       link: "/profile/tables/smart-table",
  //     },
  //     {
  //       title: "Tree Grid",
  //       link: "/profile/tables/tree-grid",
  //     },
  //   ],
  // },
  // {
  //   title: "Miscellaneous",
  //   icon: "shuffle-2-outline",
  //   children: [
  //     {
  //       title: "404",
  //       link: "/profile/miscellaneous/404",
  //     },
  //   ],
  // },
  // {
  //   title: "Auth",
  //   icon: "lock-outline",
  //   children: [
  //     {
  //       title: "Login",
  //       link: "/auth/login",
  //     },
  //     {
  //       title: "Register",
  //       link: "/auth/register",
  //     },
  //     {
  //       title: "Request Password",
  //       link: "/auth/request-password",
  //     },
  //     {
  //       title: "Reset Password",
  //       link: "/auth/reset-password",
  //     },
  //   ],
  // },
];
