# Campus Energy Guardian

Build a complete, polished, modern, fully responsive web application called:

"CAMPUS ENERGY LEAK DETECTOR"

This is a hackathon project under "Sustainability & Smart Campus".

IMPORTANT:

Do not create only a landing page.

Build a functional interactive dashboard/prototype with multiple pages, charts, cards, tables, navigation, filters, alerts, room details, and realistic sample data.

The website should look like a professional smart-campus energy monitoring product that could be demonstrated to judges.

==================================================

1. TECHNOLOGY

==================================================

Use:

- React

- TypeScript

- Vite

- Tailwind CSS

- Recharts for charts

- Lucide React for icons

- Responsive design for desktop, tablet and mobile

Do not use unnecessary external APIs.

For this prototype, use local/mock data so the website works immediately without requiring API keys.

Structure the code cleanly into reusable components.

==================================================

2. DESIGN STYLE

==================================================

Create a premium technology dashboard.

Visual style:

- Modern

- Clean

- Professional

- Smart-campus / sustainability theme

- Dark navy/charcoal dashboard with subtle green/cyan accents

- White/light cards where appropriate

- Smooth hover animations

- Subtle gradients

- Rounded cards

- Soft shadows

- Good spacing

- Professional typography

Do NOT make it look like a generic template.

Use:

- ⚡ Energy

- 🏫 Campus

- 📊 Analytics

- 🚨 Alerts

- 💰 Cost

- 🌱 Sustainability

Use Lucide icons instead of emoji wherever possible.

Add subtle animations:

- Card hover

- Number count-up animation if practical

- Chart transitions

- Page transitions

- Alert pulse for active leaks

- Smooth sidebar interactions

Keep animations professional and not distracting.

==================================================

3. APPLICATION STRUCTURE

==================================================

Create these pages:

1. Dashboard

2. Energy Monitoring

3. Leak Detection

4. Rooms

5. Analytics

6. Alerts

7. Cost & Savings

8. Settings

Create a persistent sidebar navigation.

Top navigation should contain:

- Search

- Notifications

- Current date/time

- User/profile area

On mobile:

- Convert sidebar into a hamburger/mobile navigation.

==================================================

4. DASHBOARD PAGE

==================================================

Dashboard title:

"Campus Energy Overview"

Subtitle:

"Real-time monitoring and intelligent energy leak detection"

At the top create KPI cards:

1. Total Campus Consumption

Example: 12.8 kW

2. Active Energy Leaks

Example: 3

3. Energy Wasted Today

Example: 17.93 kWh

4. Estimated Cost Today

Example: ₹185

5. Potential Monthly Savings

Example: ₹5,540

Each card should contain:

- Icon

- Main value

- Short description

- Small trend indicator

- Professional styling

Create a large "Campus Energy Consumption" line/area chart.

Chart:

- X axis = time

- Y axis = power consumption in Watts

- Show today's consumption

- Show normal baseline

- Highlight abnormal periods

Add a legend:

- Actual Consumption

- Expected Baseline

- Anomaly

==================================================

5. ACTIVE LEAKS SECTION

==================================================

Create a prominent section:

"Active Energy Leaks"

Show cards/table for:

CS Lab 1

- Status: Critical

- Normal baseline: 21 W

- Current consumption: 1622 W

- Excess: 1601 W

- Duration: 3 hours

- Estimated waste: 4.80 kWh

- Estimated cost: ₹49

Hostel Block A

- Status: High

- Normal baseline: 462 W

- Current consumption: 1500 W

- Excess: 1038 W

- Duration: 4 hours

- Estimated waste: 4.16 kWh

- Estimated cost: ₹43

Mechanical Lab 1

- Status: Critical

- Normal baseline: 16 W

- Current consumption: 1809 W

- Excess: 1793 W

- Duration: 5 hours

- Estimated waste: 8.97 kWh

- Estimated cost: ₹92

Each alert should have:

- Severity badge

- Room

- Current usage

- Baseline

- Excess

- Duration

- Cost

- "View Details" button

Clicking "View Details" should open the corresponding room detail page/modal.

==================================================

6. CAMPUS MAP / ROOM STATUS

==================================================

Create a visual campus/building overview.

Show buildings/areas such as:

- Computer Science Block

- Mechanical Block

- Library

- Hostel Block A

- Classroom Block

Each building should have a status:

🟢 Normal

🟡 Warning

🔴 Leak Detected

Do not rely on actual geographic maps.

Instead create a clean schematic campus visualization using CSS/cards.

