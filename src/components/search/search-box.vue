<template>
    <div id="o-search-mount-point" @click="handler">
        <transition name="search" :duration="100" @enter="enter">
        <div :class="`inner${show ? ' active' : ''}`" :style="{ left, top}" v-if="show">
            <search-input :autofocus="true" v-model="value"/>
            <slot/>
        </div>
        </transition>
    </div>
</template>

<style lang="stylus" scoped>
#o-search-mount-point {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.28);
    z-index: 7;

    .inner {
        position: absolute;
        padding: 8px;
        background: #fff;
        border-radius: 0 0 4px 4px;
    }
}

.search-enter-active, .search-leave-active {
    transition: width 0.5s;
}

.search-enter, .search-leave {
    width: 200px;
}

.search-enter-to, .search-leave-to {
    width: 50%;
}
</style>


<script>
import searchInput from "./search-input";
export default {
  name: "search-box",
  props: {
    x: Number,
    y: Number,
    do: Function,
    interval: Number,
    soltTpl: Array
  },
  components: {
    [searchInput.name]: searchInput
  },
  mounted() {
    console.log(this);
    setTimeout(() => {
      this.show = true;
    }, 0);
  },
  computed: {
    left() {
      return `${this.x - 8}px`;
    },
    top() {
      return `${this.y - 8}px`;
    }
  },
  methods: {
    enter(el, cb) {},
    handler() {
      this.close();
    },
    destroy() {
      this.$el.removeEventListener("transitionend", this.destroy);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close() {
      this.$el.addEventListener("transitionend", this.destroy);
    }
  },
  watch: {
    value() {
    console.log(this.soltTpl);
      const timer = setTimeout(() => {
        clearTimeout(timer);
        if (this.do) {
          return this.do(this.value);
        }
      }, this.interval);
    }
  },
  data() {
    return {
      show: false,
      value: ""
    };
  }
};
</script>

