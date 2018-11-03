<template>
  <!-- 头部搜索区域 -->
  <div class="index_box">
    <input type="text" placeholder="搜索" @click="toSearch">
    <icon type="search" size="20">
    </icon>
  </div>
</template>


<script>
export default {
  methods: {
    toSearch() {
      wx.navigateTo({ url: "/pages/search/main" });
    }
  }
};
</script>


<style scoped lang="scss">
// 定义UGO红
$ured: #ff2d4a;
page {
  padding-top: 100rpx;
}
// 头部搜索区域样式
.index_box {
  width: 100%;
  height: 100rpx;
  background-color: #ff2d4a;
  box-sizing: border-box;
  padding: 20rpx 16rpx;
  text-align: center;
  z-index: 998;
  position: fixed;
  left: 0;
  top: 0;
  ._input {
    width: 100%;
    height: 60rpx;
    background-color: white;
    padding-left: 70rpx;
    font-size: 24rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
  }
  icon {
    position: absolute;
    left: 48%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>


