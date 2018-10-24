<template>
    <editor api-key="API_KEY" :init="{plugins: 'wordcount'}"/>
</template>
<script>
import Editor from "@tinymce/tinymce-vue";
export default {
  name: "richtext-tiny",
  components: {
    editor: Editor
  }
};
</script>

