$(document).ready(function () {
  // var myflow = document.getElementById("#myflow");
  $svg = $('#svg');
  var $wrapper = $('.tab-wrapper'),
    $allTabs = $wrapper.find('.tab-content > div'),

    $tabMenu = $wrapper.find('.tab-menu li'),
    $line = $('<div class="line"></div>').appendTo($tabMenu);
  // console.log($wrapper,$allTabs);
  $allTabs.not(':first-of-type').hide();
  $tabMenu.filter(':first-of-type').find(':first').width('100%')

  $tabMenu.each(function (i) {
    $(this).attr('data-tab', 'tab' + i);
  });

  $allTabs.each(function (i) {
    $(this).attr('data-tab', 'tab' + i);
  });

  // var nowTab;

  $tabMenu.on('click', function () {  //点击tab页显示对应的内容

    // console.log($(this));
    var dataTab = $(this).data('tab'),
      $getWrapper = $(this).closest($wrapper);
    // console.log($getWrapper);
    $getWrapper.find($tabMenu).removeClass('active');
    $(this).addClass('active');

    $getWrapper.find('.line').width(0);
    $(this).find($line).animate({
      'width': '100%'
    }, 'fast');
    var $divs = $getWrapper.find($allTabs)
    $divs.hide();  //隐藏所有的div
    $divs.filter('[data-tab=' + dataTab + ']').show(); //显示当前被点击的tab对应的div
    var $showDiv = $divs.filter('[data-tab=' + dataTab + ']');
    var $allSvgs = $showDiv.find('.svg_all > li');  //获取对应的div下所有的svg

    var flag = false;
    $allSvgs.each(function() {
      $(this).on('mousedown',function(e){
        flag = true;
        var pos = this.getBoundingClientRect();
        var disx = e.clientX - pos.left;
        var disy = e.clientY - pos.top;
        var w = pos.width;
        var h = pos.height;
        // console.log($(this));
        // var $cloneSvg = $(this).find('svg > rect').clone(true);
        var $cloneItem = $(this).clone(true);
        
        console.log( $cloneItem );
        $(document.body).append( $cloneItem );
        // console.log( disx,disy, cloneSvg.id);

        $cloneItem.on("mousemove",function(e) {
          // debugger;  
          if( flag ) {
            var nowx = e.clientX - disx;
            var nowy = e.clientY - disy;
            // $cloneSvg.css("x",nowx).css("y",nowy ).css("opacity","1");
            $cloneItem.style.top = nowx + "px";
            $cloneItem.style.left = nowy + "px";
          }
        });

        $cloneItem.on("mouseup",function() {
          var x = $cloneSvg.offsetLeft;
          var y = $cloneSvg.offsetTop;
          x = Math.round(x/w)*w;
          y = Math.round(y/h)*h;
          
          // $cloneItem.css("x",x).css("y",y);
          $cloneItem.style.top = x + "px";
          $cloneItem.style.left = y + "px";
          flag = false;
          // $svg.remove( $cloneSvg );
        });
        return false;
      });
    });
    

    
    // document.getElementById("tube1").addEventListener("onmousemove", function(event) {
    //   debugger;
    //   // 存储拖拽数据和拖拽效果...
    //   event.dataTransfer.setData("Text",ev.target.id);
    // }, false);

  });

  // function takeAllSvg(obj) {
  //   $allSvg = obj.
  // }

}); //end ready