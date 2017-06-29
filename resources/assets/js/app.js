
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.component('example', require('./components/Example.vue'));
Vue.component('chat-messages', require('./components/ChatMessages.vue'));
Vue.component('chat-form', require('./components/ChatForm.vue'));


const app = new Vue({
    el: '#app',
    data: {
        messages: [],
        friend_id: 0
    },

    created() {
        // this.fetchMessages();
        Echo.private('chat')
            .listen('MessageSent', (e) => {
                this.messages.push({
                    message: e.message.message,
                    user: e.user,
                    conversation: e.conversation
                });
            });
    },

    methods: {
        fetchMessages() {
            axios.get('/chat/' + this.friend_id).then(response => {
                console.log(response);
                this.messages = response.data;
            });
        },

        addMessage(message) {
            console.log(message);
            this.messages.push(message);

            axios.post('/chat/send', {message: message}).then(response => {
                console.log(response.data);
            });
        },

        setFriend(message) {
            this.friend_id = message.friend_id;
            this.fetchMessages();
        }
    }
});