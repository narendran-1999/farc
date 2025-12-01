import React, { useState, useMemo } from 'react';
import { FARC_CONFIG } from '../data/questionnaire';
import { calculateCRS, getRiskTier, getTopContributors } from '../utils/scoring';
import { withBasePath } from '../utils/withBasePath';
import ProgressBar from './ProgressBar';

const QuestionnaireApp = () => {
    const [screen, setScreen] = useState('welcome'); // welcome, question, results
    const [interactionLevel, setInteractionLevel] = useState(null); // public, interacted, none
    const [answers, setAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Determine questions based on interaction level
    const questions = useMemo(() => {
        if (!interactionLevel) return [];
        if (interactionLevel === 'none') return [];

        const set1 = FARC_CONFIG.set1;
        const set2 = interactionLevel === 'interacted' ? FARC_CONFIG.set2 : [];
        return [...set1, ...set2];
    }, [interactionLevel]);

    const handleStart = (level) => {
        setInteractionLevel(level);
        if (level === 'none') {
            setScreen('results'); // Or a special 'cannot assess' screen, but results handles it
        } else {
            setScreen('question');
            setCurrentQuestionIndex(0);
        }
    };

    const handleAnswer = (value) => {
        const currentQuestion = questions[currentQuestionIndex];
        setAnswers(prev => ({
            ...prev,
            [currentQuestion.id]: value
        }));

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            setScreen('results');
        }
    };

    const handleRestart = () => {
        setScreen('welcome');
        setInteractionLevel(null);
        setAnswers({});
        setCurrentQuestionIndex(0);
    };

    // Render Welcome Screen
    if (screen === 'welcome') {
        return (
            <div className="card fade-in">
                <h1 className="title">FARC</h1>
                <p className="subtitle">Female Adultery Risk Calculator</p>

                <div className="disclaimer-box">
                    <p className="disclaimer-text">
                        <strong>Disclaimer:</strong> This tool provides a statistical risk assessment based on behavioral patterns.
                        It is not a definitive judgment of character. The assessment can change in the future with new information.
                    </p>
                </div>

                <div className="question-section">
                    <p className="question-text">{FARC_CONFIG.classifierQuestion}</p>
                    <div className="options-grid">
                        {FARC_CONFIG.classifierOptions.map(option => (
                            <button
                                key={option.value}
                                className="btn btn-primary"
                                onClick={() => handleStart(option.value)}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center gap-6 text-sm">
                        <a href={withBasePath('predictors')} className="text-blue-400 hover:text-blue-300 transition-colors">Strongest Predictors</a>
                        <span className="text-gray-600">|</span>
                        <a href={withBasePath('references')} className="text-blue-400 hover:text-blue-300 transition-colors">Research Sources</a>
                        <span className="text-gray-600">|</span>
                        <a href={withBasePath('privacy')} className="text-blue-400 hover:text-blue-300 transition-colors">Privacy</a>
                    </div>
                </div>
            </div>
        );
    }

    // Render Results Screen (Early exit for 'none')
    if (screen === 'results' && interactionLevel === 'none') {
        return (
            <div className="card fade-in">
                <h2 className="title">Assessment Not Possible</h2>
                <p className="result-description">
                    Without sufficient information (public or personal), an accurate risk assessment cannot be made.
                </p>
                <button className="btn btn-secondary mt-6" onClick={handleRestart}>
                    Start Over
                </button>
            </div>
        );
    }

    // Render Results Screen
    if (screen === 'results') {
        const score = calculateCRS(answers, interactionLevel);
        const contributors = getTopContributors(answers, interactionLevel);

        let tierData = {
            label: 'Minimal Risk',
            class: 'tier-low',
            desc: 'No major red flags. Her behavior suggests she values commitment, stability, and is not emotionally distant.',
            caution: 'Proceed normally. Continue building the relationship with standard healthy boundaries.'
        };

        if (score >= 20) {
            tierData = {
                label: 'Low-Moderate Risk',
                class: 'tier-moderate',
                desc: 'A few minor concerns. She might seek attention or validation sometimes, but there are no deep signs of instability or emotional distance.',
                caution: 'Watch and wait. Don\'t ignore the small flags. See if they disappear or get worse under stress or if she becomes distant.'
            };
        }
        if (score >= 40) {
            tierData = {
                label: 'Elevated Risk',
                class: 'tier-elevated',
                desc: 'Noticeable red flags. She likely craves constant excitement or admiration, or shows signs of being emotionally distant (avoidant). Research links these to "boredom cheating" or seeking connection elsewhere.',
                caution: 'Be careful. Do not rush into a serious commitment. Verify she can handle a boring or difficult patch without seeking attention elsewhere or pulling away.'
            };
        }
        if (score >= 60) {
            tierData = {
                label: 'High Risk',
                class: 'tier-high',
                desc: 'Strong warning signs. Her profile matches women who have a pattern of unstable relationships, pulling away when things get close (avoidant), or high sexual self-centeredness (narcissism).',
                caution: 'High chance of history repeating. Past behavior and these traits are strong predictors. Proceed only if you accept high volatility and potential for emotional distance.'
            };
        }
        if (score >= 80) {
            tierData = {
                label: 'Critical Risk',
                class: 'tier-very-high',
                desc: 'Extreme red flags. She has the strongest traits linked to cheating (like a history of unfaithfulness, a strong preference for casual sex, or severe emotional distance/narcissism).',
                caution: 'Unsafe for commitment. Research shows these traits are part of personality and rarely change. Long-term exclusivity is statistically very unlikely.'
            };
        }

        return (
            <div className="card fade-in">
                <h2 className="title">Risk Assessment Results</h2>

                <div className="score-container">
                    <div className={`score-circle ${tierData.class}`}>
                        <span className="score-value">{score}</span>
                    </div>
                    <div className="tier-label">
                        Risk Tier: <span className={`tier-text ${tierData.class}`}>{tierData.label}</span>
                    </div>
                </div>

                <div className="result-details-box">
                    <div className="detail-item">
                        <h4 className="detail-title">What this means:</h4>
                        <p className="detail-text">{tierData.desc}</p>
                    </div>
                    <div className="detail-item caution-item">
                        <h4 className="detail-title">Cautionary Measure:</h4>
                        <p className="detail-text">{tierData.caution}</p>
                    </div>
                </div>

                {contributors.length > 0 && (
                    <div className="contributors-section">
                        <h3 className="section-title">Top Risk Factors</h3>
                        <ul className="contributors-list">
                            {contributors.map((item, idx) => (
                                <li key={idx} className="contributor-item">
                                    <span className="contributor-pct">{idx + 1}</span>
                                    <span className="contributor-text">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <button className="btn btn-secondary mt-8" onClick={handleRestart}>
                    Start Over
                </button>

                <div className="mt-6 flex justify-center gap-6 text-sm">
                    <a href={withBasePath('predictors')} className="text-blue-400 hover:text-blue-300 transition-colors">Strongest Predictors</a>
                    <span className="text-gray-600">|</span>
                    <a href={withBasePath('references')} className="text-blue-400 hover:text-blue-300 transition-colors">Research Sources</a>
                    <span className="text-gray-600">|</span>
                    <a href={withBasePath('privacy')} className="text-blue-400 hover:text-blue-300 transition-colors">Privacy</a>
                </div>
            </div>
        );
    }

    // Render Question Screen
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="card slide-up">
            <ProgressBar current={currentQuestionIndex} total={questions.length} />

            <h2 className="question-text mb-8">{currentQuestion.text}</h2>

            <div className="options-stack">
                {FARC_CONFIG.scaleOptions.map(option => (
                    <button
                        key={option.label}
                        className="btn btn-option"
                        onClick={() => handleAnswer(option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionnaireApp;
