export const site = {
  name: 'Beauty by Kyrin',
  person: 'Kyrin Weidauer',
  phone: '702-533-8176',
  telephone: '+17025338176',
  email: 'kyrinweidauer@gmail.com',
  address: '8665 W Flamingo Rd, Suite 128',
  locality: 'Las Vegas',
  region: 'NV',
  postalCode: '89147',
  location: 'Inside Venus Salon',
  availability: 'By appointment. Contact Kyrin for availability.',
  // Set SITE_URL to the custom domain and INDEX_SITE=true after DNS launch.
  origin: (process.env.SITE_URL || 'https://beauty-by-kyrin-live.vercel.app').replace(/\/$/, ''),
  indexable: process.env.INDEX_SITE === 'true',
  maps: 'https://www.google.com/maps/search/?api=1&query=Venus+Salon+8665+W+Flamingo+Rd+Suite+128+Las+Vegas+NV+89147',
  formEndpoint: 'https://api.web3forms.com/submit',
  formKey: '51c67985-c809-4e83-8256-acd77ce65e61',
  portrait: {
    src: '/assets/kyrin-cutout-v2.webp',
    alt: 'Kyrin Weidauer, hair stylist at Beauty by Kyrin in Las Vegas',
    width: 1200,
    height: 1104,
  },
};

export const generalFaqs = [
  {q:'Where is Beauty by Kyrin?', a:'Beauty by Kyrin is inside Venus Salon at 8665 W Flamingo Rd, Suite 128, Las Vegas, NV 89147, near Flamingo Road and Durango Drive. Use the directions link on the Visit page to plan your route.'},
  {q:'How do I request an appointment?', a:'Use the appointment request form or call or text Kyrin at 702-533-8176. Share the service you have in mind and your preferred days. An appointment is confirmed only after Kyrin replies and agrees on a date and time.'},
  {q:'What if I do not know which service to choose?', a:'Choose “Help me choose” on the booking form. Describe your current hair, what you would like to change, and your at-home routine. You do not need to know salon terminology to start the conversation.'},
  {q:'How much will my appointment cost?', a:'Ask Kyrin for a personalized quote. Your starting hair, color history, desired result, service combination, and any extension hair can affect the total. Discuss your budget and ongoing maintenance before the service is agreed.'},
  {q:'What should I bring to a consultation?', a:'Bring a few reference photos and explain what you like about each one. Be ready to discuss previous salon color, home color, lightening, chemical services, extensions, and the amount of time you want to spend styling.'},
  {q:'Can a big color change happen in one appointment?', a:'Sometimes a goal needs more than one visit. Your starting color, previous treatments, and hair condition help determine a realistic plan. A photograph is a useful direction, not a guarantee of an identical result.'},
  {q:'Are appointments available on weekends?', a:'Contact Kyrin for current availability and share your preferred days. Individual appointments are arranged directly; the salon’s general opening hours do not necessarily reflect Kyrin’s schedule.'},
  {q:'How do I change an appointment?', a:'Contact Kyrin directly at 702-533-8176 as soon as your plans change. Ask about the current rescheduling and cancellation terms when your appointment is arranged.'},
];

export const portfolio = [
  {id:'burgundy-color',title:'A richer kind of statement.',label:'Burgundy color',category:'color',src:'/assets/color-burgundy.webp',width:1200,height:1600,alt:'Back view of long burgundy hair color styled in waves',service:'color-and-highlights',featured:true,note:'A rich burgundy direction. Bring this photo to talk about the depth, tone and amount of change you have in mind.'},
  {id:'blonde-highlights-dimension',title:'Brightness with dimension.',label:'Blonde highlights',category:'highlights',src:'/assets/highlights-blonde-dimension.webp',width:1200,height:1600,alt:'Rear view of shoulder-length blonde highlights with darker dimension',service:'color-and-highlights',featured:true,note:'Blonde highlights seen from the back. Use this view to discuss where you want brightness and how much depth you would like to keep.'},
  {id:'blonde-extensions',title:'A longer point of view.',label:'Blonde extensions',category:'extensions',src:'/assets/extensions-blonde.webp',width:1200,height:1916,alt:'Long blonde hair extensions styled in loose waves',service:'hair-extensions',featured:true,note:'A blonde extension look. Start a conversation about your preferred length, fullness and the care that fits your routine.'},
  {id:'brunette-bob-color',title:'Rich color. A shorter silhouette.',label:'Brunette color',category:'color',src:'/assets/color-brunette-bob.webp',width:1200,height:1600,alt:'Brunette color on a softly layered bob with face-framing pieces',service:'color-and-highlights',note:'Brunette color on a shorter shape. Point out the depth you like and discuss how that direction could work with your current hair.'},
  {id:'brunette-waves-color',title:'Brunette, in motion.',label:'Brunette color',category:'color',src:'/assets/color-brunette-waves.webp',width:1179,height:1484,alt:'Side view of brunette hair color with lighter dimension and waves',service:'color-and-highlights',note:'Brunette color shown with waves. Bring it as a reference for the overall shade, and talk through your own starting color and styling routine.'},
  {id:'blonde-extensions-highlights',title:'Length meets light.',label:'Extensions & highlights',category:'highlights extensions',src:'/assets/extensions-highlights-blonde.webp',width:1142,height:1370,alt:'Long blonde extensions and highlights shown from the back in soft waves',service:'hair-extensions',note:'Extensions and highlights together. Discuss both the length you want and the color direction so the proposed services can be planned as a whole.'},
  {id:'blonde-highlights-waves',title:'A brighter frame.',label:'Blonde highlights',category:'highlights',src:'/assets/highlights-blonde-waves.webp',width:1200,height:1600,alt:'Smiling client with blonde highlights and face-framing waves',service:'color-and-highlights',note:'Blonde highlights shown from the front. Bring this photo if you want to discuss brightness around your face and the overall blonde tone.'},
  {id:'dimensional-blonde',title:'Light, with a little depth.',label:'Dimensional blonde',category:'color',src:'/assets/photo-02.webp',alt:'Long blonde hair with darker roots and softly blended highlights from Kyrin’s portfolio',width:900,height:1255,service:'balayage',note:'Soft blonde contrast with a deeper root. Bring this photo if you like brightness that still has dimension.'},
  {id:'brunette-dimension',title:'Brunette, but make it luminous.',label:'Brunette dimension',category:'color',src:'/assets/photo-04.webp',alt:'Long brunette hair with warm face-framing highlights from Kyrin’s portfolio',width:900,height:1200,service:'color-and-highlights',note:'Warm ribbons around the face bring contrast to a rich brunette base. Talk through how much brightness feels right for you.'},
  {id:'soft-layers',title:'A shape that goes with you.',label:'Cut & color',category:'cuts',src:'/assets/photo-03.webp',alt:'Shoulder-length layered hair with highlights and a softly styled finish from Kyrin’s portfolio',width:900,height:1200,service:'haircuts-and-styling',note:'A shorter, layered silhouette with visible color dimension. Use it as a starting point for discussing length, movement, and styling.'},
];
