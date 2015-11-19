/**
 * Created by luodan on 2015/11/19.
 * jQuery瀑布流布局实现逻辑
 */

$(window).on('load',function(){
    waterfall();
});

function waterfall(){
    //变量前添加$,就是为了区分jQuery对象
    var $boxs = $('#main>div');
    //outerWidth()宽度包括content、padding、border
    var w = $boxs.eq(0).outerWidth();
    var cols = Math.floor($(window).width()/w);
    $('#main').width(w * cols).css('margin', '0 auto');
    var hArr = [];
    $boxs.each(function(index, value){
        var h = $boxs.eq(index).outerHeight();
        if (index < cols) {
            hArr[index] = h;
        } else {
            var minH = Math.min.apply(null, hArr);
            var minHIndex = $.inArray(minH, hArr);
            //要将value转换为jQuery对象，才能使用jQuery的css()方法
            $(value).css({
                'position': 'absolute',
                'top': minH + 'px',
                'left': minHIndex * w + 'px'
            });
            hArr[minHIndex] += $boxs.eq(index).outerHeight();
        }
    })

}