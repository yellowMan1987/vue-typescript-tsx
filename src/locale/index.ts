
import vue from 'vue';
import vueI18n from 'vue-i18n';
import zh_CN from './zh_CN';
import en_US from './en_US';


vue.use(vueI18n);
// zh_CN  en_US
const language = 'zh_CN';

const i18n = new vueI18n({
  messages: { // set locale messages
    en_US,
    zh_CN,
  },
  locale: language, // set locale
});

console.log(i18n)


export { language, i18n };
