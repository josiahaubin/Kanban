<template>
  <div class="task border rounded">
    <p>{{taskProp.description}}</p>
  </div>
</template>


<script>
export default {
  name: "task",
  props: ["taskProp"],
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