import Flex from "@/components/layouts/flex";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useAtom } from "jotai";
import { selected_model_jotai, SeletedModel } from "../data/chat-data";
import { Box } from "lucide-react";
import { ICON_SIZE, models } from "@/data/constants";
import { cn } from "@/utils/cn";

export default function SelectModel() {
	const [[selected_model, formated_model_name], selected_model_setter] =
		useAtom(selected_model_jotai);
	return (
		<>
			<Flex className='shrink-0'>
				<DropdownMenu>
					<DropdownMenuTrigger className='flex gap-3 self-center p-3text-system-on-surface rounded-[8px] w-full cursor-pointer outline-none active:scale-95 transition-transform label-large'>
						{formated_model_name}
						<Box size={ICON_SIZE} className='stroke-system-on-surface' />
					</DropdownMenuTrigger>
					<DropdownMenuContent className='flex flex-wrap max-w-[480px] grow w-full max-h-[480px] p-3 rounded-[12px] bg-system-surface-container gap-3 -translate-y-4 translate-x-3'>
						<Flex flex='column' className='gap-3'>
							<DropdownMenuLabel className='rounded-[12px] font-semibold'>
								OpenAI
							</DropdownMenuLabel>
							<Flex flex='column' className='h-[320px]'>
								{Object.entries(models).map(([model, formatedModelName]) => (
									<DropdownMenuItem
										key={model}
										className={cn(
											"outline-none shrink-0 p-3 hover:font-medium cursor-pointer rounded-[8px]",
											selected_model === model && "bg-system-surface",
										)}
										onClick={() => {
											selected_model_setter([
												model,
												formatedModelName,
											] as SeletedModel);
										}}
									>
										{formatedModelName}
									</DropdownMenuItem>
								))}
							</Flex>
						</Flex>
						<Flex flex='column' className='gap-3'>
							<DropdownMenuLabel className='rounded-[12px] font-semibold'>
								Gemini
							</DropdownMenuLabel>
							<DropdownMenuItem className='outline-none p-3 hover:bg-system-surface cursor-pointer rounded-[8px]'>
								Gemini 2.5 Flash
							</DropdownMenuItem>
						</Flex>
					</DropdownMenuContent>
				</DropdownMenu>
			</Flex>
		</>
	);
}
