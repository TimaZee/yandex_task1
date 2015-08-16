$(document).ready(function(){
	var departure = $('table tr td img[src*=air]').parent().parent(); //выбираем все строки с вылетом
	var landing = $('table tr td img[src*=landing]').parent().parent(); //все строки с прилетом
	
	$('form input').each(function(indx,element){
		$(element).attr('checked','checked');  //установили по умолчанию отмеченые чекбоксы
	});
	$('form input').click(function(){  // При снятии чекбокса убираем строки либо вылета либо прилета
		var current = $(this);
		if(current.attr('checked') == 'checked'){
			current.removeAttr('checked');
			if(current.attr('name')  == 'departure'){
					departure.css({'display':'none'});
				}
			else{
					landing.css({'display':'none'});
				}
		}
		else{
			current.attr('checked','checked');
			if(current.attr('name')  == 'departure'){
					departure.css({'display':''});
				}
			else{
					landing.css({'display':''});
				}
		}
	});
	
	$('td, th').hover(
	function(){
		var t = parseInt($(this).index()) + 1; //узнали индекс ячейки на которую наведен курсор
		var td = $('td:nth-child(' + t + ')'); //сделали выборку только с ячейками этого индекса
		var th = $('th:nth-child(' + t + ')');
		var tr = $(this).parent().children();  //выбрали все дочерние ячейки у строки в которой находится ячейка с наведением
		td.addClass('highlight'); //подсветили вертикальный столбец
		tr.addClass('highlight'); //подсветили строку
		th.addClass('highlight-th');
	},
	function(){
		var t = parseInt($(this).index()) + 1;
		var td = $('td:nth-child(' + t + ')');
		var th = $('th:nth-child(' + t + ')');
		var tr = $(this).parent().children();
		td.removeClass('highlight');
		tr.removeClass('highlight');
		th.removeClass('highlight-th');
	}
	);
	
	/*$.fn.fixMe = function() {
      return this.each(function() {
         var current = $(this),
            $t_fixed;
         function init() {
            $t_fixed = current.clone();
            $t_fixed.find("tbody").remove().end().addClass("fixed").insertBefore(current);
            resizeFixed();
         }
         function resizeFixed() {
			current.wrap('<div class="container" />');
            $t_fixed.find("th").each(function(index) {
               $(this).css("width",current.find("th").eq(index).outerWidth()+"px");
            });
         }
         function scrollFixed() {
            var offset = $(this).scrollTop(),
            tableOffsetTop = current.offset().top,
            tableOffsetBottom = tableOffsetTop + current.height() - current.find("thead").height();
            if(offset < tableOffsetTop || offset > tableOffsetBottom)
               $t_fixed.hide();
            else if(offset >= tableOffsetTop && offset <= tableOffsetBottom && $t_fixed.is(":hidden"))
               $t_fixed.show();
         }
         $(window).resize(resizeFixed);
         $(window).scroll(scrollFixed);
         init();
      });
	};*/

	
	var addSpan = function(){    // функция для добавления span в 5 ячейку каждого столбца. Спан динамически добавляется при ширине экрана менее 801 пикселя и сокращает название самолета
		var td = $('table tbody tr td:nth-child(5)');
		var length = td.length;
		var w = $(window).width();
		for(var i = 0; i < length; i++){
			var text = $(td[i]).text();
			var clone = $(td[i]).clone();
			var result = '';
			var firstLetter = text.slice(0,1);
			var ind = text.indexOf(' ');
			var secondPart = text.slice(1,ind);
			var theRest = text.slice(ind);
				if(w < 801){
					result = firstLetter + '<span>' + secondPart + '</span>' + theRest;
					$(td[i]).html(result);
					
				}
				else{
				    result = clone.text();
					$(td[i]).text(result);
				}
		}
		
	}
	
		
		$('table tbody tr').click(function(){  //функция попап объекта
			var span = $('table tbody tr td:nth-child(1) span');
			span.detach();
			var firstTd = $('table tbody tr td:nth-child(1)');
			firstTd.append('<span></span>');
			var allTd = $(this).children('td');
			var currentSpan = $(this).children('td:first').children('span');			
			var name = $('table thead tr th');
			var properties = allTd.map(function(indx,elem){
				var value = $(elem).html();
				return value;
			});
			var keys = name.map(function(indx,elem){
				var names = $(elem).text();
				return names;
			});
			
			for(var i = 0; i < keys.length; i++){
				$(currentSpan).append(keys[i]+ ' : ' + properties[i] + '<br>');
			}
			if($(this).offset().top < 500){
				if(currentSpan.is(':hidden')){
					var num = ($(window).width()/2 - currentSpan.width()/2).toString();
					currentSpan.show(1000);
					currentSpan.css({'left':num + 'px','top':'100%'});
					
				}
				$(this).mouseleave(function(){
					currentSpan.hide(1000);
				});
			}
			else{
				if(currentSpan.is(':hidden')){
					var num = ($(window).width()/2 - currentSpan.width()/2).toString();
					var height = currentSpan.height();
					currentSpan.show(1000);
					currentSpan.css({'left':num + 'px','top':'-150px'});
					
				}
				$(this).mouseleave(function(){
					currentSpan.hide(1000);
				});
			}
		});
		
	var resizeTable = function(){ //сохраняем порядок цветов
		var w = $(window).width();
			if(w < 800){
				$('tr:first th:nth-child(4),tr:first td:nth-child(4)').text('Авиакампания');
				for(var i = 4; i< 10; i++){  
					if (i%2 == 0){
						$('th:nth-child('+i+'),td:nth-child('+i+')').addClass('width800even');
					}
					else{
						$('th:nth-child('+i+'),td:nth-child('+i+')').addClass('width800odd');
					}
					
				}
			}
			else{
				$('tr:first th:nth-child(4),td:first th:nth-child(4)').text('Логотип');
				for(var i = 4; i< 10; i++){
						if (i%2 == 0){
							$('th:nth-child('+i+'),td:nth-child('+i+')').removeAttr('class');
						}
						else{
							$('th:nth-child('+i+'),td:nth-child('+i+')').removeAttr('class');
						}
				}
				
			}
	};
		
	$(window).resize(resizeTable);
	/*$("table").fixMe();*/
	if($(window).width() < 800){
		resizeTable();
		addSpan();
	}
});