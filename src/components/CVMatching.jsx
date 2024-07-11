import { DataGrid } from "@mui/x-data-grid";
import { Button } from '@mui/material';
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import JobDescriptionModal from "./Modal/JobDescriptionModal";
import CandidateModal from "./Modal/CandidateModal";
import { useMediaQuery, useTheme } from '@mui/material';

const jobDescriptions = {
  name: "IT Security and Compliance Deputy Manager",
  degree:
    "Bachelor degree in Information security/Computer Science/Computer Engineering/MIS, or equivalent programs. An advance degree, such as MBA, Master degree is a plus.",
  major: "none",
  hard_skills:
    "Expertise in Vulnerability Management, Incident Response/SOC, SIEM. Experience in cloud security. Experience in DLP solutions. Proficiency in Linux, Windows systems engineering/operations.",
  soft_skills: "none",
  language: "none",
  certificate:
    "Relevant professional qualifications such as OSCP, OSCE, OSWE, GPEN, GXPN, CHFI would be an advantage.",
  experience:
    "At least 05 years Cyber Threat Intelligence, Red team and Blue Team Experience. At least 05 years of experience operating security systems, including firewalls, intrusion detection systems, anti-virus software, authentication systems, SIEM, VPN, DLP, IAM, PAM, database security, etc.",
};