Make each building clickable.

Clicking a building should show:

- Building name

- Number of rooms

- Current consumption

- Active alerts

- Status

==================================================

7. ENERGY MONITORING PAGE

==================================================

Create detailed energy monitoring.

Top filters:

- Today

- 7 Days

- 30 Days

- Custom

Additional filters:

- Building

- Room

- Day type

Create:

A large consumption graph.

Graphs:

1. Hourly energy consumption

2. Daily energy consumption

3. Baseline vs actual

4. Energy by building

Allow chart tooltips.

Create a table:

Room | Current Power | Baseline | Difference | Status

Example rooms:

CS Lab 1

CS Lab 2

Mechanical Lab 1

Mechanical Lab 2

Library Hall

Classroom 101

Classroom 102

Hostel Block A

Use realistic but clearly mock/sample values.

==================================================

8. LEAK DETECTION PAGE

==================================================

Title:

"Intelligent Leak Detection"

Explain briefly:

"The system learns the normal energy behavior of each room and detects unusual consumption instead of using one fixed campus-wide threshold."

Create a visual detection pipeline:

Sensor Data

↓

15-Minute Readings

↓

Room-Specific Baseline

↓

Z-Score Analysis

↓

Validation Guards

↓

Leak Alert

↓

Cost Estimation

Make this visually attractive.

Create an "Algorithm Explanation" card.

Display:

z = (x - μ) / σ

Where:

x = current energy consumption

μ = expected baseline

σ = normal variation

Show the prototype threshold:

z ≥ 2.5

Create three guard cards:

1. Sigma Floor

σ ≥ max(15% of μ, 3 W)

2. Minimum Excess

At least 50 W above baseline

3. Minimum Duration

2 consecutive readings = 30 minutes

Make each guard visually understandable.

==================================================

9. LEAK DETECTION DEMO

==================================================

Create an interactive simulation.

Title:

"Test Energy Reading"

Inputs:

- Room

- Current power

- Duration

When the user enters/selects values, calculate/display:

- Baseline

- Excess power

- Z-score

- Severity

- Estimated wasted kWh

- Estimated cost

- Detection result

Example:

Current Power: 1622 W

Baseline: 21 W

Calculate:

Excess = Current - Baseline

Use:

Wasted kWh = Excess × hours / 1000

Cost = Wasted kWh × ₹10.30

Show result:

"ENERGY LEAK DETECTED"

Make this interactive using React state.

==================================================

10. ROOMS PAGE

==================================================

Create a searchable room directory.

Search bar:

"Search rooms..."

Filters:

- All

- Normal

- Warning

- Leak

Room cards should contain:

Room name

Building

Current power

Baseline

Status

Last updated

Estimated daily consumption

Example rooms:

CS Lab 1

CS Lab 2

Mechanical Lab 1

Mechanical Lab 2

Library Hall

Classroom 101

Classroom 102

Hostel Block A

Click a room to open a detailed room page.

==================================================

11. ROOM DETAIL PAGE

==================================================

For each room display:

Room name

Status

Current consumption

Normal baseline

Z-score

Excess power

Estimated waste

Estimated cost

Duration

Last updated

Create a detailed chart:

"Actual vs Expected Consumption"

Use:

- Actual power line

- Baseline line

- Highlight anomaly region

Add:

"Why was this flagged?"

Example:

"Current consumption is significantly above this room's learned baseline and has remained elevated for multiple consecutive readings."

Add a "Mark as Resolved" button.

When clicked:

- Change status to resolved

- Remove it from active alerts

- Show confirmation

==================================================

12. ANALYTICS PAGE

==================================================

Create advanced analytics.

Charts:

1. Energy consumption by building

2. Energy waste by room

3. Daily consumption trend

4. Weekly consumption trend

5. Estimated monthly waste

6. Normal vs abnormal consumption

Add a summary section:

"Campus Energy Insights"

Example insights:

- CS Lab 1 currently shows unusually high consumption.

- Mechanical Lab 1 has the highest detected excess load.

- Hostel Block A contributes significant after-hours consumption.

- Several rooms remain within their normal baseline.

These should be displayed as informational insights, not fabricated real-world claims.

==================================================

13. ALERTS PAGE

==================================================

Create an alert management dashboard.

Tabs:

- Active

- Resolved

- All

Alert table:

Severity

Room

Detected At

Current Power

Baseline

Excess

Duration

Estimated Cost

Status

Severity levels:

- Critical

- High

- Medium

- Low

Use appropriate visual badges.

