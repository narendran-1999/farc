// TypeScript interfaces and configuration for FARC (questions + exact statement texts + weights + choice scale)

export interface ScaleOption {
	label: string;
	value: number;
}

export interface ClassifierOption {
	label: string;
	value: 'public' | 'interacted' | 'none';
}

export interface Question {
	id: string;
	text: string;
	weight: number;
}

export interface FARCConfig {
	scaleOptions: ScaleOption[];
	classifierQuestion: string;
	classifierOptions: ClassifierOption[];
	set1: Question[];
	set2: Question[];
}

export const FARC_CONFIG: FARCConfig = {
	scaleOptions: [
		{ label: "Strongly disagree", value: 0 },
		{ label: "Disagree", value: 1 },
		{ label: "Agree", value: 2 },
		{ label: "Strongly agree", value: 3 },
		{ label: "I don't have enough information to judge this", value: 0 }
	],

	classifierQuestion: "Have you interacted with her personally (talking, dating, texting beyond surface-level), or are you evaluating purely based on public/visible information?",

	classifierOptions: [
		{ label: "I only have public/online information (haven't interacted yet)", value: "public" },
		{ label: "We've interacted (talking, dates, texting)", value: "interacted" },
		{ label: "I don't really know anything", value: "none" }
	],

	// Questions are to be ignored if information is inadequate (value === null)

	// SET 1 — Before Interaction (publicly observable)
	set1: [
		{
			id: "s1_q1",
			text: "Her public behavior or online presence suggests openness to casual dating or hookups.",
			weight: 10
		},
		{
			id: "s1_q2",
			text: "Her past relationships (from what's publicly known) seem short, unstable, or frequently changing.",
			weight: 6
		},
		{
			id: "s1_q3",
			text: "Her lifestyle appears impulsive or thrill-seeking (e.g., constant parties, risky choices, excitement-seeking).",
			weight: 6
		},
		{
			id: "s1_q4",
			text: "Clubbing, heavy drinking, or nightlife seem to be a regular part of her lifestyle.",
			weight: 6
		},
		{
			id: "s1_q5",
			text: "Her social media presence appears highly attention-focused (e.g., thirst traps, self-promotion, validation seeking).",
			weight: 5
		},
		{
			id: "s1_q6",
			text: "Her close friend group appears strongly oriented toward partying or casual hookup culture.",
			weight: 3
		},
		{
			id: "s1_q7",
			text: "She consistently shows interest in high-status, dominant, or very 'elite' men.",
			weight: 4
		}
	],

	// SET 2 — After Interaction (talking or casual dates)
	set2: [
		{
			id: "s2_q1",
			text: "She openly expresses comfort with casual sex or views monogamy as restrictive.",
			weight: 10
		},
		{
			id: "s2_q2",
			text: "She has admitted cheating or being unfaithful in past relationships.",
			weight: 17
		},
		{
			id: "s2_q3",
			text: "She often describes past relationships as boring, disappointing, or emotionally unsatisfying.",
			weight: 6
		},
		{
			id: "s2_q4",
			text: "She shows signs of insecure attachment — clingy, avoidant, inconsistent, or fearful of closeness.",
			weight: 8
		},
		{
			id: "s2_q5",
			text: "She behaves as though she has many romantic options and does not seek serious commitment.",
			weight: 5
		},
		{
			id: "s2_q6",
			text: "She openly flirts with other men or keeps multiple romantic alternatives active.",
			weight: 5
		},
		{
			id: "s2_q7",
			text: "She seems to need frequent external validation or attention from others.",
			weight: 4
		},
		{
			id: "s2_q8",
			text: "She expresses doubt about exclusivity, labels, or traditional commitment.",
			weight: 5
		}
	]
};


