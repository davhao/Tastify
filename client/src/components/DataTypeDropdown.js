import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default function DataTypeDropdown(props) {
	const [
		dropdownOpen,
		setOpen
	] = useState(false);

	const [
		selection,
		selectOption
	] = useState('Tracks');

	const toggle = () => setOpen(!dropdownOpen);

	const select = (selection) => {
		const text = selection.target.innerText;
		selectOption(text);
		switch (text) {
			case 'Tracks':
				props.setType('tracks');
				break;
			default:
				props.setType('artists');
		}
	};

	return (
		<div className="btn-drpdwn-wrapper">
			<div>
				<ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
					<DropdownToggle className="btn-drpdwn" caret size="sm">
						{selection}
					</DropdownToggle>
					<DropdownMenu>
						<DropdownItem onClick={select}>Tracks</DropdownItem>
						<DropdownItem onClick={select}>Artists</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
			</div>
		</div>
	);
}
