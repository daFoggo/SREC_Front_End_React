import { steve_quang } from "../utils";

export const user_rating = [
    {
        id: 1,
        image: steve_quang,
        name: "Steve Quang",
        job: "CEO của BKAV",
        comment: `Sản phẩm sẽ đưa ra câu trả lời không chỉ nhanh chóng và chính xác mà còn là chính xác nhất`,
    },
    {
        id: 1,
        image: steve_quang,
        name: "Steve Quang",
        job: "CEO của BKAV",
        comment: `Việt Nam có thể vươn lên số 1 thế giới về AI', trong đó đặc biệt là 'AI ứng dụng'. 'Ví dụ tại Bkav, chúng tôi phát triển những AI để áp dụng vào việc nuôi bò, phòng chống cháy rừng, trong việc giám sát các công trình xây dựng', CEO Bkav cho biết.`,
    },
    {
        id: 1,
        image: steve_quang,
        name: "Steve Quang",
        job: "CEO của BKAV",
        comment: `Chúng tôi sử dụng công nghệ GPT (AI Model), cũng là công nghệ được ChatGPT sử dụng. Bằng cách này, phần mềm chặn Spam có khả năng "HIỂU" được nội dung văn bản, giống như bạn đọc vài câu là biết ngay email hay tin nhắn là Spam. Nhờ đó mà hiệu quả chặn Spam vượt trội, so với cách làm truyền thống dựa vào các từ đơn lẻ", bác Quảng khẳng định`,
    },
];

export const navLists = [
    {
        id: 1,
        title: "About Us",
    },
    {
        id: 2,
        title: "Services",
    },
    {
        id: 3,
        title: "Jobs",
    },
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
