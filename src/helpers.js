import useMetamaskProvider from 'metamask-extension-provider'
import { GetAccountFromProvider } from 'aleph-sdk-ts/dist/accounts/ethereum'
import { messages } from 'aleph-sdk-ts'

export const isOnFilesPage = () => window.location.hash === '#/files'

export const hasFilesTable = () => document.querySelector('.ReactVirtualized__Grid__innerScrollContainer')

export const isOnIPFSWebUI = () => {
    const { port, host, pathname } = window.location
    return (
        port 
        && /ipfs/gi.test(pathname)
        && ['localhost', '127.0.0.1'].includes(host)
    )
}

let provider, account

export const sendPinMessage = async cid => {
    if(!provider){
        provider = useMetamaskProvider()
        account = await GetAccountFromProvider(provider)
    }

    const msg = await messages.store.Pin({
        APIServer: 'https://api2.aleph.im',
        channel: 'MNEMOSYNE-TEST',
        account,
        fileHash: cid
    })
    return msg
}

export const createPinOnAleph = cid => {
    const _el = document.createElement('span')
    _el.innerText = 'Pin with Aleph'
    _el.addEventListener('click', e => {
        e.stopPropagation()

        sendPinMessage(cid)
    })

    return _el
}