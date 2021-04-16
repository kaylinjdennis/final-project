import { useState, useEffect } from 'react';
import axios from 'axios';

// import 'components/Application.scss';

export default function useApplicationData() {
	const [state, setState] = useState({
		user: '',
		bills: [],
		groups: [],
		friends: []
	})

	useEffect(() => {
		getUsersGroups()
			.then(res => res.name)
			.then((data) => {
				setState(prev => ({ ...prev, groups: data }));
			})
			.catch(err => {
				console.log(err)
			});
		getUsersCurrentFriends()
			.then(res => res.current_friends)
			.then((res) => {
				setState(prev => ({ ...prev, friends: res }));
			})
			.catch(err => {
				console.log(err)
			});
	}, []);

	const getUser = () => {
		axios.get('/api/user')
			.then(res => {
				setState(prev => ({ ...prev, user: res.data }));
			})
	}

	const getUsersGroups = () => {
		return axios.get('/api/groups')
			.then(res => {
				return setState(prev => ({
					...prev,
					groups: res.data
				}))
			})
	}

	const getUsersCurrentFriends = () => {
		return axios.get('/api/user/friends')
			.then(res => {
				return setState(prev => ({
					...prev,
					friends: res.data.current_friends
				}))
			})
	}

	const createBill = (cost, description, group_id) => {
		const bill = { "cost": cost, "description": String(description), "group_id": group_id };

		return axios.post('/api/bills', bill)
			.then((res) => {
				setState((prev) => ({
					...prev,
					bills: { ...prev.bills, res }
				}));
				console.log('state', state);
			})
	}

	const createGroup = (groupName, members) => {
		return axios.post('/api/groups', { "name": groupName, "members": members })
			.then(res => {
				setState(prev => ({
					...prev,
					groups: { ...prev.groups, res }
				}))
			})
	}

	return { state, setState, createBill, getUser, getUsersGroups, createGroup, getUsersCurrentFriends };
}
// export default function useApplicationData() {
// 	const [state, setState] = useState({
// 		day: 'Monday',
// 		days: [],
// 		appointments: {},
// 		interviewers: {}
// 	});

// 	const setDay = day => setState({ ...state, day });

// 	const updateSpots = (dayName, days, appointments) => {
// 		const day = days.find((day) => day.name === dayName);
// 		let spots = 0;
// 		for (const id of day.appointments) {
// 			const appointment = appointments[id];
// 			if (!appointment.interview) {
// 				spots++;
// 			}
// 		}
// 		const newArray = days.map(item => {
// 			if (item.name === dayName) {
// 				return { ...item, spots }
// 			}
// 			return item;
// 		});
// 		return newArray;
// 	};

// 	useEffect(() => {
// 		Promise.all([
// 			axios.get('/api/days'),
// 			axios.get('/api/appointments'),
// 			axios.get('/api/interviewers')
// 		]).then((all) => {
// 			setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
// 		});
// 	}, []);

// 	const bookInterview = (id, interview) => {
// 		const appointment = {
// 			...state.appointments[id],
// 			interview: { ...interview }
// 		};
// 		const appointments = {
// 			...state.appointments,
// 			[id]: appointment
// 		};
// 		return axios.put(`/api/appointments/${id}`, appointment)
// 			.then(
// 				() => {
// 					const days = updateSpots(state.day, state.days, appointments);
// 					setState({
// 						...state,
// 						appointments,
// 						days
// 					});
// 				}
// 			);
// 	};

// 	const cancelInterview = (id) => {
// 		const appointment = {
// 			...state.appointments[id],
// 			interview: null
// 		};
// 		const appointments = {
// 			...state.appointments,
// 			[id]: appointment
// 		};
// 		return (axios.delete(`/api/appointments/${id}`)
// 			.then(
// 				() => {
// 					const days = updateSpots(state.day, state.days, appointments);
// 					setState({
// 						...state,
// 						appointments,
// 						days
// 					});
// 				}
// 			)
// 		);
// 	};

// 	return { state, setDay, bookInterview, cancelInterview };
// }