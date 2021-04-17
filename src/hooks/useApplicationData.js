import { useState, useEffect } from 'react';
import axios from 'axios';

// import 'components/Application.scss';

export default function useApplicationData() {
	const [state, setState] = useState({
		user_id: undefined,
		bills: { posted: [], received: [] },
		groups: [],
		friends: [],
		friend_requests: [],
		profile_info: {}
	})

	useEffect(() => {
		getUsersGroups()
			.then((res) => {
				setState(prev => ({ ...prev, groups: res }));
			})
			.catch(err => {
				console.log(err)
			});
		getUser()
			.then(res => {
				setState(prev => ({ ...prev, user_id: res }));
				return res;
			})
			.then(res => {
				return getPostedBills(res)
					.then(posted => {
						return getReceivedBills(res)
							.then(received => {
								setState(prev => ({
									...prev,
									bills: {
										posted: posted,
										received: received
									}
								}));
								return res;
							})
							.catch(err => {
								console.log(err)
							});
					});
			})
			.then(res => {
				getProfileInfo(res)
					.then(res => {
						setState(prev => ({
							...prev,
							profile_info: {
								total_owed: res.total_owed,
								total_owing: -res.total_due
							}
						}));
					})
					.catch(err => {
						console.log(err)
					});
				return res;
			}).catch(err => {
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
		getPendingFriendRequests()
			.then(res => res.requests_recieved)
			.then((res) => {
				setState(prev => ({ ...prev, friends_requests: res }));
			})
			.catch(err => {
				console.log(err)
			});
	}, []);

	const getUser = () => {
		return axios.get('/api/user')
			.then(res => res.data.id)
		// .then(res => {
		// 	setState(prev => ({
		// 		...prev,
		// 		user_id: res
		// 	}));
		// })
	}

	const getUsersGroups = () => {
		return axios.get('/api/groups')
			.then(res => res.data)
		// .then(res => {
		// 	return setState(prev => ({
		// 		...prev,
		// 		groups: res.data
		// 	}))
		// })
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

	const getPendingFriendRequests = () => {
		return axios.get('/api/user/friends')
			.then(res => {
				return setState(prev => ({
					...prev,
					friend_requests: res.data.requests_recieved
				}))
			})
	}

	const getProfileInfo = (userID) => {
		return axios.get(`/api/user/${userID}`)
			.then(res => res.data)
		// .then(res => {
		// 	return setState(prev => ({
		// 		...prev,
		// 		profile_info: {
		// 			total_owed: res.data.total_owed,
		// 			total_owing: res.data.total_due
		// 		}
		// 	}))
		// })
	}

	const createBill = (cost, description, group_id) => {
		const bill = { "cost": cost, "description": String(description), "group_id": group_id };

		return axios.post('/api/bills', bill)
			.then((res) => {
				setState((prev) => ({
					...prev,
					bills: { ...prev.bills, res }
				}));
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

	const sendFriendRequest = (email) => {
		return axios.post('/api/user/friends', { "friend_info": { "email": email }, "type": "sending" })
			.then(res => {
				setState(prev => ({
					...prev,
					friends: { ...prev.friends, res }
				}))
			})
	}

	const acceptFriendRequest = (friendInfo) => {
		return axios.post('/api/user/friends', { "friend_info": { "email": friendInfo.email, "id": friendInfo.id, "name": friendInfo.id }, "type": "accepting" })
			.then(res => {
				setState(prev => ({
					...prev,
					friends: { ...prev.friends, res }
				}))
			})
	}

	const payBill = (billID) => {
		return axios.post(`/api/bills/${billID}`, { "paid": true })
			.then(res => res.data)
	}

	const getPostedBills = (userID) => {
		return axios.get(`/api/bills/posted/${userID}`)
			.then(res => res.data)
		// .then(res => {
		// 	setState(prev => ({
		// 		...prev,
		// 		bills: { ...prev.bills, posted: res.posted }
		// 	}));
		// 	return res;
		// })
	}

	const getReceivedBills = (userID) => {
		return axios.get(`/api/bills/received/${userID}`)
			.then(res => res.data)
		// .then(res => {
		// 	setState(prev => ({
		// 		...prev,
		// 		bills: { ...prev.bills, received: res.received }
		// 	}));
		// 	return res;
		// })
	}

	return { state, setState, createBill, getUser, getUsersGroups, createGroup, sendFriendRequest, acceptFriendRequest, getPostedBills, getReceivedBills, payBill };
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