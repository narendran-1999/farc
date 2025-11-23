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
        *   0-19: Low
        *   20-39: Moderate
        *   40-59: Elevated
        *   60-79: High
        *   80-100: Very High
    *   The results page will also display the **top 3 contributing factors** to the score, showing the specific question and its percentage contribution.

### 3.2. Scoring Logic

The scoring logic must be implemented exactly as specified in the `questions-n-scoring.md` document:

*   **Item Points**: `item-points = user-score * (item-max-points / 3)`
*   **Total Score (CRS)**: `CRS = (sum of item-points / sum of max-points for answered questions) * 100`
*   **Contribution Breakdown**: `contribution-pct = (item-points / sum of all item-points) * 100`

### 3.3. Non-Functional Requirements

*   **Technology Stack**: The application will be built using Astro and React.
*   **Deployment**: The application will be deployed to GitHub Pages.
*   **User Interface**: The UI should be clean, simple, and easy to navigate. It should be responsive and work well on both desktop and mobile devices.
*   **Privacy**: The application will not store any user data. All calculations will be done on the client-side.

## 4. User Interface & User Experience (UI/UX)

*   **Start Screen**: A clear and concise introduction to the tool, including the disclaimer. The initial classification question will be presented here.
*   **Questionnaire Screen**:
    *   Questions should be presented one at a time or in a clear, scrollable list.
    *   The user's progress should be visible (e.g., "Question 3 of 15").
    *   The options for each question should be presented as radio buttons or a similar selection method.
*   **Results Screen**:
    *   The CRS should be prominently displayed.
    *   The risk tier should be clearly stated.
    *   The top 3 contributors should be listed with their descriptions and contribution percentages.
    *   A "Start Over" button should be provided to allow the user to retake the questionnaire.
