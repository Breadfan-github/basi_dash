/**
 * Full literal Tailwind class strings per home section so JIT always includes them.
 * Partner themes are intentionally loud vs default `averra`.
 */

export const HOME_SKINS = {
  averra: {
    heroSection: "",
    heroBackground: "bg-gradient-to-br from-white via-brand-navy-50 to-brand-royal-50",
    services:
      "py-24 sm:py-32 bg-gradient-to-b from-white via-brand-silver-50 to-white relative overflow-hidden",
    assessments: "py-20 bg-gradient-to-b from-white to-brand-silver-50",
    about: "py-24 sm:py-32 bg-gradient-to-br from-white via-brand-navy-50 to-brand-royal-50 relative overflow-hidden",
    whySingapore: "py-24 sm:py-32 bg-gradient-to-br from-white via-brand-silver-50 to-white relative overflow-hidden",
    contact:
      "py-24 sm:py-32 bg-gradient-to-br from-brand-navy-50 via-white to-brand-royal-50 relative overflow-hidden",
    serviceCard:
      "group relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/80 backdrop-blur-sm hover:-translate-y-2",
    assessmentLink:
      "group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-brand-navy-300",
    contactSectionCard:
      "group relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/80 backdrop-blur-sm hover:-translate-y-2",
    whyCard:
      "group relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2",
    contactFormWrap: "border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-lg",
    heroHeadlineClass: "",
    heroBadgeRowClass: "",
    heroLogoWrapClass:
      "inline-flex items-center justify-center max-w-full rounded-2xl bg-white/95 px-4 py-2.5 sm:px-5 sm:py-3 shadow-[0_12px_40px_-20px_rgba(15,23,42,0.16)] ring-1 ring-slate-900/[0.06] backdrop-blur-sm transition-[box-shadow,ring-color] duration-300 hover:shadow-[0_18px_48px_-18px_rgba(15,23,42,0.2)] hover:ring-slate-900/10",
    heroLogoClass:
      "block h-10 sm:h-11 md:h-12 w-auto max-w-[min(100%,17.5rem)] sm:max-w-[19rem] object-contain object-center mx-auto lg:mx-0 lg:object-left [image-rendering:auto]",
    navLogoClass:
      "h-9 sm:h-10 w-auto max-w-[min(16rem,48vw)] lg:max-w-[17.5rem] object-contain object-left transition-opacity duration-200 group-hover:opacity-90",
    servicesHeaderClass: "text-center mb-16 sm:mb-20",
    servicesTitleClass: "",
    servicesSubtitleClass:
      "text-xl sm:text-2xl text-brand-carbon-600 max-w-3xl mx-auto leading-relaxed",
    servicesGridClass: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8",
    assessmentsHeaderClass: "text-center mb-12",
    contactHeaderClass: "text-center mb-16 sm:mb-20",
    pageHeaderSection:
      "relative bg-gradient-to-br from-brand-navy-700 to-brand-royal-600 text-white py-20 sm:py-24 lg:py-28 overflow-hidden",
    pageMainBg: "bg-white",
    pageSectionPrimary: "py-8 md:py-20 bg-white",
    pageSectionAlt: "py-20 bg-gradient-to-br from-brand-silver-50 to-brand-navy-50",
    pageListCard:
      "border-2 border-brand-silver-200 hover:border-brand-navy-700 transition-all duration-300 hover:shadow-xl group",
    faqCard: "border-2 border-brand-silver-200 hover:border-brand-navy-700 transition-colors",
    faqCtaSection: "py-20 bg-gradient-to-br from-brand-silver-50 to-brand-royal-50",
    faqCtaButton:
      "inline-block rounded-lg bg-gradient-to-r from-brand-navy-700 to-brand-royal-600 text-white px-8 py-3 font-semibold hover:opacity-90 transition-opacity",
    footerShell: "bg-brand-carbon-900 text-brand-silver-300",
    notFoundNumber: "text-transparent bg-clip-text bg-gradient-to-r from-brand-navy-700 to-brand-royal-600",
    notFoundPrimaryBtn:
      "bg-gradient-to-r from-brand-navy-700 to-brand-royal-600 hover:from-brand-navy-800 hover:to-brand-royal-700 text-white",
    contactPageCard: "border-2 border-brand-silver-200",
    contactFormCard: "border-2 border-brand-silver-200",
    assessmentBottomCta: "py-20 bg-gradient-to-br from-brand-silver-50 to-brand-navy-50",
    richDecor: true,
  },
  "alpha-bridge": {
    heroSection: "border-b-[6px] border-brand-navy-700",
    heroBackground: "bg-gradient-to-b from-slate-400/40 via-slate-200/80 to-white",
    services:
      "py-32 sm:py-40 relative overflow-hidden bg-slate-200 border-y-2 border-slate-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6)]",
    assessments: "py-24 bg-slate-300/50 border-t-4 border-brand-navy-700",
    about: "py-32 sm:py-44 relative overflow-hidden bg-white border-t-8 border-brand-navy-700",
    whySingapore: "py-32 bg-slate-100 skew-y-0 relative overflow-hidden",
    contact: "py-36 bg-slate-300/40 border-t-4 border-dashed border-brand-navy-700 relative overflow-hidden",
    serviceCard:
      "group relative rounded-none border-2 border-slate-400 shadow-none hover:shadow-xl transition-all duration-300 overflow-hidden bg-white hover:-translate-y-1",
    assessmentLink:
      "group relative overflow-hidden rounded-none bg-white shadow-md hover:shadow-xl transition-all duration-300 border-2 border-slate-400 hover:border-brand-navy-700",
    contactSectionCard:
      "group relative rounded-none border-2 border-slate-300 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden bg-white hover:-translate-y-1",
    whyCard:
      "group relative rounded-none border-2 border-slate-300 shadow-md hover:shadow-xl overflow-hidden bg-white transition-all duration-300",
    contactFormWrap: "border-2 border-slate-400 rounded-none shadow-xl bg-white",
    heroHeadlineClass: "text-balance",
    heroBadgeRowClass:
      "bg-slate-800 text-white border-slate-600 shadow-md !from-transparent !to-transparent backdrop-blur-0",
    heroLogoClass:
      "block h-24 sm:h-20 md:h-24 w-auto max-w-[min(100%,420px)] object-contain object-center mx-auto lg:mx-0 lg:object-left [image-rendering:auto]",
    heroLogoWrapClass:
      "inline-flex items-center justify-center max-w-full rounded-none border-2 border-slate-800 bg-white px-4 py-2 shadow-[4px_4px_0_0_rgba(15,23,42,0.1)]",
    heroLogoClass:
      "block h-9 sm:h-10 md:h-11 w-auto max-w-[min(100%,16.5rem)] object-contain object-center mx-auto lg:mx-0 lg:object-left",
    navLogoClass:
      "h-32 sm:h-32 lg:h-32 w-auto max-w-[min(18rem,52vw)] lg:max-w-[20rem] object-contain object-left transition-opacity duration-200 group-hover:opacity-95",
    servicesHeaderClass: "text-left mb-14 sm:mb-16 max-w-4xl border-l-4 border-brand-navy-700 pl-5 sm:pl-8",
    servicesTitleClass: "font-black tracking-tight text-slate-900 sm:!text-4xl md:!text-5xl",
    servicesSubtitleClass: "text-lg sm:text-xl text-slate-700 max-w-2xl leading-relaxed mt-2",
    servicesGridClass: "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10",
    assessmentsHeaderClass: "text-left mb-12 max-w-3xl border-l-4 border-slate-500 pl-5",
    contactHeaderClass: "text-left mb-14 max-w-3xl border-l-4 border-slate-500 pl-5",
    pageHeaderSection:
      "relative bg-gradient-to-br from-slate-800 via-slate-700 to-[#385499] text-white py-20 sm:py-24 lg:py-28 overflow-hidden border-b-4 border-slate-900",
    pageMainBg: "bg-slate-100",
    pageSectionPrimary: "py-8 md:py-20 bg-white",
    pageSectionAlt: "py-20 bg-gradient-to-b from-slate-200 to-slate-100",
    pageListCard:
      "rounded-none border-2 border-slate-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-brand-navy-700 group",
    faqCard: "rounded-none border-2 border-slate-400 hover:border-brand-navy-700 transition-colors",
    faqCtaSection: "py-20 bg-slate-300/50 border-t-4 border-brand-navy-700",
    faqCtaButton:
      "inline-block rounded-none border-2 border-slate-800 bg-slate-800 text-white px-8 py-3 font-semibold hover:bg-slate-900 transition-colors",
    footerShell: "bg-slate-900 text-slate-300",
    notFoundNumber: "text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-brand-navy-700",
    notFoundPrimaryBtn: "rounded-none border-2 border-slate-800 bg-slate-800 hover:bg-slate-900 text-white",
    contactPageCard: "rounded-none border-2 border-slate-400",
    contactFormCard: "rounded-none border-2 border-slate-400",
    assessmentBottomCta: "py-20 bg-slate-200 border-t-4 border-slate-400",
    richDecor: true,
  },
  "global-residency": {
    heroSection: "shadow-[inset_0_-60px_80px_-50px_rgba(16,70,121,0.15)]",
    heroBackground: "bg-gradient-to-tr from-sky-300/45 via-sky-50 to-white",
    services:
      "py-28 sm:py-36 relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-blue-50 border-y border-sky-200",
    assessments: "py-24 bg-gradient-to-r from-sky-100/40 via-white to-sky-50",
    about: "py-28 sm:py-36 relative overflow-hidden bg-white border-y-4 border-sky-200",
    whySingapore: "py-28 bg-gradient-to-br from-sky-50/80 to-white relative overflow-hidden",
    contact: "py-32 bg-gradient-to-t from-sky-100/60 via-white to-white relative overflow-hidden",
    serviceCard:
      "group relative rounded-2xl border border-sky-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/90 backdrop-blur-sm hover:-translate-y-2",
    assessmentLink:
      "group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-sky-100 hover:border-brand-navy-700",
    contactSectionCard:
      "group relative rounded-2xl border border-sky-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/90 hover:-translate-y-2",
    whyCard:
      "group relative rounded-2xl border border-sky-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2",
    contactFormWrap: "rounded-2xl border border-sky-200 shadow-2xl bg-white/95 backdrop-blur-sm",
    heroHeadlineClass: "md:text-balance",
    heroLogoWrapClass:
      "hidden items-center justify-center max-w-full rounded-2xl border border-sky-200/90 bg-white/95 px-4 py-2.5 shadow-[0_12px_36px_-16px_rgba(14,165,233,0.22)] ring-1 ring-sky-100/80",
    heroLogoClass:
      "block h-10 sm:h-11 md:h-12 w-auto max-w-[min(100%,18rem)] sm:max-w-[19.5rem] object-contain object-center mx-auto lg:mx-0 lg:object-left",
    navLogoClass:
      "h-48 w-auto object-contain object-left transition-opacity duration-200 group-hover:opacity-90",
    heroBadgeRowClass: "bg-sky-100/90 text-brand-navy-800 border-sky-300",
    servicesHeaderClass: "text-center mb-16 sm:mb-20 md:mx-auto md:max-w-4xl",
    servicesTitleClass: "text-sky-950",
    servicesSubtitleClass:
      "text-lg sm:text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed md:text-balance",
    servicesGridClass: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-9",
    assessmentsHeaderClass: "text-center mb-12 md:max-w-2xl md:mx-auto",
    contactHeaderClass: "text-center mb-16 sm:mb-20",
    pageHeaderSection:
      "relative bg-gradient-to-br from-sky-700 via-blue-800 to-brand-navy-900 text-white py-20 sm:py-24 lg:py-28 overflow-hidden",
    pageMainBg: "bg-sky-50/50",
    pageSectionPrimary: "py-8 md:py-20 bg-white",
    pageSectionAlt: "py-20 bg-gradient-to-r from-sky-100/40 via-white to-blue-50",
    pageListCard:
      "rounded-2xl border border-sky-200 hover:border-brand-navy-700 shadow-md hover:shadow-xl transition-all duration-300 group",
    faqCard: "rounded-2xl border-2 border-sky-100 hover:border-brand-navy-600 transition-colors",
    faqCtaSection: "py-20 bg-gradient-to-t from-sky-100/60 via-white to-white",
    faqCtaButton:
      "inline-block rounded-xl bg-gradient-to-r from-sky-700 to-brand-navy-800 text-white px-8 py-3 font-semibold hover:opacity-90 transition-opacity",
    footerShell: "bg-gradient-to-r from-sky-950 via-brand-navy-900 to-slate-900 text-sky-100",
    notFoundNumber: "text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-900",
    notFoundPrimaryBtn: "rounded-xl bg-gradient-to-r from-sky-700 to-brand-navy-800 hover:opacity-90 text-white",
    contactPageCard: "rounded-2xl border border-sky-200",
    contactFormCard: "rounded-2xl border border-sky-200",
    assessmentBottomCta: "py-20 bg-gradient-to-br from-sky-50 to-white",
    richDecor: true,
  },
  horizon: {
    heroSection: "ring-4 ring-brand-navy-700/20 ring-inset",
    heroBackground: "bg-gradient-to-bl from-red-100/90 via-orange-50 to-amber-100",
    services:
      "py-32 sm:py-40 relative overflow-hidden bg-gradient-to-br from-red-50 via-white to-orange-50 border-y-[6px] border-brand-navy-700",
    assessments: "py-24 bg-gradient-to-b from-rose-100/90 to-white border-t-4 border-red-400",
    about: "py-32 sm:py-40 relative overflow-hidden bg-gradient-to-tr from-orange-50/90 via-white to-red-50/80",
    whySingapore: "py-32 bg-gradient-to-b from-white via-rose-50/50 to-orange-50 relative overflow-hidden",
    contact: "py-36 bg-gradient-to-br from-red-50 via-white to-amber-50 border-t-4 border-orange-300 relative overflow-hidden",
    serviceCard:
      "group relative rounded-2xl border-2 border-red-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2 hover:rotate-[0.5deg]",
    assessmentLink:
      "group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-red-200 hover:border-brand-navy-700",
    contactSectionCard:
      "group relative rounded-2xl border-2 border-red-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2",
    whyCard:
      "group relative rounded-2xl border-2 border-red-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2",
    contactFormWrap: "rounded-2xl border-2 border-red-100 shadow-2xl bg-white",
    heroHeadlineClass: "drop-shadow-sm",
    heroLogoClass:
      "block h-10 sm:h-11 md:h-12 w-auto max-w-[min(100%,17.5rem)] sm:max-w-[19rem] object-contain object-center mx-auto lg:mx-0 lg:object-left",
    heroLogoWrapClass:
      "hidden items-center justify-center max-w-full rounded-2xl border-2 border-rose-200/70 bg-white/95 px-4 py-2.5 shadow-[0_14px_40px_-18px_rgba(244,63,94,0.2)]",
    navLogoClass:
      "h-48 w-auto object-contain object-left transition-opacity duration-200 group-hover:opacity-90",
    heroBadgeRowClass: "bg-gradient-to-r from-rose-100 to-orange-100 text-red-900 border-red-200/80",
    servicesHeaderClass: "text-center mb-16 sm:mb-20",
    servicesTitleClass: "text-rose-950 font-black",
    servicesSubtitleClass:
      "text-lg sm:text-xl text-red-950/80 max-w-3xl mx-auto leading-relaxed font-medium",
    servicesGridClass: "grid grid-cols-1 sm:grid-cols-2 gap-7 lg:gap-9",
    assessmentsHeaderClass: "text-center mb-12",
    contactHeaderClass: "text-center mb-16 sm:mb-20",
    pageHeaderSection:
      "relative bg-gradient-to-br from-red-600 via-orange-500 to-amber-600 text-white py-20 sm:py-24 lg:py-28 overflow-hidden",
    pageMainBg: "bg-orange-50/30",
    pageSectionPrimary: "py-8 md:py-20 bg-white",
    pageSectionAlt: "py-20 bg-gradient-to-b from-rose-50/80 via-white to-amber-50/60",
    pageListCard:
      "rounded-2xl border-2 border-red-100 hover:border-brand-navy-700 shadow-lg hover:shadow-xl transition-all group",
    faqCard: "rounded-2xl border-2 border-red-100 hover:border-red-400 transition-colors",
    faqCtaSection: "py-20 bg-gradient-to-br from-amber-50 to-rose-50",
    faqCtaButton:
      "inline-block rounded-xl bg-gradient-to-r from-red-600 to-orange-500 text-white px-8 py-3 font-semibold hover:opacity-90 transition-opacity",
    footerShell: "bg-gradient-to-br from-red-950 to-brand-navy-900 text-orange-50",
    notFoundNumber: "text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500",
    notFoundPrimaryBtn: "rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90 text-white",
    contactPageCard: "rounded-2xl border-2 border-red-100",
    contactFormCard: "rounded-2xl border-2 border-red-100",
    assessmentBottomCta: "py-20 bg-gradient-to-br from-orange-50 to-red-50",
    richDecor: true,
  },
  "lion-city": {
    heroSection: "border-b-8 border-double border-brand-navy-700",
    heroBackground: "bg-gradient-to-br from-pink-200/55 via-rose-50 to-fuchsia-50/80",
    services:
      "py-32 sm:py-40 relative overflow-hidden bg-gradient-to-b from-pink-50 via-rose-50 to-white border-t-4 border-brand-navy-700",
    assessments: "py-24 bg-rose-100/70 border-y-2 border-rose-300",
    about: "py-32 sm:py-44 relative overflow-hidden bg-gradient-to-b from-white to-pink-50/90",
    whySingapore: "py-32 bg-rose-50/80 border-t border-rose-200 relative overflow-hidden",
    contact: "py-36 bg-gradient-to-br from-fuchsia-50 via-pink-50 to-white relative overflow-hidden",
    serviceCard:
      "group relative rounded-3xl border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/95 backdrop-blur-sm hover:-translate-y-2",
    assessmentLink:
      "group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-pink-200 hover:border-brand-navy-700",
    contactSectionCard:
      "group relative rounded-3xl border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/95 hover:-translate-y-2",
    whyCard:
      "group relative rounded-3xl border-2 border-pink-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2",
    contactFormWrap: "rounded-3xl border-2 border-pink-200 shadow-2xl bg-white/95 backdrop-blur-sm",
    heroHeadlineClass: "font-serif text-balance",
    heroLogoWrapClass:
      "hidden items-center justify-center max-w-full rounded-[1.75rem] border-2 border-pink-200/80 bg-white/95 px-4 py-2.5 shadow-[0_14px_44px_-20px_rgba(219,39,119,0.18)]",
    navLogoClass:
      "h-64 object-contain object-left transition-opacity duration-200 group-hover:opacity-90",
    heroBadgeRowClass: "bg-rose-50 border-rose-200 text-rose-950",
    heroLogoClass:
      "block h-10 sm:h-11 md:h-12 w-auto max-w-[min(100%,17.5rem)] sm:max-w-[19rem] object-contain object-center mx-auto lg:mx-0 lg:object-left",
    servicesHeaderClass: "text-center mb-16 sm:mb-20 px-2",
    servicesTitleClass: "text-rose-950",
    servicesSubtitleClass: "text-lg sm:text-2xl text-rose-900/85 max-w-3xl mx-auto leading-relaxed italic",
    servicesGridClass: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8",
    assessmentsHeaderClass: "text-center mb-12",
    contactHeaderClass: "text-center mb-16 sm:mb-20",
    pageHeaderSection:
      "relative bg-gradient-to-br from-rose-800 via-pink-700 to-fuchsia-800 text-white py-20 sm:py-24 lg:py-28 overflow-hidden",
    pageMainBg: "bg-rose-50/35",
    pageSectionPrimary: "py-8 md:py-20 bg-white",
    pageSectionAlt: "py-20 bg-gradient-to-b from-pink-50 via-fuchsia-50/50 to-white",
    pageListCard:
      "rounded-3xl border-2 border-pink-200 hover:border-brand-navy-700 shadow-md hover:shadow-xl transition-all group",
    faqCard: "rounded-3xl border-2 border-pink-200 hover:border-rose-400 transition-colors",
    faqCtaSection: "py-20 bg-gradient-to-br from-fuchsia-50 to-rose-50",
    faqCtaButton:
      "inline-block rounded-full bg-gradient-to-r from-rose-700 to-pink-600 text-white px-8 py-3 font-semibold hover:opacity-90 transition-opacity",
    footerShell: "bg-gradient-to-r from-rose-950 to-brand-navy-900 text-pink-50",
    notFoundNumber: "text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-fuchsia-700",
    notFoundPrimaryBtn: "rounded-full bg-gradient-to-r from-rose-700 to-pink-600 hover:opacity-90 text-white",
    contactPageCard: "rounded-3xl border-2 border-pink-200",
    contactFormCard: "rounded-3xl border-2 border-pink-200",
    assessmentBottomCta: "py-20 bg-gradient-to-br from-pink-50 to-rose-100/60",
    richDecor: true,
  },
  "one-axis": {
    heroSection: "border-b-4 border-amber-400",
    heroBackground: "bg-gradient-to-tr from-amber-300/50 via-yellow-50 to-orange-200/40",
    services:
      "py-32 sm:py-40 relative overflow-hidden bg-gradient-to-b from-amber-100 via-orange-50 to-white border-y-4 border-amber-300",
    assessments: "py-24 bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50",
    about: "py-28 sm:py-36 relative overflow-hidden bg-gradient-to-br from-orange-50/80 to-amber-50/60",
    whySingapore: "py-32 bg-gradient-to-b from-white to-amber-100/50 relative overflow-hidden",
    contact: "py-36 bg-gradient-to-t from-amber-100 via-yellow-50 to-white border-t-4 border-orange-400 relative overflow-hidden",
    serviceCard:
      "group relative rounded-2xl border-2 border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2",
    assessmentLink:
      "group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-amber-200 hover:border-brand-navy-700",
    contactSectionCard:
      "group relative rounded-2xl border-2 border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2",
    whyCard:
      "group relative rounded-2xl border-2 border-amber-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2",
    contactFormWrap: "rounded-2xl border-2 border-amber-200 shadow-2xl bg-white",
    heroHeadlineClass: "",
    heroLogoWrapClass:
      "hidden items-center justify-center max-w-full rounded-2xl border-2 border-amber-300/70 bg-white/95 px-4 py-2.5 shadow-[0_12px_36px_-16px_rgba(245,158,11,0.22)]",
    navLogoClass:
      "h-32 w-auto object-contain object-left transition-opacity duration-200 group-hover:opacity-90",
    heroBadgeRowClass: "bg-amber-100 border-amber-400 text-amber-950 font-semibold",
    servicesHeaderClass: "text-center mb-16 sm:mb-20",
    servicesTitleClass: "text-amber-950",
    servicesSubtitleClass: "text-lg sm:text-xl text-amber-950/80 max-w-3xl mx-auto leading-relaxed",
    servicesGridClass: "grid grid-cols-1 md:grid-cols-2 gap-8",
    assessmentsHeaderClass: "text-center mb-12",
    contactHeaderClass: "text-center mb-16 sm:mb-20",
    pageHeaderSection:
      "relative bg-gradient-to-br from-amber-700 via-orange-600 to-amber-800 text-white py-20 sm:py-24 lg:py-28 overflow-hidden",
    pageMainBg: "bg-amber-50/45",
    pageSectionPrimary: "py-8 md:py-20 bg-white",
    pageSectionAlt: "py-20 bg-gradient-to-tr from-yellow-50 to-orange-100/50",
    pageListCard:
      "rounded-2xl border-2 border-amber-200 hover:border-brand-navy-700 shadow-md hover:shadow-xl transition-all group",
    faqCard: "rounded-2xl border-2 border-amber-200 hover:border-orange-400 transition-colors",
    faqCtaSection: "py-20 bg-gradient-to-b from-amber-100/60 to-yellow-50",
    faqCtaButton:
      "inline-block rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 font-semibold hover:opacity-90 transition-opacity",
    footerShell: "bg-gradient-to-r from-amber-950 to-brand-navy-900 text-amber-50",
    notFoundNumber: "text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600",
    notFoundPrimaryBtn: "rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:opacity-90 text-white",
    contactPageCard: "rounded-2xl border-2 border-amber-200",
    contactFormCard: "rounded-2xl border-2 border-amber-200",
    assessmentBottomCta: "py-20 bg-gradient-to-br from-amber-50 to-orange-50",
    richDecor: true,
  },
  "pr-bridge": {
    heroSection: "border-b border-slate-400",
    heroBackground: "bg-gradient-to-b from-slate-200 via-white to-slate-100",
    services: "py-24 sm:py-32 relative overflow-hidden bg-white border-y border-slate-300",
    assessments: "py-20 bg-slate-100 border-t-[5px] border-brand-navy-700",
    about: "py-24 sm:py-32 relative overflow-hidden bg-slate-50 border-y border-slate-200",
    whySingapore: "py-24 sm:py-32 bg-white border-t border-slate-300",
    contact: "py-28 bg-slate-100 border-t border-dashed border-slate-400",
    serviceCard:
      "group relative rounded-md border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white hover:-translate-y-0.5",
    assessmentLink:
      "group relative overflow-hidden rounded-md bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-slate-300 hover:border-brand-navy-700",
    contactSectionCard:
      "group relative rounded-md border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white",
    whyCard:
      "group relative rounded-md border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white",
    contactFormWrap: "rounded-md border border-slate-300 shadow-md bg-white",
    heroHeadlineClass: "font-semibold tracking-tight text-slate-900",
    heroBadgeRowClass: "rounded border border-slate-400 bg-slate-100 text-slate-800 shadow-none font-medium",
    heroLogoWrapClass:
      "hidden items-center justify-center max-w-full rounded-md border border-slate-300 bg-white px-3 py-2 shadow-sm",
    heroLogoClass:
      "block h-32 w-auto object-contain object-center mx-auto lg:mx-0 lg:object-left",
    navLogoClass:
      "h-32 w-auto object-contain object-left transition-opacity duration-200 group-hover:opacity-95",
    servicesHeaderClass: "text-left mb-12 max-w-3xl",
    servicesTitleClass: "text-slate-900 !text-3xl sm:!text-4xl font-semibold",
    servicesSubtitleClass: "text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed",
    servicesGridClass: "grid grid-cols-1 md:grid-cols-2 gap-6",
    assessmentsHeaderClass: "text-left mb-10 max-w-2xl",
    contactHeaderClass: "text-left mb-12 max-w-2xl",
    pageHeaderSection:
      "relative bg-slate-800 text-white py-16 sm:py-20 lg:py-24 overflow-hidden border-b-4 border-brand-navy-700",
    pageMainBg: "bg-slate-50",
    pageSectionPrimary: "py-8 md:py-20 bg-white",
    pageSectionAlt: "py-20 bg-slate-100 border-y border-slate-300",
    pageListCard:
      "rounded-md border border-slate-300 hover:border-brand-navy-700 shadow-sm hover:shadow-md transition-all group",
    faqCard: "rounded-md border border-slate-300 hover:border-brand-navy-700 transition-colors",
    faqCtaSection: "py-20 bg-slate-200 border-t border-dashed border-slate-400",
    faqCtaButton:
      "inline-block rounded-md border border-slate-700 bg-slate-800 text-white px-8 py-3 font-semibold hover:bg-slate-900 transition-colors",
    footerShell: "bg-slate-900 text-slate-300",
    notFoundNumber: "text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-900",
    notFoundPrimaryBtn: "rounded-md border border-slate-800 bg-slate-800 hover:bg-slate-900 text-white",
    contactPageCard: "rounded-md border border-slate-300",
    contactFormCard: "rounded-md border border-slate-300",
    assessmentBottomCta: "py-20 bg-slate-100 border-t border-slate-300",
    richDecor: false,
  },
  "prime-residency": {
    heroSection: "shadow-[0_24px_80px_-24px_rgba(230,83,37,0.35)]",
    heroBackground: "bg-gradient-to-b from-orange-200/70 via-amber-100/60 to-white",
    services:
      "py-32 sm:py-40 relative overflow-hidden bg-gradient-to-b from-orange-50 via-white to-amber-50/60 rounded-t-[3rem]",
    assessments: "py-24 bg-gradient-to-br from-orange-100/50 to-white",
    about: "py-32 sm:py-40 relative overflow-hidden bg-gradient-to-t from-orange-50/80 via-white to-white",
    whySingapore: "py-32 bg-gradient-to-b from-white via-orange-50/40 to-orange-100/30 relative overflow-hidden",
    contact: "py-36 bg-gradient-to-br from-amber-50 to-orange-50 rounded-t-[3rem] relative overflow-hidden",
    serviceCard:
      "group relative rounded-3xl border border-orange-200 shadow-2xl hover:shadow-[0_25px_70px_-12px_rgba(230,83,37,0.25)] transition-all duration-500 overflow-hidden bg-white/95 backdrop-blur-sm hover:-translate-y-3",
    assessmentLink:
      "group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-orange-100 hover:border-brand-navy-700",
    contactSectionCard:
      "group relative rounded-3xl border border-orange-200 shadow-2xl hover:shadow-xl transition-all duration-500 overflow-hidden bg-white/95 hover:-translate-y-2",
    whyCard:
      "group relative rounded-3xl border border-orange-200 shadow-2xl hover:shadow-xl transition-all duration-500 overflow-hidden bg-white hover:-translate-y-2",
    contactFormWrap: "rounded-3xl border border-orange-200 shadow-2xl bg-white/95",
    heroHeadlineClass: "tracking-tight text-balance",
    heroLogoWrapClass:
      "hidden items-center justify-center max-w-full rounded-3xl border border-orange-200/90 bg-white/95 px-4 py-2.5 shadow-[0_16px_44px_-18px_rgba(234,88,12,0.2)] ring-1 ring-orange-100/60",
    navLogoClass:
      "h-32 w-auto object-contain object-left transition-opacity duration-200 group-hover:opacity-90",
    heroBadgeRowClass: "bg-orange-100 border-orange-300 text-orange-900",
    servicesHeaderClass: "text-center mb-16 sm:mb-20",
    servicesTitleClass: "text-orange-950 font-extrabold",
    servicesSubtitleClass:
      "text-lg sm:text-2xl text-orange-950/85 max-w-3xl mx-auto leading-relaxed font-medium",
    servicesGridClass: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10",
    assessmentsHeaderClass: "text-center mb-12",
    contactHeaderClass: "text-center mb-16 sm:mb-20",
    pageHeaderSection:
      "relative bg-gradient-to-br from-orange-600 via-amber-500 to-orange-700 text-white py-20 sm:py-24 lg:py-28 overflow-hidden",
    pageMainBg: "bg-orange-50/40",
    pageSectionPrimary: "py-8 md:py-20 bg-white",
    pageSectionAlt: "py-20 bg-gradient-to-b from-amber-100/50 via-white to-orange-50/70",
    pageListCard:
      "rounded-3xl border border-orange-200 hover:border-brand-navy-700 shadow-lg hover:shadow-2xl transition-all group",
    faqCard: "rounded-3xl border border-orange-200 hover:border-orange-400 transition-colors",
    faqCtaSection: "py-20 bg-gradient-to-br from-orange-100/50 to-amber-50",
    faqCtaButton:
      "inline-block rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 text-white px-8 py-3 font-semibold hover:opacity-90 transition-opacity shadow-lg",
    footerShell: "bg-gradient-to-r from-orange-950 to-brand-navy-900 text-amber-50",
    notFoundNumber: "text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500",
    notFoundPrimaryBtn: "rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 hover:opacity-90 text-white shadow-lg",
    contactPageCard: "rounded-3xl border border-orange-200",
    contactFormCard: "rounded-3xl border border-orange-200",
    assessmentBottomCta: "py-20 bg-gradient-to-br from-amber-50 to-orange-100/50",
    richDecor: true,
  },
}

export function getHomeSkin(themeId) {
  return { ...HOME_SKINS.averra, ...(HOME_SKINS[themeId] ?? {}) }
}
