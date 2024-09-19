
import { useCallback, useEffect, useRef, useState } from 'react'


function App() {

  let [length, setLength] = useState(8)

  let [numberAllowed, setNumberAllowed] = useState(false)

  let [charAllowed, setCharAllowed] = useState(false)

  let [Password, setPassword] = useState("")

  // it is used for referances ---- useref
  //it is used for find more things about that or good user experiance ---- passwordRef
  let passwordRef = useRef(null)

  const PasswordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()_+{}'<>"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    PasswordGenerator()
  }, [length, numberAllowed, charAllowed, PasswordGenerator])

  const copytoclipboard = useCallback(() => {
    passwordRef.current?.select()
    // passwordRef.current?.setSelectionRange(1,length )
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  return (
    <>

      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 bg-gray-800 text-orange-500 text-xl' id='container'>
        <h1 className='text-white text-center my-2 text-xl'>Password generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text' value={Password} className='outline-none w-full py-2 px-3  my-1' placeholder='password' readOnly ref={passwordRef} />

          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 my-1 shrink-0' onClick={copytoclipboard}>copy</button>


        </div>

        <div className=' text-sm gap-x-2 my-2'>

          <div className=' items-center gap-x-1 my-3 text-lg'>
            <input type='range' min={6} max={20} value={length} className='cursor-pointer mr-4 ' onChange={(e) => { setLength(e.target.value) }} />
            <label> Length : {length} </label>  
          </div>

          <div className=' items-center gap-x-1 my-3 text-lg'>
            <input type="checkbox" defaultChecked={numberAllowed} className='mr-4' id='numberInput' onChange={() => { setNumberAllowed((prev) => !prev) }} />
            <label htmlFor='numberInput'> Numbers</label>
          </div>

          <div className=' items-center gap-x-1 my-3 text-lg'>
            <input type="checkbox" defaultChecked={charAllowed} className='mr-4' id='characterInput' onChange={() => { setCharAllowed((prev) => !prev) }} />
            <label htmlFor='characterInput'> Characters</label>
          </div>

        </div>
      </div>

    </>
  )
}

export default App
