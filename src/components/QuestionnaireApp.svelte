<script lang="ts">
	import { FARC_CONFIG, type Question } from '../data/questionnaire';
	import { calculateCRS, getTopContributors, type InteractionLevel, type Answers, type Contributor } from '../utils/scoring';
	import { withBasePath } from '../utils/withBasePath';
	import ProgressBar from './ProgressBar.svelte';

	type Screen = 'welcome' | 'question' | 'results';

	interface TierData {
		label: string;
		class: string;
		desc: string;
		caution: string;
	}

	let screen = $state<Screen>('welcome');
	let interactionLevel = $state<InteractionLevel>(null);
	let answers = $state<Answers>({});
	let currentQuestionIndex = $state(0);

	// Determine questions based on interaction level
	const questions = $derived.by<Question[]>(() => {
		if (!interactionLevel) return [];
		if (interactionLevel === 'none') return [];

		const set1 = FARC_CONFIG.set1;
		const set2 = interactionLevel === 'interacted' ? FARC_CONFIG.set2 : [];
		return [...set1, ...set2];
	});

	function handleStart(level: InteractionLevel) {
		interactionLevel = level;
		if (level === 'none') {
			screen = 'results';
		} else {
			screen = 'question';
			currentQuestionIndex = 0;
		}
	}

	function handleAnswer(value: number) {
		const currentQuestion = questions[currentQuestionIndex];
		answers = {
			...answers,
			[currentQuestion.id]: value
		};

		if (currentQuestionIndex < questions.length - 1) {
			currentQuestionIndex = currentQuestionIndex + 1;
		} else {
			screen = 'results';
		}
	}

	function handleRestart() {
		screen = 'welcome';
		interactionLevel = null;
		answers = {};
		currentQuestionIndex = 0;
	}

	// Computed values for results screen
	const score = $derived.by(() => {
		return screen === 'results' && interactionLevel !== 'none' 
			? calculateCRS(answers, interactionLevel) 
			: 0;
	});
	
	const contributors = $derived.by<Contributor[]>(() => {
		return screen === 'results' && interactionLevel !== 'none'
			? getTopContributors(answers, interactionLevel)
			: [];
	});

	const tierData = $derived.by<TierData>(() => {
		if (screen !== 'results' || interactionLevel === 'none') {
			return {
				label: 'Minimal Risk',
				class: 'tier-low',
				desc: 'No major red flags. Her behavior suggests she values commitment, stability, and is not emotionally distant.',
				caution: 'Proceed normally. Continue building the relationship with standard healthy boundaries.'
			};
		}

		if (score >= 80) {
			return {
				label: 'Critical Risk',
				class: 'tier-very-high',
				desc: 'Extreme red flags. She has the strongest traits linked to cheating (like a history of unfaithfulness, a strong preference for casual sex, or severe emotional distance/narcissism).',
				caution: 'Unsafe for commitment. Research shows these traits are part of personality and rarely change. Long-term exclusivity is statistically very unlikely.'
			};
		}
		if (score >= 60) {
			return {
				label: 'High Risk',
				class: 'tier-high',
				desc: 'Strong warning signs. Her profile matches women who have a pattern of unstable relationships, pulling away when things get close (avoidant), or high sexual self-centeredness (narcissism).',
				caution: 'High chance of history repeating. Past behavior and these traits are strong predictors. Proceed only if you accept high volatility and potential for emotional distance.'
			};
		}
		if (score >= 40) {
			return {
				label: 'Elevated Risk',
				class: 'tier-elevated',
				desc: 'Noticeable red flags. She likely craves constant excitement or admiration, or shows signs of being emotionally distant (avoidant). Research links these to "boredom cheating" or seeking connection elsewhere.',
				caution: 'Be careful. Do not rush into a serious commitment. Verify she can handle a boring or difficult patch without seeking attention elsewhere or pulling away.'
			};
		}
		if (score >= 20) {
			return {
				label: 'Low-Moderate Risk',
				class: 'tier-moderate',
				desc: 'A few minor concerns. She might seek attention or validation sometimes, but there are no deep signs of instability or emotional distance.',
				caution: 'Watch and wait. Don\'t ignore the small flags. See if they disappear or get worse under stress or if she becomes distant.'
			};
		}
		return {
			label: 'Minimal Risk',
			class: 'tier-low',
			desc: 'No major red flags. Her behavior suggests she values commitment, stability, and is not emotionally distant.',
			caution: 'Proceed normally. Continue building the relationship with standard healthy boundaries.'
		};
	});

	const currentQuestion = $derived.by(() => questions[currentQuestionIndex]);
