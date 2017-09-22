import Vue from 'vue';

import store from './store';
import Root from './components/root.vue';

new Vue({
    el: document.getElementById('root'),
    store,
    render: (h) => h(Root)
});
