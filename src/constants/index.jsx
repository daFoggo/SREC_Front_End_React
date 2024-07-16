import { steve_quang } from "../utils";

export const user_rating = [
    {
        id: 1,
        image: steve_quang,
        name: "Steve Quang",
        job: "CEO của BKAV",
        comment: `SREC's automation has drastically cut down our recruitment time, allowing us to focus on strategic tasks rather than repetitive ones.`,
    },
    {
        id: 1,
        image: steve_quang,
        name: "Steve Quang",
        job: "CEO của BKAV",
        comment: `The variety of coding exercises and personality questions in SREC has improved our ability to assess candidates' full potential.`,
    },
    {
        id: 1,
        image: steve_quang,
        name: "Steve Quang",
        job: "CEO của BKAV",
        comment: `Using SREC, we've seen a noticeable improvement in matching candidates' skills with job requirements, making our hiring process more efficient and inclusive.`,
    },
];

export const candidateNavLists = [
    {
        id: 1,
        title: "About Us",
        link: "/"
    },
    {
        id: 2,
        title: "Services",
        link: "/"
    },
    {
        id: 3,
        title: "Jobs",
        link: "/"
    },
];

export const recruiterNavLists = [
    {
        id: 1,
        title: "CV Matching",
        link: "/cv-matching"
    },
    {
        id: 2,
        title: "Summary",
        link: "/summary"
    }
];


export const userDropdown = [
    {
        id: 1,
        title: "Profile",
    },
    {
        id: 2,
        title: "Settings",
    },
    {
        id: 3,
        title: "Logout",
    },
];

export const language_versions = {
    javascript: "18.15.0",
    typescript: "5.0.3",
    python: "3.10.0",
    java: "15.0.2",
    csharp: "6.12.0",
    cpp: "10.2.0",
    php: "8.2.3",
};

export const code_snippets = {
    javascript: `function greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
    typescript: `type Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
    python: `def greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
    java: `public class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
    csharp:
        'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
    cpp: '#include <iostream>\n\nint main() {\n\tstd::cout << "Hello, World!";\n\treturn 0;\n}\n',
    php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};
