"use client";
import Flex from "@/components/layouts/flex";
import UserMessage from "./user-message";
import AiMessage from "./ai-message";
import useChatHistoryInterface from "../interfaces/use-chat-history-interface";
import { UserMessage as UserMessageT } from "../data/chat-data";

export default function ChatHistory() {
	const { messageRefs, root } = useChatHistoryInterface();

	return (
		<Flex
			flex='column'
			className='grow no-scrollbar overflow-x-clip relative'
			id='chat-history'
			ref={root}
		>
			{mock.map((message, i) => {
				if (message.role === "user")
					return (
						<UserMessage
							key={message.id}
							message={message}
							ref={(node) => {
								if (node) {
									node.dataset.index = i.toString();
									messageRefs.current.push(node!);
								}
							}}
						>
							{message.content}
						</UserMessage>
					);
				else return <AiMessage key={message.id} />;
			})}
		</Flex>
	);
}
const mock: UserMessageT[] = [
	{ id: "1", role: "user", content: "Hey, what’s the weather like today?" },
	{ id: "2", role: "ai", content: "It’s sunny and 75°F in your area." },
	{
		id: "11",
		role: "user",
		content: `You’re asking about the benefits of LINQ (Language Integrated Query) at its root level. LINQ is a powerful feature in C# and .NET that allows developers to write queries in a more readable, expressive, and maintainable way. Here are some key benefits of using LINQ:
1. Readability & Conciseness
LINQ provides a more readable and concise way to express queries compared to traditional loops and conditions.
2. Type Safety & Compile-Time Checking
LINQ is strongly typed, meaning errors can be caught at compile time rather than runtime.
This reduces potential runtime exceptions caused by bad queries.
3. Consistency Across Data Sources
LINQ provides a uniform syntax whether querying:
Collections (IEnumerable<T>, IQueryable<T>)
Databases (LINQ to SQL, Entity Framework)
XML (LINQ to XML)
Objects in memory
It looks like you’re asking about the benefits of LINQ (Language Integrated Query) at its root level. LINQ is a powerful feature in C# and .NET that allows developers to write queries in a more readable, expressive, and maintainable way. Here are some key benefits of using LINQ:
1. Readability & Conciseness
LINQ provides a more readable and concise way to express queries compared to traditional loops and conditions.
2. Type Safety & Compile-Time Checking
LINQ is strongly typed, meaning errors can be caught at compile time rather than runtime.
This reduces potential runtime exceptions caused by bad queries.
3. Consistency Across Data Sources
LINQ provides a uniform syntax whether querying:
Collections (IEnumerable<T>, IQueryable<T>)
Databases (LINQ to SQL, Entity Framework)
XML (LINQ to XML)
Objects in memory`,
	},
	{
		id: "12",
		role: "ai",
		content: "Yeah, try 'Grind House' or 'Bean There' – both are top-rated.",
	},
	{ id: "3", role: "user", content: "Cool, any good cafes nearby?" },
	{
		id: "4",
		role: "ai",
		content: "Yeah, try 'Grind House' or 'Bean There' – both are top-rated.",
	},
	{
		id: "5",
		role: "user",
		content: "Got it. Can you remind me to call John at 5?",
	},
	{ id: "6", role: "ai", content: "Reminder set for 5 PM to call John." },
	{ id: "7", role: "user", content: "Thanks. Also, what's 234 * 678?" },
	{ id: "8", role: "ai", content: "That's 158,652." },
	{
		id: "9",
		role: "user",
		content: `It looks like you’re asking about the benefits of LINQ (Language Integrated Query) at its root level. LINQ is a powerful feature in C# and .NET that allows developers to write queries in a more readable, expressive, and maintainable way. Here are some key benefits of using LINQ:
1. Readability & Conciseness
LINQ provides a more readable and concise way to express queries compared to traditional loops and conditions.
2. Type Safety & Compile-Time Checking
LINQ is strongly typed, meaning errors can be caught at compile time rather than runtime.
This reduces potential runtime exceptions caused by bad queries.
3. Consistency Across Data Sources
LINQ provides a uniform syntax whether querying:
Collections (IEnumerable<T>, IQueryable<T>)
Databases (LINQ to SQL, Entity Framework)
XML (LINQ to XML)
Objects in memory

It looks like you’re asking about the benefits of LINQ (Language Integrated Query) at its root level. LINQ is a powerful feature in C# and .NET that allows developers to write queries in a more readable, expressive, and maintainable way. Here are some key benefits of using LINQ:
1. Readability & Conciseness
LINQ provides a more readable and concise way to express queries compared to traditional loops and conditions.
2. Type Safety & Compile-Time Checking
LINQ is strongly typed, meaning errors can be caught at compile time rather than runtime.
This reduces potential runtime exceptions caused by bad queries.
3. Consistency Across Data Sources
LINQ provides a uniform syntax whether querying:
Collections (IEnumerable<T>, IQueryable<T>)
Databases (LINQ to SQL, Entity Framework)
XML (LINQ to XML)
Objects in memory
It looks like you’re asking about the benefits of LINQ (Language Integrated Query) at its root level. LINQ is a powerful feature in C# and .NET that allows developers to write queries in a more readable, expressive, and maintainable way. Here are some key benefits of using LINQ:
1. Readability & Conciseness
LINQ provides a more readable and concise way to express queries compared to traditional loops and conditions.
2. Type Safety & Compile-Time Checking
LINQ is strongly typed, meaning errors can be caught at compile time rather than runtime.
This reduces potential runtime exceptions caused by bad queries.
3. Consistency Across Data Sources
LINQ provides a uniform syntax whether querying:
Collections (IEnumerable<T>, IQueryable<T>)
Databases (LINQ to SQL, Entity Framework)
XML (LINQ to XML)
Objects in memory
`,
	},
	{ id: "10", role: "ai", content: "It’s sunny and 75°F in your area." },

	{
		id: "13",
		role: "user",
		content: "Got it. Can you remind me to call John at 5?",
	},
	{ id: "14", role: "ai", content: "Reminder set for 5 PM to call John." },
	{ id: "15", role: "user", content: "Thanks. Also, what's 234 * 678?" },
	{ id: "16", role: "ai", content: "That's 158,652." },
];
