
/**
 * Tab switch: provides switching tabs on click, adding 'active' classes to 'title' and 'content' tag
 *
 * - Tags structure:
 *      <div class="wrapper">
 *          <ul class="titles">
 *              <li>Title 1</li>
 *              <li>Title 2</li>
 *          </ul>
 *          <ul class="contents">
 *              <li>Long content 1</li>
 *              <li>Long content 2</li>
 *          </ul>
 *      </div>
 * - INIT on document ready: tabsSwitch.init({titles: '.wrapper .titles li', contents: '.wrapper .bodies li' });
 * - Use settings.debug = true; for debug errors
 * - tabsSwitch using selectors by default if no selectors passed on init
 *
 * TODO: Add simple CSS
 */
(function(window){
    var _plugin = {},
        _pluginName = 'tabsSwitch';
    _plugin[_pluginName] = function(){
        var _that = this;
        this.settings = {
            debug: true,
            titles: '#titles > li',
            contents: '#contents > li',
            firstTabActive: true
            ,  simpleCSS: true  // N/A
        }; //settings

        this.init = function(settings){
            //Setting things
            if($(settings.titles).length == 0){
                return;
            }

            _that.settings = $.extend(_that.settings,settings || {});

            if($(_that.settings.titles).length == 0){
                _that.log('No tabs "' + _that.settings.titles + '" selector found');
                return;
            }

            if($(_that.settings.contents).length == 0){
                _that.log('No contents "' + _that.settings.contents + '" selector found');
                return;
            }

            var _titles = $(_that.settings.titles);
            var _contents = $(_that.settings.contents);

            if(_that.settings.firstTabActive){
                $(_titles[0]).addClass('active');
                $(_contents[0]).addClass('active');
            }

            _titles.click(function(){

                var _title = $(this);
                var indActive = _title.index();
                _title.siblings().removeClass('active');
                _title.addClass('active');
                var _contents = $(_that.settings.contents);
                _contents.each(function(){
                    var currContent = $(this);
                    if(indActive == currContent.index()){
                        currContent.addClass('active');
                    } else {
                        currContent.removeClass('active');
                    }
                });
            });
        }
        this.log = function(msg){
            if(!_that.settings.debug) return;
            console.log(msg);
        };//log
    };
    window[_pluginName] = new _plugin[_pluginName];
}(window));

