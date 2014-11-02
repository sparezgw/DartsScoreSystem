$(function() {
  var person = 0
    , sum = 0;

  function minus() {
    var sum = $("#sum").text()
      , tips = $("#tips").text()
      , $div = $(".list").eq(person)
      , $body = $div.find('tbody')
      , $total = $div.find("h1")
      , $btn = $div.find(".button")
      , total = $total.text()
      , order = $body.children("tr").size()+1;
    if (total-sum<0) {
      $body.append('<tr><td>'+order+'</td><td>'+tips+'</td><td><span class="red">'+sum+'</span></td></tr>');
      if($btn.css('display') == 'none') $btn.css('display', 'inline-block');
    } else{
      $total.text(total-sum);
      $body.append('<tr><td>'+order+'</td><td>'+tips+'</td><td>'+sum+'</td></tr>');
      if($btn.css('display') == 'none') $btn.css('display', 'inline-block');
    };
    dialog.dialog("close");
  }
  function reset() {
    $("#sum").text('0');
    $("#tips").text('-');
    sum = 0;
  }
  dialog = $("#score").dialog({
    autoOpen: false,
    height: 410,
    width: 350,
    modal: true,
    buttons: {
      OK: minus,
      Reset: function() {
        reset();
      }
    },
    close: function() {
      reset();
    }
  });
  cn = $("#name").dialog({
    autoOpen: false,
    height: 240,
    width: 300,
    modal: true,
    buttons: {
      OK: function() {
        $(this).find('input').each(function(index, el) {
          $(".list").eq(index).find("h3").text($(el).val())
        });
        $(this).dialog("close");
      },
      Close: function() {
        $(this).dialog("close");
      }
    }
  });
  ct = $("#total").dialog({
    autoOpen: false,
    height: 150,
    width: 300,
    modal: true,
    buttons: {
      OK: function() {
        $(".list").find('h1').text($(this).find('input').val())
        $(this).dialog("close");
      },
      Close: function() {
        $(this).dialog("close");
      }
    }
  });


  $("h3").on("click", function() {
    person = $(this).data('id');
    dialog.dialog("open");
  });
  $("#radio").buttonset();
  $("input[type='button']").button().click(function(event) {
    event.preventDefault();
    var m = $(":checked").val()
      , v = $(this).val()
      , str = (m==1)?v:v+'*'+m
      , tips = $("#tips").text();
    sum += m*v;
    $("#sum").text(sum);
    $("#tips").text((tips=='-')?str:tips+' - '+str);
  });
  $(".button").button().on('click', function(event) {
    event.preventDefault();
    var $trs = $(this).prev().find("tbody").children("tr")
      , $last = $trs.last()
      , sum = $last.children("td").last().text()
      , $total = $(this).parent().find("h1")
      , total = $total.text();
    $last.remove();
    $total.text(total*1+sum*1)
    if($trs.size() == 1) $(this).css('display', 'none');
  });
  $("h1 span").on('click', function(event) {
    event.preventDefault();
    cn.dialog("open");
  });
  $(".list:last h1").on('click', function(event) {
    event.preventDefault();
    ct.dialog("open");
  });
});