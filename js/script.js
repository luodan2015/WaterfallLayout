/**
 * Created by luodan on 2015/8/23 0023.
 */
window.onload = function () {
    waterfall('main','box');

    var dataInt = {"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"}]};
    window.onscroll = function () {
        if (checkScrollSlide) {
            var oParent = document.getElementById('main');
            //将数据块渲染到当前页面的尾部
            for (var i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = 'img/' + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main','box');
        }
    }
};

function waterfall (parent, box) {
    //将main下的所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxes = getByClass(oParent, box);

    //计算整个页面显示的列数（页面宽/box的宽）
    var oBoxW = oBoxes[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);

    //设置main的宽(margin:0 auto水平居中)
    oParent.style.cssText = 'width:' + oBoxW*cols +'px; margin:0 auto;';
    //存放每一列的高度的数组
    var hArr = [];

    for (var i = 0; i < oBoxes.length; i++) {
        if (i < cols) {
            hArr.push(oBoxes[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hArr);
            //求最小值的索引值
            var index = getMinhIndex(hArr, minH);
            oBoxes[i].style.position = 'absolute';
            oBoxes[i].style.top = minH + 'px';
            //第一种设置left的方法
            //oBoxes[i].style.left = oBoxW*index + 'px';
            //第二种设置left的方法
            oBoxes[i].style.left = oBoxes[index].offsetLeft + 'px';
            hArr[index] += oBoxes[i].offsetHeight;
        }
    }
}

//根据class获取元素
function getByClass (parent, clsName) {
    //用来存储所有获取到的class为box的元素
    var boxArr = new Array(),
        oElements = parent.getElementsByTagName('*');

    for (var i = 0; i < oElements.length; i++) {
        if (oElements[i].className == clsName) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}

function getMinhIndex (arr, val) {
    for (var i in arr) {
        if (arr[i] == val) {
            return i;
        }
    }
}

//检测是否具备了滚动加载数据的条件
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBoxes = getByClass(oParent, 'box');
    var lastBoxH = oBoxes[oBoxes.length-1].offsetTop + Math.floor(oBoxes[oBoxes.length-1].offsetHeight/2);
    //混杂模式||标准模式
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;

    return (lastBoxH<scrollTop+height)?true:false;
}