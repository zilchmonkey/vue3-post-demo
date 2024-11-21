<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="error">An error occurred: {{ error.message }}</div>
  <ul :class="$style.posts" v-else>
    <li v-for="(post, index) in posts" :key="post.id">
      <a
        @click.prevent="assignId(index)"
        target="_blank"
        :href="`https://www.rockstargames.com${post.url}`"
      >
        <Card :post="post" />
      </a>
    </li>
  </ul>
  <Alert
    v-if="selectedPost"
    :post="selectedPost"
    @clear-post-index="clearPostIndex"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import NEWSWIRE_LIST_QUERY from "@/queries/newswire";
import { useQuery } from "@vue/apollo-composable";
import Alert from "@/components/alert/index.vue";
import Card from "@/components/card/index.vue";

interface PreviewImagesParsed {
  newswire_block: {
    square: string;
    d16x9: string;
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

const { result, loading, error } = useQuery<QueryResult>(
  NEWSWIRE_LIST_QUERY,
  queryVariables
);

const posts = computed(() => result.value?.posts?.results || []);

const postIndex = ref<number | null>(null);

const assignId = (index: number) => {
  postIndex.value = index;
};

const selectedPost = computed(() => {
  if (
    postIndex.value !== null &&
    postIndex.value >= 0 &&
    postIndex.value < posts.value.length
  ) {
    return posts.value[postIndex.value] || null;
  }
  return null;
});

const clearPostIndex = () => {
  postIndex.value = null;
};
</script>

<style lang="scss" module>
.posts {
  @apply grid
    gap-8
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4;
}
</style>
