import { CheckInData, Story } from '../types';

export function generateAllegoryStory(checkIn: CheckInData): Story {
  const { emotionId, valence, areas, reflectionText } = checkIn;
  const areaListStr = areas.length > 0 ? areas.join(', ') : 'everyday life';

  const storyTemplates: Record<string, {
    title: string;
    subtitle: string;
    quote: string;
    quoteAuthor: string;
    paragraphs: string[];
    category: Story['category'];
    categoryLabel: string;
    tags: string[];
    image: string;
    companionImage: string;
  }> = {
    anxious: {
      title: 'The Willow by the Rushing Brook',
      subtitle: 'Learning to bend with the swift current rather than resist it',
      quote: '“The branch that yields to the cold water is the one that blossoms first when morning comes.”',
      quoteAuthor: 'The Stream Guardian',
      paragraphs: [
        'Beneath the quiet curve of the northern hills, a young weeping willow dipped its slender fronds into the swift mountain stream. The snowmelt made the water run fast and turbulent today, pulling at every leaf with anxious insistence.',
        `Elena, like the willow standing against the torrent of ${areaListStr}, your mind has been bracing against the rush. When you whispered, "${reflectionText || 'I am holding my breath'}", the branches felt that quiet tremor of needing to steady the world.`,
        'An elder heron landed upon the muddy bank, unbothered by the spray. "Little willow," whispered the bird, "why do you stiffen your wood against the current? The water is not your adversary; it is simply passing through to the wide sea. Your roots are held in deep, unmoving earth. Let your leaves dance with the water, knowing your foundation is untouched."',
        'With a quiet release, the willow softened its posture. It let the cold current slip harmlessly between its supple twigs. The water flowed on, but the willow remained rooted, peaceful, and unbroken.',
        'Whatever is rushing through your thoughts right now does not have to be stopped. Breathe with the stream, Elena. Your roots are deeper than the storm.'
      ],
      category: 'anxiety',
      categoryLabel: 'Anxiety Relief',
      tags: ['Rooted Ground', 'Bending with Grace', 'Letting Go'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHhbaNF_zvM3lbZj4vf-nb0FaBknItFeY4fQ9c6EDEo1WUzGm1JkgiVr9rfNqnNcpOFISqn5hYbtFGUoGtZSi9H6jpOgL5cxVTrDlnIemtmM5SbsID4zg0Zr3ott9GurZSBgiumIXdq_CfaYOCdt9dEkA9X2VuHhKvmd7pwHrtv5iwjipCMzICNSrGKMDEZTiXr74Mt_OYmV9PmwY62dTG2HOcyEuTptklyFLDCgorpoIuTjDY7-V94w',
      companionImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc0val07bSp_sfDJiQneVz4FSuJ5TGaeR36sgLcXQUHHgIN6f-olNgzsqSqNjYXpJMYoMyPm7KVRLRPNeJpITcaZsblK1DlnO9Ys11SlMZ0-MAs7xZyRTmLjyN6mp49wgf371XREskqhO_YrlOF0pCswsExa9g7gp68GVYxNU_tQyJ9lnX60CeJaacFyHGE7kIpWJRxjz7JP5bqb1WemAfBVawCd1LM_OsGkNsdhQ1GXyKBRLywj0iwg',
    },
    encouragement: {
      title: 'The Seed Beneath the Snow',
      subtitle: 'Quiet faith during the invisible seasons of becoming',
      quote: '“Do not mistake silence for absence; beneath the frozen crust, life is silently dreaming its sweetest green.”',
      quoteAuthor: 'Winter Solace',
      paragraphs: [
        'A blanket of soft white snow covered the forest floor in gentle slumber. Underneath five inches of cold silence lay a tiny wild seed, dark and tucked into the peat.',
        `Elena, when expectations around ${areaListStr} press down with an intensity of ${valence}/10, you might ask why results seem slow to emerge. ${reflectionText ? `You noted: "${reflectionText}"` : 'Your heart feels the quiet weight of waiting.'}`,
        'The earth spoke softly to the dormant seed: "There is nothing you need to force today. The sun will warm the crust in its own good time. Your work right now is simply to rest, to gather nourishment from the dark, and to trust that your flowering is already written in your nature."',
        'The seed relaxed into the loam, exhaling into the quiet warmth of winter. It stopped trying to sprout through ice and simply let itself be cradled.',
        'You are growing even when you cannot see the buds, Elena. Give today the grace of gentle stillness.'
      ],
      category: 'encouragement',
      categoryLabel: 'Need Encouragement',
      tags: ['Patience', 'Quiet Growth', 'Unshakable Faith'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYp8KB5aR5cd_Lcarhap8dArtm0V81tdIvj6dVnydzsWeO2UyodeNQNrEnUZKr5TNpxbM5VrJkGq2zbFd2JvdaGsIWmyXDdZ2KQ1kiujWB7HHPjNKEG6CUEdOxXJ8rdmB0PAstxY_xqjhTVoLOIiO0Nl2HeQSpH0k4WcttSnYps_CuBSaSEAI51FTkW1dTubrDIXJs6IHCVV8EfAIAaIpLbHbY4FRR5Thtn18KSkZZbjOodjEG9iNKwg',
      companionImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsAEnJ2M_cXiMTcAJ-O2_hSULOueoRVuANdJcr9PR0RyUfxpsDfEsU07aQtRzyUgV7xjtAuzciQyM7i1jw6lEUynT1-sTM-Au-E0dGWv1Ei5IZfJxulTr5cYOwktRxC1Zi5O0x6nBhnW0CicsHbzFlyEK3O9S_hq3ISF-MyLuvZxvzebZIeYVbHrK-PHerDqaf3rv-TSmA1lCCjf5sjtOpZzwoLv_3jgWOU5hDHPe5mRotT_7H9qlkeA',
    },
    lonely: {
      title: 'The Solitary Bell in the Valley',
      subtitle: 'The secret resonance that connects every open heart',
      quote: '“A note struck in solitude travels farther than the chatter of a crowded room.”',
      quoteAuthor: 'The Bellmaker',
      paragraphs: [
        'High atop the grassy ridge hung a bronze wind chime, tuned to the clear resonance of twilight. When the evening breeze stirred the hills, a single pure note rang across the empty valley.',
        `Elena, in quiet moments touched by ${areaListStr}, solitude can feel like an echo that has nowhere to land. ${reflectionText ? `"${reflectionText}" you reflected.` : 'A quiet longing for warmth and shared breath.'}`,
        'Miles across the valley, a tired traveler paused beneath a copper beech tree. Hearing that single, tender chime floating across the purple dusk, tears of relief touched her eyes. "I am not alone in this valley," she whispered.',
        'Your presence, your quiet care, and your heart ring out into this world in ways unseen. You are woven into the fabric of life, accompanied and deeply cherished.',
        'Wrap your hands around your warm mug tonight, Elena. The sanctuary holds you in gentle company.'
      ],
      category: 'loneliness',
      categoryLabel: 'Overcoming Loneliness',
      tags: ['Gentle Solitude', 'Resonance', 'Deep Connection'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJb4JdSkHje7yaKFBPM6qNHW-p63YaFgE1sJzVM-6W6OWDjucBjxSjzC9THmDdZ_Co0fFTK5Nv8VbNxKqm-zRayIawe2Ni4X_K1WKl4wlFbN1Kkx_GRiXVDUbBBuESoeDtXOO6G2Z-ZAr2uD5dNqBt0roas4KL__nNae-JY_Z2SJRvDIKpmusk5zgKfWQiQ99WNl9Q_0fGe4NZ7bABBKA90CgRjZxsfioOUp3JjgynGL3qGYXEoXxKCw',
      companionImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD1FhUVowI_nA_xo6ErUhwcpxk2hhPOy1SRrPIjmFS0nH1MK7eHF8cj8nF_K7XP2x1-j5J-hrVuPMlqFhVo6g7gg3ptIZWscqkk_2rH-TT_lXiAkrViSSYofUGXP41t4limO8knBcgv0G5tB9b1Wzg4xSJ5OAT27SwaIJWRdXZr_ePTYBh3-L7ocpiBw6P77OdpVELSxBYuwkK0eq6jjWIch4wtZpC4fTEpZBCmROBmmEkzlO6yNo1YQ',
    },
    overwhelmed: {
      title: 'The Mountain and the Heavy Cloud',
      subtitle: 'Recognizing that fog cannot dismantle stone',
      quote: '“Clouds do not injure the peak; they simply give it a quiet place to hide until the sun returns.”',
      quoteAuthor: 'The Ridge Elder',
      paragraphs: [
        'A thick autumn mist rolled up from the canyon, wrapping the granite ridge in dense, disorienting gray. For hours, neither tree nor valley could be seen; all reference points vanished into fog.',
        `Elena, when ${areaListStr} feels swirling with an intensity of ${valence}/10, you might feel like your clarity has been stolen. ${reflectionText ? `You shared: "${reflectionText}"` : 'The mind longs for a compass.'}`,
        'The ancient granite did not panic or build walls against the vapor. It knew that mist has no weight, no teeth, and no lasting home. The mountain simply stood quietly, letting the damp clouds drift across its shoulders until the afternoon wind scattered them like dust.',
        'Your strength does not depend on seeing ten steps ahead. It is enough to stand here, feeling the solid floor beneath your feet.',
        'Breathe into your spine, Elena. The cloud will pass; the mountain remains.'
      ],
      category: 'anxiety',
      categoryLabel: 'Overwhelmed',
      tags: ['Anchoring', 'Stillness', 'Clear Ground'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD1FhUVowI_nA_xo6ErUhwcpxk2hhPOy1SRrPIjmFS0nH1MK7eHF8cj8nF_K7XP2x1-j5J-hrVuPMlqFhVo6g7gg3ptIZWscqkk_2rH-TT_lXiAkrViSSYofUGXP41t4limO8knBcgv0G5tB9b1Wzg4xSJ5OAT27SwaIJWRdXZr_ePTYBh3-L7ocpiBw6P77OdpVELSxBYuwkK0eq6jjWIch4wtZpC4fTEpZBCmROBmmEkzlO6yNo1YQ',
      companionImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc0val07bSp_sfDJiQneVz4FSuJ5TGaeR36sgLcXQUHHgIN6f-olNgzsqSqNjYXpJMYoMyPm7KVRLRPNeJpITcaZsblK1DlnO9Ys11SlMZ0-MAs7xZyRTmLjyN6mp49wgf371XREskqhO_YrlOF0pCswsExa9g7gp68GVYxNU_tQyJ9lnX60CeJaacFyHGE7kIpWJRxjz7JP5bqb1WemAfBVawCd1LM_OsGkNsdhQ1GXyKBRLywj0iwg',
    },
    stuck: {
      title: 'The Butterfly in the Chrysalis',
      subtitle: 'Honoring the dark stillness before the unfolding',
      quote: '“The quiet cocoon is not a prison; it is a sacred workshop of renewal.”',
      quoteAuthor: 'The Garden Sage',
      paragraphs: [
        'Suspended beneath an olive branch, the emerald chrysalis hung motionless in the afternoon warmth. To the passing ants, nothing seemed to happen for days.',
        `Elena, feeling stuck in ${areaListStr} often brings a restless self-critique. ${reflectionText ? `"${reflectionText}" you pondered.` : 'You wonder why you are not in flight.'}`,
        'Yet inside the quiet green chamber, a profound miracle of transformation was taking place. Old forms were softening, making space for vibrant wings to form in silence.',
        'Allow yourself this period of incubation without judgment. You are not stuck; you are reconstituting your energy for the next season.',
        'Trust the quiet cocoon, Elena. Every wing needs darkness to unfold.'
      ],
      category: 'rest',
      categoryLabel: 'Deep Rest',
      tags: ['Transformation', 'Sanctuary Rest', 'Quiet Space'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsAEnJ2M_cXiMTcAJ-O2_hSULOueoRVuANdJcr9PR0RyUfxpsDfEsU07aQtRzyUgV7xjtAuzciQyM7i1jw6lEUynT1-sTM-Au-E0dGWv1Ei5IZfJxulTr5cYOwktRxC1Zi5O0x6nBhnW0CicsHbzFlyEK3O9S_hq3ISF-MyLuvZxvzebZIeYVbHrK-PHerDqaf3rv-TSmA1lCCjf5sjtOpZzwoLv_3jgWOU5hDHPe5mRotT_7H9qlkeA',
      companionImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc0val07bSp_sfDJiQneVz4FSuJ5TGaeR36sgLcXQUHHgIN6f-olNgzsqSqNjYXpJMYoMyPm7KVRLRPNeJpITcaZsblK1DlnO9Ys11SlMZ0-MAs7xZyRTmLjyN6mp49wgf371XREskqhO_YrlOF0pCswsExa9g7gp68GVYxNU_tQyJ9lnX60CeJaacFyHGE7kIpWJRxjz7JP5bqb1WemAfBVawCd1LM_OsGkNsdhQ1GXyKBRLywj0iwg',
    },
    hopeful: {
      title: 'Dawn on the Silver Marsh',
      subtitle: 'Welcoming the gentle return of morning light',
      quote: '“Dawn never announces itself with thunder; it slips quietly across the dew, warming everything it touches.”',
      quoteAuthor: 'Morning Star',
      paragraphs: [
        'The pale pink rim of morning crept across the sleeping reeds. One by one, droplets of dew began to glimmer like fallen stars upon the sedge grass.',
        `Elena, this tender hope you feel today in ${areaListStr} is a delicate blossom. ${reflectionText ? `"${reflectionText}" you reflected.` : 'A quiet renewal taking root.'}`,
        'The pond water mirrored the sunrise, calm and unobstructed. When hope arrives, it does not demand that all problems disappear; it simply offers the sweet, quiet assurance that warmth is on its way.',
        'Savor this moment of tenderness. You have walked through misty valleys to meet this gentle dawn.',
        'May this quiet sunrise stay in your chest all throughout today, Elena.'
      ],
      category: 'encouragement',
      categoryLabel: 'Dawn of Hope',
      tags: ['Gentle Dawn', 'Renewal', 'Heart Warmth'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYp8KB5aR5cd_Lcarhap8dArtm0V81tdIvj6dVnydzsWeO2UyodeNQNrEnUZKr5TNpxbM5VrJkGq2zbFd2JvdaGsIWmyXDdZ2KQ1kiujWB7HHPjNKEG6CUEdOxXJ8rdmB0PAstxY_xqjhTVoLOIiO0Nl2HeQSpH0k4WcttSnYps_CuBSaSEAI51FTkW1dTubrDIXJs6IHCVV8EfAIAaIpLbHbY4FRR5Thtn18KSkZZbjOodjEG9iNKwg',
      companionImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc0val07bSp_sfDJiQneVz4FSuJ5TGaeR36sgLcXQUHHgIN6f-olNgzsqSqNjYXpJMYoMyPm7KVRLRPNeJpITcaZsblK1DlnO9Ys11SlMZ0-MAs7xZyRTmLjyN6mp49wgf371XREskqhO_YrlOF0pCswsExa9g7gp68GVYxNU_tQyJ9lnX60CeJaacFyHGE7kIpWJRxjz7JP5bqb1WemAfBVawCd1LM_OsGkNsdhQ1GXyKBRLywj0iwg',
    }
  };

  const chosen = storyTemplates[emotionId] || storyTemplates.anxious;

  return {
    id: `story-${Date.now()}`,
    title: chosen.title,
    subtitle: chosen.subtitle,
    quote: chosen.quote,
    quoteAuthor: chosen.quoteAuthor,
    paragraphs: chosen.paragraphs,
    readTime: '4 min read',
    audioTime: '3 min audio listen',
    audioDurationSeconds: 215,
    category: chosen.category,
    categoryLabel: chosen.categoryLabel,
    tags: chosen.tags,
    image: chosen.image,
    companionImage: chosen.companionImage,
    keywords: `${chosen.title} ${chosen.category} ${areas.join(' ')} reflection`,
    writtenAgo: 'Just now',
    isFavorite: false,
    isBookmarked: true,
    originBadge: `Created today based on feeling ${checkIn.emotionTitle.toLowerCase()}`,
    personalizationNote: `Written for Elena · Touched by ${areaListStr}`,
  };
}
