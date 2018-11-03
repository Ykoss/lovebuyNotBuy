<template>
  <div class="index-container">
    <searchBar></searchBar>

    <!-- 轮播图区域 -->
    <swiper indicator-dots autoplay circular>
      <swiper-item v-for="(item, index) in swiperList" :key="index">
        <image mode="aspectFill" :src="item.image_src"></image>
      </swiper-item>

    </swiper>

    <!-- 分类区域 -->
    <div class="category-box">
      <a :href="item.navigator_url" v-for="(item, index) in categoryList" :key="index">
        <img :src="item.image_src" alt="">
        <p>{{item.name}}</p>
      </a>
    </div>

    <!-- 楼层区域 -->
    <div class="floor-box">
      <div class="section" v-for="(item, index) in floorList" :key="index">
        <!-- 头部区域 -->
        <div class="title">
          <img :src="item.floor_title.image_src" alt="">
          <span>{{item.floor_title.name}}</span>
        </div>
        <!-- 底部区域 -->
        <div class="bottom">
          <a href="" v-for="(it, i) in item.product_list" :key="i">
            <img :src="it.image_src" alt="">
          </a>
        </div>
      </div>
    </div>

    <!--底部 -->
    <div class="bottom-line" v-show="showLine">
      <span class="iconfont icon-xiao"></span>
      我是有底线的!
    </div>

    <!-- 返回顶部 -->
    <div class="fly-top" @click="toTop" v-show="showTop">
      <span class="iconfont icon-jiantoushang"></span>
      顶部
    </div>

  </div>
</template>

<script>
// 导入模块
import tools from "../../utils/tools";
// 导入searchBar
import searchBar from "../../components/searchBar";

// console.log(tools);

export default {
  data() {
    return {
      // 轮播图数据
      swiperList: [],
      // 分类数据
      categoryList: [],
      // 楼层数据
      floorList: [],
      // 设置底部显示开关
      showLine:false,
      // 返回顶部
      showTop:false
    };
  },
  // 注册组件
  components:{
    searchBar
  },

  methods: {
    toTop(){
      wx.pageScrollTo({
        scrollTop:0
      })
    }
  },

  created() {
    // 轮播图数据
    let p1 = tools.myPro({
      url: tools.baseUrl + "api/public/v1/home/swiperdata"
    });
    // 分类数据
    let p2 = tools.myPro({
      url: tools.baseUrl + "api/public/v1/home/catitems"
    });
    // 楼层数据
    let p3 = tools.myPro({
      url: tools.baseUrl + "api/public/v1/home/floordata"
    });
    Promise.all([p1, p2, p3]).then(resultList => {
      this.swiperList = resultList[0].data.message;
      // console.log(resultList[1]);
      this.categoryList = resultList[1].data.message;
      // console.log(resultList[2]);
      this.floorList = resultList[2].data.message;
    });
  },
// 上啦触底事件
  onReachBottom(){
    // console.log('触发了');
    this.showLine = true;
  },

// 点击返回顶部
  onPageScroll(obj){
    if(obj.scrollTop>500){
      this.showTop = true;
    }else{
      this.showTop = false; 
    }
  }
};
</script>

<style scoped lang="scss">
// 定义UGO红
$ured: #ff2d4a;

// 轮播图区域样式
swiper {
  padding-top: 100rpx;
  ._image {
    width: 100%;
  }
}
// 分类区域样式
.category-box {
  width: 100%;
  display: flex;
  align-items: center;
  ._a {
    display: block;
    width: 128rpx;
    height: 128rpx;
    text-align: center;
    flex: 1;
    padding: 24rpx 28rpx 29rpx;
    ._img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      box-shadow: 0 10rpx 10rpx #ccc;
    }
    ._p {
      padding-top: 18rpx;
      font-size: 24rpx;
      color: #333;
      font-weight: 700;
    }
  }
}

// 楼层区域样式
.floor-box {
  padding-top: 29rpx;
  .section {
    .title {
      width: 100%;
      height: 120rpx;
      position: relative;
      ._img {
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
      }
      ._span {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        color: $ured;
        font-weight: 550;
        padding-left: 15rpx;
      }
    }

    .bottom {
      // width: 100%;
      overflow: hidden;
      height: 500rpx;
      padding: 20rpx 16rpx;
      ._a {
        width: 33.333%;
        float: left;
        height: 50%;
        box-sizing: border-box;
        padding: 10rpx;
        ._img {
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 10rpx;
          
        }
        &:nth-child(1) {
          height: 100%;
        }
      }
    }
  }
}
// 底线区域样式
.bottom-line{
  text-align: center;
  width: 100%;
  background-color: #f4f4f4;
  font-size: 24rpx;
  color: #999;
  padding-top: 24rpx;
  .iconfon{
  
  }
}

// 返回顶部样式
.fly-top{
  width: 80rpx;
  height: 80rpx;
  text-align: center;
  // line-height: 80rpx;
  border-radius: 50%;
  background-color: #fafafa;
  color: gray;
  position: fixed;
  right: 20rpx;
  bottom: 5rpx;
  font-size: 26rpx;
  ._span{
    display: block;
  }
}
</style>
