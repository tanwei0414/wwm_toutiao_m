<template>
    <div class="search-result">
      <van-list
        class="result_list"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败， 请点击重试！"
        @load="onLoad"
      >
        <van-cell v-for="(article, index) in list" :key="index" :title="article.title" ></van-cell>
      </van-list>
    </div>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'searchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        if (Math.random() > 0.9) {
          JSON.parse('fsadfhghuip')
        }

        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.result_list {
  margin-top:108px;
}
</style>
