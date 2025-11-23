# QUESTIONS
---

## 🟦 **SET 1 — Before Interaction (Publicly Observable)**
Scale: 0–3 + N/A
(0 = Not true at all, 3 = Very clearly true)

1. Her public behavior or online presence suggests openness to casual dating or hookups.
2. Her past relationships (from what’s publicly known) seem short, unstable, or frequently changing.
3. Her lifestyle appears impulsive or thrill-seeking (e.g., constant parties, risky choices, extreme excitement-seeking).
4. Clubbing, heavy drinking, or nightlife seem to be a regular part of her lifestyle.
5. Her social media presence seems highly attention-focused (e.g., thirst traps, constant self-promotion, validation-seeking content).
6. Her close friend group appears strongly oriented toward partying or casual hookup culture.
7. She consistently shows interest in high-status, dominant, or very “elite” men.

---

## 🟩 **SET 2 — After Interaction (Talking or Casual Dates)**
Scale: 0–3 + N/A
(0 = Not true at all, 3 = Very clearly true)

1. She openly expresses comfort with casual sex or views monogamy as restrictive.
2. She has admitted cheating or being unfaithful in past relationships.
3. She often describes past relationships as boring, disappointing, or emotionally unsatisfying.
4. She shows signs of insecure attachment — clingy, avoidant, inconsistent, or fearful of closeness.
5. She acts like she has many options and isn’t eager for serious commitment.
6. She openly flirts with other men or keeps multiple romantic alternatives active.
7. She seems to need frequent external validation or attention from others.
8. She expresses doubt about exclusivity, labels, or traditional commitment.

---

# SCORING
---

## **1. Per-question max points (weights)**

**Category totals:**
- Before-interaction = 40 points
- After-interaction = 60 points

**SET 1 — Before Interaction**
(7 items, total = 40)
Q1-Q7: 10 + 6 + 6 + 6 + 5 + 3 + 4

**SET 2 — After Interaction**
(8 items, total = 60)
Q1-Q8: 10 + 17 + 6 + 8 + 5 + 5 + 4 + 5

---

## **2. Per-item scoring formula (0–3 → points + N/A)**

User answers each statement on the scale:
0   = Strongly disagree
1   = Disagree
2   = Agree
3   = Strongly agree
N/A = I don’t have enough information to judge this

For each item:
`item-points = user-score * (item-max-points / 3)`

---

## **3. Total Cheat-Risk Score (CRS: 0–100)**

Compute `sum-points = Σ item-points` across all answered items.

Compute `sum-max = Σ item-max-points` across the same answered items
(for full set, sum-max = 100).

Normalize to 0–100:
`CRS = (sum-points / sum-max) * 100`

- Round to nearest integer (or 1 decimal if you prefer).
- If all questions answered, sum-max = 100 and CRS == sum-points.

**Missing answers:** this normalization handles missing items automatically (use only answered questions). Example method shown below.

---

## **4. Risk tiers (unchanged from PRD)**
0–19 → Low
20–39 → Moderate
40–59 → Elevated
60–79 → High
80–100 → Very High

---

## **5. Contribution breakdown (top risk drivers)**

For each answered item:
`contribution-pct = item-points / sum-points * 100` (if sum-points > 0)

Sort items by contribution-pct descending and show top 3 contributors with their statements, numeric contribution, and short explanation.
