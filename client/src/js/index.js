import '../scss/style.scss';
import $ from 'jquery';


console.log('Minimal webpack setup, with ExpressJS backend routes');


$('.my-button-post').on('click', ()=>{
  // sending some arbitrary data to our ExpressJS backend router
  $.ajax({
    url: `/home/${$('.my-input-post').val()}`,
    type: 'post',
    success: data=>{
      console.log( data );
      $('input').val('');
    }
  });
});

$('.my-button-get').on('click', ()=>{
  // sending some arbitrary data to our ExpressJS backend router
  $.ajax({
    url: `/test/${$('.my-input-get').val()}`,
    type: 'get',
    success: data=>{
      console.log( data );
      $('input').val('');
    }
  });
});

$('.mongo-get').on('click', ()=>{
  $.ajax({
    url: `/mongo/`,
    type: 'get',
    success: data=>{
      console.log( data );
    }
  })
});

$('.mongo-find-specific').on('click', ()=>{
  // console.log('click');
  console.log(
    $('.mongo-find-specific-text').val()
  );
  $.ajax({
    url: '/mongo-find-specific/',
    type: 'get',
    data: {
      'key' : $('.mongo-find-specific-key').val(),
      'value' : typeof $('.mongo-find-specific-value').val() == 'number' ? $('.mongo-find-specific-value').val() : parseInt( $('.mongo-find-specific-value').val() )
    },
    success: data => {
      console.log( data );
    }
  });
});

$('.mongo-submit').on('click', ()=>{
  $.ajax({
    url: `/mongo-submit-data/`,
    type: 'post',
    success: data=>{
      console.log( data );
    }
  })
});
