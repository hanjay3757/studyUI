const ani1 = gsap.timeline();
ani1
  .from(
    '#section1 .t1',
    {
      autoAlpha: 0,
      duration: 1,
      y: 50,
    },
    '+=1'
  )
  .from(
    '#section1 .t2',
    {
      autoAlpha: 0,
      duration: 1,
      y: 50,
    },
    '+=1'
  )
  .from(
    '#section1 .t3',
    {
      autoAlpha: 0,
      duration: 1,
      y: 50,
    },
    '+=1'
  )
  .from(
    '#section1 .t4',
    {
      autoAlpha: 0,
      duration: 1,
      y: 50,
    },
    '+=1'
  )
  .from(
    '#section1 .t5',
    {
      autoAlpha: 0,
      duration: 1,
      y: 50,
    },
    '+=1'
  )
  .from(
    '#section1 .t6',
    {
      autoAlpha: 0,
      duration: 1,
      y: 50,
    },
    '+=1'
  )
  .from(
    '#section1 .t7',
    {
      autoAlpha: 0,
      duration: 1,
      y: 50,
    },
    '+=1'
  )
  .from(
    '#section1 .t8',
    {
      autoAlpha: 0,
      duration: 1,
      y: 50,
    },
    '+=1'
  );
ScrollTrigger.create({
  animation: ani1,
  trigger: '#section1',
  start: 'top top',
  end: '+=8000',
  scrub: true,
  pin: true,
  anticipatherPin: 1,
  markers: true,
});
