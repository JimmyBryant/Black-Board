/*
*   menu.js
*/
function getNewsletterHeight(height) {
    var navHeight = height + 11;
    var newHeight = $("#wrapper-t-r").height() - height - 23;
    var secHeight = (newHeight - $('#mini-home-newsletter section').height()) / 2;
    $('#mini-home-newsletter').css({ 'margin-top': navHeight, "height": newHeight - secHeight, "padding-top": secHeight < 0 ? 0 : secHeight });
}

$.fn.litbMenuShow = function (options) {
    var me = this, $this = $(this),
	defaults = {
	    'on': false,
	    'width': [0, 226, 402, 574, 750],
	    'height': -1,
	    'isFrist': true
	};
    var browser = $.browser,
        isIE9 = browser.msie === true && browser.version === '9.0';
    me.options = $.extend(defaults, options);
    this.getMenuHeight = function (obj) {
        return Math.max(me.options.height, $('.cate-menu-sub', obj).height(), $('.cate_menu_hero', obj).height(), $('.litb-cate-menu-specialoffer', obj).height());
    };
    this.setNewsletterHeight = function (height) {
        $(document).ready(function () {
            if ($('#mini-home-newsletter')[0]) setTimeout(function () { getNewsletterHeight(height) }, 200);
        });
    };
    this.show = function () {

        $('.cate-menu-out', $this).each(function (m) {
            var $me = $(this);
            var mh = 32;
            var elm = $('.cate-menu-sub>dl', this);
            var size = Math.ceil(elm.size() / 2), mSize = 0, rSize = 0;
            me.options.menuHeight = $('.cate-menu').height();
            rSize = $('.litb-cate-menu-specialoffer', this).size() > 0 ? 176 : 0;
            mSize = $('.cate_menu_hero', this).size() > 0 ? 172 : 0;
            if (elm.size() == 0) {
                $('.cate_menu_hero', this).addClass('cate_menu_hero_left');
                if ($('.cate_menu_hero', this).size() > 0) mSize += 46;
            } else {
                if ($('.cate_menu_hero', this).size() > 0 && $('.litb-cate-menu-specialoffer', this).size() == 0) {
                    mSize += 4;
                }
            }
            $('.cate_menu_hero', this).css({ 'right': rSize + 'px' });
            var width = me.options['width'][size] + rSize + mSize;

            $('.cate-menu-in', this).css({ 'width': width + "px", 'top': -m * mh + 'px' });
            $(this).css({ 'width': width + 240 + "px" });
            elm.each(function (n) {
                if (n != 0) {
                    if (n == size) $(this).before('<br class="clear">');
                    if (n >= size) $(this).addClass('bottop');
                }
            });
            $(this).hover(function () {
                $('.cate-menu-in', this).css({ 'z-index': 50 }).show();
                $(".cate-menu-in").filter(function (index) {
                    if (m != index) $(".cate-menu-in").eq(index).hide();
                });
                $('h2 em', this).show();
                $('#hotsNow').css({ 'margin-top': me.getMenuHeight($me) + 'px' });
                me.setNewsletterHeight(me.getMenuHeight($me));
                // $('.cate-menu').css({ 'height': me.getMenuHeight($me) + 'px' });
                if (me.options.isFrist) {
                    $('.cate-menu').animate({ 'width': width + 240 + "px" }, 200);
                    me.options.isFrist = false;
                } else {
                    $('.cate-menu').animate({ 'width': width + 240 + "px" },0).stop();
                }

            }, function () {
                //$('.cate-menu-in',this).hide();
                $('h2 em', this).hide();
                //if(me.options.menuDeHeight == 0) me.options.menuDeHeight = me.options.height;
                if (isIE9) {
                    $this.hide();
                    // $('.cate-menu').css({ 'height': me.options.height + 'px', 'z-index': -1 });
                    $this.show();
                } else {
                    // $('.cate-menu').css({ 'height': me.options.height + 'px', 'z-index': -1 });
                }
                //	if(isIE9) $this.addClass('hover');
                //$('.cate-menu').animate({'height':me.options.menuDeHeight+'px','z-index':-1},0,function(){if(isIE9) $this.removeClass('hover');});
                //if(isIE9) $this.hide().show().css({'z-index':-1});
            });
            me.options.height += mh;
        });
        if (browser.msie === true) $('.cate-menu-out:last', $this).addClass('last');
    };
    this.getHtml = function (data, elm, tab) {
        var _str = '', _target = data[tab + '_tab_target'] == true ? ' target="_blank"' : '';
        data = data[tab];
        if (data && data != '') {
            _str += '<div class="' + elm + '">';
            for (var t = 0; t < data.length; t++) {
                var _lClass = data[t]['point'] ? ' class="red"' : '';
                var _href = data[t]['url'] == false ? '' : data[t]['url'];
                _str += '<dl>';
                if (data[t]["text"] != false) {
                    var _nofollow = data[t]["nofollow"] == true ? 'rel="nofollow"' : '';
                    if (tab == 'right') {
                        _str += '<dt>' + data[t]['text'] + '</dt>';
                    } else {
                        _str += '<dt><h3><a ' + _nofollow + _target + ' ctr="{seat:\'' + data[0]["position"] + '\'}" href="' + _href + '"' + _lClass + '>' + data[t]['text'] + '</a></h3></dt>';
                    }
                }
                if (data[t]['children'] && data[t]['children'] != '') {
                    var _data = data[t]['children'];
                    for (var p = 0; p < _data.length; p++) {
                        var __nofollow = _data[p]["nofollow"] == true ? 'rel="nofollow"' : '';
                        var __lClass = _data[p]['point'] ? ' class="red"' : '';
                        var __href = _data[p]['url'] == false ? '' : _data[p]['url'];
                        if (tab == 'right') {
                            _str += '<dd><a ' + _nofollow + _target + ' ctr="{seat:\'' + data[0]['position'] + '\'}"  href="' + __href + '"' + __lClass + '>' + _data[p]['text'] + '</a></dd>';
                        } else {
                            _str += '<dd><h4><a ' + _nofollow + _target + ' ctr="{seat:\'' + data[0]['position'] + '\'}"  href="' + __href + '"' + __lClass + '>' + _data[p]['text'] + '</a></h4></dd>';
                        }
                    }
                }
                _str += '</dl>';
            }
            _str += '</div>';
        }
        return _str;

    };
    this.init = function () {
        var _data = me.options.data['menu'];
        for (var i = 0; i < _data.length; i++) {
            var html = '';
            html += me.getHtml(_data[i], 'cate-menu-sub', 'left');
            html += me.getHtml(_data[i], 'cate_menu_hero', 'middle');
            html += me.getHtml(_data[i], 'litb-cate-menu-specialoffer', 'right');
            $('.cate-menu-in').eq(i).html(html);
        }
        me.show();
        me.setNewsletterHeight(me.options.height);
    };
    me.init();

    if ($this.hasClass('cate-menu-hover')) {
        $('#show-all-category').on('mouseover mouseout',function(e){
            if(e.type=='mouseover'){
                $this.stop().fadeIn();
            }else if(e.type="mouseout"){
                if(!$.contains(me[0],e.relatedTarget)){
                    $this.stop().hide();
                }
            }
        });
        $this.on('mouseleave',function(e){
            var relobj = e.relatedTarget;
            if(document.getElementById('show-all-category')!==relobj){
               $this.stop().hide();
            }
        })
    } else {
        //me.options.menuDeHeight = $('.cate-menu').height();
        $this.hover(function () {
        }, function () {
            me.options.isFrist = true;
            //$('.cate-menu').stop().css({'width':240+"px"});
            if (isIE9) {
                $this.hide();
                $('.cate-menu').stop().css({ 'width': 240 + "px" });
                $this.show();
            } else {
                $('.cate-menu').stop().css({ 'width': 240 + "px" });
            }
            $('#hotsNow').css({ 'margin-top': me.options.height + 'px' });
            me.setNewsletterHeight(me.options.height);
        });
    }
};