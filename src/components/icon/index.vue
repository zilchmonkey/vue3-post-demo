<template>
  <div
    v-if="props.id === 736"
    :style="backgroundStyle"
    :class="$style.iconContainer"
    class="group-hover:translate-x-0"
  >
    <img :class="$style.icon" :src="rdo" />
  </div>
  <div
    v-else-if="props.id === 702"
    :class="$style.iconContainer"
    class="group-hover:translate-x-0"
  >
    <img :class="$style.icon" :src="gtao" />
  </div>
  <div v-else :class="$style.iconContainer" class="group-hover:translate-x-0">
    <img :class="$style.icon" :src="rStar" />
  </div>
</template>
<script setup lang="ts">
import { ref, defineProps } from "vue";
import rdo from "@/components/icon/img/rdo.svg";
import rdoBack from "@/components/icon/img/rdo-back.png";
import gtao from "@/components/icon/img/gta-o.svg";
import rStar from "@/components/icon/img/rockstar-game-logo.png";

const props = defineProps<{ id: number }>();

const backgroundStyle = ref({
  backgroundImage: `url(${rdoBack})`,
});
</script>
<style lang="scss" scoped module>
.iconContainer {
  @apply inline-block
      p-2
      bg-cover
      absolute
      top-0
      right-0
      transform
      translate-x-full
      transition-transform
      duration-500
      ease-out;
}
.icon {
  @apply w-32
    ml-auto;
}
</style>
