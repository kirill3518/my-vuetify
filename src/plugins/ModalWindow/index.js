export default {
    install(Vue) {
        if (this.installed) {
            return
        }

        this.installed = true

        Vue.prototype.$modal = {

            EventBus: new Vue(),

            show(item, settings) {
                this.EventBus.$emit('show', item, settings);
            },
        }
    }
}
