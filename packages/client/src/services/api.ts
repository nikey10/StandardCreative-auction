import { Input } from '@material-ui/core'
import axios from 'axios'

const APP_URL = 'https://ac11-104-223-98-2.ngrok.io/api'

export const login = async (email: string, password: string) => {
	try {
		const { data } = await axios.post(`${APP_URL}/login`, {
			email: email,
			password: password
		})
		return data
	} catch (error) {
		return false
	}
}

export const signup = async (email: string, password: string) => {
	const { data } = await axios.post(`${APP_URL}/signup`, {
		email: email,
		password: password
	})
	return data
}

export const getInprogressAuctions = async () => {
	const { data } = await axios.post(`${APP_URL}/get-auctions-status`, {
		status: 'InProgress'
	})
	const auctions = data.data
	return auctions
}

export const getFinishedAuctions = async () => {
	const { data } = await axios.post(`${APP_URL}/get-auctions-status`, {
		status: 'Finished'
	})
	const auctions = data.data
	return auctions
}

export const getTransactions = async (id: number) => {
	const { data } = await axios.post(`${APP_URL}/get-transactions-auctionid`, {
		auctionId: id
	})
	const transactions = data.data
	return transactions
}

export const getEthPrice = async () => {
	const res = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`)
	return res
}
export const addnft = async (contractAddress: string, tokenId: string, route: string, displayName: string, imgUrl: string) => {
	const { data } = await axios.post(`${APP_URL}/addnft`, {
		contractAddress: contractAddress,
		tokenId: tokenId,
		route: route,
		displayName: displayName,
		imgUrl: imgUrl
	})
	return data.data
}

export const getNftData = async () => {
	const { data } = await axios.post(`${APP_URL}/getnftdata`, {
	})
	const nftData = data.data
	return nftData
}

export const getWinner = async (id: number) => {
	const input = ['ETHBTC','ETHUSDC']
	const output = []
	const response = await axios.get(`https://api.binance.com/api/v3/ticker/price`, {})
	response.data.forEach(item => {
		input.forEach(symbol => {
			if (symbol === item.symbol) {
				output.push(item)
			}
		})
	});
	return output
	console.log(output)
	const { data } = await axios.post(`${APP_URL}/get-winner`, {
		auctionId: id
	})
	const res = data
	return res
}