Add buttons:

- View

- Resolve

- Dismiss

Include confirmation dialogs before destructive actions.

==================================================

14. COST & SAVINGS PAGE

==================================================

Title:

"Energy Waste & Cost"

Use electricity tariff:

₹10.30 / kWh

Create KPI cards:

Today's Waste

Weekly Waste

Monthly Projected Waste

Today's Cost

Monthly Projected Cost

Potential Savings

Create charts:

- Waste by room

- Cost by building

- Monthly projected savings

Include the calculation:

Wasted kWh = (Current Power - Baseline) × Duration / 1000

Cost = Wasted kWh × Tariff

Make the calculation understandable to a hackathon judge.

==================================================

15. VALIDATION PAGE/SECTION

==================================================

Create a section titled:

"Prototype Validation"

Display:

Leaks detected: 4 / 4

False positives: 0

Precision: 1.000

Recall: 1.000

F1 Score: 1.000

IMPORTANT:

Clearly label these as:

"Prototype validation results on the supplied test dataset"

Do NOT claim that these numbers represent universal real-world accuracy.

Add a small note:

"Prototype results depend on the dataset and operating assumptions. Real-world deployment requires validation with live campus data."

Create a simple confusion-matrix-style visual:

Actual Leak

Detected Leak

Actual Normal

No False Positive

==================================================

16. DETECTION FLOOR

==================================================

Create a section explaining:

"Smallest Detectable Leak"

Use example rooms:

Classroom

Baseline: 204 W

Smallest detectable draw: 5 W

Excess: 48 W

Mechanical Lab 1

Baseline: 15 W

Smallest detectable draw: 64 W

Excess: 49 W

CS Lab 1

Baseline: 20 W

Smallest detectable draw: 69 W

Excess: 49 W

Library Hall

Baseline: 61 W

Smallest detectable draw: 102 W

Excess: 41 W

Hostel Block A

Baseline: 478 W

Smallest detectable draw: 627 W

Excess: 149 W

Add a visual comparison chart.

==================================================

17. HOW THE BASELINE WORKS

==================================================

Create a visual explanation:

The system does NOT use one fixed threshold for every room.

Instead:

Room

+

Hour

+

Weekday/Weekend

+

Recent matching history

=

Expected baseline

Explain:

"The prototype calculates the mean μ and spread σ for each room/hour/day-type bucket using recent matching history."

Use:

Trailing 7 matching days

Make this section visually clear for judges.

==================================================

18. DATA COLLECTION

==================================================

Create a timeline/flow:

Every 15 minutes

↓

Collect energy reading

↓

Store reading

↓

Compare with room baseline

↓

Calculate anomaly score

↓

Apply guards

↓

Generate alert

↓

Estimate cost

==================================================

19. SETTINGS PAGE

==================================================

Create settings UI.

Sections:

Detection Settings:

- Z-score threshold: 2.5

- Minimum excess: 50 W

- Minimum duration: 30 minutes

- Sigma floor: 15% of baseline / 3 W

Energy Settings:

- Electricity tariff: ₹10.30/kWh

Notification Settings:

- Email alerts toggle

- Dashboard alerts toggle

- Critical alert toggle

Do not actually send emails.

Save button should work locally using React state/localStorage.

==================================================

20. NAVIGATION

==================================================

Sidebar:

⚡ Campus Energy Detector

Dashboard

Energy Monitoring

Leak Detection

Rooms

Analytics

Alerts

Cost & Savings

Settings

Bottom of sidebar:

System Status

● Monitoring Active

Show:

"Last updated: Just now"

Navigation must work correctly.

==================================================

21. DATA

==================================================

Create a realistic mock dataset representing:

- 15-minute readings

- Multiple rooms

- Multiple buildings

- Normal readings

- Abnormal readings

- Historical readings

- Alert events

The app must work without an external database.

Use centralized mock data so all pages show consistent values.

Do not randomly generate different values every time the page renders.

==================================================

22. IMPORTANT PROJECT VALUES

==================================================

Use these exact prototype values where applicable:

Electricity tariff:

₹10.30/kWh

Detection threshold:

z ≥ 2.5

Minimum excess:

50 W

Minimum duration:

2 consecutive readings / 30 minutes

Examples:

CS Lab 1:

Baseline 21 W

Measured 1622 W

Duration 3 hours

Excess 1601 W

Estimated waste 4.80 kWh

Estimated cost ₹49

Projected monthly cost ₹1,485

Hostel Block A:

Baseline 462 W

Measured 1500 W

