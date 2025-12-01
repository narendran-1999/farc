# Product Requirements Document: FARC (Female Adultery Risk Calculator)

**Version:** 1.0
**Date:** 2025-11-23

---

## 1. Introduction & Purpose

The FARC (Female Adultery Risk Calculator) is a web-based tool designed to provide a "Cheat-Risk Score" (CRS) for a female acquaintance. The score is calculated based on user-provided answers to a standardized questionnaire. The tool aims to provide a statistical assessment of risk based on observable behaviors and statements, helping users minimize the risk of committing to partners who may be unsuitable.

**Disclaimer:** The questions and weightages used in this calculator are based on credible research studies. While the weightage numbers are arbitrary coefficients used to estimate risk, the evaluated risk is purely statistical and risk-related, not a definitive assessment of a woman's character or future conduct. This tool is intended solely to assist men in minimizing the risk of committing to potentially unsuitable partners.

## 2. Target Audience

The primary target audience is men who are actively dating and want a structured way to assess potential partners based on a specific set of criteria derived from research.

## 3. Functional Requirements

### 3.1. User Interaction Flow

1.  **Initial Classification**: The user is first presented with a question to determine their level of interaction with the person:
    *   "I only have public/online information (haven't interacted yet)"
    *   "We've interacted (talking, dates, texting)"
    *   "I don't really know anything"

2.  **Questionnaire Presentation**:
    *   If the user selects "public/online information", they are presented with **Set 1** questions.
    *   If the user selects "We've interacted", they are presented with both **Set 1 and Set 2** questions.
    *   If the user selects "I don't really know anything", the application should display a message indicating that an assessment cannot be made.

3.  **Answering Questions**: For each question, the user can select one of the following options:
    *   Strongly disagree (0)
    *   Disagree (1)
    *   Agree (2)
    *   Strongly agree (3)
    *   I don't have enough information to judge this (N/A)

4.  **Score Calculation & Results**:
    *   Upon completion, the application will calculate and display the "Cheat-Risk Score" (CRS) as a number from 0-100.
    *   The CRS will be accompanied by a risk tier:
        *   0-19: Minimal Risk
        *   20-39: Low-Moderate Risk
        *   40-59: Elevated Risk
        *   60-79: High Risk
        *   80-100: Critical Risk
    *   The results page will also display the **top 3 contributing factors** to the score, showing the specific question ranked by contribution (displayed as ranking numbers 1, 2, 3).

### 3.2. Scoring Logic

The scoring logic must be implemented exactly as specified in the `questions-n-scoring.md` document:

*   **Item Points**: `item-points = user-score * (item-max-points / 3)`
*   **Total Score (CRS)**: `CRS = (sum of item-points / sum of max-points for answered questions) * 100`
*   **Contribution Breakdown**: `contribution-pct = (item-points / sum of all item-points) * 100`

### 3.3. Non-Functional Requirements

*   **Technology Stack**: The application is built using Astro v5.16.0 and React v19.2.0.
*   **Deployment**: The application is deployed to GitHub Pages at `narendran-1999.github.io/farc`.
*   **User Interface**: The UI should be clean, simple, and easy to navigate. It should be responsive and work well on both desktop and mobile devices.
*   **Privacy**: The application will not store any user data. All calculations will be done on the client-side.

### 3.4. Additional Pages

The application includes the following additional informational pages:

*   **Predictors Page** (`/predictors`): Displays the strongest predictors of infidelity based on research, organized into "Before Interaction" and "After Interaction" categories.
*   **References Page** (`/references`): Lists all research sources and citations used in the calculator.
*   **Privacy Page** (`/privacy`): Explains the privacy guarantees of the tool (client-side only, no data storage).

## 4. User Interface & User Experience (UI/UX)

*   **Layout System**: The application uses a reusable layout system with `BaseLayout` (common HTML boilerplate) and `ContentPageLayout` (for content pages with back navigation).
*   **Start Screen**: A clear and concise introduction to the tool, including the disclaimer. The initial classification question is presented here with links to Predictors, References, and Privacy pages.
*   **Questionnaire Screen**:
    *   Questions are presented one at a time with a progress bar showing current position.
    *   The user's progress is visible via the progress bar component.
    *   The options for each question are presented as stacked buttons.
*   **Results Screen**:
    *   The CRS is prominently displayed in a colored circle.
    *   The risk tier is clearly stated with color-coded styling:
        *   0-19: Minimal Risk
        *   20-39: Low-Moderate Risk
        *   40-59: Elevated Risk
        *   60-79: High Risk
        *   80-100: Critical Risk
    *   The top 3 contributors are listed with ranking numbers (1, 2, 3) and their question text.
    *   A "Start Over" button is provided to allow the user to retake the questionnaire.
    *   Links to Predictors, References, and Privacy pages are available.
