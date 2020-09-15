<template>
    <div class="search-container">
      <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键字"
        background='#3296fa'
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
       />
      </form>

       <!-- 搜搜结果 内置子组件 -->
      <search-result
      v-if="isResultShow"
      :search-text="searchText"
        />

      <!-- 搜索联想建议 内置子组件 -->
      <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
      />

      <!-- 搜索历史记录内置子组件 -->
      <search-history
       v-else
       :search-histories = "searchHistories"
       @clear-search-histories="searchHistories = []"
       @search="onSearch"
       />
    </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import searchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage.js'

export default {
  name: 'SerachIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    searchResult
  },
  props: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH-HISTORIES') || []
    }
  },
  computed: {},
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH-HISTORIES', value)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      // console.log(val)
      this.searchText = val
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
}
.search-form {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
.result_list, .search-history {
  margin-top:108px;
}
</style>
