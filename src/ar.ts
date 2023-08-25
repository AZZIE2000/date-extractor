/*
 * Arabic locale definition.
 * See the readme for customization and more information.
 * To set this locale globally:
 *
 * Sugar.Date.setLocale('ar')
 *
 */
export const arLocal = {
  plural: false,
  units:
    "ميلّي ثانية:|ات,ثانية:|ات,دقيقة:|ات,ساعة:|ات,يوم:|يم,أسبوع:|أسابيع,شهر:|شهور,سنة:||سنوات",
  months:
    "يناير|,فبراير|,مارس|,إبريل|,مايو,يونيو|,يوليو|,أغسطس|,سبتمبر|,أكتوبر|,نوفمبر|,ديسمبر|",
  weekdays:
    "الأحد|+الأحد,الإثنين||الإثنين,الثلاثاء||الثلاثاء,الأربعاء||الأربعاء,الخميس||الخميس,الجمعة||الجمعة,السبت|+السبت",
  numerals:
    "صفر,واحد|واحد,اثنان|اثنين,ثلاثة,أربعة,خمسة,ستة,سبعة,ثمانية|ثماني,تسعة,عشرة",
  tokens: "في|في",
  articles: "",
  short: "{yyyy}-{MM}-{dd}",
  medium: "{d} {month} {yyyy}",
  long: "{d} {month} {yyyy} {time}",
  full: "{weekday} {d} {month} {yyyy} {time}",
  stamp: "{dow} {d} {mon} {yyyy} {time}",
  time: "{H}:{mm}",
  past: "{sign} {num} {unit}",
  future: "{sign} {num} {unit}",
  duration: "{num} {unit}",
  ampm: "صباحًا,مساءً",
  modifiers: [
    { name: "day", src: "أول أمس|قبل أمس|قبل يومين|أمس|اليوم", value: -2 },
    { name: "day", src: "غدًا|بعد غد|بعد يومين|غدا", value: 1 },
    { name: "day", src: "بعد ثلاثة أيام|بعد ثلاث ايام", value: 3 },
    { name: "sign", src: "منذ|من", value: -1 },
    { name: "sign", src: "في خلال", value: 1 },
    { name: "shift", src: "الشهر الماضي|الشهر السابق", value: -1 },
    { name: "shift", src: "هذا الشهر|الشهر الحالي", value: 0 },
    { name: "shift", src: "الشهر القادم|الشهر البعدي", value: 1 },
  ],
  parse: [
    "{months} {year?}",
    "{num} {unit} {sign}",
    "{sign} {num} {unit}",
    "{1?} {num} {unit} {sign}",
    "{shift} {unit:5-7}",
  ],
  timeParse: [
    "{day|weekday}",
    "{shift} {weekday}",
    "{0?} {weekday?},? {date} {months?}\\.? {year?}",
  ],
  timeFrontParse: [
    "{day|weekday}",
    "{shift} {weekday}",
    "{0?} {weekday?},? {date} {months?}\\.? {year?}",
  ],
}
