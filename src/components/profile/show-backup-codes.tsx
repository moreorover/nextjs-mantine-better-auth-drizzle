"use client";

import {
	Button,
	Code,
	Container,
	CopyButton,
	Grid,
	Stack,
	Text,
} from "@mantine/core";
import { useState } from "react";

import { getBackupCodes } from "@/actions/getBackupCodes";
import type { TypedContextModalProps } from "@/lib/modal-helper";

export const ShowBackupCodes = ({
	context,
	id,
}: TypedContextModalProps<"showBackupCodes">) => {
	const [codes, setcodes] = useState<{
		status: boolean;
		backupCodes: string[];
	} | null>(null);
	const [fetching, setFetching] = useState(false);

	const fetchCodes = async () => {
		setFetching(true);
		const result = await getBackupCodes();
		setcodes(result);
		setFetching(false);
	};

	return (
		<Container>
			<Stack gap="sm">
				<Text size="sm">Available backup codes</Text>
				<Grid gutter="sm">
					{codes?.backupCodes.map((code) => (
						<Grid.Col span={{ base: 12, sm: 6 }} key={code}>
							<Code block p="xs" fw={500}>
								{code}
							</Code>
						</Grid.Col>
					))}
				</Grid>
				{codes && codes.backupCodes.length > 0 && (
					<CopyButton value={codes?.backupCodes.join("\n")}>
						{({ copied, copy }) => (
							<Button color={copied ? "teal" : "bright_orange"} onClick={copy}>
								{copied ? "Copied Codes" : "Copy codes"}
							</Button>
						)}
					</CopyButton>
				)}
				<Button
					variant="secondary"
					onClick={fetchCodes}
					loading={fetching}
					disabled={!!(codes?.status && codes?.backupCodes?.length > 0)}
				>
					Show Backup Codes
				</Button>
				<Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
					Cancel
				</Button>
			</Stack>
		</Container>
	);
};
