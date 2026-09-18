// Single source of truth for every business fact on this website.
// Nothing that is not verified belongs in here: an empty string renders as
// "omitted", never as a placeholder. See docs/LAUNCH-INPUTS-NEEDED.md.

const env = key => (process.env[key] || '').trim();

export const site = {
  // --- Identity -----------------------------------------------------------
  name: 'Beauty by Kyrin',
  person: 'Kyrin Weidauer',
  jobTitle: 'Hair stylist',

  // --- Contact (confirmed by the owner — do not change) --------------------
  phone: '702-533-8176',
  telephone: '+17025338176',
  email: 'kyrinweidauer@gmail.com',
  // Confirmed the owner accepts SMS at the number above.
  textOk: true,

  // --- Location (confirmed) ------------------------------------------------
  location: 'Inside Venus Salon',
  salonName: 'Venus Salon',
  address: '8665 W Flamingo Rd, Suite 128',
  streetAddress: '8665 W Flamingo Rd',
  suite: 'Suite 128',
  locality: 'Las Vegas',
  region: 'NV',
  postalCode: '89147',
  crossStreets: 'near Flamingo Road and Durango Drive',
  // TODO(launch): read the exact pin from the Google Business Profile and set
  // these. Left empty on purpose — `geo` is omitted from JSON-LD until then,
  // because an invented coordinate is worse than an absent one.
  latitude: '',
  longitude: '',
  maps: 'https://www.google.com/maps/search/?api=1&query=Venus+Salon+8665+W+Flamingo+Rd+Suite+128+Las+Vegas+NV+89147',

  // Areas genuinely reachable from the Flamingo Rd chair. Used by the service
  // area page and by `areaServed`. Not a licence to build a page per suburb.
  areasServed: [
    'Las Vegas',
    'Spring Valley',
    'Summerlin',
    'Enterprise',
    'Paradise',
    'Henderson',
    'North Las Vegas',
  ],

  // --- Hours (A12, confirmed) ---------------------------------------------
  // Venus Salon's general hours. Kyrin books individually inside them, which is
  // why every page also carries the `availability` sentence.
  hours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:00' },
  ],
  hoursNote: 'Monday to Friday, 9:00am–5:00pm. Weekends by appointment.',
  availability: 'By appointment. Contact Kyrin for availability.',

  // --- Unverified: every one of these renders as "omitted" while empty ------
  // Filling any of them in is the whole of that feature's launch work.
  bookingUrl: env('NEXT_PUBLIC_BOOKING_URL'),      // A5 — blank: CTAs stay "Request an Appointment"
  depositRequired: '',                              // A5
  instagram: '',                                    // A6 — blank: icon and sameAs omitted
  tiktok: '',                                       // A6
  facebook: '',                                     // A6
  yelp: '',                                         // A6
  googleBusinessProfileUrl: '',                     // A9
  googleReviewUrl: env('NEXT_PUBLIC_GBP_REVIEW_URL'), // A9 — blank: review button hidden
  // A2 — blank: the licence line and the hasCredential schema are both omitted.
  // Never invent a licence number.
  license: { number: '', type: '', display: false },
  // A7 — blank: About is written from what is confirmed.
  yearsExperience: '',
  school: '',
  certifications: [],
  productLines: [],
  languages: [],

  // --- Build / deployment --------------------------------------------------
  origin: (env('SITE_URL') || 'https://www.beautybykyrin.com').replace(/\/$/, ''),
  indexable: env('INDEX_SITE') === 'true',
  analyticsId: env('NEXT_PUBLIC_GA_ID'),
  googleSiteVerification: env('GOOGLE_SITE_VERIFICATION'),
  bingSiteVerification: env('BING_SITE_VERIFICATION'),

  // The form posts to our own function, which then talks to Web3Forms with a
  // server-side key. The key is deliberately NOT here: see api/_lib/config.mjs.
  formEndpoint: '/api/book',

  portrait: {
    src: '/assets/kyrin-cutout-v2.webp',
    alt: 'Kyrin Weidauer, hair stylist at Beauty by Kyrin in Las Vegas',
    width: 1200,
    height: 1104,
  },
};

