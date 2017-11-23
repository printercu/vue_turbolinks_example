// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require turbolinks
//= require_tree .

//= require vue/dist/vue

window.START = +new Date();
function secFromStart() {
  return Math.round((new Date() - window.START) / 1000);
}

function buildVue(element) {
  new Vue({
    el: element,
    created: function(){
      this.interval = setInterval(() => { console.log(secFromStart()) }, 1000)
    },
    beforeDestroy: function(){
      if (this.interval) { clearInterval(this.interval) }
    }
  })
}

// Plugin adapted for sprockets.
(function(){

function handleVueDestructionOn(turbolinksEvent, vue) {
  document.addEventListener(turbolinksEvent, function teardown() {
    vue.$destroy();
    document.removeEventListener(turbolinksEvent, teardown);
  });
}

function plugin(Vue, options) {
  // Install a global mixin
  Vue.mixin({

    beforeMount: function() {
      // If this is the root component, we want to cache the original element contents to replace later
      // We don't care about sub-components, just the root
      if (this == this.$root) {
        handleVueDestructionOn('turbolinks:visit', this);
        this.$originalEl = this.$el.outerHTML;
      }
    },

    destroyed: function() {
      // We only need to revert the html for the root component
      if (this == this.$root) {
        this.$el.outerHTML = this.$originalEl;
      }
    }
  })
};

// export default plugin;
Vue.use(plugin)

})()
