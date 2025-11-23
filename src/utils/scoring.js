import { FARC_CONFIG } from '../data/questionnaire';

/**
 * Calculates the Cheat-Risk Score (CRS) based on user answers.
 * @param {Object} answers - Key-value pair of question ID and answer value (0-3 or null).
 * @param {string} interactionLevel - 'public' or 'interacted'.
 * @returns {number} - The calculated CRS (0-100).
 */
export function calculateCRS(answers, interactionLevel) {
    let totalPoints = 0;
    let totalMaxPoints = 0;

    const questions = [
        ...FARC_CONFIG.set1,
        ...(interactionLevel === 'interacted' ? FARC_CONFIG.set2 : [])
    ];

    questions.forEach(q => {
        const answer = answers[q.id];
        // Only count if answer is provided and not null (N/A)
        if (answer !== undefined && answer !== null) {
            const itemMaxPoints = q.weight;
            const itemPoints = answer * (itemMaxPoints / 3);

            totalPoints += itemPoints;
            totalMaxPoints += itemMaxPoints;
        }
    });

    if (totalMaxPoints === 0) return 0;

    const crs = (totalPoints / totalMaxPoints) * 100;
    return Math.round(crs);
}

/**
 * Returns the risk tier based on the CRS.
 * @param {number} score - The CRS (0-100).
 * @returns {string} - The risk tier.
 */
export function getRiskTier(score) {
    if (score < 20) return 'Low';
    if (score < 40) return 'Moderate';
    if (score < 60) return 'Elevated';
    if (score < 80) return 'High';
    return 'Very High';
}

/**
 * Returns the top 3 contributing factors to the score.
 * @param {Object} answers - Key-value pair of question ID and answer value.
 * @param {string} interactionLevel - 'public' or 'interacted'.
 * @returns {Array} - Array of objects { text, contributionPct }.
 */
export function getTopContributors(answers, interactionLevel) {
    let totalPoints = 0;
    const itemContributions = [];

    const questions = [
        ...FARC_CONFIG.set1,
        ...(interactionLevel === 'interacted' ? FARC_CONFIG.set2 : [])
    ];

    questions.forEach(q => {
        const answer = answers[q.id];
        if (answer !== undefined && answer !== null) {
            const itemMaxPoints = q.weight;
            const itemPoints = answer * (itemMaxPoints / 3);

            totalPoints += itemPoints;
            itemContributions.push({
                text: q.text,
                points: itemPoints
            });
        }
    });

    if (totalPoints === 0) return [];

    // Calculate percentage contribution
    const contributions = itemContributions.map(item => ({
        text: item.text,
        contributionPct: (item.points / totalPoints) * 100
    }));

    // Sort by contribution descending
    contributions.sort((a, b) => b.contributionPct - a.contributionPct);

    // Return top 3
    return contributions.slice(0, 3).map(item => ({
        text: item.text,
        contributionPct: Math.round(item.contributionPct)
    }));
}
