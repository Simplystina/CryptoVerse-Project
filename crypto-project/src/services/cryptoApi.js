import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'


const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '648b553f41mshb3f5b7fa67b55a7p10f172jsn47fc08d87214'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) =>({
    url, headers: cryptoApiHeaders
})
const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) =>({
        getCryptos :builder.query({
            query:(count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails : builder.query({
            query: (coinID)=> createRequest(`/coin/${coinID}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinid, timeperiod})=> createRequest(`/coin/${coinid}/history?=${timeperiod}
            `)
        }),
        getCryptoExchange: builder.query({ 
            query: () => createRequest(`/exchanges`)
        })
    })
})

export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery,useGetCryptoHistoryQuery, useGetCryptoExchangeQuery
} = cryptoApi

export default cryptoApi
