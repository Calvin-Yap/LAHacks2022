import React from 'react';
import './navbarStyles.css';

const Navbar = () => {
return (
	<>
	<nav>
		<h1>TeamUp <span role="img" aria-label="tent">🤼</span></h1>
		<div className="links">
			<a href="#">Logout</a>
		</div>

	</nav>
	</>
);
};

export default Navbar;
