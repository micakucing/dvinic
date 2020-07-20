/*
* ----------------------------------------------------------------------------------------
Author       : Rama Hardian Sidik
Template Name: Dvinic - Personal Template
Version      : 1.0
* ----------------------------------------------------------------------------------------
*/

const dvinicinit = (function() {
    "use strict";
    var Id;
    var Window = $(window);
    var Document = $(document);
    var BodyElement = $('html, body');
    var Menulist = $(".listmenu");
    var MenuHeight = Menulist.outerHeight() + 3;
    var menuItems = Menulist.find("li > a");
    var menuItemsmobile = Menulist.find("li > a");
    var OverlayClose = $('.menu-mobile-overlay');
    var Slide1 = $('#testimonial-wrap');
    var Header = $('#main-headderpage');
    var WarpMenuMobile = $('.mobilenav-wrap');
    var ToggleMenu = $('.menumobile-icon');
      var Form = $('#formcontact');


    let isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    if (!isMobile.any()) {

        Window.stellar({
            horizontalScrolling: false,
            verticalOffset: 40,
            responsive: true,
            parallaxBackgrounds: true,
            parallaxElements: true,
            hideDistantElements: false
        });

    }





    // scroll spy init ------------------------
    const ScrollSpy = function(event) {
        // Anchors menu items
        let scrollItems = menuItems.map(function() {
            let item = $($(this).attr("href"));
            if (item.length) { return item; }
        });
        let fromTop = Window.scrollTop() + MenuHeight;
        // id of current item
        let cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        // id of the element
        cur = cur[cur.length - 1];
        let id = cur && cur.length ? cur[0].id : "";
        if (Id !== id) {
            Id = id;
            // Set/remove active class
            menuItems
                .parent().removeClass("active")
                .end().filter("[href=#" + id + "]").parent().addClass("active");
        }
    }


    /* carousel review  Init
                ============================ */
    const reviewclient = function(event) {

        Slide1.owlCarousel({
            autoplay: false,
            center: true,
            loop: true,
            dots: true,
            items: 1,
            nav: true,
            navText: [
                '<i class="fa fa-long-arrow-left " aria-hidden="true"></i>',
                '<i class="fa fa-long-arrow-right " aria-hidden="true"></i>'
            ],
            navContainer: '.wrap-slidetesti .custom-nav',
            responsiveClass: true,
            responsive: {
                0: {
                    items: 2,
                    loop: false,
                    margin: 20,

                },
                590: {
                    items: 1
                }
            }
        });
    }


    //init contact form  -------
    const subform = function() {
        Form.validate({
            rules: {
                email: {
                    required: true,
                    email: true
                },
                name: {
                    required: true,
                    minlength: 5
                },
                message: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: 'Check your email input'
                },
                name: {
                    required: 'Please check your first name input'
                },
                message: {
                    required: 'Please write something for us'
                }
            },
            submitHandler: function(form) {
                $.ajax({
                    type: "POST",
                    url: "https://mailpostexample.herokuapp.com/",
                    data: $(form).serialize(),
                    beforeSend: function() {
                        $('input, textarea').attr('readonly', "readonly");
                        formload.show()
                    },
                    success: function(msg) {
                        if (msg == 'OK') {
                            $('.loader').hide()
                            Modalpopup.modal('show');
                            Modalbody.html('<p>Thanks, Your message success sent </p>')
                            Form.trigger("reset");
                            $('input, textarea').attr('readonly', "false");
                        } else {
                            formload.hide()
                            Modalpopup.modal('show');
                            Modalbody.html('<p>' + msg + '</p>')
                            $('input, textarea').attr('readonly', "false");
                            Form.trigger("reset");
                        }
                    }
                });
                return false;
            }
        });
    }



    $('.btfilter').on('click', function() {
        var t = $(this).attr('data-fil')
        $(this).addClass('actives').siblings().removeClass('actives');

        $(".item").each(function(index) {
            $(".item").hide();
            if (t == '') {
                $(".item").show();
            } else {
                $(".item[data-filter=" + t + "]").show();
            }
        });
    })

    // fixed header init ----------------------
    const fixi = function() {
        if (Window.scrollTop() > 500) {
            Header.addClass('fixi');
        } else {
            Header.removeClass('fixi');
        }

    }
    //navbar mobile open
    ToggleMenu.click(function() {
        WarpMenuMobile.show(200);
        WarpMenuMobile.animate({ right: "0px" }, 500);
        OverlayClose.fadeIn();
        BodyElement.addClass('fixed')
    });
    //navbar mobile overlay close
    OverlayClose.click(function() {
        WarpMenuMobile.animate({ right: "-500px" }, 500);
        OverlayClose.fadeOut();
        WarpMenuMobile.hide(500);
        BodyElement.removeClass('fixed')
    });

    //link menu navigator scroll
    menuItems.on("click", function(e) {
        var anchor = $(this);
        BodyElement.stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 50
        }, 1000, "easeInOutExpo");

        e.preventDefault();
    });


    //link menu navigator scroll
    menuItemsmobile.on("click", function(e) {
        var anchor = $(this);
        BodyElement.stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 0
        }, 1000, "easeInOutExpo");

        WarpMenuMobile.animate({ right: "-500px" }, 500);
        OverlayClose.fadeOut();
        WarpMenuMobile.hide(500);
        BodyElement.removeClass('fixed')
        e.preventDefault();
    });

    //on document ready 
    const DocumentReady = function(event) {
        reviewclient()
        subform()
    }


    //on window scroll 
    const Scrollwindow = function(e) {
        // function windows on scroll event
        ScrollSpy()
        fixi()
    }

    //binds event ----------------------------
    const bindEvents = function() {
        Document.on('ready', DocumentReady);
        Window.on('scroll', Scrollwindow);


    };

    // init - initilizes elements and events
    const AppInit = function() {
        bindEvents();
    };

    return {
        AppInit: AppInit
    };


}());

//initilizing app
dvinicinit.AppInit();