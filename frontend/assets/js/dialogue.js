$('.voicebutton').on('click', function () {
  $('.wrap, a').toggleClass('active');

  if ($('.wrap').hasClass('active')) {
    // console.log('lol')
    // speak('How can I help?')

    // wait so it doesn't listen to itself
    setTimeout(startVoice, 1200)
    // startVoice()
  }
  return false;
});