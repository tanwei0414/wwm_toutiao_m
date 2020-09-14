<template>
    <div class="article-list">
      <van-pull-refresh v-model="isreFreshLoading" :success-text="refreshSuccessText" :success-duration="1500" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error-sync="error" error-text="请求失败，请点击重新加载" @load="onLoad">

      <!-- 每条文章 组件 -->
      <article-item v-for="(article, index) in list" :key="index" :article="article" />

      <!-- <van-cell v-for="(article, index) in list" :key="index" :title="article.title"/> -->
      </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>

import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      isreFreshLoading: false,
      refreshSuccessText: '刷新成功 ！'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        // if (Math.random() > 0.2) {
        //   JSON.parse('dghasdashdfq')
        // }

        const { results } = data.data
        // console.log(results)
        this.list.push(...results)
        this.loading = false

        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        // console.log('请求失败', err)
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        if (Math.random() > 0.9) {
          JSON.parse('fsadfhghuip')
        }

        const { results } = data.data
        this.list.unshift(...results)
        this.isreFreshLoading = false
        this.refreshSuccessText = `刷新成功， 更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .article-list {
    height: 79vh;
    overflow-y: auto;
  }
</style>
