var t = getApp(),
  a = t.requirejs("core");
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden'];
}

Page({
  data: {
    subMenuDisplay: initSubMenuDisplay(),
    show:[
      {
        name:"啥啥啥公司",
        dis:"188888888",
        app:"../img/paa.jpg",
        id:"/pages/map/map"
      }
    ],
    category:[],
    range: 500,
    cateid: 0,
    sorttype:'',
    text1:'附近',
    text2: '分类',
    text3: '智能排序',
  },
  onShow:function(){
    this.getcategory()
    this.getmerchuser()
  },
  getcategory:function(){
    var that=this;
    a.get("merch/category", {}, function (a) {
      that.setData({
        category:a
      });
    });
  },
  getmerchuser:function(){
    var that = this;
    var data={
      range: this.data.range,
      cateid: this.data.cateid,
      sorttype: this.data.sorttype
    };
    a.post("merch/ajaxmerchuser", data, function (a) {
      var newSubMenuDisplay = initSubMenuDisplay();
      that.setData({
        show: a,
        subMenuDisplay: newSubMenuDisplay
      });
    });
  },
  tapMainMenu: function (e) {//        获取当前显示的一级菜单标识
    var index = parseInt(e.currentTarget.dataset.index);        // 生成数组，全为hidden的，只对当前的进行显示
    var newSubMenuDisplay = initSubMenuDisplay();//        如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
    if (this.data.subMenuDisplay[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
    } else {
      newSubMenuDisplay[index] = 'hidden';
    }        // 设置为新的数组
    this.setData({
      subMenuDisplay: newSubMenuDisplay
    });
  },
  tapSubMenu: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var text = e.currentTarget.dataset.text;
    this.setData({
      range: index,
      text1: text
    })
    this.getmerchuser()
  },
  tapSubMenu2: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var text = e.currentTarget.dataset.text;
    this.setData({
      cateid: index,
      text2: text
    })
    this.getmerchuser()
  },
  tapSubMenu3: function (e) {
    var index = parseInt(e.currentTarget.dataset.index);
    var text = e.currentTarget.dataset.text;
    this.setData({
      sorttype: index,
      text3: text
    })
    this.getmerchuser()
  },
});