/** Real, attributable reviews only. Empty means the reviews section and
 *  AggregateRating are both omitted site-wide. Fabricating one of these
 *  violates FTC rules and can get a Google Business Profile suspended. */
export const testimonials = [];

/** Policies Kyrin has actually agreed to. An entry only appears on /policies
 *  once it is confirmed; nothing here is invented on her behalf. */
export const policies = {
  cancellation: '',
  late: '',
  redo: '',
  payment: '',
  extensionsConsult: '',
  kids: '',
};

export const generalFaqs = [
  {q:'Where is Beauty by Kyrin?', a:'Beauty by Kyrin is inside Venus Salon at 8665 W Flamingo Rd, Suite 128, Las Vegas, NV 89147, near Flamingo Road and Durango Drive. Kyrin works by appointment from this location, and guests travel from across the Las Vegas valley including Spring Valley, Summerlin and Henderson. Use the directions link on the Visit page to plan your route.'},
  {q:'How do I request an appointment?', a:'Send an appointment request through the form on this website, or call or text Kyrin directly at 702-533-8176. Tell her the service you have in mind, what your hair is like now, and the days that suit you. Your appointment is confirmed only after Kyrin replies and you agree on a date and time together.'},
  {q:'What if I do not know which service to choose?', a:'Choose “Help me choose” on the appointment request form and describe what you would like to change in your own words. You do not need to know salon terminology such as balayage, foils or toner. Describing your current hair, the result you are picturing and your at-home routine is more than enough to start the conversation.'},
  {q:'How much will my appointment cost?', a:'Ask Kyrin for a personalized quote before your service is agreed. Hair pricing is not one flat number: your starting colour, hair history, length and density, the result you want, and whether extension hair is needed all change the work involved. Discuss both the appointment and the ongoing upkeep so there are no surprises.'},
  {q:'What should I bring to a consultation?', a:'Bring two or three reference photos and be ready to say what you like about each one. Also bring your hair history: previous salon colour, box colour, lightening, keratin or perms, and any extensions. Photos show a direction, but your hair history determines what is actually achievable and how long it will take.'},
  {q:'Can a big colour change happen in one appointment?', a:'Sometimes, but often not. A significant lightening or colour correction may need more than one visit to reach the goal while keeping your hair in good condition. Your starting colour, previous chemical services and hair condition decide what is realistic. A photograph is a useful direction, never a guarantee of an identical result.'},
  {q:'How long does a colour appointment take?', a:'Plan for two to four hours for most colour work, and longer for significant lightening, extensions or a colour correction. A root touch-up and gloss sits at the shorter end; a full balayage with a toner and a cut sits at the longer end. Kyrin confirms the expected length when your appointment is arranged.'},
  {q:'Are appointments available on weekends?', a:'Contact Kyrin for current availability and share the days that work for you. Venus Salon’s general hours are Monday to Friday, 9:00am to 5:00pm, with weekends by appointment. Kyrin’s individual schedule is arranged directly with each guest, so the salon’s posted hours do not necessarily reflect when she is taking appointments.'},
  {q:'How do I change or cancel an appointment?', a:'Contact Kyrin directly at 702-533-8176 as soon as your plans change, so the time can be offered to someone else. Ask about the current rescheduling and cancellation terms when your appointment is arranged, as these are agreed with Kyrin directly rather than set by this website.'},
  {q:'Do you take walk-ins?', a:'No. Beauty by Kyrin is appointment-only, which is what makes a proper consultation possible before any colour or cutting begins. Send a request through this website or text 702-533-8176 and Kyrin will find a time. Even a quick question about your hair is worth a message rather than a drive across town.'},
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
