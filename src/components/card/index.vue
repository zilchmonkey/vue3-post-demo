<template>
  <article :class="isLoaded ? $style.imgLoaded : null">
    <figure
      :style="backgroundColor(post.primary_tags[0].id)"
      class="group"
      :class="[$style.figureItem]"
    >
      <div :class="$style.contentHolder">
        <Icon :id="post.primary_tags[0].id" />
        <img
          :class="$style.postImg"
          loading="lazy"
          :src="props.post.preview_images_parsed.newswire_block.square"
          @load="handleImageLoad"
        />
        <div
          :class="[
            backgroundColor(props.post.primary_tags[0].id),
            $style.caption,
          ]"
        >
          <h6>{{ post.created_formatted }}</h6>
          <h4>{{ post.title }}</h4>
        </div>
      </div>
    </figure>
  </article>
</template>
<script setup lang="ts">
import { ref, CSSProperties } from "vue";
import Icon from "@/components/icon/index.vue";

const isLoaded = ref(false);

const handleImageLoad = () => {
  isLoaded.value = true;
};

const props = defineProps<{
  post: {
    title: string;
    url: string;
    created_formatted: string;
    primary_tags: [{ id: number }];
    preview_images_parsed: { newswire_block: { square: string } };
  };
}>();

const backgroundColor = ref((tag: number): CSSProperties => {
  switch (tag) {
    case 736:
      return { "--bg-color": "var(--rdr-color)" } as CSSProperties;
    case 702:
      return { "--bg-color": "var(--gta-color)" } as CSSProperties;
    default:
      return { "--bg-color": "var(--rock-color)" } as CSSProperties;
  }
});
</script>
<style lang="scss" scoped module>
article {
  @apply transition-opacity 
    h-full
    duration-500
    opacity-0;
  &.imgLoaded {
    @apply opacity-100;
  }
  h6 {
    @apply text-xs pb-[0.7rem];
  }
  h4 {
    @apply text-base;
  }
}

.figureItem {
  --border-angle: 0turn;

  @keyframes bg-spin {
    to {
      --border-angle: 1turn;
    }
  }

  @apply customContainer
    relative rounded
    text-white
    h-full
    hover:translate-y-[-1rem]
    hover:shadow-lg
    hover:shadow-black
    transition-transform
    duration-500
    ease-out;

  .caption {
    @apply text-xl
      text-start
      flex
      flex-col
      p-4
      h-full
      bg-[--bg-color];
  }
  &:hover {
    @apply bg-transparent;
  }

  .contentHolder {
    @apply overflow-hidden
      h-full
      rounded
      relative;
    > img {
      @apply aspect-square
        object-cover
        flex-shrink-0;
    }
  }
}

@property --border-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0turn;
}
</style>
