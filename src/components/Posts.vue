<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">An error occurred: {{ error.message }}</div>
  <ul :class="$style.posts" v-else>
    <li v-for="post in posts" :key="post.id">
      <a target="_blank" :href="`https://www.rockstargames.com${post.url}`">
        <article>
          <figure class="group" :class="[$style.figureItem]">
            <div :class="$style.contentHolder">
              <div
                v-if="post.primary_tags[0].id === 736"
                :style="backgroundStyle"
                :class="$style.iconContainer"
                class="group-hover:translate-x-0"
              >
                <img :class="$style.icon" :src="rdo" />
              </div>
              <div
                v-else-if="post.primary_tags[0].id === 702"
                :class="$style.iconContainer"
                class="group-hover:translate-x-0"
              >
                GTAV
              </div>
              <div
                v-else
                :class="$style.iconContainer"
                class="group-hover:translate-x-0"
              >
                R*
              </div>
              <img
                :class="$style.postImg"
                loading="lazy"
                :src="post.preview_images_parsed.newswire_block.square"
              />
              <figcaption :class="[backgroundColor(post.primary_tags[0].id)]">
                {{ post.created_formatted }}
                <p>{{ post.title }}</p>
              </figcaption>
            </div>
          </figure>
        </article>
      </a>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import NEWSWIRE_LIST_QUERY from "@/queries/newswire";
import { useQuery } from "@vue/apollo-composable";
import rdo from "@/components/img/rdo.svg";
import rdoBack from "@/components/img/rdo-back.png";

interface PreviewImagesParsed {
  newswire_block: {
    square: string;
  };
}

interface PrimaryTags {
  id: number;
}

interface Post {
  id: string;
  title: string;
  created_formatted: string;
  url: string;
  preview_images_parsed: PreviewImagesParsed;
  primary_tags: [PrimaryTags];
}

interface QueryResult {
  paging: {
    perPage: Number;
  };
  posts: {
    results: Post[];
  };
  errors: Error[];
}

interface Error {
  message: string;
}

const queryVariables = {
  locale: "en-us",
  limit: 100,
};

export default defineComponent({
  setup() {
    const { result, loading, error } = useQuery<QueryResult>(
      NEWSWIRE_LIST_QUERY,
      queryVariables
    );

    const posts = computed(() => result.value?.posts?.results || []);

    const backgroundColor = ref((tag: number): string => {
      switch (tag) {
        case 736:
          return "bg-[var(--rdr-color)]";
        case 702:
          return "bg-[var(--gta-color)]";
        default:
          return "bg-[var(--rock-color)]";
      }
    });

    const backgroundStyle = ref({
      backgroundImage: `url(${rdoBack})`,
    });

    return { loading, error, posts, backgroundColor, backgroundStyle, rdo };
  },
});
</script>

<style lang="scss" module>
article {
  @apply h-full;
}
.posts {
  @apply grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4;
  .postImg {
    @apply w-full object-cover aspect-square flex-shrink-0;
  }
}
.figureItem {
  --border-angle: 0turn; // For animation.
  --main-bg: conic-gradient(
    from var(--border-angle),
    #213,
    #112 5%,
    #112 60%,
    #213 95%
  );
  --gradient-border: conic-gradient(
    from var(--border-angle),
    transparent,
    var(--gta-color) 99%,
    transparent
  );

  @keyframes bg-spin {
    to {
      --border-angle: 1turn;
    }
  }

  @apply customContainer relative rounded text-white h-full hover:translate-y-[-1rem] hover:shadow-lg hover:shadow-black transition-transform duration-500 ease-out;

  figcaption {
    @apply text-xl text-start flex flex-col items-center p-4 h-full;
  }
  &:hover {
    @apply bg-transparent;
  }
  .iconContainer {
    @apply inline-block p-2 bg-cover absolute top-0 right-0 transform translate-x-full transition-transform duration-500 ease-out;
  }

  .contentHolder {
    @apply overflow-hidden h-full rounded relative;
  }
}
.icon {
  @apply w-32 ml-auto;
}

@property --border-angle {
  syntax: "<angle>";
  inherits: true;
  initial-value: 0turn;
}
</style>
