import type { RedFlagDefinition } from './types';

export const RED_FLAG_LIBRARY: RedFlagDefinition[] = [
  // ==================== EMOTIONAL MANIPULATION ====================
  {
    id: 'gaslighting',
    name: 'Gaslighting',
    category: 'Emotional Manipulation',
    description: 'A form of psychological manipulation where someone makes you question your own reality, memory, or perceptions. They deny things they said or did, even when you have proof.',
    examples: [
      '"That never happened" or "You\'re imagining things"',
      '"You\'re too sensitive" or "You\'re overreacting"',
      '"You\'re crazy" or "You\'re making things up"',
      'Denying conversations or events that definitely occurred',
      'Twisting facts to make you doubt your memory',
      '"You\'re remembering it wrong" when you know you\'re not'
    ],
    severity: 'severe',
    whatToDo: [
      'Keep a private journal documenting incidents with dates and details',
      'Trust your own perceptions and feelings',
      'Talk to trusted friends or family about what\'s happening',
      'Consider speaking with a therapist who understands gaslighting',
      'Set firm boundaries about what you know to be true'
    ],
    howToCounter: {
      recognizeIt: [
        'You constantly second-guess yourself and your memory',
        'You apologize frequently even when you didn\'t do anything wrong',
        'You feel confused about what\'s real after conversations with them',
        'You make excuses for their behavior to others',
        'You feel like you\'re "going crazy" or losing your grip on reality',
        'Friends/family express concern about changes in your confidence'
      ],
      responseStrategies: [
        '**Document Everything:** Keep a private journal with dates, times, exact quotes, and witnesses',
        '**Trust Your Reality:** If you know something happened, don\'t let them convince you otherwise',
        '**Get Outside Perspective:** Talk to people you trust about specific incidents',
        '**Use Facts:** "I have this text message/email where you said X" or "I wrote this down when it happened"',
        '**Don\'t Engage in Circular Arguments:** State your truth once, then disengage',
        '**Validate Yourself:** You don\'t need their validation to know what you experienced'
      ],
      scriptExamples: [
        'Them: "I never said that." → You: "I remember clearly. I\'m not debating this."',
        'Them: "You\'re overreacting." → You: "My feelings are valid. This matters to me."',
        'Them: "You\'re too sensitive." → You: "I get to decide what bothers me."',
        'Them: "That didn\'t happen." → You: "It did, and I\'m not arguing about reality."'
      ],
      boundariesToSet: [
        '"I trust my memory and perceptions. This conversation is over."',
        '"I won\'t accept being told I\'m crazy. If you continue, I\'m leaving."',
        '"We can disagree about opinions, but not about facts that happened."',
        '"I need you to respect my reality. If you can\'t, we can\'t continue this relationship."'
      ],
      whenToLeave: [
        'When you can no longer trust your own memory or judgment',
        'When they deny things you have proof of',
        'When your mental health is deteriorating (anxiety, depression, confusion)',
        'When you\'re isolated from people who validate your reality',
        'When they refuse to acknowledge the gaslighting even after being confronted',
        'When you feel like you\'re losing yourself'
      ]
    },
    resources: [
      'National Domestic Violence Hotline: 1-800-799-7233',
      'Book: "The Gaslight Effect" by Dr. Robin Stern',
      'Online: gaslightingcheck.com',
      'Therapist specializing in emotional abuse recovery'
    ]
  },

  {
    id: 'love-bombing',
    name: 'Love Bombing',
    category: 'Emotional Manipulation',
    description: 'Overwhelming someone with excessive affection, attention, gifts, and promises early in a relationship. It\'s a manipulation tactic to gain control quickly.',
    examples: [
      'Saying "I love you" within days or weeks',
      'Constant texting and demands for attention (50+ texts/day)',
      'Excessive gifts or grand romantic gestures very early',
      'Talking about marriage, children, or future within weeks',
      'Making you feel like you\'re "soulmates" immediately',
      'Intense jealousy disguised as passion',
      '"You\'re different from everyone else" within days of meeting'
    ],
    severity: 'moderate',
    whatToDo: [
      'Take things slow - healthy relationships develop gradually',
      'Maintain your independence and personal boundaries',
      'Stay connected with friends and family',
      'Notice if the intensity drops or turns negative suddenly',
      'Trust your instincts if something feels too good to be true'
    ],
    howToCounter: {
      recognizeIt: [
        'Relationship intensity is disproportionate to how long you\'ve known them',
        'They want to be with you 24/7 and get upset when you\'re busy',
        'They\'re pushing for commitment (exclusivity, moving in, marriage) very quickly',
        'They mirror everything you like (suddenly share all your interests)',
        'Your friends/family express concern about how fast it\'s moving',
        'You feel overwhelmed but also flattered and special'
      ],
      responseStrategies: [
        '**Slow Down:** "I need to take things slowly to build a healthy foundation"',
        '**Maintain Your Life:** Keep seeing friends, pursuing hobbies, maintaining routines',
        '**Create Space:** "I need some alone time tonight" - see how they react',
        '**Test Boundaries:** Say "no" to something small and observe their response',
        '**Reality Check:** Ask yourself: "Would this feel normal if I described it to a friend?"',
        '**Watch for the Drop:** Note if intensity suddenly shifts to coldness or criticism'
      ],
      scriptExamples: [
        'Them: "I love you" (week 2) → You: "I really like you, but I need time before I can say that."',
        'Them: "Cancel your plans, spend the weekend with me" → You: "I have commitments. Let\'s plan something for [specific time]."',
        'Them: "I can\'t live without you" → You: "That\'s a lot of pressure. Let\'s take this one day at a time."',
        'Them: "You\'re my everything" (early on) → You: "I need us both to have independent lives too."'
      ],
      boundariesToSet: [
        '"I need to maintain my friendships and won\'t be available 24/7."',
        '"I\'m not comfortable discussing marriage/moving in yet. Let\'s revisit in [timeframe]."',
        '"I need alone time regularly. It\'s not about you - it\'s about my well-being."',
        '"I appreciate the gifts, but I\'d prefer we focus on getting to know each other."'
      ],
      whenToLeave: [
        'When they get angry or punish you for having boundaries',
        'When the "love bombing" suddenly stops and turns cold/critical',
        'When you feel controlled rather than cherished',
        'When they refuse to slow down despite your requests',
        'When they isolate you from friends/family',
        'When other red flags emerge (jealousy, control, anger)'
      ]
    },
    resources: [
      'Article: "Love Bombing: What It Is and How to Spot It"',
      'Book: "Psychopath Free" by Jackson MacKenzie',
      'Therapist specializing in narcissistic abuse'
    ]
  },

  {
    id: 'blame-shifting',
    name: 'Blame Shifting',
    category: 'Emotional Manipulation',
    description: 'Refusing to take responsibility for their actions and always making it your fault. Nothing is ever their responsibility.',
    examples: [
      '"You made me do this"',
      '"If you hadn\'t... then I wouldn\'t have..."',
      '"This is all your fault"',
      'Turning every discussion of their behavior into criticism of you',
      'Never genuinely apologizing',
      '"I only did X because you did Y first"'
    ],
    severity: 'moderate',
    whatToDo: [
      'Recognize that you\'re not responsible for their choices',
      'Don\'t accept blame for their actions',
      'Notice the pattern if apologies never happen',
      'Consider if this is a relationship worth continuing',
      'Set boundaries about accountability'
    ],
    howToCounter: {
      recognizeIt: [
        'Every fight ends with you apologizing, even for things they did',
        'They never say "I\'m sorry" without a "but" afterward',
        'You\'re constantly walking on eggshells to avoid "making" them act badly',
        'They rewrite history to make you the villain',
        'You feel responsible for their emotions and behaviors',
        'You\'re exhausted from defending yourself'
      ],
      responseStrategies: [
        '**Name the Pattern:** "I notice you never take responsibility. It\'s always my fault."',
        '**Refuse to Accept It:** "I didn\'t make you do that. You chose to do that."',
        '**Stay on Topic:** "We\'re talking about what YOU did, not deflecting to me."',
        '**Don\'t Defend:** Resist the urge to justify yourself - it\'s a trap',
        '**Require Real Apologies:** "I\'m sorry" without changed behavior is meaningless',
        '**Document the Pattern:** Keep track of who\'s always apologizing (hint: it\'s you)'
      ],
      scriptExamples: [
        'Them: "You made me yell!" → You: "No. You chose to yell. I didn\'t control your mouth."',
        'Them: "If you weren\'t so [X], I wouldn\'t [Y]!" → You: "Your behavior is your responsibility, not mine."',
        'Them: "I\'m sorry BUT you..." → You: "That\'s not an apology. That\'s an excuse."',
        'Them: "Why do you always..." → You: "We\'re discussing YOUR behavior right now."'
      ],
      boundariesToSet: [
        '"I will not accept blame for your choices. You are responsible for your own behavior."',
        '"A real apology includes changed behavior. Words without action mean nothing."',
        '"If you can\'t take accountability, we can\'t have a healthy relationship."',
        '"I\'m done being the scapegoat. Either we both take responsibility or we\'re done."'
      ],
      whenToLeave: [
        'When they never, ever take accountability for anything',
        'When you\'re constantly apologizing for things you didn\'t do',
        'When you start believing you really are the problem',
        'When they blame you for their abuse ("You made me hit you")',
        'When every conversation leaves you feeling gaslit and crazy',
        'When they refuse to see or acknowledge the pattern'
      ]
    },
    resources: [
      'Article: "DARVO: Deny, Attack, Reverse Victim and Offender"',
      'Therapist specializing in emotional abuse'
    ]
  },

  {
    id: 'silent-treatment',
    name: 'Silent Treatment',
    category: 'Emotional Manipulation',
    description: 'Withdrawing communication and affection as punishment. It\'s emotional abuse designed to control through fear of abandonment.',
    examples: [
      'Ignoring you for hours or days after a disagreement',
      'Refusing to speak or acknowledge your existence',
      'Giving you the "cold shoulder"',
      'Punishing you with silence until you apologize',
      'Shutting down emotionally when you try to talk',
      'Acting like you don\'t exist to make you desperate for attention'
    ],
    severity: 'moderate',
    whatToDo: [
      'Recognize this is emotional abuse, not conflict resolution',
      'Don\'t reward the behavior by chasing them',
      'State your boundary and give them space',
      'Use the time to reflect on whether this is healthy',
      'Don\'t apologize just to end the silence'
    ],
    howToCounter: {
      recognizeIt: [
        'You\'re constantly anxious about "setting them off" and being iced out',
        'You apologize even when you didn\'t do anything wrong, just to restore contact',
        'You feel punished and controlled rather than in a healthy disagreement',
        'The silent treatment lasts hours or days, not minutes',
        'They refuse to communicate at all, making resolution impossible',
        'You feel desperate, anxious, and powerless during the silence'
      ],
      responseStrategies: [
        '**Don\'t Chase:** Give them space but don\'t reward the manipulation by begging',
        '**State Your Boundary Once:** "I\'m here when you\'re ready to talk respectfully" then stop',
        '**Live Your Life:** Don\'t put your life on hold waiting for them to "forgive" you',
        '**Don\'t Apologize to End It:** Only apologize if you genuinely did something wrong',
        '**Recognize the Pattern:** Is this their go-to move? That\'s a red flag',
        '**Call It Out:** "Using silence as punishment is not okay. It\'s emotional abuse."'
      ],
      scriptExamples: [
        'After stating your boundary: "I\'m ready to talk when you are. I\'ll be [doing X]."',
        'When they break silence: "I don\'t accept the silent treatment as conflict resolution. We need healthier communication."',
        'If they deny: "You ignored me for three days. That\'s not cooling off - that\'s punishment."',
        'Setting future boundary: "Next time you shut down, I\'m not waiting around. I have a life."'
      ],
      boundariesToSet: [
        '"I will not accept being ignored as punishment. I need respectful communication or space to consider this relationship."',
        '"If you need space, say so. Silence as manipulation is emotional abuse."',
        '"I\'m willing to give you time to cool down, but stonewalling for days is not acceptable."',
        '"If this continues, I will have to decide if this relationship is healthy for me."'
      ],
      whenToLeave: [
        'When silent treatment lasts days or weeks',
        'When it\'s their go-to response to any disagreement',
        'When they refuse to acknowledge it\'s abusive',
        'When you\'re constantly anxious about triggering the next freeze-out',
        'When they use it to control your behavior ("I won\'t talk until you...")',
        'When your mental health is suffering from the emotional rollercoaster'
      ]
    },
    resources: [
      'Article: "The Silent Treatment is Emotional Abuse"',
      'National Domestic Violence Hotline: 1-800-799-7233',
      'Therapist specializing in emotional abuse'
    ]
  },

  // ==================== CONTROL & ISOLATION ====================
  
  {
    id: 'isolation',
    name: 'Isolation from Support Network',
    category: 'Control',
    description: 'Systematically cutting you off from friends, family, and support systems to increase their control over you.',
    examples: [
      '"I don\'t like your friends, stop seeing them"',
      '"Your family is toxic" (when they\'re not)',
      '"It\'s me or them" ultimatums',
      'Getting angry when you spend time with others',
      'Monitoring or controlling who you talk to',
      'Moving you far from your support network',
      'Making you feel guilty for having other relationships',
      'Starting fights before your plans with others so you cancel'
    ],
    severity: 'severe',
    whatToDo: [
      'Maintain connections with friends and family - this is crucial',
      'Recognize that healthy relationships encourage outside friendships',
      'If you\'re already isolated, reach out to someone you trust',
      'Talk to people about what\'s happening',
      'Consider this a major red flag requiring immediate attention'
    ],
    howToCounter: {
      recognizeIt: [
        'You\'ve lost touch with friends and family since this relationship started',
        'You make excuses to others for why you can\'t see them',
        'They criticize everyone you\'re close to',
        'You feel guilty spending time with anyone but them',
        'They track who you talk to and interrogate you about it',
        'You\'ve given up hobbies or activities to avoid conflict'
      ],
      responseStrategies: [
        '**Maintain Relationships:** Make seeing friends/family non-negotiable',
        '**Refuse Ultimatums:** "I can have both you and my family/friends. I won\'t choose."',
        '**Go Anyway:** Make plans and follow through even if they sulk',
        '**Reconnect:** Reach out to people you\'ve lost touch with',
        '**Tell People:** Let friends/family know what\'s happening',
        '**Private Communication:** Have a phone/email they don\'t have access to'
      ],
      scriptExamples: [
        'Them: "Your friends are a bad influence." → You: "They\'ve been in my life longer than you. They stay."',
        'Them: "Why do you need friends when you have me?" → You: "Because I\'m a whole person with multiple relationships."',
        'Them: "It\'s me or them." → You: "I don\'t accept ultimatums. If you can\'t handle me having friends, we\'re incompatible."',
        'Them: "Don\'t tell anyone our business." → You: "I talk to people I trust about my life. That\'s healthy."'
      ],
      boundariesToSet: [
        '"My relationships with friends and family are non-negotiable."',
        '"I will not defend the people I love to you. If you don\'t like them, that\'s your issue."',
        '"I\'m allowed to have a life outside of you. If that\'s a problem, we have a bigger issue."',
        '"Trying to isolate me is abusive behavior. I won\'t accept it."'
      ],
      whenToLeave: [
        'When you\'ve lost all or most of your support system',
        'When they give you ultimatums about friends/family',
        'When you feel completely dependent on them',
        'When they\'ve successfully moved you away from your support network',
        'When you recognize this as a domestic violence tactic',
        'IMMEDIATELY - This is one of the most dangerous red flags'
      ]
    },
    resources: [
      'National Domestic Violence Hotline: 1-800-799-7233',
      'thehotline.org - Isolation info',
      'Local domestic violence shelter',
      'Safety planning resources'
    ]
  },

  {
    id: 'jealousy-control',
    name: 'Extreme Jealousy & Possessiveness',
    category: 'Control',
    description: 'Excessive jealousy that goes beyond normal concern, used as an excuse to control your behavior and relationships.',
    examples: [
      'Constantly checking your phone, email, or social media',
      'Accusing you of cheating without any reason',
      'Getting angry about how you dress',
      'Interrogating you about your whereabouts',
      'Forbidding you from talking to certain people',
      '"If you loved me, you\'d..." manipulations',
      'Tracking your location constantly via phone/GPS',
      'Showing up unexpectedly to "check" on you'
    ],
    severity: 'moderate',
    whatToDo: [
      'Recognize that jealousy is not love - it\'s about control',
      'Maintain your privacy and personal boundaries',
      'Don\'t accept monitoring or surveillance',
      'Trust is fundamental - without it, the relationship is unhealthy',
      'Consider if this behavior is escalating'
    ],
    howToCounter: {
      recognizeIt: [
        'You\'ve changed how you dress to avoid jealous reactions',
        'You\'ve cut off platonic friendships to keep the peace',
        'You\'re constantly defending yourself against false accusations',
        'Your phone password has become a battleground',
        'You feel surveilled rather than trusted',
        'You\'re afraid to like posts or talk to certain people'
      ],
      responseStrategies: [
        '**Refuse Access:** Your phone/email is YOUR private property',
        '**Don\'t Change Your Behavior:** Dress how you want, have friends you want',
        '**Call Out Accusations:** "You\'re accusing me without evidence. That\'s not okay."',
        '**Refuse to Be Tracked:** Turn off location sharing',
        '**Don\'t Over-Explain:** You don\'t owe detailed accounts of every interaction',
        '**Recognize Projection:** Often extreme jealousy means they\'re the one being unfaithful'
      ],
      scriptExamples: [
        'Them: "Let me see your phone." → You: "No. Trust me or leave."',
        'Them: "Who\'s [person]?" → You: "A friend/coworker. I\'m not explaining my entire social circle."',
        'Them: "You must be cheating." → You: "I\'m not. And I won\'t keep defending myself against paranoia."',
        'Them: "If you loved me, you\'d..." → You: "Love doesn\'t mean I give up my privacy or autonomy."'
      ],
      boundariesToSet: [
        '"My phone and email are private. I will not share passwords."',
        '"I will not report my location constantly. That\'s surveillance, not a relationship."',
        '"I will not defend myself against baseless accusations. Trust me or don\'t - that\'s your choice."',
        '"I will not change how I dress or who I\'m friends with. Your jealousy is your issue to work on."'
      ],
      whenToLeave: [
        'When jealousy turns into controlling your behavior',
        'When they track you without consent',
        'When they go through your phone/computer without permission',
        'When you\'re afraid of their jealous reactions',
        'When jealousy escalates to aggression or threats',
        'When they refuse to work on their jealousy issues'
      ]
    },
    resources: [
      'Article: "Jealousy vs. Controlling Behavior"',
      'Therapist for couples counseling (if both willing)',
      'National Domestic Violence Hotline if escalating: 1-800-799-7233'
    ]
  },

  {
    id: 'financial-control',
    name: 'Financial Control & Abuse',
    category: 'Control',
    description: 'Controlling access to money, preventing financial independence, or exploiting you financially to maintain power.',
    examples: [
      'Preventing you from working or advancing your career',
      'Controlling all the money and giving you an "allowance"',
      'Not allowing you to know about household finances',
      'Running up debt in your name',
      'Stealing money from your accounts',
      'Making you financially dependent on them',
      'Sabotaging your job (making you late, calling constantly, showing up)',
      'Ruining your credit score',
      'Forcing you to hand over your paycheck'
    ],
    severity: 'severe',
    whatToDo: [
      'Try to maintain some financial independence however possible',
      'Open a private bank account if possible (use paperless)',
      'Know your rights regarding shared finances',
      'Keep important documents in a safe place they can\'t access',
      'Seek advice from financial abuse specialists',
      'Document financial abuse for potential legal action'
    ],
    howToCounter: {
      recognizeIt: [
        'You have no access to bank accounts or financial information',
        'You need to ask permission to buy basic necessities',
        'They monitor every penny you spend',
        'You\'ve been fired or had to quit jobs because of their interference',
        'You have no money of your own',
        'They\'ve taken out credit cards or loans in your name',
        'You can\'t leave because you have no financial resources'
      ],
      responseStrategies: [
        '**Secret Account:** Open account at different bank with paperless statements',
        '**Stash Cash:** If they give you money, secretly save small amounts',
        '**Document Everything:** Screenshots, photos of statements, records of theft',
        '**Secure Your Credit:** Freeze your credit so they can\'t open accounts in your name',
        '**Keep Working:** Fight to maintain your job - it\'s your lifeline',
        '**Know Your Rights:** Research laws about marital assets and financial abuse',
        '**Exit Planning:** Save money secretly for eventual escape'
      ],
      scriptExamples: [
        'Them: "You don\'t need to work." → You: "I want to work. This isn\'t negotiable."',
        'Them: "Give me your paycheck." → You: "No. I\'m entitled to access my own money."',
        'Them: "You don\'t need to know about our finances." → You: "Actually, I do. I have a legal right."',
        'When leaving: [Don\'t warn them - just take action when safe]'
      ],
      boundariesToSet: [
        '"I will maintain my own bank account and access to money."',
        '"I will keep my job. Your interference at my workplace is unacceptable."',
        '"I have a right to know about our household finances."',
        '"I will not give you access to my accounts or credit."'
      ],
      whenToLeave: [
        'ASAP - Financial abuse is serious and often escalates',
        'When you have no access to money whatsoever',
        'When they\'ve destroyed your credit or stolen from you',
        'When they\'ve sabotaged your employment',
        'When you\'re completely financially trapped',
        'When combined with other forms of abuse'
      ]
    },
    resources: [
      'National Domestic Violence Hotline: 1-800-799-7233 (can help with financial safety planning)',
      'Local domestic violence shelter (often have financial assistance)',
      'Legal Aid Society for free legal help',
      'Purple Purse Foundation (financial abuse resources)',
      'Book: "The Money Class" for building financial literacy',
      'Freeze your credit at: Equifax, Experian, TransUnion'
    ]
  },

  // ==================== SAFETY CONCERNS ====================
  
  {
    id: 'threats',
    name: 'Threats & Intimidation',
    category: 'Safety',
    description: 'Using threats of harm to you, themselves, pets, or property to control your behavior and keep you compliant.',
    examples: [
      'Threatening to hurt you physically',
      'Threatening to kill themselves if you leave',
      'Threatening to harm your pets or children',
      'Threatening to damage your property',
      'Threatening to take your children away',
      '"You\'ll regret this" or "You don\'t know what I\'m capable of"',
      'Veiled threats that create fear',
      'Threatening to ruin your reputation or career',
      'Threatening to out you (sexuality, secrets, etc.)'
    ],
    severity: 'severe',
    whatToDo: [
      'Take all threats seriously',
      'Document threats (save messages, emails, voicemails)',
      'Tell someone you trust about the threats',
      'Create a safety plan with escape routes and safe places',
      'Contact domestic violence resources for safety planning',
      'Consider involving law enforcement',
      'If in immediate danger, call 911'
    ],
    howToCounter: {
      recognizeIt: [
        'You\'re afraid of what they might do',
        'You stay in the relationship partly out of fear',
        'They\'ve made specific threats about what will happen if you leave',
        'You believe they\'re capable of following through',
        'The threats are escalating in frequency or severity',
        'They use threats to get their way about other things'
      ],
      responseStrategies: [
        '**SAFETY FIRST:** Your life is more important than the relationship',
        '**Document Threats:** Screenshot texts, save voicemails, write down verbal threats with dates',
        '**Tell Others:** Multiple people need to know about the threats',
        '**Restraining Order:** Consult with DV advocate about protective orders',
        '**Safety Plan:** Have escape plan, safe place to go, emergency bag ready',
        '**Don\'t Warn Them:** Don\'t tell them you\'re leaving - just leave when safe',
        '**Involve Professionals:** Police, DV advocates, lawyers'
      ],
      scriptExamples: [
        '[DO NOT confront someone making threats - prioritize safety over confrontation]',
        'To police: "They threatened to [X]. I\'m afraid for my safety."',
        'To DV hotline: "They said they\'ll [X] if I leave. I need a safety plan."',
        'To trusted friend: "If anything happens to me, [person] made these threats."'
      ],
      boundariesToSet: [
        '[DO NOT try to set boundaries with someone making threats]',
        '[Boundaries require a rational person who respects them]',
        '[With threats, focus on SAFETY PLANNING and ESCAPE]'
      ],
      whenToLeave: [
        'IMMEDIATELY - Do not pass Go, do not collect $200',
        'Any threat is grounds for immediate exit',
        'Especially threats of violence, murder, suicide',
        'Call DV hotline to help plan safe exit: 1-800-799-7233',
        'Leave when they\'re not home, with help',
        'Go to DV shelter if you have nowhere else safe',
        'Get restraining order immediately'
      ]
    },
    resources: [
      '🚨 EMERGENCY: 911',
      'National Domestic Violence Hotline: 1-800-799-7233 (24/7)',
      'National Suicide Prevention Lifeline: 988 (if threatening suicide)',
      'thehotline.org/plan-for-safety',
      'Local domestic violence shelter',
      'Police department for restraining order',
      'Lawyer for protective order'
    ]
  },

  {
    id: 'physical-escalation',
    name: 'Physical Violence & Aggression',
    category: 'Safety',
    description: 'Any physical violence or actions that intimidate or harm you physically. This WILL escalate.',
    examples: [
      'Hitting, slapping, punching, kicking, or any physical violence',
      'Choking or strangulation (extremely dangerous)',
      'Throwing objects at you or near you',
      'Punching walls or doors to intimidate',
      'Blocking your way or physically restraining you',
      'Grabbing, shoving, or pushing you',
      'Driving recklessly to scare you',
      'Destroying your belongings',
      'Physical intimidation (towering over you, cornering you)',
      'Hurting you during sex without consent'
    ],
    severity: 'severe',
    whatToDo: [
      'YOUR SAFETY IS THE PRIORITY - leave if possible',
      'Call 911 if you are in immediate danger',
      'Seek medical attention for any injuries (creates documentation)',
      'Take photos of injuries immediately',
      'Tell medical staff the truth about how injuries occurred',
      'Talk to domestic violence advocates about safety planning',
      'Consider a protective order',
      'Know that abuse typically escalates'
    ],
    howToCounter: {
      recognizeIt: [
        'They\'ve hit, pushed, or physically hurt you - even "just once"',
        'You\'re afraid of them physically',
        'They break things when angry',
        'They\'ve threatened physical violence',
        'You walk on eggshells to avoid triggering their anger',
        'They\'ve choked you (most dangerous - 750% increased risk of murder)'
      ],
      responseStrategies: [
        '🚨 **LEAVE:** Physical abuse only escalates. It will get worse.',
        '**Call 911:** During or immediately after violence',
        '**Go to Hospital:** Document injuries, tell them truth',
        '**Photos:** Take pictures of ALL injuries, bruises, damage',
        '**Police Report:** File report even if you don\'t want to press charges (creates record)',
        '**DV Shelter:** Safe place they can\'t find you',
        '**Restraining Order:** Get protective order immediately',
        '**Safety Plan:** Pack bag, hide it, plan escape route'
      ],
      scriptExamples: [
        'To 911: "My [partner] hit me. I need police and ambulance."',
        'To doctor: "My [partner] did this. I need it documented."',
        'To police: "I want to file a report. I\'m afraid for my safety."',
        'To DV hotline: "I need help leaving safely. They\'ve been violent."',
        '[DO NOT confront abuser - ESCAPE is the goal]'
      ],
      boundariesToSet: [
        '[You cannot set boundaries with someone who is physically violent]',
        '[The only boundary is: I am leaving]',
        '[Physical abuse is a one-strike rule - no second chances]'
      ],
      whenToLeave: [
        '🚨 RIGHT NOW. IMMEDIATELY. TODAY.',
        'Physical abuse is NON-NEGOTIABLE ground for leaving',
        'After the FIRST incident, not the tenth',
        'It will happen again. It will get worse.',
        'Call 1-800-799-7233 for help leaving safely',
        'Do NOT tell them you\'re leaving - just GO when safe',
        'Go to DV shelter if no other safe place',
        'Get restraining order ASAP'
      ]
    },
    resources: [
      '🚨 EMERGENCY: 911',
      'National Domestic Violence Hotline: 1-800-799-7233 (24/7, can help you escape)',
      'Text START to 88788',
      'thehotline.org (chat available)',
      'Local domestic violence shelter (provides safe housing)',
      'Hospital emergency room',
      'Police department (for report and restraining order)',
      'Lawyer for protective order',
      'VictimConnect: 1-855-484-2846'
    ]
  },

  {
    id: 'stalking',
    name: 'Stalking & Surveillance',
    category: 'Safety',
    description: 'Unwanted and repeated harassment, monitoring, or following that makes you afraid. This is a crime.',
    examples: [
      'Following you or showing up at your work/home/school uninvited',
      'Tracking your phone or vehicle with GPS without consent',
      'Monitoring your social media obsessively',
      'Installing spyware on your devices',
      'Constantly calling/texting (50+ times a day)',
      'Watching your house or workplace',
      'Sending unwanted gifts or messages',
      'Using others to monitor you',
      'Cyber-stalking (monitoring online activity)'
    ],
    severity: 'severe',
    whatToDo: [
      'Document every incident with dates, times, and evidence',
      'Tell work, school, neighbors about the stalking',
      'Vary your routines so you\'re less predictable',
      'Check devices for spyware',
      'Consider restraining order',
      'File police report - stalking is a crime',
      'Safety planning with DV advocate'
    ],
    howToCounter: {
      recognizeIt: [
        'They somehow always know where you are',
        'They show up "coincidentally" multiple times',
        'They know things about you they shouldn\'t know',
        'Your phone battery drains faster (possible spyware)',
        'They track your social media activity obsessively',
        'They contact you constantly despite being told to stop',
        'You feel surveilled and unsafe'
      ],
      responseStrategies: [
        '**Document Everything:** Screenshot, save, record every contact',
        '**Tell Others:** Work, school, neighbors need to know and refuse access',
        '**Tech Security:** Factory reset phone, new email, check for trackers',
        '**Vary Routine:** Don\'t be predictable',
        '**Police Report:** Stalking is a crime',
        '**Restraining Order:** Get protective order',
        '**No Contact:** Block on EVERYTHING',
        '**Safety Plan:** DV hotline can help'
      ],
      scriptExamples: [
        'To stalker (ONCE, in writing): "Do not contact me again. Any further contact will be reported to police."',
        '[Then NO response ever - response rewards stalking behavior]',
        'To police: "They\'ve shown up at [places] on [dates]. They\'ve contacted me [X] times. I\'m afraid."',
        'To employer: "My ex is stalking me. Please don\'t give them any information and call police if they show up."'
      ],
      boundariesToSet: [
        '[ONE clear statement: "Do not contact me. Any further contact is unwanted."]',
        '[Then COMPLETE no contact - block everywhere]',
        '[Any response encourages them - radio silence only]'
      ],
      whenToLeave: [
        'The moment stalking begins - leave and cut all contact',
        'If ex-partner, this is grounds for restraining order',
        'Stalking often precedes violence - take it VERY seriously',
        'Call DV hotline if you\'re being stalked: 1-800-799-7233'
      ]
    },
    resources: [
      'National Domestic Violence Hotline: 1-800-799-7233',
      'Stalking Resource Center: victimsofcrime.org/our-programs/national-stalking-resource-center',
      'Local police department (stalking is a crime)',
      'Stalking Prevention, Awareness, and Resource Center (SPARC)',
      'Lawyer for restraining order',
      'Tech safety: techsafety.org'
    ]
  },

  // ==================== BOUNDARIES & RESPECT ====================
  
  {
    id: 'boundary-violation',
    name: 'Boundary Violations',
    category: 'Boundaries',
    description: 'Repeatedly ignoring or disrespecting your clearly stated boundaries and personal limits.',
    examples: [
      'Going through your phone, email, or personal items without permission',
      'Showing up uninvited to your home or workplace',
      'Pressuring you sexually after you\'ve said no',
      'Continuing behavior you\'ve explicitly asked them to stop',
      'Making you feel guilty for having boundaries',
      '"If you loved me" manipulation around boundaries',
      'Not respecting your need for alone time or space',
      'Touching you when you\'ve asked them not to'
    ],
    severity: 'moderate',
    whatToDo: [
      'Clearly state your boundaries in explicit terms',
      'Be consistent in enforcing them',
      'Recognize that respect for boundaries is non-negotiable',
      'Don\'t justify or over-explain your boundaries',
      'If boundaries are repeatedly violated, reconsider the relationship',
      'Notice if violations are escalating'
    ],
    howToCounter: {
      recognizeIt: [
        'You\'ve clearly stated boundaries but they ignore them',
        'You feel you have to justify having normal needs',
        'They guilt-trip you for enforcing boundaries',
        'You\'ve stopped setting boundaries because "they won\'t listen anyway"',
        'They treat your "no" as negotiable',
        'You feel disrespected and unheard'
      ],
      responseStrategies: [
        '**State Clearly:** "I need [X]. This is not negotiable."',
        '**Don\'t Over-Explain:** You don\'t owe lengthy justifications',
        '**Enforce Immediately:** "I asked you not to do that. I\'m leaving now."',
        '**Don\'t Negotiate:** Boundaries aren\'t up for debate',
        '**Name the Pattern:** "I\'ve asked you repeatedly to respect [X] and you continue to violate it."',
        '**Consequences:** "If you violate this boundary again, [consequence]."'
      ],
      scriptExamples: [
        'Them: "Why can\'t I [X]?" → You: "Because I said no. That\'s reason enough."',
        'Them: "If you loved me, you\'d let me [X]." → You: "If YOU loved me, you\'d respect my no."',
        'Them: "You\'re being unreasonable." → You: "My boundaries are not unreasonable. Respect them or leave."',
        'Them: [violates boundary] → You: [Immediate consequence - leave, hang up, etc.]'
      ],
      boundariesToSet: [
        '"My phone/email/belongings are private. Don\'t go through them."',
        '"No means no. I will not repeat myself or justify it."',
        '"I need alone time regularly. It\'s not about you - it\'s about me."',
        '"Don\'t show up unannounced. Call first or you won\'t be let in."'
      ],
      whenToLeave: [
        'When they consistently violate boundaries after being told',
        'When violations are escalating (privacy → sexual boundaries)',
        'When they mock or dismiss your boundaries',
        'When you feel unsafe enforcing boundaries',
        'When boundary violations include your body (sexual coercion)',
        'When they refuse to acknowledge violating boundaries'
      ]
    },
    resources: [
      'Book: "Set Boundaries, Find Peace" by Nedra Glover Tawwab',
      'Book: "Boundaries" by Dr. Henry Cloud',
      'Therapist for boundary-setting skills'
    ]
  },

  {
    id: 'public-humiliation',
    name: 'Public Humiliation & Belittling',
    category: 'Emotional Abuse',
    description: 'Deliberately embarrassing, belittling, or humiliating you in front of others to undermine your self-esteem.',
    examples: [
      'Making fun of you in front of friends or family',
      'Sharing embarrassing stories or secrets publicly',
      'Criticizing you in front of others',
      'Putting you down or insulting you publicly',
      'Making jokes at your expense',
      'Revealing private information to humiliate you',
      'Mocking you in front of your children',
      'Posting embarrassing things about you online'
    ],
    severity: 'moderate',
    whatToDo: [
      'Recognize this is a form of emotional abuse',
      'Address it directly: "That\'s not acceptable"',
      'Notice if they apologize sincerely or dismiss your feelings',
      'Talk to people you trust about what\'s happening',
      'Consider if this person respects you at all',
      'Don\'t accept excuses like "I was just joking"'
    ],
    howToCounter: {
      recognizeIt: [
        'You dread social situations because of how they might act',
        'Friends/family have mentioned their behavior toward you',
        'You feel embarrassed and small after gatherings',
        'They play it off as "just joking" when you object',
        'You\'ve started avoiding social events together',
        'Your self-esteem has taken a hit'
      ],
      responseStrategies: [
        '**Call It Out Publicly:** "That\'s not funny. Don\'t talk about me that way."',
        '**Leave:** Stand up and leave the situation immediately',
        '**Talk Privately:** "You humiliated me in front of [people]. That\'s unacceptable and won\'t happen again."',
        '**Set Consequence:** "If you embarrass me publicly again, I will leave you there."',
        '**Get Witnesses:** Let friends/family know this is a pattern',
        '**Stop Going:** "I won\'t attend social events with you until this changes."'
      ],
      scriptExamples: [
        'In the moment: "Don\'t talk about me that way." [Then leave]',
        'Later: "What you did at [event] was humiliating. I will not tolerate that again."',
        'If they say "just joking": "It\'s not a joke if I\'m the only one not laughing. It\'s cruelty."',
        'Setting boundary: "The next time you embarrass me publicly, I\'m leaving and reconsidering this relationship."'
      ],
      boundariesToSet: [
        '"Do not make fun of me, especially in front of others."',
        '"My private life is not public entertainment. Don\'t share my stories."',
        '"If you can\'t speak respectfully about me in public, we won\'t go to public events together."',
        '"The next time you humiliate me, I\'m leaving the event and possibly the relationship."'
      ],
      whenToLeave: [
        'When they continue after being told it\'s hurtful',
        'When they laugh off your concerns',
        'When it\'s escalating in frequency or cruelty',
        'When your self-esteem is suffering',
        'When they refuse to apologize or change',
        'When you realize they don\'t respect you at all'
      ]
    },
    resources: [
      'Therapist specializing in emotional abuse recovery',
      'Support groups for emotional abuse survivors'
    ]
  },

  {
    id: 'constant-criticism',
    name: 'Constant Criticism & Nitpicking',
    category: 'Emotional Abuse',
    description: 'Relentless criticism that erodes your self-esteem and makes you feel like you can\'t do anything right.',
    examples: [
      'Criticizing how you look, dress, talk, walk',
      'Nothing you do is ever good enough',
      'Constantly pointing out your flaws',
      'Criticizing your intelligence or abilities',
      'Mocking your interests or passions',
      'Comparing you negatively to others',
      'Criticizing your parenting, cooking, cleaning, work',
      'Nitpicking everything you do'
    ],
    severity: 'moderate',
    whatToDo: [
      'Recognize this is designed to make you feel inadequate',
      'Stop trying to please them - it\'s an impossible goal',
      'Rebuild your self-esteem through self-compassion',
      'Surround yourself with people who appreciate you',
      'Consider if you want to spend life being criticized',
      'Therapy can help undo the damage'
    ],
    howToCounter: {
      recognizeIt: [
        'You feel like you\'re walking on eggshells',
        'You\'re constantly trying to anticipate and prevent criticism',
        'Your self-esteem has plummeted',
        'You\'ve started believing their criticism is accurate',
        'You second-guess everything you do',
        'You\'re exhausted from trying to be "good enough"'
      ],
      responseStrategies: [
        '**Stop Trying to Please:** You can\'t win - the game is rigged',
        '**Call It Out:** "You criticize everything I do. Is anything ever good enough?"',
        '**Don\'t Defend:** "I\'m fine with how I did it" [end of discussion]',
        '**Ask Directly:** "Do you even like me? Because your constant criticism says you don\'t."',
        '**Stop Internalizing:** Their criticism reflects their issues, not your worth',
        '**Grey Rock:** Become boring, don\'t give them material to criticize'
      ],
      scriptExamples: [
        'Them: "You did [X] wrong." → You: "I\'m satisfied with how I did it."',
        'Them: "You look [negative]." → You: "I like how I look."',
        'Them: [criticism] → You: "You criticize me constantly. Is this relationship even worth it to you?"',
        'Them: "I\'m just trying to help." → You: "Constant criticism isn\'t help. It\'s abuse."'
      ],
      boundariesToSet: [
        '"I will not accept constant criticism. Speak respectfully or don\'t speak at all."',
        '"If you can\'t say something constructive or kind, keep it to yourself."',
        '"Your opinion of me is no longer welcome unless I ask for it."',
        '"The next criticism is the last one before I leave."'
      ],
      whenToLeave: [
        'When you no longer recognize yourself',
        'When you believe their criticism is true',
        'When your mental health is suffering (depression, anxiety)',
        'When they won\'t acknowledge the pattern',
        'When you can\'t remember the last time they complimented you',
        'When you realize life is too short to be criticized daily'
      ]
    },
    resources: [
      'Book: "The Verbally Abusive Relationship" by Patricia Evans',
      'Therapist for self-esteem rebuilding',
      'National Domestic Violence Hotline if escalating: 1-800-799-7233'
    ]
  },

  // ==================== FAMILY DYNAMICS ====================
  
  {
    id: 'family-manipulation',
    name: 'Family Manipulation & Guilt',
    category: 'Family',
    description: 'Family members using guilt, obligation, or cultural expectations to control your choices and life.',
    examples: [
      'Guilt-tripping: "After all I\'ve done for you"',
      'Emotional blackmail about family duty',
      'Weaponizing culture or religion to control',
      'Conditional love based on obedience',
      'Threatening to disown or cut you off',
      'Using other family members to pressure you (flying monkeys)',
      'Making you responsible for their emotions',
      'Playing the victim when you set boundaries'
    ],
    severity: 'moderate',
    whatToDo: [
      'Recognize that love shouldn\'t be conditional on obedience',
      'You have a right to make your own choices as an adult',
      'Set boundaries even with family - they\'re not exempt',
      'Seek support from friends, chosen family, or a therapist',
      'Honor your culture without accepting abuse',
      'Remember: setting boundaries is not betrayal'
    ],
    howToCounter: {
      recognizeIt: [
        'You make major life decisions based on family approval, not your own needs',
        'You feel guilty constantly, especially when living your life',
        'Love from family feels conditional on compliance',
        'You\'re an adult but treated like a child',
        'Cultural/religious duty is weaponized against you',
        'You\'re afraid of disappointing family more than living authentically'
      ],
      responseStrategies: [
        '**Set Adult Boundaries:** "I\'m an adult. I\'m making this decision."',
        '**Don\'t JADE:** Don\'t Justify, Argue, Defend, or Explain',
        '**Information Diet:** They don\'t need to know everything',
        '**Honor Culture Without Abuse:** "I respect our culture, but this is controlling, not cultural."',
        '**Find Your Tribe:** Build chosen family who support you',
        '**Limit Contact:** If needed, reduce time with manipulative family'
      ],
      scriptExamples: [
        'Them: "After all I\'ve done for you!" → You: "I appreciate what you\'ve done. I\'m still making my own decision."',
        'Them: "You\'re betraying the family!" → You: "No, I\'m living my own life. That\'s not betrayal."',
        'Them: "Our culture/religion says..." → You: "I can honor our culture and still make my own choices."',
        'Them: "If you do [X], I\'ll disown you." → You: "That\'s your choice. But I won\'t be controlled by threats."'
      ],
      boundariesToSet: [
        '"I love you, but I\'m making my own life choices as an adult."',
        '"My decisions are not up for family vote or approval."',
        '"If you can\'t respect my choices, we\'ll need distance."',
        '"I will not discuss [topic] with you if you can\'t be respectful."'
      ],
      whenToLeave: [
        'When staying in contact requires betraying yourself',
        'When they refuse to respect you as an adult',
        'When contact damages your mental health',
        'When manipulation escalates to abuse',
        'When you realize distance is healthier',
        'When you need space to become yourself'
      ]
    },
    resources: [
      'Book: "Adult Children of Emotionally Immature Parents" by Lindsay C. Gibson',
      'r/raisedbynarcissists (Reddit support community)',
      'Therapist specializing in family dynamics and cultural issues',
      'Support groups for adult children of toxic families'
    ]
  },

  // ==================== WORKPLACE ====================
  
  {
    id: 'workplace-bullying',
    name: 'Workplace Bullying',
    category: 'Workplace',
    description: 'Repeated hostile, aggressive, or intimidating behavior in the workplace that creates a hostile environment.',
    examples: [
      'Yelling, screaming, or aggressive outbursts',
      'Public criticism or humiliation',
      'Sabotaging your work',
      'Taking credit for your work',
      'Excluding you from meetings or important information',
      'Spreading rumors or gossip about you',
      'Unreasonable demands or impossible deadlines',
      'Micromanaging to an extreme degree',
      'Gaslighting about work performance'
    ],
    severity: 'severe',
    whatToDo: [
      'Document ALL incidents with dates, times, witnesses, evidence',
      'Save emails, texts, any written communication',
      'Review your company\'s harassment and bullying policy',
      'Report to HR or management (in writing)',
      'Keep records of your work performance',
      'Talk to an employment lawyer if needed',
      'Prioritize your mental health',
      'Consider whether staying is worth the cost'
    ],
    howToCounter: {
      recognizeIt: [
        'You dread going to work',
        'Your mental/physical health is declining',
        'You\'re being singled out (it\'s not happening to everyone)',
        'Management knows but does nothing',
        'Your work is being sabotaged',
        'You\'re being set up to fail'
      ],
      responseStrategies: [
        '**Document Everything:** Keep detailed log with dates, times, witnesses',
        '**Email Confirmation:** Follow up verbal conversations with email summary',
        '**BCC Personal Email:** Document emails to yourself',
        '**Record Performance:** Save your excellent work reviews, accomplishments',
        '**Report to HR:** In writing, with evidence',
        '**Consult Lawyer:** Know your legal rights',
        '**Job Search:** Start looking - your health matters more'
      ],
      scriptExamples: [
        'Email to HR: "I\'m writing to formally report workplace bullying by [name]. [Specific examples with dates]."',
        'To bully (professional): "Please communicate with me respectfully and professionally."',
        'To bully\'s boss: "I need to discuss [name]\'s conduct toward me. [Specific examples]."',
        '[Document, document, document - evidence is everything]'
      ],
      boundariesToSet: [
        '"Please speak to me professionally and respectfully."',
        '"I need feedback to be constructive, not personal attacks."',
        '"I will not accept being yelled at. Please lower your voice or we can continue this later."',
        '[If boundaries don\'t work, escalate to HR/management]'
      ],
      whenToLeave: [
        'When it\'s affecting your mental or physical health',
        'When HR/management won\'t act',
        'When the environment is toxic and unchangeable',
        'When you have another job lined up',
        'When staying requires sacrificing your well-being',
        'When you recognize it won\'t improve'
      ]
    },
    resources: [
      'EEOC (Equal Employment Opportunity Commission): eeoc.gov',
      'Workplace Bullying Institute: workplacebullying.org',
      'Employment lawyer (many offer free consultations)',
      'Your company\'s HR department (document your report)',
      'State labor board'
    ]
  },

  {
    id: 'sexual-harassment',
    name: 'Sexual Harassment',
    category: 'Workplace',
    description: 'Unwelcome sexual advances, requests for sexual favors, or other sexual conduct that creates a hostile work environment.',
    examples: [
      'Unwanted touching or physical contact',
      'Sexual comments about your body or appearance',
      'Sexual jokes or innuendos',
      'Displaying sexual materials or images',
      'Asking about your sex life',
      'Unwanted sexual advances or propositions',
      'Quid pro quo (sexual favors for job benefits)',
      'Creating sexually hostile environment'
    ],
    severity: 'severe',
    whatToDo: [
      'Tell the person clearly to stop (if safe to do so)',
      'Document EVERYTHING with extreme detail',
      'Report to HR immediately, in writing',
      'Keep copies of all reports and evidence',
      'File EEOC complaint if company doesn\'t act',
      'Consult with employment lawyer',
      'You may have legal case'
    ],
    howToCounter: {
      recognizeIt: [
        'Unwanted comments about your appearance or body',
        'Inappropriate touching or invasion of personal space',
        'Sexual jokes or innuendos directed at you',
        'Requests for dates after you\'ve said no',
        'Retaliation for rejecting advances',
        'Feeling uncomfortable or unsafe at work'
      ],
      responseStrategies: [
        '**Say No Clearly:** "Stop. That\'s inappropriate and unwelcome."',
        '**Document Immediately:** Write down exactly what happened, when, where, witnesses',
        '**Email Confirmation:** "Per our conversation, you [did X]. That was unwelcome."',
        '**Report to HR:** Same day if possible, in writing',
        '**File EEOC:** If company doesn\'t act within reasonable time',
        '**Lawyer Up:** Sexual harassment is illegal - you have rights',
        '**Don\'t Minimize:** This is serious and you deserve protection'
      ],
      scriptExamples: [
        'To harasser: "Stop. That comment/touch/behavior is unwelcome and inappropriate."',
        'To HR: "I\'m reporting sexual harassment by [name]. [Detailed description with dates/times]."',
        'Email to self: "[Date/Time] [Name] said/did [exact details]. Witnesses: [names]."',
        'To lawyer: "I reported sexual harassment to HR on [date]. They [did/didn\'t act]."'
      ],
      boundariesToSet: [
        '"Do not make sexual comments to me or about me."',
        '"Do not touch me. Keep professional distance."',
        '"I\'ve told you no. Do not ask me out again."',
        '[If boundaries violated, immediately escalate to HR]'
      ],
      whenToLeave: [
        'If company fails to stop harassment after report',
        'If you\'re being retaliated against',
        'If harassment is severe or escalating',
        'If environment is hostile and unsafe',
        'After consulting with lawyer about your legal options',
        'When your safety or well-being is at risk'
      ]
    },
    resources: [
      'EEOC: eeoc.gov (file complaint)',
      'EEOC Hotline: 1-800-669-4000',
      'RAINN: 1-800-656-4673',
      'Employment lawyer (sexual harassment specialty)',
      'Your state\'s labor board',
      'Time to Sue: Legal Advice for Sexual Harassment'
    ]
  },

  // ==================== ADDITIONAL RED FLAGS ====================

  {
    id: 'triangulation',
    name: 'Triangulation',
    category: 'Emotional Manipulation',
    description: 'Using a third person to manipulate you, create jealousy, or validate their perspective against yours.',
    examples: [
      'Bringing others into conflicts between you two',
      'Comparing you unfavorably to others ("They would never...")',
      'Using children to communicate or manipulate',
      'Flirting with others to make you jealous',
      'Getting others to gang up on you',
      '"Everyone thinks you\'re..." (using vague others to support their view)',
      'Playing people against each other'
    ],
    severity: 'moderate',
    whatToDo: [
      'Refuse to engage in triangulated communication',
      'Address issues directly, one-on-one',
      'Don\'t compete with the "other" person',
      'Call out the manipulation',
      'Set boundary: "This is between us. Leave others out of it."'
    ],
    howToCounter: {
      recognizeIt: [
        'They\'re always bringing up what others think/say',
        'Conflicts never stay between just you two',
        'You\'re being compared to others constantly',
        'You feel pitted against someone else',
        'Children are being used as messengers',
        'You\'re hearing "everyone says..." frequently'
      ],
      responseStrategies: [
        '**Refuse to Engage:** "This is between us. Leave [person] out of it."',
        '**Call It Out:** "You\'re triangulating. Stop bringing others into our relationship."',
        '**Direct Communication:** "If you have an issue with me, tell ME, not others."',
        '**Don\'t Compete:** Refuse to compete with whoever they\'re comparing you to',
        '**Verify:** "Let me ask [person] myself if they really said that."',
        '**Protect Kids:** "Do not use the children as messengers. That\'s inappropriate."'
      ],
      scriptExamples: [
        'Them: "Everyone thinks you\'re [negative]." → You: "I don\'t care what vague \'everyone\' thinks. What do YOU think?"',
        'Them: "My ex would never..." → You: "I\'m not your ex. If you want me to be more like them, go back to them."',
        'Them: "I talked to [person] about us..." → You: "Our relationship issues should be discussed between US, not shared with others."',
        'When they involve kids: "Stop using the kids as pawns. Communicate directly with me."'
      ],
      boundariesToSet: [
        '"Our relationship issues stay between us. Don\'t involve others."',
        '"Stop comparing me to others. I\'m not them."',
        '"Do not use our children to communicate with me."',
        '"If you have a problem with me, tell me directly."'
      ],
      whenToLeave: [
        'When they consistently refuse direct communication',
        'When children are being used as pawns',
        'When triangulation is creating family/friend conflict',
        'When it\'s clear they enjoy creating jealousy/competition',
        'When combined with other manipulation tactics'
      ]
    },
    resources: [
      'Article: "Triangulation in Toxic Relationships"',
      'Family therapist if children are involved',
      'Therapist specializing in narcissistic abuse'
    ]
  },

  {
    id: 'future-faking',
    name: 'Future Faking',
    category: 'Emotional Manipulation',
    description: 'Making grand promises about the future to string you along, with no intention of following through.',
    examples: [
      'Promising marriage but never taking steps toward it',
      'Talking about having kids but always "not yet"',
      'Promising to change but behavior never changes',
      'Making plans for the future that never materialize',
      'Using future promises to get what they want now',
      '"Someday we\'ll..." but someday never comes',
      'Dangling carrots to keep you invested'
    ],
    severity: 'mild',
    whatToDo: [
      'Pay attention to actions, not words',
      'Notice if promises are always future, never present',
      'Set timelines: "If X doesn\'t happen by Y, I\'m out"',
      'Stop investing in a fantasy future',
      'Consider if they\'re just stringing you along'
    ],
    howToCounter: {
      recognizeIt: [
        'They talk about the future a lot but take no real action',
        'Promises are always "someday" or "eventually"',
        'Years have passed with no progress on promises',
        'You feel like you\'re waiting for your life to start',
        'When you bring up the future, they get vague or angry',
        'You realize you\'ve been "engaged" for 5 years with no wedding date'
      ],
      responseStrategies: [
        '**Actions Over Words:** "Show me, don\'t tell me."',
        '**Set Deadlines:** "I need to see progress by [date] or I\'m moving on."',
        '**Call It Out:** "You\'ve been promising [X] for [time]. Either commit or stop promising."',
        '**Stop Waiting:** Don\'t put your life on hold for vague future promises',
        '**Reality Check:** "It\'s been [X years]. Why hasn\'t this happened yet?"',
        '**Make Plans:** Make your own plans that don\'t depend on their promises'
      ],
      scriptExamples: [
        'Them: "Someday we\'ll get married." → You: "It\'s been 5 years. When exactly? Let\'s set a date or stop pretending."',
        'Them: "I\'ll change eventually." → You: "Eventually isn\'t a timeline. Change now or I\'m leaving."',
        'Them: "Why are you pressuring me?" → You: "Holding you accountable to your promises isn\'t pressure."',
        'You to yourself: "I\'ve been waiting [X time]. Time to stop waiting and start living."'
      ],
      boundariesToSet: [
        '"I need to see action, not just promises."',
        '"I will give this until [specific date]. If nothing changes, I\'m out."',
        '"Stop making promises you don\'t intend to keep."',
        '"I\'m not putting my life on hold anymore."'
      ],
      whenToLeave: [
        'When years have passed with no progress',
        'When you realize they\'re keeping you hooked with false promises',
        'When you\'ve wasted significant time waiting',
        'When you hit your deadline and nothing has changed',
        'When you realize you deserve someone who shows up now, not "someday"'
      ]
    },
    resources: [
      'Article: "Future Faking: How Narcissists Use Promises to Manipulate"',
      'Therapist for help setting realistic expectations',
      'Dating/relationship coach'
    ]
  }
];

export function getRedFlagByType(type: string): RedFlagDefinition | undefined {
  return RED_FLAG_LIBRARY.find(flag => flag.id === type || flag.name.toLowerCase().includes(type.toLowerCase()));
}

export function getRedFlagsByCategory(category: string): RedFlagDefinition[] {
  return RED_FLAG_LIBRARY.filter(flag => flag.category === category);
}

export function getAllCategories(): string[] {
  const categories = new Set(RED_FLAG_LIBRARY.map(flag => flag.category));
  return Array.from(categories).sort();
}

export function searchRedFlags(query: string): RedFlagDefinition[] {
  const lowerQuery = query.toLowerCase();
  return RED_FLAG_LIBRARY.filter(flag => 
    flag.name.toLowerCase().includes(lowerQuery) ||
    flag.description.toLowerCase().includes(lowerQuery) ||
    flag.category.toLowerCase().includes(lowerQuery) ||
    flag.examples.some(ex => ex.toLowerCase().includes(lowerQuery)) ||
    flag.howToCounter.recognizeIt.some(r => r.toLowerCase().includes(lowerQuery)) ||
    flag.howToCounter.responseStrategies.some(s => s.toLowerCase().includes(lowerQuery))
  );
}
