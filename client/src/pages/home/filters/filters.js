import './filters.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export const Filters = ({ setPage, setSortedBy, page }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleScroll = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		if (page !== 1) {
			setPage(1);
		}
	};

	const handleDefaultFilter = async () => {
		handleScroll();
		setSortedBy('all');
		handleClose();
	};

	const handleMostLikesFilter = () => {
		handleScroll();
		setSortedBy('likes');
		handleClose();
	};

	const handleMostDislikesFilter = () => {
		handleScroll();
		setSortedBy('dislikes');
		handleClose();
	};

	const handleDateFilter = () => {
		handleScroll();
		setSortedBy('dateAdded');
		handleClose();
	};

	return (
		<div>
			<Button
				id="filters-button"
				className="filterButton"
				aria-controls={open ? 'filters-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				Filter Movies By
			</Button>
			<Menu
				id="filters-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'filters-button',
				}}
			>
				<MenuItem
					onClick={() => handleDefaultFilter()}
					className="filterMenuItem"
				>
					Default
				</MenuItem>
				<MenuItem
					onClick={() => handleMostLikesFilter()}
					className="filterMenuItem"
				>
					Most likes
				</MenuItem>
				<MenuItem
					onClick={() => handleMostDislikesFilter()}
					className="filterMenuItem"
				>
					Most dislikes
				</MenuItem>
				<MenuItem onClick={() => handleDateFilter()} className="filterMenuItem">
					Date added
				</MenuItem>
			</Menu>
		</div>
	);
};
