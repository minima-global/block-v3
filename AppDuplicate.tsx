import { useEffect, useRef, useState } from 'react'
import { StreamrClient } from '@streamr/sdk'

// eslint-disable-next-line
const streamrClient = new StreamrClient()
// eslint-disable-next-line
const MDS = (window as any).MDS

const STREAM_ID = '0x8f652892c780f063ee81288275c6fa860f024a9d/minima/peers/test'

function App() {
  const loaded = useRef(false)
  const [peers, setPeers] = useState(null)
  const [state, setState] = useState('SEARCHING')

  useEffect(() => {
    if (!loaded.current) {
      loaded.current = true

      MDS.init((msg) => {
        if (msg.event === 'inited') {
          streamrClient.subscribe(STREAM_ID, (content) => {
            setPeers(content)
            setState('FOUND')
          })
        }
      })
    }
  }, [loaded])

  const addPeers = () => {
    streamrClient.unsubscribe(STREAM_ID)
    MDS.cmd(`peers peerslist:${peers}`, function (response) {
      if (response.status) {
        setState('CONNECTED')
      }
    })
  }

  return (
    <div className="h-screen w-screen p-4 flex items-center justify-center">
      <div className="text-center">
        <div
          className={`sphere mb-5 mx-auto ${state === 'FOUND' || state === 'CONNECTED' ? 'sphere--active' : ''}`}
        >
          <svg
            width="37"
            height="33"
            viewBox="0 0 37 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[64px] h-[64px] fill-white mb-2"
          >
            <path
              d="M28.8727 9.20966L27.2806 16.2518L25.2445 7.7553L18.1105 4.86191L16.1816 13.3737L14.4823 3.39225L7.34831 0.51416L0 32.9998H7.79227L10.0427 23.0183L11.742 32.9998H19.5496L21.4632 24.488L23.4993 32.9998H31.2915L36.022 12.0877L28.8727 9.20966Z"
              fill="#currentColor"
            ></path>
          </svg>
        </div>
        <div className="mt-14 min-h-[100px]">
          {state === 'CONNECTED' && (
            <button
              disabled
              className="font-bold text-sm shadow text-black py-2 px-10 w-full rounded bg-green-400"
            >
              Connected
            </button>
          )}
          {state === 'FOUND' && (
            <button
              className="font-bold text-sm shadow text-black bg-white py-2 px-10 w-full rounded active:scale-[95%] transition-all"
              onClick={addPeers}
            >
              Add Peers
            </button>
          )}
          {state === 'SEARCHING' && (
            <h1 className="mt-14 text-slate-400">Retrieving Peers...</h1>
          )}
        </div>
        <div className="fixed bottom-0 left-0 w-full p-5 break-all text-xs leading-relaxed tracking-wide	">
          {peers}
        </div>
      </div>
    </div>
  )
}

export default App