</script>

{#if screen === 'welcome'}
	<div class="card fade-in">
		<h1 class="title">FARC</h1>
		<p class="subtitle">Female Adultery Risk Calculator</p>

		<div class="disclaimer-box">
			<p class="disclaimer-text">
				<strong>Disclaimer:</strong> This tool provides a statistical risk assessment based on behavioral patterns.
				It is not a definitive judgment of character. The assessment can change in the future with new information.
			</p>
		</div>

		<div class="question-section">
			<p class="question-text">{FARC_CONFIG.classifierQuestion}</p>
			<div class="options-grid">
				{#each FARC_CONFIG.classifierOptions as option (option.value)}
					<button
						class="btn btn-primary"
						onclick={() => handleStart(option.value)}
					>
						{option.label}
					</button>
				{/each}
			</div>

			<div class="link-row mt-8 text-sm">
				<a
					href={withBasePath('predictors')}
					class="link-row__item text-blue-400 hover:text-blue-300 transition-colors"
				>
					Strongest Predictors
				</a>
				<a
					href={withBasePath('references')}
					class="link-row__item text-blue-400 hover:text-blue-300 transition-colors"
				>
					Research Sources
				</a>
				<a
					href={withBasePath('privacy')}
					class="link-row__item text-blue-400 hover:text-blue-300 transition-colors"
				>
					Privacy
				</a>
			</div>
		</div>
	</div>
{:else if screen === 'results' && interactionLevel === 'none'}
	<div class="card fade-in">
		<h2 class="title">Assessment Not Possible</h2>
		<p class="result-description">
			Without sufficient information (public or personal), an accurate risk assessment cannot be made.
		</p>
		<button class="btn btn-secondary mt-6" onclick={handleRestart}>
			Start Over
		</button>
	</div>
{:else if screen === 'results'}
	<div class="card fade-in">
		<h2 class="title">Risk Assessment Results</h2>

		<div class="score-container">
			<div class="score-circle {tierData.class}">
				<span class="score-value">{score}</span>
			</div>
			<div class="tier-label">
				Risk Tier: <span class="tier-text {tierData.class}">{tierData.label}</span>
			</div>
		</div>

		<div class="result-details-box">
			<div class="detail-item">
				<h4 class="detail-title">What this means:</h4>
				<p class="detail-text">{tierData.desc}</p>
			</div>
			<div class="detail-item caution-item">
				<h4 class="detail-title">Cautionary Measure:</h4>
				<p class="detail-text">{tierData.caution}</p>
			</div>
		</div>

		{#if contributors.length > 0}
			<div class="contributors-section">
				<h3 class="section-title">Top Risk Factors</h3>
				<ul class="contributors-list">
					{#each contributors as item, idx (idx)}
						<li class="contributor-item">
							<span class="contributor-pct">{idx + 1}</span>
							<span class="contributor-text">{item.text}</span>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<button class="btn btn-secondary mt-8" onclick={handleRestart}>
			Start Over
		</button>

		<div class="link-row mt-6 text-sm">
			<a
				href={withBasePath('predictors')}
				class="link-row__item text-blue-400 hover:text-blue-300 transition-colors"
			>
				Strongest Predictors
			</a>
			<a
				href={withBasePath('references')}
				class="link-row__item text-blue-400 hover:text-blue-300 transition-colors"
			>
				Research Sources
			</a>
			<a
				href={withBasePath('privacy')}
				class="link-row__item text-blue-400 hover:text-blue-300 transition-colors"
			>
				Privacy
			</a>
		</div>
	</div>
{:else if screen === 'question'}
	<div class="card slide-up">
		<ProgressBar current={currentQuestionIndex} total={questions.length} />

		<h2 class="question-text mb-8">{currentQuestion.text}</h2>

		<div class="options-stack">
			{#each FARC_CONFIG.scaleOptions as option (option.label)}
				<button
					class="btn btn-option"
					onclick={() => handleAnswer(option.value)}
				>
					{option.label}
				</button>
			{/each}
		</div>
	</div>
{/if}
