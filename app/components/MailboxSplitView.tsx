// Copyright (c) 2026 Cloudflare, Inc.
// Licensed under the Apache 2.0 license found in the LICENSE file or at:
//     https://opensource.org/licenses/Apache-2.0

import type { ReactNode } from "react";
import ComposePanel from "~/components/ComposePanel";
import EmailPanel from "~/components/EmailPanel";

interface MailboxSplitViewProps {
	selectedEmailId: string | null;
	isComposing: boolean;
	children: ReactNode;
}

export default function MailboxSplitView({
	selectedEmailId,
	isComposing,
	children,
}: MailboxSplitViewProps) {
	const isPanelOpen = selectedEmailId !== null || isComposing;

	return (
		/* 
		   FIX: Changed to flex-col for mobile (stacked) and flex-row for desktop.
		   Added w-full and mx-auto to ensure it centers and fills the screen.
		*/
		<div className="flex flex-col md:flex-row h-full w-full mx-auto overflow-hidden">
			<div
				className={`flex flex-col min-w-0 shrink-0 ${
					isPanelOpen
						? "w-full md:w-[380px] border-b md:border-b-0 md:border-r border-kumo-line"
						: "w-full"
				}`}
			>
				{children}
			</div>

			{isPanelOpen && (
				/* 
				   FIX: Ensure the panel takes full width on mobile when open 
				   and scrolls independently.
				*/
				<div className="flex-1 flex flex-col min-w-0 overflow-hidden w-full h-full">
					{isComposing && !selectedEmailId ? (
						<ComposePanel />
					) : isComposing && selectedEmailId ? (
						<div className="flex flex-col h-full overflow-y-auto">
							<ComposePanel />
							<div className="border-t border-kumo-line">
								<EmailPanel emailId={selectedEmailId} />
							</div>
						</div>
					) : selectedEmailId ? (
						<EmailPanel emailId={selectedEmailId} />
					) : null}
				</div>
			)}
		</div>
	);
}
