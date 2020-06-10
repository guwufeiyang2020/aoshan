import moment from 'moment';

export default {
  // 格式化日期
  formatDate(date = new Date(), pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(date).format(pattern);
  },
  // 移除html标签
  removeHtmlTag(str) {
    if (!str) return str;
    str = str.replace(/&nbsp;/g, '');
    return str.replace(/<[^>]+>/g, '');
  },
  isEmptyObject(obj) {
    /* eslint-disable */
    for (const key in obj) {
      return false;
    }
    return true;
  },
  getRandomArrayElements(arr, count) {
    const shuffled = arr.slice(0);
    let i = arr.length;
    const min = i - count;
    let temp;
    let index;
    while ((i -= 1) > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    return shuffled.slice(min);
  },
};