const rowsData = {
  "Antonios F. Takos": [
    "Java, Python, JavaScript, HTML, CSS, SQL, PowerShell, BASH, AutoHotkey, Git, React.js, Node.js, Express.js, Flask, Selenium, Streamlit, Pandas, Java Swing, Elementor, SSH, RDP, PXE, GitHub, Google Firebase, MySQL, WordPress, Figma, AWS Amplify, Microsoft Office, Google Suite, Leadership, Communication, Problem-Solving, I.T Operations, Modern Greek (Limited Working Proficiency)",
    "Bachelor of Science",
    "Computer Science",
    0.6365783660747936,
  ],
  "John Doe": [
    "HTML5, JavaScript, PHP, Python, React.js, Angular, Vue.js, Laravel, Django, Webpack, Git, Jenkins, Docker, JIRA",
    "Bachelor's",
    "Computer Science",
    "AWS Certified Developer",
    0.620513268537767,
  ],
  "LÊ MINH CHIẾN": [
    "HTML / CSS / JAVASCRIPT, PHP / MVC, REACTJS, BOOTSTRAP / TAILWINDCSS, EXPRESSJS / NODEJS, MYSQL / MONGODB, UBUNTU, C/C++",
    "Bachelor's Degree",
    "Computer Engineering",
    0.6044242772650898,
  ],
  "Trần Đăng Khoa": [
    "CSS, JavaScript, C++, C#, Java, Python, PHP, Solidity, Laravel Framework, Python Flask, Java Spring MVC, Vue.js, MySQL, SQL",
    "Information Technology",
    0.6018603025561315,
  ],
  "Vo Nguyen Mai Lan": [
    "Microsoft Office, Basic Python and Java, Analytic",
    "Bachelor of Information and Communication Technology",
    "Information and Communication Technology",
    0.5928122194719264,
  ],
  NGUYENVANTUAN: [
    "java, nodejs, HTML, CSS, mysql, mongodb, postgres, git, github, gitlab, linux, docker, jenkins, ansible, mognosh, mysqlsh, spring, interllj, visualstudiocode, eclipse",
    "Information Technology",
    "ADSE-Aptech Saigon-HoChiMinh",
    0.5862001969683517,
  ],
  "Nguyen Thanh Hung": [
    "AWS Services, SQL Server, PostgreSQL, MongoDB, Apache PySpark, Apache Airflow, Apache Kafka, Power BI, Docker, Docker Compose, Pentaho Data Integration, Agile Scrum, Github, Microsoft Power platform, .Net legacy systems development, Back-end processing",
    "Bachelor's Degree",
    "Computer Science",
    "IELTS Academic Certification",
    0.5810784317453169,
  ],
  "Byungjin Park": [
    "DevOps, Software Architecture, Infrastructure Operation, Backend Development, Security Engineering, AWS, Terraform, Kubernetes, GitOps, Graviton Instances, AWS Route53 DNS Firewall, Okta, Kong API Gateway, OpenLDAP, Kafka, Elastic Stack, InfluxDB, Grafana, AWS Direct Connect, VPN, OpenVPN, AWS EKS, Kubernetes Manifests, Observability, Monitoring, Microservices, Elastic APM, IaC, Ansible, Packer, CircleCI, Docker, AWS ECR, Rancher, Machine Learning, Node.js, ELK Stack, Payment Gateway Integration, RESTful API, AWS Services, CI/CD Pipelines",
    "B.S. in Computer Science and Engineering",
    "Computer Science and Engineering",
    "AWS Certified Advanced Networking-Specialty, AWS Certified Security-Specialty, AWS Certified Solutions Architect-Professional, AWS Certified SysOps Administrator-Associate, Certified Kubernetes Application Developer (CKAD), HashiCorp Certified: Consul Associate, HashiCorp Certified: Terraform Associate",
    0.5808802241966565,
  ],
  "Huy Nguyen": [
    "SCSS, Javascript, ReactJS, Java, Java Servlet, Java Spring Boot, PHP, Lavavel, SQL Server, MySQL, MongoDB, Business Analysis, Three Layer Model, MVC Model, Git, Postman, Hibernate",
    "Bachelor's Degree",
    "Software Engineering",
    0.5735533123368507,
  ],
  "Harvey Dent": [
    "Python, R, TensorFlow, PyTorch, Scikit-learn, Keras, SQL, NoSQL, Git, Docker, Kubernetes, Agile and Scrum, Statistics, Data visualization, Deep Learning, Natural Language Processing",
    "Master of Science in Computer Science",
    "Specialization in AI",
    0.569225651943578,
  ],
  "B.S.Vidhya": [
    "Development, Testing, Implementation, Production Support, Application testing, System administration, Patch management, UAT testing, Management Information System, Control and Monitoring System, User Management, Relational Databases, Client Server computing models",
    "B.S.",
    "Information Technology",
    "Certified for participating in IPT of railway dept (Railnet), Certified for participating in IBM over the topic mainframe computers AS400, Won for a tough competition in presenting my career project based on Inter Packet Correlation using Water Morphing through Stepping Stones",
    0.5658647600280562,
  ],
  "PHAM TIEN DUC": [
    "Python, C#, .NET Framework, ASP.NET, Entity Framework, .NET Core, .NET 5, SQLServer, CSHTML, HTML, CSS, Bootstrap, RESTful API, JSON, XML, Selenium, WebDriver, Cross-browser Testing, Browser Testing, API Testing",
    "Software Development",
    0.5643311211719391,
  ],
  "Barry Allen": [
    "JavaScript, TypeScript, HTML5, CSS3, Python, React, Redux, Angular, Vue.js, Node.js, Express.js, D3.js, Git, Docker, Webpack, Babel, Google Cloud Platform, Firebase, RESTful APIs, GraphQL, Agile Development, Test-Driven Development, Responsive Design, UI/UX",
    "B.Tech",
    "Computer Science and Engineering",
    0.5643235450508185,
  ],
  "Rajat Agarwaal": [
    "Python, C, Machine Learning, Deep Learning, Computer Vision, Natural Language Processing, SQL, Pig, Hive, Basics of HDFS, Statistical Analysis, Gitlab, Tableau",
    "M. Tech in Data Science and Business Analytics",
    "Data Science and Business Analytics",
    "TCS iON ProCert “Analytics” Certiﬁed, Gold Badge for both Python and Sql on Hacker Rank",
    0.5639462300829308,
  ],
  "HUYNH TRUNG NGHIA": [
    "HTML, CSS, JS, BOOTSTRAP, REACT, C#, .NET, ASP.NET CORE MVC, ASP.NET WEB API, WINFORM, ENTITY FRAMEWORK, OOP, DEPENDENCY INJECTION, REPOSITORY, UNITOFWORK PATTERNS, MS SQL, GITHUB, TEAMWORK, SELF-LEARNING",
    "COMPUTER PROGRAMMING",
    "Level B certificate in English (2019), Level A certificate in Office Information (2019)",
    0.5572385722843197,
  ],
  "Nguyen Chung Van": [
    "Java, Javascript, C++, Spring Boot, Spring JPA, Spring Security, ExpressJS, MySQL, PostgreSQL, MongoDB, Linux",
    "UNIVERSITY OF TECHNOLOGY INFORMATION - VNU",
    "System Information",
    0.5549625940649907,
  ],
  "Dushyant Bhatt": [
    "BI, Big Data, Azure, Data analysis, Database designing, SQL, Stored Procedures, ETL, SSIS, Tableau, Power BI, SSRS",
    "Bachelor's Degree",
    "not specified",
    "not specified",
    0.5543689272657684,
  ],
  "David Baker": [
    "MongoDB, Express.JS, AngularJS, Node.JS, Swift, Java, Python",
    "BS in Computer Science",
    "Computer Science",
    "CertiMed Scrum Master (CS-)",
    0.5529370858396973,
  ],
  "Hariharanadh Karanam": [
    "Java, Spring, Hibernate, Web services, Spring Boot, HTML, CSS, JavaScript",
    "B.E in Computer Science and Engineering",
    "Computer Science",
    "Cognizant certified professional for Omega.java, General Insurance and fundamentals of Insurance industry, trained Emergency Response Team Volunteer at Cognizant",
    0.5498367393411737,
  ],
  "Bruce Wayne": [
    "JavaScript, TypeScript, MongoDB, Express.js, React, Node.js, RESTful APIs, Git, GitHub, Docker, Kubernetes, Agile, Scrum, Python, Machine Learning",
    "PhD in Computer Science",
    "Computer Science",
    0.5496544798756865,
  ],
  "Le Trang": [
    "Basic HTML, CSS, Javascript, SQL, Git, PHP, Laravel, Basic Japanese, Basic Design and Edit in Adobe, Photoshop, Adobe After Effects",
    "Information Technology",
    0.5494056495954261,
  ],
  "Truong Quang Son": [
    "C#, ASP.Net MVC, ASP.Net Core API, Java, SQL Server, MongoDB, Angular, Bootstrap",
    "SOFTWARE ENGINEERING",
    0.5491773680312454,
  ],
  "Nguyen Van Cuong": [
    "HTML/CSS (SCSS), Javascript, JQuery, BootStrap, Angular, ReactJS, Redux, NextJS, Express, .Net Core, PHP, SQL Server, MySQL, git",
    "SOFTWARE TECHNOLOGY",
    0.548276091345465,
  ],
  "Antony Deepak Thomas": [
    "Microsoft SQL Server, C#, ASP.NET, ASP.NET MVC, jQuery, JavaScript, Python, HTML, CSS3, .NET CLR, NUnit, Managed Extensibility Framework, Design Patterns, Data Driven Testing, LINQ, MSBuild, Regular Expressions, Bash, CSS, Database Design, Software Development",
    "Post Graduate Diploma",
    "Logistics, Materials, and Supply Chain Management",
    "C# 4.0 Master, ASP.NET 4.0, JavaScript 1.5, SQL Server 2008 Programming, Design Patterns, C# 3.0 Master, Object Oriented Concepts, SQL Server 2005 Programming, .NET framework Fundamentals, Presentation Skills, Project Management, UML, Business Communication, Business Mathematics, MicroEconomic principles",
    0.5481964555647965,
  ],
  "Nguyễn Hồng Lê Duy": [
    "Python, Django REST framework, Django, Celery, Java, Spring MVC, Jsp, JDBC, RESTful API, Spring boot, JPA, MySQL, SQLite, Redis, Mongodb",
    "University",
    "Chemical engineer – Organic Synthesis",
    "Business administration",
    0.547158746537134,
  ],
  "Elliot Alderson": [
    "MongoDB, AngularJS, Swift, Python, Express.JS, Mode.JS, Java",
    "BS",
    "Computer Science",
    0.5468212338168236,
  ],
  "Do Tuan Kiet": [
    "HTML, CSS, Js, MVC, Microsoft SQL, PHP, Boostrap, MySQLi, C#, Unity Engine, Java, Android Studio, English, Adobe Photoshop, Adobe Premiere, Microsoft Office",
    "college degree",
    "Information technology (software technology)",
    0.5460931105686624,
  ],
  "UJJWAL SHARMA": [
    "Full-Stack JS, Nodejs, MongoDb, SQLite, Mongoose, GraphQL, Pusher, EmberJS, Nexmo, Pug, AngularJS, ReactJS, MS Office, Visual Studio Code, Latex",
    "Bachelor + Master in Technology",
    "Information Technology",
    0.5430501148511699,
  ],
  "Brendan Herger": [
    "H2O.ai, GraphLab, SKLearn, Apache Apex, Apache Spark, Python, Pandas, R, Scikit-Learn, Java, MySQL, HTML5/CSS",
    "MS, Analytics",
    "Analytics",
    0.5388706790741681,
  ],
  "MAI HOANG XUAN": [
    "ASP.NET Core, MVC, API, Minimal API, SQL Server, MySQL, MongoDB, C Sharp, NodeJS, ExpressJS, Html, Css, Javascript, Git, Github, Docker",
    "Software development",
    "AWS Academy Cloud Foundations - Amazon Web Services",
    0.5369526190096374,
  ],
  "Huynh Duy Phuong": [
    "HTML, CSS, TypeScript, JavaScript, Bootstrap, ReactJs, PHP, ASP.NET Core Web API, ASP.NET Core MVC, SQL, MySQL Server, Git, Chat GPT",
    "Information Technology / Computer Programming",
    "Computer Programming",
    0.5358456868759455,
  ],
  "Y TRUNG AYUN": [
    "React.js, HTML, CSS, JavaScript, Bootstrap, Node.js, Express, PHP, Java, MongoDB, MySQL, SQL",
    "INFORMATION TECHNOLOGY",
    "Web Development",
    0.5355133233761069,
  ],
  "Ho Duc Phap": [
    "HTML, CSS, Tailwind CSS, Ant Design, JavaScript, TypeScript, Redux Toolkit, React JS, Next JS, Node JS, Express JS, MongoDB, Restful API, Git, GitHub, Gitlab",
    "University of Technology and Education",
    "Information Technology",
    0.5351612851067472,
  ],
  "Program Huỳnh Tín": [
    "PHP, JAVA, C#",
    "Software Engineering",
    0.5344680805835879,
  ],
  "NGUYEN VAN NAM": [
    "PHP, HTML5, CSS, Bootstrap, Github, Angular, React, Vue, Word, Powerpoint, Excel, Javascript, Nodejs",
    "Studing at BachKhoaAptech",
    0.5281762440259772,
  ],
  "LUONG VAN KHANG": [
    "Python, Django, FastAPI, Javascript, Docker, Postgres, MongoDB, SQLalchemy, CI/CD, Pandas, Postgres Python Coding",
    "University",
    "Mechatronics",
    "Certificate in Udemy courses: SQL – MySQL for Data Analytics and Business intelligence, Learn Python programming Masterclass, Complete Python Developer in 2021 Zero to Mastery, The complete SQL Bootcamp 2022",
    0.5279967859670845,
  ],
  "Michael Harrison": [
    "Microsoft SQL server, Microsoft ASP.NET (C#), Javascript, Software design, Code reviews, Testing, Video Streaming Technologies, C++, Unix, Linux",
    "B.A. (Hons) Computer Science",
    "Computer Science",
    0.5275892703519192,
  ],
  "Lindsay Atkinson": [
    "Survey Creation, Experimental Design, Raw Data Analysis, Data Science Methodologies, Big Data Analysis, Machine Learning Principles, Regression Analysis, Quantitative Methods, Data Warehousing, Data Scrubbing, Data Manipulation, Statistical Modelling, Business Intelligence, Database Design, Data Mining, Probability Theory",
    "Master's Degree",
    "Statistics and Data Sciences",
    "MCSE: Data Management and Analytics, Associate Big Data Engineer (ABDE) Certification",
    0.5212716998591936,
  ],
  "HUYNH MINH CHI": [
    "Vue.js, React.js, React Native, HTML, CSS, JavaScript, TypeScript, Vuex, Redux, Chart.js, Bootstrap, Tailwind, Websocket, Dialogflow CX, Firebase, Figma, Adobe Photoshop, StarUML, Cypress testing (E2E)",
    "Bachelor of Software Engineering",
    "Software Engineering",
    "TOEIC Certificate with score 605- IIG Vietnam M ar, 2024",
    0.5208183304556667,
  ],
  "TRAN PHI HUNG": [
    "JavaScript/TypeScript, Java, VueJS 2, VueJS 3, NuxtJS 3, React, Angular, Material UI, Bootstrap, Tailwind CSS, Vuetify, Prime UI",
    "I T Engineering Degree",
    0.5206413496415705,
  ],
  "Alfred Pennyworth": [
    "Product management, Agile methodologies, Leadership, Communication, Project management, User Experience Design, Market Research, Data Analysis, Java, Python, JavaScript, HTML/CSS, SQL, AWS",
    "Master of Business Administration",
    "Business Administration",
    0.5184939738409954,
  ],
  "AKHILESHWAR REDDY M V": [
    "Java, JavaScript, SQL, HTML, CSS, Spring Framework, JSP, Ajax, jQuery, ReactJS, Bootstrap, Eclipse, Maven, DB Beaver, SQL Developer, IBM Rational Team Concert",
    "B.Tech Computer Science",
    "Computer Science",
    0.5180681853705766,
  ],
  "ĐẶNG NGỌC MINH TRIẾT": [
    "English - IELTS 6.0, Spring Boot, Java, HTML/CSS, SQL server/MySql server",
    "Full-Stack Developer",
    "IELTS English",
    "IELTS Certiﬁcate",
    0.5171754988642784,
  ],
  "Leo Leopard": [
    "Computer, Language, Social Media",
    "Bachelor of Arts, Business Administration",
    "Business Administration",
    0.5164989083946296,
  ],
  "NGUY Ễ N V Ă N NAM": [
    "HTML/CSS/JavaScript/Typescript, Reactjs, Nextjs, Expressjs, Nestjs, Mysql, Mongodb, Github, Gitlab, Redux, Ant Design, Tailwind css, Basic docker",
    "Software technology",
    0.5163336057081254,
  ],
  "G L N CHAITANYA": [
    "IBM WTX, IBM DATAPOWER, IBM BPM v 8.5, XML, XSD, XSLT, WSDL",
    "Bachelor's Degree",
    "Computer Science",
    0.5162263184698416,
  ],
  "Swaraj Endait": [
    "Selenium, Selenium Grid, Cucumber, Jenkins, Robot, AutoIT, SilkTest, JMeter, Python, Perl, Java",
    "BE (Mech Eng)",
    "Mechanical Engineering",
    "Certified Scrum Master, ISTQB",
    0.5130718464181963,
  ],
  "AISHWARYA . R": [
    "Java, J2EE, Servlets, JSP, Spring, Apache Tomcat, CSS, JavaScript, Dojo, HTML, XHTML, JSTL, Angular JS",
    "B.E (Computer Science)",
    "Computer Science",
    "Certified in Java SE 6 programming and web component designs",
    0.512965481974221,
  ],
  "ROBERT SMITH": [
    "Data Mining, Data Analysis, Machine Learning, Python, R, MATLAB, Sphinx, LaT eX, Mathematica, Maple, GIT, CVS, HTCondor",
    "PhD in Physics",
    "Physics",
    "Data Analysis and Machine Learning",
    0.5128513886004467,
  ],
  "Bibul Shivram": [
    "Spring MVC, Hibernate, EJB2, JSF (Java Server Facets), Restlet Framework(REST based API), Junit, FTL (Free Marker Library), JavaScript (JQuery library), HTML, CSS",
    "Bachelors Degree",
    "Computer Science Engineering",
    0.5124219440328288,
  ],
  "NGUYEN DINH DUNG": [
    "Frontend :Angular js,HTML, CSS,Bootstrap,JS,BackEnd:C#,OOP,Ajax,Window Form,SQL Server,Framework:Fluent API,MVC,.Net Core,RESTfulAPI,English level: Read and understand specialized language and communicate in basic English",
    "FPT POLYTECHNIC COLLEGE",
    "Software development /C# programming language",
    0.5093128738884795,
  ],
  "Ocvia Freriana": [
    "regulatory compliance, AML, KYC, due diligence, anti-corruption, data research",
    "Bachelor’s Degree",
    "Banking & Finance and Information Technology",
    0.5089564342527017,
  ],
  "Dharini Manokar": [
    "selenium automation testing, UI frameworks like Ext Js, angular js, DOJO and Jquery, Spring MVC, Spring Integration with webservices, WebSphere Application Servers, WebSphere Portal Server, SQL queries, UNIX commands, RAD, Maven, SVN, CVS, Java, JSP, JSF, Javascript, HTML, XML, CSS",
    "Bachelor's Degree",
    "Computer Science",
    0.5054022743076746,
  ],
  "TRAN NAM PHUONG": [
    "Linux operating system, C/C++, Microcontroller Embedded C, English communication",
    "MECHATRONIC ENGINEERING TECHNOLOGY",
    0.502711802531424,
  ],
  "ALAN TURING": [
    "Problem Solving, Cryptanalysis, Artificial intelligence",
    "PhD in Mathematics",
    "Mathematics",
    "Fellow of the Royal Society, Order of the British Empire, Honorary Doctor of Science",
    0.5003071691609218,
  ],
  "Luc Huynh T an Hoang": [
    "Document Types: FRD, SRS, User Story, Software Development Lifecycle, SQL, HTML, UI/UX, UML, BPMN, Manual Testing, Jira, Draw.IO, Figma, Balsamiq, Visual Paradigm",
    "Bachelor's Degree",
    "Management Information System",
    "Fundamental Business Analysis course",
    0.49938701564501453,
  ],
  "Cap Tan Dat": [
    "Java, Kotlin, Dart, Firebase, SQL Server, MySQL, SQLite, Jetpack Compose",
    "Bachelor's Degree",
    "Information Technology",
    0.495416497195565,
  ],
  "Huynh Le Huy": [
    "Java, Annotaion, Bean, Spring Boot, Spring Security, MongoDB, CRUD, Spring Mail, Automation Test, Selenium, Appium, Flutter",
    "Ho Chi Minh City University of Technology and Education, FPT Software Academy",
    "Information Technology",
    0.4939860061358423,
  ],
  "Ernani Joppert P Martins": [
    "JSP, Eclipse, Tomcat, Hibernate, Struts, MySQL, Java, JSF, SOAP, Websphere, Flex, JBoss, XML, PHP, Swing, AMFPHP, SWT, Axis, EJB, J2EE, Web Services, UML, Scrum, AJAX, Design Patterns, JavaScript, SAML, Subversion, Spring, PL/SQL, Delphi, CVS, Servlets, jQuery, Ant, Apache, JSON, Linux, SOA, Maven, DB2, REST, CSS, SQL Server, Weblogic, C++, Git, J2ME, Objective-C, Java Enterprise Edition",
    "Bachelor of Business Administration (B.B.A.)",
    "Business Administration and Management",
    0.4938201984248476,
  ],
  "LÊ NHẬT SƠN": [
    "VMware Workstation, Cấu hình và quản lý hệ thống, MS Ofﬁce, Kiến thức cơ bản về mạng và bảo mật thông tin, Kỹ năng giao tiếp tốt và làm việc nhóm",
    "Công nghệ thông tin",
    "mạng máy tính và truyền thông",
    0.4881997053038656,
  ],
  "Radhika Singh": [
    "Microsoft Dynamics, SQL",
    "Bachelor of Science",
    "Business & Management Studies/Accounting & Finance",
    "CPA candidate",
    0.485826307340344,
  ],
  "Loh Pei Shang": [
    "Risk Management, Compliance, Investment Compliance, Operational Risk, Financial Reporting, Tax Matters, Financial Analysis, Sales Process",
    "Bachelor of Arts",
    "Economics & Geography",
    0.4843416381908131,
  ],
  "ABHIJEET M. KHAMBE": [
    "J2EE, HTML, WAS, Tomcat, Struts, eclipse, TOAD, XMLSpy, Oracle10g, Java, SQL",
    "Bachelor's Degree",
    "Computer Science",
    "IBM Websphere Lombardi 000 -178, Pega CSA v6.2",
    0.48283648448978705,
  ],
  "KAUSHIKA S": [
    "Design and Development, Requirements gathering, Onsite coordination, Code review, SIT and UAT support, Preparation of .ldif files for Ldap, Preparation DB scripts, Go-Live Support, Identifying root cause, Responding to end users, Developing CR’s, Direct interaction with client, Deployment support, Interface Mapping Specs Preparation, Low Level Design Document, Development of Middleware artifacts, Unit Testing",
    "Bachelor's Degree",
    "Information Technology",
    0.4737977463511064,
  ],
  "Krishnakant Sadhu": [
    "EAI, SOA, Middleware, WebSphere, Java, J2EE, EJB, Struts, JSP, Servlet",
    "MCA",
    "Computer Application",
    "IBM Certified WebSphere Integration Developer",
    0.47255955435929586,
  ],
  "Ngô Hữu Nghị": [
    "HTML, SCSS, Redux-Saga, TypeScript, JavaScript, ReactJS, Bootstrap, Chart.js",
    "Studying at Industrial University of Ho Chi Minh City",
    "Software Engineering",
    0.46818160693181243,
  ],
  "TASNEEM NASRULLA": [
    "Communication skills, Relationship Building, Stakeholder relationship management, Inter-personal skills, Technical problem solving abilities, Accuracy and attention to detail, Negotiation skills",
    "Bachelor of Science in Banking & Finance",
    "Banking & Finance",
    "Certified Anti-Money Laundering Specialist (CAMS), Online FATCA Course, Certificate in Reinsurance, FICS Accredited - Specialist Diploma in Compliance, Certificate in Fund Administration, Understanding The Financial Advisers Act, International Certificate in AML Awareness, Capital Markets & Financial Advisory Services (CFMAS) Modules",
    0.4676399851285235,
  ],
  "Ryan Tang": [
    "Microsoft Word, Excel & Powerpoint",
    "Bachelor of Science",
    "Banking & Finance",
    0.4664689355901761,
  ],
  Anjaneya: [
    "Software Testing, API Integration, ESB integration, IBM technologies IIB v10, WebSphere MQ, WebSphere Message Broker v8, requirements gathering, analysis, planning, development, testing, documenting, API integration methodologies, webservices (SOAP/HTTP), File, MQ, DFDL parser, WSDL/YAML file, xml technologies, XML, JSON, XSD, Graphical mapping, ESQL, SOA integration, Routing, Logging, Auditing, SDLC phases, Middleware projects, Unit Testing, flow debugger, context-based routing, data manipulation, file system integration, ESQL insight, API services, production release, system orchestration design, Database Adapters, File Adapters, Error Handling Framework",
    "Bachelor's Degree",
    0.46307936703827385,
  ],
  "JINU K DANIEL": [
    "Java, J2EE, WMB, IIB, Application development, Web Services, ESQL",
    "B.Tech",
    "Computer Science & Engineering",
    0.4617583381308565,
  ],
  "John Horton": [
    "Economics, Labor Economics, Econometrics, R, Data Science, Python, SQL, LaTeX, Mathematica, Crowdsourcing, Statistics, Emacs, Mathematical Modeling, Organizational Economics, Stata, Machine Learning, Data Analysis, Data Mining, Analytics, Public Policy",
    "PhD",
    "Public Policy",
    0.4604279876488381,
  ],
  User: [
    "IBM BPM, Data Power XI50, WebSphere Transformation Extender, Message Broker, Message Queues, WSDL, XSD, XML, XPath, XSLT, SOA, ESB, Web Services, Java, C, C++, Oracle, DB2, Windows, UNIX, IBM Clear case, CVS, Clear Quest, Jira, SOAP UI",
    "Master of Computer Applications",
    "IBM Business Process Manger Express or Standard Edition V8.0 App Dev, IBM Websphere Datapower SOA Appliances Firmware V5.0, Solution Implementation, Certified Scrum Master(CSM)",
    0.457207932086406,
  ],
  "Olivia Karina Peter": [
    "Regulatory compliance, Project management, Communication",
    "Bachelors of Accounting",
    "Accounting",
    "Certified Practising Accountants of Australia",
    0.4568255783355051,
  ],
  "SALEEM LALANI": [
    "Corporate finance, M&A, Private equity, Consulting, Restructuring, Financial modelling, Due diligence, Client relationship management",
    "Chartered Institute of Management Accountants (CIMA, UK)",
    "Management Accountancy",
    0.4564512216190347,
  ],
  "Felyna Lee Hui Chay": [
    "Product Development, Marketing Communications, Market Intelligence, Project Management, Strategic Planning, Financial Analysis",
    "Chartered Financial Analyst (CFA)",
    "Business Administration (Accountancy)",
    "CMFAS M3, M5, M8A",
    0.45428414335994866,
  ],
  "DINH VAN HIEU": [
    "HTML, CSS, JS, PHP, Reactjs, Nextjs, SASS",
    0.4530548284894238,
  ],
  "ĐINH VĂN THI": [
    "Programming languages: Kotlin, Dart; Software: Github, Source Tree, Postman, Figma, Firebase, Android studio, Photoshop; Database: SQLite, Firebase; Android: User interface design; API layer: Retrofit, RESTful, Gson, OkHttp; Architecture: MVVM Clean Architecture, LiveData; Navigation: Navigation Component, DeepLink; Flutter",
    "Bachelor's Degree",
    "Software Engineering",
    0.4486458438124777,
  ],
  "Lee Li Ting": [
    "MS Office, Word, Excel, PowerPoint, Accpac, Telmera, Access Database, Hyperion, HFM",
    "CA (Singapore)",
    "Accountancy",
    "CPA",
    0.43507502324309727,
  ],
  "Vasanthi Kasinathan": [
    "Microsoft Office Suite, JDE One World, FinanceOne, Quickbooks, IBM S36, Accpac, Easypay, Readypay",
    "ACCA, FCCA, LCCI Diploma in Cost Accounting, GCE ‘O’ Levels",
    0.4325030406438882,
  ],
  "Wong Zhong Ming": [
    "Microsoft Office, Bloomberg, Thomson Reuters, Macromedia Flash, Dreamweaver, MYOB, ACCPAC, Oracle Financial Systems, Hyperion Financial Mgmt Systems",
    "CPA (Australia)",
    "Accountancy",
    "CPA (Aust.) Holder",
    0.42708671721363123,
  ],
  "ROHIT KHANDELWAL": [
    "Financial & Treasury Management, Accountancy, Taxation, Valuation, Structuring, Risk Management, Compliance",
    "Chartered Accountant",
    "Financial Management",
    "Certificate course on valuation",
    0.42707653925922523,
  ],
  "PENNY LIM": [
    "regulatory compliance, assurance services, internal audit, business process review, financial control, asset management, real estate, construction, manufacturing, shipping, retail, financial institutes",
    "Bachelor in Accountancy",
    "Corporate Communication",
    "Certified Public Accountant (CPA) Singapore, Certified Internal Auditor (CIA)",
    0.417481445692153,
  ],
  "Lau Peiwen Erwina": [
    "Microsoft Office Power Point, Microsoft Office Excel, Microsoft Office Words, GAMx",
    "Bachelor of Business (Accountancy)",
    "Accountancy",
    "CPA Australia",
    0.41716526330730136,
  ],
  "TRISA TAY": [
    "Financial Controller, Compliance & Risk Management, Operations, Business Partnering, Financial Control, Internal Audit, Budgeting, Forecasting, Tax Planning, Financial Modeling, Human Resources, Payroll, Corporate Secretarial, Audit, Cash Management",
    "Bachelor of Accountancy",
    "Accountancy",
    "Chartered Accountant",
    0.4148794741382482,
  ],
  none: [
    "Compliance, AML/KYC, Licensing, Internal Controls, Regulations, Training, Project Management, Accounting, Business Development",
    0.4027927685069419,
  ],
  "Anudeep Polavarapu": [
    "IBM BPM, JavaScript, Html, CSS, Dojo Toolkit Framework",
    "IBM BPM Developer",
    0.39252625015592685,
  ],
  "ROHINI PRAKASH": [
    "Fund Controller, Accounting/ reporting/audits, Cross border taxation, Compliance/ internal Controls, Fund management/ treasury, Structures –LP/LLC, Financial Analysis, Fund performance metrics, Valuations review, Budgeting & cost control, Fund Management, Fund tax structuring, Fund legal documentation, Investor meetings, Due diligence",
    "Chartered Accountant",
    "Accounting",
    0.38940702745189837,
  ],
  "Alamelu Subramanian": ["j2ee, BPM, Oracle BPM", 0.33734442033768075],
  "JOHN GUY": [0.07483855385396566],
};


