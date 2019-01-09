import '../scss/style.scss';
import $ from 'jquery';


console.log('Minimal webpack setup');

$('.my-button-post').on('click', ()=>{
  // sending some arbitrary data to our ExpressJS backend router
  $.ajax({
    url: `/home/${$('.my-input-post').val()}`,
    type: 'post',
    success: data=>{
      console.log( data );
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
    }
  });
});
