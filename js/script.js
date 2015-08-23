/**
 * Created by luodan on 2015/8/23 0023.
 */
window.onload = function () {
    waterfall('main','box');
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