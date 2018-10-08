// @flow

export const metamask = {
  id: 'metamask',
  name: 'Metamask',
  primaryColor: '#93949D',
  borderColor: '#93949D',
  homepageURL: 'https://metamask.io',
  description: `MetaMask is a bridge that allows you to visit the distributed web of tomorrow in your browser today. It allows you to run Ethereum dApps right in your browser without running a full Ethereum node.`,
}

// export const ethereum = {
//   primaryColor: '#132026',
//   borderColor: '#132026',
//   homepageURL: 'https://www.ethereum.org',
// }

export const uport = {
  id: 'uport',
  name: 'uPort',
  primaryColor: '#5147c3',
  borderColor: '#5147c3',
  homepageURL: 'https://uport.me',
  description: `uPort returns ownership of identity to the individual. uPort's open identity system allows users to register their own identity on Ethereum, send and request credentials, sign transactions, and securely manage keys & data.`,
}

export const kauri = {
  id: 'kauri',
  name: 'Kauri',
  primaryColor: '#0ba986',
  borderColor: '#0ba986',
  homepageURL: 'https://www.kauri.io',
  description: `Decentralized Technical Knowledge Base for the Ethereum Ecosystem`,
}

export const aragon = {
  id: 'aragon',
  name: 'Aragon',
  primaryColor: '#1D1F1F',
  borderColor: '#1D1F1F',
  homepageURL: 'https://aragon.one',
  description: `Aragon is a project that aims to disintermediate the creation and maintenance of organizational structures by using blockchain technology. We want to empower people across the world to easily and securely manage their organizations. We provide the tools for anyone to become an entrepreneur and run their own organization, to take control of their own lives`,
}

export const dharma = {
  id: 'dharma',
  name: 'Dharma',
  primaryColor: '#0F2224',
  borderColor: '#0F2224',
  homepageURL: 'https://dharma.io',
  description: `Dharma is a platform for building borderless lending products using programmable, tokenized debt. `,
}

export const ens = {
  id: 'ens',
  name: 'ENS',
  primaryColor: '#55A558',
  borderColor: '#55A558',
  homepageURL: 'https://ens.domains/',
  description: `ENS offers a secure & decentralised way to address resources both on and off the blockchain using simple, human-readable names.`,
}

export const makerdao = {
  id: 'makerdao',
  name: 'MakerDAO',
  primaryColor: '#5A6876',
  borderColor: '#5A6876',
  homepageURL: 'https://makerdao.com/',
  description: `Dai is a cryptocurrency that is price stabilized against the value of the U.S. Dollar. Dai is created by the Dai Stablecoin System, a decentralized platform that runs on the Ethereum blockchain.`,
}

export const remix = {
  id: 'remix',
  name: 'Remix',
  primaryColor: '#b3b3b3',
  borderColor: '#b3b3b3',
  homepageURL: 'https://github.com/ethereum/remix',
  description: `Remix is a browser-based compiler and IDE that enables users to build Ethereum contracts with Solidity language and to debug transactions.`,
}

export const toshi = {
  id: 'toshi',
  name: 'Toshi',
  primaryColor: '#000000',
  borderColor: '#000000',
  homepageURL: 'https://www.toshi.org/',
  description: `Toshi is a browser for the Ethereum network that provides universal access to financial services. `,
}

export const zeppelin = {
  id: 'zeppelin',
  name: 'Zeppelin',
  primaryColor: '#3566B2',
  borderColor: '#3566B2',
  homepageURL: 'https://zeppelinos.org/',
  description: `ZeppelinOS is an open-source, distributed platform of tools and services on top of the EVM to develop and manage smart contract applications securely.`,
}

export const categories = Object.keys({
  kauri,
  metamask,
  // ethereum,
  uport,
  aragon,
  dharma,
  ens,
  makerdao,
  remix,
  toshi,
  zeppelin,
})

const colors = {
  padding: 'calc((100vw - 1280px) / 2)',
  paddingTop: '2.5em',
  primaryColor: '#0BA986',
  secondaryColor: '#1E3D3B',
  primaryTextColor: '#1E2428',
  secondaryTextColor: '#283035',
  hoverTextColor: '#108E72',
  disabledTextColor: '#9B9B9B',
  tertiaryBackgroundColor: '#F7F7F7',
  disabledBackgroundColor: '#D6D6D6',
  contentBorder: '1px solid rgba(30, 36, 40, 0.19)',
  errorRedColor: '#C03030',
  bgPrimary: '#1E2428',
  bgSecondary: '#1E3D3B',
  textPrimary: '#1E2428',
  primary: '#0BA986',
  primaryDark: '#11856B',
  secondary: '#11856B',
  secondaryBlue: 'rgb(81, 123, 162, 1)',
  secondaryBlueDark: 'rgb(81, 118, 142, 1)',
  white: '#FFFFFF',
  divider: '#EBEBEB',
  borderTextArea: '#979797',
}

const fontSizes = [ 11, 13, 14, 16, 18, 20, 22, 28 ]

const fontWeight = [ 300, 'normal', 500, 700 ]

const breakpoints = [ '500px', '52em', '64em' ]

const space = [
  0, 10, 15, 30, 60,
]

const themeConfig = {
  space,
  fontSizes,
  fontWeight,
  breakpoints,
  colors,
  bg: colors,
  ...colors, // TODO: Deprecate across the app
  padding: 'calc((100vw - 1280px) / 2)',
  paddingTop: '2.5em',
  metamask,
  // ethereum,
  uport,
  kauri,
  aragon,
  dharma,
  ens,
  makerdao,
  remix,
  toshi,
  zeppelin,
}

export default themeConfig
