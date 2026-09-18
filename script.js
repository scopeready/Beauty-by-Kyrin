(() => {
  'use strict';
  document.documentElement.classList.add('js');

  // Analytics. No-ops entirely until a real measurement ID is configured —
  // nothing is queued, nothing is sent, and no personal detail is ever a param.
  const track = (event, params) => {
    try { if (typeof window.gtag === 'function') window.gtag('event', event, params || {}); }
    catch { /* analytics must never break the page */ }
  };
  const closest = (target, selector) => target instanceof Element ? target.closest(selector) : null;
  document.addEventListener('click', e => {
    const link = closest(e.target, 'a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (href.startsWith('tel:')) track('call_click');
    else if (href.startsWith('sms:')) track('text_click');
    else if (href.startsWith('/book') || link.classList.contains('nav-book')) track('book_click', { location: link.className || 'link' });
    else if (href.includes('google.com/maps')) track('directions_click');
    else if (href.includes('instagram.com')) track('instagram_click');
    else if (href.startsWith('/services/')) track('service_view', { service: href.replace('/services/', '') });
  }, { passive: true });

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const header = document.querySelector('[data-header]');
  const toggle = document.querySelector('.menu-toggle');
  const closeMenu = () => { header?.classList.remove('menu-open'); toggle?.setAttribute('aria-expanded','false'); };
  toggle?.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); toggle.setAttribute('aria-expanded',String(open)); });
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && header?.classList.contains('menu-open')) { closeMenu(); toggle.focus(); } });
  document.addEventListener('click', e => { if(header && !header.contains(e.target)) closeMenu(); });
  document.querySelectorAll('.site-nav a').forEach(a => a.addEventListener('click',closeMenu));
  matchMedia('(min-width: 641px)').addEventListener('change',closeMenu);

  if('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting){entry.target.classList.add('reveal-now');observer.unobserve(entry.target);}
    }),{threshold:.12});
    document.querySelectorAll('.section-title,.meet-copy,.intro-grid>div,.work-piece,.principle-grid article,.guest-steps li').forEach(e => observer.observe(e));
  }
  const preview = document.querySelector('.service-preview img');
  document.querySelectorAll('[data-service-image]').forEach(link => {
    const swap = () => { if(preview && preview.getAttribute('src') !== link.dataset.serviceImage){preview.src=link.dataset.serviceImage;preview.alt=link.dataset.serviceAlt;} };
    link.addEventListener('pointerenter',swap);link.addEventListener('focus',swap);
  });

  // Film is decorative and fetched only near its section. No scroll interception.
  const film = document.querySelector('[data-scroll-film]');
  let stopFilm = () => {};
  const setupFilm = () => {
    if(!film || reduced.matches || navigator.connection?.saveData) return () => {};
    const video = film.querySelector('video');
    const media = film.querySelector('.film-media');
    const bar = film.querySelector('.film-progress');
    const controller = new AbortController();
    let loaded=false,blob='',duration=0,raf=0,target=0;
    const paint=()=>{
      raf=0;
      const range=Math.max(1,film.offsetHeight-video.parentElement.offsetHeight);
      target=Math.max(0,Math.min(1,(88-film.getBoundingClientRect().top)/range));
      bar?.style.setProperty('--progress',target);
      if(duration && video.readyState>=2 && !video.seeking && Math.abs(video.currentTime-target*duration)>.05) video.currentTime=Math.min(Math.max(0,duration-.04),target*duration);
    };
    const request=()=>{if(!raf)raf=requestAnimationFrame(paint);};
    const ready=()=>{duration=Number.isFinite(video.duration)?video.duration:0;media.classList.add('is-ready');request();};
    const load=async()=>{
      if(loaded)return;loaded=true;
      const mobile=matchMedia('(max-width: 640px)').matches;
      try{const response=await fetch(mobile?video.dataset.mobileSrc:video.dataset.desktopSrc,{signal:controller.signal});if(!response.ok)throw new Error('Media unavailable');blob=URL.createObjectURL(await response.blob());video.src=blob;video.load();}catch(error){if(error.name!=='AbortError') media.classList.remove('is-ready');}
    };
    const observe = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){load();observe.disconnect();}},{rootMargin:'350px'}) : null;
    if(observe)observe.observe(film);else load();
    video.addEventListener('loadeddata',ready);video.addEventListener('seeked',request);
    window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request,{passive:true});request();
    return ()=>{controller.abort();observe?.disconnect();cancelAnimationFrame(raf);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);video.removeEventListener('loadeddata',ready);video.removeEventListener('seeked',request);media.classList.remove('is-ready');video.removeAttribute('src');video.load();if(blob)URL.revokeObjectURL(blob);};
  };
  stopFilm=setupFilm();
  reduced.addEventListener('change',()=>{stopFilm();stopFilm=setupFilm();});
  window.addEventListener('pagehide',()=>stopFilm());
  window.addEventListener('pageshow',e=>{if(e.persisted)stopFilm=setupFilm();});

  const choices={
    brightness:{title:'Start with balayage or highlights.',text:'Softly blended brightness or more defined ribbons of light? Explore balayage, then talk with Kyrin about your starting color and upkeep.',slug:'balayage',label:'Explore balayage'},
    color:{title:'Make color your starting point.',text:'Depth, tone, and placement can change the whole feeling of your hair. Bring a photo and talk through the options.',slug:'color-and-highlights',label:'Explore color & highlights'},
    shape:{title:'A new shape can change everything.',text:'Talk about the length you want to keep, the movement you like, and how you actually style your hair.',slug:'haircuts-and-styling',label:'Explore cuts & styling'},
    volume:{title:'Start with an extension conversation.',text:'Length and fullness need a personal plan. Discuss suitability, the hair match, the investment, and the upkeep before choosing a service.',slug:'hair-extensions',label:'Explore extensions'},
    care:{title:'Give your hair some considered care.',text:'Tell Kyrin what you notice about your hair’s feel and finish. A conversation helps identify which treatment options may fit.',slug:'hair-treatments',label:'Explore treatments'}
  };
  document.querySelector('[data-look-finder]')?.addEventListener('change',e=>{
    const choice=choices[e.target.value];if(!choice)return;
    const result=document.querySelector('[data-finder-result]');
    const title=document.createElement('h3');title.textContent=choice.title;
    const text=document.createElement('p');text.textContent=choice.text;
    const link=document.createElement('a');link.className='text-link';link.href='/services/'+choice.slug;link.textContent=choice.label+' ↗';
    result.replaceChildren(title,text,link);
  });
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    let count=0;
    document.querySelectorAll('[data-filter]').forEach(b=>{const on=b===button;b.classList.toggle('filter-active',on);b.setAttribute('aria-pressed',String(on));});
    document.querySelectorAll('[data-portfolio-item]').forEach(item=>{item.hidden=button.dataset.filter!=='all'&&!item.dataset.category.split(' ').includes(button.dataset.filter);if(!item.hidden)count++;});
    const status=document.querySelector('[data-filter-status]');if(status)status.textContent=count+' portfolio '+(count===1?'image':'images')+' shown';
  }));
  const dialog=document.querySelector('.lightbox');
  let opener=null;
  document.querySelectorAll('[data-lightbox]').forEach(button=>button.addEventListener('click',e=>{
    if(!dialog || typeof dialog.showModal!=='function')return;
    e.preventDefault();opener=button;
    const item=button.closest('[data-portfolio-item]');
    const img=button.querySelector('img');const target=dialog.querySelector('img');target.src=img.src;target.alt=img.alt;
    const title=item.querySelector('h3').textContent;dialog.querySelector('h2').textContent=title;
    dialog.querySelector('[data-lightbox-note]').textContent=item.querySelector('.portfolio-note').textContent;
    dialog.querySelector('[data-lightbox-book]').href='/book?look='+encodeURIComponent(button.dataset.lightbox);
    dialog.showModal();dialog.querySelector('.lightbox-close').focus();
  }));
  dialog?.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
  dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog?.addEventListener('close',()=>opener?.focus());

  const form=document.querySelector('[data-booking-form]');
  if(form){
    const status=form.querySelector('[data-form-status]');
    const params=new URLSearchParams(location.search);
    const select=form.querySelector('#service');
    const wanted=params.get('service');if(wanted&&[...select.options].some(o=>o.value===wanted))select.value=wanted;
    const looks=JSON.parse(form.dataset.lookOptions||'{}');
    const requestedLook=params.get('look');
    const chosen=Object.hasOwn(looks,requestedLook)?looks[requestedLook]:null;
    if(chosen){form.querySelector('[data-inspiration]').value=chosen;form.querySelector('[data-inspiration-url]').value=new URL('/portfolio#'+encodeURIComponent(requestedLook),location.origin).href;const box=form.querySelector('[data-selected-inspiration]');box.hidden=false;box.textContent='Your inspiration: '+chosen;}
    if(params.get('sent')==='1'){status.className='form-status is-success';status.textContent='Your request has been sent. Your appointment is not confirmed until Kyrin replies and a date and time are agreed.';}
    const started=form.querySelector('[data-form-started]');if(started)started.value=String(Date.now());
    form.addEventListener('focusin',()=>track('appointment_form_start'),{once:true});
    const sourcePage=form.querySelector('[data-source-page]');if(sourcePage)sourcePage.value=(document.referrer&&document.referrer.startsWith(location.origin)?new URL(document.referrer).pathname:location.pathname)+location.search;
    form.querySelectorAll('[data-utm]').forEach(f=>{const v=params.get(f.dataset.utm);if(v)f.value=v.slice(0,150);});
    const serverError=params.get('error');
    if(serverError){status.className='form-status is-error';status.textContent=serverError==='rate'?'We already have a recent request from you. Please text or call 702-533-8176 if it is urgent.':serverError==='validation'?'Please check the highlighted fields and try again.':'We could not send your request. Please try again, or text or call 702-533-8176.';}
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      if(form.dataset.sending==='true')return;
      form.querySelectorAll('[aria-invalid]').forEach(f=>f.removeAttribute('aria-invalid'));
      form.querySelectorAll('.field-error').forEach(f=>f.textContent='');
      status.className='form-status';status.textContent='';
      const invalid=[...form.querySelectorAll('[required]')].filter(f=>!f.value.trim()||!f.validity.valid);
      if(invalid.length){invalid.forEach(f=>{f.setAttribute('aria-invalid','true');const fieldError=form.querySelector('#'+f.id+'-error');if(fieldError)fieldError.textContent=f.type==='email'?'Enter a valid email address.':f.id==='message'?'Tell us a little more about your hair (at least 10 characters).':'Please complete this field.';});status.textContent='Please review the highlighted fields.';status.classList.add('is-error');invalid[0].focus();return;}
      const button=form.querySelector('[type="submit"]');const buttonLabel=button.querySelector('span');
      form.dataset.sending='true';button.disabled=true;buttonLabel.textContent='Sending your request…';status.textContent='Sending your request to Kyrin.';
      const controller=new AbortController();const timeout=setTimeout(()=>controller.abort(),20000);
      try{
        const body=new FormData(form);
        const response=await fetch(form.action,{method:'POST',body,headers:{Accept:'application/json'},signal:controller.signal});
        const result=await response.json().catch(()=>({}));
        if(!response.ok||!result.ok){
          if(result.errors){Object.entries(result.errors).forEach(([name,text])=>{const field=form.elements[name];if(!field)return;field.setAttribute('aria-invalid','true');const fieldError=form.querySelector('#'+field.id+'-error');if(fieldError)fieldError.textContent=text;});}
          throw new Error(result.error||'Unable to send');
        }
        form.reset();form.querySelector('[data-selected-inspiration]').hidden=true;form.querySelector('[data-inspiration]').value='';form.querySelector('[data-inspiration-url]').value='';
        if(started)started.value=String(Date.now());
        track('appointment_form_submit');
        status.classList.add('is-success');status.textContent='Your request has been sent. Your appointment is not confirmed until Kyrin replies and a date and time are agreed.';
      }catch(error){status.classList.add('is-error');status.textContent=error.name==='AbortError'?'The request timed out, so we could not confirm delivery. Please text or call 702-533-8176 before sending again.':(error.message&&error.message!=='Unable to send'?error.message:'We could not send your request. Your details are still here. Please try again, or text or call 702-533-8176.');}
      finally{clearTimeout(timeout);form.dataset.sending='false';button.disabled=false;buttonLabel.textContent='Send my request';}
    });
  }
})();
