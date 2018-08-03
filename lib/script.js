'use strict';

(function($){
  $(function() {
    const ACTIVE_CLASS = 'active';

    let $navItems = $('.nav-tab'),
        hashRequested = window.location.hash;

    var sections = [],
        scrolled_id = '';

    $navItems.each(function() {
        let href = $(this).attr('href');
        sections.push($(href));
    });

    $(window).scroll(function(e) {
        let scrollTop = $(this).scrollTop() + ($(window).height() / 2); // La position du scroll + moitié de la fenêtre
        // On parcourt nos sections stocké préalablement
        for(let i in sections){
          let $section = sections[i];
          // cette section est dépassé par le scroll ?
          if (scrollTop > $section.offset().top) {
            scrolled_id = $section.attr('id');   // On stocke son ID
          }
        }

        $navItems.removeClass(ACTIVE_CLASS)
                    .filter(`[href='#${scrolled_id}']`).addClass(ACTIVE_CLASS);

    });
  });
})($);
