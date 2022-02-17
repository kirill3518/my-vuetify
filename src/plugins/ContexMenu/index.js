export default {
    install(Vue) {
        if (this.installed) {
            return
        }

        this.installed = true

        Vue.prototype.$context = {

            EventBus: new Vue(),

            show(items) {
                this.EventBus.$emit('show', items);
            },
        }
    }
}
