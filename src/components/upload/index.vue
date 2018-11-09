<template>
    <div id="o_upload_target">
        <div class="preview" :style="{backgroundImage: 'url(' + preview + ')'}"></div>
    </div>
</template>
<style lang="stylus" scoped>
#o_upload_target {
    width: 100%;
    height: 100%;
    position: relative;

    > :global(.preview) {
        width: 100%;
        height: 100%;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        transition: filter 200ms;
        top: 0;
    }

    &:hover {
        > :global(.preview) {
            filter: blur(6px);
        }

        > :global(.uppy-Root) {
            opacity: 0.8;
            background-color: rgba(255, 255, 255, 0.69);
        }
    }

    > :global(.uppy-Root) {
        border: 2px dashed #adadad;
        box-sizing: border-box;
        transition: opacity 200ms;
        border-radius: 10px;
        opacity: 0;
    }

    :global(.uppy-DragDrop-inner) {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    :global(label) {
        text-align: center;
        font-size: 12px;
        padding: 0 8px;
        cursor: pointer;

        :global(span) {
            color: var(--color-primary);
        }
    }

    :global(svg) {
        fill: rgba(0, 0, 0, 0.2);
        margin-bottom: 10px;
    }
}
</style>

<script>
import Uppy from "@uppy/core";
import DargDrop from "@uppy/drag-drop";

export default {
  name: "o-upload",
  beforeCreate() {
    this.uppy = Uppy();
  },
  mounted() {
    this.uppy.use(DargDrop, {
      target: "#o_upload_target",
      width: "100%",
      height: "100%",
      locale: {}
    });
    this.uppy.on("file-added", file => {
      const reader = new FileReader();
      reader.readAsDataURL(file.data);
      reader.onload = ({ target: { result } }) => {
        this.preview = result;
        this.$emit("onready", result);
      };
    });
    this.uppy.run();
  },
  props: {
    initImg: String
  },
  data() {
    return {
      preview: this.initImg
    };
  }
};
</script>