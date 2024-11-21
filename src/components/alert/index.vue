<template>
  <AlertDialogRoot v-model:open="isOpen">
    <AlertDialogPortal>
      <AlertDialogOverlay :class="$style.overlay" />
      <AlertDialogContent :class="$style.content">
        <AlertDialogTitle :class="$style.title">
          <img
            :class="isLoaded ? $style.loaded : null"
            @load="handleImageLoad"
            :src="props.post.preview_images_parsed.newswire_block?.d16x9"
          />
        </AlertDialogTitle>
        <AlertDialogDescription :class="$style.description">
          You are about to leave our site and go to an external website. We do
          not have control over the content or privacy practices of this
          third-party site. Would you like to proceed?
        </AlertDialogDescription>
        <div :class="$style.buttons">
          <AlertDialogCancel @click="handleCancel" :class="$style.cancel">
            No thanks
          </AlertDialogCancel>
          <AlertDialogAction @click="handleAction" :class="$style.action">
            Yes, I confirm
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
} from "radix-vue";

const emit = defineEmits(["clearPostIndex"]);
const isOpen = ref(false);
const isLoaded = ref(false);

const handleAction = () => {
  window.open(`https://www.rockstargames.com${props.post.url}`, "_blank");
};

const handleCancel = () => {
  isOpen.value = false;
  emit("clearPostIndex");
};

const handleImageLoad = (): void => {
  isLoaded.value = true;
};

const props = defineProps<{
  post: {
    title: string;
    url: string;
    preview_images_parsed: { newswire_block?: { d16x9?: string } };
  };
}>();

watch(
  () => props.post,
  (newPost) => {
    if (newPost) {
      isOpen.value = true;
    }
  },
  { immediate: true }
);
</script>

<style scoped module>
.overlay {
  @apply bg-blackA9 
    data-[state=open]:animate-overlayShow 
    fixed 
    inset-0 
    z-30;
}
.content {
  @apply z-[100] 
    text-[15px] 
    data-[state=open]:animate-contentShow 
    fixed 
    top-[50%] 
    left-[50%] 
    w-[90vw] 
    max-w-[800px] 
    translate-x-[-50%] 
    translate-y-[-50%] 
    rounded-[6px] 
    bg-white 
    p-[15px] 
    shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]
    focus:outline-none;
}
.description {
  @apply text-mauve11 
    mt-4 
    mb-5 
    text-[15px] 
    leading-normal;
}
.title {
  @apply m-0;
}
.buttons {
  @apply flex 
    justify-end 
    gap-[25px];
}
.cancel {
  @apply text-mauve11 
    bg-mauve4 
    hover:bg-mauve5 
    focus:shadow-mauve7 
    inline-flex 
    h-[35px] 
    items-center 
    justify-center 
    rounded-[4px] 
    px-[15px] 
    font-semibold 
    leading-none 
    outline-none 
    focus:shadow-[0_0_0_2px];
}
.action {
  @apply text-green11 
    bg-green4 
    hover:bg-green5 
    focus:shadow-green7 
    inline-flex 
    h-[35px] 
    items-center 
    justify-center 
    rounded-[4px] 
    px-[15px] 
    font-semibold 
    leading-none 
    outline-none 
    focus:shadow-[0_0_0_2px];
}
img {
  @apply aspect-video overflow-hidden opacity-0 transition-opacity duration-500;
  &.loaded {
    @apply opacity-100;
  }
}
</style>
