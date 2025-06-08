"use client";
import Flex from "../layouts/flex";
import Button from "./button";
import Modal from "../layouts/modal";
import { HashLoader } from "react-spinners";
import useAlertDialogInterface from "@/hooks/interface/use-alert-dialog-interface";
import { ICON_SIZE } from "@/data/constants";

export default function AlertDialog() {
	const { cancel, proceed, dialog, dialog_message } = useAlertDialogInterface();

	return (
		<>
			<Modal
				stateFlag='alert-dialog'
				className='flex justify-center items-center'
			>
				<Flex
					flex='column'
					className='bg-system-surface gap-3 p-3 drop-shadow-lg rounded-[8px] basis-[480px] max-h-[80%]'
				>
					<h2 className='headline-small md:headline-medium'>
						Are you absolutely sure?
					</h2>
					<p className='body-large'>
						{dialog_message ||
							`This action cannot be undone. This will permanently delete and
						remove your data from your servers.`}
					</p>
					<Flex className='gap-3 justify-end'>
						<Button
							className='bg-system-surface text-system-on-surface border-system-outline'
							onClick={() => cancel()}
						>
							Cancel
						</Button>
						<Button
							className='bg-system-error text-system-on-error'
							onClick={() => proceed()}
						>
							Continue{" "}
							{dialog === "continue" && (
								<HashLoader size={ICON_SIZE} color='rgb(var(--on-error))' />
							)}
						</Button>
					</Flex>
				</Flex>
			</Modal>
		</>
	);
}
