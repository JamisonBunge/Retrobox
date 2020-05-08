$('.voicebutton').on('click', function () {
  $('.wrap, a').toggleClass('active');

  if ($('.wrap').hasClass('active')) {
    console.log('lol')
    startVoice()
  }
  return false;
});