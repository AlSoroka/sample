"use strict";
function inputDate (tag_id){
	var date = new Date();
	var monthes = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	var day = date.getDate();
    var month = monthes[date.getMonth()];
    var year = date.getFullYear();
	var dat_today='«' + day + '» ' + month + ' ' + year + ' г.';
	document.getElementById(tag_id).innerHTML = dat_today ;
}

function tip_note(tag_id, tip_text) {
 var obj = document.getElementById(tag_id); // берем интересующий элемент  
 var coords = obj.getBoundingClientRect(); // верхний отступ эл-та от родителя
 var note = document.createElement('div');
 note.innerHTML = tip_text;
 note.className = "note";
 note.id="tip_note";
 note.style.left = (coords.left+20) + "px";
 note.style.top = coords.bottom + "px";
 document.body.appendChild(note);
}	
 
function number_to_string(_number) {
        var _arr_numbers = new Array();
        _arr_numbers[1] = new Array('', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать');
        _arr_numbers[2] = new Array('', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто');
        _arr_numbers[3] = new Array('', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот');
        function number_parser(_num, _desc) {
                var _string = '';
                var _num_hundred = '';
                if (_num.length == 3) {
                        _num_hundred = _num.substr(0, 1);
                        _num = _num.substr(1, 3);
                        _string = _arr_numbers[3][_num_hundred] + ' ';
                }
                if (_num < 20) _string += _arr_numbers[1][parseFloat(_num)] + ' ';
                else {
                        var _first_num = _num.substr(0, 1);
                        var _second_num = _num.substr(1, 2);
                        _string += _arr_numbers[2][_first_num] + ' ' + _arr_numbers[1][_second_num] + ' ';
                }              
                switch (_desc){
                        case 0:
                                var _last_num = parseFloat(_num.substr(-1));
								var _two_last_num = parseFloat(_num.substr(-2));
								if (_last_num == 1) _string += 'рубль';
                                else if (_last_num > 1 && _last_num < 5 && _two_last_num<10 && _two_last_num>15 ) _string += 'рубля';
                                else _string += 'рублей';
                                break;
                        case 1:
                                var _last_num = parseFloat(_num.substr(-1));
                                if (_last_num == 1) _string += 'тысяча ';
                                else if (_last_num > 1 && _last_num < 5) _string += 'тысячи ';
                                else _string += 'тысяч ';
                                _string = _string.replace('один ', 'одна ');
                                _string = _string.replace('два ', 'две ');
                                break;
                        case 2:
                                var _last_num = parseFloat(_num.substr(-1));
                                if (_last_num == 1) _string += 'миллион ';
                                else if (_last_num > 1 && _last_num < 5) _string += 'миллиона ';
                                else _string += 'миллионов ';
                                break;
                        case 3:
                                var _last_num = parseFloat(_num.substr(-1));
                                if (_last_num == 1) _string += 'миллиард ';
                                else if (_last_num > 1 && _last_num < 5) _string += 'миллиарда ';
                                else _string += 'миллиардов ';
                                break;
                }
                _string = _string.replace('  ', ' ');
                return _string;
        }
        function decimals_parser(_num) {
                var _first_num = _num.substr(0, 1);
                var _second_num = parseFloat(_num.substr(1, 2));
                var _string = ' ' + _first_num + _second_num;
                if (_second_num == 1) _string += ' копейка';
                else if (_second_num > 1 && _second_num < 5) _string += ' копейки';
                else _string += ' копеек';
                return _string;
        }
        if (!_number || _number == 0) return false;
        if (typeof _number !== 'number') {
                _number = _number.replace(',', '.');
                _number = parseFloat(_number);
                if (isNaN(_number)) return false;
        }
        _number = _number.toFixed(2);
        if(_number.indexOf('.') != -1) {
                var _number_arr = _number.split('.');
                var _number = _number_arr[0];
                var _number_decimals = _number_arr[1];
        }
        var _number_length = _number.length;
        var _string = '';
        var _num_parser = '';
        var _count = 0;
        for (var _p = (_number_length - 1); _p >= 0; _p--) {
                var _num_digit = _number.substr(_p, 1);
                _num_parser = _num_digit +  _num_parser;
                if ((_num_parser.length == 3 || _p == 0) && !isNaN(parseFloat(_num_parser))) {
                        _string = number_parser(_num_parser, _count) + _string;
                        _num_parser = '';
                        _count++;
                }
        }
        if (_number_decimals) _string += decimals_parser(_number_decimals);
		//_string = _string.charAt(0).toUpperCase() + _string.substring(1);
        return _string;
}
function sum_calculate(book_count)
 {
	
	if(!book_count.match('^[0-9]+$')|| book_count==0)
	{alert('Введите нужное Вам количество книг (целое число)');
	document.getElementById("input_count").focus();
	return}
	
	var sum_contract; // Сумма счета цифрами
	var disc=0; // Сумма скидки цифрами
	var disc_str=''; // Сумма скидки словами
	var sum_str=''; // Сумма счета словами
	
	var count= (book_count>0) ? book_count: book_count=-book_count;
	var base_sum=sum_contract=count*97.60;
	if ((count>2)&&(count<6)) {
		sum_contract=count*82.96;
		disc=base_sum-sum_contract;
		disc_str="<br> <span id='disc' style='color:red;'> <b>Cкидка</b> (15%): "+disc.toFixed(2)+" руб. </span>"; }
	else if ((count>5)&&(count<11)) {
		sum_contract=count*73.20;
		disc=base_sum-sum_contract;
		disc_str="<br> <span id='disc' style='color:red;'> <b>Cкидка</b> (25%): "+disc.toFixed(2)+" руб.</span>"; }	
	else if (count>10){	
		sum_contract=count*63.44;
		disc=base_sum-sum_contract;
		disc_str="<br> <span id='disc' style='color:red;'> <b>Cкидка</b>  (35%): "+disc.toFixed(2)+" руб.</span>"; }	
	
	sum_str="<b>Сумма к оплате</b>: "+ sum_contract.toFixed(2)+" руб. ("+number_to_string(sum_contract)+")."+disc_str;
	document.getElementById("input_count").backgroundColor ="#F7F7F7";
	
	if (disc>0) {
		document.getElementById("is_sum_disc").innerHTML = "Скидка, <br>руб.";
		document.getElementById("sum_disc").innerHTML = disc.toFixed(2);	
		document.getElementById("skidki").innerHTML = '';
		document.getElementById("tip_note").style.visibility="hidden" ;
		}
	else {	
		document.getElementById("is_sum_disc").innerHTML = "Сумма <br>НДС, руб.";
		document.getElementById("sum_disc").innerHTML = "&mdash;";	
		}
	document.getElementById("sum_k_opl").innerHTML = sum_contract.toFixed(2);
	
	
	document.getElementById("sum_contract").innerHTML = sum_str ;
	
	//alert (disc_str + '\n' + sum_str);
		
}

function printSchet() {
	var hid_elements="zvonite, skidki, tip_note, raspech, knopka1, knopka2";
	var vse=hid_elements.split(',');
	for (var i = 0; i < vse.length; i++)
		{ var exist=document.getElementById(vse[i].trim());
		  if (exist)
		  {
			document.getElementById(vse[i].trim()).style.visibility="hidden" ; 		
			}
		}	
	document.getElementById("fon").style.background = "#ffffff";
	if (document.getElementById("disc")) 
	{
		document.getElementById("disc").style.color ="black";
	}
	document.body.style.background = "#ffffff";
	document.body.style.background = "#ffffff";
	
	window.print();

	document.getElementById("knopka2").innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;<a class="bot8" href="javascript:(window.close());"> Закрыть окно</a>' ;
	document.getElementById("knopka2").style.visibility="visible" ;
	document.getElementById("knopka1").style.visibility="visible" ;

}


