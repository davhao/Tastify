import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function DurationDropdown(props) {
	const [
		dropdownOpen,
		setOpen
	] = useState(false);

	const [
		selection,
		selectOption
	] = useState('Last 6 Months');

	const toggle = () => setOpen(!dropdownOpen);

	const select = (selection) => {
		selectOption(selection.target.innerText);
		let duration;
		switch (selection.target.innerText) {
			case 'Last Month':
				duration = 'short_term';
				break;
			case 'Last 6 Months':
				duration = 'medium_term';
				break;
			case 'All Time':
				duration = 'long_term';
		}
		props.setDuration(duration);
	};

	return (
		<div className="btn-drpdwn">
			<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
				<DropdownToggle caret size="sm">
					{selection}
				</DropdownToggle>
				<DropdownMenu>
					<DropdownItem onClick={select}>Last Month</DropdownItem>
					<DropdownItem onClick={select}>Last 6 Months</DropdownItem>
					<DropdownItem onClick={select}>All Time</DropdownItem>
				</DropdownMenu>
			</ButtonDropdown>
		</div>
	);
}