Duration 4 hours

Excess 1038 W

Estimated waste 4.16 kWh

Estimated cost ₹43

Projected monthly cost ₹1,284

Mechanical Lab 1:

Baseline 16 W

Measured 1809 W

Duration 5 hours

Excess 1793 W

Estimated waste 8.97 kWh

Estimated cost ₹92

Projected monthly cost ₹2,771

==================================================

23. LIMITATIONS SECTION

==================================================

Create a professional "Current Limitations" section.

Include:

- Cold start requires historical data.

- Weekend buckets have fewer samples.

- Brand-new buildings may have limited baseline history.

- A permanent leak can eventually become part of the baseline.

- Schedule changes can cause alerts.

- Detection is currently room-level, not device-level.

- Prototype uses synthetic/test data.

- Missing or irregular readings are not fully modeled.

Do not hide these limitations.

==================================================

24. FUTURE ROADMAP

==================================================

Create a timeline:

Phase 1:

Prototype dashboard

Phase 2:

Live IoT/smart meter integration

Phase 3:

Firebase/Supabase backend

Phase 4:

Mobile notifications

Phase 5:

Advanced anomaly detection

Phase 6:

Campus-wide deployment

Potential future improvements:

- Academic calendar awareness

- Repeated alert escalation

- Seasonal models

- Isolation Forest

- Missing-data handling

- Device-level monitoring

Clearly label these as FUTURE plans, not current features.

==================================================

25. LANDING / HOME INTRO

==================================================

The dashboard should start with a short hero area:

"CAMPUS ENERGY LEAK DETECTOR"

Headline:

"Turn Hidden Energy Waste Into Actionable Insights."

Description:

"An intelligent room-level energy monitoring system that learns normal consumption patterns and detects unusual energy usage before it becomes unnecessary cost."

Buttons:

"View Live Dashboard"

"Explore Detection"

Add a visual energy pulse / campus monitoring graphic.

Do not make the landing section too large; this is primarily a dashboard application.

==================================================

26. FOOTER

==================================================

Footer:

Campus Energy Leak Detector

Smart Sustainability Monitoring

"Prototype • Hackathon 2026"

Add:

Dashboard | Analytics | Alerts | Settings

==================================================

27. USER EXPERIENCE

==================================================

Make every major button functional.

Examples:

"View Details"

→ opens room/alert detail.

"Resolve"

→ updates alert state.

"View Analytics"

→ navigates to Analytics.

"Test Reading"

→ calculates detection result.

"Save Settings"

→ saves settings locally.

Search

→ filters rooms/alerts.

Filters

→ update displayed data.

Charts

→ have tooltips.

Do not create fake buttons that do nothing.

==================================================

28. RESPONSIVENESS

==================================================

Desktop:

- Full sidebar

- Multi-column dashboard

Tablet:

- Collapsible sidebar

- Responsive cards

Mobile:

- Hamburger menu

- One/two-column cards

- Scrollable tables

- Charts resize correctly

- No horizontal page overflow

==================================================

29. ACCESSIBILITY

==================================================

Use:

- Proper contrast

- Accessible buttons

- Labels

- Keyboard-friendly controls

- aria-labels where necessary

==================================================

30. FINAL QUALITY REQUIREMENTS

==================================================

The final result must feel like a real SaaS product.

Avoid:

- Generic template appearance

- Excessive gradients

- Excessive animations

- Huge empty spaces

- Fake statistics presented as real-world facts

- Broken navigation

- Non-functional buttons

- Placeholder lorem ipsum

- Unnecessary login/authentication

Make the UI polished enough to demonstrate to hackathon judges.

Add realistic loading states where appropriate.

Add empty states for filters/searches.

Add toast notifications for actions such as:

- Alert resolved

- Settings saved

- Reading analyzed

Use consistent terminology throughout the application.

==================================================

31. IMPORTANT FINAL INSTRUCTION

==================================================

Build the COMPLETE application now.

Do not stop after creating the homepage.

Create all pages, reusable components, mock data, charts, interactions, calculations, navigation, responsive layouts, and styling.

After implementation, check for:

- TypeScript errors

- Broken imports

- Broken routes

- Missing components

- Non-working buttons

- Responsive layout issues

The website should run immediately with the standard Vite development command.

The final application should look like a polished:

"AI-powered Smart Campus Energy Monitoring & Leak Detection Dashboard."

Do not add features that are not described above unless they are necessary for the application to function.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e7e390ef-9b80-5748-b90d-e3ec81f0b295).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