const CVMatching = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState(false);

  const handleOpenJobModal = () => {
    setIsJobModalOpen((prev) => !prev);
  };

  const handleCloseJobModal = () => {
    setIsJobModalOpen((prev) => !prev);
  };

  const handleOpenCandidateModal = () => {
    setIsCandidateModalOpen((prev) => !prev);
  }

  const handleCloseCandidateModal = () => {
    setIsCandidateModalOpen((prev) => !prev);
  }

  const columns = [
    { field: "id", headerName: "ID", flex: isSmallScreen ? undefined : 0.5, width: isSmallScreen ? 70 : undefined },
    { field: "name", headerName: "Name", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "skills", headerName: "Skills", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "degree", headerName: "Degree", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "major", headerName: "Major", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    { field: "matching_percent", headerName: "Matching percent", flex: isSmallScreen ? undefined : 1, width: isSmallScreen ? 150 : undefined },
    {
      field: "actions",
      headerName: "Actions",
      flex: isSmallScreen ? undefined : 1,
      width: isSmallScreen ? 100 : undefined,
      renderCell: (params) => (
        <div>
          <Button variant="text" onClick={handleOpenCandidateModal}>
            <VisibilityIcon />
          </Button>
        </div>
      ),
    },
  ];

  const rows = Object.keys(rowsData).map((key, index) => ({
    id: index + 1,
    name: key,
    skills: rowsData[key][0],
    degree: rowsData[key][1],
    major: rowsData[key][2],
    matching_percent: (rowsData[key][3] * 100).toFixed(2) + "%",
  }));

  return (
    <div className="p-2 sm:py-12 sm:px-36">
      <p className="font-bold text-sm text-slate-500 pl-2">Jobs</p>
      <Button onClick={handleOpenJobModal} sx={{
        marginBottom: 2,
      }}>
        <h1 className="font-bold text-2xl sm:text-4xl text-primary950 text-left">{jobDescriptions.name}</h1>
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        getCellClassName={(params) => {
          if (params.field === "matching_percent") {
            const percentValue = parseFloat(params.value.replace("%", ""));
            if (percentValue >= 50) {
              return "text-blue-500 font-bold";
            } else if (percentValue < 50) {
              return "text-red-500 font-bold";
            }
          }
        }}
        sx={{
          backgroundColor: "white",
          padding: "5px",
        }}
      ></DataGrid>

      <JobDescriptionModal isModalOpen={isJobModalOpen} handleCloseModal={handleCloseJobModal} jobDescriptionData={jobDescriptions}></JobDescriptionModal>
      <CandidateModal isModalOpen={isCandidateModalOpen} handleCloseModal={handleCloseCandidateModal}></CandidateModal>
    </div>
  );
};

export default CVMatching;
