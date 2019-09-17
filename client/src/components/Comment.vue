<template>
  <div class="comment">
    <li>{{commentProp.content}}</li>
  </div>
</template>


<script>
export default {
  name: "comment",
  props: ["commentProp"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {}
};
</script>


<style scoped>
</style>