import React from 'react';
import styled from 'styled-components';
import { backgroundColor2, fontSize2 } from '../Shared/Styles';

const SearchGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const SearchInput = styled.input`
	${backgroundColor2};
	${fontSize2};
	border: 1px solid;
	height: 25px;
	color: #1163c9;
	place-self: center left;
`;

const Search = () => (
	<SearchGrid>
		<h2>Search all coins</h2>
		<SearchInput />
	</SearchGrid>
);
export default Search;