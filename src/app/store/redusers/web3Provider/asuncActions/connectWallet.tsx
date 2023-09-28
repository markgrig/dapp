import { createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers"

export const connectWallet = createAsyncThunk(
    'web3Provider/connectWallet',
    async (_, thunkAPI) => {
        try {
            if (!window.ethereum) {
                thunkAPI.rejectWithValue("Not instaled metamask")
            } else {
                const provider = new ethers.BrowserProvider(window.ethereum)
                const networkName = (await provider.getNetwork()).name
                if (networkName !== 'goerli') {
                    await addGoerli()
                }

                await provider.send("eth_requestAccounts", []);
                const signer = await provider.getSigner()
                return signer.address
            }
        } catch (e) {
            return thunkAPI.rejectWithValue("user dont have wallet")
        }
    }
)

async function addGoerli() {
    const goerliParams = [
        {
            "chainId": "0x5",
            "chainName": "Goerli",
            "rpcUrls": [
                "https://ethereum-goerli.publicnode.com"
            ],
            "nativeCurrency": {
                "name": "ETH",
                "symbol": "ETH",
                "decimals": 18
            },
            "blockExplorerUrls": [
                "https://goerli.etherscan.io"
            ]
        }
    ]

    await window.ethereum.request({
        "method": "wallet_addEthereumChain",
        "params": goerliParams
    });
}
