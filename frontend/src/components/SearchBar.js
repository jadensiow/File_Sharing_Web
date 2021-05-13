import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import svgs from "../img/icons/svgs";
import axios from "axios";

const SearchBar = ({ history }) => {
	const [searchFor, setSearchFor] = useState("Videos");
	const [searchQuery, setSearchQuery] = useState("");

	const dropdownItemClick = e => {
		e.preventDefault();
		setSearchFor(e.target.innerText);
	};

	const sendSearchQuery = e => {
		if (searchQuery.length === 0) return;

		e.preventDefault();
		history.push(`/search?type=${searchFor}&query=${searchQuery}`);
	};

	return (
		<div style={{ maxWidth: "50vw" }}>
			<InputGroup>
				<DropdownButton
					as={InputGroup.Prepend}
					variant="outline-secondary"
					title={searchFor}
				>
					<Dropdown.Item onClick={dropdownItemClick}>Videos</Dropdown.Item>
					<Dropdown.Item onClick={dropdownItemClick}>Channels</Dropdown.Item>
				</DropdownButton>
				<FormControl
					placeholder="Search Query"
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>
				<InputGroup.Append>
					<Button variant="outline-secondary" onClick={sendSearchQuery}>
						{svgs.searchIcon}
					</Button>
				</InputGroup.Append>
			</InputGroup>
		</div>
	);
};

export default withRouter(SearchBar);
