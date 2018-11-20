import {
  Button,
  ColorPicker,
  Badge,
  Collapse,
  CollapseItem,
  Input,
  FormItem,
  Form,
  Loading,
  Message,
} from "element-ui";

import Vue from "vue";
import en from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import 'element-ui/lib/theme-chalk/index.css';

// import "@/assets/scss/element-variables.scss";

locale.use(en);

Vue.use(Button);
Vue.use(Badge);

Vue.use(Collapse);
Vue.use(CollapseItem);

Vue.use(FormItem);
Vue.use(Form);
Vue.use(Input);
Vue.use(ColorPicker);

Vue.use(Loading.directive as any);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;
