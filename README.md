## Q1 Prototyping

To run the application, take the following steps:

### `Run the Local Server`

**1. Open a new command prompt**\
**2. cd {project_directory}**\
**3. npm run serve:local**

Runs the app mock database api calls\
Open [http://localhost:8000](http://localhost:3000) to view it in the browser.

### `Run and Open the App`

**1. Open a new command prompt**\
**2. cd {project_directory}**\
**3. npm run start**

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

**Once in the application, click on the Analytics icon or link to view the recruiting pipeline prototype.**

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Description

This application is built using the React framework.  The reasoning behind the use of the React framework is that it provides quick front end prototyping and has a large community providing third-party libraries.  Additionally, it is my understanding that many of the applications within Andela are built using React, and I thought this framework would be the most applicable to the company's current development habits.

### Libraries Used

#### json-server

This library allows us to mock api calls without building a back end.

#### react-chartjs-2

This library provides several chart component options that are used in the application to display various anayltics and metrics.

#### react-datepicker

Provides a Datepicker component for quick date selection prototyping

#### AI Use

AI was used in the development of mock data.  I supplied ChatGPT to with the schema in which I needed the data and gave it various prompts to expedite the process of mock data creation.

## Q2 Balancing Priorities 

Response to CEO:

I appreciate you emphasizing the importance of delivering this new feature for the upcoming event. I fully recognize the urgency, and our team is dedicated to supporting the company’s strategic objectives. That said, I’d like to bring attention to some potential challenges and risks that could affect both the project timeline and the long-term financial health of the platform.

Our team has identified significant technical debt that must be addressed to ensure the platform remains stable, maintainable, and scalable. While we could proceed with developing the new feature without resolving this debt, doing so could expose us to considerable risks that may ultimately impact the company’s financial performance.

Here are some key risks to consider:

1. **Increased Costs from Rework and Maintenance:** If we proceed with the feature implementation without addressing critical technical debt, we may face increased time and costs later on. This could involve rework, bug fixes, and more extensive testing, all of which would drive up developer hours and delay other priorities.

2. **Potential Operational Disruptions:** Introducing new features on top of unresolved technical debt could lead to system instability, resulting in outages or degraded performance. Downtime or poor user experience would lead to lost revenue, customer dissatisfaction, and potential churn—particularly damaging if the product is customer-facing or revenue-generating.

3. **Regulatory and Security Risks:** Ignoring debt might overlook important security or compliance issues, exposing the company to potential fines or lawsuits. We could also incur significant costs if we fail to meet required security standards, particularly if the new feature inadvertently introduces vulnerabilities.

4. **Missed Strategic Opportunities:** If we push the feature out too quickly without properly addressing the technical debt, we risk damaging long-term scalability and flexibility, making it harder to adapt in the future. This could affect our ability to scale efficiently and delay future innovation, ultimately leading to a loss of competitive advantage or missed market opportunities.

To balance both the short-term need for the feature and the long-term stability of the platform, I see a couple of possible paths forward:

1. **Address Critical Technical Debt First:** We can prioritize the most pressing technical debt issues before beginning work on the new feature. This would allow us to build a stable foundation, reducing the risks of system failure and rework down the line. While this would delay the feature slightly, it would ensure we deliver a high-quality, sustainable product that can support future growth.

2. **Fast-Track Feature with a Post-Event Debt Paydown Plan:** If the feature is critical for the event, we can proceed with its development while acknowledging the technical debt. However, we would need to ensure sufficient time for rigorous testing and risk mitigation. After the event, we would then focus on addressing the technical debt to prevent future issues and ensure the product remains scalable and maintainable. This option would incur some additional costs later but could help us meet the immediate business goals.

In either scenario, I want to ensure that we make the best decision for the company’s financial health while also delivering on our commitments. I’m happy to work with you and the team to determine which approach balances the need for speed with the need for long-term stability.



