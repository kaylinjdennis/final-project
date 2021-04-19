import { useState, useEffect } from 'react';
import axios from 'axios';

// import 'components/Application.scss';

export default function useApplicationData() {
	const [state, setState] = useState({
		user_id: undefined,
		bills: { posted: [], received: [] },
		groups: [],
		group_members: [],
		friends: [],
		friend_requests: [],
		profile_info: {}
	})

	useEffect(() => {
		getUsersGroups()
			.then(res => {
				for (const group of res) {
					getGroupMembers(group.id)
						.then(data => {
							setState(prev => ({ ...prev, groups: res, group_members: { ...prev.group_members, data } }));
						})
				}
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

	const createBill = (cost, description, group_id, includeSelf) => {
		const bill = { "cost": cost, "description": String(description), "group_id": group_id, "include_self": includeSelf };

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
		return axios.post('/api/user/friends', { "friend_info": { "email": friendInfo.email, "id": friendInfo.id, "name": friendInfo.id, "avatar": friendInfo.avatar }, "type": "accepting" })
			.then(res => {
				setState(prev => ({
					...prev,
					friends: { ...prev.friends, res }
				}))
			})
	}

	const declineFriendRequest = (friendInfo) => {
		return axios.post('/api/user/friends', { "friend_info": { "email": friendInfo.email, "id": friendInfo.id, "name": friendInfo.id, "avatar": friendInfo.avatar }, "type": "declining" })
			.then(res => {
				setState(prev => ({
					...prev,
					friend_requests: { ...prev.friend_requests, res }
				}))
			})
	}

	const payBill = (billID) => {
		return axios.post(`/api/bills/${billID}`, { "paid": true })
			.then(res => res.data)
	}

	const deleteBill = (billID) => {
		return axios.delete(`/api/bills/${billID}`)
			.then(res => res.data)
	}

	const editBill = (billID, cost, description, group_id, includeSelf) => {
		return axios.post(`/api/bills/${billID}`, { "cost": cost, "description": String(description), "group_id": group_id, "include_self": includeSelf })
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

	const getGroupMembers = (groupID) => {
		return axios.get(`/api/groups/${groupID}`)
			.then(res => res.data)
	}

	return { state, setState, createBill, getUser, getUsersGroups, createGroup, sendFriendRequest, acceptFriendRequest, declineFriendRequest, getPostedBills, getReceivedBills, payBill, deleteBill, editBill, getGroupMembers };
}