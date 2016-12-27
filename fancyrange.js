(function($) {


    $.fn.fancyrange = function() {
        return this.each(function() {
            $(this).hide();

            var mode = $(this).data("mode") || "normal";
            var label = $(this).data("label") || "";
            var isDrag = false;
            var minval = Number($(this).prop("min"));
            var maxval = Number($(this).prop("max"));
            var step = parseFloat($(this).prop('step')) || 1.0;
            var decimal_digits = 0;
            var x_str = step.toString().split('.')[1];
            if (x_str != undefined) {
                decimal_digits = x_str.length;
            }

            if (mode == "normal") {

                var rangeElem = $(this);

                if (minval < 0) {
                    $('<div class="ctrlBar" ><div class="valBarminus"></div><div class="valBarplus"></div></div>').insertAfter($(this))
                    var ctrlbar = $(this).next();
                    var valbarminus = ctrlbar.find(".valBarminus");
                    var valbarplus = ctrlbar.find(".valBarplus");

                    var updatebar = function(x) {

                        var position = x - ctrlbar.offset().left;
                        var percentage = 100 * position / ctrlbar.width();



                        if (percentage > 100) {
                            percentage = 100;
                        }
                        if (percentage < 0) {
                            percentage = 0;
                        }
                        if (percentage < 50) {
                            var percentminus = 50 - percentage;

                            valbarminus.css('width', percentminus + '%');
                            valbarplus.css('width', 0)
                            var pc = (minval * percentminus / 50).toFixed(decimal_digits);
                            rangeElem.val(pc)
                            ctrlbar.attr('data-content', label + " " + pc);
                        } else if (percentage > 50) {
                            var percentplus = percentage - 50;

                            valbarplus.css('width', percentplus + '%');
                            valbarminus.css('width', 0)
                            var pc = (maxval * percentplus / 50).toFixed(decimal_digits);
                            rangeElem.val(pc)
                            ctrlbar.attr('data-content', label + " " + pc);
                        } else if (percentage == 50) {
                            valbarplus.css('width', "1px");
                            valbarminus.css('width', "1px");
                            rangeElem.val(0)
                            ctrlbar.attr('data-content', label + " " + 0);
                        }


                    };

                    ctrlbar.mousedown(function(e) {
                        isDrag = true;
                        updatebar(e.pageX);
                    });
                    $(document).mouseup(function(e) {
                        if (isDrag) {
                            isDrag = false;
                            updatebar(e.pageX);
                        }
                    });
                    $(document).mousemove(function(e) {
                        if (isDrag) {
                            updatebar(e.pageX);
                        }
                    });
                     ctrlbar.on('touchstart',function(e){
                         isDrag = true;
                        updatebar(e.originalEvent.touches[0].pageX);
                    });
                    $(document).on('touchmove.rem ', function(e) {
                          if (isDrag) {
                            updatebar(e.originalEvent.touches[0].pageX);
                              
                        }
                    });
                      $(document).on('touchmove.rem ', function(e) {
                        if (isDrag) {
                            isDrag = false;
                            updatebar(e.originalEvent.touches[0].pageX);
                        }
                    });



                } else {

                    $('<div class="ctrlBar"><div class="valBar"></div></div>').insertAfter($(this))
                    var ctrlbar = $(this).next();
                    var valbar = ctrlbar.find(".valBar");
                    var pseudoelem = $(this).next()


                    var updatebar = function(x) {

                        var position = x - ctrlbar.offset().left;
                        var percentage = 100 * position / ctrlbar.width();


                        if (percentage > 100) {
                            percentage = 100;
                        }
                        if (percentage < 0) {
                            percentage = 0;
                        }

                        //Update progress bar and video currenttime
                        valbar.css('width', percentage + '%');
                        var pc = (maxval * percentage / 100).toFixed(decimal_digits);
                        rangeElem.val(pc)
                        ctrlbar.attr('data-content', label + " " + pc);
                    };

                    ctrlbar.mousedown(function(e) {
                        isDrag = true;
                        updatebar(e.pageX);
                    });
                    $(document).mouseup(function(e) {
                        if (isDrag) {
                            isDrag = false;
                            updatebar(e.pageX);
                        }
                    });
                    $(document).mousemove(function(e) {
                        if (isDrag) {
                            updatebar(e.pageX);
                        }
                    });
                     ctrlbar.on('touchstart',function(e){
                         isDrag = true;
                        updatebar(e.originalEvent.touches[0].pageX);
                    });
                    $(document).on('touchmove.rem ', function(e) {
                          if (isDrag) {
                            updatebar(e.originalEvent.touches[0].pageX);
                              
                        }
                    });
                      $(document).on('touchmove.rem ', function(e) {
                        if (isDrag) {
                            isDrag = false;
                            updatebar(e.originalEvent.touches[0].pageX);
                        }
                    });




                }
            } else if (mode == "vertical") {

                var rangeElem = $(this);

                if (minval < 0) {
                    $('<div class="ctrlBar-vertical"><div class="valBarplus-vertical"></div><div class="valBarminus-vertical"></div></div>').insertAfter($(this))
                    var ctrlbar = $(this).next();
                    var valbarminus = ctrlbar.find(".valBarminus-vertical");
                    var valbarplus = ctrlbar.find(".valBarplus-vertical");


                    var updatebar = function(x) {

                        var position = x - ctrlbar.offset().top;

                        var percentage = 100 * position / ctrlbar.height();
                        var percentage = 100 - percentage;

                        if (percentage > 100) {
                            percentage = 100;
                        }
                        if (percentage < 0) {
                            percentage = 0;
                        }
                        if (percentage < 50) {
                            var percentminus = 50 - percentage;

                            valbarminus.css('height', percentminus + '%');
                            valbarplus.css('height', 0)
                            var pc = (minval * percentminus / 50).toFixed(decimal_digits);
                            rangeElem.val(pc)
                            ctrlbar.attr('data-content', label + " " + pc);
                        } else if (percentage > 50) {
                            var percentplus = percentage - 50;

                            valbarplus.css('height', percentplus + '%');
                            valbarminus.css('height', 0)
                            var pc = (maxval * percentplus / 50).toFixed(decimal_digits)
                            rangeElem.val(pc)
                            ctrlbar.attr('data-content', label + " " + pc);
                        } else if (percentage == 50) {
                            valbarplus.css('height', "1px");
                            valbarminus.css('height', "1px");
                            rangeElem.val(0)
                            ctrlbar.attr('data-content', label + " " + 0);
                        }


                    };

                    ctrlbar.mousedown(function(e) {
                        isDrag = true;
                        updatebar(e.pageY);
                    });
                    $(document).mouseup(function(e) {
                        if (isDrag) {
                            isDrag = false;
                            updatebar(e.pageY);
                        }
                    });
                    $(document).mousemove(function(e) {
                        if (isDrag) {
                            updatebar(e.pageY);
                        }
                    });
                    
                    ctrlbar.on('touchstart',function(e){
                         isDrag = true;
                        updatebar(e.originalEvent.touches[0].pageY);
                    });
                    $(document).on('touchmove.rem ', function(e) {
                          if (isDrag) {
                            updatebar(e.originalEvent.touches[0].pageY);
                              
                        }
                    });
                      $(document).on('touchmove.rem ', function(e) {
                        if (isDrag) {
                            isDrag = false;
                            updatebar(e.originalEvent.touches[0].pageY);
                        }
                    });

                } else {
                    $('<div class="ctrlBar-vertical"><div class="valBar-vertical"></div></div>').insertAfter($(this))
                    var ctrlbar = $(this).next();
                    var valbar = ctrlbar.find(".valBar-vertical");


                    var updatebar = function(x) {

                        var position = x - ctrlbar.offset().top;

                        var percentage = 100 * position / ctrlbar.height();
                        var percentage = 100 - percentage;

                        if (percentage > 100) {
                            percentage = 100;
                        }
                        if (percentage < 0) {
                            percentage = 0;
                        }

                        //Update progress bar and video currenttime
                        valbar.css('height', percentage + '%');
                        var pc = (maxval * percentage / 100).toFixed(decimal_digits);
                        rangeElem.val(pc)
                        ctrlbar.attr('data-content', label + " " + pc);
                    };

                    ctrlbar.mousedown(function(e) {
                        isDrag = true;
                        updatebar(e.pageY);
                    });
                    $(document).mouseup(function(e) {
                        if (isDrag) {
                            isDrag = false;
                            updatebar(e.pageY);
                        }
                    });
                    $(document).mousemove(function(e) {
                        if (isDrag) {
                            updatebar(e.pageY);
                        }
                    });
                     ctrlbar.on('touchstart',function(e){
                         isDrag = true;
                        updatebar(e.originalEvent.touches[0].pageY);
                    });
                    $(document).on('touchmove.rem ', function(e) {
                          if (isDrag) {
                            updatebar(e.originalEvent.touches[0].pageY);
                              
                        }
                    });
                      $(document).on('touchmove.rem ', function(e) {
                        if (isDrag) {
                            isDrag = false;
                            updatebar(e.originalEvent.touches[0].pageY);
                        }
                    });
                }



            }

            rangeElem.on("input change", function() {
                if (mode == "normal") {
                    if (minval < 0) {
                        var val = Number(rangeElem.val());

                        if (val < 0) {
                            var percentage = val / minval * 50;
                            valbarminus.css('width', percentage + '%');
                            valbarplus.css("width", 0)
                        } else if (val > 0) {
                            var percentage = val * maxval / 200;
                            valbarplus.css('width', percentage + '%');
                            valbarminus.css("width", 0)
                        } else if (val == 0) {
                            valbarplus.css('width', "1px");
                            valbarminus.css('width', "1px");
                        }

                    } else {
                        var val = Number(rangeElem.val());
                        var percentage = val * maxval / 100;
                        valbar.css('width', percentage + '%');
                    }
                } else if (mode == "vertical") {

                    if (minval < 0) {
                        var val = Number(rangeElem.val());

                        if (val < 0) {
                            var percentage = val / minval * 50;
                            valbarminus.css('height', percentage + '%');
                            valbarplus.css("height", 0)
                        } else if (val > 0) {
                            var percentage = val * maxval / 200;
                            valbarplus.css('height', percentage + '%');
                            valbarminus.css("height", 0)
                        } else if (val == 0) {
                            valbarplus.css('height', "1px");
                            valbarminus.css('height', "1px");
                        }

                    } else {
                        var val = Number(rangeElem.val());
                        var percentage = val * maxval / 100;
                        valbar.css('height', percentage + '%');
                    }


                }
                ctrlbar.attr('data-content', label + " " + rangeElem.val());
            });

            $(this).trigger("change")
        });
    };



})(jQuery);
