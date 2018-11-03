<template>
  <div>
    <!-- 头部搜索区域 -->
    <div class="search-box">
      <icon type="search" size="16">
      </icon>
      <input type="text" v-model.trim="searchValue" @confirm="searchProduct" placeholder="请输入你要搜索的商品">
      <button size="mini" type="defult">
        取消
      </button>
    </div>
    <!-- 底部搜索列表区域 -->
    <div class="searchList-box" v-show="this.history.length == 0">
      <div class="title">
        <span class="left">搜索历史</span>
        <span @click="clearSearch" class="iconfont icon-shanchu"></span>
      </div>
      <div class="items">
        <div class="item" @click="changeSearch(item)" v-for="(item, index) in history" :key="index">
          {{item}}
        </div>
      </div>
    </div>
    <div class="history-box" v-show=" this.history.length != 0">

      <div class="title">
        <div class="item active">综合</div>
        <div class="item">销量</div>
        <div class="item">
          <div class="box">
            价格
          </div>
          <div class="tubiao-box">
            <span class="jiantoushang heifont icon-up active"></span>
            <span class="jiantouxia  heifont icon-down"></span>
          </div>

        </div>
      </div>

      <div class="bottom"></div>

    </div>

  </div>

</template>

<script>
export default {
  data() {
    return {
      // 搜索记录
      history: [],
      searchValue: ""
    };
  },

  methods: {
    searchProduct() {
      if (this.searchValue == "") {
        wx.showToast({
          title: "哥们,写点东西呗!", //提示的内容,
          icon: "none", //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: res => {}
        });
        return;
      }
      let index = this.history.indexOf(this.searchValue);
      // console.log(index);
      if (index != -1) {
        // 说明数组中有这个数据
        // 删除这个数据
        this.history.splice(index, 1);
      }
      this.history.unshift(this.searchValue);
      if (this.history.length > 10) {
        this.history.pop();
      }
      wx.setStorage({
        key: "history",
        data: this.history
      });
      this.searchValue = "";
    },
    // 给搜索列表添加点击事件
    // 点击某一个商品,就在搜索框中显示
    changeSearch(item) {
      this.searchValue = item;
    },
    clearSearch() {
      // 清除本地的搜索
      this.history = [];
      // 清除缓存中的搜索历史
      wx.removeStorage({
        key: "history",
        success: res => {
          wx.showToast({
            title: "删除了哦!", //提示的内容,
            icon: "success", //图标,
            duration: 2000, //延迟时间,
            mask: true, //显示透明蒙层，防止触摸穿透,
            success: res => {}
          });
        }
      });
    }
  },

  created() {
    wx.getStorage({
      key: "history",
      // 接口调用成功的毁掉函数
      success: res => {
        // console.log(res.data)
        this.history = res.data;
      },
      // 接口调用失败的回调函数
      fail: () => {},
      // 接口调用结束的回调函数,失败.成功都会执行
      complete: () => {}
    });
  }
};
</script>

<style scoped lang="scss">
$uRed: #eb4450;
.search-box {
  width: 100%;
  height: 120rpx;
  display: flex;
  align-items: center;
  background-color: #eeeeee;
  padding-left: 20rpx;
  box-sizing: border-box;
  position: relative;
  icon {
    position: absolute;
    left: 40rpx;
  }
  ._input {
    flex: 1;
    background-color: #fff;
    font-size: 24rpx;
    padding-left: 70rpx;
  }
  ._button {
    margin-left: 20rpx;
    margin-right: 16rpx;
    background-color: #eeeeee;
    // border: 2rpx solid #bfbfbf;
  }
}

// 搜索列表
.searchList-box {
  width: 100%;
  padding: 0 20rpx;
  box-sizing: border-box;
  .title {
    display: flex;
    height: 80rpx;
    align-items: center;
    justify-content: space-between;
    .left {
      font-size: 32rpx;
    }
    .iconfont {
      color: #ccc;
      font-size: 32rpx;
    }
  }
  .items {
    display: flex;
    flex-wrap: wrap;
    .item {
      padding: 15rpx;
      background-color: #ccc;
      margin-right: 20rpx;
      margin-bottom: 12rpx;
    }
  }
}
// 搜索内容列表区域样式
.history-box {
  .title {
    height: 100rpx;
    display: flex;
    border-bottom: 2rpx solid #ccc;
    font-size: 28rpx;
    .item {
      flex: 1;
      height: 100%;
      text-align: center;
      line-height: 100rpx;
      &.active {
        color: $uRed;
      }
    }
    .item:last-child {
      display: flex;
      justify-content: center;
      span {
        display: block;
        height: 10rpx;
        color: #ccc;
        &.active {
          color: $uRed;
        }
      }
    }
  }
}
</style>
