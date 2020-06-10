import Mock from 'mockjs';

export default {
  getBannerData: () => ({
    code: 20000,
    data: {
      bannerList: [
        {
          id: Mock.Random.integer(10000, 100000),
          image: Mock.Random.image('#00405d', '图片一'),
        },
        {
          id: Mock.Random.integer(10000, 100000),
          image: Mock.Random.image('#fb0a2a', '图片二'),
        },
      ],
    },
  }),
};
