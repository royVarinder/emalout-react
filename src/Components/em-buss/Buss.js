import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { em_procedur_id } from '../Config/procedureIds';
import DtService from '../TransferDataService';
import { getCallData, getDataById } from '../Util';
import Slider from 'react-slick';
import { settings, EM_WEEKOFDAYS, EM_FEATURES } from '../Config/Config';
import CheckRadio from '../Elements/Checkbox';
import { EM_TYPE_CHECKBOX } from '../Config/Input';
import Styles from './BussModule.module.css';
import { format } from 'date-fns';

const BussPage = (props) => {
	const [searchparams] = useSearchParams();
	const [bussId, setBussId] = useState('');
	const [bussData, setBussData] = useState([]);
	const [bussImages, setBussImages] = useState([]);
	const [features, setFeatures] = useState(EM_FEATURES);
	const [weekDays, setWeekDays] = useState(EM_WEEKOFDAYS);

	const { business_created_at } = useMemo(() => {
		let time = !!bussData?.createdAt
			? format(new Date(bussData?.createdAt), 'hh:mm a')
			: '';
		return {
			business_created_at: time,
		};
	}, [bussData]);

	useEffect(() => {
		try {
			const bussString = searchparams.get('Buss');
			const Buss = bussString ? JSON.parse(bussString) : null;
			// getDataById(
			//   em_procedur_id?.em_node_buss_manage_api,
			//   searchparams.get("id")
			// ).then(res => {
			//   if (res?.data?.success === 1) {
			//     setBussData(res?.data?.message[0]);
			//   } else {
			//     setBussData([]);
			//   }
			// });
			setBussData(Buss);
		} catch (error) {
			console.error(error);
		}
	}, [searchparams]);

	useEffect(() => {
		try {
			if (!!bussData?.weekdays) {
				let days = bussData?.weekdays.split('|');
				setWeekDays((prev) =>
					prev.map((day) => ({
						...day,
						isChecked: days.includes(day?.value) ? true : false,
					}))
				);
			}

			if (!!bussData?.features) {
				let features = bussData?.features.split('|');
				setFeatures((prev) =>
					prev.map((feature_item) => ({
						...feature_item,
						isChecked: features.includes(feature_item?.value)
							? true
							: false,
					}))
				);
			}

			if (
				bussData?.buss_images !== undefined &&
				bussData?.buss_images.length !== 0 &&
				bussData?.buss_images !== ''
			) {
				setBussImages(bussData?.buss_images.split('|'));
			} else {
				setBussImages([]);
			}
		} catch (error) {
			console.error(error);
		}
	}, [bussData]);

	return (
		<div className="buss-page em-flex em-shadow margin-1 marginBottom-2 em-border-radius em-flex-wrap">
			<div className="buss-images" style={{ width: '50%' }}>
				<div style={{ width: '90%', margin: '0 auto' }}>
					<Slider {...settings}>
						{bussImages !== undefined &&
							bussImages.length !== 0 &&
							bussImages.map((items) => {
								return <img src={items} />;
							})}
					</Slider>
				</div>
				<div
					className="bussHeader em-flex padding-2 em-horizontal-align-between"
					style={{ margin: '0 10px 0 10px' }}>
					<div style={{ textAlign: 'left' }}>
						<h4>{bussData?.user_name}</h4>
						<div>{bussData?.user_contact}</div>
					</div>
					<div style={{ textAlign: 'right' }}>
						<div>
							{bussData?.buss_address},{bussData?.buss_city}
						</div>
						<div>{bussData?.buss_district}.</div>
						<div>{bussData?.user_email}</div>
						{/* <h6>{business_created_at}</h6> */}
					</div>
					{/* <div>lorem50</div> */}
				</div>
			</div>
			<div className="buss-details" style={{ width: '50%' }}>
				<div>
					<div className="bussHeader em-flex padding-2 em-horizontal-align-between">
						<div style={{ textAlign: 'left' }}>
							<h3>{bussData?.buss_name}</h3>
							<div>{bussData?.buss_contact}</div>
						</div>
						<div style={{ textAlign: 'right' }}>
							<div>
								{bussData?.buss_address},{bussData?.buss_city}
							</div>
							<div>{bussData?.buss_district}.</div>
							<h6>{business_created_at}</h6>
						</div>
						{/* <div>lorem50</div> */}
					</div>
					<div>
						<div style={{ textAlign: 'left', padding: '12px' }}>
							"Editors in good standing in the community can
							request extra user rights, granting them the
							technical ability to perform certain special
							actions. In particular, editors can choose to run to
							ordinary editors, and to implement restrictions
							intended to prevent disruptive editors from making
							ip.102 Wikipedia has delegated some administrative
							functions to bots, such as when granting privileges
							to human editors. Such algorithmic governance has an
							ease of implementation and scaling, though the
							automated rejection of edits may have contributed to
							a downturn in active Wikipedia editors."
						</div>
						<div
							className="buss-features"
							style={{ textAlign: 'left', padding: '8px' }}>
							<h4>Features :</h4>
							<CheckRadio
								className="emFeatures margin-1"
								type={EM_TYPE_CHECKBOX}
								data={features}
								// checked={true}
								readOnly={true}
							/>
						</div>
						<div
							// class="margin-2"
							style={{ textAlign: 'left', padding: '8px' }}>
							<h4>Opening days :</h4>
							<div style={{ backgroundColor: ' #e9e9ee' }}>
								<CheckRadio
									className="emFeatures margin-1"
									type={EM_TYPE_CHECKBOX}
									data={weekDays}
									// checked={true}
									readOnly={true}
								/>
								{/* {weekDays.map((day, idx) => {
									return (
										<span>
											{day?.name}
											{idx === weekDays.length - 1
												? ''
												: '|'}
										</span>
									);
								})} */}
							</div>
						</div>
					</div>
					{/* <div>footer</div> */}

					{/* <div className="bussHeader em-flex padding-2 em-horizontal-align-between">
						<div style={{ textAlign: 'center', width: '100%' }}>
							<div>
								{bussData?.buss_address},{bussData?.buss_city}
							</div>
							<div>{bussData?.buss_district}.</div>
							<h6>{business_created_at}</h6>
						</div>
					</div> */}
					{/* <div className="bussHeader em-flex padding-2 em-horizontal-align-between">
						<div className="heading-left em-text-left">
							<h3 className="marginBottom-2">
								{bussData?.buss_name}
							</h3>
							<p className="margin-0">
								{bussData?.create_time_stamp}
							</p>
						</div>
						<div className="heading-left em-text-right">
							<h4 className="marginBottom-2">
								{bussData?.user_name}
							</h4>
							<p className="margin-0">
								{bussData?.user_contact} ({})
							</p>
						</div>
					</div>
					<div className="bussFeatures em-flex padding-2 em-horizontal-align-between">
						<div className="heading-left em-text-left">
							<h3 className="marginBottom-2">{'Features'}</h3>
							<div className="buss-features">
								<CheckRadio
									className="emFeatures margin-1"
									type={EM_TYPE_CHECKBOX}
									data={features}
									checked={true}
									readOnly={true}
								/>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</div>
	);
};
export default BussPage;

// { bussImages!== undefined && bussImages.length !== 0 && bussImages.map((items)=>{
//     return <img src={items} />
// })}
