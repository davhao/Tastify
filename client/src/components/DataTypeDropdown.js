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
		selectOption(selection.target.innerText);
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
