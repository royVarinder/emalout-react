import React, { useEffect, useState } from 'react';
import { em_procedur_id } from '../Config/procedureIds';
import Button from '../Elements/Button';
import { emPostData, getCallData, getSessionData } from '../Util';
import { EM_ADMIN_DETAILS } from '../Config/Config';
import { createSearchParams, useNavigate } from 'react-router-dom';
import DtService from '../TransferDataService';

const HomePage = () => {
	const [allCategories, setAllCategories] = useState([]);
	const [allBusiness, setAllBusiness] = useState([]);
	let navigate = useNavigate();

	const fetchBusinessData = () => {
		try {
			emPostData(em_procedur_id?.fetchBusinessData, {}).then((res) => {
				if (res?.success) {
					setAllBusiness(res?.data);
					return;
				}
				return alert(res.message);
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchBusinessData();
	}, []);

	return (
		<>
			<div className="allCategoryCardsRow em-flex em-flex-wrap em-horizontal-align-center">
				{allBusiness.map((catItems, catIndx) => {
					const { busDetails, category_name } = catItems;
					let bussCategory = catItems?.value;
					let category_id = parseInt(catItems?.id);
					return (
						<div
							key={catIndx}
							className="categoryCard margin-1 marginTopBottom-2 padding-0 em-border-radius">
							<div className="categoryHeading">
								<h5>{category_name}</h5>
							</div>
							<div className="cateogryBody">
								{busDetails.map((items, index) => {
									let cat_id = parseInt(items?.category_id);
									let buss_name = items?.buss_name;
									return (
										<div
											key={index}
											className="bussList"
											onClick={() => {
												navigate({
													pathname: '/buss',
													search: createSearchParams({
														Buss: JSON.stringify(
															items
														), // Convert the object to a JSON string
													}).toString(),
												});
											}}>
											<p>{buss_name}</p>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
};
export default HomePage;
